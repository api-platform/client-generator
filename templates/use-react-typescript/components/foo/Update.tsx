import React from "react";
import { RouteComponentProps } from "react-router";
import { Link, Redirect } from "react-router-dom";
import TResource from "./type";
import { TError } from "../../utils/types";
import Form from "./Form";
import { useDelete, useRetrieve, useUpdate } from "../../stores";

interface UpdateProps {
  retrieved: TResource | null;
  retrieveLoading: boolean;
  retrieveError: TError;
  updateLoading: boolean;
  updateError: TError;
  deleteLoading: boolean;
  deleteError: TError;
  created: TResource | null;
  updated: TResource | null;
  deleted: TResource | null;
  del: (item: TResource) => any;
  update: (item: TResource, values: Partial<TResource>) => any;
}

function UpdateView ({created, del, deleteError, deleteLoading, deleted, retrieveError, retrieveLoading, retrieved, update, updateError, updateLoading, updated}: UpdateProps) {
  if (deleted) {
    return <Redirect to=".."/>;
  }

  const item = updated ? updated : retrieved;
  const delWithConfirm = () => {
    if (retrieved && window.confirm("Are you sure you want to delete this item?")) {
      del(retrieved);
    }
  };

  return (
    <div>
      <h1>Edit {item && item["@id"]}</h1>

      {created && (
        <div className="alert alert-success" role="status">
          {created["@id"]} created.
        </div>
      )}
      {updated && (
        <div className="alert alert-success" role="status">
          {updated["@id"]} updated.
        </div>
      )}
      {(retrieveLoading ||
        updateLoading ||
        deleteLoading) && (
        <div className="alert alert-info" role="status">
           Loading...
        </div>
      )}
      {retrieveError && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {retrieveError.message}
        </div>
      )}
      {updateError && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {updateError.message}
        </div>
      )}
      {deleteError && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {deleteError.message}
        </div>
      )}

      {item && (
        <Form
          onSubmit={values => update(item, values)}
          error={updateError}
          initialValues={item}
        />
      )}
      <Link to=".." className="btn btn-primary">
        Back to list
      </Link>
      <button onClick={delWithConfirm} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
}

export default function Update (props: RouteComponentProps<any>) {
  const id = decodeURIComponent(props.match.params.id);
  const {retrieved, loading: retrieveLoading, error: retrieveError} = useRetrieve<TResource>(id);
  const {updated, update, loading: updateLoading, error: updateError} = useUpdate<TResource>();
  const {deleted, loading: deleteLoading, error: deleteError, del} = useDelete<TResource>();

  return <UpdateView
    retrieved={retrieved}
    retrieveLoading={retrieveLoading}
    retrieveError={retrieveError}
    updateLoading={updateLoading}
    updateError={updateError}
    deleteLoading={deleteLoading}
    deleteError={deleteError}
    created={null}
    updated={updated}
    deleted={deleted}
    del={del}
    update={update}
  />;
}
