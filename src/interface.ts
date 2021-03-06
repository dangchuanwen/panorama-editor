import React from 'react';
import { RouteProps } from 'react-router';
import { IHotSpot } from 'types/pannellum/interface';

export type IHOCRoute = React.FC<RouteProps>;
export enum HOCRouteTypes {
  public,
  protected,
}
export enum Country {
  China,
  Uzbekistan,
  Indonesia,
}
export type CountryData = {
  text: string;
  cnText?: string;
  enText?: string;
  value: Country;
  nationalFlag: string;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCountries = (countriesTexts: Map<Country, string>) => {
  const res: CountryData[] = [
    {
      text: countriesTexts.get(Country.China) || '',
      value: Country.China,
      nationalFlag: 'http://icetnnu.ltd/national-flag-cn.png',
    },
    {
      text: countriesTexts.get(Country.Uzbekistan) || '',
      value: Country.Uzbekistan,
      nationalFlag: 'http://icetnnu.ltd/national-flag-uzb.png',
    },
    {
      text: countriesTexts.get(Country.Indonesia) || '',
      value: Country.Indonesia,
      nationalFlag: 'http://icetnnu.ltd/national-flag-idn.png',
    },
  ];

  return res;
};

export const countries: CountryData[] = [
  {
    text: '中国',
    cnText: '中国',
    enText: 'China',
    value: Country.China,
    nationalFlag: 'http://icetnnu.ltd/national-flag-cn.png',
  },
  {
    text: '乌兹别克斯坦',
    cnText: '乌兹别克斯坦',
    enText: 'Uzbekistan',
    value: Country.Uzbekistan,
    nationalFlag: 'http://icetnnu.ltd/national-flag-uzb.png',
  },
  {
    text: '印度尼西亚',
    cnText: '印度尼西亚',
    enText: 'Indonesia',
    value: Country.Indonesia,
    nationalFlag: 'http://icetnnu.ltd/national-flag-idn.png',
  },
];
export const getCountryData: (c: Country) => CountryData | undefined = (country: Country) => {
  return countries.find((item) => item.value === country);
};
export enum ToolNames {
  Link = 'Link',
  Tip = 'Tip',
  Font = 'Font',
}
export enum Gender {
  Male,
  Female,
}
export const getAvatorOfGender: (g: Gender) => string = (gender: Gender) => {
  return gender === Gender.Female ? 'http://icetnnu.ltd/female.png' : 'http://icetnnu.ltd/male.png';
};
export type QiniuCompeleteRes = {
  key: string;
  hash: string;
};
export type IPanoramaTourItem = {
  panoramaImageUrl: string;
  hotSpots: IHotSpot[];
};
