import { PanoramaTourConfig } from '../schemas/work.schema';

export class UpdateWorkDto {
  workName: string;
  panoramaTourConfig: PanoramaTourConfig;
}