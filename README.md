# Strava Next Application

using Next, next-auth, apollo, graphql, prisma, nexus and hooking up to the Strava API for auth and data.

This is a personal project for learning and growing, for displaying my Strava data in a better and more useful way for training both running (and cycling?). Let's go!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Copy `.env.example` to `.env` and input Strava STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET
1. Run `npm i` to install npm deps
1. With docker on your machine run `docker pull`
1. In one Terminal tab run `docker-compose up`
1. To run the prisma database creation run `make init`
1. In a new tab run `npm run dev` to run the dev server
1. Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
