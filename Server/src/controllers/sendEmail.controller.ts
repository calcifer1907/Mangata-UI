import nodemailer, { SendMailOptions } from "nodemailer";
import { Request, Response } from "express";

import { leerArchivoHtml } from "../functions/readFile";
import { replacePlaceholders } from "../functions/functionHtml";
import { dataSendEmail } from "../repository/sendEmailRepository";
import { PASSWORD_EMAIL, USER_EMAIL, VITE_URL_UI } from "../configDB";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: PASSWORD_EMAIL,
  },
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2",
  },
  pool: true, // Usar pool de conexiones
});

interface IEmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
  headers?: Record<string, string>;
  attachments?: {
    filename: string;
    path: string;
    cid: string;
  }[];
}

interface IBoatData extends Record<string, string> {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDate: string;
  endDate: string;
  departurePort: string;
  totalPrice: string;
}

interface IBoatDataEmail {
  formatted_date: string;
  id_employee: number | string;
  email: string;
  current_commission: number;
  clientName: string;
}

const assignValuesBoatData = async (dataEmail: IBoatDataEmail) => {
  const boat = {} as IBoatData;
  const { formatted_date, email, current_commission } = dataEmail;
  boat.clientEmail = email;
  boat.startDate = formatted_date;
  boat.endDate = formatted_date;
  boat.totalPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, // Evitar mostrar los decimales
    maximumFractionDigits: 0, // Evitar decimales adicionales
  }).format(current_commission);
  return boat;
};

const optionsEmail = async (
  template: string,
  boat: IBoatData,
  clientEmail: string,
) => {
  const subject = "Welcome to Mangata Beach Club";
  let htmlTemplate = await leerArchivoHtml(template);
  htmlTemplate = replacePlaceholders(htmlTemplate, boat);
  const mailOptions: IEmailData = {
    from: USER_EMAIL ?? "",
    to: clientEmail,
    subject,
    html: htmlTemplate,
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
    },
    attachments: [
      {
        filename: "logo.png",
        path: VITE_URL_UI + "/images/MangataWhite.png",
        cid: "logo",
      },
    ],
  };
  return mailOptions;
};

export const sendEmail = async (payment_id: string) => {
  try {
    const dataEmail = await dataSendEmail(payment_id);
    if (!dataEmail) {
      throw new Error("No se encontraron datos para el payment_id:");
    }
    const { id_employee, email, clientName } = dataEmail;
    const boat = await assignValuesBoatData(dataEmail);

    let TEMPLATE = "htmlTemplateDayPass.html";

    if (id_employee === "30" || id_employee === 30) {
      boat.clientName = clientName;
      TEMPLATE = "htmlTemplateReservationBoat.html";
    }
    const mailOptions = await optionsEmail(TEMPLATE, boat, email);

    await sendEmailAttemps(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

const sendEmailAttemps = async (mailOptions: SendMailOptions) => {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      attempts++;
      console.log(`Intento ${attempts} de envío de email`);

      const info = await transporter.sendMail(mailOptions);
      console.log("Email enviado:", info.messageId);
      return { success: true, info };
    } catch (error) {
      console.error(`Error en intento ${attempts}:`, (error as Error).message);

      if (attempts === maxAttempts) {
        throw new Error(
          `Fallo después de ${maxAttempts} intentos: ${(error as Error).message}`,
        );
      }

      // Esperar antes de reintentar (backoff exponencial)
      const waitTime = Math.min(1000 * Math.pow(2, attempts), 8000);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
};

export const sendContactFormEmail = async (
  request: Request,
  response: Response,
) => {
  try {
    const { email, name, telephone, message } = request.body;
    const subject = "Formulario de contacto";
    let htmlTemplate = await leerArchivoHtml("htmlTemplateContact.html");
    const dataUSer = { email, name, telephone, message };
    htmlTemplate = replacePlaceholders(htmlTemplate, dataUSer);
    const mailOptions = {
      from: email,
      to: USER_EMAIL,
      subject,
      html: htmlTemplate,
    };
    transporter.sendMail(
      mailOptions,
      (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
          console.log(error);
          response.status(500);
          return;
        }
        console.log("Correo enviado: " + info.response);
        response.status(200).json({ status: "success" });
      },
    );
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};
