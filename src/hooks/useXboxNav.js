import { useEffect, useRef, useState } from "react";

export function useXboxNav(acciones) {
  const [conectado, setConectado] = useState(false);
  const accionesRef = useRef(acciones);
  accionesRef.current = acciones;

  const prevBotones = useRef([]);
  const prevEjeX = useRef(0);
  const prevEjeY = useRef(0);

  useEffect(() => {
    let animationId;

    const loop = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      const gp = Array.from(gamepads).find((pad) => pad && pad.connected);

      if (gp) {
        setConectado(true);
        const recienApretado = (idx) =>
          Boolean(gp.buttons[idx]?.pressed) && !prevBotones.current[idx];

        // RB / LB: avanzar o retroceder subsecciones
        if (recienApretado(5)) accionesRef.current.onSiguientePaso?.(); // RB
        if (recienApretado(4)) accionesRef.current.onPasoAnterior?.(); // LB

        // RT / LT: saltar directo entre las 4 Fases
        if (recienApretado(7)) accionesRef.current.onNextFase?.(); // RT
        if (recienApretado(6)) accionesRef.current.onPrevFase?.(); // LT

        // Stick izquierdo horizontal (axes[0]) y vertical (axes[1])
        const ejeX = gp.axes[0] || 0;
        const ejeY = gp.axes[1] || 0;

        if (ejeX > 0.65 && prevEjeX.current <= 0.65) {
          accionesRef.current.onDerecha?.();
        } else if (ejeX < -0.65 && prevEjeX.current >= -0.65) {
          accionesRef.current.onIzquierda?.();
        }

        if (ejeY > 0.65 && prevEjeY.current <= 0.65) {
          accionesRef.current.onAbajo?.();
        } else if (ejeY < -0.65 && prevEjeY.current >= -0.65) {
          accionesRef.current.onArriba?.();
        }

        prevEjeX.current = ejeX;
        prevEjeY.current = ejeY;

        // Cruceta (D-Pad) como respaldo exacto del stick izquierdo
        if (recienApretado(12)) accionesRef.current.onArriba?.();
        if (recienApretado(13)) accionesRef.current.onAbajo?.();
        if (recienApretado(14)) accionesRef.current.onIzquierda?.();
        if (recienApretado(15)) accionesRef.current.onDerecha?.();

        // Botones frontales
        if (recienApretado(0)) accionesRef.current.onAccionA?.(); // A
        if (recienApretado(1)) accionesRef.current.onCerrarModal?.(); // B
        if (recienApretado(2)) accionesRef.current.onIrCliente?.(); // X
        if (recienApretado(3)) accionesRef.current.onIrIntranet?.(); // Y

        prevBotones.current = gp.buttons.map((b) => Boolean(b.pressed));
      } else {
        setConectado(false);
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return conectado;
}
