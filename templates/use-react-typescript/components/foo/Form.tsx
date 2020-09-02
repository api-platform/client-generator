import React from "react";
import { useFormState } from "react-use-form-state";
import TResource from "./type";
import Field from "../Field";
import { normalizeLinks } from "../../utils/dataAccess";
import { SubmissionError, TError } from "../../utils/types";

interface FormProps {
  onSubmit: (item: Partial<TResource>) => any;
  initialValues?: Partial<TResource>;
  error?: TError;
}

export default function Form ({onSubmit, error, initialValues}: FormProps) {
  const [formState, {text}] = useFormState<TResource>(initialValues);
  const errors = error instanceof SubmissionError ? error.errors : {} as {[key: string]: string;};

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent) => {
    event.preventDefault();

    const {values, validity, errors} = formState;
    if (!Object.keys(validity).length) {
      // Form is empty
      return;
    }

    if (Object.keys(errors).length) {
      // Invalid fields values
      return;
    }

    onSubmit(
      {
        ...values,
{{#each formFields ~}}
  {{#if reference ~}}
    {{#unless maxCardinality}}
        {{{name}}}: normalizeLinks(values["{{{name}}}"]),
    {{/unless}}
  {{/if ~}}
  {{#if number}}
        {{{name}}}: (v: string) => parseFloat(v)
  {{/if}}
{{/each}}
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
{{#each formFields}}
      <Field
        input={text("{{{name}}}")}
        meta=\{{
          error: formState.errors["{{{name}}}"] || errors["{{{name}}}"],
          touched: formState.touched["{{{name}}}"],
        }}
      />
{{/each}}

      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
}
