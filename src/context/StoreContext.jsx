import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";

const STORAGE_KEY = "rosso-hnos-store";

const initialProducts = [
  {
    id: 1,
    code: "CEM-01",
    name: "Cemento Loma Negra 50kg",
    price: 10000,
    stock: 1500,
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

function readStore() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialStore;
  } catch {
    return initialStore;
  }
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function StoreProvider({ children }) {
  const [store, setStore] = useState(readStore);

  useEffect(() => {
    const syncStore = () => setStore(readStore());
    window.addEventListener("storage", syncStore);
    return () => {
      window.removeEventListener("storage", syncStore);
    };
  }, []);

  const updateStore = (updater) => {
    setStore((current) => {
      const next = updater(current);
      saveStore(next);
      return next;
    });
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
    let confirmedOrder;
    updateStore((current) => {
      const quote = current.quotes.find((item) => item.id === quoteId);
      if (!quote) {
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
      confirmedOrder = order;
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
        })),
      };
    });
    return confirmedOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    updateStore((current) => ({
      ...current,
      orders: current.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    }));
  };

  const saveProducts = (products) => {
    updateStore((current) => ({ ...current, products }));
  };

  const value = {
    ...store,
    createQuote,
    confirmQuote,
    updateOrderStatus,
    saveProducts,
    getOrder: (id) => store.orders.find((order) => order.id === Number(id)),
    getLatestQuote: () => store.quotes[store.quotes.length - 1],
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
