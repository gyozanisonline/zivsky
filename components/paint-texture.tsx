// SVG paint-splatter background using bezier paths — looks like a studio wall
// lightly flecked with paint. Deterministic (no JS), no canvas sizing issues.

export function PaintTexture() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full z-0"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brushstroke streaks */}
      <path d="M 42 130 Q 80 118 115 135"   stroke="#8C8A5E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.09"/>
      <path d="M 870 60 Q 910 75 940 58"    stroke="#A0794F" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.07"/>
      <path d="M 310 890 Q 360 875 400 895" stroke="#6B5B3E" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.08"/>
      <path d="M 740 420 Q 790 410 830 430" stroke="#8C8A5E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.07"/>
      <path d="M 180 540 Q 215 525 255 540" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.06"/>
      <path d="M 600 220 Q 640 205 680 225" stroke="#A0794F" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.08"/>
      <path d="M 50 780 Q 95 765 130 780"   stroke="#6B5B3E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.07"/>
      <path d="M 820 750 Q 865 735 895 755" stroke="#8C8A5E" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.06"/>
      <path d="M 460 70 Q 500 55 535 72"    stroke="#8B4513" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.07"/>
      <path d="M 920 340 Q 955 325 985 345" stroke="#A0794F" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.08"/>
      <path d="M 270 320 Q 320 305 365 328" stroke="#8C8A5E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.06"/>
      <path d="M 680 620 Q 720 605 760 622" stroke="#6B5B3E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.07"/>

      {/* Wider impasto-style marks */}
      <path d="M 140 240 Q 175 220 205 245" stroke="#A0794F" strokeWidth="9"  strokeLinecap="round" fill="none" opacity="0.045"/>
      <path d="M 760 870 Q 800 852 838 872" stroke="#8C8A5E" strokeWidth="8"  strokeLinecap="round" fill="none" opacity="0.04"/>
      <path d="M 530 510 Q 572 493 610 515" stroke="#6B5B3E" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.04"/>
      <path d="M 30 460 Q 68 445 100 462"   stroke="#8B4513" strokeWidth="7"  strokeLinecap="round" fill="none" opacity="0.045"/>
      <path d="M 850 190 Q 890 174 922 195" stroke="#A0794F" strokeWidth="8"  strokeLinecap="round" fill="none" opacity="0.04"/>

      {/* Drip trails */}
      <path d="M 220 0 C 222 80 218 160 225 240"  stroke="#8C8A5E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.06"/>
      <path d="M 670 0 C 674 60 668 130 675 195"  stroke="#A0794F" strokeWidth="1"   strokeLinecap="round" fill="none" opacity="0.05"/>
      <path d="M 430 820 C 433 880 428 940 434 1000" stroke="#6B5B3E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.05"/>

      {/* Splatter dots */}
      <circle cx="88"  cy="95"  r="3.5" fill="#8C8A5E" opacity="0.10"/>
      <circle cx="360" cy="45"  r="2"   fill="#A0794F" opacity="0.09"/>
      <circle cx="570" cy="810" r="4"   fill="#6B5B3E" opacity="0.08"/>
      <circle cx="910" cy="530" r="3"   fill="#8C8A5E" opacity="0.10"/>
      <circle cx="150" cy="670" r="2.5" fill="#8B4513" opacity="0.08"/>
      <circle cx="720" cy="140" r="2"   fill="#A0794F" opacity="0.09"/>
      <circle cx="480" cy="960" r="3"   fill="#8C8A5E" opacity="0.08"/>
      <circle cx="65"  cy="360" r="1.5" fill="#6B5B3E" opacity="0.10"/>
      <circle cx="940" cy="820" r="3"   fill="#8B4513" opacity="0.07"/>
      <circle cx="335" cy="580" r="2"   fill="#8C8A5E" opacity="0.09"/>
      <circle cx="800" cy="290" r="4"   fill="#A0794F" opacity="0.07"/>
      <circle cx="195" cy="420" r="1.5" fill="#6B5B3E" opacity="0.10"/>
      <circle cx="620" cy="380" r="2.5" fill="#8C8A5E" opacity="0.08"/>
      <circle cx="28"  cy="880" r="3"   fill="#8B4513" opacity="0.07"/>
      <circle cx="760" cy="700" r="2"   fill="#A0794F" opacity="0.09"/>
      <circle cx="510" cy="160" r="1.5" fill="#8C8A5E" opacity="0.10"/>
      <circle cx="860" cy="460" r="3.5" fill="#6B5B3E" opacity="0.07"/>
      <circle cx="120" cy="940" r="2"   fill="#A0794F" opacity="0.08"/>
    </svg>
  )
}
