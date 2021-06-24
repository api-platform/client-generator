import { SubmissionError } from 'redux-form';
import {
  fetchApi,
  extractHubURL,
  normalize,
  mercureSubscribe as subscribe
} from '../../utils/dataAccess';
import { success as createSuccess } from './create';
import { loading, error } from './delete';
import { TError, TDispatch, IResource } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import {
  {{{uc}}}_UPDATE_RETRIEVE_ERROR,
  {{{uc}}}_UPDATE_RETRIEVE_LOADING,
  {{{uc}}}_UPDATE_RETRIEVE_SUCCESS,
  {{{uc}}}_UPDATE_UPDATE_ERROR,
  {{{uc}}}_UPDATE_UPDATE_LOADING,
  {{{uc}}}_UPDATE_UPDATE_SUCCESS,
  {{{uc}}}_UPDATE_RESET,
  {{{uc}}}_UPDATE_MERCURE_OPEN,
  {{{uc}}}_UPDATE_MERCURE_DELETED,
  {{{uc}}}_UPDATE_MERCURE_MESSAGE,
  IActionRetrieveError,
  IActionRetrieveLoading,
  IActionRetrieveSuccess,
  IActionUpdateError,
  IActionUpdateLoading,
  IActionUpdateSuccess,
  IActionMercureOpen
} from '../../types/{{{lc}}}/update'

export function retrieveError(retrieveError: TError): IActionRetrieveError {
  return { type: {{{uc}}}_UPDATE_RETRIEVE_ERROR, retrieveError };
}

export function retrieveLoading(retrieveLoading: boolean): IActionRetrieveLoading {
  return { type: {{{uc}}}_UPDATE_RETRIEVE_LOADING, retrieveLoading };
}

export function retrieveSuccess(retrieved: I{{{ucf}}}): IActionRetrieveSuccess {
  return { type: {{{uc}}}_UPDATE_RETRIEVE_SUCCESS, retrieved };
}

export function retrieve(id: string) {
  return (dispatch: TDispatch) => {
    dispatch(retrieveLoading(true));

    return fetchApi(id)
      .then(response =>
        response
          .json()
          .then(retrieved => ({ retrieved, hubURL: extractHubURL(response) }))
      )
      .then(({ retrieved, hubURL }) => {
        retrieved = normalize(retrieved);

        dispatch(retrieveLoading(false));
        dispatch(retrieveSuccess(retrieved));

        if (hubURL) dispatch(mercureSubscribe(hubURL, retrieved['@id']));
      })
      .catch(e => {
        dispatch(retrieveLoading(false));
        dispatch(retrieveError(e.message));
      });
  };
}

export function updateError(updateError: TError): IActionUpdateError {
  return { type: {{{uc}}}_UPDATE_UPDATE_ERROR, updateError };
}

export function updateLoading(updateLoading: boolean): IActionUpdateLoading {
  return { type: {{{uc}}}_UPDATE_UPDATE_LOADING, updateLoading };
}

export function updateSuccess(updated: I{{{ucf}}}): IActionUpdateSuccess {
  return { type: {{{uc}}}_UPDATE_UPDATE_SUCCESS, updated };
}

export function update(item: IResource, values: Partial<I{{{ucf}}}>) {
  return (dispatch: TDispatch) => {
    dispatch(updateError(null));
    dispatch(createSuccess(null));
    dispatch(updateLoading(true));

    return fetchApi(item['@id'], {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/ld+json' }),
      body: JSON.stringify(values)
    })
      .then(response =>
        response
          .json()
          .then(retrieved => ({ retrieved, hubURL: extractHubURL(response) }))
      )
      .then(({ retrieved, hubURL }) => {
        retrieved = normalize(retrieved);

        dispatch(updateLoading(false));
        dispatch(updateSuccess(retrieved));

        if (hubURL) dispatch(mercureSubscribe(hubURL, retrieved['@id']));
      })
      .catch(e => {
        dispatch(updateLoading(false));

        if (e instanceof SubmissionError) {
          dispatch(updateError(e.errors._error));
          throw e;
        }

        dispatch(updateError(e.message));
      });
  };
}

export function reset(eventSource: EventSource | null) {
  return (dispatch: TDispatch) => {
    if (eventSource) eventSource.close();

    dispatch({ type: {{{uc}}}_UPDATE_RESET });
    dispatch(error(null));
    dispatch(loading(false));
    dispatch(createSuccess(null));
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

export function mercureOpen(eventSource: EventSource): IActionMercureOpen {
  return { type: {{{uc}}}_UPDATE_MERCURE_OPEN, eventSource };
}

export function mercureMessage(retrieved: IResource | I{{{ucf}}}) {
  return (dispatch: TDispatch) => {
    if (1 === Object.keys(retrieved).length) {
      dispatch({ type: {{{uc}}}_UPDATE_MERCURE_DELETED, retrieved });
      return;
    }

    dispatch({ type: {{{uc}}}_UPDATE_MERCURE_MESSAGE, retrieved });
  };
}
