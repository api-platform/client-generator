import { combineReducers } from 'redux';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { IPagedCollection } from '../../interfaces/Collection'
import { TError } from '../../utils/types'
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
  IActionReset,
  IActionMercureOpen,
  IActionMercureDeleted,
  IActionMercureMessage
} from '../../types/{{{lc}}}/list'

export function error(state: TError = null, action: IActionError | IActionMercureDeleted | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_LIST_ERROR:
      return action.error;

    case {{{uc}}}_LIST_MERCURE_DELETED:
      return `${action.retrieved['@id']} has been deleted by another user.`;

    case {{{uc}}}_LIST_RESET:
      return null;

    default:
      return state;
  }
}

export function loading(state: boolean = false, action: IActionLoading | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_LIST_LOADING:
      return action.loading;

    case {{{uc}}}_LIST_RESET:
      return false;

    default:
      return state;
  }
}

export function retrieved(state: IPagedCollection<I{{{ucf}}}> | null = null, action: IActionSuccess | IActionMercureMessage | IActionMercureDeleted | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_LIST_SUCCESS:
      return action.retrieved;

    case {{{uc}}}_LIST_RESET:
      return null;

    case {{{uc}}}_LIST_MERCURE_MESSAGE:
      if (!state || !Array.isArray(state['hydra:member'])) {
        return state;
      }

      return {
        ...state,
        'hydra:member': state['hydra:member'].map(item =>
          item['@id'] === action.retrieved['@id'] ? action.retrieved : item
        )
      };

    case {{{uc}}}_LIST_MERCURE_DELETED:
      if (!state || !Array.isArray(state['hydra:member'])) {
        return state;
      }

      return {
        ...state,
        'hydra:member': state['hydra:member'].filter(
          item => item['@id'] !== action.retrieved['@id']
        )
      };

    default:
      return state;
  }
}

export function eventSource(state: EventSource | null = null, action: IActionMercureOpen | IActionReset) {
  switch (action.type) {
    case {{{uc}}}_LIST_MERCURE_OPEN:
      return action.eventSource;

    case {{{uc}}}_LIST_RESET:
      return null;

    default:
      return state;
  }
}

export default combineReducers({ error, loading, retrieved, eventSource });
