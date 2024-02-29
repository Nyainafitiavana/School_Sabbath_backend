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
exports.Group = void 0;
const class_validator_1 = require("class-validator");
const member_entity_1 = require("../../member/entities/member.entity");
const typeorm_1 = require("typeorm");
const registry_entity_1 = require("./../../registry/entities/registry.entity");
let Group = class Group {
};
exports.Group = Group;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Group.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Group.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Group.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => member_entity_1.Member, (member) => member.group),
    __metadata("design:type", Array)
], Group.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => registry_entity_1.Registry, (registry) => registry.group),
    __metadata("design:type", Array)
], Group.prototype, "registry", void 0);
exports.Group = Group = __decorate([
    (0, typeorm_1.Entity)()
], Group);
//# sourceMappingURL=group.entity.js.map