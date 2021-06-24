import { combineReducers } from 'redux';
import { TError } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import {
  {{{uc}}}_SHOW_ERROR,
  {{{uc}}}_SHOW_LOADING,
  {{{uc}}}_SHOW_SUCCESS,
  {{{uc}}}_SHOW_MERCURE_DELETED,
  {{{uc}}}_SHOW_MERCURE_MESSAGE,
  {{{uc}}}_SHOW_MERCURE_OPEN,
  {{{uc}}}_SHOW_RESET,
  IActionError,
  IActionLoading,
  IActionSuccess,
  IActionReset,
  IActionMercureOpen,
  IActionMercureDeleted,
  IActionMercureMessage
} from '../../types/{{{lc}}}/show';

export function error(state: TError = null, action: IActionError | IActionMercureDeleted | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_SHOW_ERROR:
      return action.error;

    case {{{uc}}}_SHOW_MERCURE_DELETED:
      return `${action.retrieved['@id']} has been deleted by another user.`;

    case {{{uc}}}_SHOW_RESET:
      return null;

    default:
      return state;
  }
}

export function loading(state: boolean = false, action: IActionLoading | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_SHOW_LOADING:
      return action.loading;

    case {{{uc}}}_SHOW_RESET:
      return false;

    default:
      return state;
  }
}

export function retrieved(state: I{{{ucf}}} | null = null, action: IActionSuccess | IActionMercureMessage | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_SHOW_SUCCESS:
    case {{{uc}}}_SHOW_MERCURE_MESSAGE:
      return action.retrieved;

    case {{{uc}}}_SHOW_RESET:
      return null;

    default:
      return state;
  }
}

export function eventSource(state: EventSource | null = null, action: IActionReset | IActionMercureOpen) {
  switch (action.type) {
    case {{{uc}}}_SHOW_MERCURE_OPEN:
      return action.eventSource;

    case {{{uc}}}_SHOW_RESET:
      return null;

    default:
      return state;
  }
}

export default combineReducers({ error, loading, retrieved, eventSource });
