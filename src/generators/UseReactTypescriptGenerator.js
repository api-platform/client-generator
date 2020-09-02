import chalk from "chalk";
import BaseGenerator from "./BaseGenerator";

export default class UseReactTypescriptGenerator extends BaseGenerator {
  constructor(params) {
    super(params);

    this.registerTemplates("use-react-typescript/", [
      // utils
      "utils/dataAccess.ts",
      "utils/types.ts",

      // stores
      "stores/create.tsx",
      "stores/delete.tsx",
      "stores/fetch.tsx",
      "stores/index.tsx",
      "stores/list.tsx",
      "stores/mercure.tsx",
      "stores/retrieve.tsx",
      "stores/update.tsx",
      "stores/show.tsx",

      // interfaces
      "interfaces/Collection.ts",
      "interfaces/foo.ts",

      // components
      "components/foo/Create.tsx",
      "components/foo/Form.tsx",
      "components/foo/index.tsx",
      "components/foo/List.tsx",
      "components/foo/Update.tsx",
      "components/foo/type.ts",
      "components/foo/Show.tsx",
      "components/Field.tsx",
      "components/Links.tsx",
      "components/Pagination.tsx",

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
//import routes
import ${titleLc}Routes from './routes/${titleLc}';

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
      `${dir}/components/${lc}`,
      `${dir}/stores`
    ].forEach(dir => this.createDir(dir));

    [
      // components
      "components/%s/Create.tsx",
      "components/%s/Form.tsx",
      "components/%s/index.tsx",
      "components/%s/List.tsx",
      "components/%s/Update.tsx",
      "components/%s/type.ts",
      "components/%s/Show.tsx",

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

      // components
      "components/Field.tsx",
      "components/Links.tsx",
      "components/Pagination.tsx",

      // stores
      "stores/create.tsx",
      "stores/delete.tsx",
      "stores/fetch.tsx",
      "stores/index.tsx",
      "stores/list.tsx",
      "stores/mercure.tsx",
      "stores/retrieve.tsx",
      "stores/update.tsx",
      "stores/show.tsx",

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
          reference: field.reference,
          maxCardinality: field.maxCardinality
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
