import { ApiResource } from "../utils/types";

export interface Pagination {
  "hydra:first"?: string;
  "hydra:previous"?: string;
  "hydra:next"?: string;
  "hydra:last"?: string;
}

export interface PagedCollection<T> extends ApiResource {
  "@context"?: string;
  "@type"?: string;
  "hydra:firstPage"?: string;
  "hydra:itemsPerPage"?: number;
  "hydra:lastPage"?: string;
  "hydra:member"?: T[];
  "hydra:nextPage"?: string;
  "hydra:search"?: object;
  "hydra:totalItems"?: number;
  "hydra:view"?: Pagination;
}
