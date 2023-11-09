import { HttpGet } from "..";

export async function getUserVocation({ page, limit, email, name, vocationId }: { page: number, limit: number, name: string, email: string, vocationId: string, }) {
    try {
        let res = await HttpGet(`internal/users/vocation/${vocationId}?limit=${limit}&page=${page}&name=${name}&email=${email}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}