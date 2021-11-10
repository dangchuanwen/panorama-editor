import { Box, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { LanguageContext } from 'language';
import { FC, useContext, useEffect, useState } from 'react';
import { getTasksProcess, TaskProcessStep } from 'requests/requests';

const Home: FC = () => {
  const { languagePackage } = useContext(LanguageContext);
  const [taskDescription, setTaskDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [tasksProcess, setTasksProcess] = useState<TaskProcessStep[]>([]);
  useEffect(() => {
    const fetchTasksProcess = async () => {
      const res = await getTasksProcess();
      const tasksProcess = res.data;
      let currentStep: number = tasksProcess.findIndex((taskStep) => !taskStep.done);
      if (currentStep === -1) {
        currentStep = tasksProcess.length;
        setTaskDescription(languagePackage?.FinishedAllTasks || '');
      } else {
        setTaskDescription(tasksProcess[currentStep].description);
      }
      setTasksProcess(tasksProcess);
      setCurrentStep(currentStep);
    };
    fetchTasksProcess();
  }, []);
  return (
    <Box>
      <Typography variant="h4">{languagePackage?.TasksProcess}</Typography>
      <Box>
        <Stepper activeStep={currentStep}>
          {tasksProcess.map((step) => {
            return (
              <Step key={step._id}>
                <StepLabel>
                  <Typography variant="h6">{step.name}</Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box>
        <Typography variant="h4">{languagePackage?.TaskDescription}</Typography>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: taskDescription }}></div>
    </Box>
  );
};

export default Home;
