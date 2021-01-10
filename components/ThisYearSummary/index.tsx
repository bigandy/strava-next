import { useMemo } from "react";

const ThisYearSummary = ({ runDistance, runCount, distanceFormat }) => {
  const distance = useMemo(() => {
    return (
      runDistance / (distanceFormat === "miles" ? 1609.34 : 1000)
    ).toFixed(1);
  }, [distanceFormat, runDistance]);

  return (
    <div>
      <div>Count: {runCount} times</div>
      <div>
        Distance: {distance} {distanceFormat}
      </div>
    </div>
  );
};

export default ThisYearSummary;
