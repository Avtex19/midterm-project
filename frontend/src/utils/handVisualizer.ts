import { Landmarks } from "./handpose.ts";

// Render landmarks and finger connections on a canvas
export const drawHandLandmarks = (
    ctx: CanvasRenderingContext2D,
    landmarks: Landmarks,
    options: {
      pointColor?: string;
      pointRadius?: number;
      lineColor?: string;
      lineWidth?: number;
      fingerColors?: { [key: string]: string };
    } = {}
): void => {
  if (!ctx || !landmarks || landmarks.length < 21) return;

  const {
    pointColor = "red",
    pointRadius = 5,
    lineColor = "blue",
    lineWidth = 2,
    fingerColors = {
      thumb: "#FF5252",
      index: "#4CAF50",
      middle: "#2196F3",
      ring: "#9C27B0",
      pinky: "#FF9800",
      palm: "#607D8B",
    },
  } = options;

  try {
    // Draw each point
    landmarks.forEach(([x, y], i) => {
      if (typeof x !== "number" || typeof y !== "number") {
        console.warn(`Skipping invalid point at index ${i}:`, landmarks[i]);
        return;
      }

      ctx.shadowColor = pointColor;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = pointColor;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    const connect = (
        start: number,
        end: number,
        color = lineColor
    ) => {
      if (start >= landmarks.length || end >= landmarks.length) return;

      const [x1, y1] = landmarks[start];
      const [x2, y2] = landmarks[end];

      if (
          [x1, y1, x2, y2].some((v) => typeof v !== "number")
      ) return;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    // Connect fingers
    [[1, 4, fingerColors.thumb], [5, 8, fingerColors.index], [9, 12, fingerColors.middle], [13, 16, fingerColors.ring], [17, 20, fingerColors.pinky]]
        .forEach(([start, end, color]) => {
          for (let i = +start; i < +end; i++) connect(i, i + 1, color as string);
        });

    // Connect palm
    for (let i = 0; i < 5; i++) {
      connect(i * 4, (i * 4 + 4) % 21, fingerColors.palm);
    }

    // Annotate fingertips
    const tips = [
      { idx: 4, label: "Thumb" },
      { idx: 8, label: "Index" },
      { idx: 12, label: "Middle" },
      { idx: 16, label: "Ring" },
      { idx: 20, label: "Pinky" },
    ];

    ctx.font = "12px Arial";
    ctx.textAlign = "center";

    for (const { idx, label } of tips) {
      const [x, y] = landmarks[idx];
      const width = ctx.measureText(label).width;
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(x - width / 2 - 2, y - 20, width + 4, 20);
      ctx.fillStyle = "white";
      ctx.fillText(label, x, y - 8);
    }
  } catch (err) {
    console.error("Drawing failed:", err);
  }
};

// Initialize webcam stream and attach to video element
export const setupCamera = async (
    videoElement: HTMLVideoElement
): Promise<MediaStream> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    videoElement.srcObject = stream;
    return stream;
  } catch (err) {
    console.error("Camera access error:", err);
    throw new Error("Camera permission denied or device unavailable.");
  }
};

// Terminate all media tracks to stop the camera
export const stopCamera = (stream: MediaStream | null): void => {
  stream?.getTracks().forEach((track) => track.stop());
};
