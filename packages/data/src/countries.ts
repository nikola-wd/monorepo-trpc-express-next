export const POTENTIAL_REGION_TYPES = {
    states: 'states',
    provinces: 'provinces',
    districts: 'districts',
};

export interface TRegion {
    name: string;
    code: string;
}

export interface ICountry extends TRegion {
    [key: string]: string | TRegion[] | undefined;
    states?: TRegion[];
    provinces?: TRegion[];
    districts?: TRegion[];
}

export type TRegionKeys = keyof typeof POTENTIAL_REGION_TYPES;

export const countries: ICountry[] = [
    {
        code: 'USA',
        name: 'United States of America',
        states: [
            {
                code: 'US-AL',
                name: 'Alabama',
            },
            {
                code: 'US-AK',
                name: 'Alaska',
            },
            {
                code: 'US-AZ',
                name: 'Arizona',
            },
            {
                code: 'US-AR',
                name: 'Arkansas',
            },
            {
                code: 'US-CA',
                name: 'California',
            },
            {
                code: 'US-CO',
                name: 'Colorado',
            },
        ],
    },
    {
        code: 'CAN',
        name: 'Canada',
        provinces: [
            {
                code: 'CA-ON',
                name: 'Ontario',
            },
            {
                code: 'CA-QC',
                name: 'Quebec',
            },
            {
                code: 'CA-BC',
                name: 'British Columbia',
            },
            {
                code: 'CA-AB',
                name: 'Alberta',
            },
            {
                code: 'CA-MB',
                name: 'Manitoba',
            },
        ],
    },
    {
        code: 'GBR',
        name: 'United Kingdom',
    },
    {
        code: 'AUS',
        name: 'Australia',
    },
    {
        code: 'FRA',
        name: 'France',
    },
    {
        code: 'DEU',
        name: 'Germany',
    },
    {
        code: 'ITA',
        name: 'Italy',
    },
    {
        code: 'ESP',
        name: 'Spain',
    },
    {
        code: 'NLD',
        name: 'Netherlands',
    },
    {
        code: 'BRA',
        name: 'Brazil',
    },
    {
        code: 'RUS',
        name: 'Russia',
    },
    {
        code: 'IND',
        name: 'India',
    },
    {
        code: 'CHN',
        name: 'China',
    },
    {
        code: 'JPN',
        name: 'Japan',
    },
    {
        code: 'KOR',
        name: 'South Korea',
    },
    {
        code: 'MEX',
        name: 'Mexico',
    },
    {
        code: 'ARG',
        name: 'Argentina',
    },
    {
        code: 'ZAF',
        name: 'South Africa',
    },
    {
        code: 'NGA',
        name: 'Nigeria',
    },
    {
        code: 'TUR',
        name: 'Turkey',
    },
    {
        code: 'SGP',
        name: 'Singapore',
        districts: [
            {
                code: 'SGP-ZAF',
                name: 'South Africa',
            },
            {
                code: 'SGP-NGA',
                name: 'Nigeria',
            },
            {
                code: 'SGP-TUR',
                name: 'Turkey',
            },
        ],
    },
];