import { Request, Response } from "express";
import {
  Preference,
  MercadoPagoConfig,
  Payment,
  PaymentMethod,
} from "mercadopago";

import { requestApis } from "../utils/request/Request";

import { pool } from "../Connection";

import { sendEmail } from "./sendEmail.controller";

import { initMercadoPago } from "@mercadopago/sdk-react";

import {
  PAYMENT_TOKEN_PROD,
  PAYMENT_TOKEN_TEST,
  PAYMENT_TOKEN_PROD_PUBLIC,
  CALLBACK_URL,
  BACKEND_URL,
  PAYMENT_TOKEN_TEST_PUBLIC,
  BOLD_KEY,
  VITE_URL_UI,
} from "../configDB";

import { STATUS_BOLD } from "../functions/generalFunctions";

initMercadoPago(PAYMENT_TOKEN_PROD_PUBLIC || "");

const client = new MercadoPagoConfig({
  accessToken: PAYMENT_TOKEN_PROD || "",
  options: { timeout: 5000 },
});

export const getListBanks = async (request: Request, response: Response) => {
  const methods = new PaymentMethod(client);

  try {
    const data = await methods.get();
    const banks = data.filter((bank) => bank.id === "pse");

    response.json(banks.length > 0 ? banks[0].financial_institutions : []);
  } catch (error) {
    response.status(500).send(error);
  }
};

export const createOrder = (request: Request, response: Response) => {
  const payment = new Preference(client);
  const { amount, payment_id } = request.body;
  payment
    .create({
      body: {
        items: [
          {
            id: payment_id,
            quantity: 1,
            unit_price: amount,
            category_id: "Pasadia1",
            title: "Pasa día",
            currency_id: "COP",
            description: "Pasa día, Mangata Beach Club",
          },
        ],
        back_urls: {
          success:
            "https://b718-2800-484-9781-d300-993c-8302-4e-654c.ngrok-free.app/success",
          failure:
            "https://b718-2800-484-9781-d300-993c-8302-4e-654c.ngrok-free.app/failure",
          pending:
            "https://b718-2800-484-9781-d300-993c-8302-4e-654c.ngrok-free.app/pending",
        },
        notification_url:
          "https://b718-2800-484-9781-d300-993c-8302-4e-654c.ngrok-free.app/webhook", //pués del pago
      },
    })
    .then(() => {
      response.status(200).json({ id: payment_id });
    })
    .catch((error) => {
      response.status(error.status).send(error);
    });
};

export const createPSEPayment = (request: Request, response: Response) => {
  const payment = new Payment(client);
  const {
    first_name,
    email,
    identificationType,
    identificationNumber,
    personType,
    banksList,
    transaction_amount,
    payment_id,
  } = request.body;

  const body = {
    transaction_amount: transaction_amount,
    description: "Pasa día, Mangata Beach Club",
    payment_method_id: "pse",
    external_reference: payment_id,
    statement_descriptor: "Mangata Beach Club,Día de sol",
    transaction_details: {
      financial_institution: banksList,
    },
    payer: {
      first_name,
      last_name: first_name,
      email, // Correo del pagador
      entity_type: personType, // Persona natural
      identification: {
        type: identificationType, // Tipo de documento (CC para cédula de ciudadanía)
        number: identificationNumber, // Número de documento
      },
    },
    callback_url: CALLBACK_URL, // URL de retorno después del pago
    notification_url: BACKEND_URL, // URL de notificación
    additional_info: {
      ip_address: "127.0.0.1",
    },
  };

  payment
    .create({ body })
    .then((respons) => {
      const { transaction_details } = respons;
      response
        .status(200)
        .json({ redirectTo: transaction_details?.external_resource_url });
    })
    .catch((error) => {
      response.status(error.status).send(error);
    });
};

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
      [payload.payment_link, payment_id]
    );
    response.json({ massage: "success", data: payload });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Someting went wrong! " });
  }
};

export const reciveWebhook = async (request: Request, response: Response) => {
  const payment = request.query;
  try {
    if (payment.type === "payment") {
      const paymentId = payment["data.id"];
      if (typeof paymentId === "string" || typeof paymentId === "number") {
        const data = await new Payment(client).get({ id: paymentId });
        const { external_reference, id, status } = data;
        await pool.query(
          "UPDATE reservations SET PAYMENT_ID=$1, STATUS_RESERVATION=$2 WHERE CODE_RESERVATION=$3;",
          [id, status, external_reference]
        );
      }
      // await sendEmail(external_reference || "");
    }
    response.sendStatus(204);
  } catch (_error) {
    response.status(500).json({ message: "Something went wrong" });
  }
};

export const webhookBold = async (request: Request, response: Response) => {
  try {
    const { data, type } = request.body;
    const status = STATUS_BOLD[type as keyof typeof STATUS_BOLD];
    console.log(data);
    const payment_id = data.metadata.reference;

    // Primero obtenemos el estado actual de la reservación
    const { rows } = await pool.query(
      "SELECT STATUS_RESERVATION,EMAIL FROM reservations WHERE PAYMENT_ID = $1",
      [payment_id]
    );

    console.log(rows);
    const currentStatus = rows[0]?.status_reservation;
    // Solo actualizamos si el estado es diferente
    if (currentStatus && currentStatus !== status) {
      await pool.query(
        "UPDATE reservations SET STATUS_RESERVATION = $1 WHERE PAYMENT_ID = $2",
        [status, payment_id]
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
  const { order_id } = request.body;
  const headers = {
    Authorization: `x-api-key ${BOLD_KEY}`,
    "Content-Type": "application/json",
  };
  const responseBold = await requestApis.get(`/online/link/v1/${order_id}`, {
    headers,
  });
  response.json({ message: "success", data: responseBold });
};

// esto es para probar
export const testEmail = async (_request: Request, response: Response) => {
  try {
    await sendEmail("LNK_HR1JXLGZKZ");
    response.status(200).json({ mesagge: "Send email test" });
  } catch (error) {
    response.status(500);
  }
};
