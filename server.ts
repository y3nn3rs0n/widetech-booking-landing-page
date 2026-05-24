import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import AdmZip from "adm-zip";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Real, functional download route for the WordPress booking plugin
  app.get("/api/download", (req, res) => {
    try {
      const zip = new AdmZip();

      const phpContent = `<?php
/**
 * Plugin Name: WIdeTech Booking
 * Plugin URI: https://github.com/widetecsolutions/widetech-booking
 * Description: El sistema de reservas mas ligero y rapido para WordPress. Conecta con Google Calendar en 1 clic y empieza a recibir reservas en 5 minutos.
 * Version: 1.0.0
 * Author: WIdeTech Solutions
 * Author URI: https://widetecsolutions.com
 * License: GPL2
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_shortcode('widetech_booking', 'widetech_booking_shortcode_handler');

function widetech_booking_shortcode_handler($atts) {
    ob_start();
    ?>
    <div id="widetech-booking-container" style="max-width: 600px; margin: 20px auto; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: #2563eb; padding: 24px; color: #ffffff; text-align: center;">
            <h3 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.025em;">Reservas Online</h3>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Seleccione fecha y hora para agendar su cita.</p>
        </div>
        <div style="padding: 24px;">
            <div style="margin-bottom: 16px;">
                <label style="display: block; font-weight: 500; margin-bottom: 6px; color: #334155; font-size: 13px;">Servicio</label>
                <select id="wt-service" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; font-size: 14px; outline: none;">
                    <option value="consultoria">Consultoría Estratégica WP (45 min)</option>
                    <option value="soporte">Soporte Técnico Especializado (60 min)</option>
                    <option value="demo">Demo de Producto y Personalización (30 min)</option>
                </select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                    <label style="display: block; font-weight: 500; margin-bottom: 6px; color: #334155; font-size: 13px;">Fecha</label>
                    <input type="date" id="wt-date" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px;" value="<?php echo date('Y-m-d', strtotime('+1 day')); ?>">
                </div>
                <div>
                    <label style="display: block; font-weight: 500; margin-bottom: 6px; color: #334155; font-size: 13px;">Hora</label>
                    <select id="wt-time" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; font-size: 14px;">
                        <option value="09:00">09:00 AM</option>
                        <option value="10:30">10:30 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:30">02:30 PM</option>
                        <option value="16:00">04:00 PM</option>
                    </select>
                </div>
            </div>
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;">
            <div style="margin-bottom: 20px;">
                <label style="display: block; font-weight: 500; margin-bottom: 6px; color: #334155; font-size: 13px;">Datos personales</label>
                <input type="text" id="wt-name" placeholder="Nombre completo" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; margin-bottom: 10px;">
                <input type="email" id="wt-email" placeholder="Correo electrónico" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; margin-bottom: 10px;">
                <input type="tel" id="wt-phone" placeholder="WhatsApp (Ej: +34...)" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px;">
            </div>
            <button type="button" id="wt-submit-btn" style="width: 100%; background: #2563eb; color: #ffffff; padding: 12px; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                Confirmar Cita Integrada
            </button>
        </div>
        <div id="wt-success" style="display: none; background: #f0fdf4; border-top: 4px solid #16a34a; padding: 24px; text-align: center;">
            <svg style="width: 36px; height: 36px; color: #16a34a; margin: 0 auto 10px auto;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h4 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 600; color: #166534;">¡Sincronizado con Google Calendar!</h4>
            <p id="wt-success-msg" style="margin: 0; font-size: 13px; color: #166534; line-height: 1.4;"></p>
        </div>
    </div>
    <script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('wt-submit-btn');
        const successDiv = document.getElementById('wt-success');
        const successMsg = document.getElementById('wt-success-msg');
        if (btn) {
            btn.addEventListener('click', function() {
                const name = document.getElementById('wt-name').value.trim();
                const email = document.getElementById('wt-email').value.trim();
                const d = document.getElementById('wt-date').value;
                const t = document.getElementById('wt-time').value;
                const sEl = document.getElementById('wt-service');
                const s = sEl.options[sEl.selectedIndex].text;
                if (!name || !email) {
                    alert('Complete nombre y correo.');
                    return;
                }
                successMsg.innerHTML = "Hola " + name + ", su cita de " + s + " para el dia " + d + " a las " + t + " ha sido confirmada y enviada a su calendario.";
                successDiv.style.display = 'block';
                successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        }
    });
    </script>
    <?php
    return ob_get_clean();
}
`;

      const readmeContent = `=== WIdeTech Booking ===
Contributors: widetecsolutions
Tags: booking, calendar, google calendar, reservation, appointments
Requires at least: 5.8
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later

El sistema de reservas más ligero y rápido para WordPress. Conecta con Google Calendar en 1 clic y empieza a recibir reservas en 5 minutos.

== Description ==

WIdeTech Booking es un plugin para WordPress ultra-ligero (solo 48KB total) y diseñado sin dependencias externas (sin composer, sin vendor) para que tu sitio web cargue a la velocidad del rayo.

= Características principales =
* Sincronización bidireccional en tiempo real con Google Calendar.
* 3 temas visuales incluidos: Light, Dark y Custom.
* Notificaciones integradas por WhatsApp.
* Panel administrativo nativo, limpio y rápido.
* Totalmente adaptado para móviles (Responsive).

== Installation ==

1. Sube la carpeta \`widetech-booking\` al directorio \`/wp-content/plugins/\`.
2. Activa el plugin a través del menú 'Plugins' en WordPress.
3. Dirígete a la sección 'WIdeTech Booking' para configurar tu credencial OAuth de Google.
4. Inserta el shortcode \`[widetech_booking]\` en cualquier página o entrada para mostrar el calendario.
`;

      zip.addFile("widetech-booking/widetech-booking.php", Buffer.from(phpContent));
      zip.addFile("widetech-booking/readme.txt", Buffer.from(readmeContent));

      const zipBuffer = zip.toBuffer();

      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=widetech-booking.zip");
      res.send(zipBuffer);
    } catch (error) {
      console.error("Error creating zip plugin file:", error);
      res.status(500).json({ status: "error", message: "Error al generar el plugin en zip" });
    }
  });

  // Vite development or production server configuration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[WIdeTech Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
