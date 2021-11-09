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
import { TasksProcessModule } from './tasksProcess/tasksProcess.module';

const getMongoDBURL = () => {
  return process.env.MONGODB_URL;
};

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/backstage',
      rootPath: join(__dirname, '..', 'backstage'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.dev.env', '.prod.env'],
    }),
    MongooseModule.forRoot(getMongoDBURL()),
    AuthModule,
    UsersModule,
    WorksModule,
    PublishedWorkModule,
    QiniuModule,
    CommentModule,
    LanguageModule,
    CultureThemesModule,
    SettingsModule,
    TasksProcessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
