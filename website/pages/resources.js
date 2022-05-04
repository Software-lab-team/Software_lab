import Header from "../components/header";
import ResourceStepper from "../components/resourceStepper";
import ResourceTable from "../components/resourceTable";
import { getSession } from "next-auth/react";
import { useState } from "react";

/* 
Code for the resources page
*/

export default function Home() {
  const [hwsets, setHwsets] = useState([]);

  return (
    <div>
      <Header />
      <ResourceTable hwsets={hwsets} setHwsets={setHwsets} />
      <ResourceStepper hwsets={hwsets} setHwsets={setHwsets} />
    </div>
  );
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
    props: { session },
  };
}
