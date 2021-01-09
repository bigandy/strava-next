import { useMemo, Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { post } from "../utils/fetch";
import { useQuery } from "@apollo/client";
import { USER_ACTIVITIES_QUERY } from "../graphql/userActivitiesQuery";
import { Button, Fab } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";

export default function Page() {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  const getActivities = async () => {
    if (session) {
      const response = await post(`/api/activities/get`, {});
      return response;
    }
  };

  let run;

  const { data } = useQuery(USER_ACTIVITIES_QUERY, {
    variables: { userId: session?.user?.userId },
  });

  run = useMemo(() => {
    if (data) {
      return data.activities;
    }
  }, [data]);

  console.log(data);

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
          {run && run.length && run.map((run) => <h3>{run.averageCadence}</h3>)}
        </Fragment>
      )}
    </Fragment>
  );
}
