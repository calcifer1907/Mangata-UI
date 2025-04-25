import nodemailer from "nodemailer";

import { pool } from "../Connection";
import { htmlContent } from "../functions/functionHtml";

import { PASSWORD_EMAIL, USER_EMAIL, VITE_URL_UI } from "../configDB";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: PASSWORD_EMAIL,
  },
});

export const sendEmail = async (payment_id: string) => {
  try {
    const subject = "Bienvenido a Mangata Beach Club";
    const { rows, rowCount } = await pool.query(
      "SELECT TO_CHAR(CREATED_AT AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS FORMATTED_DATE, EMAIL FROM reservations WHERE PAYMENT_ID = $1",
      [payment_id]
    );
    console.log("rows: ", rows);
    console.log("rowCount: ", rowCount);
    if (rowCount) {
      const [resultQuery] = rows;
      const mailOptions = {
        from: USER_EMAIL,
        to: resultQuery.email,
        subject,
        html: htmlContent(resultQuery.formatted_date),
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
        }
      );
    }
  } catch (error) {
    console.error(PASSWORD_EMAIL, USER_EMAIL);
  }
};
