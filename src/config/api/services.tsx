import { HttpDelete, HttpGet, HttpPost, HttpPut } from ".";

async function getProvince() {
    try {
        let res = await HttpGet(`regions/province`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

async function getCityByProvince({ provinceCode }) {
    try {
        let res = await HttpGet(`regions/city-by-province/${provinceCode}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

async function getVocationDetail({ vocationId }) {
    try {
        let res = await HttpGet(`vocations/${vocationId}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

async function deleteVocation({
    vocationId
}) {
    try {
        return await HttpDelete(`internal/vocations/${vocationId}`, null);
    } catch (error) {
        throw (error);
    }
}

async function updateVocation({
    addressId,
    vocationName,
    description,
    completeAddress,
    cpName,
    cpEmail,
    cpPhone,
    vocationId
}: any) {
    try {
        let res = await HttpPut(`internal/vocations/${vocationId}`, {
            addressId,
            vocationName,
            description,
            completeAddress,
            cpName,
            cpEmail,
            cpPhone,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

async function getVocationSocmed({ vocationId }) {
    try {
        let res = await HttpGet(`socials/${vocationId}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

async function addVocationSocmed({
    type,
    url,
    vocationId,
}) {
    try {
        let res = await await HttpPut(`internal/vocations/social-media`, {
            type,
            url,
            vocationId
        }, null)

        return res;
    } catch (error) {
        throw (error);
    }
}

async function deleteVocationSocmed({ id }) {
    try {
        let res = await await HttpDelete(`internal/vocations/social-media/${id}`, null)

        return res;
    } catch (error) {
        throw (error);
    }
}

async function getVocationCategory({ vocationId }) {
    try {
        let res = await HttpGet(`internal/vocations/category/${vocationId}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

async function addVocationCategory({
    categoryId,
    vocationId,
}) {
    try {
        let res = await await HttpPut(`internal/vocations/category`, {
            categoryId,
            vocationId
        }, null)

        return res;
    } catch (error) {
        throw (error);
    }
}

async function getCategories() {
    try {
        let res = await await HttpPost(`categories/`, {
            limit: 20,
            start: 0,
            method: 'all',
            name: '',
        }, null)

        return res;
    } catch (error) {
        throw (error);
    }
}

async function deleteVocationCategory({ id }) {
    try {
        let res = await await HttpDelete(`internal/vocations/category/${id}`, null)

        return res;
    } catch (error) {
        throw (error);
    }
}

async function uploadImage({
    payload
}) {
    try {
        return await await HttpPost(`internal/uploads`, payload, null)
    } catch (error) {
        throw (error);
    }
}

async function getProjectDetail({ projectId }) {
    try {
        return HttpGet(`internal/projects/${projectId}`, null);
    } catch (error) {
        throw (error);
    }
}

async function updateProjectGallery({ projectId, gallery }) {
    try {
        return HttpPut(`internal/projects/gallery/${projectId}`, {
            gallery
        }, null);
    } catch (error) {
        throw (error);
    }
}

async function createPayment({
    projectId,
    accountId,
    accountClassId,
    method,
    status,
    amount,
    type,
    callback,
    name,
    email,
    phone,
    extra,
    isAnonymous
}) {
    try {
        return HttpPost(`internal/payments`, {
            projectId,
            accountId,
            accountClassId,
            method,
            status,
            amount,
            type,
            callback,
            name,
            email,
            phone,
            extra,
            isAnonymous
        }, null);
    } catch (error) {
        throw (error);
    }
}

async function updatePaymentStatus({
    id,
    status
}) {
    try {
        return HttpPut(`internal/payments/status/${id}`, {
            status
        }, null);
    } catch (error) {
        throw (error);
    }
}

async function deletePaymentPermanent({
    id,
}) {
    try {
        return HttpDelete(`internal/payments/permanent/${id}`, null);
    } catch (error) {
        throw (error);
    }
}


export {
    getProvince,
    getCityByProvince,
    getVocationDetail,
    updateVocation,
    deleteVocation,
    getVocationSocmed,
    addVocationSocmed,
    deleteVocationSocmed,
    getCategories,
    addVocationCategory,
    getVocationCategory,
    deleteVocationCategory,
    getProjectDetail,
    updateProjectGallery,
    createPayment,
    updatePaymentStatus,
    deletePaymentPermanent,
    uploadImage
}