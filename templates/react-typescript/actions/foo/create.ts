import { SubmissionError } from 'redux-form';
import { fetchApi } from '../../utils/dataAccess';
import { TError, TDispatch } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import {
  {{{uc}}}_CREATE_ERROR,
  {{{uc}}}_CREATE_LOADING,
  {{{uc}}}_CREATE_SUCCESS,
  IActionError,
  IActionLoading,
  IActionSuccess
} from '../../types/{{{lc}}}/create';

export function error(error: TError): IActionError {
  return { type: {{{uc}}}_CREATE_ERROR, error };
}

export function loading(loading: boolean): IActionLoading {
  return { type: {{{uc}}}_CREATE_LOADING, loading };
}

export function success(created: I{{{ucf}}} | null): IActionSuccess {
  return { type: {{{uc}}}_CREATE_SUCCESS, created };
}

export function create(values: Partial<I{{{ucf}}}>) {
  return (dispatch: TDispatch) => {
    dispatch(loading(true));

    return fetchApi('{{{name}}}', { method: 'POST', body: JSON.stringify(values) })
      .then(response => {
        dispatch(loading(false));

        return response.json();
      })
      .then(retrieved => dispatch(success(retrieved)))
      .catch(e => {
        dispatch(loading(false));

        if (e instanceof SubmissionError) {
          dispatch(error(e.errors._error));
          throw e;
        }

        dispatch(error(e.message));
      });
  };
}

export function reset() {
  return (dispatch: TDispatch) => {
    dispatch(loading(false));
    dispatch(error(null));
  };
}
