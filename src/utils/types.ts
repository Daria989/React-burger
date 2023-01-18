import { store } from '../index'

import { ThunkDispatch } from 'redux-thunk';

import { TAuthActions } from '../services/actions/authActions';
import { TIngredientsDataActions } from '../services/actions/ingredientsAction';
import { TWSAction } from '../services/actions/wsActions';
import { TWSActionAuth } from '../services/actions/wsActionsAuth';
import { PayloadAction } from '@reduxjs/toolkit';

type TApplicationActions = TAuthActions | TIngredientsDataActions | TWSAction | TWSActionAuth;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type TLocationState = {
    background: any
  }

export type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

export type TIngredientType = {
    _id: string,
    key: number,
    dragId: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}

export type TIngredientTypeWithCount = TIngredientType & {
    repeat: number
}

export type TIngredientTypeWithDragId = { 
    _id: string,
    key: number,
    dragId: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
    index: number
}

export type TIngredientsIds = {
    ingredients: Array<string> 
};

export type TIngredientTypeWithIndex = TIngredientType & {
    index: number;
}

export type TIngredientTypeCardDescription = {
    description : TIngredientType
}
  
export type TIngredientTypeConstructorItemProps = {
    item: TIngredientType,
    index: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void,
    handleClose: () => void
}

export type TIngredientTypeIngredient = {
    id: string,
    innerRef: React.RefObject<HTMLInputElement> 
    type: string
}

export type TModal = {
    onClose:() => void,
    children: React.ReactNode
}

export type TModalOverlay = {
    onClose: () => void
}

export type TLocationStateLogin = {
    from: {
        pathname: string;
    };
}

export type TForm = {
    name?: string;
    email?: string, 
    password?: string,
    token?: string
}


export type TOrderInitialState = {
    feedFailed: boolean;
    data: {
        order: number,
    }
}


export type TIngredientInitialState = {
    feedFailed: boolean;
    data: Array<TIngredientType>
}

export type TIngredientDetailsInitialState = {
    data: TIngredientType | any;
}

export type TConstructorInitialState = {
    data: Array<TIngredientType | TIngredientTypeWithDragId>
}

export type TBurgerOrderInitialState = {
    data: TBurgerOrder | null
}

export type TAuthInitialState = {
    name: string | undefined,
    email: string | undefined,
    password: string,

    registerRequest: boolean,
    registerFailed: boolean,
    registerSuccess: boolean,

    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,
    resetPasswordSuccess: boolean,

    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean,
    forgotPasswordSuccess: boolean,

    loginRequest: boolean,
    loginFailed: boolean,
    loginSuccess: boolean,

    getUserRequest: boolean,
    getUserFailed: boolean,
    getUserSuccess: boolean,

    logoutRequest: boolean,
    logoutFailed: boolean,
    logoutSuccess: boolean,

    updateUserRequest: boolean,
    updateUserFailed: boolean,

    isTokenUpdated: boolean,
}

export type TBurgerOrder = {
        _v?: number,
        _id: string,
        createdAt: Date | any,
        ingredients: Array<string>,
        name: string,
        number: number | null,
        owner?: string
        status: string,
        updatedAt: Date | any
}

export type TBurgerOrderObject = {
    data: TBurgerOrder
}

export type TMessage = {
    success: boolean
    orders: [
            TBurgerOrder
        ],
    total: number
    totalToday: number
}

export type TWSState = {
    wsConnected: boolean
    messages: TMessage | null
    error: PayloadAction | null
}