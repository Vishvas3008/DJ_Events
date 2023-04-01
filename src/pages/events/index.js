import Link from "next/link";
import Layout from "@/Components/Layout";
import { API_URL } from "@/config";
import EventItem from "@/Components/EventItem";
import Pagination from "@/Components/Pagination";
import { PER_PAGE } from "@/config";

export default function Events({ events: { data: events }, start, total }) {
  const eventsItems = [];
  const page = start / PER_PAGE + 1;
  const lastPage=Math.ceil(total/PER_PAGE)
  console.log(page,lastPage);
  events.forEach((ele) => {
    eventsItems.push(<EventItem key={ele.id} evt={ele.attributes} />);
  });
  // console.log(events);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>no events to show</h3>}
      <ul>{eventsItems}</ul>
      <Pagination page={page} lastPage={lastPage}/>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  console.log(page);
  const startpoint = (page - 1) * PER_PAGE;
  const res = await fetch(
    `${API_URL}/api/events?populate=*&pagination[start]=${startpoint}&pagination[limit]=${PER_PAGE}`
  );
  const events = await res.json();
  const total = events.meta.pagination.total;
  const start = events.meta.pagination.start;
  // console.log(start);
  // console.log(events);

  return {
    props: {
      events,
      total,
      start,
    },
  };
}
