import { authReducer } from './authReducer';
import {
    GET_REGISTER_REQUEST,
    GET_REGISTER_SUCCESS,
    GET_REGISTER_FAILED,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

    GET_LOGIN_REQUEST,
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILED,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,

    GET_LOGOUT_REQUEST,
    GET_LOGOUT_SUCCESS,
    GET_LOGOUT_FAILED,

    GET_UPDATE_USER_REQUEST,
    GET_UPDATE_USER_SUCCESS,
    GET_UPDATE_USER_FAILED,

    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED
    
} from '../actions/authActions';

import { TAuthInitialState } from '../../utils/types';

const initialData: TAuthInitialState = {
    name: '',
    email: '',
    password: '',

    registerRequest: false,
    registerFailed: false,
    registerSuccess: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    forgotPasswordSuccess: false,

    loginRequest: false,
    loginFailed: false,
    loginSuccess: false,

    getUserRequest: false,
    getUserFailed: false,
    getUserSuccess: false,

    logoutRequest: false,
    logoutFailed: false,
    logoutSuccess: false,

    updateUserRequest: false,
    updateUserFailed: false,

    isTokenUpdated: false
}

describe('reducer', () => {

    it('should handle GET_CONSTRUCTOR_LIST', () => {
        expect( authReducer(initialData, {
            type: GET_REGISTER_REQUEST
        })
        ).toEqual({
            ...initialData,
            registerRequest: true,
            registerFailed: false,
            registerSuccess: false
        })
    })

    it('should handle GET_REGISTER_SUCCESS', () => {
        expect( authReducer(initialData, {
            type: GET_REGISTER_SUCCESS,
            user: {
                name: 'Test',
                email: 'test@yandex.ru'
            },
            data: true,
        })
        ).toEqual({
            ...initialData,
            registerFailed: false,
            name: 'Test',
            email:'test@yandex.ru',
            registerRequest: false,
            registerSuccess: true
        })
    })

    it('should handle GET_REGISTER_FAILED', () => {
        expect( authReducer(initialData, {
            type: GET_REGISTER_FAILED,
        })
        ).toEqual({
            ...initialData, 
            registerFailed: true, 
            registerRequest: false,
            registerSuccess: false 
        })
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect( authReducer(initialData, {
            type: FORGOT_PASSWORD_REQUEST,
        })
        ).toEqual({
            ...initialData,
            forgotPasswordRequest: true,
            forgotPasswordFailed: false,
            forgotPasswordSuccess: false
        })
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect( authReducer(initialData, {
            type: FORGOT_PASSWORD_SUCCESS,
            data: true
        })
        ).toEqual({
            ...initialData,
            forgotPasswordRequest: false,
            forgotPasswordFailed: false,
            forgotPasswordSuccess: true
        })
    })

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect( authReducer(initialData, {
            type: FORGOT_PASSWORD_FAILED,
        })
        ).toEqual({
            ...initialData,
            forgotPasswordFailed: true,
            forgotPasswordRequest: false,
            forgotPasswordSuccess: false
        })
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect( authReducer(initialData, {
            type: RESET_PASSWORD_REQUEST,
        })
        ).toEqual({
            ...initialData,
            resetPasswordRequest: true,
            resetPasswordFailed: false,
            resetPasswordSuccess: false
        })
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect( authReducer(initialData, {
            type: RESET_PASSWORD_SUCCESS,
            data: true
        })
        ).toEqual({
            ...initialData,
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordSuccess: true,
        })
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect( authReducer(initialData, {
            type: RESET_PASSWORD_FAILED,
        })
        ).toEqual({
            ...initialData,
            resetPasswordRequest: false,
            resetPasswordFailed: true,
            resetPasswordSuccess: false
        })
    })

    it('should handle GET_LOGIN_REQUEST', () => {
        expect( authReducer(initialData, {
            type: GET_LOGIN_REQUEST,
        })
        ).toEqual({
            ...initialData,
            loginRequest: true,
            loginFailed: false,
            loginSuccess: false
        })
    })

    it('should handle GET_LOGIN_SUCCESS', () => {
        expect( authReducer(initialData, {
            type: GET_LOGIN_SUCCESS,
            user: {
                name: 'Test',
                email: 'test@yandex.ru'
            },
            data: true
        })
        ).toEqual({
            ...initialData,
            name: 'Test',
            email: 'test@yandex.ru',
            loginFailed: false,
            loginRequest: false,
            loginSuccess: true,
            logoutSuccess: false
        })
    })

    it('should handle GET_LOGIN_FAILED', () => {
        expect( authReducer(initialData, {
            type: GET_LOGIN_FAILED,
        })
        ).toEqual({
            ...initialData,
            loginFailed: true, 
            loginRequest: false,
            loginSuccess: false 
        })
    })

    it('should handle GET_USER_REQUEST', () => {
        expect( authReducer(initialData, {
            type: GET_USER_REQUEST,
        })
        ).toEqual({
            ...initialData,
            getUserRequest: true,
            getUserFailed: false,
            getUserSuccess: false, 
        })
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect( authReducer(initialData, {
            type: GET_USER_SUCCESS,
            user: {
                name: 'Test',
                email: 'test@yandex.ru'
            },
            data: true
        })
        ).toEqual({
            ...initialData,
            getUserFailed: false,
            name: 'Test',
            email: 'test@yandex.ru',
            getUserRequest: false,
            getUserSuccess: true,
            isTokenUpdated: true,
        })
    })

    it('should handle GET_USER_FAILED', () => {
        expect( authReducer(initialData, {
            type: GET_USER_FAILED
        })
        ).toEqual({
            ...initialData,
            getUserFailed: true, 
            getUserRequest: false,
            getUserSuccess: false,
            isTokenUpdated: false, 
        })
    })

    it('should handle GET_LOGOUT_REQUEST', () => {
        expect( authReducer(initialData, {
            type: GET_LOGOUT_REQUEST
        })
        ).toEqual({})
    })

    it('should handle GET_LOGOUT_SUCCESS', () => {
        expect( authReducer(initialData, {
            type: GET_LOGOUT_SUCCESS,
            data: true
        })
        ).toEqual({})
    })

    it('should handle GET_LOGOUT_FAILED', () => {
        expect( authReducer(initialData, {
            type: GET_LOGOUT_FAILED
        })
        ).toEqual({})
    })

    it('should handle GET_UPDATE_USER_REQUEST', () => {
        expect( authReducer(initialData, {
            type: GET_UPDATE_USER_REQUEST
        })
        ).toEqual({
            ...initialData,
            updateUserRequest: true,
            updateUserFailed: false,
        })
    })

    it('should handle GET_UPDATE_USER_SUCCESS', () => {
        expect( authReducer(initialData, {
            type: GET_UPDATE_USER_SUCCESS,
            data: {
                name: 'Test',
                email: 'test@yandex.ru'
            },
        })
        ).toEqual({
            ...initialData,
            updateUserFailed: false,
            name: 'Test',
            email: 'test@yandex.ru',
            updateUserRequest: false,
        })
    })

    it('should handle GET_UPDATE_USER_FAILED', () => {
        expect( authReducer(initialData, {
            type: GET_UPDATE_USER_FAILED,
        })
        ).toEqual({
            ...initialData,
            updateUserFailed: true, 
            updateUserRequest: false,
        })
    })

    it('should handle UPDATE_TOKEN_REQUEST', () => {
        expect( authReducer(initialData, {
            type: UPDATE_TOKEN_REQUEST,
        })
        ).toEqual({
            ...initialData,
        })
    })

    it('should handle UPDATE_TOKEN_SUCCESS', () => {
        expect( authReducer(initialData, {
            type: UPDATE_TOKEN_SUCCESS,
        })
        ).toEqual({
            ...initialData,
            isTokenUpdated: true,
        })
    })

    it('should handle UPDATE_TOKEN_FAILED', () => {
        expect( authReducer(initialData, {
            type: UPDATE_TOKEN_FAILED,
        })
        ).toEqual({
            ...initialData,
            isTokenUpdated: false,
        })
    })
})