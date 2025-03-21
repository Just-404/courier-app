const pacaService = require("../services/PacaService");
const { upload } = require("../utils/cloudinary");
const { cloudinary } = require("../utils/cloudinary");
const asyncHandler = require("express-async-handler");

const getPacas = asyncHandler(async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * limit;
    const pacas = await pacaService.getPacas(offset, parseInt(limit));

    res.status(200).json({ pacas });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error getting pacas" });
  }
});

const addPaca = asyncHandler(async (req, res) => {
  try {
    const imgUrl = req.file ? req.file.path : null;
    const newPaca = await pacaService.addPaca(req.body, imgUrl);

    res.status(201).json({
      msg: "Paca added successfully!",
      paca: newPaca,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error adding paca" });
  }
});

const updatePaca = asyncHandler(async (req, res) => {
  try {
    const paca = await pacaService.getPacaByID(req.params.id);
    if (!paca) {
      return res.status(404).json({ error: "Paca not found" });
    }

    let imageUrl = paca.img_url;
    if (req.file) {
      if (paca.img_url) {
        const cloudPublicId = paca.img_url.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`Pacas/${cloudPublicId}`);
      }
      imageUrl = req.file.path;
    }

    const updatedPaca = await pacaService.updatePaca(
      req.params.id,
      req.body,
      imageUrl
    );

    res.status(200).json({
      msg: "Paca updated successfully!",
      paca: updatedPaca,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error updating paca" });
  }
});

const deletePaca = asyncHandler(async (req, res) => {
  try {
    const paca = await pacaService.getPacaByID(req.params.id);
    if (!paca) {
      return res.status(404).json({ error: "Paca Not Found" });
    }

    if (paca.imageUrl) {
      const cloudPublicId = paca.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`Pacas/${cloudPublicId}`);
    }
    await pacaService.deletePaca(req.params.id);

    res.status(200).json({ msg: "Paca deleted!" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error deleting paca" });
  }
});

module.exports = {
  getPacas,
  addPaca: [upload.single("image"), addPaca],
  updatePaca: [upload.single("image"), updatePaca],
  deletePaca,
};
