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
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const groups_service_1 = require("./groups.service");
const update_group_dto_1 = require("./dto/update-group.dto");
const helper_1 = require("./../../utils/helper");
const create_group_dto_1 = require("./dto/create-group.dto");
const auth_guards_1 = require("../auth/auth.guards");
let GroupsController = class GroupsController {
    constructor(groupsService, helper) {
        this.groupsService = groupsService;
        this.helper = helper;
    }
    async create(res, next, createGroupDto) {
        try {
            const creactGroup = await this.groupsService.create(createGroupDto);
            res.status(creactGroup.statusCode).json(creactGroup);
        }
        catch (error) {
            next(error);
        }
    }
    async findAll(res, next, req) {
        try {
            const limit = Number(req.query.limit);
            const page = Number(req.query.page);
            const value = req.query.value ? req.query.value : '';
            const groups = await this.groupsService.findAll(limit, page, value);
            res.status(groups.statusCode).json(groups);
        }
        catch (error) {
            next(error);
        }
    }
    async findOne(id, res, next) {
        try {
            const group = await this.groupsService.findOne(id);
            res.status(group.statusCode).json(group);
        }
        catch (error) {
            next(error);
        }
    }
    async update(id, res, updateGroupDto, next) {
        try {
            const result = await this.groupsService.update(id, updateGroupDto);
            res.status(result.statusCode).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async remove(id, res, next) {
        try {
            const result = await this.groupsService.remove(id);
            res.status(result.statusCode).json(result);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.GroupsController = GroupsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_group_dto_1.UpdateGroupDto, Function]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "remove", null);
exports.GroupsController = GroupsController = __decorate([
    (0, common_1.Controller)('/api/groups'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __metadata("design:paramtypes", [groups_service_1.GroupsService,
        helper_1.default])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map