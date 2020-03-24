const express = require("express");
const router = express.Router();
//@route GET api/contacts
//@desc Get contacts
//@access Private
router.get("/", (req, res) => {
  res.send("Get all contacts ");
});
//@route POST api/contacts
//@desc ADD contacts
//@access Private
router.post("/", (req, res) => {
  res.send("add contacts contacts ");
});

//@route PUT api/contacts/:id
//@desc Update contacts
//@access Private
router.put("/:id", (req, res) => {
  res.send("update a contact");
});

//@route PUT api/contacts/:id
//@desc delete contacts
//@access Private
router.delete("/:id", (req, res) => {
  res.send("delete a contact contacts ");
});

module.exports= router;
