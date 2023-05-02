import React from 'react'

export default function LinkTo({ children, href, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-bold  hover:underline px-2 rounded-lg hover:text-blue-500 focus:text-blue-500 ${className}`}
    >
      {children}
    </a>
  )
}
