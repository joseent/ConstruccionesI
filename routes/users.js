const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;
const bcryptjs = require("bcryptjs");

const encriptarPassWord = password =>{
const saltos = bcryptjs.genSaltSync(2);
const passwordEncriptado = bcryptjs.hashSync(password,saltos);
return passwordEncriptado
};

const compararPassword = (userPassword, hashPasswordDb) => bcryptjs.compareSync(userPassword, hashPasswordDb)

const UsuarioSchema = new Schema({
  _id: ObjectID,
  usuario: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
    unique: true,
  },
  contrasena: {
    type:String,
    required: [true, "can't be blank"]
  },
  nombre: String,
  apellido: String,
  dni: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 8,
    unique: true,
  },
  libreta: { type: String, maxlength: 9, minlength: 9 },
  mail: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
  },
  image: String,
  comision: String,
    inscripto: Boolean
});


// metodos
const UsuarioModel = mongoose.model("users", UsuarioSchema);

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const respuesta = await UsuarioModel.findById(id);
    res.json({ mensaje: "usuario", usuario: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error", tipo: error });
  }
});


// // registrar usuario
router.post("/registrar", async (req, res) => {
   console.log("entrando a registrar");
   
  const usuarioNuevo = {
    _id: new ObjectID(),
    usuario:req.body.usuario,
    contrasena:req.body.contrasena,
    nombre: req.body.nombre || null,
    apellido: req.body.apellido || null,
    dni: req.body.dni,
    libreta: req.body.libreta || null,
    mail: req.body.mail,

    comision: "none",
    inscripto: false
  };

usuarioNuevo.contrasena = encriptarPassWord(req.body.contrasena);
console.log(usuarioNuevo.contrasena);


try {
  const user = new UsuarioModel(usuarioNuevo);
    const respuesta = await user.save();
    res.json({
      mensaje: "usuario registrado correctamente",
      documento: respuesta,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ mensaje: "error al crear usuario", tipo: error });
  }
});


// logear usuario
router.post("/login", async (req, res) => {
  try {
    const {usuario,contrasena}= req.body;
    const doc = await UsuarioModel.find({usuario});
    const hashDb = doc[0].contrasena;
    const esContrasenaCorrecta = compararPassword(contrasena, hashDb)
   
    if (esContrasenaCorrecta) {
      res.json({mensaje: "ingresado correctamente", respuesta: doc})
    }else {
      res.status(401).json({ mensaje: "contraseña incorrecta" });
    }

  } catch (error) {
    res.status(500).json({ mensaje: "error al conectar usuario", tipo: error });
  }
});




router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const informacionModificadas = req.body;
  try {
    const respuesta = await UsuarioModel.findByIdAndUpdate(
      id,
      informacionModificadas
    );
    res.json({ mensaje: "informacion modificada", informacion: respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "error", tipo: error });
  }
});

module.exports = router;
