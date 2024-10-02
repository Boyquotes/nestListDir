import { Controller, Get, Query } from '@nestjs/common';
import { DirectoryService } from './directory.service';

@Controller('directories')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Get()
  async getDirectories(@Query('path') directoryPath: string) {
    return this.directoryService.listDirectories(directoryPath);
  }
}
