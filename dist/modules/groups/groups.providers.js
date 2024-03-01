"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupProviders = void 0;
const group_entity_1 = require("./entities/group.entity");
exports.groupProviders = [
    {
        provide: 'GROUP_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(group_entity_1.Group),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=groups.providers.js.map