import { Setting } from '../schemas/settings.schema';

export class UpdateSettingsDto implements Setting {
  grouped: boolean;
  showStudio: boolean;
  showPlayground: boolean;
  showFriends: boolean;
  showSettings: boolean;
  qiniuFilePrefix: string;
  clientHost: string;
}
