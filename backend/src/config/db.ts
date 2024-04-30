import { DataSource } from "typeorm";


export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "MS2D",
  password: "MS2D",
  database: "MS2DDb",
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: true
});