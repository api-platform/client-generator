import { fetchApi } from '../../utils/dataAccess';
import { TError, TDispatch, IResource } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import {
  {{{uc}}}_DELETE_ERROR,
  {{{uc}}}_DELETE_LOADING,
  {{{uc}}}_DELETE_SUCCESS,
  IActionError,
  IActionLoading,
  IActionSuccess
} from '../../types/{{{lc}}}/delete';

export function error(error: TError): IActionError {
  return { type: {{{uc}}}_DELETE_ERROR, error };
}

export function loading(loading: boolean): IActionLoading {
  return { type: {{{uc}}}_DELETE_LOADING, loading };
}

export function success(deleted: Partial<I{{{ucf}}}> & IResource | null): IActionSuccess {
  return { type: {{{uc}}}_DELETE_SUCCESS, deleted };
}

export function del(item: Partial<I{{{ucf}}}> & IResource) {
  return (dispatch: TDispatch) => {
    dispatch(loading(true));

    return fetchApi(item['@id'], { method: 'DELETE' })
      .then(() => {
        dispatch(loading(false));
        dispatch(success(item));
      })
      .catch(e => {
        dispatch(loading(false));
        dispatch(error(e.message));
      });
  };
}
