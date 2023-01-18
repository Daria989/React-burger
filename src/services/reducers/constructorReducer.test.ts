import { addConstructorList } from './constructorReducer';
import { 
    GET_CONSTRUCTOR_LIST,
    ADD_CONSTRUCTOR_ELEMENT,
    DELETE_CONSTRUCTOR_ELEMENT,
} from '../actions/constructorActions';

const initialData: any = {
    data: []
};

const ingredients = [
    {
        __v: 0,
        _id: "60d3b41abdacab0026a733c6",
        key: 0,
        dragId: "ec4f542-2de-2d58-b33-8ba46174d09",
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        index: 0,
    },
    {
        __v: 0,
        _id: "60d3b41abdacab0026a733ce",
        key: 1,
        dragId: "ec4f542-2de-2d58-b33-8ba46174d08",
        calories: 99,
        carbohydrates: 42,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/sauce-03.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
        name: "Соус традиционный галактический",
        price: 15,
        proteins: 42,
        type: "sauce",
        index: 1,
    }
]

const ingredient  = {
    __v: 0,
    _id: "60d3b41abdacab0026a733ce",
    key: 2,
    dragId: "ec4f542-2de-2d58-b33-8ba46174d07",
    calories: 99,
    carbohydrates: 42,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    name: "Соус традиционный галактический",
    price: 15,
    proteins: 42,
    type: "sauce",
    index: 2,
}

describe('reducer', () => {

    it('should handle GET_CONSTRUCTOR_LIST', () => {
        expect( addConstructorList(initialData, {
            type: GET_CONSTRUCTOR_LIST,
            data: ingredients
        })
        ).toEqual({
            ...initialData,
            data: ingredients
        })
    })

    it('should handle ADD_CONSTRUCTOR_ELEMENT', () => {
        expect(addConstructorList(initialData, {
            type: ADD_CONSTRUCTOR_ELEMENT,
            data: ingredient
        })
        ).toEqual(
            (ingredient.type === 'bun') ? 
                { 
                    data: [...initialData.data.filter((element: any) => element.type !== "bun"), ingredient, ingredient]
                }
                :
                {
                    data: [ingredient, ...initialData.data ]
                }
        )
    })

    it('should handle DELETE_CONSTRUCTOR_ELEMENT', () => {
        expect(addConstructorList(initialData, {
            type: DELETE_CONSTRUCTOR_ELEMENT,
            data: ingredient.dragId
        })
        ).toEqual ({
            ...initialData
        })
    })
})

