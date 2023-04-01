import Link from "next/link";
import Layout from "@/Components/Layout";
import { API_URL } from "@/config";
import EventItem from "@/Components/EventItem";

export default function Home({ events}) {
  const eventsItems = [];
  console.log(events);
  events.forEach((ele) => {
    eventsItems.push(<EventItem key={ele.id} evt={ele.attributes} />);
  });

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>no events to show</h3>}
      <ul>{eventsItems}</ul>
      {events.length > 0 && (
        <Link href={"/events"} legacyBehavior>
          <a className="btn-secondary">Show All Events {"->"}</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const inevents = await res.json();
  const events=inevents.data
  console.log(events);
  return {
    props: {
      events: events.splice(0,2),
    },
  };
}
