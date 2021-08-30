import { PanoramaTourConfig } from '../schemas/work.schema';

export class UpdateWorkDto {
  workID: string;
  panoramaTourConfig: PanoramaTourConfig;
}
