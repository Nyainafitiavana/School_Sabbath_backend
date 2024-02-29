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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const helper_1 = require("./../../utils/helper");
const constant_1 = require("./../../utils/constant");
let GroupsService = class GroupsService {
    constructor(groupRepository, helper) {
        this.groupRepository = groupRepository;
        this.helper = helper;
    }
    async create(createGroupDto) {
        const newGroup = this.groupRepository.create({ ...createGroupDto });
        await this.groupRepository.save(newGroup);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
        };
    }
    async findAll(limit, page, value) {
        const offset = await this.helper.calculOffset(limit, page);
        const query = this.groupRepository
            .createQueryBuilder('qb')
            .where(new typeorm_1.Brackets((qb) => {
            qb.where('LOWER(qb.designation) LIKE LOWER(:val)', {
                val: `%${value}%`,
            }).orWhere('qb.year LIKE :val', { val: `%${value}%` });
        }))
            .skip(offset)
            .take(limit);
        const [groups, count] = await query.getManyAndCount();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
            data: groups,
            limit,
            page,
            totalRows: count,
        };
    }
    async findOne(id) {
        const group = await this.groupRepository.findOne({
            where: { id: id },
        });
        if (!group) {
            return {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: constant_1.Constant.CONFLICT,
                data: group,
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constant_1.Constant.OK,
            data: group,
        };
    }
    async update(id, updateGroupDto) {
        const group = await this.groupRepository.findOne({
            where: { id: id },
        });
        if (!group) {
            return {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: constant_1.Constant.CONFLICT,
                data: group,
            };
        }
        await this.groupRepository.update(group.id, updateGroupDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "L'opération a été exécutée avec succès.",
        };
    }
    async remove(id) {
        const group = await this.groupRepository.findOne({
            where: { id: id },
        });
        if (!group) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: constant_1.Constant.CONFLICT,
                data: group,
            };
        }
        await this.groupRepository.delete({ id: group.id });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "L'opération a été exécutée avec succès.",
        };
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('GROUP_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        helper_1.default])
], GroupsService);
//# sourceMappingURL=groups.service.js.map