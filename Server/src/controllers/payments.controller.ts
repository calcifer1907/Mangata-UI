import {
  Preference,
  MercadoPagoConfig,
  Payment,
  PaymentMethod,
} from "mercadopago";

import { initMercadoPago } from "@mercadopago/sdk-react";

import {
  PAYMENT_TOKEN_PROD,
  PAYMENT_TOKEN_TEST,
  CALLBACK_URL,
  BACKEND_URL,
} from "../configDB";

initMercadoPago(PAYMENT_TOKEN_PROD || "");

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

  payment
    .create({
      body: {
        items: [
          {
            id: "1",
            quantity: 1,
            unit_price: 1000,
            title: "pasadia",
            currency_id: "COP",
          },
        ],
        back_urls: {
          success:
            "https://ebb1-2800-484-9781-d300-2b6d-69be-567f-a9b0.ngrok-free.app/success",
          failure:
            "https://ebb1-2800-484-9781-d300-2b6d-69be-567f-a9b0.ngrok-free.app/failure",
          pending:
            "https://ebb1-2800-484-9781-d300-2b6d-69be-567f-a9b0.ngrok-free.app/pending",
        },
        notification_url:
          "https://ebb1-2800-484-9781-d300-2b6d-69be-567f-a9b0.ngrok-free.app/webhook", //pués del pago
      },
    })
    .then(function (response) {
      res.status(200).json(response);
    })
    .catch(function (error) {
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
    notification_url: `${BACKEND_URL}/webhook`, // URL de notificación
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
  console.log(payment, payment["data.id"]);
  try {
    if (payment.type === "payment") {
      const data = await new Payment(client).get(payment["data.id"]);
      console.log(data);
    }
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }

  res.sendStatus(204);
};
