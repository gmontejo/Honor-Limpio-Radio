import React, { useEffect, useState } from "react";
import * as client from "../../client";
import flyer from "../../img/flyer.png";
import ad from "../../img/ad.jpg";

export default function Home(props) {
  const [videos, setVideos] = useState();
  const [recordings, setRecordings] = useState();
  const [activeVideo, setActiveVideo] = useState();
  const [interval, setInterval] = useState();
  const [visitors, setVisitors] = useState(props.visitors);

  useEffect(() => {
    getVideos();
    getRecordings();
  }, []);

  useEffect(() => {
    setVisitors(props.visitors);
  }, [props.visitors]);

  const getVideos = async () => {
    let query = await client.getVideos();

    const videoArray = query.data.videos.sort((a, b) => {
      const timeA = a.timestamp;
      const timeB = b.timestamp;

      return timeA === timeB ? 0 : timeA < timeB ? 1 : -1;
    });

    setVideos(videoArray);
    if (videoArray.length !== 0) {
      setActiveVideo(videoArray[0].videoCode);
    }
  };

  const getRecordings = async () => {
    const query = await client.getRecordings();

    const showsArray = query.data.showRecordings.sort((a, b) => {
      const timeA = a.timestamp;
      const timeB = b.timestamp;

      return timeA === timeB ? 0 : timeA < timeB ? 1 : -1;
    });

    setRecordings(showsArray);
  };

  const handleActiveVideo = (videoCode) => {
    setActiveVideo(videoCode);
  };

  const handleSlideLeft = () => {
    window.clearInterval(interval);
    const newInterval = window.setInterval(() => {
      document.getElementById("videoCarousel").scrollLeft -= 2;
    }, 5);

    setInterval(newInterval);
  };

  const handleSlideRight = () => {
    window.clearInterval(interval);
    const newInterval = window.setInterval(() => {
      document.getElementById("videoCarousel").scrollLeft += 2;
    }, 5);

    setInterval(newInterval);
  };

  const handleSlideUp = () => {
    window.clearInterval(interval);
    const newInterval = window.setInterval(() => {
      document.getElementById("showsCarousel").scrollTop -= 2;
    }, 5);

    setInterval(newInterval);
  };

  const handleSlideDown = () => {
    window.clearInterval(interval);
    const newInterval = window.setInterval(() => {
      document.getElementById("showsCarousel").scrollTop += 2;
    }, 5);

    setInterval(newInterval);
  };

  const clearSlide = () => {
    window.clearInterval(interval);
  };

  return (
    <div className="homeContainer">
      <div className="card">
        <div className="homeContent">
          <div className="firstCol">
            {/* VIDEOS YOUTUBE */}
            <div className="videoCol">
              <p className="title">VIDEOS</p>
              <div
                className="activeVideo"
                dangerouslySetInnerHTML={{ __html: activeVideo }}
              ></div>
              <div className="carouselContainer">
                <button
                  id="slideLeft"
                  type="button"
                  onMouseDown={handleSlideLeft}
                  onMouseUp={clearSlide}
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <div id="videoCarousel">
                  {videos &&
                    videos.map((video) => {
                      return (
                        <div
                          key={video.timestamp}
                          onClick={() => handleActiveVideo(video.videoCode)}
                        >
                          <img
                            className="imgKitten"
                            src={`https://img.youtube.com/vi/${video.videoID}/0.jpg`}
                            alt="kitten"
                          />
                          <div
                            className="miniVideo"
                            dangerouslySetInnerHTML={{
                              __html: video.videoCode,
                            }}
                          ></div>
                        </div>
                      );
                    })}
                </div>
                <button
                  id="slideRight"
                  type="button"
                  onMouseDown={handleSlideRight}
                  onMouseUp={clearSlide}
                >
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <div className="newShowPhone">
              <p className="title">PRÓXIMO PROGRAMA</p>
              <img
                id="flyerPhone"
                src={flyer}
                alt="flyer del próximo programa"
              />
            </div>

            {/* FERIA */}
            <div className="fair">
              <p className="title">FERIA</p>
              <iframe
                title="Feria"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/wzzRc6B7i3E"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="secondCol">
            <div className="newShow">
              <p className="title">PRÓXIMO PROGRAMA</p>

              <img
                id="flyerPhone"
                src={flyer}
                alt="flyer del próximo programa"
              />
            </div>

            <div className="oldShows">
              <p className="title">PROGRAMAS ANTERIORES</p>
              <div className="showsContainer">
                <button
                  id="slideUp"
                  type="button"
                  onMouseDown={handleSlideUp}
                  onMouseUp={clearSlide}
                >
                  <i className="fas fa-arrow-up"></i>
                </button>
                <div id="showsCarousel" className="showsCarousel">
                  {recordings &&
                    recordings.map((show) => {
                      return (
                        <div
                          key={show.timestamp}
                          dangerouslySetInnerHTML={{
                            __html: show.recordingCode,
                          }}
                        ></div>
                      );
                    })}
                </div>
                <button
                  id="slideDown"
                  type="button"
                  onMouseDown={handleSlideDown}
                  onMouseUp={clearSlide}
                >
                  <i className="fas fa-arrow-down"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="adsCol">
            <div className="adsContainer">
              <div className="ad">
                <a
                  href="https://wa.me/5493425202656"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ad} alt="paid ad" />
                </a>
              </div>
              <div className="ad">
                <a
                  href="https://wa.me/5493425202656"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ad} alt="paid ad" />
                </a>
              </div>
              <div className="ad">
                <a
                  href="https://wa.me/5493425202656"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ad} alt="paid ad" />
                </a>
              </div>
              <div className="ad">
                <a
                  href="https://wa.me/5493425202656"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ad} alt="paid ad" />
                </a>
              </div>
              <div className="ad">
                <a
                  href="https://wa.me/5493425202656"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ad} alt="paid ad" />
                </a>
              </div>
              <div className="visitors">
                <p>Visitantes: {visitors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
