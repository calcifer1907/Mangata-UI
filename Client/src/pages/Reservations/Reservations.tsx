import { FC, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid";
import Modal from "@mui/material/Modal";

import "./Reservations.scss";

/**Libreries */
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

/**Components */
import Accompanist from "../../components/Accompanist/Accompanist";
import DialogPayMents from "../../components/Dialogs/DialogPayMents";
import ButtonComponent from "../../components/Buttons/ButtonComponent";
import TextFieldComponent from "../../components/TextField/TextFieldComponent";
import LineTopIcon from "./LineTopIcon";
import StandardPackage from "./StandardPackage";
import PurchaseSummary from "./PurchaseSummary";
import Calendar from "../../components/Calendar/Calendar";

/**Functions */
import { formatPrice } from "../../generalFunctions/formaters";

/**JSON Style */
import styleReservation from "./styleReservation.json";

/**Hooks */
import { useContextAccompanist } from "../../hooks/useReservation/useContextReservation";
import useLogicReservations from "../../hooks/useReservation/useLogicReservations";
import CountrySelect from "../../components/CountrySelect/CountrySelect";

const NameLunchForm: FC = () => {
  const [isVisibleGrid, setIsVisibleGrid] = useState(false);
  const { t } = useTranslation("reserve");
  const {
    optionsLunches,
    dateChange,
    errors,
    valueCel,
    valueEmail,
    fields,
    setOpenModal,
    openModal,
    openDialogPayment,
    setOpenDialogPayment,
    dataCodeReservation,
    loading,
  } = useContextAccompanist();

  const [maxHeight, setMaxHeight] = useState<number>(0);

  const {
    handleReservation,
    PRICES,
    addField,
    CODE_RESERVATION,
    removeField,
    calculatePrice,
    allFields,
    handleFormatPrice,
    handleChange,
    handleClose,
    handleChangeDate,
    handleOnchangeCel,
    handleOnChangeEmail,
    handleValidHoursMoreTenLessSies,
  } = useLogicReservations();

  useEffect(() => {
    const body = document.getElementById("body");
    body?.style.setProperty("overflow-y", "hidden");
    const heightContainer =
      document.getElementById("contentPrimary")?.offsetHeight;
    setMaxHeight(heightContainer || 0);
    return () => {
      body?.style.setProperty("overflow-y", "auto");
    };
  }, []);

  return (
    <Grid2
      spacing={2}
      container
      className="principal-grid"
      key={maxHeight}
      style={{
        maxHeight: maxHeight - 190,
      }}
    >
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box className="box-container p-relative">
          <Box style={{ marginBottom: 20 }}>
            <Box style={{ marginBottom: 15 }}>
              <Typography className="color-blue-dark title-reservation">
                {t("reserveD")} {CODE_RESERVATION}
              </Typography>
              <Box className="background-blue-dark container-asesor p-absolute" />
              {dataCodeReservation && (
                <Typography className="color-blue-dark title-asesor">
                  {t("adviser")}: <span>{dataCodeReservation?.user_name}</span>
                </Typography>
              )}
            </Box>
            <ButtonComponent
              title={t("addPerson")}
              onClick={addField}
              iconName="solar:user-plus-bold-duotone"
              background="background-color-button-dark-blue"
            />
          </Box>
          <Calendar callback={handleChangeDate} />
          <Typography className="color-blue-dark title-data-contact">
            {t("contactDetails")}
          </Typography>
          <Box className="d-flex gap-16 flex-wrap flex-dirrection-row">
            <CountrySelect onSelect={() => {}} />
            <TextFieldComponent
              value={valueCel}
              onChange={handleOnchangeCel}
              label="Celular"
              placeholder={t("cellPhone")}
              type="number"
              iconName="phone-calling-rounded"
              helperText={t("fieldRequired")}
            />
            <TextFieldComponent
              value={valueEmail}
              onChange={handleOnChangeEmail}
              label={t("email")}
              type="email"
              placeholder={t("enterEmail")}
              iconName="letter-opened"
              helperText={t("fieldRequired")}
            />
          </Box>
          <Box>
            {fields.map((field, index) => (
              <Accompanist
                icon={index !== 0}
                title={
                  index === 0
                    ? t("bookingDetails")
                    : `${t("accompanist")} ${index}`
                }
                key={index}
                index={index}
                field={field}
                errors={errors[index] || { name: false, lunch: false }}
                onChange={handleChange}
                onRemove={removeField}
                lunchOptions={optionsLunches}
              />
            ))}
          </Box>
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 1, sm: 1 }}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        <Box className="background-blue-dark line-vertical" />
      </Grid2>
      <Grid2
        className="purchase-summary"
        id="purchase-summary"
        component="div"
        size={{ xs: 12, sm: 12, md: 12, lg: 5 }}
        sx={{
          ...styleReservation.purchaseSummary,
          transform: {
            xs: `translateY(${!isVisibleGrid ? 0 : "calc(100% - 6.5rem"}))`,
            md: "translateY(0)",
          },
        }}
        onClick={() => setIsVisibleGrid((prev) => !prev)}
      >
        <LineTopIcon isVisibleGrid={isVisibleGrid} />
        <Box
          className="margin-0-auto "
          sx={{
            width: {
              xs: "calc(100% - 30px)",
              sm: "calc(100% - 30px)",
              md: 550,
            },
          }}
        >
          <Box
            className="margin-0-auto"
            component="img"
            sx={{
              content: {
                xs: "url(/images/svgMangataWhite.svg)",
                sm: "url(/images/svgMangataWhite.svg)",
                md: "url(/images/logoMangataBlue.png)",
              },
              display: { xs: "none", md: "flex" },
            }}
            alt="Logo Mangata"
          />
          <Box className="d-flex justify-content-between align-items-center margin-bottom">
            <PurchaseSummary
              price={handleFormatPrice()}
              isVisibleGrid={isVisibleGrid}
            />

            <Box
              component="img"
              className="wd-70 hg-70"
              sx={{
                content: {
                  xs: "url(/images/svgMangataWhite.svg)",
                  sm: "url(/images/svgMangataWhite.svg)",
                },
                display: { xs: "block", sm: "block", md: "flex" },
                objectFit: "cover",
              }}
              alt="Logo Mangata"
            />
          </Box>
          <Box>
            <StandardPackage
              title1={t("standardPackage")}
              title2={formatPrice(Number(PRICES.PRICE_MAX))}
              iconName="suitcase-tag"
            />

            <StandardPackage
              title1={t("date")}
              title2={dateChange}
              iconName="calendar"
              marginBottom={2}
            />

            <StandardPackage
              title1={t("persons")}
              title2={fields.length.toString()}
              iconName="users-group-rounded"
              marginBottom={2}
            />

            <StandardPackage
              title1="Total"
              title2={handleFormatPrice()}
              iconName="cart-large-4"
              marginBottom={2}
            />
          </Box>
          {handleValidHoursMoreTenLessSies ? (
            <Box className="d-flex justify-content-end">
              <Box
                className="container-button margin-buttom-16"
                sx={{
                  backgroundColor: {
                    xs: "var(--color-theme-white)",
                    sm: "var(--color-theme-white)",
                    md: "var(--color-theme-dark-blue)",
                  },
                }}
              >
                <Button
                  className=""
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: 14,
                    color: {
                      xs: "var(--color-theme-dark-blue)",
                      sm: "var(--color-theme-dark-blue)",
                      md: "var(--color-theme-white)",
                    },
                  }}
                  onClick={allFields}
                  startIcon={
                    <Box
                      component={Icon}
                      icon="solar:user-plus-bold-duotone"
                      className="wd-24 hg-24"
                      sx={{
                        color: {
                          xs: "var(--color-theme-dark-blue)",
                          sm: "var(--color-theme-dark-blue)",
                          md: "var(--color-theme-white)",
                        },
                      }}
                    />
                  }
                >
                  {t("reserve")}
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography style={{ color: "red", fontSize: 18 }}>
              {t("notReservation")}
            </Typography>
          )}
        </Box>
      </Grid2>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{ ...styleReservation.centerDiv, width: { xs: 300, lg: 400 } }}
        >
          <Box className="d-flex justify-content-center align-items-center flex-dirrection-row gap-4">
            <Typography
              variant="h5"
              className="text-align-center color-theme-black margin-block-16"
            >
              {t("checkReservation")}
            </Typography>
          </Box>

          {/* <Icon
              className="color-blue-dark"
              icon="solar:copy-bold-duotone"
              width="24"
              height="24"
              onClick={handleCopy}
            /> */}

          <Box className="d-block color-black-opacity margin-inline">
            <StandardPackage
              title1={t("reservation") + " Cod."}
              title2={CODE_RESERVATION}
              iconName="copy"
              marginBottom={2}
            />
            <StandardPackage
              title1={t("date")}
              title2={dateChange}
              iconName="calendar"
              marginBottom={2}
            />
            <StandardPackage
              title1="Total"
              title2={handleFormatPrice()}
              iconName="cart-large-4"
              marginBottom={2}
            />
          </Box>

          <Box className="d-flex justify-content-center align-items-center flex-wrap gap-8">
            <ButtonComponent
              background="background-harvest-gold"
              iconName=""
              onClick={() => {
                if (!loading) handleReservation();
              }}
              title={loading ? `${t("save")}...` : t("confirm")}
            />
            <ButtonComponent
              background="background-gray"
              iconName=""
              onClick={() => setOpenModal(false)}
              title={t("cancel")}
              colorTitle="black"
            />
          </Box>
        </Box>
      </Modal>
      <DialogPayMents
        open={openDialogPayment}
        setopen={setOpenDialogPayment}
        amount={calculatePrice()}
        payment_id={Number(CODE_RESERVATION)}
        name={fields[0].name}
        email={valueEmail}
      />
    </Grid2>
  );
};

export default NameLunchForm;
