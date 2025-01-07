const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/:senderId/:recipientId', async (req, res) => {
  try {
    const { senderId, recipientId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId }
      ]
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { sender, recipient, text } = req.body;
    const message = new Message({ sender, recipient, text });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
