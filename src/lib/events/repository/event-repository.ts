import db from "../../db";
import { toIEvent} from "./model-adapter";
import IEvent from "../model/event";

const sqlFindEvents =
    "SELECT " +
    "    events.*, " +
    "    locations.*, " +
    "    events.start_date + events.start_time as starts_at, " +
    "    events.end_date + events.end_time as ends_at " +
    "FROM events " +
    "INNER JOIN locations ON locations.id = events.location_id";

export class EventRepository {

    public static async findAll(): Promise<IEvent[]> {
        try {
            const rs = await db.query(sqlFindEvents);
            return rs.rows.map<IEvent>((result) => toIEvent(result));
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

export default EventRepository;
