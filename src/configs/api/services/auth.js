import { HttpPost } from "..";
import constant from '../../../constants/url';

export async function login({
    email,
    password,
}) {
    try {
        let res = await HttpPost(`${constant.AUTHENTICATION}`, {email, password} , null);

        return res;
    } catch (error) {
        throw (error);
    }
}