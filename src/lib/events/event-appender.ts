import db from "../db";
import IEvent from "./model/event";
import { IEventKey, findEventKeys, saveEvent } from "./repository/event-repository";
import { findLocationIdByKey, saveLocation } from "./repository/location-repository";

export default class EventAppender {
    public async appendEvents(events: IEvent[]) {
        const existingEventKeys: IEventKey[] = await findEventKeys();
        events.forEach((event) => {
            const normalizedEvent = this.normalizeEvent(event);
            if (this.isNewEvent(normalizedEvent, existingEventKeys)) {
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

    private isNewEvent(event: IEvent, eventKeys: IEventKey[]): boolean {
        // Rudimentary and quickly hacked together de-duplication
        const matchingEventKeys = eventKeys
            .filter((k) => k.title === event.title && k.starts_at === event.starts_at);
        return matchingEventKeys.length === 0;
    }

    private addEvent(event: IEvent): void {
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
