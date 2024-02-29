"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberProviders = void 0;
const member_entity_1 = require("./entities/member.entity");
exports.memberProviders = [
    {
        provide: 'MEMBER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(member_entity_1.Member),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=member.providers.js.map