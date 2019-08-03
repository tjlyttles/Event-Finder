const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Event = require("../models/Event");

router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find({ attendId: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.get("/", auth, async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: -1 });
//     res.json(events);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      location,
      groupSize,
      start,
      end,
      category,
      description,
      attendingId,
      pendingId
    } = req.body;

    try {
      const newEvent = new Event({
        name,
        location,
        groupSize,
        start,
        end,
        category,
        description,
        attendingId,
        pendingId,
        user: req.user.id
      });
      const event = await newEvent.save();
      const response = await User.findByIdAndUpdate(req.user.id, {
        $push: { attendId: event._id }
      });
      if (response.isModified) {
        res.json(event);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  console.log(req.user.id);
  const {
    name,
    location,
    groupSize,
    start,
    end,
    category,
    description,
    attendingId,
    pendingId
  } = req.body;

  const eventFields = {};
  if (name) eventFields.name = name;
  if (location) eventFields.location = location;
  if (groupSize) eventFields.groupSize = groupSize;
  if (start) eventFields.start = start;
  if (end) eventFields.end = end;
  if (category) eventFields.category = category;
  if (description) eventFields.description = description;
  if (attendingId) eventFields.attendingId = attendingId;
  if (pendingId) eventFields.pendingId = pendingId;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: "Event not found" });

    // Make sure user owns event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    );
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: "Event not found" });

    // Make sure user owns event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Event.findByIdAndRemove(req.params.id);
    res.json({ msg: "Event removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
