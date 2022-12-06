import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, title, videoTitle }) {
  const buttonRef = useRef();
  const [status, setStatus] = useState(false);
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;
  function toggleMiniPlayer() {
    if (!status) {
      buttonRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }
  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`${classes.open} material-icons-outlined `}>
        play_circle_filled
      </span>
      <span
        className={`${classes.close} material-icons-outlined`}
        onClick={toggleMiniPlayer}
      >
        close
      </span>
      <ReactPlayer
        url={videoUrl}
        width="300px"
        height="168px"
        playing={status}
        controls
        // className={classes.player}
      />
      <p>{videoTitle}</p>
    </div>
  );
}
