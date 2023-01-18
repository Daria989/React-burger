import { registerRequest, loginRequest, 
  refreshTokenRequest, logoutRequest, getUserRequest, updateUserRequest, 
  forgotPasswordRequest, resetRequest} from '../../utils/api';

import { setCookie, deleteCookie } from '../cookie';
import { TForm, AppDispatch} from '../../utils/types';

export const GET_REGISTER_REQUEST: 'GET_REGISTER_REQUEST' = 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS: 'GET_REGISTER_SUCCESS' = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED: 'GET_REGISTER_FAILED' = 'GET_REGISTER_FAILED';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const GET_UPDATE_USER_REQUEST: 'GET_UPDATE_USER_REQUEST' = 'GET_UPDATE_USER_REQUEST';
export const GET_UPDATE_USER_SUCCESS: 'GET_UPDATE_USER_SUCCESS' = 'GET_UPDATE_USER_SUCCESS';
export const GET_UPDATE_USER_FAILED: 'GET_UPDATE_USER_FAILED' = 'GET_UPDATE_USER_FAILED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const GET_LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const GET_LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const GET_LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const GET_LOGIN_REQUEST: 'GET_LOGIN_REQUEST' = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS: 'GET_LOGIN_SUCCESS' = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED: 'GET_LOGIN_FAILED' = 'GET_LOGIN_FAILED';

export const UPDATE_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export interface IGetRegisterDataAction {
  readonly type: typeof GET_REGISTER_REQUEST
}

export interface IGetRegisterSuccessAction {
  readonly type: typeof GET_REGISTER_SUCCESS,
  user: TForm,
  data: boolean,
}

export interface IGetRegisterFailedAction {
  readonly type: typeof GET_REGISTER_FAILED
}

export interface IGetLoginRequestAction {
  readonly type: typeof GET_LOGIN_REQUEST
}

export interface IGetLoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS,
  user: TForm,
  data: boolean
}

export interface IGetLoginFailedAction {
  readonly type: typeof GET_LOGIN_FAILED
}

export interface IUpdateTokenRequestAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST
}

export interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS
}

export interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED
}

export interface IGetLogoutRequestAction {
  readonly type: typeof GET_LOGOUT_REQUEST
}

export interface IGetLogoutSuccessAction {
  readonly type: typeof GET_LOGOUT_SUCCESS,
  data: boolean
}

export interface IGetLogoutFailedAction {
  readonly type: typeof GET_LOGOUT_FAILED
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS,
  user: TForm,
  data: boolean
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED
}

export interface IGetUpdateUserRequestAction {
  readonly type: typeof GET_UPDATE_USER_REQUEST
}

export interface IGetUpdateUserSuccessAction {
  readonly type: typeof GET_UPDATE_USER_SUCCESS
  data: TForm
}

export interface IGetUpdateUserFailedAction { 
  readonly type: typeof GET_UPDATE_USER_FAILED
}

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS,
  data: boolean
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS,
  data: boolean
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED
}

export type TAuthActions = IGetRegisterDataAction 
            | IGetRegisterSuccessAction 
            | IGetRegisterFailedAction
            | IGetLoginRequestAction
            | IGetLoginSuccessAction
            | IGetLoginFailedAction
            | IUpdateTokenRequestAction
            | IUpdateTokenSuccessAction
            | IUpdateTokenFailedAction
            | IGetLogoutRequestAction
            | IGetLogoutSuccessAction
            | IGetLogoutFailedAction
            | IGetUserRequestAction
            | IGetUserSuccessAction
            | IGetUserFailedAction
            | IGetUpdateUserRequestAction
            | IGetUpdateUserSuccessAction
            | IGetUpdateUserFailedAction
            | IForgotPasswordRequestAction
            | IForgotPasswordSuccessAction
            | IForgotPasswordFailedAction
            | IResetPasswordRequestAction
            | IResetPasswordSuccessAction
            | IResetPasswordFailedAction


export function getRegisterData(userName: string, email: string, password: string) {
  return function(dispatch: AppDispatch) {
    dispatch({
			type: GET_REGISTER_REQUEST,
		});
    registerRequest(userName, email, password)
    .then (res  => {
      if (res && res.success) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('token', accessToken);
        dispatch({
          type: GET_REGISTER_SUCCESS,
          user: res.user,
          data: res.success
        });
      } else {
          dispatch({
            type: GET_REGISTER_FAILED,
          });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_REGISTER_FAILED,
      });
    });
  }
}

export function getLoginData(form: TForm) {
  return function(dispatch: AppDispatch) {
    dispatch({
			type: GET_LOGIN_REQUEST,
		});
    loginRequest(form)
    .then (res  => {
      if (res && res.success) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('token', accessToken);
        dispatch({
          type: GET_LOGIN_SUCCESS,
          user: res.user,
          data: res.success
        });
      } else {
          dispatch({
            type: GET_LOGIN_FAILED,
          });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_LOGIN_FAILED,
      });
    });
  }
}

export function updateToken() {
	return function (dispatch: AppDispatch) {
    dispatch({
			type: UPDATE_TOKEN_REQUEST,
		});
		refreshTokenRequest()
    .then((res) => {
			if (res && res.success) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
				setCookie('token', accessToken);
				dispatch({
					type: UPDATE_TOKEN_SUCCESS,
				});
			} else {
          dispatch({
            type: UPDATE_TOKEN_FAILED,
          });
			}
		})
    .catch((err) => {
			deleteCookie('token');
			localStorage.removeItem('refreshToken');
			dispatch({
				type: UPDATE_TOKEN_FAILED,
			});
		});
	};
};

export function getLogoutData(refreshToken: string | null) {
  return function(dispatch: AppDispatch) {
    dispatch({
			type: GET_LOGOUT_REQUEST,
		});
    logoutRequest(refreshToken)
    .then (res  => {
      if (res && res.success) {
        localStorage.removeItem('refreshToken');
        deleteCookie('token');
        dispatch({
          type: GET_LOGOUT_SUCCESS,
          data: res.success,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_LOGOUT_FAILED,
      });
    });
  }
}

export function getUserData() {
  return function(dispatch: AppDispatch) {
    dispatch({
			type: GET_USER_REQUEST,
		});
    getUserRequest()
    .then (res  => {
      if (res && res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
          data: res.success
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_FAILED,
      });
    });
  }
}

export function getUpdateUserData(form: TForm) {
  return function(dispatch: AppDispatch) {
    dispatch({
			type: GET_UPDATE_USER_REQUEST,
		});
    updateUserRequest(form)
    .then (res  => {
      if (res && res.success) {
        dispatch({
          type: GET_UPDATE_USER_SUCCESS,
          data: res.user
        })
      } else {
          throw res;
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_UPDATE_USER_FAILED,
      });
    });
  }
}

export function getForgotPasswordData(email: string) {
  return function(dispatch: AppDispatch) {
    dispatch({
			type: FORGOT_PASSWORD_REQUEST,
		});
    forgotPasswordRequest(email)
    .then (res  => {
      if (res && res.success) {
        dispatch({
					type: FORGOT_PASSWORD_SUCCESS,
          data: res.success
				});
      }
    })
    .catch((err) => {
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
      });
    });
  }
}

export function getResetPasswordData(form: TForm) {
  return function(dispatch: AppDispatch) {
    dispatch({
			type: RESET_PASSWORD_REQUEST,
		});
    resetRequest(form)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          data: res.success
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });

      }
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
      });
    });
  }
}