import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    // username: "test",
    // password: "test",
    database: "typeorm_testing",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [__dirname + '/migrations/*.ts'],
    subscribers: [],
})
