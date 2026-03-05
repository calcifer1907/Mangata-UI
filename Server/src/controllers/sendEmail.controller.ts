import nodemailer from "nodemailer";

import fs from "fs";
import path from "path";

import { pool } from "../Connection";
import { replacePlaceholders } from "../functions/functionHtml";
import { Request, Response } from "express";
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
});

const boat = {
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  startDate: "",
  endDate: "",
  duration: "3",
  departurePort: "Muelle Todo Mar",
  totalPrice: "",
};

export const sendEmail = async (payment_id: string) => {
  try {
    const subject = "Welcome to Mangata Beach Club";
    const QUERY =
      "SELECT TO_CHAR(CREATED_AT AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS FORMATTED_DATE, EMAIL,ID_EMPLOYEE, CURRENT_COMMISSION,CODE_RESERVATION FROM reservations WHERE PAYMENT_ID = $1";
    const { rows, rowCount } = await pool.query(QUERY, [payment_id]);

    if (rowCount) {
      const [resultQuery] = rows;
      const {
        formatted_date,
        id_employee,
        email,
        current_commission,
        code_reservation,
      } = resultQuery;
      boat.clientEmail = email;
      boat.startDate = formatted_date;
      boat.endDate = formatted_date;
      boat.totalPrice = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0, // Evitar mostrar los decimales
        maximumFractionDigits: 0, // Evitar decimales adicionales
      }).format(current_commission);

      if (id_employee === "30") {
        const QUERY_NAME_CLIENT =
          "SELECT NAME_ACCOMPANIST FROM accompanist WHERE ID_RESERVATION = $1";
        const { rows: rowsNameClient } = await pool.query(QUERY_NAME_CLIENT, [
          code_reservation,
        ]);
        if (rowsNameClient.length > 0) {
          boat.clientName = rowsNameClient[0].name_accompanist;
        }
      }

      const TEMPLATE =
        id_employee === "30"
          ? "htmlTemplateReservationBoat.html"
          : "htmlTemplateDayPass.html";

      const plantillaPath = path.join(process.cwd(), "../html", TEMPLATE);
      let htmlTemplate = fs.readFileSync(plantillaPath, "utf8");
      htmlTemplate = replacePlaceholders(htmlTemplate, boat);
      const mailOptions = {
        from: USER_EMAIL,
        to: email,
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
    }
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
    const plantillaPath = path.join(
      process.cwd(),
      "../html",
      "htmlTemplateContact.html",
    );
    let htmlTemplate = fs.readFileSync(plantillaPath, "utf8");
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
