import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { TError, IResource } from '../../utils/types';

export const {{{uc}}}_SHOW_ERROR = '{{{uc}}}_SHOW_ERROR';
export interface IActionError {
  type: typeof {{{uc}}}_SHOW_ERROR;
  error: TError;
}

export const {{{uc}}}_SHOW_LOADING = '{{{uc}}}_SHOW_LOADING';
export interface IActionLoading {
  type: typeof {{{uc}}}_SHOW_LOADING;
  loading: boolean;
}

export const {{{uc}}}_SHOW_SUCCESS = '{{{uc}}}_SHOW_SUCCESS';
export interface IActionSuccess {
  type: typeof {{{uc}}}_SHOW_SUCCESS;
  retrieved: I{{{ucf}}};
}

export const {{{uc}}}_SHOW_RESET = '{{{uc}}}_SHOW_RESET';
export interface IActionReset {
  type: typeof {{{uc}}}_SHOW_RESET;
}

export const {{{uc}}}_SHOW_MERCURE_OPEN = '{{{uc}}}_SHOW_MERCURE_OPEN';
export interface IActionMercureOpen {
  type: typeof {{{uc}}}_SHOW_MERCURE_OPEN;
  eventSource: EventSource;
}

export const {{{uc}}}_SHOW_MERCURE_DELETED = '{{{uc}}}_SHOW_MERCURE_DELETED';
export interface IActionMercureDeleted {
  type: typeof {{{uc}}}_SHOW_MERCURE_DELETED;
  retrieved: IResource;
}

export const {{{uc}}}_SHOW_MERCURE_MESSAGE = '{{{uc}}}_SHOW_MERCURE_MESSAGE';
export interface IActionMercureMessage {
  type: typeof {{{uc}}}_SHOW_MERCURE_MESSAGE;
  retrieved: I{{{ucf}}};
}

export interface IShowState {
  error: TError;
  loading: boolean;
  retrieved: I{{{ucf}}} | null;
  eventSource: EventSource | null;
}
