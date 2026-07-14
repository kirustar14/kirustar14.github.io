export default function FacetMotif({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  const positions: Record<string, React.CSSProperties> = {
    a: { top: -60, right: -60 },
    b: { bottom: -80, left: -80 },
    c: { top: "20%", right: "10%" },
  };

  return (
    <div className="facet-bg" aria-hidden="true">
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        style={positions[variant]}
      >
        <g fill="none" stroke="#e8871e" strokeWidth="1.4" strokeLinejoin="round">
          <rect
            x="60"
            y="60"
            width="200"
            height="200"
            rx="48"
            transform="rotate(45 160 160)"
            opacity="0.3"
          />
          <rect
            x="100"
            y="100"
            width="120"
            height="120"
            rx="32"
            transform="rotate(45 160 160)"
            opacity="0.45"
          />
          <circle cx="160" cy="160" r="6" fill="#f5b935" stroke="none" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
