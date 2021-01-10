// import strava from "strava-v3";
import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

import { getStravaClient } from "utils/getStravaClient";

export default async function get(req, res) {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  const { user } = session;
  const strava = await getStravaClient(user);

  let { stravaAthleteId } = user;

  console.log({ prisma });
  // 1. if user does not have stravaAthleteId, we need to get it.
  // So far it will never have stravaAthleteId as I need to query the DB!

  if (typeof stravaAthleteId === "undefined") {
    const { id } = await strava.athlete.get();
    stravaAthleteId = id;
    console.log({ stravaAthleteId });

    // 2. Add it to the user object in the database.
    await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        stravaAthleteId,
      },
    });

    console.log("added to user");
  } else {
    console.log("already have stravaUserId");
  }

  const payload = await strava.athletes.stats({ id: stravaAthleteId });

  const {
    ytd_run_totals: { count, distance },
  } = payload;

  res.status(200).json({
    runsThisYear: { count, distance },
    stravaAthleteId,
    //   payload
  });

  // if (payload) {
  //   payload
  //     .filter((activity) => activity.type === "Run")
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
  //           movingTime: activity.moving_time,
  //           elapsedTime: activity.elapsed_time,
  //           user: { connect: { id: user.userId } },
  //         },
  //       });
  //     });
  //   }
  // res.status(200).json({ payload: payload.filter((activity) => activity.type === "Run") });
  // } catch (error) {
  //   res.status(400).json({error})
  // }
}
