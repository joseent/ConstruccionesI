const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;

const InscriptionSchema = new Schema({
  _id: ObjectID,
  habilitado: Boolean,
});

const InscriptionModel = mongoose.model("inscription", InscriptionSchema);


router.get("/:id", async(req, res) => {
  const id = req.params.id
  try {
   const respuesta =  await InscriptionModel.findById(id);
   res.json({ mensaje: "inscription", inscription: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error", tipo: error });
  }
});


// // SOLO PARA DOCENTES
// router.post("/", async (req, res) => {
//   const inscriptionNuevo = new InscriptionModel({
//     _id: new ObjectID(),
//     habilitado: false
       
//   });

//   try {
//     const respuesta = await inscriptionNuevo.save();
//     res.json({ mensaje: "informacion nueva creado", documento: respuesta });
//   } catch (error) {
//     res.status(500).json({ mensaje: "error al crear informacion", tipo: error });
//   }
// });

module.exports = router;
