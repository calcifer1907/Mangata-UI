import {
  Preference,
  MercadoPagoConfig,
  Payment,
  PaymentMethod,
} from "mercadopago";

import { PAYMENT_TOKEN_PROD, PAYMENT_TOKEN_TEST } from "../configDB";

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
  const body = {
    transaction_amount: 1000,
    description: "Pasa día, Mangata Beach Club",
    payment_method_id: "pse",
    transaction_details: {
      financial_institution: "1007",
    },
    payer: {
      email: "tabordac2@gmail.com", // Correo del pagador
      first_name: "Nombre",
      last_name: "Apellido",
      entity_type: "individual", // Persona natural
      identification: {
        type: "CC", // Tipo de documento (CC para cédula de ciudadanía)
        number: "1035424574", // Número de documento
      },
    },
    callback_url:
      "https://ebb1-2800-484-9781-d300-2b6d-69be-567f-a9b0.ngrok-free.app/", // URL de retorno después del pago
    notification_url:
      "https://ebb1-2800-484-9781-d300-2b6d-69be-567f-a9b0.ngrok-free.app/webhook", //pués del pago
    additional_info: {
      ip_address: "127.0.0.1",
    },
  };
  payment
    .create({ body })
    .then(function (response) {
      res.status(200).json(response);
    })
    .catch(function (error) {
      res.status(error.status).send(error);
    });
};

export const reciveWebhook = (req: any, res: any) => {
  console.log("reciveWebhook", req.query);

  res.sendStatus(204);
};
