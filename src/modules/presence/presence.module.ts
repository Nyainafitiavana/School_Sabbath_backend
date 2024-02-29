import { Module } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceController } from './presence.controller';
import Helper from './../../utils/helper';
import { DatabaseModule } from './../../config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PresenceController],
  providers: [PresenceService, Helper],
  exports: [PresenceService],
})
export class PresenceModule {}
