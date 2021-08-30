import { WorkTheme } from '../schemas/work.schema';

export class CreateWorkDto {
  workName: string;
  workTheme: WorkTheme;
}
