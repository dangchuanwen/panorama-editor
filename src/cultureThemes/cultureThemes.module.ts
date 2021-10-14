import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/user.module';
import { CultureThemesController } from './cultureThemes.controller';
import { CultureThemesService } from './cultureThemes.service';
import {
  CultureTheme,
  CultureThemeSchema,
} from './schemas/cultureTheme.schema';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      { name: CultureTheme.name, schema: CultureThemeSchema },
    ]),
  ],
  controllers: [CultureThemesController],
  providers: [CultureThemesService],
  exports: [CultureThemesService],
})
export class CultureThemesModule {}
