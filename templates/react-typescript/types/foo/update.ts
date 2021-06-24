import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { TError, IResource } from '../../utils/types';

export const {{{uc}}}_UPDATE_RETRIEVE_ERROR = '{{{uc}}}_UPDATE_RETRIEVE_ERROR';
export interface IActionRetrieveError {
  type: typeof {{{uc}}}_UPDATE_RETRIEVE_ERROR;
  retrieveError: TError;
}

export const {{{uc}}}_UPDATE_RETRIEVE_LOADING = '{{{uc}}}_UPDATE_RETRIEVE_LOADING';
export interface IActionRetrieveLoading {
  type: typeof {{{uc}}}_UPDATE_RETRIEVE_LOADING;
  retrieveLoading: boolean;
}

export const {{{uc}}}_UPDATE_RETRIEVE_SUCCESS = '{{{uc}}}_UPDATE_RETRIEVE_SUCCESS';
export interface IActionRetrieveSuccess {
  type: typeof {{{uc}}}_UPDATE_RETRIEVE_SUCCESS;
  retrieved: I{{{ucf}}};
}

export const {{{uc}}}_UPDATE_UPDATE_ERROR = '{{{uc}}}_UPDATE_UPDATE_ERROR';
export interface IActionUpdateError {
  type: typeof {{{uc}}}_UPDATE_UPDATE_ERROR;
  updateError: TError;
}

export const {{{uc}}}_UPDATE_UPDATE_LOADING = '{{{uc}}}_UPDATE_UPDATE_LOADING';
export interface IActionUpdateLoading {
  type: typeof {{{uc}}}_UPDATE_UPDATE_LOADING;
  updateLoading: boolean;
}

export const {{{uc}}}_UPDATE_UPDATE_SUCCESS = '{{{uc}}}_UPDATE_UPDATE_SUCCESS';
export interface IActionUpdateSuccess {
  type: typeof {{{uc}}}_UPDATE_UPDATE_SUCCESS;
  updated: I{{{ucf}}};
}

export const {{{uc}}}_UPDATE_RESET = '{{{uc}}}_UPDATE_RESET';
export interface IActionReset {
  type: typeof {{{uc}}}_UPDATE_RESET;
}

export const {{{uc}}}_UPDATE_MERCURE_OPEN = '{{{uc}}}_UPDATE_MERCURE_OPEN';
export interface IActionMercureOpen {
  type: typeof {{{uc}}}_UPDATE_MERCURE_OPEN;
  eventSource: EventSource;
}

export const {{{uc}}}_UPDATE_MERCURE_DELETED = '{{{uc}}}_UPDATE_MERCURE_DELETED';
export interface IActionMercureDeleted {
  type: typeof {{{uc}}}_UPDATE_MERCURE_DELETED;
  retrieved: IResource;
}

export const {{{uc}}}_UPDATE_MERCURE_MESSAGE = '{{{uc}}}_UPDATE_MERCURE_MESSAGE';
export interface IActionMercureMessage {
  type: typeof {{{uc}}}_UPDATE_MERCURE_MESSAGE;
  retrieved: I{{{ucf}}};
}

export interface IUpdateState {
  retrieveError: TError;
  retrieveLoading: boolean;
  retrieved: I{{{ucf}}} | null;
  updateError: TError;
  updateLoading: boolean;
  updated: I{{{ucf}}} | null;
  eventSource: EventSource | null;
}
