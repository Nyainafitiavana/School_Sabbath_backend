"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
const index_config_1 = require("./../index.config");
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'postgres',
                host: index_config_1.DB_HOST,
                port: parseInt(index_config_1.DB_PORT, 10),
                username: index_config_1.DB_USER,
                password: index_config_1.DB_PASSWORD,
                database: index_config_1.DB_DATABASE,
                entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
//# sourceMappingURL=database.providers.js.map