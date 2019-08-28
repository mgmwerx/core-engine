import db from "../../db";
import { toEvent} from "./model-adapter";
import IEvent from "../model/event";
import { ITask } from "pg-promise";

const sqlInsert =
    "INSERT INTO events (title, location_id, starts_at, ends_at, description, website_url, upload_time) " +
    "VALUES (${title}, ${locationId}, ${starts_at}, ${ends_at}, ${description}, ${url}, CURRENT_TIMESTAMP);";

const sqlFindEvents =
    "SELECT events.*, locations.* " +
    "FROM events " +
    "LEFT OUTER JOIN locations ON locations.id = events.location_id";

const findEventKeysSql =
    "SELECT title, TO_CHAR(starts_at AT TIME ZONE 'CDT', 'YYYY-MM-DD\"T\"HH24:MI') as starts_at " +
    "FROM events";

export interface IEventKey {
    title: string;
    starts_at: number;
}

export const findAllEvents = async (): Promise<IEvent[]> => {
    try {
        const rsEvents = await db.any(sqlFindEvents);
        return rsEvents.map<IEvent>((result) => toEvent(result));
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const findEventKeys = async (t?: ITask<{}>): Promise<IEventKey[]> => {
    return await (t || db).any(findEventKeysSql);
};

export const saveEvent = async (event: IEvent, locationId: number | null, t: ITask<{}>): Promise<void> => {
    await t.none(sqlInsert, { ...event, locationId });
};
