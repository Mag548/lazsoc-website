export default function MapleLeaf({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 160 190" role="img" aria-label="Animated golden maple leaf">
      <defs>
        <linearGradient id="goldLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff4c6" />
          <stop offset=".4" stopColor="#e6bc67" />
          <stop offset="1" stopColor="#b78035" />
        </linearGradient>
      </defs>
      <path d="M79 8 68 44 52 30 54 58 24 51 37 77 10 88 39 106 29 131 63 123 72 151 76 181 84 181 89 151 98 123 132 131 122 106 151 88 123 77 136 51 106 58 108 30 92 44Z" fill="url(#goldLeaf)" stroke="#fff2c3" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M79 160 79 38 M79 106 37 79 M79 115 119 79 M79 88 56 49 M79 87 103 46" stroke="#9e712f" strokeWidth="1.8" opacity=".32" fill="none" />
    </svg>
  );
}
