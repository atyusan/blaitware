"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { markdownify } from "@lib/utils/textConverter";

const VideoBlock = ({ video }) => {
  const [playing, setPlaying] = useState(false);
  if (!video) return null;

  return (
    <section className={`section${video.light ? " bg-light" : ""}`}>
      <div className="container">
        <div className="row justify-center">
          <div className="col-12 text-center xl:col-6">
            <h2 className="section-title h3">{video.title}</h2>
            <div className="content mb-5">{markdownify(video.content)}</div>
          </div>
        </div>
        <div className="row justify-center">
          <div className="col-12 xl:col-9">
            <div className="has-video relative overflow-hidden rounded-lg shadow">
              {playing ? (
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <>
                  <Image
                    src={video.image}
                    alt="video thumbnail"
                    width={850}
                    height={485}
                    className="h-auto w-full rounded-lg"
                  />
                  <button
                    type="button"
                    aria-label="video play button"
                    className="video-loader-btn flex items-center justify-center"
                    onClick={() => setPlaying(true)}
                  >
                    <FaPlay className="play-icon ml-1" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBlock;
