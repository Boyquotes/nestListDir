import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class DirectoryService {
  async listDirectories(directoryPath: string): Promise<{ name: string, creationDate: Date }[]> {
    const directories: { name: string, creationDate: Date }[] = [];
    
    // Vérifier si le chemin existe
    if (fs.existsSync(directoryPath)) {
      const files = await fs.readdir(directoryPath);

      // Boucle pour vérifier si chaque élément est un répertoire
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
          directories.push({ name: file, creationDate: stat.birthtime });
        }
      }
      // Trier les répertoires par date de création (du plus récent au plus ancien)
      directories.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());


    } else {
      throw new Error('Le chemin du répertoire est invalide.');
    }

    return directories;
  }
}
