import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RegistryModule } from '../registry/registry.module';
import { GroupsModule } from '../groups/groups.module';
import { MemberModule } from '../member/member.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, RegistryModule, GroupsModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
