import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { Fragment } from "react";

const RunList = ({ data, distanceFormat }) => {
  return (
    <Fragment>
      <Typography variant="h2">Latest Runs</Typography>
      <Grid container spacing={3}>
        {data.map((run) => {
          const distance = (
            run.distance / (distanceFormat === "miles" ? 1609.34 : 1000)
          ).toFixed(1);

          return (
            <Grid item xs={3} key={`run-${run.id}`}>
              <Card variant="outlined">
                <CardHeader
                  title={run.name}
                  subheader={run.startDate}
                ></CardHeader>

                <CardContent>
                  <h3>{run.startDate}</h3>
                  <h4>Distance - {distance}</h4>
                  <h4>Moving Time - {run.movingTime}</h4>
                  <h4>Elapsed Time - {run.elapsedTime}</h4>
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
