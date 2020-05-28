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

const PublicitySchema = new Schema({
  _id: ObjectID,
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: String
});

const PublicityModel = mongoose.model("publicitie", PublicitySchema);

router.get("/", async (req, res) => {
  try {
    const respuesta = await PublicityModel.find();
    res.json({ mensaje: "listado publicidad", publicidad: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error", tipo: err });
  }
});


router.get("/:id", async(req, res) => {
    const id = req.params.id
    try {
     const respuesta =  await PublicityModel.findById(id);
     res.json({ mensaje: "publicidad", publicidad: respuesta });
    } catch (error) {
      res.status(500).json({ mensaje: "error", tipo: error });
    }
  });

const newPublicity = async (req, res) => {
  const urlImage = 'http://localhost:3000/images/' + req.file.filename
  const publicityNuevo = new PublicityModel({
    _id: new ObjectID(),
    title: req.body.title,
    description: req.body.description,
    image: urlImage
  });

  try {
    const respuesta = await publicityNuevo.save();
    res.json({ mensaje: "publicidad nueva creada", publicidad: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error al crear publicidad", tipo: error });
  }
};

router.post("/", upload.single('image'), newPublicity)


// BORRAR SOLO UN ARCHIVO

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    try {
      const respuesta =  await PublicityModel.findByIdAndDelete(id);
      res.json({ mensaje: "publicidad borrado", publicidad: respuesta });
    } catch (error) {
      res.status(500).json({ mensaje: "error", tipo: error });
    }
  });
  
module.exports = router;