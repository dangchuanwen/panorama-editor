import React, { useContext } from 'react';
import { Wrapper } from './styled';
import Operation from './components/Operation';
import Works from './components/Works';

import { createWork, getUserWorks, showHttpError, Work } from 'requests/requests';
import { message } from 'antd';
import { LanguageContext } from 'language';
const Studio: React.FC = () => {
  const { languagePackage } = useContext(LanguageContext);
  const [load, setLoad] = React.useState<number>(1);
  const [works, setWorks] = React.useState<Work[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getUserWorks();
      if (res && res.data) {
        setWorks(res.data);
      }
    };
    fetchData();
  }, [load]);
  const handleConfirmCreate = async (workName: string) => {
    try {
      await createWork(workName);
      message.success(languagePackage?.SuccessToCreate);
      setLoad(load + 1);
    } catch (err) {
      showHttpError(err, '该作品');
    }
  };
  return (
    <Wrapper>
      <Operation onConfirm={(workName: string) => handleConfirmCreate(workName)} />
      <Works works={works} />
    </Wrapper>
  );
};

export default Studio;
