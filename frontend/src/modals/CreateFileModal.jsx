import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from '../css/Modal.module.css';

export default function CreateFileModal({ 
  isOpen, 
  onClose, 
  onCreateFile 
}) {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileNameError, setFileNameError] = useState('');

  const validateFileName = (name) => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      return 'File name is required';
    }
    
    if (trimmedName.length < 1) {
      return 'File name must be at least 1 character long';
    }
    
    if (trimmedName.length > 32) {
      return 'File name must be less than 32 characters';
    }
    
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(trimmedName)) {
      return 'File name contains invalid characters';
    }
    
    for (let i = 0; i < trimmedName.length; i++) {
      const charCode = trimmedName.charCodeAt(i);
      if (charCode < 32) {
        return 'File name contains invalid characters';
      }
    }
    
    return '';
  };

  const handleFileNameChange = (e) => {
    const value = e.target.value;
    setFileName(value);
    setFileNameError(validateFileName(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateFileName(fileName);
    if (validationError) {
      setFileNameError(validationError);
      return;
    }

    await onCreateFile(fileName.trim(), fileContent);
    setFileName('');
    setFileContent('');
    setFileNameError('');
    onClose();
  };

  const handleClose = () => {
    setFileName('');
    setFileContent('');
    setFileNameError('');
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>Create New File</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="fileName">File Name:</label>
              <input
                type="text"
                id="fileName"
                value={fileName}
                onChange={handleFileNameChange}
                placeholder="Enter file name"
                required
                className={fileNameError ? styles.inputError : ''}
              />
              {fileNameError && (
                <div>
                  {fileNameError}
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fileContent">Initial Content (optional):</label>
              <textarea
                id="fileContent"
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                placeholder="Enter initial content for your file"
                rows="6"
              />
            </div>
            <div className={styles.modalActions}>
              <Dialog.Close asChild>
                <button type="button">
                  Cancel
                </button>
              </Dialog.Close>
              <button type="submit">Create File</button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
