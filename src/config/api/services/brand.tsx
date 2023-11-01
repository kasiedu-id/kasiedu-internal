import { HttpGet } from "..";

export async function getBrandAll() {
    try {
        let res = await HttpGet(`internal/brands/all`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getBrandPagination({ page, limit, name, }: { page: number, limit: number, name: string }) {
    try {
        let res = await HttpGet(`internal/brands?limit=${limit}&page=${page}&name=${name}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}