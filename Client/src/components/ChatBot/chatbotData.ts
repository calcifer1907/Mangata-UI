export interface FaqLink {
  labelEs: string;
  labelEn: string;
  to: string;
}

export interface FaqEntry {
  id: string;
  labelEs: string;
  labelEn: string;
  answerEs: string;
  answerEn: string;
  followUpIds?: string[];
  link?: FaqLink;
}

export const MAIN_MENU_ID = "mainmenu";

export const FAQ_DATA: FaqEntry[] = [
  {
    id: MAIN_MENU_ID,
    labelEs: "🏠 Menú principal",
    labelEn: "🏠 Main menu",
    answerEs:
      "¡Claro! ¿En qué más puedo ayudarte? Elige una opción o escribe tu pregunta.",
    answerEn:
      "Sure! What else can I help you with? Choose an option or type your question.",
  },
  {
    id: "daytrip",
    labelEs: "🏖️ Pasadía",
    labelEn: "🏖️ Day Trip",
    answerEs:
      "Nuestro pasadía incluye transporte marítimo ida y regreso, copa de bienvenida, almuerzo a la carta (8 opciones), deportes acuáticos (snorkel, kayak, paddle board), bicicleta, sillas asoleadoras, hamacas, camas balinesas, ducha de agua dulce y servicio de toalla. La llegada al muelle es a las 7:30 a.m. y el regreso a las 4:00 p.m. aproximadamente.",
    answerEn:
      "Our day trip includes round-trip sea transport, welcome drink, à la carte lunch (8 options), water sports (snorkeling, kayak, paddle board), bicycle, sun chairs, hammocks, Balinese beds, freshwater shower, and towel service. Dock arrival is at 7:30 a.m. and return at approximately 4:00 p.m.",
    followUpIds: ["prices", "reservation", "location", MAIN_MENU_ID],
    link: {
      labelEs: "🏖️ Reservar Pasadía",
      labelEn: "🏖️ Book Day Trip",
      to: "/MangataReservation",
    },
  },
  {
    id: "prices",
    labelEs: "💰 Precios",
    labelEn: "💰 Prices",
    answerEs:
      "Los precios varían según la temporada y el tipo de experiencia. Para obtener los precios actualizados y disponibilidad, te invitamos a contactarnos directamente por WhatsApp o a través de nuestro formulario de contacto. ¡Con gusto te daremos toda la información!",
    answerEn:
      "Prices vary depending on the season and type of experience. For updated pricing and availability, we invite you to contact us directly via WhatsApp or through our contact form. We'll be happy to give you all the information!",
    followUpIds: ["person", "reservation", MAIN_MENU_ID],
  },
  {
    id: "location",
    labelEs: "📍 Ubicación",
    labelEn: "📍 Location",
    answerEs:
      "Mangata está ubicado en Isla Grande, en el sector de las Islas del Rosario, Zaragoza, Colombia. Estamos a pocos minutos en lancha desde Cartagena de Indias. El punto de salida es el Muelle Todo Mar.",
    answerEn:
      "Mangata is located on Isla Grande, in the Rosario Islands sector, Zaragoza, Colombia. We're just a few minutes by boat from Cartagena de Indias. The departure point is the Todo Mar dock.",
    followUpIds: ["daytrip", "schedule", MAIN_MENU_ID],
  },
  {
    id: "schedule",
    labelEs: "🕐 Horarios",
    labelEn: "🕐 Schedule",
    answerEs:
      "Para el pasadía: llegada al Muelle Todo Mar a las 7:30 a.m., regreso aproximadamente a las 4:00 p.m. El bote tiene salidas desde las 8 a.m. hasta las 4 p.m. para recorridos por las islas, y recorridos por la Bahía de Cartagena hasta las 9 p.m.",
    answerEn:
      "For the day trip: arrival at Todo Mar dock at 7:30 a.m., return at approximately 4:00 p.m. The boat operates from 8 a.m. to 4 p.m. for island tours, and Cartagena Bay tours until 9 p.m.",
    followUpIds: ["daytrip", "boat", MAIN_MENU_ID],
  },
  {
    id: "lodging",
    labelEs: "🏨 Hospedaje",
    labelEn: "🏨 Lodging",
    answerEs:
      "En Mangata contamos con habitaciones frente al mar para que puedas despertar con el sonido de las olas. Ofrecemos opciones de hospedaje para parejas y grupos. Para disponibilidad y reservas, puedes consultar directamente con nosotros o a través de nuestra plataforma de reservas.",
    answerEn:
      "At Mangata we have beachfront rooms so you can wake up to the sound of the waves. We offer lodging options for couples and groups. For availability and reservations, you can check directly with us or through our booking platform.",
    followUpIds: ["prices", "reservation", "person", MAIN_MENU_ID],
  },
  {
    id: "boat",
    labelEs: "🚤 Renta de bote",
    labelEn: "🚤 Boat Rental",
    answerEs:
      "Ofrecemos un bote deportivo de 42 pies con capacidad para hasta 21 personas, con baño y sistema de sonido. Incluye bote privado, equipo de snorkel, bebida de bienvenida y sistema de música. Tiene seguro todo riesgo y capitán certificado. Perfecto para recorridos por las islas, snorkel, atardeceres y fiestas.",
    answerEn:
      "We offer a 42-foot sports boat with capacity for up to 21 people, with bathroom and sound system. It includes a private boat, snorkeling equipment, welcome drink, and music system. It has comprehensive insurance and a certified captain. Perfect for island tours, snorkeling, sunsets, and parties.",
    followUpIds: ["prices", "schedule", "reservation", MAIN_MENU_ID],
    link: {
      labelEs: "🚤 Reservar Bote",
      labelEn: "🚤 Book Boat",
      to: "/BoatRental",
    },
  },
  {
    id: "events",
    labelEs: "🎉 Eventos",
    labelEn: "🎉 Events",
    answerEs:
      "Realizamos bodas en la playa, cumpleaños, pedidas de mano, despedidas, eventos privados y corporativos. Todo incluye espacio frente al mar, staff dedicado, menú especial, coctelería personalizada, música y logística completa. También puedes agregar decoración, barra libre, fotógrafo, DJ y más.",
    answerEn:
      "We host beach weddings, birthdays, proposals, farewell parties, private and corporate events. Everything includes beachfront space, dedicated staff, special menu, personalized cocktails, music, and full logistics. You can also add decoration, open bar, photographer, DJ and more.",
    followUpIds: ["prices", "person", MAIN_MENU_ID],
  },
  {
    id: "menu",
    labelEs: "🍽️ Restaurante",
    labelEn: "🍽️ Restaurant",
    answerEs:
      "Nuestro restaurante ofrece sabores del Caribe frente al mar, con productos frescos y platos locales. Contamos con opciones de almuerzo a la carta con 8 platos disponibles. Puedes disfrutar en nuestro restaurante con aire acondicionado o al aire libre.",
    answerEn:
      "Our restaurant offers Caribbean flavors by the sea, with fresh products and local dishes. We have à la carte lunch options with 8 dishes available. You can dine in our air-conditioned restaurant or outdoors.",
    followUpIds: ["daytrip", "reservation", MAIN_MENU_ID],
  },
  {
    id: "reservation",
    labelEs: "📅 Reservar",
    labelEn: "📅 Book Now",
    answerEs:
      "¡Excelente! ¿Qué experiencia te gustaría reservar? Elige una opción para ir directamente a la reserva:",
    answerEn:
      "Excellent! Which experience would you like to book? Choose an option to go directly to the reservation:",
    followUpIds: ["daytrip", "boat", "person", MAIN_MENU_ID],
  },
  {
    id: "person",
    labelEs: "👤 Hablar con una persona",
    labelEn: "👤 Talk to a person",
    answerEs:
      "¡Por supuesto! Te conecto con nuestro equipo de atención al cliente por WhatsApp. Ellos te pueden ayudar con reservas, precios, disponibilidad y cualquier pregunta que tengas.",
    answerEn:
      "Of course! I'll connect you with our customer service team on WhatsApp. They can help you with reservations, pricing, availability, and any questions you have.",
    followUpIds: [MAIN_MENU_ID],
  },
  {
    id: "activities",
    labelEs: "🤿 Actividades",
    labelEn: "🤿 Activities",
    answerEs:
      "En Mangata puedes disfrutar de snorkelling para explorar arrecifes de coral, kayak, paddle board, bicicleta, recorridos en bote por las Islas del Rosario, tours al atardecer por la Bahía de Cartagena y más. ¡La diversión no para!",
    answerEn:
      "At Mangata you can enjoy snorkeling to explore coral reefs, kayaking, paddle boarding, cycling, boat tours around the Rosario Islands, sunset tours in Cartagena Bay and more. The fun never stops!",
    followUpIds: ["boat", "daytrip", "reservation", MAIN_MENU_ID],
  },
];

export const INITIAL_QUICK_REPLIES = [
  "daytrip",
  "prices",
  "lodging",
  "boat",
  "events",
  "person",
];
