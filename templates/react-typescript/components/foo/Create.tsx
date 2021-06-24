import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { TError, TDispatch } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { create, reset } from '../../actions/{{{lc}}}/create';
import { ICreateState } from '../../types/{{{lc}}}/create';
import Form from './Form';

interface ICreateProps {
  created: I{{{ucf}}} | null;
  loading: boolean;
  error: TError;
}

interface ICreateActions {
  reset: () => any;
  create: ({{{lc}}}: Partial<I{{{ucf}}}>) => any;
}

const mapStateToProps: (state: { {{{lc}}}: { create: ICreateState } }) => ICreateProps = state => {
  const { created, error, loading } = state.{{{lc}}}.create;
  return { created, error, loading };
};

const mapDispatchToProps: (dispatch: TDispatch) => ICreateActions = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset())
});

class Create extends Component<ICreateProps & ICreateActions> {
  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    if (this.props.created)
      return (
        <Redirect
          to={`edit/${encodeURIComponent(this.props.created['@id'])}`}
        />
      );

    return (
      <div>
        <h1>New {{{title}}}</h1>

        {this.props.loading && (
          <div className="alert alert-info" role="status">
            Loading...
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.error}
          </div>
        )}

        <Form onSubmit={this.props.create} />
        <Link to="." className="btn btn-primary">
          Back to list
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
