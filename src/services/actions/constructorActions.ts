import { TIngredientTypeWithDragId,  TIngredientType } from '../../utils/types';
import { AppDispatch} from '../../utils/types';

export const GET_CONSTRUCTOR_LIST: 'GET_CONSTRUCTOR_LIST' = 'GET_CONSTRUCTOR_LIST';
export const ADD_CONSTRUCTOR_ELEMENT: 'ADD_CONSTRUCTOR_ELEMENT' = 'ADD_CONSTRUCTOR_ELEMENT';
export const DELETE_CONSTRUCTOR_ELEMENT: 'DELETE_CONSTRUCTOR_ELEMENT' = 'DELETE_CONSTRUCTOR_ELEMENT';

export interface IGetConstructorListAction {
    readonly type: typeof GET_CONSTRUCTOR_LIST,
    data: Array<TIngredientType>
  }
  
  export interface IAddConstructorElementAction {
    readonly type: typeof ADD_CONSTRUCTOR_ELEMENT,
    data: TIngredientTypeWithDragId
  }
  
  export interface IDeleteConstructorElementAction {
    readonly type: typeof DELETE_CONSTRUCTOR_ELEMENT,
    data: string
  }
  
  export function getConstructorData(data: Array<TIngredientType>) {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: GET_CONSTRUCTOR_LIST,
        data: data
      }) 
    }
  }
  
  export function addConstructorElement(item: TIngredientTypeWithDragId) {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: ADD_CONSTRUCTOR_ELEMENT,
        data: item
      }) 
    }
   }
  
  export function deleteConstructorElement(id: string) {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: DELETE_CONSTRUCTOR_ELEMENT,
        data: id
      }) 
    }
  }