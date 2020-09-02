import React from "react";
import { useShow } from "./index";
import { ApiResource } from "../utils/types";

export default function useRetrieve<Resource extends ApiResource> (id: string) {
  const show = useShow<Resource>();
  const {reset, retrieve} = show;

  React.useEffect(() => {
    retrieve(id);

    return () => reset();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return show;
}
