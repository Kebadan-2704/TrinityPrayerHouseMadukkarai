import React from 'react';

export default function CustomLangIcon({ 
  size = 24, 
  strokeWidth = 2, 
  className = '' 
}: { 
  size?: number | string; 
  strokeWidth?: number | string; 
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Tamil character on top-left, maximized */}
      <text 
        x="0" 
        y="13" 
        fontSize="14" 
        fontWeight="bold" 
        stroke="none" 
        fill="currentColor" 
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        அ
      </text>
      
      {/* 'A' character on bottom-right, maximized */}
      <path d="m23 23-6-12-6 12" />
      <path d="M13.5 18h7" />
    </svg>
  );
}
