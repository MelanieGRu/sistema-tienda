import { UnstyledButton, Button } from "@mantine/core";
import React, { use, useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Cuenta.module.css";
import { useForm } from "@mantine/form";
import axios from "axios";
import { NumberInput, TextInput } from "@mantine/core";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

const Cuenta = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [notificacion, setNotificacion] = useState("");
  const [claveCambiada, setClaveCambiada] = useState("");
  const form = useForm({
    initialValues: { clave: "", clave2: "" },
  });

  const [mostrarClave, setMostrarClave] = useState(false);

  const cambiarMostrarClave = () => {
    setMostrarClave(!mostrarClave);
  };

  if (user == null || user == undefined) {
    return <Layout></Layout>;
  }

  const cambiarClave = async () => {
    setClaveCambiada("");
    setNotificacion("");
    const clave = form.values["clave"];
    const clave2 = form.values["clave2"];
    if (clave.length < 1) {
      setNotificacion("Introducir una contraseña");
      return;
    }

    if (clave !== clave2) {
      setNotificacion("Las contraseñas deben ser iguales");
      return;
    }

    const datos = {
      clave: clave,
    };

    axios
      .put(`http://localhost:1337/usuarios/${user["id"]}`, datos)
      .then((response) => {
        form.values["clave"] = "";
        form.values["clave2"] = "";
        setNotificacion("");
        setClaveCambiada("Tu contraseña se ha modificado");
      });
  };

  return (
    <Layout>
      <div className={styles.cuadro__cuenta}>
        <h1 className={styles.titulo}>Mi Cuenta</h1>
        <div className={styles.cuadro__dato}>
          <p className={styles.cuadro__dato__label}>
            Nombre Completo:{" "}
            <span className={styles.italic}>{user["nombre"]}</span>
          </p>
        </div>
        <div className={styles.cuadro__dato}>
          <p className={styles.cuadro__dato__label}>
            Correo Electrónico:{" "}
            <span className={styles.italic}>{user["correo"]}</span>
          </p>
        </div>
        <div className={styles.cuadro__dato}>
          <p className={styles.cuadro__dato__label}>
            Perfil: <span className={styles.italic}>{user["perfil"]}</span>
          </p>
        </div>
        <div className={styles.cuadro__dato}>
          <p className={styles.cuadro__dato__label}>
            Num. Telefónico:{" "}
            <span className={styles.italic}>{user["telefono"]}</span>
          </p>
        </div>

        <p className={styles.cuadro__dato__label}>Cambiar Contraseña</p>
        <form onSubmit={form.onSubmit(cambiarClave)}>
          <TextInput
            placeholder="Escribir Nueva Contraseña"
            type="password"
            {...form.getInputProps("clave")}
          />
          <TextInput
            mt="sm"
            placeholder="Escribir Contraseña otra vez..."
            type="password"
            {...form.getInputProps("clave2")}
          />

          {notificacion == "" ? null : (
            <Notification icon={<IconX size={18} />} disallowClose color="red">
              Error! {notificacion}
            </Notification>
          )}

          {claveCambiada == "" ? null : (
            <Notification
              icon={<IconCheck size={18} />}
              disallowClose
              color="green"
            >
              {claveCambiada}
            </Notification>
          )}

          <UnstyledButton
            className={styles.boton__cambiar}
            type="submit"
            mt="sm"
          >
            Actualizar
          </UnstyledButton>
        </form>
      </div>
    </Layout>
  );
};

export default Cuenta;
