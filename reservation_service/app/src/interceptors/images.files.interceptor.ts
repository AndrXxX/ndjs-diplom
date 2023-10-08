import { NestInterceptor, Type } from '@nestjs/common';
import { FilesInterceptor } from "@nestjs/platform-express";
import config from "src/config";

export function ImagesFilesInterceptor(): Type<NestInterceptor> {
  return FilesInterceptor('images', null, { dest: `./${config.imagesUploadPath}` });
}
