import { HttpGet, HttpPost, HttpPut } from "..";
import constant from '../../../constants/url';

export async function getSupportList() {
    try {
        let res = await HttpGet(`${constant.SUPPORT_URL}/`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function addSupportValue(data) {
    try {
        let res = await HttpPost(`${constant.SUPPORT_URL}/`, data, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function updateSupportValue({id, data}) {
    try {
        let res = await HttpPut(`${constant.SUPPORT_URL}/${id}`, data, null);

        return res;
    } catch (error) {
        throw (error);
    }
}