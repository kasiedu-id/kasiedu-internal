import { HttpDelete, HttpGet, HttpPost, HttpPut } from "..";

export async function getProjects({ page, limit, name, code, classId, }: { page: number, limit: number, name: string, code: string, classId: string, }) {
    try {
        return HttpGet(`internal/projects?limit=${limit}&page=${page}&code=${code}&name=${name}&classId=${classId}`, null);
    } catch (error) {
        throw (error);
    }
}

export async function getProjectsArchive({ page, limit, name, code, classId, }: { page: number, limit: number, name: string, code: string, classId: string, }) {
    try {
        return HttpGet(`internal/projects/archive?limit=${limit}&page=${page}&code=${code}&name=${name}&classId=${classId}`, null);
    } catch (error) {
        throw (error);
    }
}

export async function getProjectDetail({ projectId }) {
    try {
        return HttpGet(`internal/projects/${projectId}`, null);
    } catch (error) {
        throw (error);
    }
}

export async function updateProjectGallery({ projectId, gallery }) {
    try {
        return HttpPut(`internal/projects/gallery/${projectId}`, {
            gallery
        }, null);
    } catch (error) {
        throw (error);
    }
}

export async function createPayment({
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

export async function updatePaymentStatus({
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

export async function deletePaymentPermanent({
    id,
}) {
    try {
        return HttpDelete(`internal/payments/permanent/${id}`, null);
    } catch (error) {
        throw (error);
    }
}

export async function recoveryProject({
    id,
}) {
    try {
        return HttpPost(`internal/projects/recovery/${id}`, {}, null);
    } catch (error) {
        throw (error);
    }
}