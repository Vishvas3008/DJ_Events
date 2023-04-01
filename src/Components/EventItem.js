import Link from "next/link";
import Image from "next/image";
import styles from "../styles/EventItem.module.css";

export default function EventItem({ evt }) {
  //   console.log("1");
  //   console.log(evt.name);
  // console.log("image", evt.image);
  console.log(evt.image.data);
  console.log(evt);
  // return <h1>console</h1>
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image.data ? evt.image.data.attributes.formats.thumbnail.url : "/images/event-default.png"}
          width={170}
          height={100}
          alt="Image"
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div>
        <Link href={`/events/${evt.slug}`} legacyBehavior>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
