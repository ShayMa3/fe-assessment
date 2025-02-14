import {
  RootState,
  AppActionTypes,
  actionTypes,
  FetchStatus,
  IFetchDataCompletedAction,
} from './types';
import { IRetailItem } from '../service/api';

const initialState: RootState = {
  status: FetchStatus.Idle,
  retailItems: [] as IRetailItem[],
};

export function appReducer(
  state = initialState,
  action: AppActionTypes
): RootState {
  switch (action.type) {
    case actionTypes.FETCH_DATA_START: {
      return {
        ...state,
        status: FetchStatus.Pending,
      };
    }
    case actionTypes.FETCH_DATA_ERROR: {
      return {
        ...state,
        status: FetchStatus.Error,
      };
    }
    case actionTypes.FETCH_DATA_COMPLETED: {
      return {
        ...state,
        status: FetchStatus.Completed,
        retailItems: (action as IFetchDataCompletedAction).data,
      };
    }
    default:
      return state;
  }
}
