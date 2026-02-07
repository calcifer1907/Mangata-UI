import { Request, Response } from "express";

import { requestApis } from "../utils/request/Request";

import { pool } from "../Connection";

import { sendEmail } from "./sendEmail.controller";

import { initMercadoPago } from "@mercadopago/sdk-react";

import { PAYMENT_TOKEN_PROD_PUBLIC, BOLD_KEY, VITE_URL_UI } from "../configDB";

import { STATUS_BOLD } from "../functions/generalFunctions";

initMercadoPago(PAYMENT_TOKEN_PROD_PUBLIC || "");

export const paymentBold = async (request: Request, response: Response) => {
  try {
    const { email, currency, total_amount, payment_id } = request.body;

    const body = {
      amount_type: "CLOSE",
      description: "Mangata Pasa Día",
      callback_url: VITE_URL_UI + "/#/check-reservation",
      payer_email: email,
      payment_methods: ["CREDIT_CARD", "PSE", "BOTON_BANCOLOMBIA", "NEQUI"],
      amount: {
        currency: currency,
        total_amount: total_amount,
      },
    };
    const headers = {
      Authorization: `x-api-key ${BOLD_KEY}`,
      "Content-Type": "application/json",
    };

    const { payload } = await requestApis.post("/online/link/v1", body, {
      headers,
    });
    console.log("payload: ", payload);
    await pool.query(
      "UPDATE reservations SET PAYMENT_ID=$1 WHERE CODE_RESERVATION=$2",
      [payload.payment_link, payment_id],
    );
    response.json({ massage: "success", data: payload });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Someting went wrong! " });
  }
};

export const webhookBold = async (request: Request, response: Response) => {
  try {
    const { data, type } = request.body;
    const status = STATUS_BOLD[type as keyof typeof STATUS_BOLD];
    const payment_id = data.metadata.reference;

    // Primero obtenemos el estado actual de la reservación
    const { rows } = await pool.query(
      "SELECT STATUS_RESERVATION,EMAIL FROM reservations WHERE PAYMENT_ID = $1",
      [payment_id],
    );
    const currentStatus = rows[0]?.status_reservation;
    // Solo actualizamos si el estado es diferente
    if (currentStatus && currentStatus !== status) {
      await pool.query(
        "UPDATE reservations SET STATUS_RESERVATION = $1 WHERE PAYMENT_ID = $2",
        [status, payment_id],
      );
      // Solo enviamos el correo si el nuevo estado es "approved"
      if (status === "approved") {
        await sendEmail(payment_id);
      }
    }

    response.sendStatus(200);
  } catch (error) {
    console.error("Error en webhookBold:", error);
    response.sendStatus(500);
  }
};

export const getOrderIdBold = async (request: Request, response: Response) => {
  try {
    const { order_id } = request.body;
    const headers = {
      Authorization: `x-api-key ${BOLD_KEY}`,
      "Content-Type": "application/json",
    };
    const responseBold = await requestApis.get(`/online/link/v1/${order_id}`, {
      headers,
    });
    response.json({ message: "success", data: responseBold });
  } catch (error) {
    console.log(error);
  }
};
// esto es para probar
export const testEmail = async (_request: Request, response: Response) => {
  try {
    await sendEmail("LNK_WRINX89U58");
    response.status(200).json({ mesagge: "Send email test" });
  } catch (error) {
    response.status(500);
  }
};
