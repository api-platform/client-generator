import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { TError, TDispatch } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { retrieve, reset } from '../../actions/{{{lc}}}/show';
import { del } from '../../actions/{{{lc}}}/delete';
import { IDeleteState } from '../../types/{{{lc}}}/delete';
import { IShowState } from '../../types/{{{lc}}}/show';

interface IShowProps {
  retrieved: I{{{ucf}}} | null;
  loading: boolean;
  error: TError;
  eventSource: EventSource | null;
  deleteError: TError;
  deleteLoading: boolean;
  deleted: I{{{ucf}}} | null;
}

interface IShowActions {
  retrieve: (id: string) => any;
  reset: (eventSource: EventSource | null) => any;
  del: ({{{lc}}}: I{{{ucf}}} | null) => any;
}

type TStore = {
  {{{lc}}}: {
    show: IShowState,
    del: IDeleteState,
  }
}

const mapStateToProps: (state: TStore) => IShowProps = state => ({
  retrieved: state.{{{lc}}}.show.retrieved,
  error: state.{{{lc}}}.show.error,
  loading: state.{{{lc}}}.show.loading,
  eventSource: state.{{{lc}}}.show.eventSource,
  deleteError: state.{{{lc}}}.del.error,
  deleteLoading: state.{{{lc}}}.del.loading,
  deleted: state.{{{lc}}}.del.deleted
});

const mapDispatchToProps: (dispatch: TDispatch) => IShowActions = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  del: item => item && dispatch(del(item)),
  reset: eventSource => dispatch(reset(eventSource))
});

type TShowProps = RouteComponentProps<any> & IShowProps & IShowActions;

class Show extends Component<TShowProps> {
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

    const item = this.props.retrieved;

    return (
      <div>
        <h1>Show {item && item['@id']}</h1>

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
        {this.props.deleteError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.deleteError}
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
                <td>{{#if reference}}{this.renderLinks('{{{reference.name}}}', item['{{{name}}}'])}{{else}}{item['{{{name}}}']}{{/if}}</td>
              </tr>
{{/each}}
            </tbody>
          </table>
        )}
        <Link to=".." className="btn btn-primary">
          Back to list
        </Link>
        {item && (
          <Link to={`/{{{name}}}/edit/${encodeURIComponent(item['@id'])}`}>
            <button className="btn btn-warning">Edit</button>
          </Link>
        )}
        <button onClick={this.del} className="btn btn-danger">
          Delete
        </button>
      </div>
    );
  }

  renderLinks = (type: string, items?: string | string[]) => {
    if (!items) return null;
    if (Array.isArray(items)) {
      return items.map((item, i) => (
        <div key={i}>{this.renderLinks(type, item)}</div>
      ));
    }

    return (
      <Link to={`../../${type}/show/${encodeURIComponent(items)}`}>
        {items}
      </Link>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
