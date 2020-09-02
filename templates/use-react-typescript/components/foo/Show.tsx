import React from "react";
import { RouteComponentProps } from "react-router";
import { Link, Redirect } from "react-router-dom";
import TResource from "./type";
import { TError } from "../../utils/types";
import Links from "../Links";
import { useRetrieve, useDelete } from "../../stores";

interface ShowProps {
  retrieved: TResource | null;
  loading: boolean;
  error: TError;
  deleteError: TError;
  deleted: TResource | null;
  del: (item: TResource) => any;
}

function ShowView ({del, deleteError, deleted, error, loading, retrieved: item}: ShowProps) {
  if (deleted) {
    return <Redirect to=".."/>;
  }

  const delWithConfirm = () => {
    if (item && window.confirm("Are you sure you want to delete this item?")) {
      del(item);
    }
  };

  return (
    <div>
      <h1>Show {item && item["@id"]}</h1>

      {loading && (
        <div className="alert alert-info" role="status">
          Loading...
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {error.message}
        </div>
      )}
      {deleteError && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {deleteError.message}
        </div>
      )}

      {item && (
        <table className="table table-responsive table-striped table-hover">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
{{#each fields}}
            <tr>
              <th scope="row">{{name}}</th>
              <td>{{#if reference}}<Links type="{{{reference.name}}}" items={item["{{{name}}}"]}/>{{else}}{item["{{{name}}}"]}{{/if}}</td>
            </tr>
{{/each}}
          </tbody>
        </table>
      )}
      <Link to=".." className="btn btn-primary">
        Back to list
      </Link>
      {item && (
        <Link to={`/{{{name}}}/edit/${encodeURIComponent(item["@id"])}`}>
          <button className="btn btn-warning">Edit</button>
        </Link>
      )}
      <button onClick={delWithConfirm} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
}

export default function Show (props: RouteComponentProps<any>) {
  const id = decodeURIComponent(props.match.params.id);
  const {retrieved, loading, error} = useRetrieve<TResource>(id);
  const {deleted, error: deleteError, del} = useDelete<TResource>();

  return <ShowView
    retrieved={retrieved}
    loading={loading}
    error={error}
    deleteError={deleteError}
    deleted={deleted}
    del={del}
  />;
}
