import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);
  // console.log(error);

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          next={() => setPage(page + 10)}
          hasMore={hasMore}
          loader="Loading"
        >
          {videos.map((video, i) =>
            video.noq > 0 ? (
              <Link
                to={{
                  pathname: `/quiz/${video.youtubeID}`,
                  state: {
                    videoTitle: video.title,
                  },
                }}
              >
                <Video
                  key={`${video.youtubeID}${i}`}
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <>
                <Video
                  key={`${video.youtubeID}${i}`}
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                  onClick={() => alert("No questions found")}
                />
              </>
            )
          )}
        </InfiniteScroll>
      )}

      {!loading && videos.length === 0 && <div className>No data found</div>}
      {/* error && <div className="">Something wend wrong</div> */}
      {loading && <div>Loading</div>}
    </div>
  );
}
