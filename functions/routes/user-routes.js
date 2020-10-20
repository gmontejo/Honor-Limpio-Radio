const User = require("../models/user-model");
const Flyer = require("../models/flyerImg-model");
const mongoose = require("mongoose");
const express = require("express");
const { default: userEvent } = require("@testing-library/user-event");

const router = express.Router();

//CREATE A NEW POST ENTRY
router.put("/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  let startTime = new Date().getTime();

  const update = await User.findByIdAndUpdate(id, {
    $addToSet: {
      posts: {
        title: req.body.title,
        content: req.body.content,
        timestamp: req.body.timestamp,
        createdAt: req.body.createdAt,
      },
    },
  });

  res.json("todo ok");
  console.log(update);
  console.log(`New post entry took ${new Date().getTime() - startTime}`);
});

//CREATE A NEW VIDEO ENTRY
router.put("/new-video/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const update = await User.findByIdAndUpdate(id, {
    $addToSet: {
      videos: {
        title: req.body.title,
        comment: req.body.comment,
        videoCode: req.body.videoCode,
        videoID: req.body.videoID,
        timestamp: req.body.timestamp,
      },
    },
  });

  res.json("video added");
  console.log(update);
});

//CHANGE FLYER IMG
router.put("/flyer/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const update = await User.findByIdAndUpdate(id, {
    file: req.body.file,
  });

  res.end();
});

//ADD SHOW RECORDING
router.put("/show-recording/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const update = await User.findByIdAndUpdate(id, {
    $addToSet: {
      showRecordings: {
        recordingCode: req.body.recordingCode,
        timestamp: req.body.timestamp,
      },
    },
  });

  res.json("recording added");
});

//GET ALL SHOW RECORDINGS
router.get("/show-recording/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const query = await User.find({ _id: id }).select("showRecordings -_id");

  console.log(query[0]);

  res.json(query[0]);
});

//Get Flyer
router.get("/flyer/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const query = await User.find({ _id: id }).select("file -_id");

  res.json(query[0]);
});

//GET ALL BLOG POSTS
router.get("/:id", async (req, res) => {
  let startTime = new Date().getTime();

  const id = mongoose.Types.ObjectId(req.params.id);

  const posts = await User.findById(id);

  res.json(posts.posts);
  console.log(`Gathering the posts took ${new Date().getTime() - startTime}`);
});

//GET AL VIDEO UPLOADS
router.get("/videos/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const query = await User.find({ _id: id }).select("videos -_id");

  res.json(query[0]);
});

//CREATE A NEW USER
router.post("/", async (req, res) => {
  const newUser = new User({
    name: "radioAdmin",
    posts: [],
  });

  const agregarUser = await newUser.save();

  console.log(agregarUser);
  res.send("se agregó un usuario");
});

//NEW VISITOR
router.get("/visitor/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const query = await User.find({ _id: id }).select("visitorCount -_id");

  res.send(query[0]);
});

//ADD A NEW VISITOR
router.put("/visitor/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const update = await User.findByIdAndUpdate(id, {
    visitorCount: req.body.visitorCount,
  });
  res.json("visitors updated");
});

module.exports = router;
