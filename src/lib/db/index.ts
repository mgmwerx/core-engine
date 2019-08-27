import pgPromise from "pg-promise"; // pg-promise core library
import {IDatabase, IMain} from "pg-promise";

// TODO: Need to fail fast if these required values aren't present
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT || 5432;
const database = process.env.DB_DATABASE;

export const pgp: IMain = pgPromise({});
const db: IDatabase<{}> = pgp(`postgres://${username}:${password}@${host}:${port}/${database}`);

export default db;
