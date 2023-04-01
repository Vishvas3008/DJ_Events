import Link from "next/link";
import Layout from "@/Components/Layout";
import { useRouter } from "next/router";
import { API_URL } from "@/config";
import EventItem from "@/Components/EventItem";
import qs from "qs";
// import Link from "next/link";

export default function SearchEvents({ events: { data: events } }) {
  const router = useRouter();
  const eventsItems = [];
  events.forEach((ele) => {
    eventsItems.push(<EventItem key={ele.id} evt={ele.attributes} />);
  });
  //   console.log(events);
  return (
    <Layout title="Search Results">
        <Link href={'/events'}>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>no events to show</h3>}
      <ul>{eventsItems}</ul>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $containsi: term } },
        { performers: { $containsi: term } },
        { venue: { $containsi: term } },
        { description: { $containsi: term } },
      ],
    },
  });
  console.log(query);
  const res = await fetch(`${API_URL}/api/events?populate=image&${query}`);
  const events = await res.json();
  return {
    props: {
      events,
    },
  };
}
