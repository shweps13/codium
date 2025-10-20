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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    await onCreateFile(fileName.trim(), fileContent);
    setFileName('');
    setFileContent('');
    onClose();
  };

  const handleClose = () => {
    setFileName('');
    setFileContent('');
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
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
                required
              />
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
