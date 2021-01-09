// import strava from "strava-v3";
import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import { getStravaClient } from "../../../utils/getStravaClient";

export default async function get(req, res) {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  const { user } = session;
  const strava = await getStravaClient(user);


  // const nowSeconds = Math.floor(Date.now() / 1000);

  const payload = await strava.athlete.listActivities({
  });

  console.log({ payload });

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
    res.status(200).json({ payload: payload.filter((activity) => activity.type === "Run") });
  // } catch (error) {
  //   res.status(400).json({error})
  // }


}
