import { Api, Resource, Field } from "@api-platform/api-doc-parser/lib";
import fs from "fs";
import tmp from "tmp";
import ReactTypescriptGenerator from "./ReactTypescriptGenerator";

test("Generate a Typescript React app", () => {
  const generator = new ReactTypescriptGenerator({
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

    "/actions/abc/create.ts",
    "/actions/abc/delete.ts",
    "/actions/abc/list.ts",
    "/actions/abc/show.ts",
    "/actions/abc/update.ts",

    "/types/abc/create.ts",
    "/types/abc/delete.ts",
    "/types/abc/list.ts",
    "/types/abc/show.ts",
    "/types/abc/update.ts",

    "/components/abc/index.tsx",
    "/components/abc/Create.tsx",
    "/components/abc/Update.tsx",

    "/routes/abc.tsx",

    "/reducers/abc/create.ts",
    "/reducers/abc/delete.ts",
    "/reducers/abc/index.ts",
    "/reducers/abc/list.ts",
    "/reducers/abc/show.ts",
    "/reducers/abc/update.ts"
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
