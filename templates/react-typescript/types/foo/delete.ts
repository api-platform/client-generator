import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { TError } from '../../utils/types';

export const {{{uc}}}_DELETE_ERROR = '{{{uc}}}_DELETE_ERROR';
export interface IActionError {
  type: typeof {{{uc}}}_DELETE_ERROR;
  error: TError;
}

export const {{{uc}}}_DELETE_LOADING = '{{{uc}}}_DELETE_LOADING';
export interface IActionLoading {
  type: typeof {{{uc}}}_DELETE_LOADING;
  loading: boolean;
}

export const {{{uc}}}_DELETE_SUCCESS = '{{{uc}}}_DELETE_SUCCESS';
export interface IActionSuccess {
  type: typeof {{{uc}}}_DELETE_SUCCESS;
  deleted: I{{{ucf}}} | null;
}

export interface IDeleteState {
  error: TError;
  loading: boolean;
  deleted: I{{{ucf}}} | null;
}
