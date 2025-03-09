import {
  Preference,
  MercadoPagoConfig,
  Payment,
  PaymentMethod,
} from "mercadopago";

import { pool } from "../Connection";

import { initMercadoPago } from "@mercadopago/sdk-react";

import {
  PAYMENT_TOKEN_PROD,
  PAYMENT_TOKEN_TEST,
  PAYMENT_TOKEN_PROD_PUBLIC,
  CALLBACK_URL,
  BACKEND_URL,
  PAYMENT_TOKEN_TEST_PUBLIC,
} from "../configDB";

initMercadoPago(PAYMENT_TOKEN_PROD_PUBLIC || "");

const client = new MercadoPagoConfig({
  accessToken: PAYMENT_TOKEN_PROD || "",
  options: { timeout: 5000 },
});
export const getListBanks = async (req: any, res: any) => {
  const methods = new PaymentMethod(client);

  try {
    const data = await methods.get();
    const banks = data.filter((bank) => bank.id === "pse");

    res.json(banks.length > 0 ? banks[0].financial_institutions : []);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createOrder = (req: any, res: any) => {
  const payment = new Preference(client);
  const { amount, payment_id } = req.body;
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
      res.status(200).json({ id: payment_id });
    })
    .catch((error) => {
      res.status(error.status).send(error);
    });
};

export const createPSEPayment = (req: any, res: any) => {
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
  } = req.body;

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
    .then((response) => {
      const { transaction_details } = response;
      res
        .status(200)
        .json({ redirectTo: transaction_details?.external_resource_url });
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status).send(error);
    });
};

export const reciveWebhook = async (req: any, res: any) => {
  const payment = req.query;
  console.log(payment);
  try {
    if (payment.type === "payment") {
      const data = await new Payment(client).get({ id: payment["data.id"] });
      const { external_reference, id, status } = data;
      await pool.query(
        "UPDATE reservations SET PAYMENT_ID=$1, STATUS_RESERVATION=$2 WHERE CODE_RESERVATION=$3",
        [id, status, external_reference]
      );
    }
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
