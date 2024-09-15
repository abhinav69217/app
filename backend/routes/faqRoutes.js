const express = require("express");
const Faq = require("../models/Faq.js");
const router = express.Router();

router.get("/faqs", async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/faqs/:id", async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json(faq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/faqs", async (req, res) => {
  const faq = new Faq({
    question: req.body.question,
    answer: req.body.answer,
  });
  try {
    const newFaq = await faq.save();
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/faqs/:id", async (req, res) => {
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedFaq) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json(updatedFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/faqs/:id", async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
