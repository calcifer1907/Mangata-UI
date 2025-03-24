import { useCallback, useEffect, useMemo } from "react";

import { getCodeReservation, getAccompanist } from "../utils/api/agent";

import { useAccompanist } from "./useReservationContext";

import { useSearchParams, useNavigate } from "react-router-dom";
import { handleDiffHours, formatDate } from "../generalFunctions/formatDate";

/**Interfaces */
import { IFields, IOptions } from "../interfaces/IAccompanist";
import { generarCodigoReservaUX2 } from "../generalFunctions/generateCodeReservation";

import { enqueueSnackbar } from "notistack";
import { formatPrice } from "../generalFunctions/formaters";

const useLogicReservations = () => {
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();

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
  } = useAccompanist();

  const requestGetCodeReservation = useCallback(async () => {
    try {
      if (ID_PARAM) {
        const currentDate = new Date();
        const response = await getCodeReservation({ code: ID_PARAM });
        const diff = new Date(response.created_at);
        const diffHours = handleDiffHours(currentDate, diff);

        // if (diffHours > 1) {
        //   navigator("/404");
        // }
        setDataCodeReservation(response);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
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
    const ID_EMPLOYEE = dataCodeReservation?.id;
    if (validateFields() && valueCel !== "" && valueEmail !== "") {
      const body = {
        CODE_RESERVATION,
        ID_EMPLOYEE,
        TELEPHONE: valueCel,
        ACCOMPANIST: fields,
        EMAIL: valueEmail,
        AGREED_PRICE: Number(PRICES.PRICE_MAX),
        MIN_PRICE: Number(PRICES.PRICE_MIN),
        CREATED_AT: formatDate(new Date(dateChange)),
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
    validateFields,
    handleClose,
  };
};

export default useLogicReservations;
