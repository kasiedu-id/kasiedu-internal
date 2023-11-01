import { HttpDelete, HttpGet, HttpPost } from "..";


export async function getClasses({ vocationId, page, limit, name, code, categories, province, city, date }: { vocationId: string, page: number, limit: number, name: string, code: string, categories: string, province: string, city: string, date: string }) {
    try {
        let res = await HttpGet(`internal/classes?vocationId=${vocationId}&code=${code}&limit=${limit}&page=${page}&name=${name}&category=${categories}&province=${province}&city=${city}&date=${date}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getArchiveClasses({ vocationId, page, limit, name, code, categories, province, city }: { vocationId: string, page: number, limit: number, name: string, code: string, categories: string, province: string, city: string }) {
    try {
        let res = await HttpGet(`internal/classes/archive?vocationId=${vocationId}&code=${code}&limit=${limit}&page=${page}&name=${name}&category=${categories}&province=${province}&city=${city}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getClassDetail({ id }) {
    try {
        let res = await HttpGet(`internal/classes/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function softDeleteClass({ id }) {
    try {
        let res = await HttpDelete(`internal/classes/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function recoveryDeleteClass({ id }) {
    try {
        let res = await HttpPost(`internal/classes/recovery/${id}`, null, null);

        return res;
    } catch (error) {
        throw (error);
    }
}