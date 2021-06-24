export interface IPagination {
  '{{{hydraPrefix}}}first'?: string;
  '{{{hydraPrefix}}}previous'?: string;
  '{{{hydraPrefix}}}next'?: string;
  '{{{hydraPrefix}}}last'?: string;
}

export interface IPagedCollection<T> {
  '@context'?: string;
  '@id'?: string;
  '@type'?: string;
  '{{{hydraPrefix}}}firstPage'?: string;
  '{{{hydraPrefix}}}itemsPerPage'?: number;
  '{{{hydraPrefix}}}lastPage'?: string;
  '{{{hydraPrefix}}}member'?: T[];
  '{{{hydraPrefix}}}nextPage'?: string;
  '{{{hydraPrefix}}}search'?: object;
  '{{{hydraPrefix}}}totalItems'?: number;
  '{{{hydraPrefix}}}view'?: IPagination;
}
