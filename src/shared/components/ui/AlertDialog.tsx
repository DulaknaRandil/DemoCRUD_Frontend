'use client';

import React from 'react';
import styles from './AlertDialog.module.css';
import JellyButton from './JellyButton';

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export default function AlertDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'danger'
}: AlertDialogProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.dialog}>
        <div className={styles.dialogContent}>
          <div className={styles.icon}>
            {type === 'danger' && '🗑️'}
            {type === 'warning' && '⚠️'}
            {type === 'info' && 'ℹ️'}
          </div>
          
          <div className={styles.textContent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.message}>{message}</p>
          </div>
          
          <div className={styles.buttonGroup}>
            <JellyButton
              onClick={onCancel}
              className="secondary"
            >
              {cancelText}
            </JellyButton>
            
            <JellyButton
              onClick={onConfirm}
              className={type === 'danger' ? 'danger' : type === 'warning' ? 'warning' : 'info'}
            >
              {confirmText}
            </JellyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
