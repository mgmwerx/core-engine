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

    public static findAll(): Promise<IEvent[] | void> {
        return db.any(sqlFindEvents)
            .then((results: any[]) => {
                return results.map<IEvent>((result) => toIEvent(result));
            })
            .catch((error: any) => {
                console.log(error);
                throw error;
            });
    }

    public static save(event: IEvent): Promise<any> {
        return db.none("INSERT INTO ", event);
    }
}

export default EventRepository;
