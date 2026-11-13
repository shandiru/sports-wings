// Remembers whether the intro screen already played this session.
export const introSeen = () => {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('sw-intro') === '1'; } catch { return true; }
};
export const markIntroSeen = () => { try { sessionStorage.setItem('sw-intro', '1'); } catch { /* storage blocked */ } };
