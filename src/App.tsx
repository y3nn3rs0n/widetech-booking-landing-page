/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CalendarCheck, Download, Sparkles, Play, Zap, ShieldCheck, 
  Settings, Heart, Terminal, Compass, Copy, Check, ChevronDown, 
  Star, ChevronRight, CheckSquare, MessageCircle, Github, Layers, FileText
} from "lucide-react";
import BookingDemo from "./components/BookingDemo";
import ThemePreview from "./components/ThemePreview";
import WhatsAppPreview from "./components/WhatsAppPreview";
import { FAQItem, Testimonial } from "./types";

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alejandro Ruiz",
    role: "Desarrollador Generalistas",
    company: "DevsAndAgencies",
    content: "Esto es justo lo que necesitaba. Es extremadamente rápido y ligero, solo 48KB en total. No tiene dependencias como Composer, por lo que nunca se rompe al actualizar WordPress. El mejor plugin de reservas que he probado.",
    rating: 5,
    avatar: "AR"
  },
  {
    name: "Beatriz Mendoza",
    role: "Directora de Clientes",
    company: "Sistemas Clínicos MB",
    content: "Mis clientes adoran reservar citas desde aquí. La integración bidireccional con Google Calendar funciona impecable: si bloqueo una hora en mi teléfono, la web se actualiza solos en tiempo real. ¡Las notificaciones de WhatsApp tienen un 100% de asistencia!",
    rating: 5,
    avatar: "BM"
  },
  {
    name: "Santiago Torres",
    role: "Administrador de Sistemas",
    company: "Estudios Almar",
    content: "Configuración limpia en 5 minutos. Conectamos la API de Google, pegamos el shortcode y listo. La purga de caché automática con WP Rocket es una genialidad; evita que aparezcan horas ya reservadas por otros usuarios.",
    rating: 5,
    avatar: "ST"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "¿Se necesita saber de código para instalar y configurar el plugin?",
    answer: "No, en absoluto. El plugin incluye un asistente visual interactivo que te guía paso a paso desde la obtención de credenciales OAuth de Google Cloud hasta la publicación del calendario en tu web usando un simple Shortcode."
  },
  {
    question: "¿Los clientes necesitan una cuenta de Google para agendar una cita?",
    answer: "No. Solo tú (el administrador) necesitas autorizar tu Google Calendar una vez. Los visitantes del sitio web rellenan un formulario nativo normal y no tienen que iniciar sesión en ninguna cuenta de Google."
  },
  {
    question: "¿Se exponen los datos personales o correos electrónicos de mis citas en la API pública?",
    answer: "La privacidad es nuestra prioridad absoluta. El endpoint público de WordPress solo expone los estados de ocupación de las horas ('Reservado' / 'No disponible') y las horas de inicio/fin. Los nombres, emails y teléfonos se graban privadamente en tu panel local de WordPress y en tu Google Calendar."
  },
  {
    question: "¿Es compatible con plugins de caché potentes como WP Rocket o LiteSpeed?",
    answer: "Sí, WIdeTech Booking incluye filtros nativos de purga automática para WP Rocket, LiteSpeed Cache, WP Super Cache, W3 Total Cache y SG Optimizer. Al confirmarse una reserva, el sistema purga automáticamente la página del shortcode para que no haya duplicados."
  },
  {
    question: "¿Puedo instalarlo en múltiples sitios web de clientes?",
    answer: "Sí, el plugin tiene licencia libre GPLv2. Puedes utilizarlo en todas las webs que desees. Cada instalación necesitará su propio miniproyecto personal de Google Cloud para interactuar con las APIs de Google."
  }
];

export default function App() {
  const [showDemo, setShowDemo] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<"light" | "dark" | "custom">("light");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleCopyShortcode = () => {
    navigator.clipboard.writeText("[widetech_booking]");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600/10 transition-colors duration-300">
      
      {/* Dynamic Themed Accent Lights based on Theme Selector on Hero */}
      <div className="absolute top-0 inset-x-0 h-[480px] pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[650px] h-[320px] rounded-full blur-[140px] opacity-40 transition-all duration-300"
          style={{
            backgroundColor: 
              activeTheme === "custom" ? "#10b981" : 
              activeTheme === "dark" ? "#1d4ed8" : "#3b82f6"
          }}
        />
      </div>

      {/* Sticky Premium Navbar */}
      <header className="sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-40 transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-18 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-sm shadow-blue-500/10 group-hover:scale-105 transition-all">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-800 dark:text-white">
                Bookly<span className="text-blue-600">Lite</span>
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-slate-400 uppercase font-semibold leading-none mt-0.5">
                48KB WP SCHEDULE · WIDETECH
              </span>
            </div>
          </a>

          {/* Desktop Navigation Anchors */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-650 dark:text-slate-350">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all">Características</a>
            <a href="#diferenciadores" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all">Diferenciadores</a>
            <a href="#installation" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all">Instalación</a>
            <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all">Testimonios</a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all">FAQ</a>
          </nav>

          {/* Download CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href={`${import.meta.env.BASE_URL}widetech-booking.zip`}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Instalar Gratis</span>
            </a>
          </div>

        </div>
      </header>

      {/* Main Body Grid Layout Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 md:py-16 space-y-24">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text and CTA actions */}
          <div className="space-y-6">
            
            {/* Banner status */}
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Nueva Versión 2.0</span>
            </div>

            {/* Title / Value proposition */}
            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-5xl md:text-6xl text-slate-900 dark:text-white leading-tight tracking-tight">
                El sistema de reservas <span className="text-blue-600 dark:text-blue-400">más ligero</span> para WordPress.
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl font-sans">
                Conecta con Google Calendar en 1 clic y empieza a recibir citas en 5 minutos. Sin dependencias externas, solo 48KB de pura eficiencia.
              </p>
            </div>

            {/* Two Call to actions buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center max-w-md pt-2">
              <a
                href={`${import.meta.env.BASE_URL}widetech-booking.zip`}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold font-sans text-sm tracking-tight transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-200 dark:shadow-none hover:scale-102"
              >
                <Download className="w-4.5 h-4.5" />
                <span>Descargar Plugin (.zip)</span>
              </a>
            </div>

            {/* Extra details indicator */}
            <div className="flex items-center gap-4 text-xs text-slate-450 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                48KB Total
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Sin Composer (No vendor/)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Compatible con PHP 8.x
              </span>
            </div>

          </div>

          {/* Right Visual Interactive Mockups */}
          <div className="h-[430px] rounded-3xl relative flex items-center justify-center my-8 lg:my-0">
            {/* Ambient Back Glow */}
            <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-tr from-blue-500/10 to-indigo-500/5 blur-3xl -z-10 animate-pulse" />

            {/* Loaded Live Switching Preview */}
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-2xl relative transform rotate-1 transition-transform hover:rotate-0 duration-300">
              <ThemePreview 
                onThemeChange={(t) => setActiveTheme(t)} 
                onOpenDemo={() => {}} 
              />
            </div>
          </div>

        </section>

        {/* GEOMETRIC BALANCE FEATURE BAR */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800/60">
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2 shadow-sm">
              <Layers className="w-5.5 h-5.5" />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">48KB Total</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">Sin dependencias externas. Rendimiento puro v1.0.</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2 shadow-sm">
              <CalendarCheck className="w-5.5 h-5.5" />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Google Sync</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">Sincronización bidireccional automática directa.</p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 text-center space-y-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2 shadow-sm">
              <MessageCircle className="w-5.5 h-5.5" />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Notificaciones</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">Avisos gratuitos por Email.</p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 text-center space-y-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2 shadow-sm">
              <Sparkles className="w-5.5 h-5.5 text-amber-500" />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Temas Incluidos</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">Light, Dark y Custom para combinar con tu marca.</p>
          </div>
        </section>


        {/* WHY IS IT DIFFERENT? (DIFERENCIADORES TÉCNICOS CRÍTICOS) */}
        <section id="diferenciadores" className="space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
              CONSTRUCCIÓN EXTREMA
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              ¿Por qué es diferente a todos los demás?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              No nos limitamos a empaquetar librerías masivas de Node o Composer. Hemos optimizado cada byte para mantener tu base de datos pura.
            </p>
          </div>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Card 1: 48KB & No Composer */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 md:p-8 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 w-fit">
                  <Layers className="w-5.5 h-5.5 text-blue-600" />
                </div>
                <h3 className="font-display font-medium text-lg md:text-xl tracking-tight">
                  Peso Pluma: 48KB total sin Composer
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  Otros plugins de reservas pesan hasta 12MB porque integran pesadas dependencias de terceros como Guzzle, PSR o vendor/. WIdeTech Booking usa la <strong>WordPress HTTP API nativa</strong>, garantizando que el plugin funcione en cualquier hosting compartido y no ralentice el arranque de tu panel administrativo.
                </p>
              </div>

              {/* Comparative Graphic Weight */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-250/20 text-xs">
                <p className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2.5">
                  COMPARATIVA DE PESO EN DISCO (PLUGIN)
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-24 font-mono font-medium text-slate-500">Otros Plugins:</span>
                    <div className="flex-1 h-3 rounded-full bg-rose-100 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: "95%" }} />
                    </div>
                    <span className="w-12 font-mono text-right text-rose-600 font-semibold">12.5 MB</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-24 font-mono font-bold text-blue-600 dark:text-blue-400">WIdeTech:</span>
                    <div className="flex-1 h-3 rounded-full bg-blue-105 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" style={{ width: "1.5%" }} />
                    </div>
                    <span className="w-12 font-mono text-right text-blue-600 dark:text-blue-400 font-bold">48 KB</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Card 2: 3 Themes Light and Dark */}
            <div className="md:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold">
                  Skins Disponibles
                </span>
                <h3 className="font-display font-medium text-lg tracking-tight">
                  3 Temas integrados de fábrica
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  Dispones de tres presets (<strong>Claro, Oscuro y Custom</strong>) diseñados meticulosamente con CSS aislado e identificadores únicos. Se adaptan perfectamente a tu constructor (Elementor, Divi o Gutenberg) con un solo shortcode y sin degradar la pantalla con scripts duplicados.
                </p>
              </div>

              {/* Mini visual representations mapping colors and layout */}
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
                <button onClick={() => selectThemeFromBanner("light")} className="p-3 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col items-center justify-center gap-1.5 outline-none cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-blue-600" />
                  <span className="text-[10px] font-semibold text-slate-800">Light</span>
                </button>
                <button onClick={() => selectThemeFromBanner("dark")} className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col items-center justify-center gap-1.5 outline-none cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-slate-400" />
                  <span className="text-[10px] font-semibold text-slate-300">Dark</span>
                </button>
                <button onClick={() => selectThemeFromBanner("custom")} className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg flex flex-col items-center justify-center gap-1.5 outline-none cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-semibold text-emerald-800">Custom</span>
                </button>
              </div>
            </div>

            {/* Card 3: Two-way Google Calendar Sync */}
            <div className="md:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 w-fit">
                  <Terminal className="w-5.5 h-5.5 text-blue-600" />
                </div>
                <h3 className="font-display font-medium text-lg tracking-tight">
                  Sincronización Bidireccional Activa
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  Utiliza las APIs seguras de Google OAuth2 para comunicarse directamente. Cuando se realiza una reserva en tu web, se inserta inmediatamente en tu Google Calendar corporativo. Si cancelas o arrastras el bloque del evento en la app de tu móvil, la hora de tu web se libera en tiempo real.
                </p>
              </div>

              {/* Animated visual sync connector */}
              <div className="flex items-center justify-center gap-4 py-3 border border-slate-100 dark:border-slate-905 rounded-xl bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xl">📊</span>
                  <span className="text-[9px] font-mono tracking-tight text-slate-400">Your WP Web</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-[9.5px] font-mono text-emerald-600 font-bold mb-1 tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    CONECTOR API ACTIVO
                  </span>
                  <div className="w-2.5/3 h-1 bg-slate-250 dark:bg-slate-800 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 w-1/3 bg-blue-600 rounded-full animate-infinite-slide" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xl">📅</span>
                  <span className="text-[9px] font-mono tracking-tight text-slate-400">Google Calendar</span>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* CORE FEATURES GRID */}
        <section id="features" className="space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#2563eb] font-bold">
              LA SOLUCIÓN SÓLIDA
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Todo lo que necesitas, nada de lo que sobra
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Olvida el bloatware y las complejidades de servidores externos. WIdeTech Booking mantiene los flujos estables y adaptados a las normas core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl space-y-3 transition-all hover:shadow-md">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 w-fit">
                <Settings className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base tracking-tight">Asistente de 5 Minutos</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                No tienes que escribir ni una sola línea de código. Nuestro Wizard interactivo en el panel de WordPress te asiste en todo el flujo de autorización.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl space-y-3 transition-all hover:shadow-md">
              <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 w-fit">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base tracking-tight">Purga de Caché Automática</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Compatible de forma nativa con WP Rocket, LiteSpeed Cache y WP Super Cache. Tras agendar una reserva se vacía la caché para evitar duplicidades de slots.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl space-y-3 transition-all hover:shadow-md">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base tracking-tight">Privacidad en Servidor Propio</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Ningún dato confidencial sale a Google. Los nombres, emails y datos privados permanecen cifrados en tu propia base de datos de WordPress.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl space-y-3 transition-all hover:shadow-md">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 w-fit">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base tracking-tight">Sin Cuentas para Clientes</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Tus clientes agendan directamente escribiendo sus datos tradicionales de contacto. Sin redirecciones a Google ni logins requeridos.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl space-y-3 transition-all hover:shadow-md">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 w-fit">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base tracking-tight">API HTTP Nativa de WP</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Utiliza las librerías nativas del sistema operativo de WordPress, evitando cargar librerías javascript pesadas que arruinarán tu Core Web Vitals.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl space-y-3 transition-all hover:shadow-md">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/70 text-slate-600 dark:text-slate-300 w-fit">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base tracking-tight">Soporte Continuo & Licencia GPL</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Plugin 100% abierto bajo licencia GPL-2.0. Con el respaldo de WIdeTech Solutions para mantener el código compatible con las últimas versiones de WordPress.
              </p>
            </div>

          </div>
        </section>


        {/* VISUAL INSTALLATION WORKFLOW */}
        <section id="installation" className="space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#2c3be8] font-bold">
              LISTO EN MINUTOS
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Instalación y Configuración Sencilla
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              No necesitas ser desarrollador web ni configurar servidores complejos para empezar a aceptar citas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-850 bg-white dark:bg-slate-900/40 relative">
              <span className="absolute -top-4 -left-2 text-5xl font-display font-extrabold text-blue-600/10 dark:text-blue-400/5">
                01
              </span>
              <h4 className="font-semibold text-sm tracking-tight pt-2">Descargar .zip</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-2">
                Haz click en el botón de descarga para obtener el paquete completo y funcional del plugin.
              </p>
                <a
                  href={`${import.meta.env.BASE_URL}widetech-booking.zip`}
                className="mt-4 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded text-[11px] font-bold inline-flex items-center gap-1 transition-colors w-full justify-center"
              >
                <Download className="w-3.5 h-3.5" />
                Descargar Plugin.zip
              </a>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-850 bg-white dark:bg-slate-900/40 relative">
              <span className="absolute -top-4 -left-2 text-5xl font-display font-extrabold text-blue-600/10 dark:text-blue-400/5">
                02
              </span>
              <h4 className="font-semibold text-sm tracking-tight pt-2">Sube y activa</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-2">
                Ve a tu panel de WordPress: Plugins &gt; Añadir Nuevo &gt; Subir Plugin, selecciona el zip y presiona Activar.
              </p>
              <div className="mt-4 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200/20 rounded font-mono text-[9px] text-slate-400 text-center">
                wp-admin/plugins.php
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-850 bg-white dark:bg-slate-900/40 relative">
              <span className="absolute -top-4 -left-2 text-5xl font-display font-extrabold text-blue-600/10 dark:text-blue-400/5">
                03
              </span>
              <h4 className="font-semibold text-sm tracking-tight pt-2">Autoriza Google</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-2">
                Crea tus credenciales OAuth en Google Cloud (el asistente te enseña en 2 pasos) y conecta tu calendario en 1 clic.
              </p>
              <div className="mt-4 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-605 text-[10px] font-bold text-center">
                Conectado con cuenta Google ✓
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-850 bg-white dark:bg-slate-900/40 relative">
              <span className="absolute -top-4 -left-2 text-5xl font-display font-extrabold text-blue-600/10 dark:text-blue-400/5">
                04
              </span>
              <h4 className="font-semibold text-sm tracking-tight pt-2">Inserta el Shortcode</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-2">
                Agrega el shortcode en cualquier página o utiliza el widget de Elementor para renderizar el calendario de inmediato.
              </p>
              
              {/* Copy Click Code Field */}
              <button 
                onClick={handleCopyShortcode}
                className="mt-4 p-2 w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/40 hover:border-blue-600/40 hover:bg-slate-100/10 rounded flex items-center justify-between font-mono text-xs font-semibold cursor-pointer transition-all"
              >
                <span className="text-blue-600 dark:text-blue-400">[widetech_booking]</span>
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              </button>
            </div>

          </div>
        </section>


        {/* SOCIAL PROOF / TESTIMONIES SECTION */}
        <section id="testimonials" className="space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#2563eb] font-bold">
              COMUNIDAD SATISFECHA
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Agencias de desarrollo, startups y clínicas independientes que han jubilado plataformas costosas de cobro mensual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl flex flex-col justify-between space-y-5 transition-all hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-350 text-xs leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs tracking-tight">{t.name}</h5>
                    <span className="block text-[10px] text-slate-450 dark:text-slate-450 font-medium">
                      {t.role} • <strong className="font-semibold text-slate-500">{t.company}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ACCORDION FAQ AREA */}
        <section id="faq" className="space-y-10">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
              SOPORTE DE EXPERTOS
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Resuelve tus dudas
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Preguntas técnicas sobre seguridad, purga de caché y optimización de WordPress.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {FAQS.map((item, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4.5 flex items-center justify-between text-left font-semibold text-xs md:text-sm tracking-tight hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer outline-none"
                  >
                    <span>{item.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      isExpanded ? "transform rotate-180 text-blue-600" : ""
                    }`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-slate-500 dark:text-slate-400 text-xs leading-relaxed border-t border-slate-100/10">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>


        {/* FINAL CTA BOX AREA */}
        <section className="relative rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-805 shadow-xl/15 text-center px-6 py-12 md:py-16 md:px-12 bg-white dark:bg-slate-900 transition-all duration-300">
          
          {/* Accent lighting for CTA card */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none overflow-hidden">
            <div className="absolute -top-[120px] -right-[100px] w-[350px] h-[300px] rounded-full blur-[100px] opacity-15 bg-blue-500" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6 flex flex-col items-center">
            
            <div className="p-3 bg-blue-100/40 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-2xl w-fit">
              <CalendarCheck className="w-10 h-10" />
            </div>

            <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Empieza gratis hoy mismo y recibe citas en 5 minutos.
            </h2>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg leading-relaxed">
              Descarga el plugin instalado en tu propio servidor WordPress. Libérate de mensualidades costosas y recupera el control de tu agenda con soporte de Google Calendar.
            </p>

            <div className="pt-2 w-full max-w-md space-y-3 flex flex-col items-center">
              <a
                href={`${import.meta.env.BASE_URL}widetech-booking.zip`}
                className="w-full px-6 py-4 rounded-xl text-white font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10 bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4.5 h-4.5" />
                <span>Descargar Plugin Gratis (.zip)</span>
              </a>

              <p className="text-[10px] text-slate-450 dark:text-slate-400 font-mono">
                Versión 2.0.0 | Compatible con WordPress 5.8+ y PHP 7.4+ (Hasta PHP 8.x)
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* FULL DETAILED FOOTER */}
      <footer className="bg-slate-900 text-slate-100 border-t border-slate-800 py-12 relative z-10 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            
            <div className="space-y-1">
              <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                Bookly<span className="text-blue-500">Lite</span>
              </span>
              <p className="text-xs text-slate-400 max-w-sm">
                Diseñado minuciosamente para ser el sistema de citas más eficiente y ligero para empresas y portales independientes.
              </p>
            </div>

            {/* Badges indicating optimization compliance */}
            <div className="flex items-center gap-2 flex-wrap text-white">
              <span className="bg-slate-800 px-3 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase font-mono">
                WORDPRESS 6.x ✓
              </span>
              <span className="bg-slate-800 px-3 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase font-mono">
                PHP 8.2 OPTIMIZED
              </span>
              <span className="bg-slate-800 px-3 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase font-mono">
                GPLv2 COMPLIANT
              </span>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="tracking-tight">
                © {new Date().getFullYear()} BooklyLite · Plugin totalmente gratuito bajo licencia GPL-2.0
              </span>
              <div className="hidden sm:block h-4 w-px bg-slate-700" />
              <span className="text-slate-500">v2.0.0 | Requiere WP 5.8+ & PHP 7.4+</span>
            </div>
            
            <div className="flex items-center gap-5">
              <a href="https://github.com/widetecsolutions/widetech-booking" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1 cursor-pointer text-slate-300">
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
              <span>•</span>
              <a href="https://widetecsolutions.com" className="hover:text-blue-400 transition-colors cursor-pointer text-slate-300">
                widetecsolutions.com
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* FULLY FUNCTIONAL MODAL DEMO ROOT */}
      <BookingDemo 
        isOpen={showDemo} 
        onClose={() => setShowDemo(false)} 
        themeType={activeTheme}
      />

    </div>
  );

  // Helper inside the code file to let bottom cards trigger state mutations in the top preview
  function selectThemeFromBanner(themeName: "light" | "dark" | "custom") {
    setActiveTheme(themeName);
    // Smooth scroll back to the hero for real feedback
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
