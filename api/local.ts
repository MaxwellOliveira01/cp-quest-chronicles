export interface LocalModel {
    id: string;
    city: string;
    state: string;
    country: string;
}

export interface LocalFullModel extends LocalModel {

}

export interface LocalCreateModel {
    city: string;
    state: string;
    country: string;
}

export interface LocalUpdateModel extends LocalCreateModel {
    id: string;
}


