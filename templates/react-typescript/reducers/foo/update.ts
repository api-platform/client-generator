import { combineReducers } from 'redux';
import { TError } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import {
  {{{uc}}}_UPDATE_MERCURE_DELETED,
  {{{uc}}}_UPDATE_MERCURE_MESSAGE,
  {{{uc}}}_UPDATE_MERCURE_OPEN,
  {{{uc}}}_UPDATE_RESET,
  {{{uc}}}_UPDATE_RETRIEVE_ERROR,
  {{{uc}}}_UPDATE_RETRIEVE_LOADING,
  {{{uc}}}_UPDATE_RETRIEVE_SUCCESS,
  {{{uc}}}_UPDATE_UPDATE_ERROR,
  {{{uc}}}_UPDATE_UPDATE_LOADING,
  {{{uc}}}_UPDATE_UPDATE_SUCCESS,
  IActionRetrieveError,
  IActionRetrieveLoading,
  IActionRetrieveSuccess,
  IActionUpdateError,
  IActionUpdateLoading,
  IActionUpdateSuccess,
  IActionReset,
  IActionMercureOpen,
  IActionMercureDeleted,
  IActionMercureMessage
} from '../../types/{{{lc}}}/update';

export function retrieveError(state: TError = null, action: IActionRetrieveError | IActionMercureDeleted | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_UPDATE_RETRIEVE_ERROR:
      return action.retrieveError;

    case {{{uc}}}_UPDATE_MERCURE_DELETED:
      return `${action.retrieved['@id']} has been deleted by another user.`;

    case {{{uc}}}_UPDATE_RESET:
      return null;

    default:
      return state;
  }
}

export function retrieveLoading(state: boolean = false, action: IActionRetrieveLoading | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_UPDATE_RETRIEVE_LOADING:
      return action.retrieveLoading;

    case {{{uc}}}_UPDATE_RESET:
      return false;

    default:
      return state;
  }
}

export function retrieved(state: I{{{ucf}}} | null = null, action: IActionRetrieveSuccess | IActionMercureMessage | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_UPDATE_RETRIEVE_SUCCESS:
    case {{{uc}}}_UPDATE_MERCURE_MESSAGE:
      return action.retrieved;

    case {{{uc}}}_UPDATE_RESET:
      return null;

    default:
      return state;
  }
}

export function updateError(state: TError = null, action: IActionUpdateError | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_UPDATE_UPDATE_ERROR:
      return action.updateError;

    case {{{uc}}}_UPDATE_RESET:
      return null;

    default:
      return state;
  }
}

export function updateLoading(state: boolean = false, action: IActionUpdateLoading | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_UPDATE_UPDATE_LOADING:
      return action.updateLoading;

    case {{{uc}}}_UPDATE_RESET:
      return false;

    default:
      return state;
  }
}

export function updated(state: I{{{ucf}}} | null = null, action: IActionUpdateSuccess | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_UPDATE_UPDATE_SUCCESS:
      return action.updated;

    case {{{uc}}}_UPDATE_RESET:
      return null;

    default:
      return state;
  }
}

export function eventSource(state: EventSource | null = null, action: IActionMercureOpen | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_UPDATE_MERCURE_OPEN:
      return action.eventSource;

    case {{{uc}}}_UPDATE_RESET:
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  retrieveError,
  retrieveLoading,
  retrieved,
  updateError,
  updateLoading,
  updated,
  eventSource
});
