import Layout from "@/Components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config";
import styles from "../../../styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Model from "@/Components/Model";
import ImageUpload from "@/Components/ImageUpload";

export default function AddEvents({
  event: {
    data: { attributes: event, id },
  },
}) {
  console.log("event from id", event);
  console.log("id", id);
  const [values, setValues] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: event.date,
    time: event.time,
    description: event.description,
  });
  const [imagePreview, setImagepreview] = useState(
    event.image.data ? event.image.data.attributes.formats.thumbnail.url : null
  );
  const [showModel, setShowModel] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const hasEmptyFields = Object.values(values).some((ele) => ele === "");
    console.log(hasEmptyFields);
    if (hasEmptyFields) {
      console.log("error");
      toast.error("Please fill all the fields");
    }

    const res = await fetch(`${API_URL}/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: values }),
    });

    if (!res.ok) {
      toast.error("Somthing went wrong");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.data.attributes.slug}`);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
    const {data} = await res.json();
    setImagepreview(
      data.attributes.image.data.attributes.formats.thumbnail.url
    );
    setShowModel(false);
  };
  return (
    <Layout title="Add New Event">
      <Link href={`/events/${event.slug}`}>Go Back</Link>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Edit Event</h1>
        <ToastContainer />
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Edit Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image
          src={imagePreview}
          height={100}
          width={170}
          alt="No Image"
        ></Image>
      ) : (
        <div>No Image uploaded</div>
      )}
      <div>
        <button onClick={() => setShowModel(true)} className="btn-secondary">
          <FaImage /> Edit Image
        </button>
      </div>
      <Model show={showModel} onClose={() => setShowModel(false)}>
        <ImageUpload evtId={id} imageUploaded={imageUploaded} />
      </Model>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const event = await res.json();
  //   console.log(event);

  return {
    props: {
      event,
    },
  };
}
