import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInterface } from './auth.interface';
import { MemberService } from '../member/member.service';
import { Member } from '../member/entities/member.entity';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<AuthInterface> {
    const member: Member = await this.memberService.findOneByEmail(email);

    if (!member) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: `Cet e-mail ${email} n'a pas été trouvé`,
      };
    }

    if (password !== member.password) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'Mot de passe incorrect !',
      };
    }

    delete member.password;

    return {
      statusCode: HttpStatus.OK,
      message: 'Login success',
      access_token: await this.jwtService.signAsync({ member }),
      isAdmin: member.isAdmin,
      isManager: member.isManager,
      group: member.group,
    };
  }
}
