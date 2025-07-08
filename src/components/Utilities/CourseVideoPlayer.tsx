import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface CourseVideoPlayerProps {
  videoUrl: string;
}

const CourseVideoPlayer: React.FC<CourseVideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    // If the browser supports HLS natively (Safari)
    if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoUrl;
    }
    // Otherwise, use hls.js
    else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);

      // Cleanup on unmount
      return () => {
        hls.destroy();
      };
    } else {
      console.error("HLS is not supported in this browser.");
    }
  }, [videoUrl]);

  return (
    <video
      ref={videoRef}
      controls
      controlsList="nodownload"
      onContextMenu={(e) => e.preventDefault()}
      disablePictureInPicture
      className="rounded-lg"
      style={{ width: "100%", height: "auto" }}
    >
      Sorry, your browser doesn't support video playback.
    </video>
  );
};

export default CourseVideoPlayer;
