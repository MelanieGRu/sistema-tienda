import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Layout.module.css";
import Login from "./Login";

import {
  AppShell,
  Navbar,
  Header,
  UnstyledButton,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Divider,
} from "@mantine/core";
import { IconBellRinging } from "@tabler/icons";

const Layout = ({ children, setProductoInfo }) => {
  // Router para determinar en qué página nos encontramos
  const { user, logout, mostrarCampana } = useAuth();
  const router = useRouter();

  // Variables para la responsividad del AppShell
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  if (user === null || user == undefined) {
    return <Login />;
  }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          {/* Botones del menu en AppShell que
           nos redirigen a otras pantallas */}
          <Link href="/">
            <div
              className={
                router.pathname === "/"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Inicio
            </div>
          </Link>

          <Link href="/productos">
            <div
              className={
                router.pathname === "/productos"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Productos
            </div>
          </Link>

          <Link href="/carrito">
            <div
              className={
                router.pathname === "/carrito"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              <div className={styles.texto__icono}>
                Carrito
                {mostrarCampana == false ? null : (
                  <IconBellRinging size={35} className={styles.icono} />
                )}
              </div>
            </div>
          </Link>

          <Link href="/peticiones">
            <div
              className={
                router.pathname === "/peticiones"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Peticiones
            </div>
          </Link>

          <Link href="/pedidos">
            <div
              className={
                router.pathname === "/pedidos"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Mis pedidos
            </div>
          </Link>

          <Link href="/cuenta">
            <div
              className={
                router.pathname === "/cuenta"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Mi cuenta
            </div>
          </Link>

          {/* Boton para cerrar sesion */}
          <Divider />
          <UnstyledButton
            onClick={logout}
            className={styles.boton__cerrar__sesion}
          >
            Cerrar Sesión
          </UnstyledButton>
        </Navbar>
      }
      header={
        <Header height={50}>
          <div className={styles.layout__header}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            {/* Contenido del header de
            AppShell */}
            <div className={styles.header__contenido}>
              <Text className={styles.layout__header__texto}>
                <Link href="/">Sistema de Pedidos</Link>
              </Text>
            </div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
