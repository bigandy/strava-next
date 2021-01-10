import { useMemo, Fragment, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { Button, Fab } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";

import { post } from "utils/fetch";
import { USER_ACTIVITIES_QUERY } from "graphql/userActivitiesQuery";

import RunList from "components/RunList";

export default function Page() {
  const [session, loading, sessionError] = useSession();

  console.log({ sessionError });

  const [distanceFormat, setDistanceFormat] = useState("miles");

  const getActivities = async () => {
    if (session) {
      const response = await post(`/api/activities/get`, {});
      return response;
    }
  };

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
          {<RunList data={run} distanceFormat={distanceFormat} />}
        </Fragment>
      )}
    </Fragment>
  );
}
