import { gql } from "@apollo/react-hooks";

export const USER_QUERY = gql`
  query($userId: Int) {
    user(where: { userId: { equals: $userId } }) {
      id
      stravaAthleteId
      name
    }
  }
`;
