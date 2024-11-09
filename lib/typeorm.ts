import { DataSource } from 'typeorm';
import { Ticket } from './entities/Ticket';

// Create a TypeORM data source
export const AppDataSource = new DataSource({
  type: 'postgres', // or 'mysql', 'sqlite', etc.
  host: 'localhost',
  port: 5432, // Update based on your DB setup
  username: 'postgres',
  password: '12345678',
  database: 'testing',
  synchronize: true, // Be careful with this in production
  logging: true,
  entities: [Ticket], // Add your entities here
  migrations: [],
  subscribers: [],
});
