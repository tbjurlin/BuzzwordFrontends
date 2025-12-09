declare module 'feather-icons' {
  export interface FeatherIcons {
    replace(options?: { [key: string]: any }): void
    icons: { [key: string]: any }
  }
  
  const feather: FeatherIcons
  export default feather
}
