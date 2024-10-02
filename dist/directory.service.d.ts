export declare class DirectoryService {
    listDirectories(directoryPath: string): Promise<{
        name: string;
        creationDate: Date;
    }[]>;
}
