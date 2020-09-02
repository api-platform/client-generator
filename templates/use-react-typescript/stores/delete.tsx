import React from "react";
import { ApiResource, TError } from "../utils/types";
import useFetch from "./fetch";

interface IDeleteStore<Resource extends ApiResource> {
  error: TError;
  loading: boolean;
  deleted: Resource | null;
  setDeleted: (item: Resource | null) => void;
  del: (item: Resource) => Promise<void>;
}

export default function useDelete<Resource extends ApiResource> (): IDeleteStore<Resource> {
  const {fetch} = useFetch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<TError>(null);
  const [deleted, setDeleted] = React.useState<Resource | null>(null);

  return {
    loading,
    error,
    deleted,
    setDeleted,
    del (item: Resource) {
      setLoading(true);

      return fetch(item["@id"], {method: "DELETE"})
        .then(({json}) => json)
        .then(() => setDeleted(item))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    },
  };
}
