// Formatting helpers for prices.
import { site } from '../data/site.js';

/** @param {number} n amount in LKR */
export const money = (n) => `${site.currency} ${n.toLocaleString('en-LK')}`;
/** Price actually charged for a product. */
export const unitPrice = (p) => p.salePrice ?? p.price;
