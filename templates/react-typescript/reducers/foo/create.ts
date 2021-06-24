import { combineReducers } from 'redux';
import { TError } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import {
  {{{uc}}}_CREATE_ERROR,
  {{{uc}}}_CREATE_LOADING,
  {{{uc}}}_CREATE_SUCCESS,
  IActionError,
  IActionLoading,
  IActionSuccess
} from '../../types/{{{lc}}}/create';

export function error(state: TError = null, action: IActionError) {
  switch (action.type) {
    case {{{uc}}}_CREATE_ERROR:
      return action.error;

    default:
      return state;
  }
}

export function loading(state: boolean = false, action: IActionLoading) {
  switch (action.type) {
    case {{{uc}}}_CREATE_LOADING:
      return action.loading;

    default:
      return state;
  }
}

export function created(state: I{{{ucf}}} | null = null, action: IActionSuccess) {
  switch (action.type) {
    case {{{uc}}}_CREATE_SUCCESS:
      return action.created;

    default:
      return state;
  }
}

export default combineReducers({ error, loading, created });
