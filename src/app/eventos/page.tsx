import type { Metadata } from "next";
import { OliveSprig } from "@/components/greeting/OliveSprig";

export const metadata: Metadata = {
  title: "consulta de eventos",
  description: "Eventos privados: horarios y espacio.",
};

export default function EventosPage() {
  return (
    <main className="flex flex-col items-center px-4 py-20 text-center md:py-28 lg:px-10">
      <h1
        className="font-display text-[clamp(2.5rem,6vw,3.25rem)] leading-[1.1] font-light text-ink mix-blend-multiply"
        style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
      >
        consulta de eventos
      </h1>

      <div className="mt-6 h-16 w-24 text-aegean md:h-20 md:w-28">
        <OliveSprig />
      </div>

      <div className="mt-10 flex max-w-[58ch] flex-col gap-4 font-mono text-base leading-6 text-balance">
        <p>Escríbenos para consultar por tu evento.</p>
        <p>Todos los eventos se programan entre las 12:00 y las 21:00.</p>
        <p>
          Al elegir el espacio para tu evento, recuerda que la mesa está al aire libre y que la ubicación de las
          mesas puede cambiar por mal tiempo o por las necesidades del restaurante.
        </p>
      </div>
    </main>
  );
}
