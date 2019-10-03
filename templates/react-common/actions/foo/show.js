import {
  fetch,
  extractHubURL,
  normalize,
} from '../../utils/dataAccess';
import { mercureSubscribe as subscribe } from '../../../utils/mercure';

export function error(error) {
  return { type: '{{{uc}}}_SHOW_ERROR', error };
}

export function loading(loading) {
  return { type: '{{{uc}}}_SHOW_LOADING', loading };
}

export function success(retrieved) {
  return { type: '{{{uc}}}_SHOW_SUCCESS', retrieved };
}

export function retrieve(id) {
  return dispatch => {
    dispatch(loading(true));

    return fetch(id)
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

export function reset(eventSource) {
  return dispatch => {
    if (eventSource) eventSource.close();

    dispatch({ type: '{{{uc}}}_SHOW_RESET' });
    dispatch(error(null));
    dispatch(loading(false));
  };
}

export function mercureSubscribe(hubURL, topic) {
  return dispatch => {
    const eventSource = subscribe(hubURL, [topic]);
    dispatch(mercureOpen(eventSource));
    eventSource.addEventListener('message', event =>
      dispatch(mercureMessage(normalize(JSON.parse(event.data))))
    );
  };
}

export function mercureOpen(eventSource) {
  return { type: '{{{uc}}}_SHOW_MERCURE_OPEN', eventSource };
}

export function mercureMessage(retrieved) {
  return dispatch => {
    if (1 === Object.keys(retrieved).length) {
      dispatch({ type: '{{{uc}}}_SHOW_MERCURE_DELETED', retrieved });
      return;
    }

    dispatch({ type: '{{{uc}}}_SHOW_MERCURE_MESSAGE', retrieved });
  };
}
