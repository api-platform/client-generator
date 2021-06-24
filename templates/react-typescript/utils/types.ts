import { AnyAction } from 'redux';
import { ThunkDispatch as Dispatch } from 'redux-thunk';

export type TError = Error | string | null;

export type TDispatch = Dispatch<{}, {}, AnyAction>;

export interface IResource {
  '@id': string;
}
