"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const member_service_1 = require("../member/member.service");
let AuthService = class AuthService {
    constructor(memberService, jwtService) {
        this.memberService = memberService;
        this.jwtService = jwtService;
    }
    async signIn(email, password) {
        const member = await this.memberService.findOneByEmail(email);
        if (!member) {
            return {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: `Cet e-mail ${email} n'a pas été trouvé`,
            };
        }
        if (password !== member.password) {
            return {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: 'Mot de passe incorrect !',
            };
        }
        delete member.password;
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Login success',
            access_token: await this.jwtService.signAsync({ member }),
            isAdmin: member.isAdmin,
            isManager: member.isManager,
            group: member.group,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [member_service_1.MemberService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map