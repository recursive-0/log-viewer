declare module '*.module.scss' {
  const classes: { [className: string]: string };
  export = classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export = classes;
}

declare module '*.scss' {
  const content: string;
  export default content;
}
