import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Calendar, Clock, User, Mail, Phone, CheckCircle, 
  Sparkles, CalendarCheck, MapPin, Share2, Download, Bell 
} from "lucide-react";
import { Service, TimeSlot } from "../types";

interface BookingDemoProps {
  isOpen: boolean;
  onClose: () => void;
  primaryColor?: string;
  themeType?: "light" | "dark" | "custom";
}

const SERVICES: Service[] = [
  { id: "1", name: "Consultoría Estratégica WP", duration: "45 min", description: "Auditoría de rendimiento de tu sitio WordPress, revisión de estructura SEO y optimización.", price: "Gratis" },
  { id: "2", name: "Soporte Técnico de Emergencia", duration: "60 min", description: "Solución express a bugs persistentes, incompatibilidades o errores críticos de base de datos.", price: "Gratis" },
  { id: "3", name: "Demo de Producto & Personalización", duration: "30 min", description: "Te mostramos cómo configurar credenciales OAuth de Google Calendar y adaptar los CSS en tu web.", price: "Gratis" }
];

const TIME_SLOTS: TimeSlot[] = [
  { time: "09:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "12:00 PM", available: false },
  { time: "02:00 PM", available: true },
  { time: "03:30 PM", available: true },
  { time: "05:00 PM", available: false }
];

export default function BookingDemo({ isOpen, onClose, primaryColor = "#2563eb", themeType = "light" }: BookingDemoProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", whatsappAlert: true });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Generate date list for interactive booking calendar
  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      // Skip Sundays just for a realistic touch
      if (nextDate.getDay() !== 0) {
        dates.push(nextDate);
      }
    }
    return dates;
  };

  const datesList = getDates();

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedDate) return;
    if (step === 3 && !selectedTime) return;
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(5);
    }, 1200);
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setFormData({ name: "", email: "", phone: "", whatsappAlert: true });
  };

  const formattedDateString = selectedDate 
    ? new Date(selectedDate).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" }) 
    : "";

  // Theming classes in simulated preview modes
  const isDark = themeType === "dark";
  const bgClass = isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-100 text-slate-800";
  const labelClass = isDark ? "text-slate-300" : "text-slate-600";
  const subTextClass = isDark ? "text-slate-400" : "text-slate-500";
  const buttonBorderClass = isDark ? "border-slate-800 hover:bg-slate-800/50" : "border-slate-100 hover:bg-slate-50";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border ${bgClass} z-10`}
          >
            {/* Header */}
            <div 
              style={{ backgroundColor: themeType === "custom" ? "#10b981" : primaryColor }}
              className="px-6 py-5 text-white relative"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                id="close-demo-btn"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-[10px] font-bold tracking-wider uppercase bg-white/20 rounded">
                  DEMO EN VIVO
                </span>
                <span className="text-white/60 text-xs font-mono">• Sin instalación</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-sans mt-2 tracking-tight">
                {step === 5 ? "¡Reserva Confirmada!" : "Asistente de Reservas Activo"}
              </h3>
              <p className="text-white/85 text-xs mt-1">
                {step === 5 
                  ? "Sincronizado al instante con tu Google Calendar" 
                  : "Prueba el increíble flujo que verán tus visitantes en tu sitio WordPress"}
              </p>

              {/* Steps Progress Visualizer */}
              {step < 5 && (
                <div className="flex items-center gap-1.5 mt-5">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20">
                      <div 
                        className="h-full bg-white transition-all duration-300" 
                        style={{ width: step >= s ? "100%" : "0%" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8">
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className={`text-sm font-semibold uppercase tracking-wider ${labelClass}`}>
                    Paso 1: Selecciona el Servicio
                  </p>
                  <div className="space-y-3">
                    {SERVICES.map((srv) => (
                      <div 
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          selectedService.id === srv.id 
                            ? "border-blue-600 bg-blue-50/10 shadow-sm" 
                            : buttonBorderClass
                        }`}
                        style={{ borderColor: selectedService.id === srv.id && themeType === "custom" ? "#10b981" : undefined }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 mb-2">
                              {srv.duration}
                            </span>
                            <h4 className="font-semibold text-sm tracking-tight">{srv.name}</h4>
                            <p className={`text-xs mt-1 leading-relaxed ${subTextClass}`}>
                              {srv.description}
                            </p>
                          </div>
                          <span className={`text-sm font-semibold ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                            {srv.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleNextStep}
                      style={{ backgroundColor: themeType === "custom" ? "#10b981" : primaryColor }}
                      className="px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90 inline-flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      Continuar a Fecha
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className={`text-sm font-semibold uppercase tracking-wider ${labelClass}`}>
                    Paso 2: Selecciona la Fecha
                  </p>
                  <p className={`text-xs ${subTextClass}`}>
                    Calendario nativo ultra-rápido (48KB). Sin scripts pesados ni bloqueos.
                  </p>

                  {/* Real Grid Calendar of Next Dates */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-2">
                    {datesList.map((dt) => {
                      const dateIso = dt.toISOString().split("t")[0];
                      const isSelected = selectedDate === dateIso;
                      const dayName = dt.toLocaleDateString("es-ES", { weekday: "short" });
                      const dayNum = dt.getDate();
                      const monthName = dt.toLocaleDateString("es-ES", { month: "short" });

                      return (
                        <button
                          key={dateIso}
                          onClick={() => setSelectedDate(dateIso)}
                          style={{ 
                            borderColor: isSelected && themeType === "custom" ? "#10b981" : isSelected ? primaryColor : undefined,
                            backgroundColor: isSelected && themeType === "custom" ? "rgba(16, 185, 129, 0.1)" : isSelected ? "rgba(37, 99, 235, 0.08)" : undefined
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected 
                              ? "border-2 shadow-sm font-semibold" 
                              : buttonBorderClass
                          }`}
                        >
                          <span className={`text-[10px] uppercase font-mono tracking-widest ${subTextClass}`}>
                            {dayName}
                          </span>
                          <span className="text-xl font-bold my-1 tracking-tight">
                            {dayNum}
                          </span>
                          <span className={`text-[10px] uppercase ${subTextClass}`}>
                            {monthName}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex justify-between items-center border-t border-slate-100/10">
                    <button
                      onClick={handlePrevStep}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border ${buttonBorderClass} cursor-pointer`}
                    >
                      Atrás
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!selectedDate}
                      style={{ 
                        backgroundColor: !selectedDate ? "#cbd5e1" : themeType === "custom" ? "#10b981" : primaryColor,
                        cursor: !selectedDate ? "not-allowed" : "pointer"
                      }}
                      className="px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90 inline-flex items-center gap-2 shadow-md"
                    >
                      Continuar a Horario
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <p className={`text-sm font-semibold uppercase tracking-wider ${labelClass}`}>
                      Paso 3: Selecciona la Hora
                    </p>
                    <p className={`text-xs mt-1 ${subTextClass}`}>
                      Fecha elegida: <strong style={{ color: themeType === "custom" ? "#10b981" : primaryColor }}>{formattedDateString}</strong>
                    </p>
                  </div>

                  {/* Time list grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          style={{
                            borderColor: isSelected && themeType === "custom" ? "#10b981" : isSelected ? primaryColor : undefined,
                            backgroundColor: isSelected && themeType === "custom" ? "rgba(16, 185, 129, 0.1)" : isSelected ? "rgba(37, 99, 235, 0.08)" : undefined
                          }}
                          className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                            !slot.available 
                              ? "bg-slate-50/40 text-slate-400 border-slate-100 opacity-50 cursor-not-allowed" 
                              : isSelected
                                ? "border-2 shadow-sm font-semibold"
                                : buttonBorderClass
                          }`}
                        >
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold tracking-tight">{slot.time}</span>
                          <span className={`text-[9px] font-mono tracking-wider uppercase ${slot.available ? "text-emerald-600 font-semibold" : "text-rose-500"}`}>
                            {slot.available ? "Disponible" : "Ocupado"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex justify-between items-center border-t border-slate-100/10">
                    <button
                      onClick={handlePrevStep}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border ${buttonBorderClass} cursor-pointer`}
                    >
                      Atrás
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!selectedTime}
                      style={{ 
                        backgroundColor: !selectedTime ? "#cbd5e1" : themeType === "custom" ? "#10b981" : primaryColor,
                        cursor: !selectedTime ? "not-allowed" : "pointer"
                      }}
                      className="px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90 inline-flex items-center gap-2 shadow-md"
                    >
                      Confirmar Horario
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <p className={`text-sm font-semibold uppercase tracking-wider ${labelClass}`}>
                      Paso 4: Completa tus Datos
                    </p>
                    <div className={`p-3 rounded-lg border text-xs mt-2 flex flex-col gap-1 ${subTextClass} bg-slate-50/10`}>
                      <p>💻 <strong>Servicio:</strong> {selectedService.name}</p>
                      <p>📅 <strong>Cita:</strong> {formattedDateString} a las {selectedTime}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-semibold mb-1.5 ${labelClass}`}>
                          Nombre Completo *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="Ej. Carlos Mendoza"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:ring-2 bg-transparent outline-none transition-all ${
                              isDark ? "border-slate-800 focus:ring-blue-500/20" : "border-slate-200 focus:ring-blue-100"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-xs font-semibold mb-1.5 ${labelClass}`}>
                          Correo Electrónico *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            placeholder="Ej. carlos@empresa.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:ring-2 bg-transparent outline-none transition-all ${
                              isDark ? "border-slate-800 focus:ring-blue-500/20" : "border-slate-200 focus:ring-blue-100"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${labelClass}`}>
                        Número de Teléfono (Para alertas)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="Ej. +34 600 000 000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:ring-2 bg-transparent outline-none transition-all ${
                            isDark ? "border-slate-800 focus:ring-blue-500/20" : "border-slate-200 focus:ring-blue-100"
                          }`}
                        />
                      </div>
                    </div>

                    {/* WhatsApp Alert Checkbox Toggle Mock */}
                    <div className={`p-4 rounded-xl border flex gap-3 items-start transition-all ${
                      formData.whatsappAlert 
                        ? "border-emerald-500/30 bg-emerald-50/5" 
                        : "border-slate-200/10"
                    }`}>
                      <input
                        type="checkbox"
                        id="whatsapp-mock-toggle"
                        checked={formData.whatsappAlert}
                        onChange={(e) => setFormData({ ...formData, whatsappAlert: e.target.checked })}
                        className="mt-1 h-4.5 w-4.5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="whatsapp-mock-toggle" className="text-xs font-bold font-sans text-slate-800 dark:text-slate-100 cursor-pointer flex items-center gap-1.5">
                          <span className="p-0.5 px-1.5 bg-emerald-500 text-white rounded text-[10px] font-mono leading-none">FREE</span>
                          Notificación instantánea por WhatsApp
                        </label>
                        <p className={`text-[11px] mt-0.5 leading-relaxed ${subTextClass}`}>
                          Activamos el gateway gratuito de alertas. Recibirás recordatorios 24h antes y confirmación al instante.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center border-t border-slate-100/10">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border ${buttonBorderClass} cursor-pointer`}
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ backgroundColor: themeType === "custom" ? "#10b981" : primaryColor }}
                        className="px-6 py-2.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 inline-flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-1.5">
                            <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sincronizando...
                          </div>
                        ) : "Sincronizar con Google Calendar"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-600 mb-1">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold tracking-tight">¡Reserva realizada con éxito!</h4>
                    <p className={`text-sm ${subTextClass} max-w-md mx-auto`}>
                      El conector API ha guardado tu cita en WordPress y ha generado un ID de Evento privado de Google Calendar.
                    </p>
                  </div>

                  {/* Booking Receipt Summary Card */}
                  <div className={`p-4 md:p-5 rounded-2xl border text-left max-w-md mx-auto space-y-3.5 bg-slate-50/10 ${
                    isDark ? "border-slate-800" : "border-slate-200/50"
                  }`}>
                    <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200/30">
                      <span className="text-[11px] font-mono tracking-widest text-slate-400">TICKET #WT-9524</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500">
                        ⚡ Google Calendar Sync
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <p className={`${subTextClass}`}><strong>Asunto:</strong> {selectedService.name}</p>
                      <p className={`${subTextClass}`}><strong>Fecha:</strong> {formattedDateString}</p>
                      <p className={`${subTextClass}`}><strong>Hora:</strong> {selectedTime}</p>
                      <p className={`${subTextClass}`}><strong>Cliente:</strong> {formData.name} ({formData.email})</p>
                      {formData.phone && (
                        <p className={`${subTextClass}`}><strong>WhatsApp:</strong> {formData.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions after Successful Mock Booking */}
                  <div className="flex flex-col sm:flex-row gap-2 justify-center pt-4 max-w-sm mx-auto">
                    <button
                      onClick={resetFlow}
                      className={`flex-1 px-4 py-2.5 rounded-lg border text-xs font-semibold ${buttonBorderClass} transition-all cursor-pointer inline-flex items-center justify-center gap-1.5`}
                    >
                      Nueva Prueba
                    </button>
                    <a
                      href={`${import.meta.env.BASE_URL}widetech-booking.zip`}
                      className="flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      style={{ backgroundColor: themeType === "custom" ? "#10b981" : primaryColor }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar Plugin (.zip)
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
