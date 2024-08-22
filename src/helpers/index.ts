export const loadJs = (scriptSrc: string) => {
  let script = document.createElement("script");
  script.src = scriptSrc;
  script.defer = true;
  script.async = true;
  document.body.appendChild(script);
};
