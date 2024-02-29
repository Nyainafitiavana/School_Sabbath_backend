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
exports.PresenceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const constant_1 = require("../../utils/constant");
const helper_1 = require("../../utils/helper");
let PresenceService = class PresenceService {
    constructor(presenceRepository, helper) {
        this.presenceRepository = presenceRepository;
        this.helper = helper;
    }
    async create(createPresenceDto) {
        const newPresence = this.presenceRepository.create({
            ...createPresenceDto,
        });
        await this.presenceRepository.save(newPresence);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
        };
    }
    async update(id, updatePresenceDto) {
        const presence = await this.presenceRepository.findOne({
            where: { id: id },
        });
        if (!presence) {
            return {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: constant_1.Constant.CONFLICT,
                data: presence,
            };
        }
        await this.presenceRepository.update(presence.id, updatePresenceDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "L'opération a été exécutée avec succès.",
        };
    }
};
exports.PresenceService = PresenceService;
exports.PresenceService = PresenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRESENCE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        helper_1.default])
], PresenceService);
//# sourceMappingURL=presence.service.js.map