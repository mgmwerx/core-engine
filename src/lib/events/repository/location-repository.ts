import db from "../../db";
import ILocation from "../model/location";
import { ITask } from "pg-promise";

const findLocationIdByKeyQuery =
    "SELECT id FROM locations " +
    "WHERE name = ${name} " +
    " AND street_address = ${street} " +
    " AND second_line = ${street2} " +
    " AND city = ${city} " +
    " AND state = ${state} " +
    " AND zip = ${zip}";

export const findLocationIdByKey = async (location: ILocation, t?: ITask<{}>): Promise<number> => {
    const rs = await (t || db).oneOrNone(findLocationIdByKeyQuery, location);
    return rs ? rs.id : null;
};

const insertSql =
    "INSERT INTO locations (name, street_address, second_line, city, state, zip) " +
    "VALUES (${name}, ${street}, ${street2}, ${city}, ${state}, ${zip}) RETURNING id";

export const saveLocation = async (location: ILocation, t: ITask<{}>): Promise<number> => {
    const rs = await t.one(insertSql, location);
    return rs.id;
};
