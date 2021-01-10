import { useMemo, Fragment } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";

const formatTime = (seconds) => {
  return (seconds / 60).toFixed(1);
};

const RunList = ({ data, distanceFormat }) => {
  if (!data || data.length === 0) {
    return <div>No Data</div>;
  }
  return (
    <Fragment>
      <Typography variant="h2" gutterBottom>
        Latest Runs
      </Typography>
      <Grid container spacing={3}>
        {data.map((run) => {
          const distance = useMemo(() => {
            return (
              run.distance / (distanceFormat === "miles" ? 1609.34 : 1000)
            ).toFixed(1);
          }, [distanceFormat]);

          return (
            <Grid item xs={3} key={`run-${run.id}`}>
              <Card variant="outlined">
                <CardHeader
                  title={run.name}
                  subheader={run.startDate}
                ></CardHeader>

                <CardContent>
                  <h3>{run.startDate}</h3>
                  <h4>
                    Distance - {distance} {distanceFormat}
                  </h4>
                  <h4>Moving Time - {formatTime(run.movingTime)} minutes</h4>
                  <h4>Elapsed Time - {formatTime(run.elapsedTime)} minutes</h4>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default RunList;
