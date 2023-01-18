import { AppDispatch} from '../../utils/types';
import { getOrderByNumber } from '../../utils/api';

export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS,
    data: any
  }
  
export interface IGetOrderFailed {
    readonly type: typeof GET_ORDER_FAILED
}

export function getOrderRequest(number: number) {
return function(dispatch: AppDispatch) {
    getOrderByNumber(number)
    .then(res  => {
    if (res && res.success) {
        dispatch({
        type: GET_ORDER_SUCCESS,
        data: res.orders[0]
        })
    } else {
        dispatch({
        type: GET_ORDER_FAILED
        })
    }
    })
    .catch(err => {
    dispatch({
        type: GET_ORDER_FAILED
    })
    })
}
}