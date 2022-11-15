import { Button, Group, Textarea, Title } from '@mantine/core';
import Layout from '../components/Layout';
import ProductoCarrito from '../components/ProductoCarrito';
import styles from '../styles/Carrito.module.css';

const Carrito = ({ productos }) => {
  return (
    <div>
      <Layout>
        <div className={styles.main}>
          <Title align='center'>Articulos en tu carrito</Title>
          <div>
            {productos.map((producto, index) => (
              <ProductoCarrito key={producto.id} producto={producto} />
            ))}
          </div>
          <Group className={styles.campos}>
            <Textarea
              autosize
              placeholder='Agregue un comentario (opcional)'
              minRows={2}
              className={styles.textarea}
            />
            <Button>Enviar Pedido</Button>
          </Group>
        </div>
      </Layout>
    </div>
  );
};

export default Carrito;

export async function getStaticProps() {
  const res = await fetch('http://localhost:1337/carritos');
  const productos = await res.json();

  return {
    props: {
      productos,
    },
  };
}
