import { ENTRYPOINT } from '../config/entrypoint';
import { SubmissionError } from 'redux-form';

const MIME_TYPE = 'application/ld+json';

export function fetchApi (id: string, options: RequestInit = {}) {
  if (!(options.headers instanceof Headers)) options.headers = new Headers(options.headers);
  if (null === options.headers.get('Accept'))
    options.headers.set('Accept', MIME_TYPE);

  if (
    'undefined' !== options.body &&
    !(options.body instanceof FormData) &&
    null === options.headers.get('Content-Type')
  )
    options.headers.set('Content-Type', MIME_TYPE);

  return fetch(String(new URL(id, ENTRYPOINT)), options).then(response => {
    if (response.ok) return response;

    return response.json().then(
      json => {
        const error =
          json['hydra:description'] ||
          json['hydra:title'] ||
          'An error occurred.';
        if (!json.violations) throw Error(error);

        const violations: { propertyPath: string; message: string; }[] = json.violations
        const errors = violations
          .reduce((errors, violation) => {
            if (errors[violation.propertyPath]) {
              errors[violation.propertyPath] += '\n' + violation.message
            } else {
              errors[violation.propertyPath] = violation.message
            }

            return errors
          }, {_error: error} as {_error: string; [key: string]: string; });

        throw new SubmissionError(errors);
      },
      () => {
        throw new Error(response.statusText || 'An error occurred.');
      }
    );
  });
}

export function mercureSubscribe(url: URL, topics: string[]) {
  topics.forEach(topic =>
    url.searchParams.append('topic', String(new URL(topic, ENTRYPOINT)))
  );

  return new EventSource(url.toString());
}

export function normalize<A extends {[key: string]: any; 'hydra:member'?: A[]}>(data: A) {
  if (data.hasOwnProperty('hydra:member') && data['hydra:member']) {
    // Normalize items in collections
    data['hydra:member'] = data['hydra:member'].map(item => normalize(item));

    return data;
  }

  // Flatten nested documents
  return Object
    .entries(data)
    .reduce(
      (a, [key, value]) => {
        a[key] = Array.isArray(value)
          ? value.map(v => v && v.hasOwnProperty('@id') ? v['@id'] : v)
          : value && value.hasOwnProperty('@id') ? value['@id'] : value

        return a
      },
      {} as any,
    );
}

export function extractHubURL(response: Response) {
  const linkHeader = response.headers.get('Link');
  if (!linkHeader) return null;

  const matches = linkHeader.match(
    /<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/
  );

  return matches && matches[1] ? new URL(matches[1], ENTRYPOINT) : null;
}
