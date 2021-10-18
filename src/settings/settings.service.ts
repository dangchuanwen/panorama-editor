import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name)
    private readonly settingsModel: Model<SettingDocument>,
  ) {}

  async initSettings() {
    return this.settingsModel.create({});
  }

  async updateSettings(newSettings: Setting) {
    const settings = await this.settingsModel.findOne().lean();
    return this.settingsModel.findByIdAndUpdate(settings._id, newSettings, {
      useFindAndModify: false,
    });
  }

  async updateGrouped(newVal: boolean) {
    const settings = await this.settingsModel.findOne();
    settings.grouped = newVal;
    settings.save();
  }

  async getSettings() {
    const settings = await this.settingsModel.findOne()
    if (!settings) {
      return this.initSettings();
    }
    return settings;
  }
}
