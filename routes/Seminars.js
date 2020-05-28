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

const SeminarSchema = new Schema({
  _id: ObjectID,
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: String,
});

const SeminarModel = mongoose.model("seminars", SeminarSchema);

router.get("/", async (req, res) => {
  try {
    const respuesta = await SeminarModel.find();
    res.json({ mensaje: "listado seminarios", seminarios: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error", tipo: err });
  }
});


router.get("/:id", async(req, res) => {
    const id = req.params.id
    try {
     const respuesta =  await SeminarModel.findById(id);
     res.json({ mensaje: "seminario", semanario: respuesta });
    } catch (error) {
      res.status(500).json({ mensaje: "error", tipo: error });
    }
  });

  const NewSeminar = async (req, res) => {
    const urlImage = 'https://construcciones1backend.herokuapp.com/images/' + req.file.filename
    const seminarioNuevo = new SeminarModel({
      _id: new ObjectID(),
      title: req.body.title,
      description: req.body.description,
      image: urlImage
    });
  
    try {
      const respuesta = await seminarioNuevo.save();
      res.json({ mensaje: "seminario nuevo creado", seminario: respuesta });
    } catch (error) {
      res.status(500).json({ mensaje: "error al crear seminario", tipo: error });
    }
  };

router.post("/", upload.single('image'), NewSeminar)


// BORRAR SOLO UN ARCHIVO

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    try {
      const respuesta =  await SeminarModel.findByIdAndDelete(id);
      res.json({ mensaje: "seminario borrado", seminario: respuesta });
    } catch (error) {
      res.status(500).json({ mensaje: "error", tipo: error });
    }
  });
  
  module.exports = router;