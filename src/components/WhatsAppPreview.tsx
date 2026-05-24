import React, { useState } from "react";
import { Send, CheckCheck, User, MessageSquareCode, ShieldCheck } from "lucide-react";

export default function WhatsAppPreview() {
  const [recipient, setRecipient] = useState<"client" | "admin">("client");

  return (
    <div className="w-full bg-[#e5ddd5] dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-lg font-sans relative overflow-hidden min-h-[300px] flex flex-col justify-between">
      
      {/* Phone Header Mockup */}
      <div className="absolute top-0 inset-x-0 bg-[#075e54] dark:bg-slate-900 py-2.5 px-4 text-white flex items-center justify-between shadow-sm z-10 transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center font-bold text-xs">
            💬
          </div>
          <div>
            <h5 className="text-xs font-bold leading-none tracking-tight">WIdeTech Alerts</h5>
            <span className="text-[9px] text-emerald-300 font-medium tracking-tight">online • Bot de Reservas</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setRecipient("client")}
            className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
              recipient === "client" 
                ? "bg-white/20 text-white" 
                : "text-white/60 hover:text-white"
            }`}
          >
            Cliente
          </button>
          <button 
            onClick={() => setRecipient("admin")}
            className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
              recipient === "admin" 
                ? "bg-white/20 text-white" 
                : "text-white/60 hover:text-white"
            }`}
          >
            SaaS Admin
          </button>
        </div>
      </div>

      {/* WhatsApp Chat Body */}
      <div className="flex-1 pt-13 pb-4 px-1 space-y-4 overflow-y-auto flex flex-col justify-end">
        
        {/* Date bubble stamp */}
        <div className="mx-auto bg-white/60 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md shadow-sm border border-slate-100/10">
          HOY • 10:30 AM
        </div>

        {recipient === "client" ? (
          /* Client Bubbles */
          <div className="space-y-3.5">
            {/* Outgoing client ping (mock auto-replied) */}
            <div className="flex justify-end pr-1 pl-10">
              <div className="bg-[#d9fdd3] dark:bg-emerald-950/40 border border-[#c1fca9]/10 text-slate-800 dark:text-slate-100 rounded-xl rounded-tr-none px-3.5 py-2 shadow-sm text-xs relative">
                <p className="leading-relaxed">
                  Hola, me gustaría agendar la consultoría de WordPress de mañana a las 11 AM.
                </p>
                <div className="flex items-center justify-end gap-1.5 mt-1 text-[9px] text-slate-450 dark:text-slate-400 float-right">
                  <span>10:30</span>
                  <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Incoming bot alert */}
            <div className="flex justify-start pr-10 pl-1">
              <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-105 rounded-xl rounded-tl-none px-3.5 py-2.5 shadow-sm text-xs border border-white/5 relative">
                <span className="block font-bold text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                  📅 CONFIRMACIÓN AUTOMÁTICA
                </span>
                <p className="leading-relaxed">
                  ¡Hola Carlos! Tu reserva para <strong>Consultoría Estratégica WP</strong> está confirmada.
                </p>
                <div className="bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-100 dark:border-slate-850 my-2 text-[11px] leading-relaxed">
                  ⏰ <strong>Fecha:</strong> Viernes, 25 de Mayo<br/>
                  🕰️ <strong>Hora:</strong> 10:30 AM (Madrid)<br/>
                  🔗 <strong>Acceso Zoom:</strong> <span className="text-blue-500 hover:underline">zoom.us/j/wt-9524</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Sincronizado con Google Calendar. Para reprogramar haz click aquí.
                </p>
                <span className="block text-[9px] text-slate-400 mt-1.5 text-right">
                  10:31
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Admin Bubbles */
          <div className="space-y-3.5">
            {/* Incoming Admin Alert */}
            <div className="flex justify-start pr-10 pl-1">
              <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-105 rounded-xl rounded-tl-none px-3.5 py-2.5 shadow-sm text-xs border border-white/5 relative">
                <span className="block font-bold text-[10px] uppercase tracking-wider text-amber-500 mb-1">
                  ⚡ NUEVA RESERVA EN TU WEB
                </span>
                <p className="leading-relaxed">
                  Se ha registrado una nueva cita desde el shortcode <code>[widetech_booking]</code>.
                </p>
                <div className="bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-100 dark:border-slate-850 my-2 text-[11px] leading-relaxed">
                  👤 <strong>Cliente:</strong> Carlos Mendoza<br/>
                  📧 <strong>Email:</strong> carlos@empresa.com<br/>
                  💼 <strong>Servicio:</strong> Consultoría WP<br/>
                  📅 <strong>Cita:</strong> Mayo 25 a las 10:30 AM
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Sincronizado bidireccionalmente en Google Calendar
                </p>
                <span className="block text-[9px] text-slate-400 mt-1.5 text-right font-mono">
                  10:31
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simulated Footer Input Bar */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200/10 p-2 flex items-center gap-1.5 rounded-xl mt-1.5">
        <div className="flex-1 bg-slate-50 dark:bg-slate-950/50 rounded-full px-3 py-1.5 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Respuesta automática activa...</span>
        </div>
        <button className="p-1.5 rounded-full bg-[#128c7e] dark:bg-slate-850 text-white flex items-center justify-center">
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
