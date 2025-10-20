import { useState, useCallback } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { ToastContext } from './ToastContext';
import styles from '../css/Toast.module.css';

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      title: toast.title,
      description: toast.description,
      type: toast.type || 'foreground',
      duration: toast.duration || 5000,
      action: toast.action,
      ...toast
    };
    
    setToasts(prev => [...prev, newToast]);
    
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message, options = {}) => {
    return addToast({
      title: 'Success',
      description: message,
      type: 'foreground',
      ...options
    });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({
      title: 'Error',
      description: message,
      type: 'foreground',
      duration: 7000,
      ...options
    });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({
      title: 'Info',
      description: message,
      type: 'background',
      ...options
    });
  }, [addToast]);

  const value = {
    addToast,
    removeToast,
    success,
    error,
    info
  };

  return (
    <ToastContext.Provider value={value}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Viewport className={styles.toastViewport} />
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            className={`${styles.toastRoot} ${styles[toast.type]}`}
            duration={toast.duration}
            onOpenChange={(open) => {
              if (!open) {
                removeToast(toast.id);
              }
            }}
          >
            <Toast.Title className={styles.toastTitle}>
              {toast.title}
            </Toast.Title>
            <Toast.Description className={styles.toastDescription}>
              {toast.description}
            </Toast.Description>
            {toast.action && (
              <Toast.Action className={styles.toastAction} asChild>
                {toast.action}
              </Toast.Action>
            )}
            <Toast.Close className={styles.toastClose} aria-label="Close">
              <span aria-hidden>×</span>
            </Toast.Close>
          </Toast.Root>
        ))}
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
