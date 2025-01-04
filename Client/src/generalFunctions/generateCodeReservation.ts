export const generarCodigoReservaUX = (longitud = 8, separador = "-") => {
  // Asegúrate de que la longitud sea válida
  if (longitud <= 0) {
    throw new Error("La longitud debe ser un número positivo.");
  }

  // Caracteres alfanuméricos legibles (sin caracteres ambiguos como O y 0)
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "";

  // Generar el código aleatorio
  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indiceAleatorio];
  }

  // Dividir el código en bloques legibles si es necesario
  const bloques = codigo.match(/.{1,4}/g); // Bloques de 4 caracteres
  return bloques?.join(separador); // Unir bloques con el separador
};
