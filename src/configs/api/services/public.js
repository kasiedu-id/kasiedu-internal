import {
    HttpGet,
    HttpPost
} from "..";
import constant from '../../../constants/url';

export async function uploadFile(data) {
    try {
        let res = await HttpPost(`${constant.UPLOAD_URL}/`, data ,null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getGroupData({
    group = 'category',
}) {
    try {
        let res = await HttpGet(`${constant.LOV_URL}/${group}?limit=100`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getAddress({
    code,
}) {
    try {
        let res = await HttpGet(`${constant.LOV_URL}/address?limit=100&code=${code}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getAllLov({
    page,
    limit,
    name,
    language,
    category,
}) {
    try {
        let res = await HttpGet(`${constant.LOV_ADMIN_URL}/?limit=${limit ? limit : 25}&page=${page ? page : 1}&cat=${category}&lang=${language}&name=${name}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getLovDetail({
    id
}) {
    try {
        let res = await HttpGet(`${constant.LOV_ADMIN_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getGroupList() {
    try {
        let res = await HttpGet(`${constant.LOV_ADMIN_URL}/group`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function createLov({
    name,
    language,
    category,
    value,
}) {
    try {
        let res = await HttpPost(`${constant.LOV_ADMIN_URL}/`, {
            name,
            language,
            category,
            value,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}