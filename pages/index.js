import { Button, Card, Grid, Group, Text, Title } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import Login from "../components/Login";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Index.module.css";
import { useAuth } from "../context/AuthContext";

export default function Home({ usuarios }) {
  const { user } = useAuth();

  if (user === null) {
    return <Login usuarios={usuarios} />;
  }

  return (
    <Layout>
      <div className={styles.cuadros}>
        <Card className={styles.card} shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="/assets/img/inventario.jpg"
              width={1920}
              height={1080}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Title>Productos</Title>
          </Group>

          <Text size="m" color="dimmed" className={styles.resumen}>
            En esta sección podrá ver el inventario de la empresa, así como
            agregar, editar y eliminar productos.
          </Text>

          <Link href="/productos">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Revisar productos
            </Button>
          </Link>
        </Card>
        <Card className={styles.card} shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="/assets/img/categorias.jpg"
              width={1920}
              height={1080}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Title>Carrito</Title>
          </Group>

          <Text size="m" color="dimmed" className={styles.resumen}>
            En esta sección se pueden agregar, editar y eliminar categorías de
            los productos del inventario.
          </Text>

          <Link href="/carrito">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Ver carrito
            </Button>
          </Link>
        </Card>
        <Card className={styles.card} shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="/assets/img/pedidos.jpg"
              width={1920}
              height={1080}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Title>Peticiones</Title>
          </Group>

          <Text size="m" color="dimmed" className={styles.resumen}>
            En esta sección se podrá ver los pedidos que se han realizado y
            llevar un control de los mismos.
          </Text>

          <Link href="/peticiones">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Revisar peticiones
            </Button>
          </Link>
        </Card>
        <Card className={styles.card} shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="/assets/img/usuarios.jpg"
              width={1920}
              height={1080}
              radius="md"
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Title>Pedidos</Title>
          </Group>

          <Text size="m" color="dimmed" className={styles.resumen}>
            En esta sección se pueden agregar, editar y eliminar usuarios.
          </Text>

          <Link href="/pedidos">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Revisar pedidos
            </Button>
          </Link>
        </Card>

        <Card className={styles.card} shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="/assets/img/usuarios.jpg"
              width={1920}
              height={1080}
              radius="md"
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Title>Mi cuenta</Title>
          </Group>

          <Text size="m" color="dimmed" className={styles.resumen}>
            En esta sección se pueden agregar, editar y eliminar usuarios.
          </Text>

          <Link href="/cuenta">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Modificar cuenta
            </Button>
          </Link>
        </Card>
      </div>
    </Layout>
  );
}
