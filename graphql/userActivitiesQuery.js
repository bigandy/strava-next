import { gql } from "@apollo/react-hooks";

export const USER_ACTIVITIES_QUERY = gql`
  query($userId: Int) {
    activities(where: { userId: { equals: $userId } }) {
      id
      name
      averageCadence
      averageSpeed
      distance
      elapsedTime
      movingTime
    }
  }
`;
