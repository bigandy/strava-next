// import strava from "strava-v3";
import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import { getStravaClient } from "../../../utils/getStravaClient";

export default async function get(req, res) {
  // const prisma = new PrismaClient();
  // const session = await getSession({ req });
  // const { user } = session;
  // const strava = await getStravaClient(user);

  // const nowSeconds = Math.floor(Date.now() / 1000);

  // const payload = await strava.athlete.listActivities({
  //   after: 1607684888,
  //   before: 0,
  // });

  // console.log({ payload });

  // if (payload) {
  //   payload
  //     .filter((activity) => activity.average_cadence && activity.type === "Run")
  //     .map(async (activity) => {
  //       await prisma.activity.create({
  //         data: {
  //           iid: activity.id,
  //           name: activity.name,
  //           distance: activity.distance,
  //           type: activity.type,
  //           startDate: activity.start_date,
  //           averageSpeed: activity.average_speed,
  //           averageCadence: activity.average_cadence,
  //           locationCountry: activity.location_country,
  //           user: { connect: { id: user.userId } },
  //         },
  //       });
  //     });
  // }

  // const payload2 = await strava.streams.activity({
  //   id: 200011430,
  //   types: "time,distance",
  //   resolution: "low",
  // });
  // console.log(payload2);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "John Doe" }));
}
