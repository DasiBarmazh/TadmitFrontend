/// <reference types="vite/client" />

// Support importing assets with uppercase extensions (Windows/Photoshop exports etc.)
declare module '*.JPG' {
  const src: string
  export default src
}

