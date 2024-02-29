import { JwtService } from '@nestjs/jwt';
import { AuthInterface } from './auth.interface';
import { MemberService } from '../member/member.service';
export declare class AuthService {
    private memberService;
    private jwtService;
    constructor(memberService: MemberService, jwtService: JwtService);
    signIn(email: string, password: string): Promise<AuthInterface>;
}
