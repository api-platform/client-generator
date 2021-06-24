import { IResource } from '../utils/types'

export interface I{{{ucf}}} extends IResource {
  id?: string;
{{#each fields}}
 {{#if readonly}}readonly{{/if}} {{{name}}}?: {{{type}}};
{{/each}}
}
