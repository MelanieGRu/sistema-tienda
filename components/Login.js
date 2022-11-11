import Layout from "./Layout";
import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  UnstyledButton,
  Notification,
  PasswordInput,
} from "@mantine/core";
import styles from "../styles/Login.module.css";

import { useState } from "react";
import { IconX } from "@tabler/icons";
import { useAuth } from "../context/AuthContext";

const Login = ({ usuarios }) => {
  const { user, login } = useAuth();

  const [mensajeError, setMensajeError] = useState(null);

  const form = useForm({
    initialValues: { correo: "", clave: "" },
  });

  const iniciarSesion = async () => {
    setMensajeError(null);
    const correo = form.values["correo"];
    const clave = form.values["clave"];
    if (correo === "" || clave === "") {
      setMensajeError("Introducir valores para todos los campos");
      return;
    }

    const entrar = await login(correo, clave);

    if (!entrar) {
      console.log("NO SE ENTRO");
      setMensajeError("No se pudo ingresar");
    } else {
      setMensajeError(null);
    }
  };

  return (
    <div>
      <div className={styles.login}>
        <form
          className={styles.formulario}
          onSubmit={form.onSubmit(iniciarSesion)}
        >
          <h1 className={styles.formulario__titulo}>
            Sistema de Pedido de Material
          </h1>
          <p className={styles.formulario__label}>Correo Electrónico</p>
          <TextInput
            placeholder="Correo electrónico..."
            type="email"
            {...form.getInputProps("correo")}
          />
          <p className={styles.formulario__label}>Contraseña</p>
          <PasswordInput
            placeholder="Contraseña..."
            {...form.getInputProps("clave")}
          />

          {mensajeError === null ? null : (
            <Notification
              className={styles.notificacion}
              icon={<IconX size={18} />}
              color="red"
              disallowClose
            >
              {mensajeError}
            </Notification>
          )}

          <UnstyledButton
            className={styles.formulario__boton}
            type="submit"
            mt="sm"
          >
            Entrar
          </UnstyledButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
