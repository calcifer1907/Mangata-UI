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

const formatDate = (date: string) => {
  const newDate = new Date(date);
};

export const sendEmail = async (payment_id: string) => {
  try {
    const subject = "Bienvenido a Mangata Beach";
    const resultQuery = await pool.query(
      "SELECT TO_CHAR(CREATED_AT AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS') AS FORMATTED_DATE, EMAIL FROM reservations WHERE PAYMENT_ID = $1",
      [payment_id]
    );

    let date = new Date().toDateString();
    let email = null;
    if (resultQuery && resultQuery.rowCount) {
      email = resultQuery.rows[0].email;
      date = resultQuery.rows[0].formatted_date;
    }
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
