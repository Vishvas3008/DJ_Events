import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/Components/Layout";
import { API_URL } from "@/config";
import styles from "../../styles/Event.module.css";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function EventPage({ event: { attributes: event, id } }) {
  const router =useRouter()
  const deleteEvent = async () => {
    // console.log("delete");
    if (confirm("Are You Sure!?")) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }else{
        router.push('/events')
      }
    }
  };
  console.log("event", event);
  console.log(id);
  // return <h1>console</h1>;
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`} legacyBehavior>
            <a>
              <FaPencilAlt />
              Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete
          </a>
        </div>
        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image
              src={
                event.image.data
                  ? event.image.data.attributes.formats.large.url
                  : "/images/event-default.png"
              }
              width={760}
              height={500}
              alt={"Image"}
            />
          </div>
        )}
        <h3>Performers</h3>
        <p>{event.performers}</p>
        <h3>Description</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href={"/events"} legacyBehavior>
          <a className={styles.back}> {"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events?populate=*`);
//   const events = await res.json();
//   console.log(events.data[3].attributes.slug);
//   const paths = events.data.map((event) => ({
//     params: {
//       slug: event.attributes.slug,
//     },
//   })
//   );
//   console.log(paths);
//   return {
//     paths,
//     fallback: true,
//   };
// }
// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events?populate=*/${slug}`);
//   const event = await res.json();
//   console.log("event now",event);
//   return {
//     props: {
//       event: event[0],
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const event = await res.json();
  // console.log(event);
  // console.log("query",query);
  const newevent = [];
  // const newevent=event.data.filter(evt=>{evt.attributes.slug==slug})
  event.data.forEach((evt) => {
    if (evt.attributes.slug == slug) {
      newevent.push(evt);
    }
  });
  console.log("newevent", newevent);
  return {
    props: {
      event: newevent[0],
    },
  };
}
