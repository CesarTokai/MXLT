<template>
  <!-- Sprite global de iconos SVG. Se usa con <svg><use href="#i-XXX" /></svg> -->
  <svg width="0" height="0" style="position: absolute" aria-hidden="true">
    <defs>
      <symbol id="i-mountain" viewBox="0 0 24 24">
        <path d="M3 20l5.5-9 4 6.5L16 13l5 7H3z" />
        <circle cx="9" cy="8" r="2" />
      </symbol>
      <symbol id="i-plane" viewBox="0 0 24 24">
        <path
          d="M21 12l-4-1-7 9h-2l3-9-5-1-2 2H3l1-3-1-3h1l2 2 5-1-3-9h2l7 9 4-1c1 0 2 1 2 2s-1 2-2 2z"
        />
      </symbol>
      <symbol id="i-store" viewBox="0 0 24 24">
        <path
          d="M4 9l1-4h14l1 4M4 9h16v11H4zM4 9v3a3 3 0 003 3 3 3 0 003-3 3 3 0 003 3 3 3 0 003-3 3 3 0 003 3 3 3 0 003-3V9M9 20v-6h6v6"
        />
      </symbol>
      <symbol id="i-confetti" viewBox="0 0 24 24">
        <path
          d="M3 20l2.5-9 7 5L3 20zm10-13l4-4M19 11l3-2M14 15l3 1M16 19l1 3M9 4l1 3M5 4l2-1"
        />
      </symbol>
      <symbol id="i-users" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </symbol>
      <symbol id="i-snow" viewBox="0 0 24 24">
        <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14" />
      </symbol>
      <symbol id="i-music" viewBox="0 0 24 24">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </symbol>
      <symbol id="i-shield" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </symbol>
      <symbol id="i-luggage" viewBox="0 0 24 24">
        <rect x="5" y="7" width="14" height="14" rx="2" />
        <path d="M9 7V4h6v3M9 21v1M15 21v1M9 11v6M15 11v6" />
      </symbol>
      <symbol id="i-map" viewBox="0 0 24 24">
        <path d="M1 6v15l7-3 8 3 7-3V3l-7 3-8-3-7 3zM8 3v15M16 6v15" />
      </symbol>
      <symbol id="i-phone" viewBox="0 0 24 24">
        <path
          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.35 1.84.59 2.8.72A2 2 0 0122 16.92z"
        />
      </symbol>
      <symbol id="i-mail" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6L12 13 2 6" />
      </symbol>
      <symbol id="i-pin" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </symbol>
      <symbol id="i-arrow-right" viewBox="0 0 24 24">
        <path d="M5 12h14M13 5l7 7-7 7" />
      </symbol>
      <symbol id="i-arrow-left" viewBox="0 0 24 24">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </symbol>
      <symbol id="i-plus" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" />
      </symbol>
      <symbol id="i-x" viewBox="0 0 24 24">
        <path d="M18 6L6 18M6 6l12 12" />
      </symbol>
      <symbol id="i-menu" viewBox="0 0 24 24">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5" />
      </symbol>
      <symbol id="i-search" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </symbol>
      <symbol id="i-wa" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          stroke="none"
          d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.6.1c-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1s0-.5.1-.6c.1-.1.3-.3.4-.5l.3-.5c.1-.2 0-.4 0-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 2C6.5 2 2 6.5 2 12c0 2.1.6 4 1.6 5.7L2 22l4.5-1.5c1.6.9 3.5 1.5 5.5 1.5 5.5 0 10-4.5 10-10S17.5 2 12 2z"
        />
      </symbol>
      <symbol id="i-fb" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          stroke="none"
          d="M22 12a10 10 0 10-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5v1.8H16l-.4 2.9h-2.2v7A10 10 0 0022 12z"
        />
      </symbol>
    </defs>
  </svg>
</template>
