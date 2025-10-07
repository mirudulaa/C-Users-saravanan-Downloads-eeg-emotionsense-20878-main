import { useEffect, useRef } from "react";

interface EEGWaveformProps {
  isActive?: boolean;
}

export const EEGWaveform = ({ isActive = false }: EEGWaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let offset = 0;

    const draw = () => {
      ctx.fillStyle = "hsl(220 20% 8%)";
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = "hsl(220 20% 15%)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw EEG waveform
      ctx.strokeStyle = "hsl(190 95% 55%)";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "hsl(190 95% 55%)";

      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const frequency = isActive ? 0.02 : 0.01;
        const amplitude = isActive ? 40 : 20;
        const noise = Math.random() * 10 - 5;
        const y =
          height / 2 +
          Math.sin((x + offset) * frequency) * amplitude +
          Math.sin((x + offset) * frequency * 2.3) * (amplitude * 0.5) +
          noise;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      offset += isActive ? 3 : 1;
      if (offset > 1000) offset = 0;
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={200}
      className="w-full h-full rounded-lg"
      style={{ imageRendering: "pixelated" }}
    />
  );
};
