import { useCallback, useEffect, useMemo, useRef } from "react";

import {
  getCodeReservation,
  getAccompanist,
  methodUser,
} from "../utils/api/agent";

import { useAccompanist } from "./useReservationContext";

import { useSearchParams, useNavigate } from "react-router-dom";
import { handleDiffHours, formatDate } from "../generalFunctions/formatDate";

/**Interfaces */
import { IFields, IOptions } from "../interfaces/IAccompanist";
import { generarCodigoReservaUX2 } from "../generalFunctions/generateCodeReservation";

import { enqueueSnackbar } from "notistack";
import { formatPrice } from "../generalFunctions/formaters";
import { validEmail } from "../generalFunctions/generalFunction";

const useLogicReservations = () => {
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();
  const refSystem = useRef<number>(0);
  const ID_PARAM = searchParams.get("id");

  const {
    dataCodeReservation,
    setDataCodeReservation,
    minmax,
    fields,
    errors,
    setErrors,
    setFields,
    valueCel,
    valueEmail,
    dateChange,
    setOpenModal,
    setOpenDialogPayment,
    setDateChange,
    setValueEmail,
    setValueCel,
  } = useAccompanist();

  const requestGetCodeReservation = useCallback(async () => {
    try {
      if (ID_PARAM) {
        const currentDate = new Date();
        const response = await getCodeReservation({ code: Number(ID_PARAM) });
        const diff = new Date(response.created_at);
        const diffHours = handleDiffHours(currentDate, diff);
        if (diffHours > 24) {
          navigator("/404");
        }
        setDataCodeReservation(response);
      } else {
        const resultUserSystem = await methodUser.getUserId({ id: -1 });
        refSystem.current = resultUserSystem.id;
      }
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        "response" in error &&
        (error as { response?: { status?: number } }).response?.status === 404
      ) {
        navigator("/404");
      }
    }
  }, [ID_PARAM, setDataCodeReservation, navigator]);

  const PRICES = useMemo(
    () => ({
      PRICE_MAX: dataCodeReservation?.agreed_price ?? minmax.MAX,
      PRICE_MIN: dataCodeReservation?.min_price ?? minmax.MIN,
    }),
    [minmax, dataCodeReservation]
  );

  const allFields = () => {
    const isValidEmail = validEmail(valueEmail);
    const isValidForm = validateFields();
    if (!isValidEmail) {
      enqueueSnackbar("Correo invalido!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
    if (isValidForm && isValidEmail) setOpenModal(true);
  };

  // Valida que todos los campos estén llenos
  const validateFields = (): boolean => {
    const validationErrors = fields.map((field: IFields) => ({
      name: field.name.trim() === "",
      lunch: field.lunch.value === 0,
    }));
    setErrors(validationErrors);
    return (
      !validationErrors.some((error) => error.name || error.lunch) &&
      valueCel !== ""
    );
  };

  // Agrega una nueva fila si la validación es exitosa
  const addField = () => {
    if (validateFields()) {
      setFields([...fields, { name: "", lunch: { label: "", value: 0 } }]);
      setErrors([...errors, { name: false, lunch: false }]);
    }
  };

  const CODE_RESERVATION = useMemo(() => {
    return generarCodigoReservaUX2();
  }, []);

  const handleClose = () => setOpenModal((prev) => !prev);

  const handleReservation = async () => {
    const ID_EMPLOYEE = dataCodeReservation?.id || refSystem.current;
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    if (validateFields() && valueCel !== "" && valueEmail !== "") {
      const body = {
        CODE_RESERVATION,
        ID_EMPLOYEE,
        TELEPHONE: valueCel,
        ACCOMPANIST: fields,
        EMAIL: valueEmail,
        AGREED_PRICE: Number(PRICES.PRICE_MAX),
        MIN_PRICE: Number(PRICES.PRICE_MIN),
        CREATED_AT: formatDate(`${dateChange} ${hours}:${minutes}:${seconds}`),
      };

      const data = await getAccompanist.saveReservation(body);
      if (data.message === "success") {
        enqueueSnackbar("Se guardo correctamente la reserva", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        handleClose();
        setOpenDialogPayment(true);
      }
    }
  };

  // Elimina una fila específica
  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i: number) => i !== index);
    const updatedErrors = errors.filter((_, i: number) => i !== index);
    setFields(updatedFields);
    setErrors(updatedErrors);
  };

  const calculatePrice = () => {
    const NEW_PRICE = Number(PRICES.PRICE_MAX) * fields.length;
    return NEW_PRICE;
  };

  const handleFormatPrice = () => {
    const newPrice = calculatePrice();
    const FORMAT_PRICE = formatPrice(newPrice);
    return FORMAT_PRICE;
  };

  const handleChangeDate = (date: string) => {
    setDateChange(date);
  };

  // Maneja los cambios en los campos
  const handleChange = (
    index: number,
    fieldName: string,
    value: string | IOptions
  ) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [fieldName]: value };
    setFields(updatedFields);
    const errorValue =
      fieldName === "name"
        ? (value as string).trim() === ""
        : (value as IOptions).label === "";
    // Limpiar errores al cambiar algo
    const updatedErrors = [...errors];
    updatedErrors[index] = {
      ...updatedErrors[index],
      [fieldName]: errorValue,
    };
    setErrors(updatedErrors);
  };

  const handleOnchangeCel = (value: string) => {
    if (value.length <= 10) setValueCel(value);
  };

  const handleOnChangeEmail = (value: string) => {
    if (value.length < 40) setValueEmail(value);
  };

  useEffect(() => {
    requestGetCodeReservation();
  }, [requestGetCodeReservation]);

  return {
    dataCodeReservation,
    handleReservation,
    PRICES,
    addField,
    CODE_RESERVATION,
    removeField,
    calculatePrice,
    handleFormatPrice,
    handleChangeDate,
    handleChange,
    allFields,
    handleClose,
    handleOnchangeCel,
    handleOnChangeEmail,
  };
};

export default useLogicReservations;
