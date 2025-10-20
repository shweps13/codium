import * as Dialog from '@radix-ui/react-dialog';
import styles from '../css/Modal.module.css';

export default function DeleteFileModal({ 
  file, 
  isOpen, 
  onClose, 
  onConfirm 
}) {
  const handleDelete = () => {
    onConfirm(file.id);
    onClose();
  };

  if (!file) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>
            Delete File
          </Dialog.Title>
          
          <div style={{ marginBottom: '1rem', color: '#a3a3a3' }}>
            Are you sure you want to delete "<strong style={{ color: 'white' }}>{file.name}</strong>"? 
            This action cannot be undone.
          </div>
          
          <div className={styles.modalActions}>
            <Dialog.Close asChild>
              <button type="button">
                Cancel
              </button>
            </Dialog.Close>
            <button 
              type="button"
              onClick={handleDelete}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#b91c1c';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#dc2626';
              }}
            >
              Delete File
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
