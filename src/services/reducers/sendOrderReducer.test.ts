import { addOrderDetails } from './sendOrderReducer';
import { POST_DATA_SUCCESS, POST_DATA_FAILED, CLEAR_ORDER } from '../actions/sendOrderAction';

const initialData = {
        feedFailed: false,
        data: {
            order: 0
          }
    };

describe('reducer', () => {

    it('should handle POST_DATA_SUCCESS', () => {
        expect( addOrderDetails(initialData, {
            type: POST_DATA_SUCCESS,
            data: {
                order: 3769
            }
          })
        ).toEqual({
            ...initialData,
            data: {
                order: 3769
            }
        })
    })

    it('should handle POST_DATA_FAILED', () => {
        expect(addOrderDetails(initialData, {
            type: POST_DATA_FAILED
        })).toEqual ({
            ...initialData,
            feedFailed: true,
        })
    })

    it('should handle CLEAR_ORDER', () => {
        expect(addOrderDetails(initialData, {
            type: CLEAR_ORDER
        })).toEqual ({
            ...initialData,
            feedFailed: false,
            data: {
                order: 0
            }
        })
    })
})