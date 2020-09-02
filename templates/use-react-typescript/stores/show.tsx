import React from "react";
import { ApiResource, TError } from "../utils/types";
import { normalize } from "../utils/dataAccess";
import useFetch from "./fetch";
import useMercure from "./mercure";

interface IShowStore<Resource extends ApiResource> {
  error: TError;
  loading: boolean;
  retrieved: Resource | null;
  retrieve: (id: string) => any;
  reset: (/*eventSource: EventSource | null*/) => any;
}

export default function useShow<Resource extends ApiResource> (): IShowStore<Resource> {
  const {fetch} = useFetch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<TError>(null);
  const [retrieved, setRetrieved] = React.useState<Resource | null>(null);
  const {deleted, message, onResponse} = useMercure<Resource>(retrieved);

  const subscribeMercure = ({response, json}: {response: Response; json: any;}) => {
    onResponse(response);

    return json;
  };

  React.useEffect(() => {
    if (deleted) {
      setError(new Error(`${deleted["@id"]} has been deleted by another user.`));
    }
  }, [deleted]);

  React.useEffect(() => {
    if (message) {
      setRetrieved(message);
    }
  }, [message]);

  return {
    error,
    loading,
    retrieved,
    reset () {
      setError(null);
      setLoading(false);
      setRetrieved(null);
    },
    retrieve (id) {
      setLoading(true);
      setError(null);

      return fetch(id)
        .then(subscribeMercure)
        .then((retrieved) => setRetrieved(normalize(retrieved)))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    },
  };
}
