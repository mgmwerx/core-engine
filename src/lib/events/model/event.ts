import ILocation from "./location";

export default interface IEvent {
    title: string;
    description: string | null;
    starts_at: number;
    ends_at: number;
    location?: ILocation;
    categories?: string[];
    url: string;
}
