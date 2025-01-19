import MercadoPago, { Preference } from "mercadopago";

import { PAYMENT_TOKEN_PROD, PAYMENT_TOKEN_TEST } from "../configDB";

export const createOrder = (req: any, res: any) => {
  const client = new MercadoPago({ accessToken: PAYMENT_TOKEN_TEST || "" });
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
          "https://ebb1-2800-484-9781-d300-2b6d-69be-567f-a9b0.ngrok-free.app/webhook",
      },
    })
    .then(function (response) {
      res.status(200).json(response);
    })
    .catch(function (error) {
      res.status(error.status).send(error);
    });
};

export const reciveWebhook = (req: any, res: any) => {
  console.log(req.query);
};
