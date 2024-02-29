import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import Helper from 'src/utils/helper';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
    MemberModule,
  ],
  providers: [AuthService, Helper],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
