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
const mongodb_url = process.env.NODE_ENV
  ? 'mongodb+srv://qwer1234:qwer1234@cluster0.xa6fp.mongodb.net/panorama'
  : 'mongodb://localhost:27017/panorama';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(mongodb_url),
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
