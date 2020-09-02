import React from "react";
import { Link } from "react-router-dom";

interface LinksProps {
  type: string;
  items?: string | string[];
}

export default function Links (props: LinksProps) {
  let { type, items } = props;
  if (!items) {
    return null;
  }

  if (!Array.isArray(items)) {
    return (
      <Link to={`../${type}/show/${encodeURIComponent(items)}`}>{items}</Link>
    );
  }

  return (
    <React.Fragment>
      {items.map((item, i) => (
        <div key={i}>
          <Links type={type} items={item} />
        </div>
      ))}
    </React.Fragment>
  );
}
