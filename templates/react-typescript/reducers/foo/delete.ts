import { combineReducers } from 'redux';
import { TError } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import {
  {{{uc}}}_DELETE_ERROR,
  {{{uc}}}_DELETE_LOADING,
  {{{uc}}}_DELETE_SUCCESS,
  IActionError,
  IActionLoading,
  IActionSuccess
} from '../../types/{{{lc}}}/delete';

export function error(state: TError = null, action: IActionError) {
  switch (action.type) {
    case {{{uc}}}_DELETE_ERROR:
      return action.error;

    default:
      return state;
  }
}

export function loading(state: boolean = false, action: IActionLoading) {
  switch (action.type) {
    case {{{uc}}}_DELETE_LOADING:
      return action.loading;

    default:
      return state;
  }
}

export function deleted(state: I{{{ucf}}} | null = null, action: IActionSuccess) {
  switch (action.type) {
    case {{{uc}}}_DELETE_SUCCESS:
      return action.deleted;

    default:
      return state;
  }
}

export default combineReducers({ error, loading, deleted });
