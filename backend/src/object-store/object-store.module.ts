import { Module } from "@nestjs/common";

import { ObjectStoreController } from "./object-store.controller";
import { ObjectStoreService } from "./object-store.service";
import { StorageService } from "./storage.service";

/** Receipt Object Storage. */
@Module({ controllers: [ObjectStoreController], providers: [ObjectStoreService, StorageService] })
export class ObjectStoreModule {}
