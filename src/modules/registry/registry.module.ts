import { Module } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { RegistryController } from './registry.controller';
import { DatabaseModule } from './../../config/database/database.module';
import { registryProviders } from './registry.providers';
import Helper from './../../utils/helper';
import { presenceProviders } from '../presence/presence.providers';
import { PresenceService } from '../presence/presence.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RegistryController],
  providers: [
    ...registryProviders,
    RegistryService,
    Helper,
    ...presenceProviders,
    PresenceService,
  ],
})
export class RegistryModule {}
