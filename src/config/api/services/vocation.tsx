import { HttpDelete, HttpGet, HttpPost, HttpPut } from "..";

export async function getVocations({ page, limit, name, code, categories, province, city }: { page: number, limit: number, name: string, code: string, categories: string, province: string, city: string }) {
    try {
        let res = await HttpGet(`internal/vocations?limit=${limit}&page=${page}&code=${code}&name=${name}&category=${categories}&province=${province}&city=${city}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getVocationsArchive({ page, limit, name, code, categories, province, city }: { page: number, limit: number, name: string, code: string, categories: string, province: string, city: string }) {
    try {
        let res = await HttpGet(`internal/vocations/archive?limit=${limit}&page=${page}&code=${code}&name=${name}&category=${categories}&province=${province}&city=${city}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getVocationDetail({ vocationId }) {
    try {
        let res = await HttpGet(`vocations/${vocationId}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function deleteVocation({
    vocationId
}) {
    try {
        return await HttpDelete(`internal/vocations/${vocationId}`, null);
    } catch (error) {
        throw (error);
    }
}

export async function updateVocation({
    addressId,
    vocationName,
    description,
    completeAddress,
    cpName,
    cpEmail,
    cpPhone,
    vocationId
}: any) {
    try {
        let res = await HttpPut(`internal/vocations/${vocationId}`, {
            addressId,
            vocationName,
            description,
            completeAddress,
            cpName,
            cpEmail,
            cpPhone,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getVocationSocmed({ vocationId }) {
    try {
        let res = await HttpGet(`socials/${vocationId}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function addVocationSocmed({
    type,
    url,
    vocationId,
}) {
    try {
        let res = await await HttpPut(`internal/vocations/social-media`, {
            type,
            url,
            vocationId
        }, null)

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function deleteVocationSocmed({ id }) {
    try {
        let res = await await HttpDelete(`internal/vocations/social-media/${id}`, null)

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getVocationCategory({ vocationId }) {
    try {
        let res = await HttpGet(`internal/vocations/category/${vocationId}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function addVocationCategory({
    categoryId,
    vocationId,
}) {
    try {
        let res = await await HttpPut(`internal/vocations/category`, {
            categoryId,
            vocationId
        }, null)

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getCategories() {
    try {
        let res = await await HttpPost(`categories/`, {
            limit: 20,
            start: 0,
            method: 'all',
            name: '',
        }, null)

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function deleteVocationCategory({ id }) {
    try {
        let res = await await HttpDelete(`internal/vocations/category/${id}`, null)

        return res;
    } catch (error) {
        throw (error);
    }
}