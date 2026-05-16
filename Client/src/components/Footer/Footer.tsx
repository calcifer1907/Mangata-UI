import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { buildWhatsAppUrl } from "../../generalFunctions/generalFunction";

import "./Footer.css";

const FOOTER_PHONE = "573126056467";
const FOOTER_EMAIL = "mangatabypietro2021@gmail.com";

const footerLinks = [
  { titleKey: "home", path: "/" },
  { titleKey: "dayTrip", path: "/DayTrip" },
  {
    titleKey: "Lodging",
    path: "https://engine.ayenda.co/mangata-beach-9a99c4fa-disabled-sale",
  },
  { titleKey: "Menu", path: "/Menu" },
  { titleKey: "Events", path: "/Events" },
  { titleKey: "boatRental", path: "/Boat" },
  { titleKey: "Contact", path: "/Contact" },
] as const;

const socialLinks = [
  {
    href: "https://www.instagram.com/mangatacartagena",
    icon: "/images/instagram.svg",
    label: "Instagram",
    width: 28,
  },
  {
    href: "https://www.tiktok.com/@mangatacartagena",
    icon: "/images/TikTok.svg",
    label: "TikTok",
    width: 22,
  },
] as const;

const Footer = () => {
  const { t } = useTranslation("home");
  const whatsappHref = buildWhatsAppUrl(
    import.meta.env.VITE_WHATSAPP_NUMBER ?? FOOTER_PHONE,
    import.meta.env.VITE_WHATSAPP_MESSAGE ?? "Hola, quiero más información.",
  );

  return (
    <Box component="footer" className="footer">
      <Box className="footer-inner">
        <Box className="footer-grid">
          <Box className="footer-brand">
            <Box
              component="img"
              src="/images/logoMangataBlue.png"
              alt="Mangata Beach Club"
              className="footer-logo"
            />
            <Typography className="footer-tagline">
              {t("footerTagline")}
            </Typography>
            <Stack direction="row" spacing={1.5} className="footer-social">
              {socialLinks.map(({ href, icon, label, width }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-link"
                >
                  <Box component="img" src={icon} alt="" width={width} />
                </Link>
              ))}
            </Stack>
          </Box>

          <Box className="footer-column">
            <Typography component="h3" className="footer-heading">
              {t("footerExplore")}
            </Typography>
            <Stack component="nav" spacing={1} aria-label={t("footerExplore")}>
              {footerLinks.map(({ titleKey, path }) => (
                <Link
                  key={path}
                  component={NavLink}
                  to={path}
                  className="footer-nav-link"
                  end={path === "/"}
                >
                  {t(titleKey)}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box className="footer-column">
            <Typography component="h3" className="footer-heading">
              {t("footerContact")}
            </Typography>
            <Stack spacing={2}>
              <Link
                href={`https://maps.google.com/?q=Mangata+Isla+Grande+Cartagena`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <LocationOnOutlinedIcon className="footer-contact-icon" />
                <span>
                  {t("IslandsSector")}
                  <br />
                  Zaragoza, Colombia
                </span>
              </Link>
              <Link
                href={`mailto:${FOOTER_EMAIL}`}
                className="footer-contact-item"
              >
                <EmailOutlinedIcon className="footer-contact-icon" />
                <span>{FOOTER_EMAIL}</span>
              </Link>
              <Link href={whatsappHref} className="footer-contact-item">
                <PhoneOutlinedIcon className="footer-contact-icon" />
                <span>+57 312 605 6467</span>
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider className="footer-divider" />

        <Typography className="footer-copyright">
          {t("footerCopyright", { year: new Date().getFullYear() })}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
