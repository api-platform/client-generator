import { ApiResource, TError } from "../utils/types";
import { PagedCollection } from "../interfaces/Collection";
import useShow from "./show";

interface IListStore<Resource extends ApiResource> {
  error: TError;
  loading: boolean;
  retrieved: PagedCollection<Resource> | null;
  // eventSource: EventSource | null;
  reset: (/*eventSource: EventSource | null*/) => any;
  list: (page?: string) => Promise<void>;
}

export default function useList<Resource extends ApiResource> (params: { "@id": string; }): IListStore<Resource> {
  const {error, loading, retrieved, retrieve, reset} = useShow<PagedCollection<Resource>>();

  return {
    error,
    loading,
    retrieved,
    reset,
    list (page = params["@id"]) {
      return retrieve(page);
    },
  };
}
