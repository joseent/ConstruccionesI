const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
 
var upload = multer({ storage: storage })

const ClassPicSchema = new Schema({
  _id: ObjectID,
  title: {
    type: String,
  },
  image: String,
});

const ClassPicModel = mongoose.model("classpicture", ClassPicSchema);

router.get("/", async (req, res) => {
  try {
    const respuesta = await ClassPicModel.find();
    res.json({ mensaje: "listado fotos", fotos: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error", tipo: err });
  }
});


router.get("/:id", async(req, res) => {
    const id = req.params.id
    try {
     const respuesta =  await ClassPicModel.findById(id);
     res.json({ mensaje: "foto", foto: respuesta });
    } catch (error) {
      res.status(500).json({ mensaje: "error", tipo: error });
    }
  });

const newClassPicture =  async (req, res) => {
  const urlImage = 'https://construcciones1backend.herokuapp.com/images/' + req.file.filename
  const fotoNuevo = new ClassPicModel({
    _id: new ObjectID(),
    title: req.body.title,
    image: urlImage
  });

  try {
    const respuesta = await fotoNuevo.save();
    res.json({ mensaje: "foto nueva creada", foto: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error al crear foto", tipo: error });
  }
};

router.post("/", upload.single('image'), newClassPicture)


// BORRAR SOLO UN ARCHIVO

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    try {
      const respuesta =  await ClassPicModel.findByIdAndDelete(id);
      res.json({ mensaje: "foto borrada", foto: respuesta });
    } catch (error) {
      res.status(500).json({ mensaje: "error", tipo: error });
    }
  });
  
  module.exports = router;