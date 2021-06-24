import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { IPagedCollection } from '../../interfaces/Collection';
import { TError, IResource } from '../../utils/types';

export const {{{uc}}}_LIST_ERROR = '{{{uc}}}_LIST_ERROR';
export interface IActionError {
  type: typeof {{{uc}}}_LIST_ERROR;
  error: TError;
}

export const {{{uc}}}_LIST_LOADING = '{{{uc}}}_LIST_LOADING';
export interface IActionLoading {
  type: typeof {{{uc}}}_LIST_LOADING;
  loading: boolean;
}

export const {{{uc}}}_LIST_SUCCESS = '{{{uc}}}_LIST_SUCCESS';
export interface IActionSuccess {
  type: typeof {{{uc}}}_LIST_SUCCESS;
  retrieved: IPagedCollection<I{{{ucf}}}>;
}

export const {{{uc}}}_LIST_RESET = '{{{uc}}}_LIST_RESET';
export interface IActionReset {
  type: typeof {{{uc}}}_LIST_RESET;
}

export const {{{uc}}}_LIST_MERCURE_OPEN = '{{{uc}}}_LIST_MERCURE_OPEN';
export interface IActionMercureOpen {
  type: typeof {{{uc}}}_LIST_MERCURE_OPEN;
  eventSource: EventSource;
}

export const {{{uc}}}_LIST_MERCURE_DELETED = '{{{uc}}}_LIST_MERCURE_DELETED';
export interface IActionMercureDeleted {
  type: typeof {{{uc}}}_LIST_MERCURE_DELETED;
retrieved: IResource;
}

export const {{{uc}}}_LIST_MERCURE_MESSAGE = '{{{uc}}}_LIST_MERCURE_MESSAGE';
export interface IActionMercureMessage {
  type: typeof {{{uc}}}_LIST_MERCURE_MESSAGE;
  retrieved: I{{{ucf}}};
}

export interface IListState {
  error: TError;
  loading: boolean;
  retrieved: IPagedCollection<I{{{ucf}}}> | null;
  eventSource: EventSource | null;
}
