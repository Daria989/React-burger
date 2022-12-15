import { TWSState } from '../../utils/types';

import {
  TWSAction,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/wsActions';

const initialState: TWSState = {
  wsConnected: false,
  messages: null,
  error: null
};

export const wsReducer = (state = initialState, action: TWSAction):TWSState  => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: null,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        messages: null,
        error: null,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: null,
        messages: action.payload
      };
    default:
      return state
  }
};