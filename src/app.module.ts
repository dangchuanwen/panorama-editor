import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { WorksModule } from './works/works.module';
import { QiniuModule } from './qiniu/qiniu.module';
import { PublishedWorkModule } from './publishedWorks/publishedWorks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/panorama'),
    AuthModule,
    UsersModule,
    WorksModule,
    PublishedWorkModule,
    QiniuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
