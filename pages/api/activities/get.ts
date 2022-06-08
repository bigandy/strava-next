// import strava from "strava-v3";
import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

import { getStravaClient } from "utils/getStravaClient";

export default async function get(req, res) {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  const { user } = session;
  const strava = await getStravaClient(user);

  try {
    const payload = await strava.athlete.listActivities({});

    console.log({
      runs: payload
        .filter((activity) => activity.type === "Run")
        .filter((activity) => activity.max_speed < 3),
    });

    if (payload) {
      payload
        .filter((activity) => activity.type === "Run")
        .map(async (activity) => {
          await prisma.activity.create({
            data: {
              iid: activity.id,
              name: activity.name,
              distance: activity.distance,
              type: activity.type,
              startDate: activity.start_date,
              averageSpeed: activity.average_speed,
              averageCadence: activity.average_cadence,
              locationCountry: activity.location_country,
              movingTime: activity.moving_time,
              elapsedTime: activity.elapsed_time,
              user: { connect: { id: user.userId } },
            },
          });
        });
    }
    res.status(200).json({
      payload: payload
        .filter((activity) => activity.type === "Run")
        .filter((activity) => activity.max_speed < 4)
        .map((activity) => {
          return {
            id: activity.id,
            max_speed: activity.max_speed,
          };
        }),
    });
  } catch (error) {
    console.log("THERE IS AN ERROR", { error: error.error.errors });
    res.status(500).json({ payload: [] });
  }

  // } catch (error) {
  //   res.status(400).json({error})
  // }
}
