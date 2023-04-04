import cookie from "cookie";
import { API_URL } from "@/config/index";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  console.log("fetched");
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await strapiRes.json();
    console.log(data);
    if (strapiRes.ok) {
      // Set Cookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: "strict",
            path: "/",
          })
        );

      res.status(200).json({ user: data.user });
    } else {
      let error = "";
      if(!data.error){
        // console.log(data.message[0].messages[0].message);
        error = data.message[0].messages[0].message;
      }
      else if (data.error.details.errors) {
        error = data.error.details.errors[0].message;
      } else {
        error = data.error.message;
      }
      res.status(429).json({ message: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
