import React from "react";

const LogoIcon = ({ className = "w-8 h-8", color = "currentColor" }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Circle Background */}
    <path
      d="M100 10 A90 90 0 1 0 100 190 A90 90 0 1 0 100 10 Z M25 90 A75 75 0 0 1 175 90 Z"
      fill={color}
    />
    
    {/* Coffee Cup */}
    {/* Steam */}
    <path d="M85 30 Q90 22 85 15" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M100 28 Q105 20 100 13" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M115 30 Q120 22 115 15" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Cup Body & Handle */}
    <path
      d="M75 35 H125 V52 C125 65 115 72 100 72 C85 72 75 65 75 52 Z"
      fill={color}
    />
    <path
      d="M125 40 C135 40 138 48 135 55 C132 60 125 60 125 60"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />

    {/* Table Surface */}
    <rect x="35" y="78" width="130" height="8" rx="4" fill={color} />

    {/* Table Legs (X Structure) */}
    <path
      d="M60 86 L135 155 M140 86 L65 155"
      stroke={color}
      strokeWidth="10"
      strokeLinecap="round"
    />
    {/* Crossbar accents */}
    <line x1="72" y1="102" x2="128" y2="102" stroke={color} strokeWidth="6" strokeLinecap="round" />
    <line x1="68" y1="128" x2="132" y2="128" stroke={color} strokeWidth="6" strokeLinecap="round" />
    <line x1="68" y1="145" x2="132" y2="145" stroke={color} strokeWidth="6" strokeLinecap="round" />
  </svg>
);

export default LogoIcon;
