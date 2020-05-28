const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;

const InformationTeachersSchema = new Schema({
  _id: ObjectID,
  titulo: String,
  descripsion: String,
},
{timestamps: true},
);

const InformationTeachersModel = mongoose.model("informationTeachers", InformationTeachersSchema);

router.get("/", async(req, res) => {
  try {
   const respuesta =  await InformationTeachersModel.find().sort({createdAt: 'desc'});
   res.json({ mensaje: "listado informacion", informacion: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error", tipo: err });
  }
});


router.get("/:id", async(req, res) => {
  const id = req.params.id
  try {
   const respuesta =  await InformationTeachersModel.findById(id);
   res.json({ mensaje: "listado informacion", informacion: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error", tipo: error });
  }
});


router.post("/", async (req, res) => {
  const informationTeachersNuevo = new InformationTeachersModel({
    _id: new ObjectID(),
    titulo: req.body.titulo,
    descripsion: req.body.descripsion,
  });

  try {
    const respuesta = await informationTeachersNuevo.save();
    res.json({ mensaje: "informacion nueva creado", documento: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error al crear informacion", tipo: error });
  }
});

// BORRAR SOLO UN ARCHIVO

router.delete("/:id", async(req, res) => {
  const id = req.params.id;
  try {
    const respuesta =  await InformationTeachersModel.findByIdAndDelete(id);
    res.json({ mensaje: "informacion borradas", informacion: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error", tipo: error });
  }
});


module.exports = router;
