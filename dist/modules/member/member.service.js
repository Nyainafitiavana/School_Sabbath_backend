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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("../../utils/constant");
const typeorm_1 = require("typeorm");
const helper_1 = require("./../../utils/helper");
let MemberService = class MemberService {
    constructor(memberRepository, helper) {
        this.memberRepository = memberRepository;
        this.helper = helper;
    }
    async create(createMemberDto) {
        const newMember = this.memberRepository.create({ ...createMemberDto });
        await this.memberRepository.save(newMember);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
        };
    }
    async findOneByEmail(email) {
        const member = await this.memberRepository.findOne({
            where: { email: email },
            relations: ['group'],
        });
        return member;
    }
    async findAll(req, limit, page, value, group) {
        const offset = await this.helper.calculOffset(limit, page);
        const user = req['user'];
        const query = this.memberRepository
            .createQueryBuilder('qb')
            .leftJoinAndSelect('qb.group', 'gp');
        if (!user.isAdmin) {
            query.where('gp.id = :groupId', { groupId: user.group.id });
        }
        else {
            query.where('true');
        }
        if (group) {
            query.andWhere('gp.id = :groupId', { groupId: group });
        }
        query
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where('LOWER(qb.fullName) LIKE LOWER(:val)', {
                val: `%${value}%`,
            })
                .orWhere('LOWER(qb.address) LIKE LOWER(:val)', {
                val: `%${value}%`,
            })
                .orWhere('LOWER(qb.phoneNumber) LIKE LOWER(:val)', {
                val: `%${value}%`,
            });
        }))
            .skip(offset)
            .take(limit);
        const [members, count] = await query.getManyAndCount();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
            data: members,
            limit,
            page,
            totalRows: count,
        };
    }
    async findOne(id) {
        const member = await this.memberRepository.findOne({
            where: { id: id },
            relations: ['group'],
        });
        if (!member) {
            return {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: constant_1.Constant.CONFLICT,
                data: member,
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
            data: member,
        };
    }
    async update(id, updateMemberDto) {
        const member = await this.memberRepository.findOne({
            where: { id: id },
        });
        if (!member) {
            return {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: constant_1.Constant.CONFLICT,
                data: member,
            };
        }
        await this.memberRepository.update(member.id, updateMemberDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "L'opération a été exécutée avec succès.",
        };
    }
    async remove(id) {
        const member = await this.memberRepository.findOne({
            where: { id: id },
        });
        if (!member) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: constant_1.Constant.CONFLICT,
                data: member,
            };
        }
        await this.memberRepository.delete({ id: member.id });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "L'opération a été exécutée avec succès.",
        };
    }
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MEMBER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        helper_1.default])
], MemberService);
//# sourceMappingURL=member.service.js.map