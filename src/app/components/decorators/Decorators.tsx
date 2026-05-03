interface DecoratorProps {
  className?: string;
  size?: number;
  opacity?: number;
}

export function GoldAsterisk({ className = "", size = 48, opacity = 1 }: DecoratorProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {[0, 45, 90, 135].map((deg, i) => (
        <rect
          key={i}
          x="21"
          y="4"
          width="6"
          height="40"
          rx="3"
          fill="#D4A929"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
    </svg>
  );
}

export function DarkLeaf({ className = "", size = 64, opacity = 1 }: DecoratorProps) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 64 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <path
        d="M32 85 C10 65 2 42 12 22 C20 6 44 2 52 18 C62 38 54 65 32 85Z"
        fill="#2A5C3F"
      />
      <path
        d="M32 85 C32 60 32 35 32 10"
        stroke="#1C3F2A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M32 55 C22 48 16 40 20 32" stroke="#1C3F2A" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32 42 C42 36 46 28 40 20" stroke="#1C3F2A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function GreenHerb({ className = "", size = 56, opacity = 1 }: DecoratorProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <path d="M28 52 C28 36 28 20 28 8" stroke="#3D7A30" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 40 C18 38 10 30 14 20 C20 30 28 36 28 40Z" fill="#5B9B47" />
      <path d="M28 26 C18 24 12 16 16 8 C22 18 28 24 28 26Z" fill="#4A8C38" />
      <path d="M28 34 C38 30 46 22 42 12 C36 22 28 30 28 34Z" fill="#5B9B47" />
      <path d="M28 20 C38 16 44 8 38 2 C34 12 28 18 28 20Z" fill="#4A8C38" />
    </svg>
  );
}

export function GreenCircle({ className = "", size = 80, opacity = 1 }: DecoratorProps) {
  return (
    <svg
      width={size / 2}
      height={size}
      viewBox={`0 0 ${size / 2} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <path
        d={`M${size / 2} 0 A${size / 2} ${size / 2} 0 0 0 ${size / 2} ${size} Z`}
        fill="#5B9B47"
      />
    </svg>
  );
}

export function TinyLeaf({ className = "", size = 28, opacity = 0.7 }: DecoratorProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 28 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <path
        d="M14 32 C4 22 2 12 8 5 C12 0 20 0 24 5 C30 14 24 24 14 32Z"
        fill="#4A7C5F"
      />
      <path d="M14 32 C14 20 14 8 14 2" stroke="#2A5C3F" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function GoldRing({ className = "", size = 32, opacity = 1 }: DecoratorProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <circle cx="16" cy="16" r="12" stroke="#D4A929" strokeWidth="6" fill="none" />
    </svg>
  );
}
