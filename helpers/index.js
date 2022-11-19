import axios from "axios";
import Router from "next/router";

export const crearProductoCarrito = (datos) => {
  axios.post("http://localhost:1337/carritos", datos).then((response) => {
    // Recarga la pagina para que se actualize la table de usuarios
  });
};

export const modificarProductoCarrito = (id, nuevosDatos) => {
  axios
    .put(`http://localhost:1337/carritos/${id}`, nuevosDatos)
    .then((response) => {});
};

export const eliminarProductoCarrito = (id) => {
  axios.delete(`http://localhost:1337/carritos/${id}`).then(() => {
    Router.push("/carrito");
  });
};

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);

  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  return fechaNueva.toLocaleDateString("es-ES", opciones);
};
