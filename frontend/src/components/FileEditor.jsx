import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { updateFile } from '../services/fileService';
import styles from '../css/Modal.module.css';

export default function FileEditor({ file, onClose, onSave }) {
  const [content, setContent] = useState(file?.content || '');
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (file?.content !== undefined) {
      setContent(file.content);
      setHasChanges(false);
    }
  }, [file?.content]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setHasChanges(e.target.value !== file?.content);
  };

  const handleSave = async () => {
    if (!file?.id || !hasChanges) return;

    setSaving(true);
    try {
      await updateFile(file.id, { content });
      setHasChanges(false);
      if (onSave) onSave({ ...file, content });
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Failed to save file');
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    // hotkey
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  if (!file) return null;

  return (
    <Dialog.Root open={!!file} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContentLarge}>
          <div className={styles.fileViewerHeader}>
            <Dialog.Title className={styles.dialogTitle}>{file.name}</Dialog.Title>
            <div className={styles.editorActions}>
              {hasChanges && (
                <span className={styles.unsavedIndicator}>Unsaved changes</span>
              )}
              <button 
                onClick={handleSave} 
                disabled={!hasChanges || saving}
                className={styles.saveButton}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <Dialog.Close asChild>
                <button>✕</button>
              </Dialog.Close>
            </div>
          </div>
          
          <div className={styles.editorContent}>
            <textarea
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              placeholder="Start typing your code here..."
              className={styles.codeEditor}
              spellCheck={false}
            />
          </div>
          
          <div className={styles.editorFooter}>
            <div className={styles.fileInfo}>
              <span>Room ID: {file.roomId}</span>
              {file.isShared && <span className={styles.sharedIndicator}>Shared</span>}
            </div>
            <div className={styles.editorShortcuts}>
              <small>Press Ctrl/Cmd + S to save</small>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
