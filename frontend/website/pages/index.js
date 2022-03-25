import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <div></div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
      redirect: {
        destination: '/resources',
        permanent: false,
      },
  }
}
