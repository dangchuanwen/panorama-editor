import { GetLanguagePackageDto } from './dto/getLanguagePackage.dto';
import { WebsiteTexts } from './packages/WebsiteTexts';
export declare class LanguageController {
    getLanguagePackage({ languageName }: GetLanguagePackageDto): WebsiteTexts;
}
