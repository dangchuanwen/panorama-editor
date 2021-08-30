import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/user.module';
import { WorksModule } from 'src/works/works.module';
import { PublishedWorkController } from './publishedWork.controller';
import { PublishedWorkService } from './publishedWork.service';
import {
  PublishedWork,
  PublishedWorkSchema,
} from './schemas/publishedWork.schema';

@Module({
  imports: [
    UsersModule,
    WorksModule,
    MongooseModule.forFeature([
      { name: PublishedWork.name, schema: PublishedWorkSchema },
    ]),
  ],
  controllers: [PublishedWorkController],
  providers: [PublishedWorkService],
})
export class PublishedWorkModule {}
