import React, { Component } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

class Form extends Component<InjectedFormProps> {
  renderField: React.FC<any> = data => {
    data.input.className = 'form-control';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      <div className={`form-group`}>
        <label
          htmlFor={`{{{lc}}}_${data.input.name}`}
          className="form-control-label"
        >
          {data.input.name}
        </label>
        <input
          {...data.input}
          type={data.type}
          step={data.step}
          required={data.required}
          placeholder={data.placeholder}
          id={`{{{lc}}}_${data.input.name}`}
        />
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
{{#each formFields}}
        <Field
          component={this.renderField}
          name="{{{name}}}"
          type="{{{type}}}"{{#if step}}
          step="{{{step}}}"{{/if}}
          placeholder="{{{description}}}"{{#if required}}
          required={true}{{/if}}{{#if reference}}{{#unless maxCardinality}}
          normalize={(v: string) => (v === '' ? [] : v.split(','))}{{/unless}}{{/if}}{{#if number}}
          normalize={(v: string) => parseFloat(v)}{{/if}}
        />
{{/each}}

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: '{{{lc}}}',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
