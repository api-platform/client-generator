import React from "react";

interface FieldProps {
  input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  meta: {
    touched?: boolean;
    error?: string;
  };
}

export default function Field (data: FieldProps): React.ReactElement {
  data.input.className = "form-control";

  const isInvalid = data.meta.touched && !!data.meta.error;
  if (isInvalid) {
    data.input.className += " is-invalid";
    data.input["aria-invalid"] = true;
  }

  if (data.meta.error && data.meta.touched && !data.meta.error) {
    data.input.className += " is-valid";
  }

  return (
    <div className="form-group">
      <label className="form-control-label">
        {data.input.name}
      </label>
      <input {...data.input}/>
      {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
    </div>
  );
}
