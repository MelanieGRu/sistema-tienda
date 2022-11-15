import { Button, TextInput, Title, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/FormularioPeticiones.module.css';

const FormularioPeticiones = ({ categorias }) => {
  const { crearCategoria } = useAuth();
  const form = useForm({
    initialValues: { categoria: '' },

    validate: {
      categoria: (value) => (value === '' ? 'Debe introducir un nombre' : null),
    },
  });

  const { categoria } = form.values;

  const guardarCategoria = () => {
    const datos = {
      nombre: categoria.toUpperCase(),
    };
    crearCategoria(datos);
  };

  return (
    <div>
      <div className={styles.formulario}>
        <Title className={styles.formulario__titulo} align='center'>
          Crear Petición
        </Title>
        <form onSubmit={form.onSubmit(guardarCategoria)}>
          <TextInput
            label='Título'
            placeholder='Asunto de la petición'
            {...form.getInputProps('categoria')}
          />
          <Textarea
            placeholder='Motivo de la petición'
            label='Descripción'
            radius='md'
            minRows={2}
            autosize
          />
          <div className={styles.contenidoForm}>
            <Button type='submit' mt='sm'>
              Enviar
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.listaCategorias}></div>
    </div>
  );
};

export default FormularioPeticiones;
