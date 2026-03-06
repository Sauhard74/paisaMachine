"use client";

interface HighlightProps {
  text: string;
  keyFigures: string[];
}

export function Highlight({ text, keyFigures }: HighlightProps) {
  if (!keyFigures || keyFigures.length === 0) {
    return <span>{text}</span>;
  }

  const escaped = keyFigures.map((f) =>
    f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => {
        const isHighlight = keyFigures.some(
          (f) => f.toLowerCase() === part.toLowerCase()
        );
        return isHighlight ? (
          <span key={i} className="text-orange-400 font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
}
