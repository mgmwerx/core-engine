import ILocation from "./location";

export default interface IEvent {
    title: string;
    description: string;
    starts_at: number;
    ends_at: number;
    location: ILocation;
    categories?: string[];
    uri: string;
}
