import { HttpGet, HttpPost } from "..";

export async function getSponsors({ page, limit, brandId, name, classId }: { page: number, limit: number, name: string, brandId: string, classId: string, }) {
    try {
        let res = await HttpGet(`internal/sponsors?limit=${limit}&page=${page}&name=${name}&brandId=${brandId}&classId=${classId}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function createSponsor({
    classId,
    brandId,
    maxCapacity,
    name,
    description,
    discount,
    discountType,
    isPartial,
    requirement,
    type,
}: {
    classId: string,
    brandId: string,
    maxCapacity: number,
    name: string,
    description: string,
    discount: string,
    discountType: string,
    isPartial: boolean,
    requirement: string,
    type: string
}) {
    try {
        let res = await HttpPost(`internal/sponsors`,
            {
                classId,
                brandId,
                maxCapacity,
                name,
                description,
                discount,
                discountType,
                isPartial,
                requirement,
                type,
            },
            null);

        return res;
    } catch (error) {
        throw (error);
    }
}