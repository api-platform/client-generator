import React from "react";
import { ApiResource, SubmissionError, TError } from "../utils/types";
import { normalize } from "../utils/dataAccess";
import useFetch from "./fetch";
import useMercure from "./mercure";

interface IUpdateStore<Resource extends ApiResource> {
  error: TError;
  loading: boolean;
  updated: Resource | null;
  reset: () => any;
  update: (item: Resource, values: Partial<Resource>) => Promise<void>;
}

export default function useUpdate<Resource extends ApiResource> (): IUpdateStore<Resource> {
  const {fetch} = useFetch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<TError>(null);
  const [updated, setUpdated] = React.useState<Resource | null>(null);
  const {deleted, message, onResponse} = useMercure<Resource>(updated);

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
      setUpdated(message);
    }
  }, [message]);

  return {
    loading,
    error,
    updated,
    reset () {
      setError(null);
      setLoading(false);
      setUpdated(null);
    },
    update (item: Resource, values: Partial<Resource>) {
      setError(null);
      setLoading(true);

      const options = {
        method: "PUT",
        headers: new Headers({"Content-Type": "application/ld+json"}),
        body: JSON.stringify(values),
      };

      return fetch(item["@id"], options)
        .then(subscribeMercure)
        .then((updated) => setUpdated(normalize(updated)))
        .catch(e => {
          if (e instanceof SubmissionError) {
            setError(e);
          }

          setError(e.message);
        })
        .finally(() => setLoading(false));
    },
  };
}
