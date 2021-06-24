import {
  fetchApi,
  normalize,
  extractHubURL,
  mercureSubscribe as subscribe
} from '../../utils/dataAccess';
import { success as deleteSuccess } from './delete';
import { TError, TDispatch, IResource } from '../../utils/types'
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { IPagedCollection } from '../../interfaces/Collection'
import {
  {{{uc}}}_LIST_ERROR,
  {{{uc}}}_LIST_LOADING,
  {{{uc}}}_LIST_MERCURE_DELETED,
  {{{uc}}}_LIST_MERCURE_MESSAGE,
  {{{uc}}}_LIST_MERCURE_OPEN,
  {{{uc}}}_LIST_RESET,
  {{{uc}}}_LIST_SUCCESS,
  IActionError,
  IActionLoading,
  IActionSuccess,
  IActionMercureOpen
} from '../../types/{{{lc}}}/list'

export function error(error: TError): IActionError {
  return { type: {{{uc}}}_LIST_ERROR, error };
}

export function loading(loading: boolean): IActionLoading {
  return { type: {{{uc}}}_LIST_LOADING, loading };
}

export function success(retrieved: IPagedCollection<I{{{ucf}}}>): IActionSuccess {
  return { type: {{{uc}}}_LIST_SUCCESS, retrieved };
}

export function list(page = '{{{name}}}') {
  return (dispatch: TDispatch) => {
    dispatch(loading(true));
    dispatch(error(''));

    fetchApi(page)
      .then(response =>
        response
          .json()
          .then(retrieved => ({ retrieved, hubURL: extractHubURL(response) }))
      )
      .then(({ retrieved, hubURL }) => {
        retrieved = normalize(retrieved);

        dispatch(loading(false));
        dispatch(success(retrieved));

        if (hubURL && retrieved['hydra:member'].length)
          dispatch(
            mercureSubscribe(
              hubURL,
              retrieved['hydra:member'].map((i: I{{{ucf}}}) => i['@id'])
            )
          );
      })
      .catch(e => {
        dispatch(loading(false));
        dispatch(error(e.message));
      });
  };
}

export function reset(eventSource: EventSource | null) {
  return (dispatch: TDispatch) => {
    if (eventSource) eventSource.close();

    dispatch({ type: {{{uc}}}_LIST_RESET });
    dispatch(deleteSuccess(null));
  };
}

export function mercureSubscribe(hubURL: URL, topics: string[]) {
  return (dispatch: TDispatch) => {
    const eventSource = subscribe(hubURL, topics);
    dispatch(mercureOpen(eventSource));
    eventSource.addEventListener('message', event =>
      dispatch(mercureMessage(normalize(JSON.parse(event.data))))
    );
  };
}

export function mercureOpen(eventSource: EventSource): IActionMercureOpen {
  return { type: {{{uc}}}_LIST_MERCURE_OPEN, eventSource };
}

export function mercureMessage(retrieved: IResource | I{{{ucf}}}) {
  return (dispatch: TDispatch) => {
    if (1 === Object.keys(retrieved).length) {
      dispatch({ type: {{{uc}}}_LIST_MERCURE_DELETED, retrieved });
      return;
    }

    dispatch({ type: {{{uc}}}_LIST_MERCURE_MESSAGE, retrieved });
  };
}
