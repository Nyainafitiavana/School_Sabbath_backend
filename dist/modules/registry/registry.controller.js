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
exports.RegistryController = void 0;
const common_1 = require("@nestjs/common");
const registry_service_1 = require("./registry.service");
const helper_1 = require("./../../utils/helper");
const auth_guards_1 = require("../auth/auth.guards");
let RegistryController = class RegistryController {
    constructor(registryService, helper) {
        this.registryService = registryService;
        this.helper = helper;
    }
    async create(res, next, req) {
        try {
            const activity = req.body.activity;
            const presences = req.body.presence;
            const createRegistryDto = req.body;
            const createRegistry = await this.registryService.create(createRegistryDto, activity, presences);
            res.status(createRegistry.statusCode).json(createRegistry);
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
            const quarterly = req.query.quarterly
                ? Number(req.query.quarterly)
                : null;
            const month = req.query.month ? Number(req.query.month) : null;
            const year = req.query.year ? Number(req.query.year) : null;
            const registry = await this.registryService.findAll(req, limit, page, group, quarterly, month, year);
            res.status(registry.statusCode).json(registry);
        }
        catch (error) {
            next(error);
        }
    }
    async findOne(id, res, next) {
        try {
            const quarterly = await this.registryService.findOne(id);
            res.status(quarterly.statusCode).json(quarterly);
        }
        catch (error) {
            next(error);
        }
    }
    async update(id, res, req, next) {
        try {
            const activityUpdate = req.body.activity;
            const presencesUpdate = req.body.presence;
            delete req.body.activity;
            delete req.body.presence;
            const updateRegistryDto = req.body;
            const result = await this.registryService.update(id, updateRegistryDto, activityUpdate, presencesUpdate);
            res.status(result.statusCode).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async remove(id, res, next) {
        try {
            const result = await this.registryService.remove(id);
            res.status(result.statusCode).json(result);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.RegistryController = RegistryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Object]),
    __metadata("design:returntype", Promise)
], RegistryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Object]),
    __metadata("design:returntype", Promise)
], RegistryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function]),
    __metadata("design:returntype", Promise)
], RegistryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], RegistryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function]),
    __metadata("design:returntype", Promise)
], RegistryController.prototype, "remove", null);
exports.RegistryController = RegistryController = __decorate([
    (0, common_1.Controller)('/api/registry'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __metadata("design:paramtypes", [registry_service_1.RegistryService,
        helper_1.default])
], RegistryController);
//# sourceMappingURL=registry.controller.js.map