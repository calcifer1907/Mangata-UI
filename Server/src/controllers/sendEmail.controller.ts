import nodemailer from "nodemailer";

import { leerArchivoHtml } from "../functions/readFile";
import { pool } from "../Connection";
import { replacePlaceholders } from "../functions/functionHtml";
import { Request, Response } from "express";
import { PASSWORD_EMAIL, USER_EMAIL, VITE_URL_UI } from "../configDB";

import { dataSendEmail } from "../repository/sendEmailRepository";

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
});

interface IEmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
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
    console.log(dataEmail);
    const boat = await assignValuesBoatData(dataEmail);

    let TEMPLATE = "htmlTemplateDayPass.html";

    if (id_employee === "30" || id_employee === 30) {
      boat.clientName = clientName;
      TEMPLATE = "htmlTemplateReservationBoat.html";
    }
    const mailOptions = await optionsEmail(TEMPLATE, boat, email);
    console.log(mailOptions);
    transporter.sendMail(
      mailOptions,
      (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log("Correo enviado: " + info.response);
      },
    );
  } catch (error) {
    console.error("Error al enviar el correo:", error);
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
