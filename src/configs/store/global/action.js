import { getAddress, getGroupData } from "../../api/services/public";
import { INITIAL_STATE } from "./type";

export const initiate = () => {
    return async (dispatch) => {
        try {
            const [
                provinces,
                categories,
            ] = await Promise.all([
                getAddress({ code: '' }),
                getGroupData({ group: 'category'}),
            ]);
            
            const userData = sessionStorage.getItem('userInfo');

            dispatch({
                type: INITIAL_STATE,
                payload: {
                    provinces,
                    categories: categories.data,
                    user: JSON.parse(userData),
                    initLoading: false,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}