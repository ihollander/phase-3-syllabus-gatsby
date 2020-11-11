import React from 'react';

const YoutubeEmbed = ({ link }) => {
  return (
    <div className="video-responsive">
      <iframe
        width="560"
        title="Youtube"
        height="340"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;