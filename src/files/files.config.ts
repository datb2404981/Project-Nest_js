import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import fs from "fs";
import { diskStorage } from "multer";
import path, { join } from "path";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {

  // Lấy root path của project
  getRootPath = () => {
    return process.cwd();
  };

  // Tạo folder nếu chưa tồn tại
  ensureExists(targetDirectory: string) {
    fs.mkdir(targetDirectory, { recursive: true }, (error) => {
      if (!error) {
        console.log("Directory created or already exists.");
        return;
      }

      switch (error.code) {
        case "EEXIST":
          console.error("Path exists but is not a folder.");
          break;
        case "ENOTDIR":
          console.error("A parent path is not a directory.");
          break;
        default:
          console.error(error);
          break;
      }
    });
  }

  // Multer configuration chính
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folder = req?.headers?.folder_type ?? "default";
          const targetPath = join(this.getRootPath(), `public/images/${folder}`);
          this.ensureExists(targetPath);
          cb(null, targetPath);
        },
        filename: (req, file, cb) => {
          const extName = path.extname(file.originalname); // .png, .jpg…
          const baseName = path.basename(file.originalname, extName);
          const finalName = `${baseName}-${Date.now()}${extName}`;
          cb(null, finalName);
        }
      }),
    };
  }
}