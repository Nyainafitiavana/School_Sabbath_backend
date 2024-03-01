"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registryProviders = void 0;
const registry_entity_1 = require("./entities/registry.entity");
exports.registryProviders = [
    {
        provide: 'REGISTRY_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(registry_entity_1.Registry),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=registry.providers.js.map