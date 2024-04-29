import {
    HttpGet,
    HttpPost,
    HttpPut
} from "..";
import constant from '../../../constants/url';

export async function getMentors({
    page,
    limit,
    name,
    email,
    phone,
}) {
    try {
        let res = await HttpGet(`${constant.MENTOR_URL}?limit=${limit ? limit : 25}&page=${page ? page : 1}&name=${name || ''}&email=${email || ''}&phone=${phone || ''}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getMentorDetail({
    id
}) {
    try {
        let res = await HttpGet(`${constant.MENTOR_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function createMentors({
    profile,
    phone,
    name,
    email,
    title,
}) {
    try {
        let res = await HttpPost(`${constant.MENTOR_URL}/`, {
            profile,
            phone,
            name,
            email,
            title,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function updateMentors({
    profile,
    phone,
    name,
    email,
    title,
    id
}) {
    try {
        let res = await HttpPut(`${constant.MENTOR_URL}/${id}`, {
            profile,
            phone,
            name,
            email,
            title,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}