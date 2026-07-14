const PATHS = [
  "M0,32 C240,72 480,0 720,24 C960,48 1200,72 1440,24 L1440,80 L0,80 Z",
  "M0,24 C240,0 480,72 720,48 C960,24 1200,0 1440,32 L1440,80 L0,80 Z",
];

export default function BlobDivider({
  fill,
  flip = false,
  variant = 0,
}: {
  fill: string;
  flip?: boolean;
  variant?: 0 | 1;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        lineHeight: 0,
        transform: flip ? "scaleY(-1)" : undefined,
        marginTop: -1,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        width="100%"
        height="56"
        preserveAspectRatio="none"
      >
        <path d={PATHS[variant]} fill={fill} />
      </svg>
    </div>
  );
}
