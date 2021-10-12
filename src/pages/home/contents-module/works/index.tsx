import React, { useContext } from 'react';
import { Wrapper } from './styled';
import Operation from './components/Operation';
import Works from './components/Works';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createWork, getUserWorks, removeWork, showHttpError, Work } from 'requests/requests';
import { message, Modal } from 'antd';
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
  const handleClickRemoveWork = async (workID: string) => {
    try {
      Modal.confirm({
        title: 'Do you want to delete this work?',
        icon: <ExclamationCircleOutlined />,
        content: '',
        onOk: async () => {
          await removeWork(workID);
          message.success(languagePackage?.SuccessToRemove);
          setLoad(load + 1);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <Operation onConfirm={(workName: string) => handleConfirmCreate(workName)} />
      <Works works={works} handleRemoveWork={handleClickRemoveWork} />
    </Wrapper>
  );
};

export default Studio;
