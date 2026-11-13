// Cart state in React Context, persisted to localStorage after mount.
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products.js';
import { unitPrice } from '../lib/format.js';

const CartContext = createContext(null);
const KEY = 'sw-cart';

/** @param {{children:import('react').ReactNode}} props */
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(KEY)) ?? []); } catch { setItems([]); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(KEY, JSON.stringify(items)); }, [items, ready]);

  const value = useMemo(() => {
    const lines = items.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((l) => l.product);
    const same = (a, b) => a.id === b.id && a.size === b.size;
    return {
      lines, open, setOpen,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((s, l) => s + unitPrice(l.product) * l.qty, 0),
      add: (id, size = '', qty = 1) => {
        setItems((cur) => (cur.some((c) => same(c, { id, size })) ? cur.map((c) => (same(c, { id, size }) ? { ...c, qty: c.qty + qty } : c)) : [...cur, { id, size, qty }]));
        setOpen(true);
      },
      setQty: (id, size, qty) => setItems((cur) => cur.map((c) => (same(c, { id, size }) ? { ...c, qty: Math.max(1, qty) } : c))),
      remove: (id, size) => setItems((cur) => cur.filter((c) => !same(c, { id, size }))),
    };
  }, [items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
