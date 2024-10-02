import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class DirectoryService {
  async listDirectories(directoryPath: string): Promise<{ name: string, creationDate: Date }[]> {
    const directories: { name: string, creationDate: Date }[] = [];
    const ignoredDirectory = 'node_modules';
    
    if (fs.existsSync(directoryPath)) {
      const files = await fs.readdir(directoryPath);

      for (const file of files) {
        const filePath = path.join(directoryPath, file);

        try {
          // Utiliser lstat pour vérifier si c'est un lien symbolique
          const stat = await fs.lstat(filePath);

          // Ignorer le répertoire spécifié
          if (file === ignoredDirectory) {
            console.log(`Ignorer le répertoire: ${filePath}`);
            continue; // Passez à l'itération suivante de la boucle
          }

          if (stat.isDirectory()) {
            // C'est un répertoire ordinaire
            directories.push({ name: file, creationDate: stat.birthtime });
          } else if (stat.isSymbolicLink()) {
            // C'est un lien symbolique, on doit vérifier la cible
            const realPath = await fs.realpath(filePath);
            const realStat = await fs.stat(realPath);
            
            // Vérifier si la cible du lien symbolique est un répertoire
            if (realStat.isDirectory()) {
              directories.push({ name: file, creationDate: realStat.birthtime });
            }
          }
        } catch (err) {
          console.error(`Erreur lors de la gestion du fichier ${file}: ${err.message}`);
          // Continuer même si une erreur survient avec un fichier/lien symbolique
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
