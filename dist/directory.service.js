"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs-extra");
const path = require("path");
let DirectoryService = class DirectoryService {
    async listDirectories(directoryPath) {
        const directories = [];
        const ignoredDirectory = 'node_modules';
        if (fs.existsSync(directoryPath)) {
            const files = await fs.readdir(directoryPath);
            for (const file of files) {
                const filePath = path.join(directoryPath, file);
                try {
                    const stat = await fs.lstat(filePath);
                    if (file === ignoredDirectory) {
                        console.log(`Ignorer le répertoire: ${filePath}`);
                        continue;
                    }
                    if (stat.isDirectory()) {
                        directories.push({ name: file, creationDate: stat.birthtime });
                    }
                    else if (stat.isSymbolicLink()) {
                        const realPath = await fs.realpath(filePath);
                        const realStat = await fs.stat(realPath);
                        if (realStat.isDirectory()) {
                            directories.push({ name: file, creationDate: realStat.birthtime });
                        }
                    }
                }
                catch (err) {
                    console.error(`Erreur lors de la gestion du fichier ${file}: ${err.message}`);
                }
            }
            directories.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
        }
        else {
            throw new Error('Le chemin du répertoire est invalide.');
        }
        return directories;
    }
};
exports.DirectoryService = DirectoryService;
exports.DirectoryService = DirectoryService = __decorate([
    (0, common_1.Injectable)()
], DirectoryService);
//# sourceMappingURL=directory.service.js.map