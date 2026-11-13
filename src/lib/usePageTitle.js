// Sets the document title for the current route.
import { useEffect } from 'react';

/** @param {string} title */
export default function usePageTitle(title) {
  useEffect(() => { document.title = title ? `${title} | Sports Wings` : 'Sports Wings | Cricket and sports store, Colombo'; }, [title]);
}
