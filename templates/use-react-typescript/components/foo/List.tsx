import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { PagedCollection } from "../../interfaces/Collection";
import TResource from "./type";
import { TError } from "../../utils/types";
import Links from "../Links";
import Pagination from "../Pagination";
import { useRetrieve } from "../../stores";

interface ListProps {
  retrieved: PagedCollection<TResource> | null;
  loading: boolean;
  error: TError;
}

function ListView ({error, loading, retrieved}: ListProps) {
  const items = (retrieved && retrieved["hydra:member"]) || [];

  return (
    <div>
      <h1>{{{title}}} List</h1>

      {loading && (
        <div className="alert alert-info">Loading...</div>
      )}
      {error && (
        <div className="alert alert-danger">{error.message}</div>
      )}

      <p>
        <Link to="create" className="btn btn-primary">
          Create
        </Link>
      </p>

      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>id</th>
{{#each fields}}
            <th>{{name}}</th>
{{/each}}
            <th colSpan={2} />
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item["@id"]}>
              <th scope="row">
                <Link to={`show/${encodeURIComponent(item["@id"])}`}>
                  {item["@id"]}
                </Link>
              </th>
{{#each fields}}
              <td>{{#if reference}}<Links type="{{{reference.name}}}" items={item["{{{name}}}"]}/>{{else}}{item["{{{name}}}"]}{{/if}}</td>
{{/each}}
              <td>
                <Link to={`show/${encodeURIComponent(item["@id"])}`}>
                  <span className="fa fa-search" aria-hidden="true" />
                  <span className="sr-only">Show</span>
                </Link>
              </td>
              <td>
                <Link to={`edit/${encodeURIComponent(item["@id"])}`}>
                  <span className="fa fa-pencil" aria-hidden="true" />
                  <span className="sr-only">Edit</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination retrieved={retrieved}/>
    </div>
  );
}

export default function List (props: RouteComponentProps<any>) {
  const id = (props.match.params.page && decodeURIComponent(props.match.params.page)) || "{{{name}}}";

  const {retrieved, loading, error} = useRetrieve<PagedCollection<TResource>>(id);

  return <ListView
    retrieved={retrieved}
    loading={loading}
    error={error}
  />;
}
