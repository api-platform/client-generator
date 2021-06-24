import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { TError, TDispatch } from '../../utils/types';
import { I{{{ucf}}} } from '../../interfaces/{{{ucf}}}';
import { IPagedCollection } from '../../interfaces/Collection';
import { list, reset } from '../../actions/{{{lc}}}/list';
import { IListState } from '../../types/{{{lc}}}/list';

interface IListProps {
  retrieved: IPagedCollection<I{{{ucf}}}> | null;
  loading: boolean;
  error: TError;
  eventSource: EventSource | null;
}

interface IListActions {
  list: (page?: string) => any;
  reset: (eventSource: EventSource | null) => any;
}

const mapStateToProps: (state: { {{{lc}}}: { list: IListState } }) => IListProps = state => {
  const {
    retrieved,
    loading,
    error,
    eventSource
  } = state.{{{lc}}}.list;
  return { retrieved, loading, error, eventSource };
};

const mapDispatchToProps: (dispatch: TDispatch) => IListActions = dispatch => ({
  list: page => dispatch(list(page)),
  reset: eventSource => dispatch(reset(eventSource))
});

type TListProps = RouteComponentProps<any> & IListProps & IListActions;

class List extends Component<TListProps> {
  componentDidMount() {
    this.props.list(
      this.props.match.params.page &&
        decodeURIComponent(this.props.match.params.page)
    );
  }

  componentWillReceiveProps(nextProps: TListProps) {
    if (this.props.match.params.page !== nextProps.match.params.page)
      nextProps.list(
        nextProps.match.params.page &&
          decodeURIComponent(nextProps.match.params.page)
      );
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  render() {
    return (
      <div>
        <h1>{{{title}}} List</h1>

        {this.props.loading && (
          <div className="alert alert-info">Loading...</div>
        )}
        {this.props.error && (
          <div className="alert alert-danger">{this.props.error}</div>
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
            {this.props.retrieved && this.props.retrieved['hydra:member'] &&
              this.props.retrieved['hydra:member'].map(item => (
                <tr key={item['@id']}>
                  <th scope="row">
                    <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                      {item['@id']}
                    </Link>
                  </th>
{{#each fields}}
                  <td>{{#if reference}}{this.renderLinks('{{{reference.name}}}', item['{{{name}}}'])}{{else}}{item['{{{name}}}']}{{/if}}</td>
{{/each}}
                  <td>
                    <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                      <span className="fa fa-search" aria-hidden="true" />
                      <span className="sr-only">Show</span>
                    </Link>
                  </td>
                  <td>
                    <Link to={`edit/${encodeURIComponent(item['@id'])}`}>
                      <span className="fa fa-pencil" aria-hidden="true" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {this.pagination()}
      </div>
    );
  }

  pagination() {
    const view = this.props.retrieved && this.props.retrieved['hydra:view'];
    if (!view) return;

    const {
      'hydra:first': first,
      'hydra:previous': previous,
      'hydra:next': next,
      'hydra:last': last
    } = view;

    return (
      <nav aria-label="Page navigation">
        <Link
          to="."
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&lArr;</span> First
        </Link>
        <Link
          to={
            !previous || previous === first ? '.' : encodeURIComponent(previous)
          }
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&larr;</span> Previous
        </Link>
        <Link
          to={next ? encodeURIComponent(next) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Next <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link
          to={last ? encodeURIComponent(last) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Last <span aria-hidden="true">&rArr;</span>
        </Link>
      </nav>
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
      <Link to={`../${type}/show/${encodeURIComponent(items)}`}>{items}</Link>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
