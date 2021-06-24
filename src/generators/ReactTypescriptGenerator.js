import chalk from "chalk";
import BaseGenerator from "./BaseGenerator";

export default class ReactTypescriptGenerator extends BaseGenerator {
  constructor(params) {
    super(params);

    this.registerTemplates("react-typescript/", [
      // actions
      "actions/foo/create.ts",
      "actions/foo/delete.ts",
      "actions/foo/list.ts",
      "actions/foo/update.ts",
      "actions/foo/show.ts",

      // utils
      "utils/dataAccess.ts",
      "utils/types.ts",

      // reducers
      "reducers/foo/create.ts",
      "reducers/foo/delete.ts",
      "reducers/foo/index.ts",
      "reducers/foo/list.ts",
      "reducers/foo/update.ts",
      "reducers/foo/show.ts",

      // types
      "types/foo/create.ts",
      "types/foo/delete.ts",
      "types/foo/list.ts",
      "types/foo/show.ts",
      "types/foo/update.ts",

      // interfaces
      "interfaces/Collection.ts",
      "interfaces/foo.ts",

      // components
      "components/foo/Create.tsx",
      "components/foo/Form.tsx",
      "components/foo/index.tsx",
      "components/foo/List.tsx",
      "components/foo/Update.tsx",
      "components/foo/Show.tsx",

      // routes
      "routes/foo.tsx"
    ]);
  }

  help(resource) {
    const titleLc = resource.title.toLowerCase();

    console.log(
      'Code for the "%s" resource type has been generated!',
      resource.title
    );
    console.log(
      "Paste the following definitions in your application configuration (`client/src/index.tsx` by default):"
    );
    console.log(
      chalk.green(`
// import reducers
import ${titleLc} from './reducers/${titleLc}/';

//import routes
import ${titleLc}Routes from './routes/${titleLc}';

// Add the reducer
combineReducers({ ${titleLc},/* ... */ }),

// Add routes to <Switch>
{ ${titleLc}Routes }
`)
    );
  }

  generate(api, resource, dir) {
    const lc = resource.title.toLowerCase();
    const titleUcFirst = this.ucFirst(resource.title);
    const { fields, imports } = this.parseFields(resource);

    const context = {
      name: resource.name,
      lc,
      uc: resource.title.toUpperCase(),
      ucf: titleUcFirst,
      titleUcFirst,
      fields,
      formFields: this.buildFields(fields),
      imports,
      hydraPrefix: this.hydraPrefix,
      title: resource.title
    };

    // Create directories
    // These directories may already exist
    [
      `${dir}/utils`,
      `${dir}/config`,
      `${dir}/interfaces`,
      `${dir}/routes`,
      `${dir}/actions/${lc}`,
      `${dir}/types/${lc}`,
      `${dir}/components/${lc}`,
      `${dir}/reducers/${lc}`
    ].forEach(dir => this.createDir(dir));

    [
      // actions
      "actions/%s/create.ts",
      "actions/%s/delete.ts",
      "actions/%s/list.ts",
      "actions/%s/update.ts",
      "actions/%s/show.ts",

      // components
      "components/%s/Create.tsx",
      "components/%s/Form.tsx",
      "components/%s/index.tsx",
      "components/%s/List.tsx",
      "components/%s/Update.tsx",
      "components/%s/Show.tsx",

      // reducers
      "reducers/%s/create.ts",
      "reducers/%s/delete.ts",
      "reducers/%s/index.ts",
      "reducers/%s/list.ts",
      "reducers/%s/update.ts",
      "reducers/%s/show.ts",

      // types
      "types/%s/create.ts",
      "types/%s/delete.ts",
      "types/%s/list.ts",
      "types/%s/show.ts",
      "types/%s/update.ts",

      // routes
      "routes/%s.tsx"
    ].forEach(pattern => this.createFileFromPattern(pattern, dir, lc, context));

    // interface pattern should be camel cased
    this.createFile(
      "interfaces/foo.ts",
      `${dir}/interfaces/${context.ucf}.ts`,
      context
    );

    // copy with regular name
    [
      // interfaces
      "interfaces/Collection.ts",

      // utils
      "utils/dataAccess.ts",
      "utils/types.ts"
    ].forEach(file => this.createFile(file, `${dir}/${file}`, context, false));

    // API config
    this.createEntrypoint(api.entrypoint, `${dir}/config/entrypoint.ts`);
  }

  getDescription(field) {
    return field.description ? field.description.replace(/"/g, "'") : "";
  }

  parseFields(resource) {
    const fields = [
      ...resource.writableFields,
      ...resource.readableFields
    ].reduce((list, field) => {
      if (list[field.name]) {
        return list;
      }

      return {
        ...list,
        [field.name]: {
          notrequired: !field.required,
          name: field.name,
          type: this.getType(field),
          description: this.getDescription(field),
          readonly: false,
          reference: field.reference
        }
      };
    }, {});

    // Parse fields to add relevant imports, required for Typescript
    const fieldsArray = Object.values(fields);
    const imports = Object.values(fields).reduce(
      (list, { reference, type }) => {
        if (!reference) {
          return list;
        }

        return {
          ...list,
          [type]: {
            type,
            file: `./${type}`
          }
        };
      },
      {}
    );

    return { fields: fieldsArray, imports: Object.values(imports) };
  }

  ucFirst(target) {
    return target.charAt(0).toUpperCase() + target.slice(1);
  }
}
