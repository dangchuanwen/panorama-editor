import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCultureThemeDto } from './dto/createCultureTheme.dto';
import {
  CultureTheme,
  CultureThemeDocument,
} from './schemas/cultureTheme.schema';

@Injectable()
export class CultureThemesService {
  constructor(
    @InjectModel(CultureTheme.name)
    private readonly CultureThemesModel: Model<CultureThemeDocument>,
  ) {}

  async createCultureTheme(body: CreateCultureThemeDto) {
    return this.CultureThemesModel.create(body);
  }

  async findCultureThemeByName(name: string) {
    return this.CultureThemesModel.findOne({ name });
  }

  async findAllCultureThemes() {
    return this.CultureThemesModel.find().lean();
  }
}