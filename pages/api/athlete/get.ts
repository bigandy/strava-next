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
    let { stravaAthleteId } = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });

    // 1. if user does not have stravaAthleteId, we need to get it.
    if (stravaAthleteId === null) {
      const { id } = await strava.athlete.get();
      stravaAthleteId = id;
      // console.log({ stravaAthleteId });

      // 2. Add it to the user object in the database.
      await prisma.user.update({
        where: {
          id: user.userId,
        },
        data: {
          stravaAthleteId,
        },
      });

      // console.log("added to user");
    } else {
      // console.log("already have stravaUserId");
    }

    const payload = await strava.athletes.stats({ id: stravaAthleteId });

    const {
      ytd_run_totals: { count, distance },
    } = payload;

    res.status(200).json({
      runsThisYear: { count, distance },
      stravaAthleteId,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}
