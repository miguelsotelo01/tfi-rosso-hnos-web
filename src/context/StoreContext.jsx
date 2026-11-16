import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import { createLocalStorageStore } from "../services/persistence/localStorageStore";

const STORAGE_KEY = "rosso-hnos-store";
const SESSION_ROLE_KEY = "rosso-hnos-session-role";
const QUOTE_VALIDITY_MS = 72 * 60 * 60 * 1000;

const initialProducts = [
  {
    id: 1,
    code: "CEM-01",
    name: "Cemento Loma Negra 50kg",
    price: 10000,
    stock: 1500,
    reservedStock: 0,
    image:
      "https://media.istockphoto.com/id/1448349078/es/foto/bolsas-de-cemento-o-sacos-aislados-sobre-blanco.jpg?s=2048x2048&w=is&k=20&c=H0HldYgLckLZ1AMNk6qHYNCdoOQUltXzR4KWgyTKGZU=",
    active: true,
  },
  {
    id: 2,
    code: "LAD-02",
    name: "Ladrillo Hueco 18x18",
    price: 500,
    stock: 5000,
    reservedStock: 0,
    image:
      "https://acdn-us.mitiendanube.com/stores/003/143/779/products/whatsapp-image-2024-10-16-at-12-45-51-53c217ee574f070f5217404065580345-480-0.webp",
    active: true,
  },
  {
    id: 3,
    code: "CAÑ-03",
    name: "Caño PVC 110mm",
    price: 12500,
    stock: 0,
    reservedStock: 0,
    image:
      "https://www.ropelato.com.ar/7050-medium_default/1051701-Cano-pvc-cloacal-110-x-3-2-x-6m-con-junta-elastica.jpg",
    active: true,
  },
  {
    id: 4,
    code: "HIE-04",
    name: "Hierro Aletado 8mm",
    price: 8000,
    stock: 500,
    reservedStock: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmyk7GeqlNxppRBXfqJqKabiN9E3PKafxVixJ5mmbc4IbtwOYyHcvWWfh8&s=10",
    active: true,
  },
  {
    id: 5,
    code: "ARE-05",
    name: "Arena Fina x Metro",
    price: 7000,
    stock: 300,
    reservedStock: 0,
    image:
      "https://arcencohogar.vtexassets.com/arquivos/ids/315512/1269247-1.jpg?v=637820029448170000",
    active: true,
  },
  {
    id: 6,
    code: "CAL-06",
    name: "Cal Hidratada 25kg",
    price: 4500,
    stock: 800,
    reservedStock: 0,
    image:
      "https://arcencohogar.vtexassets.com/arquivos/ids/284491/1200232.jpg?v=639149012460600000",
    active: true,
  },
  {
    id: 7,
    code: "PEG-07",
    name: "Pegamento Klaukol",
    price: 6500,
    stock: 250,
    reservedStock: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvX6hKtYz00tMifN1xTyzOT_URrYjofx1Xq0B5TZrMWeidvDCsSOz74i4&s=10",
    active: true,
  },
  {
    id: 8,
    code: "CER-08",
    name: "Cerámico San Lorenzo",
    price: 12000,
    stock: 180,
    reservedStock: 0,
    image:
      "https://www.sagosa.com.ar/3220-thickbox_default/ceramica-san-lorenzo-flowers-black-natural-453x453-205-disc1.jpg",
    active: true,
  },
];

const initialStore = {
  products: initialProducts,
  quotes: [],
  orders: [],
  nextQuoteNumber: 10245,
};

const storePersistence = createLocalStorageStore({
  key: STORAGE_KEY,
  fallback: initialStore,
});

function readStore() {
  const loaded = storePersistence.load();
  const parsed =
    loaded && typeof loaded === "object" ? loaded : initialStore;
  return {
    ...initialStore,
    ...parsed,
    products: Array.isArray(parsed.products)
      ? parsed.products.map((product) => ({
          ...product,
          reservedStock: product.reservedStock || 0,
          active: product.active !== false,
        }))
      : initialStore.products,
    quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
    orders: Array.isArray(parsed.orders) ? parsed.orders : [],
  };
}

function isQuoteExpired(quote) {
  return Date.now() - new Date(quote.createdAt).getTime() >= QUOTE_VALIDITY_MS;
}

export function StoreProvider({ children }) {
  const [store, setStore] = useState(readStore);
  const [sessionRole, setSessionRoleState] = useState(
    () => localStorage.getItem(SESSION_ROLE_KEY) || "",
  );

  useEffect(() => {
    const syncStore = () => setStore(readStore());
    window.addEventListener("storage", syncStore);
    return () => {
      window.removeEventListener("storage", syncStore);
    };
  }, []);

  useEffect(() => {
    storePersistence.save(store);
  }, [store]);

  const updateStore = (updater) => {
    setStore(updater);
  };

  const setSessionRole = (role) => {
    if (role) {
      localStorage.setItem(SESSION_ROLE_KEY, role);
    } else {
      localStorage.removeItem(SESSION_ROLE_KEY);
    }
    setSessionRoleState(role);
  };

  const createQuote = (customer, items, branch) => {
    const quote = {
      id: store.nextQuoteNumber,
      number: store.nextQuoteNumber,
      customer,
      branch,
      items,
      subtotal: items.reduce((total, item) => total + item.total, 0),
      status: "Presupuesto generado",
      createdAt: new Date().toISOString(),
    };
    updateStore((current) => ({
      ...current,
      quotes: [...current.quotes, quote],
      nextQuoteNumber: current.nextQuoteNumber + 1,
    }));
    return quote;
  };

  const confirmQuote = (quoteId, payment, delivery) => {
    let result = { order: null, error: "" };
    updateStore((current) => {
      const quote = current.quotes.find((item) => item.id === quoteId);
      if (!quote || quote.status !== "Presupuesto generado") {
        result.error = "El presupuesto ya fue confirmado o no está disponible.";
        return current;
      }
      if (isQuoteExpired(quote)) {
        result.error = "El presupuesto venció. Generá uno nuevo para continuar.";
        return {
          ...current,
          quotes: current.quotes.map((item) =>
            item.id === quoteId ? { ...item, status: "Vencido" } : item,
          ),
        };
      }

      const insufficient = quote.items.find((item) => {
        const product = current.products.find(
          (currentProduct) => currentProduct.id === item.productId,
        );
        return !product || item.quantity > product.stock;
      });
      if (insufficient) {
        result.error = `No hay stock suficiente para ${insufficient.name}.`;
        return current;
      }

      const order = {
        id: quote.id,
        number: quote.number,
        customer: quote.customer,
        branch: quote.branch,
        items: quote.items,
        subtotal: quote.subtotal,
        payment: payment
          ? {
              method: "Tarjeta",
              holder: payment.holder,
              last4: payment.number.slice(-4),
            }
          : { method: "Pago contado" },
        delivery,
        status: "Pendiente",
        createdAt: new Date().toISOString(),
      };
      result.order = order;
      const quantities = new Map(
        quote.items.map((item) => [item.productId, item.quantity]),
      );
      return {
        ...current,
        quotes: current.quotes.map((item) =>
          item.id === quoteId ? { ...item, status: "Confirmado" } : item,
        ),
        orders: [...current.orders, order],
        products: current.products.map((product) => ({
          ...product,
          stock: product.stock - (quantities.get(product.id) || 0),
          reservedStock:
            product.reservedStock + (quantities.get(product.id) || 0),
        })),
      };
    });
    return result;
  };

  const updateOrderStatus = (orderId, status) => {
    const allowedTransitions = {
      Pendiente: "En Preparación",
      "En Preparación": "Listo para Retiro",
      "Listo para Retiro": "Entregado",
    };
    let updated = false;
    updateStore((current) => ({
      ...current,
      orders: current.orders.map((order) => {
        if (order.id !== orderId || allowedTransitions[order.status] !== status) {
          return order;
        }
        updated = true;
        return { ...order, status, deliveredAt: status === "Entregado" ? new Date().toISOString() : order.deliveredAt };
      }),
    }));
    if (updated && status === "Entregado") {
      updateStore((current) => {
        const order = current.orders.find((item) => item.id === orderId);
        if (!order || order.stockReleased) return current;
        const quantities = new Map(
          order.items.map((item) => [item.productId, item.quantity]),
        );
        return {
          ...current,
          orders: current.orders.map((item) =>
            item.id === orderId ? { ...item, stockReleased: true } : item,
          ),
          products: current.products.map((product) => ({
            ...product,
            reservedStock: Math.max(
              0,
              product.reservedStock - (quantities.get(product.id) || 0),
            ),
          })),
        };
      });
    }
    return updated;
  };

  const saveProducts = (products) => {
    updateStore((current) => ({
      ...current,
      products: products.map((product) => ({
        ...product,
        price: Math.max(0, Number(product.price) || 0),
        stock: Math.max(0, Number(product.stock) || 0),
        reservedStock: Math.max(0, Number(product.reservedStock) || 0),
      })),
    }));
  };

  const cancelQuote = (quoteId) => {
    updateStore((current) => ({
      ...current,
      quotes: current.quotes.map((quote) =>
        quote.id === quoteId && quote.status === "Presupuesto generado"
          ? { ...quote, status: "Cancelado" }
          : quote,
      ),
    }));
  };

  const exportData = () => JSON.stringify(store, null, 2);

  const importData = (json) => {
    const imported = JSON.parse(json);
    if (
      !imported ||
      !Array.isArray(imported.products) ||
      !Array.isArray(imported.quotes) ||
      !Array.isArray(imported.orders)
    ) {
      throw new Error("El archivo no contiene un respaldo válido.");
    }
    const nextStore = {
      ...initialStore,
      ...imported,
      products: imported.products,
    };
    storePersistence.save(nextStore);
    setStore(nextStore);
  };

  const value = {
    ...store,
    sessionRole,
    setSessionRole,
    createQuote,
    confirmQuote,
    updateOrderStatus,
    saveProducts,
    cancelQuote,
    exportData,
    importData,
    getOrder: (id) => store.orders.find((order) => order.id === Number(id)),
    getQuote: (id) => store.quotes.find((quote) => quote.id === Number(id)),
    getLatestQuote: () =>
      [...store.quotes].reverse().find(
        (quote) =>
          quote.status === "Presupuesto generado" && !isQuoteExpired(quote),
      ),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
