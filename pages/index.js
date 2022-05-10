import "bootstrap/dist/css/bootstrap.min.css";
import AddTopic from "./AddTopic";
import SearchTopic from "./SearchTopic";
import Head from "next/head";

export default function Home() {
  return (
    <>
     <Head>
        <title>Memorizer</title>
      </Head>
     <SearchTopic />
      <AddTopic />
    </>
  );
}
