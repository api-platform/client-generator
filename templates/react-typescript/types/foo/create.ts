import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { TError } from '../../utils/types';

export const {{{uc}}}_CREATE_ERROR = '{{{uc}}}_CREATE_ERROR';
export interface IActionError {
  type: typeof {{{uc}}}_CREATE_ERROR;
  error: TError;
}

export const {{{uc}}}_CREATE_LOADING = '{{{uc}}}_CREATE_LOADING';
export interface IActionLoading {
  type: typeof {{{uc}}}_CREATE_LOADING;
  loading: boolean;
}

export const {{{uc}}}_CREATE_SUCCESS = '{{{uc}}}_CREATE_SUCCESS';
export interface IActionSuccess {
  type: typeof {{{uc}}}_CREATE_SUCCESS;
  created: I{{{ucf}}} | null;
}

export interface ICreateState {
  error: TError;
  loading: boolean;
  created: I{{{ucf}}} | null;
}
