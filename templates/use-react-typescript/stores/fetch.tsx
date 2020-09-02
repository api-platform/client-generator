import React from "react";
import { ENTRYPOINT } from "../config/entrypoint";
import { SubmissionErrors, SubmissionError } from "../utils/types";

interface FetchResponse {
  readonly response: Response;
  readonly json: any;
}

interface ILastRequest extends FetchResponse {
  input: Request | string;
  init: RequestInit;
}

export interface IFetchStore {
  last: ILastRequest | null;
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<FetchResponse>;
  setAuth: (auth: string) => void;
}

export default function useFetch (): IFetchStore {
  const [last, setLast] = React.useState<ILastRequest | null>(null);
  const [auth, setAuth] = React.useState("");

  return {
    last,
    setAuth,

    fetch (input, init = {}) {
      input = normalizeInput(input);
      init = [
        normalizeHeaders,
        normalizeContentType,
        normalizeAuth(auth),
      ].reduce((init, normalize) => normalize(init), init);

      return fetch(input, init)
        .then(
          response => response
            .json()
            .then<{ response: Response; json: object; }>(json => ({response, json}))
            .catch(() => {
              throw new Error(response.statusText || "An error occurred.");
            })
          ,
        )
        .then(data => {
          setLast({...data, input, init});

          return data;
        })
        .then((data) => {
          if (!data.response.ok) {
            submissionHandler(data.response, data.json);
            regularHandler(data.response, data.json);
          }

          return data;
        })
        .catch(error => {
          throw new Error(error || "An error occurred.");
        });
    },
  };
}

// Work with input
function normalizeUrl (url: string) {
  return String(new URL(url, ENTRYPOINT));
}

function normalizeInput (input: RequestInfo): RequestInfo {
  if (typeof input === "string") {
    return normalizeUrl(input);
  }

  return {...input, url: normalizeUrl(input.url)};
}

// Work with init
const MIME_TYPE = "application/ld+json";

function normalizeHeaders (options: RequestInit): RequestInit {
  if (!(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers);
  }

  return options;
}

function normalizeContentType (options: RequestInit): RequestInit {
  if (
    "undefined" !== options.body
    && !(options.body instanceof FormData)
    && (options.headers instanceof Headers)
    && null === options.headers.get("Content-Type")
  ) {
    options.headers.set("Content-Type", MIME_TYPE);
  }

  return options;
}

function normalizeAuth (auth: string) {
  return function (options: RequestInit): RequestInit {
    if (
      auth
      && (options.headers instanceof Headers)
      && null === options.headers.get("Authorization")
    ) {
      options.headers.set("Authorization", auth);
    }

    return options;
  };
}

// Error handling
function regularHandler (response: Response, json: any) {
  const error =
    json["hydra:description"] ||
    json["hydra:title"] ||
    json["message"] ||
    "An error occurred.";

  throw new Error(error);
}

function submissionHandler (response: Response, json: any) {
  if (!json.violations) {
    return;
  }

  const error =
    json["hydra:description"] ||
    json["hydra:title"] ||
    json["message"] ||
    "An error occurred.";

  const violations: { propertyPath: string; message: string; }[] = json.violations;

  const errors = violations
    .reduce((errors, violation) => {
      if (errors[violation.propertyPath]) {
        errors[violation.propertyPath] += "\n" + violation.message;
      } else {
        errors[violation.propertyPath] = violation.message;
      }

      return errors;
    }, {_error: error} as SubmissionErrors);

  throw new SubmissionError(errors);
}
