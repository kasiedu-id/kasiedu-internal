import {
    HttpDelete,
    HttpGet,
    HttpPost,
    HttpPut,
} from "..";
import constant from '../../../constants/url';

export async function getEvents({
    page,
    limit,
}) {
    try {
        let res = await HttpGet(`${constant.EVENT_URL}?limit=${limit ? limit : 25}&page=${page ? page : 1}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getDetailEvent({
    id
}) {
    try {
        let res = await HttpGet(`${constant.EVENT_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function addEventCollaboration({
    id,
    ownerId,
    collborationType,
}) {
    try {
        let res = await HttpPut(`${constant.EVENT_URL}/collaboration/${id}`, {
            collborationType,
            id: ownerId
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function addEventSponsor({
    id,
    ownerId,
    tier,
    orderTier,
}) {
    try {
        let res = await HttpPut(`${constant.EVENT_URL}/sponsor/${id}`, {
            id: ownerId,
            tier: tier,
            orderTier
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function removeEventCollab(id) {
    try {
        let res = await HttpDelete(`${constant.EVENT_URL}/collaboration/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function removeEventSponsor(id) {
    try {
        let res = await HttpDelete(`${constant.EVENT_URL}/sponsor/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getCollaborationEvents({
    id,
    type
}) {
    try {
        let res = await HttpGet(`${constant.EVENT_URL}/collaboration/${id}?type=${type || 'COURSE'}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getSponsorEvents({
    id,
}) {
    try {
        let res = await HttpGet(`${constant.EVENT_URL}/sponsor/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function createEvents({
    name,
    description,
    objective,
    startDate,
    endDate,
    bannerPath,
    price,
    quota,
    mentors,
    courses,
    youtubeId,
    series,
    orderSeries,
    completeAddress,
    locationId,
    locationLink,
    classType
}) {
    try {
        let res = await HttpPost(`${constant.EVENT_URL}/`, {
            name,
            description,
            objective,
            startDate,
            endDate,
            bannerPath,
            price,
            quota,
            mentors,
            courses,
            youtubeId,
            series,
            orderSeries,
            completeAddress,
            locationId,
            locationLink,
            classType
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function updateEvent({
    name,
    description,
    objective,
    startDate,
    endDate,
    bannerPath,
    price,
    quota,
    youtubeId,
    series,
    orderSeries,
    completeAddress,
    locationId,
    locationLink,
    classType,
    id,
}) {
    try {
        let res = await HttpPut(`${constant.EVENT_URL}/${id}`, {
            name,
            description,
            objective,
            startDate,
            endDate,
            bannerPath,
            price,
            quota,
            youtubeId,
            series,
            orderSeries,
            completeAddress,
            locationId,
            locationLink,
            classType
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}