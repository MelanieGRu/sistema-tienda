import { Group, Title } from '@mantine/core';
import Layout from '../components/Layout';
import ProductoEntrada from '../components/ProductoEntrada';
import styles from '../styles/Productos.module.css';

const Productos = ({ productos }) => {
  return (
    <div>
      <Layout>
        <Title align='center'>Lista de Productos</Title>
        <div className={styles.productos}>
          {productos.map((producto) => (
            <ProductoEntrada key={producto.id} producto={producto} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Productos;

export async function getStaticProps() {
  const res = await fetch('http://localhost:1337/productos');
  const productos = await res.json();

  return {
    props: {
      productos,
    },
  };
}
