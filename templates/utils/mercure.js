import { ENTRYPOINT } from '../config/entrypoint';

export function mercureSubscribe(url, topics) {
  topics.forEach(topic =>
    url.searchParams.append('topic', new URL(topic, ENTRYPOINT))
  );

  return new EventSource(url.toString());
}

export function extractHubURL(response) {
  const linkHeader = response.headers.get('Link');
  if (!linkHeader) return null;

  const matches = linkHeader.match(
    /<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/
  );

  return matches && matches[1] ? new URL(matches[1], ENTRYPOINT) : null;
}
