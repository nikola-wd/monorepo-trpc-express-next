import { countries } from '../../../packages/data/src';
// import { countries } from '@repo/data';
import {
    ICountry,
    POTENTIAL_REGION_TYPES,
    TRegion,
    TRegionKeys,
} from '../../../packages/project-types/src';

// import {
//     ICountry,
//     POTENTIAL_REGION_TYPES,
//     TRegion,
//     TRegionKeys,
// } from '@repo/project-types';
import { z } from 'zod';
// TODO: Maybe move to some helper file
type TgetRegionSubType = (country?: ICountry) => TRegionKeys | undefined;
export const getRegionSubType: TgetRegionSubType = (country) => {
    if (!country) return undefined;

    let subType: TRegionKeys | undefined;
    for (const key in country) {
        if (key in country && key in POTENTIAL_REGION_TYPES) {
            subType = key as TRegionKeys;
            break;
        }
    }
    return subType;
};

// TODO: Can maybe written differently
interface ICountryAndOrStateInput {
    country: ICountry['code'];
    state?: TRegion['code'];
}

type TisValidRegion = (data: ICountryAndOrStateInput) => boolean;
const isValidRegion: TisValidRegion = (data) => {
    const { country: selectedCountryCode, state: selectedRegionCode } = data;
    const country = countries.find((c) => c.code === selectedCountryCode);

    // Handled in the country validation
    if (!country) return true;

    const subType = getRegionSubType(country);
    if (!subType) return true;

    const regions = country[subType] as TRegion[];
    return regions.some((region) => region.code === selectedRegionCode);
};

const isValidCountry = (countryCode: string): boolean => {
    return countries.some((c) => {
        return c.code === countryCode;
    });
};
export const VS_ownerCreateBusiness = z
    .object({
        name: z.string().min(2, 'Business name is required'),
        description: z.string().optional(),
        country: z
            .string({
                required_error: 'Country is required',
            })
            .length(3, {
                message: 'Country is required',
            })
            .refine(isValidCountry, {
                message: 'Country is not supported',
            }),
        state: z.string().optional(),
        city: z.string().min(1, 'City is required'),
        zipCode: z.number().min(3, 'Zip code is required'),
        address: z.string().min(1, 'Address is required'),
        categoryIds: z
            .array(z.string())
            .min(1, 'At least one category is required'),
    })
    .refine(isValidRegion, {
        message: 'Region is required',
        path: ['state'],
    });

// extracting the type
export type TVS_ownerCreateBusiness = z.infer<typeof VS_ownerCreateBusiness>;
