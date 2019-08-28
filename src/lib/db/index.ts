import pgPromise, { IMain } from "pg-promise";
import { IConnectionParameters } from "pg-promise/typescript/pg-subset";

const asInt = (val: string | undefined, defaultValue: number): number => {
    return parseInt(val || "", 10) || defaultValue;
};

const connectionParams: IConnectionParameters = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: asInt(process.env.PGPORT, 5432),
    database: process.env.PGDATABASE,
};

const pgp: IMain = pgPromise();
const db = pgp(connectionParams);

export { pgp };
export default db;
