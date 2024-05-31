import {
    HttpDelete,
    HttpGet,
    HttpPost,
    HttpPut
} from "..";
import constant from '../../../constants/url';

export async function getSponsor() {
    try {
        let res = await HttpGet(`${constant.SPONSOR_URL}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getSponsorCourse({
    id,
}) {
    try {
        let res = await HttpGet(`${constant.SPONSOR_URL}/course/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getSponsorDetail({
    id
}) {
    try {
        let res = await HttpGet(`${constant.SPONSOR_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function createSponsor({
    name,
    description,
    value,
    valueType,
    partialSupport,
    isInstant,
    maxParticipant,
    requirement,
    requirementType,
    owner,
    category,
}) {
    try {
        let res = await HttpPost(`${constant.SPONSOR_URL}`, {
            name,
            description,
            value,
            valueType,
            partialSupport,
            isInstant,
            maxParticipant,
            requirement,
            requirementType,
            owner,
            category,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function updateSponsor({
    name,
    description,
    value,
    valueType,
    partialSupport,
    isInstant,
    maxParticipant,
    requirement,
    requirementType,
    owner,
    category,
    id
}) {
    try {
        let res = await HttpPut(`${constant.SPONSOR_URL}/${id}`, {
            name,
            description,
            value,
            valueType,
            partialSupport,
            isInstant,
            maxParticipant,
            requirement,
            requirementType,
            owner,
            category,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function removeHardSponsor({
    id
}) {
    try {
        let res = await HttpDelete(`${constant.SPONSOR_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}