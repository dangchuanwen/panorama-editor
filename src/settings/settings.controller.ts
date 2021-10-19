import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { UpdateSettingsDto } from './dto/updateSettings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get('')
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @UseGuards(AdminAuthGuard)
  @Put('')
  async updateSettings(@Body() body: UpdateSettingsDto) {
    return this.settingsService.updateSettings(body);
  }
}
