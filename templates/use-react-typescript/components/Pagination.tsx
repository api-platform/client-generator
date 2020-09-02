import React from "react";
import { Link } from "react-router-dom";
import { PagedCollection } from "../interfaces/Collection";

interface PaginationProps {
  retrieved: PagedCollection<any> | null;
}

export default function Pagination ({retrieved}: PaginationProps) {
  const view = retrieved && retrieved["hydra:view"];
  if (!view) {
    return null;
  }

  const {
    "hydra:first": first,
    "hydra:previous": previous,
    "hydra:next": next,
    "hydra:last": last,
  } = view;

  return <nav aria-label="Page navigation">
    <Link
      to="."
      className={`btn btn-primary${previous ? "" : " disabled"}`}
    >
      <span aria-hidden="true">&lArr;</span> First
    </Link>
    <Link
      to={
        !previous || previous === first ? "." : encodeURIComponent(previous)
      }
      className={`btn btn-primary${previous ? "" : " disabled"}`}
    >
      <span aria-hidden="true">&larr;</span> Previous
    </Link>
    <Link
      to={next ? encodeURIComponent(next) : "#"}
      className={`btn btn-primary${next ? "" : " disabled"}`}
    >
      Next <span aria-hidden="true">&rarr;</span>
    </Link>
    <Link
      to={last ? encodeURIComponent(last) : "#"}
      className={`btn btn-primary${next ? "" : " disabled"}`}
    >
      Last <span aria-hidden="true">&rArr;</span>
    </Link>
  </nav>;
}
