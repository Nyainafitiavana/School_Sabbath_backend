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
exports.RegistryService = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("./../../utils/constant");
const typeorm_1 = require("typeorm");
const helper_1 = require("../../utils/helper");
const presence_service_1 = require("../presence/presence.service");
let RegistryService = class RegistryService {
    constructor(registryRepository, helper, presenceService) {
        this.registryRepository = registryRepository;
        this.helper = helper;
        this.presenceService = presenceService;
    }
    async create(createRegistryDto, createActivityData, createPresenceData) {
        const newRegistry = this.registryRepository.create({
            ...createRegistryDto,
        });
        await this.registryRepository.save(newRegistry);
        createPresenceData.map((presence) => {
            presence.registry = newRegistry;
            const createPresenceDto = presence;
            this.presenceService.create(createPresenceDto);
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
        };
    }
    async findAll(req, limit, page, group = null, quarterly = null, month = null, year = null) {
        const user = req['user'];
        const offset = await this.helper.calculOffset(limit, page);
        const query = this.registryRepository
            .createQueryBuilder('qb')
            .leftJoinAndSelect('qb.group', 'gp')
            .leftJoinAndSelect('qb.presence', 'prc')
            .leftJoinAndSelect('prc.member', 'mbr');
        if (!user.isAdmin) {
            query.where('gp.id = :groupId', { groupId: user.group.id });
        }
        else {
            query.where('true');
        }
        if (group) {
            query.andWhere('gp.id = :groupId', { groupId: group });
        }
        if (quarterly) {
            query.andWhere('qb.id = :quarterly', { quarterly: quarterly });
        }
        if (month) {
            query.andWhere('qb.month = :month', { month: month });
        }
        if (year) {
            query.andWhere('qb.year = :year', { year: month });
        }
        query.skip(offset);
        query.take(limit);
        const [registry, count] = await query.getManyAndCount();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
            data: registry,
            limit,
            page,
            totalRows: count,
        };
    }
    async findOne(id) {
        const registry = await this.registryRepository
            .createQueryBuilder('registry')
            .where('registry.id = :id', { id })
            .leftJoinAndSelect('registry.presence', 'presence')
            .leftJoinAndSelect('presence.member', 'member')
            .getOneOrFail();
        if (!registry) {
            return {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: constant_1.Constant.CONFLICT,
                data: registry,
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
            data: registry,
        };
    }
    async update(id, updateRegistryDto, createActivityData, createPresenceData) {
        const registry = await this.registryRepository.findOne({
            where: { id: id },
        });
        if (!registry) {
            return {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: constant_1.Constant.CONFLICT,
                data: registry,
            };
        }
        await this.registryRepository.update(registry.id, updateRegistryDto);
        createPresenceData.map((presence) => {
            const updatePresenceDto = presence;
            this.presenceService.update(presence.id, updatePresenceDto);
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "L'opération a été exécutée avec succès.",
        };
    }
    async remove(id) {
        const registry = await this.registryRepository.findOne({
            where: { id: id },
        });
        if (!registry) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: constant_1.Constant.CONFLICT,
                data: registry,
            };
        }
        await this.registryRepository.delete({ id: registry.id });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "L'opération a été exécutée avec succès.",
        };
    }
};
exports.RegistryService = RegistryService;
exports.RegistryService = RegistryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REGISTRY_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        helper_1.default,
        presence_service_1.PresenceService])
], RegistryService);
//# sourceMappingURL=registry.service.js.map