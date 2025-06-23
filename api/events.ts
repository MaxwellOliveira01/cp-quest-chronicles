export interface EventModel {
    id: number;
    name: string;
    year: number;
    location: string; // should be replaced with city, state and country?
}

export interface EventFullModel extends EventModel {

}