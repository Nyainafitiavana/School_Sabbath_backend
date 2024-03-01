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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const create_member_dto_1 = require("./dto/create-member.dto");
const update_member_dto_1 = require("./dto/update-member.dto");
const helper_1 = require("./../../utils/helper");
const auth_guards_1 = require("../auth/auth.guards");
let MemberController = class MemberController {
    constructor(memberService, helper) {
        this.memberService = memberService;
        this.helper = helper;
    }
    async create(res, next, createMemberDto) {
        try {
            const creactMember = await this.memberService.create(createMemberDto);
            res.status(creactMember.statusCode).json(creactMember);
        }
        catch (error) {
            next(error);
        }
    }
    async findAll(res, next, req) {
        try {
            const limit = Number(req.query.limit);
            const page = Number(req.query.page);
            const group = req.query.group ? Number(req.query.group) : null;
            const value = req.query.value ? req.query.value : '';
            const members = await this.memberService.findAll(req, limit, page, value, group);
            res.status(members.statusCode).json(members);
        }
        catch (error) {
            next(error);
        }
    }
    async findOne(id, res, next) {
        try {
            const member = await this.memberService.findOne(id);
            res.status(member.statusCode).json(member);
        }
        catch (error) {
            next(error);
        }
    }
    async update(id, res, updateMemberDto, next) {
        try {
            const result = await this.memberService.update(id, updateMemberDto);
            res.status(result.statusCode).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async remove(id, res, next) {
        try {
            const result = await this.memberService.remove(id);
            res.status(result.statusCode).json(result);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.MemberController = MemberController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, create_member_dto_1.CreateMemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Object]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_member_dto_1.UpdateMemberDto, Function]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "remove", null);
exports.MemberController = MemberController = __decorate([
    (0, common_1.Controller)('/api/member'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __metadata("design:paramtypes", [member_service_1.MemberService,
        helper_1.default])
], MemberController);
//# sourceMappingURL=member.controller.js.map