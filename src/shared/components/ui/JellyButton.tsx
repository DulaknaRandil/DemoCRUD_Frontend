'use client';

import React from 'react';
import styles from './JellyButton.module.css';

interface JellyButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void | Promise<void>;
  className?: 'success' | 'secondary' | 'danger' | 'info' | 'warning' | string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const JellyButton: React.FC<JellyButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  type = 'button',
  disabled = false
}) => {
  // Define valid style variants
  const validVariants = ['success', 'secondary', 'danger', 'info', 'warning'];
  
  // Get inline styles for variants to ensure they override CSS modules
  const getVariantStyle = (variant: string) => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: 'rgb(34, 197, 94)',
          color: 'white',
          boxShadow: '0px 8px 8px rgb(125, 230, 175) inset, 0px 4px 8px rgba(5, 5, 5, 0.212), 0px -8px 8px rgb(22, 163, 74) inset'
        };
      case 'warning':
        return {
          backgroundColor: 'rgb(255, 193, 7)',
          color: '#000000',
          fontWeight: '700',
          boxShadow: '0px 8px 8px rgb(255, 205, 86) inset, 0px 4px 8px rgba(5, 5, 5, 0.212), 0px -8px 8px rgb(255, 179, 0) inset'
        };
      case 'danger':
        return {
          backgroundColor: 'rgb(239, 68, 68)',
          color: 'white',
          boxShadow: '0px 8px 8px rgb(248, 148, 139) inset, 0px 4px 8px rgba(5, 5, 5, 0.212), 0px -8px 8px rgb(220, 38, 38) inset'
        };
      case 'info':
        return {
          backgroundColor: 'rgb(59, 130, 246)',
          color: 'white',
          boxShadow: '0px 8px 8px rgb(133, 193, 233) inset, 0px 4px 8px rgba(5, 5, 5, 0.212), 0px -8px 8px rgb(37, 99, 235) inset'
        };
      case 'secondary':
        return {
          backgroundColor: 'rgb(108, 117, 125)',
          color: 'white',
          boxShadow: '0px 8px 8px rgb(173, 181, 189) inset, 0px 4px 8px rgba(5, 5, 5, 0.212), 0px -8px 8px rgb(90, 98, 104) inset'
        };
      default:
        return {};
    }
  };
  
  const buttonClass = [
    styles.btn,
    // Apply variant class if it's a valid variant
    validVariants.includes(className) ? styles[className] : '',
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  const inlineStyle = validVariants.includes(className) ? getVariantStyle(className) : {};

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <button 
      className={buttonClass}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      data-variant={validVariants.includes(className) ? className : 'default'}
      style={inlineStyle}
    >
      {children}
    </button>
  );
};

export default JellyButton;
