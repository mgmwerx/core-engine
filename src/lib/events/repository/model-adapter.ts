import IEvent from "../model/event";
import ILocation from "../model/location";

export const toEvent = (result: any): IEvent => {
    const location: ILocation = {
        name: result.name,
        street: result.street,
        street2: result.street2,
        city: result.city,
        state: result.state,
        zip: result.zip,
    };

    return {
        title: result.title,
        description: result.description,
        starts_at: result.starts_at,
        ends_at: result.ends_at,
        url: result.website_url,
        ...location.name && { location },
    };
};
