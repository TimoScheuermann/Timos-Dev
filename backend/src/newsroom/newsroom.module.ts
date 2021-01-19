import { Module } from '@nestjs/common';
import { NewsroomController } from './newsroom.controller';
import { NewsroomService } from './newsroom.service';

@Module({
  controllers: [NewsroomController],
  providers: [NewsroomService]
})
export class NewsroomModule {}
