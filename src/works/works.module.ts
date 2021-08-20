import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/user.module';
import { Work, WorksSchema } from './schemas/work.schema';
import { WorksController } from './works.controller';
import { WorksService } from './works.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([{ name: Work.name, schema: WorksSchema }]),
  ],
  controllers: [WorksController],
  providers: [WorksService],
})
export class WorksModule {}
