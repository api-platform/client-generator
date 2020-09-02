export type TError = SubmissionError | Error | null;

export interface ApiResource {
  "@id": string;
}

export interface SubmissionErrors {
  _error: string;

  [p: string]: string;
}

export class SubmissionError extends Error {
  private readonly _errors: SubmissionErrors

  constructor (errors: SubmissionErrors) {
    super(errors._error);
    this._errors = errors;
  }

  public get errors (): SubmissionErrors {
    return this._errors;
  }
}
