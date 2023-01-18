import {addBurgerOrder} from './getOrderReducer';
import {GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/getOrderAction';

const order =
    {
        __v: 0,
        _id: "639b06cd99a25c001cd69971",
        createdAt: new Date("2022-12-15T11:36:45.191Z"),
        ingredients: [
                        "60d3b41abdacab0026a733cd",
                        "60d3b41abdacab0026a733cf",
                        "60d3b41abdacab0026a733cd",
                        "60d3b41abdacab0026a733c7",
                        "60d3b41abdacab0026a733c7"
                    ],
        name: "Space флюоресцентный антарианский бургер",
        number: 34067,
        owner: "633029d142d34a001c28d088",
        status: "done",
        updatedAt: new Date("2022-12-15T11:36:45.569Z"),
    };

    const initialData = {
        data: null
    }


describe('reducer', () => {

    it('should handle GET_ORDER_SUCCESS', () => {
        expect( addBurgerOrder(initialData, {
            type: GET_ORDER_SUCCESS,
            data: order
          })
        ).toEqual({
            ...initialData,
            data: order
        })
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(addBurgerOrder(initialData, {
            type: GET_ORDER_FAILED
        })).toEqual ({
            ...initialData
        })
    })
})