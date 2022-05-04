import { getSession } from "next-auth/react";

/*
The landing page of the website. If the user is not logged in, they are redirected to the signin page,
and if they are logged in, they are redirected to the resources page.
*/
export default function Home() {
  return <div></div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/resources",
      permanent: false,
    },
  };
}
