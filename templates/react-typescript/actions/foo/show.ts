import {
  fetchApi,
  extractHubURL,
  normalize,
  mercureSubscribe as subscribe
} from '../../utils/dataAccess';
import { TError, TDispatch, IResource } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import {
  {{{uc}}}_SHOW_ERROR,
  {{{uc}}}_SHOW_LOADING,
  {{{uc}}}_SHOW_SUCCESS,
  {{{uc}}}_SHOW_RESET,
  {{{uc}}}_SHOW_MERCURE_OPEN,
  {{{uc}}}_SHOW_MERCURE_DELETED,
  {{{uc}}}_SHOW_MERCURE_MESSAGE,
  IActionError,
  IActionLoading,
  IActionSuccess
} from '../../types/{{{lc}}}/show';

export function error(error: TError): IActionError {
  return { type: {{{uc}}}_SHOW_ERROR, error };
}

export function loading(loading: boolean): IActionLoading {
  return { type: {{{uc}}}_SHOW_LOADING, loading };
}

export function success(retrieved: I{{{ucf}}}): IActionSuccess {
  return { type: {{{uc}}}_SHOW_SUCCESS, retrieved };
}

export function retrieve(id: string) {
  return (dispatch: TDispatch) => {
    dispatch(loading(true));

    return fetchApi(id)
      .then(response =>
        response
          .json()
          .then(retrieved => ({ retrieved, hubURL: extractHubURL(response) }))
      )
      .then(({ retrieved, hubURL }) => {
        retrieved = normalize(retrieved);

        dispatch(loading(false));
        dispatch(success(retrieved));

        if (hubURL) dispatch(mercureSubscribe(hubURL, retrieved['@id']));
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

    dispatch({ type: {{{uc}}}_SHOW_RESET });
    dispatch(error(null));
    dispatch(loading(false));
  };
}

export function mercureSubscribe(hubURL: URL, topic: string) {
  return (dispatch: TDispatch) => {
    const eventSource = subscribe(hubURL, [topic]);
    dispatch(mercureOpen(eventSource));
    eventSource.addEventListener('message', event =>
      dispatch(mercureMessage(normalize(JSON.parse(event.data))))
    );
  };
}

export function mercureOpen(eventSource: EventSource) {
  return { type: {{{uc}}}_SHOW_MERCURE_OPEN, eventSource };
}

export function mercureMessage(retrieved: IResource | I{{{ucf}}}) {
  return (dispatch: TDispatch) => {
    if (1 === Object.keys(retrieved).length) {
      dispatch({ type: {{{uc}}}_SHOW_MERCURE_DELETED, retrieved });
      return;
    }

    dispatch({ type: {{{uc}}}_SHOW_MERCURE_MESSAGE, retrieved });
  };
}
