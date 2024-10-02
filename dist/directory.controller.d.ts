import { DirectoryService } from './directory.service';
export declare class DirectoryController {
    private readonly directoryService;
    constructor(directoryService: DirectoryService);
    getDirectories(directoryPath: string): Promise<{
        name: string;
        creationDate: Date;
    }[]>;
}
