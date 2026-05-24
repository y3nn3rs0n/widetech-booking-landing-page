import React, { useState } from "react";
import { Sun, Moon, Sparkles, Check, Clock, Calendar, CheckSquare } from "lucide-react";

interface ThemePreviewProps {
  onThemeChange?: (themeName: "light" | "dark" | "custom") => void;
  onOpenDemo?: () => void;
}

export default function ThemePreview({ onThemeChange, onOpenDemo }: ThemePreviewProps) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "custom">("light");
  const [selectedService, setSelectedService] = useState<string>("consult");
  const [selectedDay, setSelectedDay] = useState<number>(25);
  const [selectedHour, setSelectedHour] = useState<string>("10:30");

  const selectTheme = (theme: "light" | "dark" | "custom") => {
    setCurrentTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  // Theme variable classes
  const bodyBg = 
    currentTheme === "light" ? "bg-white text-slate-800" :
    currentTheme === "dark" ? "bg-slate-900 text-slate-100" :
    "bg-emerald-950/20 backdrop-blur-md text-emerald-950 border-emerald-500/20";

  const cardBorder = 
    currentTheme === "light" ? "border-slate-100" :
    currentTheme === "dark" ? "border-slate-800" :
    "border-emerald-500/20";

  const textLabel =
    currentTheme === "light" ? "text-slate-600" :
    currentTheme === "dark" ? "text-slate-400" :
    "text-emerald-800";

  const primaryBtn =
    currentTheme === "light" ? "bg-blue-600 hover:bg-blue-700 text-white" :
    currentTheme === "dark" ? "bg-blue-500 hover:bg-blue-600 text-white" :
    "bg-emerald-500 hover:bg-emerald-600 text-white";

  const accentRing =
    currentTheme === "light" ? "border-blue-600 ring-2 ring-blue-100" :
    currentTheme === "dark" ? "border-blue-500 ring-2 ring-blue-500/20" :
    "border-emerald-500 ring-2 ring-emerald-500/20";

  const accentBgActive =
    currentTheme === "light" ? "bg-blue-50 text-blue-700 hover:bg-blue-100" :
    currentTheme === "dark" ? "bg-slate-800 text-blue-400 hover:bg-slate-700" :
    "bg-emerald-50 text-emerald-800 hover:bg-emerald-100";

  const normalBtn =
    currentTheme === "light" ? "border-slate-200 hover:bg-slate-50" :
    currentTheme === "dark" ? "border-slate-800 hover:bg-slate-800/100" :
    "border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-900";

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Mini Controls Card */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 mb-4 text-xs font-sans">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => selectTheme("light")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              currentTheme === "light" 
                ? "bg-white text-blue-600 border-blue-600/20 shadow-sm shadow-blue-500/5 ring-1 ring-blue-500/10" 
                : "bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50"
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Claro</span>
          </button>

          <button
            onClick={() => selectTheme("dark")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              currentTheme === "dark" 
                ? "bg-slate-800 text-blue-400 border-blue-500/30 shadow-sm" 
                : "bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50"
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Oscuro</span>
          </button>

          <button
            onClick={() => selectTheme("custom")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              currentTheme === "custom" 
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/40 shadow-sm" 
                : "bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Custom</span>
          </button>
        </div>
      </div>

      {/* Main Widget Card */}
      <div className={`flex-1 rounded-2xl border p-5 md:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between ${bodyBg} ${cardBorder}`}>
        
        {/* Card Title */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100/10 mb-4">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-500 font-bold block">
              SHORTCODE PREVIEW
            </span>
            <h4 className="text-base font-bold tracking-tight">Agendar Sesión Técnica</h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            [widetech_booking]
          </span>
        </div>

        {/* Form Body Inside Mock Calendar */}
        <div className="space-y-4 text-xs">
          
          {/* Service Selector Selector */}
          <div>
            <label className={`block font-semibold mb-1 w-full ${textLabel}`}>
              1. Seleccione Servicio
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => setSelectedService("consult")}
                className={`py-2 px-2.5 rounded-lg border text-left transition-all ${
                  selectedService === "consult" 
                    ? accentRing + " font-semibold font-sans bg-transparent" 
                    : normalBtn
                }`}
              >
                Consultoría Estratégica WP
              </button>
              <button 
                onClick={() => setSelectedService("support")}
                className={`py-2 px-2.5 rounded-lg border text-left transition-all ${
                  selectedService === "support" 
                    ? accentRing + " font-semibold font-sans bg-transparent" 
                    : normalBtn
                }`}
              >
                Soporte de Emergencia
              </button>
            </div>
          </div>

          {/* Grid Calendar representation */}
          <div>
            <label className={`block font-semibold mb-1 w-full ${textLabel}`}>
              2. Seleccione un Día (Mayo 2026)
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[24, 25, 26, 27, 28].map((dayNum) => {
                const isSelected = selectedDay === dayNum;
                const activeClasses = isSelected 
                  ? accentBgActive + " border-2 border-emerald-500/20" 
                  : normalBtn;

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${activeClasses}`}
                  >
                    <span className="text-[8px] font-mono text-slate-400">
                      {dayNum === 24 ? "Dom" : dayNum === 25 ? "Lun" : dayNum === 26 ? "Mar" : dayNum === 27 ? "Mié" : "Jue"}
                    </span>
                    <span className="text-sm font-bold tracking-tight my-0.5">{dayNum}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Times Selector */}
          <div>
            <label className={`block font-semibold mb-1 w-full ${textLabel}`}>
              3. Horarios Disponibles
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {["09:00 AM", "10:30 AM", "03:30 PM"].map((timeVal) => {
                const isSelected = selectedHour === timeVal;
                const activeClasses = isSelected 
                  ? accentBgActive + " ring-1 bg-transparent " 
                  : normalBtn;

                return (
                  <button
                    key={timeVal}
                    onClick={() => setSelectedHour(timeVal)}
                    className={`py-2 rounded-lg border text-center font-semibold text-[11px] tracking-tight transition-all ${activeClasses}`}
                  >
                    {timeVal}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submission Button in Block Mock */}
        <div className="pt-5 mt-4 border-t border-slate-100/10">
          <div className="text-center mt-2.5 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-slate-450 dark:text-slate-400 tracking-tight">
              Diseño adaptable a móviles y temas de WordPress
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
