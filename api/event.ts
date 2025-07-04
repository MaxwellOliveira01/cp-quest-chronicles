import { LocalModel } from "./local";
import { PersonModel } from "./person";

export interface EventModel {
    id: string;
    name: string;
    start?: string;
    end?: string;
    description?: string;
    websiteUrl?: string;
}

export interface EventFullModel extends EventModel {
    local?: LocalModel;
    participants: PersonModel[];
}

export interface EventCreateModel {
    name: string;
    start?: string;
    end?: string;
    description?: string;
    websiteUrl?: string;
    localId?: string;
    participantIds: string[];
}

export interface EventUpdateModel extends EventCreateModel {
    id: string;
}

