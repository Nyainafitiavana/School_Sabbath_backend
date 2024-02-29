import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { memberProviders } from './member.providers';
import Helper from './../../utils/helper';
import { DatabaseModule } from './../../config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [...memberProviders, MemberService, Helper],
  exports: [MemberService],
})
export class MemberModule {}
