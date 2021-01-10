import strava from "strava-v3";
import prisma from "../utils/prisma";

export async function getUserStravaToken(user) {
  const tokens = await prisma.account.findMany({
    where: { userId: user.userId, providerId: "strava" },
  });
  if (tokens.length === 0) {
    throw new Error("No tokens found for user");
  } else {
    return tokens[0];
  }
}

export async function rotateAccessToken(user) {
  const { refreshToken } = await getUserStravaToken(user);
  const { access_token, refresh_token } = await strava.oauth.refreshToken(
    refreshToken
  );
  if (!access_token || !refresh_token) {
    return;
  }

  await prisma.account.update({
    where: {
      id: user.userId,
    },
    data: {
      userId: user.userId,
      accessToken: access_token,
      refreshToken: refresh_token,
    },
  });
  return access_token;
}

export const getStravaClient = async (user) => {
  const token = await rotateAccessToken(user);
  const client = new strava.client(token);
  return client;
};
