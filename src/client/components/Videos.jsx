import React, { useState, useEffect } from 'react';
import YoutubeIframe from './YoutubeIframe';
import server from '../server';
import SectionHeader from './SectionHeader';
import Preloader from './Preloader';

const getVideoSheet = server.getSheetsData('videos');

const VideoBubble = ({ videoId, title, description }) => (
  <div className="video-bubble rounded padded col s12 m6 dark-grey-text text-center shadow-center ">
    <div className="video-bubble-iframe">
      <YoutubeIframe id={videoId} title={title} />
    </div>
    <h6 className="no-margin">{title}</h6>
    <p>{description}</p>
  </div>
);

const VideosSection = props => {
  const [videoSheet, setVideoSheet] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!videoSheet) {

      getVideoSheet
        .then(sheet => {
          setVideoSheet(sheet);
          setReady(true);
          console.log('getVideoSheet callback', getVideoSheet);
        })
        .catch(err => console.log(err));
    }
  });

  const createVideoBubbles = () => {
    if (videoSheet) {
      const { values, rowHeaders } = videoSheet;
      return values.slice(1,).map(row => {
        const title = row[rowHeaders['title']];
        const description = row[rowHeaders['description']];
        const videoId = row[rowHeaders['video_id']];
        return (
          <VideoBubble
            title={title}
            description={description}
            videoId={videoId}
          />
        );
      });
    }
  };
  if (ready) {
    return (
      <div>
        <SectionHeader title="videos" />
        <div className="container">
          <div className="row">{createVideoBubbles()}</div>
        </div>
      </div>
    );
  } else {
    return <Preloader />;
  }
};

export default VideosSection;
