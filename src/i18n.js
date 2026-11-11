export function text(value, language) {
  const [spanish, portuguese] = value.split("¦");
  return language === "pt" ? portuguese || spanish : spanish;
}
