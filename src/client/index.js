import axios from "axios";

const baseUrl = "https://us-central1-honor-limpio.cloudfunctions.net/app";

//get youtube videos
export const getVideos = async () => {
  const query = await axios.get(
    `${baseUrl}/radio/videos/5f6f842634ad5b0fc0c21375`
  );

  return query;
};

//gets next show flyer
export const getFlyer = async () => {
  const flyer = await axios.get(
    `${baseUrl}/radio/flyer/5f6f842634ad5b0fc0c21375`
  );

  return flyer;
};

//gets all saved recordings
export const getRecordings = async () => {
  const query = await axios.get(
    `${baseUrl}/radio/show-recording/5f6f842634ad5b0fc0c21375`
  );

  return query;
};

//gets all blogs entries
export const getPosts = async () => {
  const postQuery = await axios.get(
    `${baseUrl}/radio/5f6f842634ad5b0fc0c21375`
  );
  return postQuery;
};

//uploads a new flyer
export const submitFlyer = async (img) => {
  await axios.put(`${baseUrl}/radio/flyer/5f6f842634ad5b0fc0c21375`, {
    file: Buffer.from(img),
  });
};

//uploads a new blog entry
export const submitPost = async (title, delta, createdAt, timestamp) => {
  await axios.put(`${baseUrl}/radio/5f6f842634ad5b0fc0c21375`, {
    title: title,
    content: delta,
    createdAt: createdAt,
    timestamp: timestamp,
  });
};

//uploads a new show recording
export const submistShow = async (showRecording, timestamp) => {
  await axios.put(`${baseUrl}/radio/show-recording/5f6f842634ad5b0fc0c21375`, {
    recordingCode: showRecording,
    timestamp: timestamp,
  });
};

//uploads a new youtube video
export const submitVideo = async (
  title,
  comment,
  videoCode,
  videoID,
  timestamp
) => {
  await axios.put(`${baseUrl}/radio/new-video/5f6f842634ad5b0fc0c21375`, {
    title: title,
    comment: comment,
    videoCode: videoCode,
    videoID: videoID,
    timestamp: timestamp,
  });
};

//new visitor entry

export const newVisitor = async () => {
  const visitorQuery = await axios.get(
    `${baseUrl}/radio/visitor/5f6f842634ad5b0fc0c21375`
  );

  const visitorUpdate = visitorQuery.data.visitorCount + 1;

  await axios.put(`${baseUrl}/radio/visitor/5f6f842634ad5b0fc0c21375`, {
    visitorCount: visitorUpdate,
  });

  return visitorUpdate;
};
