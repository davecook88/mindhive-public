import React from "react";

const YoutubeIframe = ({ id, title }) => (
  <iframe
    className="padded"
    // width=""
    // height="315"
    title={title}
    src={`https://www.youtube.com/embed/${id}`}
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
);

export default YoutubeIframe;
