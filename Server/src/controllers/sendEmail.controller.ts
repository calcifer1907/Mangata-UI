import nodemailer from "nodemailer";

import { pool } from "../Connection";
import { htmlContent } from "../functions/functionHtml";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "app.mangata.beach.club@gmail.com",
    pass: "vhkr alqu degu rijk",
  },
});

export const sendEmail = async (code_reservation: string) => {
  try {
    const subject = "Bienvenido a Mangata Beach";
    const resultQuery = await pool.query(
      "SELECT CREATE_AT,EMAIL reservations WHERE CODE_RESERVATION=$1",
      [code_reservation]
    );

    let date = new Date().toDateString();

    let email = null;
    if (resultQuery && resultQuery.rowCount) {
      email = resultQuery.rows[0].email;
      date = resultQuery.rows[0].create_at;
    }
    console.log("resultQuery", resultQuery.rows);
    const mailOptions = {
      from: "app.mangata.beach.club@gmail.com",
      to: email,
      subject,
      html: htmlContent(date),
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
  } catch (error) {
    console.error(error);
  }
};
