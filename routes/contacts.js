const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../modals/User");
const Contact = require("../modals/Contact");
const auth = require("../middleware/auth");

//@route GET api/contacts
//@desc Get contacts
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
});
//@route POST api/contacts
//@desc ADD contacts
//@access Private
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(er.msg);
      res.status(500).send("Server error");
    }
  }
);

//@route PUT api/contacts/:id
//@desc Update contacts
//@access Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (phone) contactFields.phone = phone;
  if (email) contactFields.email = email;
  if (type) contactFields.type = type;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    //Make user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//@route DELETE api/contacts/:id
//@desc delete contacts
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact =await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not Found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    return res.status(200).json({ msg: "Contact has been deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
