import {
    HttpDelete,
    HttpGet,
    HttpPost,
    HttpPut
} from "..";
import constant from '../../../constants/url';

export async function getPayments({
    id,
    type,
}) {
    try {
        let res = await HttpGet(`${constant.PAYMENT_URL}/course/${id}?type=${type || ''}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function createPayment({
    email,
    name,
    phone,
    anonymous,
    amount,
    courseId,
    type,
    status,
}) {
    try {
        let res = await HttpPost(`${constant.PAYMENT_URL}/`, {
            email,
            name,
            phone,
            anonymous,
            amount,
            courseId,
            type,
            status,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function updatePayment({
    id,
    anonymous,
    type,
    status
}) {
    try {
        let res = await HttpPut(`${constant.PAYMENT_URL}/${id}`, {
            anonymous,
            type,
            status,
        }, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function deletePayments({
    id
}) {
    try {
        let res = await HttpDelete(`${constant.PAYMENT_URL}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}