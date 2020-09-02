import React from "react";
import { Link, Redirect } from "react-router-dom";
import { TError } from "../../utils/types";
import TResource from "./type";
import { useCreate } from "../../stores";
import Form from "./Form";

interface CreateProps {
  created: TResource | null;
  loading: boolean;
  error: TError;
  create: (item: Partial<TResource>) => any;
}

function CreateView ({create, created, error, loading}: CreateProps) {
  if (created) {
    return (
      <Redirect
        to={`edit/${encodeURIComponent(created["@id"])}`}
      />
    );
  }

  return (
    <div>
      <h1>New {{{title}}}</h1>

      {loading && (
        <div className="alert alert-info" role="status">
            Loading...
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true"/>{" "}
          {error.message}
        </div>
      )}

      <Form onSubmit={create} error={error}/>
      <Link to="." className="btn btn-primary">
          Back to list
      </Link>
    </div>
  );
}

export default function Create () {
  const {created, loading, error, create} = useCreate<TResource>({"@id": "{{{name}}}"});

  return <CreateView
    created={created}
    loading={loading}
    error={error}
    create={create}
  />;
}
