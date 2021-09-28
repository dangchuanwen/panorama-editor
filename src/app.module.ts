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

const MongodbURLMaps: Map<string, string> = new Map();
MongodbURLMaps.set('prod', 'mongodb://mongo:27017/panorama');
MongodbURLMaps.set('dev', 'mongodb://localhost:27017/panorama');

const mongodb_url = MongodbURLMaps.get(process.env.NODE_ENV);
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(mongodb_url),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
