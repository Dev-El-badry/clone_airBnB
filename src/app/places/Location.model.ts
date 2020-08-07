export interface Coordinate {
    lat: number;
    lng: number;
}

export interface PlaceInfo extends Coordinate {
    address: string;
    googleMapStaticImageUrl: string;
}