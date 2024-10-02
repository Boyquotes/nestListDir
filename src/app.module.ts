import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectoryService } from './directory.service';
import { DirectoryController } from './directory.controller';

@Module({
  imports: [],
  controllers: [AppController,DirectoryController],
  providers: [AppService,DirectoryService],
})
export class AppModule {}
