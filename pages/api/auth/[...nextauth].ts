// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options = {
  providers: [
    {
      id: "strava",
      name: "Strava",
      type: "oauth",
      scope: "activity:read",
      version: "2.0",
      clientId: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      accessTokenUrl: "https://www.strava.com/api/v3/oauth/token",
      authorizationUrl:
        "https://www.strava.com/api/v3/oauth/authorize?response_type=code",
      params: { grant_type: "authorization_code" },
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.firstname,
          image: profile.profile,
        };
      },
      profileUrl: "https://www.strava.com/api/v3/athlete",
    },
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    session: async (session, user) => {
      // Binds the userId to the shared 'user' object.
      session.user.userId = user.id;
      // session.user.completedOnboards = user.completedOnboards;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
