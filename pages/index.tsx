import { useMemo, useEffect, Fragment, useState } from "react";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";

import { useQuery } from "@apollo/client";
import { Button, Fab, ButtonGroup } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";

import { post } from "utils/fetch";
import { USER_ACTIVITIES_QUERY } from "graphql/userActivitiesQuery";

import RunList from "components/RunList";
import ThisYearSummary from "components/ThisYearSummary";

export default function Page() {
  const [session, loading, sessionError] = useSession();

  const [distanceFormat, setDistanceFormat] = useState("miles");
  const [runDistance, setRunDistance] = useState(0);
  const [runCount, setRunCount] = useState(0);

  const getActivities = async () => {
    if (session) {
      const response = await post(`/api/activities/get`, {});
      return response;
    }
  };

  const runsThisYear = useMemo(async () => {
    if (session) {
      const { runsThisYear } = await post(`/api/athlete/get`, {}).then((res) =>
        res.json()
      );

      const { count, distance } = await runsThisYear;

      setRunCount(count);
      setRunDistance(distance);
    }
  }, [session]);

  const { data, error } = useQuery(USER_ACTIVITIES_QUERY, {
    variables: { userId: session?.user?.userId },
  });

  const run = useMemo(() => {
    if (data) {
      return data.activities;
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error({ error });
    return <p>Error...</p>;
  }

  return (
    <Fragment>
      <Head>
        <title>Homepage</title>
      </Head>
      <div>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button
            onClick={() => setDistanceFormat("miles")}
            disabled={distanceFormat === "miles"}
          >
            Miles
          </Button>
          <Button
            onClick={() => setDistanceFormat("kilometers")}
            disabled={distanceFormat === "kilometers"}
          >
            Kilometers
          </Button>
        </ButtonGroup>
      </div>
      {!session && (
        <Fragment>
          Not signed in <br />
          <Button variant="contained" onClick={signIn}>
            Sign in
          </Button>
        </Fragment>
      )}
      {session && (
        <Fragment>
          Signed in as {session.user.name} <br />
          <img src={session.user.image} />
          <Button variant="contained" onClick={signOut}>
            Sign out
          </Button>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            onClick={getActivities}
          >
            <NavigationIcon />
            Get activities
          </Fab>
          {runsThisYear && (
            <ThisYearSummary
              runDistance={runDistance}
              runCount={runCount}
              distanceFormat={distanceFormat}
            />
          )}
          <RunList data={run} distanceFormat={distanceFormat} />
        </Fragment>
      )}
    </Fragment>
  );
}
