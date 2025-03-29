const pacaService = require("../services/PacaService");
const { upload } = require("../utils/cloudinary");
const { cloudinary } = require("../utils/cloudinary");
const asyncHandler = require("express-async-handler");
const { Role } = require("../utils/enums");

const getPacas = asyncHandler(async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * limit;

    let pacas, totalPacas;

    if (res.locals.currentUser.role === Role.PROVIDER) {
      pacas = await pacaService.getPacasByProvider(
        req.query.provider_id,
        offset,
        parseInt(limit)
      );
      totalPacas = await pacaService.countPacas();
    } else {
      pacas = await pacaService.getPacas(offset, parseInt(limit));
      totalPacas = await pacaService.countPacas();
    }

    res.status(200).json({ pacas, total: totalPacas });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error getting pacas" });
  }
});

const addPaca = asyncHandler(async (req, res) => {
  try {
    const imgUrl = req.file ? req.file.path : "";

    const quantity = parseInt(req.body.quantity, 10);
    if (isNaN(quantity)) {
      return res.status(400).json({ error: "Invalid quantity value" });
    }

    const weight = parseFloat(req.body.weight);
    if (isNaN(weight)) {
      return res.status(400).json({ error: "Invalid weight value" });
    }

    const price = parseFloat(req.body.price);
    if (isNaN(price)) {
      return res.status(400).json({ error: "Invalid price value" });
    }

    const newPaca = await pacaService.addPaca({
      name: req.body.name,
      description: req.body.description,
      weight: weight,
      price: price,
      quantity: quantity,
      status: req.body.status || "AVAILABLE",
      img_url: imgUrl,
      provider_id: res.locals.currentUser.id,
    });

    res.status(201).json({
      msg: "Paca added successfully!",
      paca: newPaca,
    });
  } catch (error) {
    if (imgUrl) {
      const publicId = imgUrl.split("/").pop().split(".")[0];

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.error(
          "Error deleting image from Cloudinary:",
          deleteError.message
        );
      }
    }
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
    delete req.body.imgFile;
    console.log(req.body);

    const updatedPaca = await pacaService.updatePaca(req.params.id, req.body);

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
