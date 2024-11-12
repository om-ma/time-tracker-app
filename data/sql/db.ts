import { DataSource, Repository, ObjectType, ObjectLiteral } from 'typeorm';
export type { Repository, QueryBuilder } from 'typeorm';
import * as m from '../../lib/entities/tickets_model';

export class SqlDb {
    static dataSource: DataSource | null = null;

    static dataSourceOptions: any = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        // username: SQL_USER,
        // password: SQL_PASSWORD,
        database: 'time_traker',
        synchronize: true,
        entities: [
            m.TicketsModel,
        ],
        migrations: [__dirname + '/migrations/*.ts']
    };

    constructor(args: { entities: ObjectType<any>[]; connectionName: string }) {
        SqlDb.updateDataSourceOptions(args);
    }

    static updateDataSourceOptions(args: { entities: ObjectType<any>[]; connectionName: string }) {
        this.dataSourceOptions = {
            ...this.dataSourceOptions,
            name: args.connectionName,
        };

        if (args.entities) {
            this.dataSourceOptions.entities.push(...args.entities);
        }
    }

    static async getRepository<T extends ObjectLiteral>(entity: ObjectType<T>): Promise<Repository<T>> {
        const dataSource = await this.connect();
        return dataSource.getRepository(entity);
    }

    async getRepository<T extends ObjectLiteral>(entity: ObjectType<T>): Promise<Repository<T>> {
        const dataSource = await SqlDb.connect();
        return dataSource.getRepository(entity);
    }

    static async connect(): Promise<DataSource> {
        if (this.dataSource && this.dataSource.isInitialized) {
            return this.dataSource;
        }

        this.dataSource = new DataSource(this.dataSourceOptions);
        await this.dataSource.initialize();
        return this.dataSource;
    }

    static async closeConnection(): Promise<void> {
        if (this.dataSource && this.dataSource.isInitialized) {
            await this.dataSource.destroy();
            this.dataSource = null;
        }
    }
}

// Exporting the DataSource instance for TypeORM migrations
export const DbDataSource = new DataSource(SqlDb.dataSourceOptions);
// module.exports = new DataSource(SqlDb.dataSourceOptions);
