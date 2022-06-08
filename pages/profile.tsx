// pages/dashboard.js
import { getSession } from "next-auth/client";

export default function Dashboard({ user }) {
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome {user}</p>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // console.log(ctx);
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user,
    },
  };
}
