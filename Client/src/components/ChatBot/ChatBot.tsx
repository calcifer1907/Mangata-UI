import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import {
  Box,
  Fab,
  IconButton,
  TextField,
  Tooltip,
  Zoom,
  Slide,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/ChatOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { buildWhatsAppUrl } from "../../generalFunctions/generalFunction";
import { FAQ_DATA, INITIAL_QUICK_REPLIES, MAIN_MENU_ID, type FaqEntry, type FaqLink } from "./chatbotData";

import "./ChatBot.css";

interface ChatMessage {
  id: string;
  text: string;
  sender: "bot" | "user";
  time: string;
  quickReplies?: string[];
  showWhatsApp?: boolean;
  pageLinks?: FaqLink[];
}

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER ?? "573126056467";

function getTimeString(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function ChatBot() {
  const { i18n } = useTranslation();
  const [chatLang, setChatLang] = useState<"es" | "en">(
    i18n.language?.startsWith("en") ? "en" : "es",
  );
  const lang = chatLang;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const labelForLang = (faq: FaqEntry, l: "es" | "en") => (l === "en" ? faq.labelEn : faq.labelEs);
  const answerForLang = (faq: FaqEntry, l: "es" | "en") => (l === "en" ? faq.answerEn : faq.answerEs);
  const label = (faq: FaqEntry) => labelForLang(faq, lang);
  const answer = (faq: FaqEntry) => answerForLang(faq, lang);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  const addBotMessage = useCallback(
    (
      text: string,
      quickReplies?: string[],
      showWhatsApp?: boolean,
      pageLinks?: FaqLink[],
    ) => {
      setTyping(true);
      const delay = Math.min(600 + text.length * 4, 1500);
      typingTimerRef.current = setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            text,
            sender: "bot",
            time: getTimeString(),
            quickReplies,
            showWhatsApp,
            pageLinks,
          },
        ]);
      }, delay);
    },
    [],
  );

  const showWelcome = useCallback((l: "es" | "en") => {
    const welcomeText =
      l === "en"
        ? "Hi! 👋 I'm the Mangata assistant. How can I help you? Choose an option or type your question."
        : "¡Hola! 👋 Soy el asistente de Mangata. ¿En qué puedo ayudarte? Elige una opción o escribe tu pregunta.";
    addBotMessage(welcomeText, INITIAL_QUICK_REPLIES);
  }, [addBotMessage]);

  const handleOpen = () => {
    setOpen(true);
    if (!initialized) {
      setInitialized(true);
      showWelcome(lang);
    }
  };

  const handleClose = () => setOpen(false);

  const handleLangChange = (newLang: "es" | "en") => {
    if (newLang === lang) return;
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setTyping(false);
    setChatLang(newLang);
    setMessages([]);
    setInput("");
    showWelcome(newLang);
  };

  const handleQuickReply = (faqId: string) => {
    const faq = FAQ_DATA.find((f) => f.id === faqId);
    if (!faq) return;

    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        text: label(faq),
        sender: "user",
        time: getTimeString(),
      },
    ]);

    if (faqId === MAIN_MENU_ID) {
      addBotMessage(answer(faq), INITIAL_QUICK_REPLIES);
    } else if (faqId === "person") {
      addBotMessage(answer(faq), faq.followUpIds, true);
    } else {
      addBotMessage(
        answer(faq),
        faq.followUpIds,
        false,
        faq.link ? [faq.link] : undefined,
      );
    }
  };

  const findBestMatch = (text: string): FaqEntry | null => {
    const lower = text.toLowerCase();
    const keywords: Record<string, string[]> = {
      daytrip: ["pasadia", "pasadía", "pasa día", "pasa dia", "day trip", "daytrip", "playa", "beach"],
      prices: ["precio", "price", "costo", "cost", "cuanto", "cuánto", "how much", "tarifa", "rate", "valor"],
      location: ["donde", "dónde", "ubicación", "ubicacion", "where", "location", "llegar", "dirección", "address", "muelle"],
      schedule: ["horario", "hora", "schedule", "time", "cuando", "cuándo", "when"],
      lodging: ["hospedaje", "hotel", "habitación", "habitacion", "room", "lodging", "dormir", "sleep", "stay", "noche"],
      boat: ["bote", "boat", "lancha", "barco", "ship", "rental", "renta", "nautic"],
      events: ["evento", "event", "boda", "wedding", "cumpleaño", "birthday", "fiesta", "party", "celebra", "corporativo"],
      menu: ["menu", "menú", "comida", "food", "restaurante", "restaurant", "plato", "dish", "comer", "eat", "almuerzo", "lunch"],
      reservation: ["reserva", "reservar", "book", "booking", "agendar"],
      person: ["persona", "person", "humano", "human", "agente", "agent", "hablar", "talk", "asesor", "ayuda real", "alguien"],
      activities: ["actividad", "activity", "snorkel", "kayak", "paddle", "deporte", "sport", "hacer", "do"],
      mainmenu: ["menú principal", "menu principal", "main menu", "volver", "inicio", "back", "start"],
    };

    let bestId: string | null = null;
    let bestCount = 0;

    for (const [faqId, words] of Object.entries(keywords)) {
      const count = words.filter((w) => lower.includes(w)).length;
      if (count > bestCount) {
        bestCount = count;
        bestId = faqId;
      }
    }

    if (bestId) return FAQ_DATA.find((f) => f.id === bestId) ?? null;
    return null;
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        text: trimmed,
        sender: "user",
        time: getTimeString(),
      },
    ]);
    setInput("");

    const match = findBestMatch(trimmed);
    if (match) {
      if (match.id === MAIN_MENU_ID) {
        addBotMessage(answer(match), INITIAL_QUICK_REPLIES);
      } else if (match.id === "person") {
        addBotMessage(answer(match), match.followUpIds, true);
      } else {
        addBotMessage(
          answer(match),
          match.followUpIds,
          false,
          match.link ? [match.link] : undefined,
        );
      }
    } else {
      const fallback =
        lang === "en"
          ? "I'm not sure about that. Would you like to talk to someone from our team? They can help you with anything!"
          : "No estoy seguro de eso. ¿Te gustaría hablar con alguien de nuestro equipo? ¡Pueden ayudarte con cualquier duda!";
      addBotMessage(fallback, ["person", "daytrip", "prices", MAIN_MENU_ID]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const whatsAppUrl = buildWhatsAppUrl(
    WHATSAPP_NUMBER,
    lang === "en"
      ? "Hi! I have a question about Mangata Beach Club."
      : "¡Hola! Tengo una consulta sobre Mangata Beach Club.",
  );

  return (
    <>
      {/* Floating button */}
      <Zoom in={!open} unmountOnExit>
        <Tooltip
          title={lang === "en" ? "Chat with us" : "Chatea con nosotros"}
          placement="left"
        >
          <Fab
            onClick={handleOpen}
            aria-label="Chat"
            className="chatbot-fab"
          >
            <ChatIcon />
            <span className="chatbot-badge" />
          </Fab>
        </Tooltip>
      </Zoom>

      {/* Chat panel */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box className="chatbot-panel">
          {/* Header */}
          <Box className="chatbot-header">
            <img
              src="/images/logoMangataBlue.png"
              alt="Mangata"
              className="chatbot-header-avatar"
            />
            <Box className="chatbot-header-info">
              <Box className="chatbot-header-name">Mangata Beach Club</Box>
              <Box className="chatbot-header-status">
                {lang === "en" ? "Online" : "En línea"}
              </Box>
            </Box>
            <Box className="chatbot-lang-toggle">
              <button
                type="button"
                className={`chatbot-lang-btn ${lang === "es" ? "chatbot-lang-active" : ""}`}
                onClick={() => handleLangChange("es")}
              >
                ES
              </button>
              <button
                type="button"
                className={`chatbot-lang-btn ${lang === "en" ? "chatbot-lang-active" : ""}`}
                onClick={() => handleLangChange("en")}
              >
                EN
              </button>
            </Box>
            <IconButton
              onClick={handleClose}
              className="chatbot-close-btn"
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box className="chatbot-messages">
            {messages.map((msg) => (
              <Box key={msg.id}>
                <Box
                  className={`chatbot-msg ${
                    msg.sender === "bot" ? "chatbot-msg-bot" : "chatbot-msg-user"
                  }`}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                  <Box className="chatbot-msg-time">{msg.time}</Box>
                </Box>

                {msg.pageLinks && msg.pageLinks.length > 0 && (
                  <Box className="chatbot-page-links">
                    {msg.pageLinks.map((pl) => (
                      <button
                        key={pl.to}
                        type="button"
                        className="chatbot-page-link-btn"
                        onClick={() => {
                          navigate(pl.to);
                          setOpen(false);
                        }}
                      >
                        <span>{lang === "en" ? pl.labelEn : pl.labelEs}</span>
                        <OpenInNewIcon sx={{ fontSize: 16 }} />
                      </button>
                    ))}
                  </Box>
                )}

                {msg.showWhatsApp && (
                  <Box className="chatbot-whatsapp-banner">
                    <WhatsAppIcon sx={{ color: "#25D366", fontSize: 28 }} />
                    <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                      {lang === "en"
                        ? "Open WhatsApp chat →"
                        : "Abrir chat de WhatsApp →"}
                    </a>
                  </Box>
                )}

                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <Box className="chatbot-quick-replies">
                    {msg.quickReplies.map((qrId) => {
                      const faq = FAQ_DATA.find((f) => f.id === qrId);
                      if (!faq) return null;
                      return (
                        <button
                          key={qrId}
                          type="button"
                          className="chatbot-quick-btn"
                          onClick={() => handleQuickReply(qrId)}
                        >
                          {label(faq)}
                        </button>
                      );
                    })}
                  </Box>
                )}
              </Box>
            ))}

            {typing && (
              <Box className="chatbot-typing">
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box className="chatbot-input-area">
            <TextField
              className="chatbot-input-field"
              size="small"
              fullWidth
              placeholder={
                lang === "en" ? "Type your question..." : "Escribe tu pregunta..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <IconButton
              className="chatbot-send-btn"
              onClick={handleSend}
              disabled={!input.trim()}
              size="small"
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Slide>
    </>
  );
}
