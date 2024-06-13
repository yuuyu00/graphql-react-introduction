import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:9000",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/generated-graphql/": {
      preset: "client",
    },
  },
};

export default config;
