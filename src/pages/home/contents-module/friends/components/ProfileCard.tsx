/* eslint-disable react/jsx-no-target-blank */
import { Card, CardContent, Avatar, Typography, Button } from '@material-ui/core';
import Iconfont from 'components/Iconfont';
import { CountryData, Gender, getCountryData } from 'interface';
import { getLanguageFromLocalStorage, LanguageNames, LanguageContext } from 'language';
import { FC, useContext } from 'react';
import { User } from 'requests/requests';
import classes from './style.module.css';
interface Props {
  profile: User;
}
interface GenderIcon {
  name: string;
  gender: Gender;
  color: string;
}
const feMaleIcon: GenderIcon = { name: 'icon-male', gender: Gender.Female, color: '#d4237a' };
const maleIcon: GenderIcon = { name: 'icon-male1', gender: Gender.Male, color: '#1296db' };
const GenderIconsMap: Map<Gender, GenderIcon> = new Map();
GenderIconsMap.set(Gender.Female, feMaleIcon);
GenderIconsMap.set(Gender.Male, maleIcon);

const ProfileCard: FC<Props> = ({ profile }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
  const languageName: LanguageNames = getLanguageFromLocalStorage();
  const genderIcon: GenderIcon = GenderIconsMap.get(profile.gender) || feMaleIcon;
  const countryData: CountryData | undefined = getCountryData(profile.country);
  const countryName: string =
    (countryData && (languageName === LanguageNames.cn ? countryData.cnText : countryData?.enText)) || '';
  return (
    <Card className={classes.profileCard}>
      <CardContent className={classes.avatarBox}>
        <Avatar className={classes.avatar} src={profile.avatarUrl} />
      </CardContent>
      <CardContent className={classes.profileBox}>
        <Typography variant="h5">
          <span>{profile.userName}</span>
          <Iconfont className={classes.genderIcon} name={genderIcon.name} color={genderIcon.color}></Iconfont>
        </Typography>
        <p>
          <strong>Country: </strong>
          <small className={classes.countryName}>{countryName}</small>
          <img className={classes.nationalFlag} src={countryData?.nationalFlag} />
        </p>
        <p>
          <a href={profile.introductionVideoLink} target="_blank">
            <Button color="primary" size="small">
              {languagePackage?.IntroductionVideo}
            </Button>
          </a>
        </p>
        <p>
          <a href={profile.introductionTextLink} target="_blank">
            <Button color="secondary" size="small">
              {languagePackage?.IntroductionText}
            </Button>
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
