import React from 'react';

interface TextStyleProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<TextStyleProps> = ({ children, className }) => (
  <h1 className={`text-4xl text-bold mb-6 ${className}`}>{children}</h1>
);

export const H2: React.FC<TextStyleProps> = ({ children, className }) => (
  <h2 className={`text-3xl text-bold mb-5 ${className}`}>{children}</h2>
);

export const H3: React.FC<TextStyleProps> = ({ children, className }) => (
  <h3 className={`text-2xl text-bold mb-4 ${className}`}>{children}</h3>
);

export const H4: React.FC<TextStyleProps> = ({ children, className }) => (
  <h4 className={`text-xl text-bold mb-3 ${className}`}>{children}</h4>
);

export const H5: React.FC<TextStyleProps> = ({ children, className }) => (
  <h5 className={`text-lg text-bold mb-2 ${className}`}>{children}</h5>
);

export const P1: React.FC<TextStyleProps> = ({ children, className }) => (
  <p className={`text-base ${className}`}>{children}</p>
);

export const P2: React.FC<TextStyleProps> = ({ children, className }) => (
  <p className={`text-sm ${className}`}>{children}</p>
);
