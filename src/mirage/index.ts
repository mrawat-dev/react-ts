import { createServer, Model, Factory } from "miragejs";
import faker from "@faker-js/faker";
import moment from 'moment';

import { Deal } from "../model";

export function makeServer({ environment = "dev" }) {
  return createServer({
    environment,
    factories: {
      deal: Factory.extend<Partial<Deal>>({
        get id() {
          return faker.datatype.uuid();
        },
        get name() {
          return faker.name.findName(faker.name.firstName(), faker.name.lastName());
        },
        get amount() {
          return +faker.finance.amount();
        },
        get stage() {
          return Math.ceil(Math.random() * (3 - 1) + 1);
        },
        get created_at() {
          return moment();
        },
      }),
    },

    models: {
      deal: Model.extend<Partial<Deal>>({}),
    },

    routes() {
      this.namespace = "api";
      this.get("deals");
    },

    seeds(server) {
      server.createList("deal", 10);
    },
  });
}
