import React from 'react';
import YoutubeIframe from './YoutubeIframe';

const VideoBubble = ({ videoId, title, description }) => (
  <div className="video-bubble rounded padded">
    <div className="video-bubble-iframe">
      <YoutubeIframe videoId={id} title={title}/>
    </div>
    <h6 className="no-margin">{title}</h6>
    <p>{description}</p>
  </div>
)

const VideosSection = props => {

}