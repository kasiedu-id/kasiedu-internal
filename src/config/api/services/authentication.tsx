import { HttpPost } from "..";

export async function submitSignIn({ payload }: {
    payload: {
        email: string,
        password: string,
        roleType: string | undefined
    }
}) {
    try {
        let res = await await HttpPost(`auths/login`, payload, null)

        return res;
    } catch (error) {
        throw (error);
    }
}