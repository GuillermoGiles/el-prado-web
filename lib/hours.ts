// Horarios del local, en minutos desde la medianoche (hora de Argentina).
// Índice del día: 0 = domingo … 6 = sábado.
type Range = readonly [open: number, close: number];

const WEEKDAY: readonly Range[] = [
  [8 * 60 + 30, 12 * 60 + 30],
  [16 * 60 + 30, 20 * 60 + 30],
];
const SATURDAY: readonly Range[] = [
  [9 * 60, 13 * 60],
  [16 * 60 + 30, 20 * 60 + 30],
];

export const SCHEDULE: readonly (readonly Range[])[] = [
  [],
  WEEKDAY,
  WEEKDAY,
  WEEKDAY,
  WEEKDAY,
  WEEKDAY,
  SATURDAY,
];

export const SCHEDULE_ROWS = [
  { days: "Lunes a viernes", hours: "8:30 a 12:30 y 16:30 a 20:30", match: [1, 2, 3, 4, 5] },
  { days: "Sábados", hours: "9:00 a 13:00 y 16:30 a 20:30", match: [6] },
  { days: "Domingos", hours: "Cerrado", match: [0] },
] as const;

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

export function argentinaNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, "0")}`; // taste-skill-ignore: minutos de un horario
}

export type OpenStatus = { open: boolean; title: string; detail: string; day: number };

export function openStatus(date = new Date()): OpenStatus {
  const { day, minutes } = argentinaNow(date);

  const current = SCHEDULE[day].find(([o, c]) => minutes >= o && minutes < c);
  if (current) {
    const left = current[1] - minutes;
    const detail =
      left <= 30
        ? `Cierra en ${left} ${left === 1 ? "minuto" : "minutos"}`
        : `Hasta las ${formatTime(current[1])}`;
    return { open: true, title: "Abierto ahora", detail, day };
  }

  const laterToday = SCHEDULE[day].find(([o]) => o > minutes);
  if (laterToday) {
    return { open: false, title: "Cerrado", detail: `Abre hoy a las ${formatTime(laterToday[0])}`, day };
  }

  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const first = SCHEDULE[next][0];
    if (first) {
      const when = i === 1 ? "mañana" : `el ${DAY_NAMES[next]}`;
      return { open: false, title: "Cerrado", detail: `Abre ${when} a las ${formatTime(first[0])}`, day };
    }
  }
  return { open: false, title: "Cerrado", detail: "", day };
}
