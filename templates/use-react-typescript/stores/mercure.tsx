import React from "react";
import { ENTRYPOINT } from "../config/entrypoint";
import { normalize } from "../utils/dataAccess";
import { ApiResource } from "../utils/types";
import { PagedCollection } from "../interfaces/Collection";

interface IMercureStore<Resource extends ApiResource> {
  deleted: Resource | null;
  message: Resource | null;
  onResponse: (response: Response) => void;
}

export default function useMercure<Resource extends ApiResource> (retrieved: Resource | null): IMercureStore<Resource> {
  const [eventSource, setEventSource] = React.useState<EventSource | null>(null);
  const [deleted, setDeleted] = React.useState<Resource | null>(null);
  const [message, setMessage] = React.useState<Resource | null>(null);
  const [hubURL, setHubURL] = React.useState<URL | null>(null);

  const onMessage = React.useCallback(
    (retrieved: Resource) => {
      if (1 === Object.keys(retrieved).length) {
        setDeleted(retrieved);
        return;
      }

      setMessage(retrieved);
    },
    [],
  );

  React.useEffect(() => {
    if (eventSource) {
      // Listen events
      eventSource.addEventListener(
        "message",
        event => onMessage(normalize(JSON.parse(event.data))),
      );
    }

    return () => {
      // Cleanup event source on unmount
      if (eventSource) {
        eventSource.close();
      }
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventSource]);

  React.useEffect(
    () => {
      const collection = retrieved as PagedCollection<Resource>;

      if (hubURL && retrieved) {
        if (collection["hydra:member"]) {
          setEventSource(subscribe(hubURL, collection["hydra:member"].map(item => item["@id"])));
        } else {
          setEventSource(subscribe(hubURL, retrieved["@id"]));
        }
      } else {
        setEventSource(null);
      }
    },
    [retrieved, hubURL],
  );

  return {
    deleted,
    message,
    onResponse (response: Response) {
      setHubURL(extractHubURL(response));
    },
  };
}

function subscribe (url: URL, topics: string[] | string): EventSource {
  (Array.isArray(topics) ? topics : [topics]).forEach(
    topic => url.searchParams.append("topic", String(new URL(topic, ENTRYPOINT))),
  );

  return new EventSource(url.toString());
}

export function extractHubURL (response: Response): URL | null {
  const linkHeader = response.headers.get("Link");
  if (!linkHeader) {
    return null;
  }

  const matches = linkHeader.match(
    /<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/,
  );

  return matches && matches[1] ? new URL(matches[1], ENTRYPOINT) : null;
}
