import { ApiResource } from "../utils/types";

export interface {{{ucf}}} extends ApiResource {
  id?: string;
{{#each fields}}
 {{#if readonly}}readonly{{/if}} {{{name}}}?: {{{type}}};
{{/each}}
}
