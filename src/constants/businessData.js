export const BUSINESS_DATA = {
  name: "SHREENATHJI ELECTRICAL",
  brandNameFirst: "SHREENATHJI",
  brandNameSecond: "ELECTRICAL",
  owner: "Kamlesh Bhai",
  experience: "10+ Years",
  tagline: "10 Years of Trust. Powering Every Connection.",
  email: "shreenathjielectrical01@gmail.com",
  phone: "9824075278",
  phoneFormatted: "+91 98240 75278",
  whatsapp: "9824075278",
  whatsappUrl: `https://wa.me/919824075278?text=${encodeURIComponent("Hi Shreenathji Electrical, I would like to inquire about your products and services.")}`,
  instagramUrl: "https://www.instagram.com/shreenathjielectrical_01?vrfl=bGx4ZXZzejgzdGwx",
  instagramHandle: "@shreenathjielectrical_01",
  addressLine1: "Vaidwadi Street-4,",
  addressLine2: "Gondal Road, near D-Mart,",
  addressLine3: "Vaid Vadi, Sardar Nagar,",
  addressCity: "Rajkot, Gujarat 360004",
  fullAddress: "Vaidwadi Street-4, Gondal Road, near D-Mart, Vaid Vadi, Sardar Nagar, Rajkot, Gujarat 360004",
  businessHours: "Monday – Sunday, 8:00 AM – 8:00 PM",
  googleMapsUrl: "https://www.google.com/maps/place/Shreenathji+Electrical/@22.2728465,70.7978086,17z/data=!3m1!4b1!4m6!3m5!1s0x3959cb6ae4d6d5b3:0x5c635462d3f50f05!8m2!3d22.2728465!4d70.7978086!16s%2Fg%2F11xm0hnq3c",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.13565494987!2d70.7978086!3d22.2728465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb6ae4d6d5b3%3A0x5c635462d3f50f05!2sShreenathji%20Electrical!5e0!3m2!1sen!2sin!4v1"
};

// Panel types as specified
export const PANEL_SOLUTIONS = [
  {
    id: "motor-control-panels",
    title: "Motor Control Panels",
    badge: "MCC & VFD Drives",
    image: "/images/mcc-panel.jpg",
    description: "Modular motor control centers engineered with Star-Delta, DOL, soft starters, and VFD drives for heavy industrial motors, pumps, and crushers.",
    features: [
      "Modular starter compartments with independent isolation",
      "VFD speed modulation & electronic soft starters",
      "Thermal overload, under-voltage & single-phasing safety",
      "Dynamic motor current & RPM monitoring readouts"
    ]
  },
  {
    id: "power-distribution-panels",
    title: "Power Distribution Panels",
    badge: "PDB / LT Distribution",
    image: "/images/solar-distribution-panel.jpg",
    description: "Centralized Low Tension power distribution boards featuring electrolytic copper busbars, ACB/MCCB incomers, and compartmentalized outgoing feeders.",
    features: [
      "High conductivity 99.9% electrolytic copper busbars",
      "Multi-circuit outgoing feeder configurations with MCCBs",
      "Earth leakage, transient surge & short-circuit protection",
      "High fault current withstand rating up to 50kA/1s"
    ]
  },
  {
    id: "automation-control-panels",
    title: "Automation & Control Panels",
    badge: "PLC & SCADA",
    image: "/images/automation-control-panel.jpg",
    description: "Intelligent automation panels housing Programmable Logic Controllers (PLC), touch HMIs, regulated 24V DC supplies, and industrial communication modules.",
    features: [
      "Siemens, Schneider, Delta & Mitsubishi PLC integration",
      "Regulated 24V DC industrial power supplies & isolators",
      "Neat slotted cable trunking & ferruled wire labeling",
      "Surge-protected I/O terminals and noise immunity"
    ]
  },
  {
    id: "electrical-control-panels",
    title: "Electrical Control Panels",
    badge: "Machine & Process Control",
    image: "/images/power-distribution-panel.jpg",
    description: "Floor-standing and wall-mounted electrical control panels engineered for precise machinery operation, safety interlocking, and monitoring.",
    features: [
      "Door-mounted digital ammeters, voltmeters & phase lamps",
      "Heavy-duty contactors, cam switches & push buttons",
      "IP54/IP55 ingress-protected powder-coated steel housing",
      "Comprehensive schematic drawings & terminal labeling"
    ]
  },
  {
    id: "industrial-electrical-panels",
    title: "Industrial Electrical Panels",
    badge: "Heavy-Duty Switchgear",
    image: "/images/industrial-electrical-panel.jpg",
    description: "Robust multi-tier industrial switchboards and main intake power control centers engineered for factories, substations, and industrial complexes.",
    features: [
      "Form 3b / Form 4b internal compartmentalization",
      "Accommodates high-capacity Air Circuit Breakers (ACB up to 4000A)",
      "Lockout-Tagout (LOTO) safety compliance & safety shrouding",
      "High fault withstand certified engineering and testing"
    ]
  },
  {
    id: "apfc-panels",
    title: "APFC Panels",
    badge: "Power Factor Correction",
    image: "/images/apfc-panel.jpg",
    description: "Automatic Power Factor Correction panels with intelligent microprocessor relays and heavy-duty capacitor banks to reduce kVA demand penalties.",
    features: [
      "Maintains target power factor between 0.95 and 0.99",
      "Detuned harmonic filtering reactors",
      "Heavy-duty gas-filled self-healing capacitors",
      "Step-wise switching with automatic controller"
    ]
  },
  {
    id: "pcc-panels",
    title: "PCC Panels",
    badge: "Power Control Center",
    image: "/images/pcc-panel.jpg",
    description: "Main intake power control switchboards accommodating high-capacity Air Circuit Breakers (ACB) and main incomers.",
    features: [
      "Ratings from 630A up to 4000A ACB",
      "High breaking capacity fault clearance",
      "Microprocessor-based release units",
      "Color-coded busbar chambers & shrouds"
    ]
  }
];

// Services
export const SERVICES_DATA = [
  {
    id: "panel-manufacturing",
    title: "Electrical Panel Manufacturing",
    icon: "Cpu",
    description: "Complete design, fabrication, assembly, wiring, and rigorous testing of custom LT, MCC, PCC, and APFC electrical panel boards built for industrial excellence."
  },
  {
    id: "electrical-fitting",
    title: "Electrical Fitting",
    icon: "Wrench",
    description: "Precision installation of electrical equipment, busway trunking, cable tray routing, glanding, termination, switchgear fitting, and field device connections."
  },
  {
    id: "electrical-repairing",
    title: "Electrical Repairing",
    icon: "ShieldAlert",
    description: "Rapid troubleshooting and repair of faulty circuit breakers, blown capacitors, burnt busbars, contactor failure, control circuit defects, and motor rewinds."
  },
  {
    id: "panel-installation",
    title: "Panel Installation",
    icon: "Settings",
    description: "On-site panel alignment, foundation mounting, primary busbar coupling, incoming/outgoing cable termination, earthing, and pre-commissioning testing."
  },
  {
    id: "industrial-electrical",
    title: "Industrial Electrical Solutions",
    icon: "Factory",
    description: "Comprehensive end-to-end industrial power distribution setups, plant electrification, substation maintenance, power factor enhancement, and load balancing."
  },
  {
    id: "custom-panel-solutions",
    title: "Custom Panel Solutions",
    icon: "Sliders",
    description: "Bespoke panel architecture tailored to specialized site dimensions, harsh environments, dual-source incomers, automation protocols, and specific client requirements."
  }
];

// Competence Points
export const COMPETENCE_LEFT = [
  "Understanding customer requirements thoroughly",
  "Reliable electrical panel solutions",
  "Quality workmanship",
  "Electrical fitting and repairing",
  "Safety-focused approach",
  "Reliable technical support",
  "Professional after-sales support"
];

export const COMPETENCE_CATEGORIES = [
  { name: "Industrial Panels", icon: "Layers" },
  { name: "Power Distribution", icon: "Zap" },
  { name: "Motor Control", icon: "Activity" },
  { name: "Electrical Fitting", icon: "Wrench" },
  { name: "Electrical Repairing", icon: "Tool" },
  { name: "Automation", icon: "Cpu" },
  { name: "Commercial Buildings", icon: "Building" },
  { name: "Industrial Buildings", icon: "Factory" }
];
