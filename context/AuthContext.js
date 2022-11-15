const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pro, setPro] = useState([]);

  const login = async (correo, clave) => {
    const res = await fetch('http://localhost:1337/usuarios');
    const usuarios = await res.json();

    let entro = false;
    setLoading(true);
    // Revisando si existe un usuario con la combinacion de correo y contraseña
    usuarios.forEach(function (usuario) {
      if (
        usuario['correo'] === correo &&
        usuario['clave'] === clave &&
        usuario['rol'] === 'admin'
      ) {
        setUser(usuario);
        entro = true;
        return;
      }
    });
    setLoading(false);
    console.log(entro);
    return entro;
  };

  const logout = () => {
    setUser(null);
    Router.push('/');
  };

  const modificar = (id, nuevosDatos, setUsuarios) => {
    setLoading(true);
    axios
      .put(`http://localhost:1337/usuarios/${id}`, nuevosDatos)
      .then((response) => {
        setUser(nuevosDatos);
        setLoading(false);
        Router.push('/usuarios');
      });
  };

  const eliminar = (id) => {
    setLoading(true);
    axios.delete(`http://localhost:1337/usuarios/${id}`).then(() => {
      setLoading(false);
      if (user['id'] === id) {
        setUser(null);
        Router.push('/');
        return;
      }
      Router.push('/usuarios');
    });
  };

  const crearCuenta = (datos) => {
    setLoading(true);
    axios.post('http://localhost:1337/usuarios', datos).then((response) => {
      // Recarga la pagina para que se actualize la table de usuarios
      setLoading(false);
      Router.push('/usuarios');
    });
  };

  const crearCategoria = (datos) => {
    setLoading(true);
    axios.post('http://localhost:1337/categorias', datos).then((response) => {
      // Recarga la pagina para que se actualize la table de usuarios
      setLoading(false);
      Router.push('/categorias');
    });
  };

  // const crearProducto = (datos) => {
  //   setLoading(true);
  //   axios.post('http://localhost:1337/productos', datos).then((response) => {
  //     // Recarga la pagina para que se actualize la table de usuarios
  //     setLoading(false);
  //     Router.push('/inventario');
  //   });
  // };

  const crearProducto = (datos) => {
    setLoading(true);

    axios.post('http://localhost:1337/productos', datos).then((response) => {
      // Recarga la pagina para que se actualize la table de usuarios
      setLoading(false);
      Router.push('/inventario');
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        modificar,
        eliminar,
        crearCuenta,
        crearCategoria,
        crearProducto,
        pro,
        setPro,
      }}
    >
      {loading ? (
        <LoadingOverlay
          loaderProps={{ size: 'sm', color: 'blue', variant: 'bars' }}
          overlayOpacity={0.3}
          overlayColor='#c5c5c5'
          visible
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
