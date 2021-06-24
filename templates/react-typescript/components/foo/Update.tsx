import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { TError, TDispatch } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import Form from './Form';
import { retrieve, update, reset } from '../../actions/{{{lc}}}/update';
import { del } from '../../actions/{{{lc}}}/delete';
import { IUpdateState } from '../../types/{{{lc}}}/update';
import { IDeleteState } from '../../types/{{{lc}}}/delete';
import { ICreateState } from '../../types/{{{lc}}}/create';

interface IUpdateProps {
  retrieved: I{{{ucf}}} | null;
  retrieveLoading: boolean;
  retrieveError: TError;
  updateLoading: boolean;
  updateError: TError;
  deleteLoading: boolean;
  deleteError: TError;
  created: I{{{ucf}}} | null;
  updated: I{{{ucf}}} | null;
  deleted: I{{{ucf}}} | null;
  eventSource: EventSource | null;
}

interface IUpdateActions {
  retrieve: (id: string) => any;
  reset: (eventSource: EventSource | null) => any;
  del: ({{{lc}}}: I{{{ucf}}} | null) => any;
  update: ({{{lc}}}: I{{{ucf}}} | null, values: Partial<I{{{ucf}}}>) => any;
}

type TStore = {
  {{{lc}}}: {
    update: IUpdateState,
    del: IDeleteState,
    create: ICreateState,
  }
}

const mapStateToProps: (state: TStore) => IUpdateProps = state => ({
  retrieved: state.{{{lc}}}.update.retrieved,
  retrieveError: state.{{{lc}}}.update.retrieveError,
  retrieveLoading: state.{{{lc}}}.update.retrieveLoading,
  updateError: state.{{{lc}}}.update.updateError,
  updateLoading: state.{{{lc}}}.update.updateLoading,
  deleteError: state.{{{lc}}}.del.error,
  deleteLoading: state.{{{lc}}}.del.loading,
  eventSource: state.{{{lc}}}.update.eventSource,
  created: state.{{{lc}}}.create.created,
  deleted: state.{{{lc}}}.del.deleted,
  updated: state.{{{lc}}}.update.updated
});

const mapDispatchToProps: (dispatch: TDispatch) => IUpdateActions = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  update: (item, values) => item && dispatch(update(item, values)),
  del: item => item && dispatch(del(item)),
  reset: eventSource => dispatch(reset(eventSource))
});

type TUpdateProps = RouteComponentProps<any> & IUpdateProps & IUpdateActions;

class Update extends Component<TUpdateProps> {
  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  del = () => {
    if (window.confirm('Are you sure you want to delete this item?'))
      this.props.del(this.props.retrieved);
  };

  render() {
    if (this.props.deleted) return <Redirect to=".." />;

    const item = this.props.updated ? this.props.updated : this.props.retrieved;

    return (
      <div>
        <h1>Edit {item && item['@id']}</h1>

        {this.props.created && (
          <div className="alert alert-success" role="status">
            {this.props.created['@id']} created.
          </div>
        )}
        {this.props.updated && (
          <div className="alert alert-success" role="status">
            {this.props.updated['@id']} updated.
          </div>
        )}
        {(this.props.retrieveLoading ||
          this.props.updateLoading ||
          this.props.deleteLoading) && (
          <div className="alert alert-info" role="status">
            Loading...
          </div>
        )}
        {this.props.retrieveError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.retrieveError}
          </div>
        )}
        {this.props.updateError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.updateError}
          </div>
        )}
        {this.props.deleteError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.deleteError}
          </div>
        )}

        {item && (
          <Form
            onSubmit={values => this.props.update(item, values)}
            initialValues={item}
          />
        )}
        <Link to=".." className="btn btn-primary">
          Back to list
        </Link>
        <button onClick={this.del} className="btn btn-danger">
          Delete
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Update);
