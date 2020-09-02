import { Api, Resource, Field } from "@api-platform/api-doc-parser/lib";
import fs from "fs";
import tmp from "tmp";
import UseReactTypescriptGenerator from "./UseReactTypescriptGenerator";

test("Generate a Typescript React app", () => {
  const generator = new UseReactTypescriptGenerator({
    hydraPrefix: "hydra:",
    templateDirectory: `${__dirname}/../../templates`
  });
  const tmpobj = tmp.dirSync({ unsafeCleanup: true });

  const fields = [
    new Field("bar", {
      id: "http://schema.org/url",
      range: "http://www.w3.org/2001/XMLSchema#string",
      reference: null,
      required: true,
      description: "An URL"
    })
  ];
  const resource = new Resource("abc", "http://example.com/foos", {
    id: "abc",
    title: "abc",
    readableFields: fields,
    writableFields: fields
  });
  const api = new Api("http://example.com", {
    entrypoint: "http://example.com:8080",
    title: "My API",
    resources: [resource]
  });
  generator.generate(api, resource, tmpobj.name);

  [
    "/utils/dataAccess.ts",
    "/utils/types.ts",
    "/config/entrypoint.ts",

    "/interfaces/Abc.ts",
    "/interfaces/Collection.ts",

    "/components/abc/index.tsx",
    "/components/abc/Create.tsx",
    "/components/abc/Update.tsx",
    "/components/abc/type.ts",

    "/components/Field.tsx",
    "/components/Links.tsx",
    "/components/Pagination.tsx",

    "/routes/abc.tsx",

    "/stores/create.tsx",
    "/stores/delete.tsx",
    "/stores/fetch.tsx",
    "/stores/index.tsx",
    "/stores/list.tsx",
    "/stores/mercure.tsx",
    "/stores/retrieve.tsx",
    "/stores/show.tsx",
    "/stores/update.tsx"
  ].forEach(file => expect(fs.existsSync(tmpobj.name + file)).toBe(true));

  [
    "/components/abc/Form.tsx",
    "/components/abc/List.tsx",
    "/components/abc/Show.tsx",
    "/interfaces/Abc.ts"
  ].forEach(file => {
    expect(fs.existsSync(tmpobj.name + file)).toBe(true);
    expect(fs.readFileSync(tmpobj.name + file, "utf8")).toMatch(/bar/);
  });

  tmpobj.removeCallback();
});
