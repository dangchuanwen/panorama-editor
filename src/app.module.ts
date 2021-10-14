import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { WorksModule } from './works/works.module';
import { QiniuModule } from './qiniu/qiniu.module';
import { PublishedWorkModule } from './publishedWorks/publishedWorks.module';
import { CommentModule } from './comment/comment.module';
import { LanguageModule } from './language/language.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CultureThemesModule } from './cultureThemes/cultureThemes.module';
import { SettingsModule } from './settings/settings.module';

const getMongoDBURL = () => {
  const MongodbURLMaps: Map<string, string> = new Map();
  MongodbURLMaps.set('prod', process.env.MONGODB_URL);
  MongodbURLMaps.set('dev', 'mongodb://localhost:27017/panorama');

  const mongodb_url = MongodbURLMaps.get(process.env.NODE_ENV);
  return mongodb_url;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getMongoDBURL()),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    AuthModule,
    UsersModule,
    WorksModule,
    PublishedWorkModule,
    QiniuModule,
    CommentModule,
    LanguageModule,
    CultureThemesModule,
    SettingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
