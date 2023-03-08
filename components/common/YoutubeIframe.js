/* eslint-disable react-hooks/exhaustive-deps */
import YouTube from "react-youtube";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";

const YoutubeIframe = ({
  youtubeId,
  segment,
  height = "100%",
  autoplay = true,
}) => {
  //player should be responsive, 100% width
  //height should be different for tablet and desktop
  const { width } = useWindowSize();
  const [opts, setOpts] = useState({
    height: height,
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  });

  //resize player on window resize
  useEffect(() => {
    let height = "200px";
    if (width >= 768) {
      height = "480px";
    }

    const newOpts = { ...opts };
    newOpts.height = height;
    setOpts(newOpts);
  }, [width]);

  //seek to segment start time and play when player is ready
  const onPlayerReady = (event) => {
    if (event && event.target && opts) {
      event.target.pauseVideo(); //pause video before seeking

      //Segment
      setTimeout(() => {
        if (segment && segment.start) {
          const { start } = segment;
          event.target.seekTo(start);
        } else {
          event.target.seekTo(0);
        }
      }, 300);

      //autplay
      setTimeout(() => {
        if (!autoplay) {
          event.target.pauseVideo();
        } else {
          event.target.playVideo();
        }
      }, 700);
    }
  };

  return <YouTube videoId={youtubeId} opts={opts} onReady={onPlayerReady} />;
};

export default YoutubeIframe;
