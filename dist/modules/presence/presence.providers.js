"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presenceProviders = void 0;
const presence_entity_1 = require("./entities/presence.entity");
exports.presenceProviders = [
    {
        provide: 'PRESENCE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(presence_entity_1.Presence),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=presence.providers.js.map