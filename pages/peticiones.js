

import Layout from "../components/Layout";
import { useState } from "react";
import styles from "../styles/Peticiones.module.css";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  NumberInput,
  TextInput,
  Button,
  Textarea,
  Notification,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

const Peticiones = () => {
  const [mensaje, setMensaje] = useState("");
  const { user } = useAuth();

  const form = useForm({
    initialValues: { titulo: "", comentario: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      titulo: (value) =>
        value.length < 1 ? "Escribir un Titulo para la Petición" : null,
      comentario: (value) =>
        value.length < 1 ? "Escribir Descripción de la Petición" : null,
    },
  });

  const enviarPeticion = () => {
    setMensaje("");
    const titulo = form.values["titulo"];
    const comentario = form.values["comentario"];

    const datos = {
      comentario: comentario,
      usuario_id: String(user["id"]),
      estado: "espera",
      titulo: titulo,
    };

    axios.post("http://localhost:1337/pedidos", datos).then((response) => {
      form.values["titulo"] = "";
      form.values["comentario"] = "";
      setMensaje("Mensaje Enviado");
    });
  };

  return (
    <div>
      <Layout>
        <h1 className={styles.titulo}>Crear Peticion</h1>
        <form
          className={styles.form__peticion}
          onSubmit={form.onSubmit(enviarPeticion)}
        >
          <p className={styles.form__label}>Titulo</p>
          <TextInput
            placeholder="Escribir Titulo..."
            {...form.getInputProps("titulo")}
          />
          <p className={styles.form__label}>Descripcion</p>
          <Textarea
            mt="sm"
            autosize
            placeholder="Descripción de petición..."
            {...form.getInputProps("comentario")}
          />

          <Button className={styles.form__boton} type="submit" mt="sm">
            Enviar
          </Button>
        </form>
        {mensaje === "" ? null : (
          <Notification
            className={styles.notificacion}
            icon={<IconCheck size={18} />}
            color="teal"
            title="Petición Enviado"
            disallowClose
          >
            La petición se ha enviado. Pronto recibirá una respuesta.
          </Notification>
        )}
      </Layout>
    </div>
  );
};

export default Peticiones;
