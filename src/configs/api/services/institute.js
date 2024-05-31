import {
    HttpGet,
    HttpPost,
    HttpPut,
} from "..";
import constant from '../../../constants/url';

export async function getInsitutes({
    page,
    limit,
    name,
}) {
    try {
        let res = await HttpGet(`${constant.INSTITUTE_URL}?limit=${limit ? limit : 20}&page=${page ? page : 1}&name=${name || ''}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getInsituteDetail({
    id
}) {
    try {
        let res = await HttpGet(`${constant.INSTITUTE_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function createInstitute({
    name,
    description,
    picName,
    picEmail,
    picPhone,
    completeAddress,
    locationId,
    logo,
}) {
    try {
        let res = await HttpPost(`${constant.INSTITUTE_URL}/`, {
            name,
            description,
            picName,
            picEmail,
            picPhone,
            completeAddress,
            locationId,
            logo,
            isActive: false,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function updateInstitute({
    id,
    name,
    description,
    picName,
    picEmail,
    picPhone,
    completeAddress,
    locationId,
    logo,
}) {
    console.log(id,
        name,
        description,
        picName,
        picEmail,
        picPhone,
        completeAddress,
        locationId,
        logo,)
    try {
        let res = await HttpPut(`${constant.INSTITUTE_URL}/${id}`, {
            name,
            completeAddress,
            logo,
            description,
            picName,
            picEmail,
            picPhone,
            locationId,
            isActive: false,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}