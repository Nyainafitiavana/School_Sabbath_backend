import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RegistryModule } from '../registry/registry.module';
import { GroupsModule } from '../groups/groups.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [AuthModule, RegistryModule, GroupsModule, MemberModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
