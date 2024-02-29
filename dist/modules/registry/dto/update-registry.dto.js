"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRegistryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_registry_dto_1 = require("./create-registry.dto");
class UpdateRegistryDto extends (0, swagger_1.PartialType)(create_registry_dto_1.CreateRegistryDto) {
}
exports.UpdateRegistryDto = UpdateRegistryDto;
//# sourceMappingURL=update-registry.dto.js.map