export interface TRegion {
    code: string;
    name: string;
}

export const POTENTIAL_REGION_TYPES = {
    states: 'states',
    provinces: 'provinces',
    districts: 'districts',
};

export interface ICountry extends TRegion {
    [key: string]: string | TRegion[] | undefined;
    states?: TRegion[];
    provinces?: TRegion[];
    districts?: TRegion[];
}

export type TRegionKeys = keyof typeof POTENTIAL_REGION_TYPES;
