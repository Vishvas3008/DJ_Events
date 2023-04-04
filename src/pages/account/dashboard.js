import { parseCookies } from "../../helpers/index";
import { useRouter } from "next/router";
import Layout from "../../Components/Layout";
import DashboardEvent from "../../Components/DashboardEvent";
import { API_URL } from "../../config/index";
import styles from "../../styles/Dashboard.module.css";

export default function DashboardPage({ event, token }) {
  console.log(event);
  // return <h1>Deshboard</h1>;
  const router = useRouter()

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.reload()
      }
    }
  }

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {event.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/users/me?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const event = await res.json();
  console.log(event);

  // const alleventsres = await fetch(`${API_URL}/api/events?populate=*`);
  // const allevents = await alleventsres.json();

  // // console.log(allevents.data);
  // const eventsID = events.events.map((evt) => {
  //   return evt.id;
  // });
  // const event = allevents.data.filter((evt) => eventsID.includes(evt.id));
  // console.log(event);
  // console.log(eventsID);
  // console.log(events.events);
  return {
    props: {
      event : event.events,
      token,
    },
  };
}
