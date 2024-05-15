import {
    HttpDelete,
    HttpGet,
    HttpPost,
    HttpPut
} from "..";
import constant from '../../../constants/url';

export async function getUsers({
    page,
    limit,
    email
}) {
    try {
        let res = await HttpGet(`${constant.USER_URL}?page=${page | 1}&limit=${limit || 20}&email=${email || ''}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getUserDetail({
    id
}) {
    try {
        let res = await HttpGet(`${constant.USER_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function createUser({
    email,
    dob,
    cityId,
    gender,
    phoneNumber,
    name,
    occupation,
    occupationName,
}) {
    try {
        let res = await HttpPost(`${constant.USER_URL}`, {
            email,
            dob,
            cityId,
            gender,
            phoneNumber,
            name,
            occupation,
            occupationName,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function updateUser({
    email,
    dob,
    cityId,
    gender,
    phoneNumber,
    name,
    occupation,
    occupationName,
    id
}) {
    try {
        let res = await HttpPut(`${constant.USER_URL}/${id}`, {
            email,
            dob,
            cityId,
            gender,
            phoneNumber,
            name,
            occupation,
            occupationName,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function removeHardUser({
    id
}) {
    try {
        let res = await HttpDelete(`${constant.USER_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}