import { Controller, Get, Param } from '@nestjs/common';
import {
  GetLanguagePackageDto,
  LanguageNames,
} from './dto/getLanguagePackage.dto';
import { NoMatchedLanguage } from './exceptions/no-matched-language';
import { ChineseTexts } from './packages/ChineseTexts';
import { EnglishTexts } from './packages/EnglishTexts';
import { WebsiteTexts } from './packages/WebsiteTexts';

@Controller('languages')
export class LanguageController {
  @Get('/:languageName')
  getLanguagePackage(
    @Param() { languageName }: GetLanguagePackageDto,
  ): WebsiteTexts {
    let languagePackage: WebsiteTexts;
    switch (languageName) {
      case LanguageNames.cn:
        languagePackage = ChineseTexts;
        break;
      case LanguageNames.en:
        languagePackage = EnglishTexts;
        break;
      default:
        throw new NoMatchedLanguage();
    }
    return languagePackage;
  }
}
