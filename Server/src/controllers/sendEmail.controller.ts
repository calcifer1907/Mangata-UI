import nodemailer from "nodemailer";

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Puedes usar otro servicio como 'yahoo', 'outlook', etc.
  auth: {
    user: "mangata.beach.club.app@gmail.com", // Tu correo electrónico
    pass: "Mangata1103*", // Tu contraseña
  },
});

export const sendEmail = (to: string) => {
  const subject = "Bienvenido a Mangata Beach";
  const text =
    "Gracias por registrarte en Mangata Beach, esperamos que disfrutes de tu estancia en nuestro hotel.";
  const mailOptions = {
    from: "mangata.beach.club.app@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(
    mailOptions,
    (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log("Correo enviado: " + info.response);
    }
  );
};
