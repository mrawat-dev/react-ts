import { createServer, Model, Factory } from "miragejs";
import faker from "@faker-js/faker";
import moment from 'moment';

import { Deal } from "../model";

export function makeServer() {
  return createServer({
    seeds(server) {
      server.createList("deal", 10);
    },

    factories: {
      deal: Factory.extend<Partial<Deal>>({
        id() {
          return faker.datatype.uuid();
        },
        name() {
          return faker.name.findName(faker.name.firstName(), faker.name.lastName());
        },
        amount() {
          return +faker.finance.amount();
        },
        stage() {
          return Math.ceil(Math.random() * (3 - 1) + 1);
        },
        created_at() {
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
  });
}
