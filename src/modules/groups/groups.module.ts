import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { groupProviders } from './groups.providers';
import Helper from 'src/utils/helper';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupsController],
  providers: [...groupProviders, GroupsService, Helper],
})
export class GroupsModule {}
