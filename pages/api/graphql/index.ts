import { ApolloServer } from "apollo-server-micro";
import { makeSchema, objectType, extendType } from "nexus";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Activity = objectType({
  name: "Activity",
  definition(t) {
    t.model.id();
    t.model.iid();
    t.model.name();
    t.model.distance();
    t.model.type();
    t.model.startDate();
    t.model.averageSpeed();
    t.model.averageCadence();
    t.model.locationCountry();
    t.model.user();
    t.model.movingTime();
    t.model.elapsedTime();
  },
});

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.email();
    t.model.name();
  },
});

const activityQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.activity();
    t.crud.activities({ ordering: true, filtering: true, pagination: true });
    t.crud.users();
  },
});

const schema = makeSchema({
  types: [activityQuery, Activity, User],
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
});

let server = new ApolloServer({
  schema,
  context: { prisma },
  tracing: process.env.NODE_ENV === "development",
});

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
