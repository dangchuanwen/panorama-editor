import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/user.service';
import { CultureThemesService } from './cultureThemes.service';
import { CreateCultureThemeDto } from './dto/createCultureTheme.dto';
import { UpdateUserPreferCultureThemesDto } from './dto/updateUserPreferCultureThemes.dto';
import { CultureTheme } from './schemas/cultureTheme.schema';

@Controller('cultureThemes')
export class CultureThemesController {
  constructor(
    private readonly cultureThemesService: CultureThemesService,
    private readonly usersService: UsersService,
  ) {}

  @Post('')
  async createCultureTheme(@Body() body: CreateCultureThemeDto) {
    if (!body.name) {
      throw new HttpException("name can't be empty!", HttpStatus.BAD_REQUEST);
    }
    const oldCultureTheme =
      await this.cultureThemesService.findCultureThemeByName(body.name);
    if (oldCultureTheme) {
      throw new HttpException('Culture theme exist!', HttpStatus.CONFLICT);
    }
    return this.cultureThemesService.createCultureTheme(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllCultureThemes(@Request() req: { user: JwtDto }) {
    const userPreferCultureThemes =
      await this.usersService.getUserPreferCultureThemes(req.user.userName);
    const allCultureThemes: Array<CultureTheme & { checked?: boolean }> =
      await this.cultureThemesService.findAllCultureThemes();
    allCultureThemes.forEach((cultureTheme) => {
      cultureTheme.checked = userPreferCultureThemes.find(
        (item) => item.name === cultureTheme.name,
      )
        ? true
        : false;
    });
    return allCultureThemes;
  }

  @UseGuards(JwtAuthGuard)
  @Put('user')
  async updateUserPreferCultureThemes(
    @Request() req: { user: JwtDto },
    @Body() body: UpdateUserPreferCultureThemesDto,
  ) {
    return this.usersService.updateUserPreferCultureThemes(
      req.user.userName,
      body.cultureThemesNames,
    );
  }
}
