import { Box, Avatar, FormControl, InputAdornment, Input, Button } from '@material-ui/core';
import { message } from 'antd';

import CountrySelecter from 'components/CountrySelecter';
import GenderSelecter from 'components/GenderSelecter';
import Iconfont from 'components/Iconfont';
import UploadFile from 'components/UploadFile';
import { Country, Gender } from 'interface';
import { LanguageContext } from 'language';
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { getUserInformation, updateProfile, User } from 'requests/requests';
import { SettingsContext } from 'settings';
import { uploadFile } from 'utils';
import classes from './style.module.css';

type UserWithExtra = User & {
  editAbleOfIntroductionVideoLink?: boolean;
};
const Settings: FC = () => {
  const settings = useContext(SettingsContext);
  const { languagePackage } = useContext(LanguageContext);
  const [requestProfile, setRequestProfile] = useState<number>(0);
  const [profile, setProfile] = useState<UserWithExtra | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await getUserInformation();
      const profile: UserWithExtra = res.data;
      setProfile(profile);
    };
    fetchUserProfile();
  }, [requestProfile]);

  const handleClickSubmit = async () => {
    if (profile) {
      await updateProfile(profile);
      message.success(languagePackage?.SaveSuccessfully);
      setRequestProfile(requestProfile + 1);
    }
  };

  const handleChooseFile = (file: File | null) => {
    if (file) {
      uploadFile(file).then((res) => {
        if (res && res.hash && profile) {
          setProfile({ ...profile, avatarUrl: `${settings?.qiniuFilePrefix}/${res.hash}` });
        }
      });
    }
  };

  return (
    <>
      {profile && (
        <Box className={classes.settingsBox}>
          <UploadFile
            handleChooseFile={handleChooseFile}
            triggerElement={
              <Box className={classes.avatarBox}>
                <Avatar className={classes.avatar} src={profile.avatarUrl} />
                <Box className={classes.cameraIconBox}>
                  <Iconfont name="icon-xiangji" color="white" className={classes.cameraIcon}></Iconfont>
                </Box>
              </Box>
            }
          />
          <p className={classes.profileUnit}>
            <strong>Your Name: </strong>
            <FormControl variant="filled" className={classes.formControl}>
              <Input type="text" disabled value={profile.userName} />
            </FormControl>
          </p>
          <p className={classes.profileUnit}>
            <strong>Gender: </strong>
            <GenderSelecter
              gender={profile.gender}
              handleSelectGender={(gender: Gender) => setProfile({ ...profile, gender })}
            />
          </p>
          <p className={classes.profileUnit}>
            <strong>Country: </strong>
            <CountrySelecter
              country={profile.country}
              handleSelectCountry={(country: Country) => setProfile({ ...profile, country })}
            />
          </p>
          <p className={classes.profileUnit}>
            <strong>Self-Introduction Video Link: </strong>
            <FormControl variant="filled" className={classes.formControl}>
              <Input
                type="text"
                disabled={!profile.editAbleOfIntroductionVideoLink}
                value={profile.introductionVideoLink}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setProfile({ ...profile, introductionVideoLink: e.target.value });
                }}
                onBlur={() => setProfile({ ...profile, editAbleOfIntroductionVideoLink: false })}
                endAdornment={
                  <InputAdornment position="end">
                    <Box onClick={() => setProfile({ ...profile, editAbleOfIntroductionVideoLink: true })}>
                      <Iconfont name="icon-bianji" color="gray" className={classes.editIcon}></Iconfont>
                    </Box>
                  </InputAdornment>
                }
              />
            </FormControl>
          </p>
          <Button className={classes.submitBtn} variant="contained" color="primary" onClick={() => handleClickSubmit()}>
            Submit
          </Button>
        </Box>
      )}
    </>
  );
};

export default Settings;
