import {
    HttpDelete,
    HttpGet,
    HttpPost,
    HttpPut,
} from "..";
import constant from '../../../constants/url';

export async function getCourses({
    page,
    limit,
}) {
    try {
        let res = await HttpGet(`${constant.COURSE_URL}?limit=${limit ? limit : 25}&page=${page ? page : 1}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getDetailCourse({
    id
}) {
    try {
        let res = await HttpGet(`${constant.COURSE_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getMentorsCourse({
    courseId
}) {
    try {
        let res = await HttpGet(`${constant.MENTOR_URL}/mentor/${courseId}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getParticipantCourse({
    id
}) {
    try {
        let res = await HttpGet(`${constant.COURSE_URL}/participant/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getMentorCourse({
    id
}) {
    try {
        let res = await HttpGet(`${constant.COURSE_URL}/mentor/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function addMentorCourse({
    id,
    mentorId,
}) {
    try {
        let res = await HttpPut(`${constant.COURSE_URL}/mentor/${id}`, {
            mentorId
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function removeMentorCourse(id) {
    try {
        let res = await HttpDelete(`${constant.COURSE_URL}/mentor/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getCurriculumCourse({
    id
}) {
    try {
        let res = await HttpGet(`${constant.COURSE_URL}/curriculum/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function addCurriculumCourse({
    id,
    name,
    description
}) {
    try {
        let res = await HttpPut(`${constant.COURSE_URL}/curriculum/${id}`, {
            name,
            description,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function addCourseSponsor({
    id,
    ownerId,
    tier,
    orderTier,
}) {
    try {
        let res = await HttpPut(`${constant.COURSE_URL}/sponsor/${id}`, {
            id: ownerId,
            tier: tier,
            orderTier
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function removeCurriculumCourse(id) {
    try {
        let res = await HttpDelete(`${constant.COURSE_URL}/curriculum/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function removeSponsorCourse(id) {
    try {
        let res = await HttpDelete(`${constant.COURSE_URL}/sponsor/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getPaymentCourse({
    id
}) {
    try {
        let res = await HttpGet(`${constant.COURSE_URL}/payment/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}
export async function createCourses({
    name,
    description,
    openRegis,
    closeRegis,
    startCourse,
    price,
    workshopPrice,
    minimumPrice,
    mentors,
    maxParticipant,
    duration,
    durationType,
    categories,
    curriculums,
    classType,
    completeAddress,
    locationId,
    bannerPath,
    courseType,
    certificate,
}) {
    try {
        let res = await HttpPost(`${constant.COURSE_URL}/`, {
            name,
            description,
            openRegis,
            closeRegis,
            startCourse,
            price,
            workshopPrice,
            minimumPrice,
            mentors,
            maxParticipant,
            duration,
            durationType,
            categories,
            curriculums,
            classType,
            completeAddress,
            locationId,
            bannerPath,
            courseType,
            certificate,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function updateCourse({
    name,
    description,
    openRegis,
    closeRegis,
    startCourse,
    price,
    workshopPrice,
    minimumPrice,
    maxParticipant,
    duration,
    durationType,
    classType,
    completeAddress,
    locationId,
    bannerPath,
    courseType,
    certificate,
    id,
}) {
    try {
        let res = await HttpPut(`${constant.COURSE_URL}/${id}`, {
            name,
            description,
            openRegis,
            closeRegis,
            startCourse,
            price,
            workshopPrice,
            minimumPrice,
            maxParticipant,
            duration,
            durationType,
            classType,
            completeAddress,
            locationId,
            bannerPath,
            courseType,
            certificate,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}