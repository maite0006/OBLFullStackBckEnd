const Etiqueta=require("../etiqueta.model.js");


const allEtiquetas=async()=>{
    const etiquetas=await Etiqueta.find();
    return etiquetas;
}   
const createEtiqueta=async(nombre,descripcion)=>{

    const newEtiqueta=new Etiqueta({
        nombre:nombre      
        ,descripcion:descripcion
    });
    await newEtiqueta.save();
}

const eliminarEtiqueta=async(id)=>{
    await Etiqueta.findByIdAndDelete(id);
}

module.exports={
    allEtiquetas,
    createEtiqueta,
    eliminarEtiqueta
}

    
