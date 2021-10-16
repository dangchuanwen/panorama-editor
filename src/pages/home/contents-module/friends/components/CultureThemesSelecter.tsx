import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button, Tooltip } from '@material-ui/core';
import { message } from 'antd';
import { LanguageContext } from 'language';
import { FC, useEffect, useState, ChangeEvent, useContext } from 'react';
import { CultureTheme, getCultureThemes, updatePreferCultureThemes } from 'requests/requests';
import { SettingsContext } from 'settings';

import classes from './style.module.css';

type CultureThemeWithChecked = CultureTheme & {
  checked?: boolean;
};

const CultureThemesSelecter: FC = () => {
  const settings = useContext(SettingsContext);
  const { languagePackage } = useContext(LanguageContext);

  const [cultureThemes, setCultureThemes] = useState<CultureThemeWithChecked[]>([]);
  useEffect(() => {
    const fetchCultureThemes = async () => {
      try {
        const res = await getCultureThemes();
        setCultureThemes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCultureThemes();
  }, []);

  const handleCultureThemeChecked = (cultureThemeName: string, checked: boolean) => {
    setCultureThemes(
      cultureThemes.map((cultureTheme) => {
        if (cultureTheme.name === cultureThemeName) {
          cultureTheme.checked = checked;
        }
        return cultureTheme;
      }),
    );
  };

  const handleClickSubmit = async () => {
    const checkedCount = cultureThemes.filter((cultureTheme) => cultureTheme.checked).length;
    if (checkedCount < 6) {
      message.info(languagePackage?.PleaseSelectAtLeastSixCultureThemesYouInterestedIn);
      return;
    }
    const checkedPreferCultureThemesNames = cultureThemes
      .filter((cultureTheme) => cultureTheme.checked)
      .map((cultureTheme) => cultureTheme.name);
    const res = await updatePreferCultureThemes(checkedPreferCultureThemesNames);
    if (res.status === 200) {
      message.success(languagePackage?.SuccessToSubmit);
    }
  };

  const renderCultureThemes = () => {
    return cultureThemes.map((cultureTheme) => {
      const name = cultureTheme.name;
      const formatCultureThemeName = name.slice(0, 1).toUpperCase() + name.slice(1);

      return (
        <Tooltip title={cultureTheme.description || ''} placement="top" arrow key={cultureTheme.name}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(_e: ChangeEvent<HTMLInputElement>, checked: boolean) =>
                  handleCultureThemeChecked(name, checked)
                }
                checked={Boolean(cultureTheme.checked)}
              />
            }
            label={formatCultureThemeName}
          />
        </Tooltip>
      );
    });
  };

  return (
    <Box>
      {settings && !settings.grouped && (
        <>
          <Typography variant="h5" component="div" gutterBottom>
            {languagePackage?.SelectAtLeastSixCultureThemesYouInterestedIn}
          </Typography>

          <FormGroup row className={classes.cultureThemes}>
            {renderCultureThemes()}
          </FormGroup>
          <Button variant="contained" color="primary" onClick={() => handleClickSubmit()}>
            Submit
          </Button>
        </>
      )}
    </Box>
  );
};

export default CultureThemesSelecter;
