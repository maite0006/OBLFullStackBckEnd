const Multimedia = require("../multimedia.model.js");

const AllMultimedia = async () => {
  const multimedia = await Multimedia.find();
  return multimedia;
}
const FindByTitle = async (tituloBuscado) => 
{
    return await Multimedia.find({ titulo:{$regex:tituloBuscado, $options:'i' }  
    });
}
const eliminarMultimedia=async(id)=>{
    await Multimedia.findByIdAndDelete(id);
}

const createMultimedia = async (titulo,descripcion,tipo,duracion, temporadas,) => {
    if((tipo=='pelicula' || tipo=='corto')&& !duracion){
        throw new Error("La duracion es obligatoria para peliculas y cortos");
    }
    if(tipo=='serie' && !temporadas){ 
        throw new Error("Las temporadas son obligatorias para series");
    }

  const newMultimedia = new Multimedia({
    titulo: titulo,
    descripcion: descripcion,
    tipo: tipo,
    temporadas: temporadas,
    duracion: duracion
  });
  await newMultimedia.save();
};

module.exports = {
    AllMultimedia,
    createMultimedia,
    FindByTitle,
    eliminarMultimedia
};