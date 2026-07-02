const s = { strokeWidth: 1.5, stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }

export const CONCEPT_ICONS = {
  // Emergency
  chest_pain:     <svg viewBox="0 0 24 24" {...s}><path d="M12 21C12 21 3 14.5 3 8.5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12.5-9 12.5z"/><path d="M10 10l2 2 2-4"/></svg>,
  fall:           <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="4" r="1.5"/><path d="M12 6l-3 5h6l-1.5 5"/><path d="M8 16l-2 4M13 16l2 4"/><path d="M6 20h4M13 20h4"/></svg>,
  help_me:        <svg viewBox="0 0 24 24" {...s}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 8v4M12 16h.01"/></svg>,
  call_emergency: <svg viewBox="0 0 24 24" {...s}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/><line x1="18" y1="2" x2="18" y2="8"/><line x1="15" y1="5" x2="21" y2="5"/></svg>,
  cant_breathe:   <svg viewBox="0 0 24 24" {...s}><path d="M12 3c-4 0-7 2.5-7 6 0 2 1 3.5 2.5 4.5C9 14.5 9 16 9 17a3 3 0 0 0 6 0c0-1 0-2.5 1.5-3.5C18 12.5 19 11 19 9c0-3.5-3-6-7-6z"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/><path d="M9 13h6"/></svg>,

  // People
  friend:    <svg viewBox="0 0 24 24" {...s}><circle cx="9" cy="7" r="3"/><circle cx="16" cy="7" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6h.5"/><path d="M10.5 14H14c3.3 0 6 2.7 6 6"/></svg>,
  doctor:    <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="19" cy="17" r="3"/><line x1="19" y1="15" x2="19" y2="19"/><line x1="17" y1="17" x2="21" y2="17"/></svg>,
  family:    <svg viewBox="0 0 24 24" {...s}><circle cx="8" cy="6" r="2.5"/><circle cx="16" cy="6" r="2.5"/><circle cx="12" cy="6" r="2" opacity=".5"/><path d="M3 20c0-2.8 2.2-5 5-5h8c2.8 0 5 2.2 5 5"/><path d="M9 20v-3l3-2 3 2v3"/></svg>,
  caregiver: <svg viewBox="0 0 24 24" {...s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><circle cx="12" cy="8" r="2.5"/></svg>,
  nurse:     <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/><line x1="10" y1="5" x2="14" y2="5"/><line x1="12" y1="3" x2="12" y2="7"/></svg>,

  // Food
  coffee:    <svg viewBox="0 0 24 24" {...s}><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  water:     <svg viewBox="0 0 24 24" {...s}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  food:      <svg viewBox="0 0 24 24" {...s}><line x1="12" y1="2" x2="12" y2="6"/><path d="M8 6c0 3 4 3 4 6s4 3 4 6"/><path d="M8 12c0 3 4 3 4 6"/><line x1="20" y1="2" x2="20" y2="22"/><line x1="4" y1="2" x2="4" y2="6"/><path d="M4 6c4 0 4 4 4 4H4v12"/></svg>,
  breakfast: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>,
  snack:     <svg viewBox="0 0 24 24" {...s}><path d="M12 2a7 7 0 1 0 7 7"/><path d="M15.5 2.5A4.5 4.5 0 0 1 20 7"/><line x1="15" y1="12" x2="9" y2="18"/><line x1="9" y1="12" x2="15" y2="18"/><path d="M9 21h6"/></svg>,

  // Places
  home:     <svg viewBox="0 0 24 24" {...s}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  hospital: <svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  outside:  <svg viewBox="0 0 24 24" {...s}><path d="M12 2L6 13h12L12 2z"/><path d="M6 13L3 20h6l3-4 3 4h6l-3-7"/><line x1="12" y1="13" x2="12" y2="20"/></svg>,
  bathroom: <svg viewBox="0 0 24 24" {...s}><path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4z"/><path d="M4 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1"/><line x1="6" y1="20" x2="6" y2="22"/><line x1="18" y1="20" x2="18" y2="22"/></svg>,
  store:    <svg viewBox="0 0 24 24" {...s}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,

  // Needs
  help:     <svg viewBox="0 0 24 24" {...s}><path d="M18 11V6a4 4 0 0 0-8 0v5"/><path d="M9 17l3 3 3-3"/><path d="M12 20V11"/><path d="M4 12h2M18 12h2"/></svg>,
  rest:     <svg viewBox="0 0 24 24" {...s}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  tomorrow: <svg viewBox="0 0 24 24" {...s}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 15l2 2 4-4"/></svg>,
  now:      <svg viewBox="0 0 24 24" {...s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  later:    <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,

  // Health
  pain:        <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/><line x1="15" y1="9" x2="9" y2="9"/></svg>,
  tired:       <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><path d="M9 9l1.5 1.5L9 12M15 9l-1.5 1.5L15 12"/></svg>,
  medicine:    <svg viewBox="0 0 24 24" {...s}><path d="M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7"/><circle cx="18" cy="18" r="4"/><line x1="18" y1="16" x2="18" y2="20"/><line x1="16" y1="18" x2="20" y2="18"/></svg>,
  appointment: <svg viewBox="0 0 24 24" {...s}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="14"/></svg>,
  dizzy:       <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-1.5 4-1.5 4 1.5 4 1.5"/><path d="M8 9l2 1M14 9l2-1M9 10l1-1M14 10l1 1"/></svg>,

  // Emotions
  happy:      <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 3 4 3 4-3 4-3"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  scared:     <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M8 14s0-3 4-3 4 3 4 3"/><path d="M7.5 8.5l1.5 1.5M14.5 8.5L16 10M9 10l1.5-1.5M13.5 10l1.5 1.5"/></svg>,
  sad:        <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  frustrated: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><path d="M7.5 7.5l3 2M16.5 7.5l-3 2"/></svg>,
  grateful:   <svg viewBox="0 0 24 24" {...s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
}

export default function ConceptSVGIcon({ id, size = 24, color = "currentColor" }) {
  const icon = CONCEPT_ICONS[id]
  if (!icon) return <span style={{ fontSize: size * 0.75, lineHeight: 1 }}>?</span>
  return (
    <span
      style={{ display: "inline-flex", width: size, height: size, color, flexShrink: 0 }}
      aria-hidden="true"
    >
      {icon}
    </span>
  )
}
