export function createLocalStorageStore({ key, fallback }) {
  const load = () => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (error) {
      console.error(`No se pudo leer el almacenamiento local "${key}".`, error);
      return fallback;
    }
  };

  const save = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`No se pudo guardar el almacenamiento local "${key}".`, error);
      throw new Error("No se pudieron guardar los datos localmente.", {
        cause: error,
      });
    }
  };

  return { load, save };
}
