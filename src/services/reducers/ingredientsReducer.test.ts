import { addIngredientsList, addIngredientDetails } from './ingredientsReducer';
import { 
    GET_DATA_SUCCESS, 
    GET_DATA_FAILED, 
    ADD_INGREDIENT_DETAILS
} from '../actions/ingredientsAction';

const ingredients = [
    {
        __v: 0,
        _id: "60d3b41abdacab0026a733c6",
        key: 0,
        dragId: "ec4f542-2de-2d58-b33-8ba46174d07",
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun"
    },
    {
        __v: 0,
        _id: "60d3b41abdacab0026a733c7",
        key: 1,
        dragId: "ec4f542-2de-2d58-b33-8ba46174d07",
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        name: "Флюоресцентная булка R2-D3",
        price: 988,
        proteins: 44,
        type: "bun",
    }
]

const ingredient  = {
    __v: 0,
    _id: "60d3b41abdacab0026a733c7",
    key: 1,
    dragId: "ec4f542-2de-2d58-b33-8ba46174d07",
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Флюоресцентная булка R2-D3",
    price: 988,
    proteins: 44,
    type: "bun",
}

describe('reducer', () => {
    const initialDataIngredients = {
        feedFailed: false,
        data: []
    }

    const initialDataDetails = {
        feedFailed: false,
        data: null
    } 

    it('should handle GET_DATA_SUCCESS in addIngredientsList reducer', () => {
        expect( addIngredientsList(initialDataIngredients, {
            type: GET_DATA_SUCCESS,
            data: ingredients
          })
        ).toEqual({
            ...initialDataIngredients,
            data: ingredients
        })
    })

    it('should handle GET_ORDER_FAILED in addIngredientsList reducer', () => {
        expect(addIngredientsList(initialDataIngredients, {
            type: GET_DATA_FAILED
        })).toEqual ({
            ...initialDataIngredients,
            feedFailed: true, 
        })
    })

    it('should handle ADD_INGREDIENT_DETAILS in addIngredientDetails reducer', () => {
        expect( addIngredientDetails(initialDataDetails, {
            type: ADD_INGREDIENT_DETAILS,
            data: ingredient
          })
        ).toEqual({
            data: ingredient
        })
    })
})