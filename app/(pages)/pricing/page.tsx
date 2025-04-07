"use client";

import React, { useEffect } from "react";
import Pricing from "@/components/Pricing";
import axios from "axios";


function Priceing() {

  const [name, setName] = React.useState("");
  useEffect(() => {
    axios
      .get("/api/allnames")
      .then((response) => {
        console.log(response.data);
        setName(response.data.profile.username);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <div>
      <Pricing />
      <p>{name}</p>
    </div>
  );
}

export default Priceing;
