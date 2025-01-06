import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "MY-WEBAPP",
      region: "us-east-1",
      cdk: {
        qualifier: "trj2111-sc",
      }
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
