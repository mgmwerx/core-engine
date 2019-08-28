import db from "../db";
import IEvent from "./model/event";
import { saveEvent } from "./repository/event-repository";
import { findLocationIdByKey, saveLocation } from "./repository/location-repository";

export default class EventAppender {
    public appendEvents(events: IEvent[]) {
        events.forEach((event) => {
            const normalizedEvent = this.normalizeEvent(event);
            if (this.isNewEvent(normalizedEvent)) {
                this.addEvent(normalizedEvent);
            }
        });
    }

    private normalizeEvent(event: IEvent): IEvent {
        // Perform any necessary transformations to the event object received from the client
        return {
            ...event,
            description: event.description || null,
        };
    }

    private isNewEvent(event: IEvent): boolean {
        // TODO: Attempt to weed out duplicate events
        return !(event === undefined);
    }

    private async addEvent(event: IEvent): Promise<void> {
        db.tx(async (t) => {
                let locationId: number | null = null;
                if (event.location) {
                    locationId = await findLocationIdByKey(event.location, t);
                    if (!locationId) {
                        locationId = await saveLocation(event.location, t);
                    }
                }
                await saveEvent(event, locationId, t);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}
