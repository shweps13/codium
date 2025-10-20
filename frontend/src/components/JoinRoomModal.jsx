import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { getFileByRoomId } from '../services/fileService';
import styles from '../css/Modal.module.css';

export default function JoinRoomModal({ isOpen, onClose, onJoinRoom }) {
  const [roomId, setRoomId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomId.trim()) return;

    setLoading(true);
    setError('');

    try {
      const file = await getFileByRoomId(roomId.trim());
      if (file && file.isShared) {
        onJoinRoom(file);
        setRoomId('');
        onClose();
      } else {
        setError('Room not found or not shared');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      setError('Failed to join room. Please check the room ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRoomId('');
    setError('');
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>Join Room</Dialog.Title>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="roomId">Room ID:</label>
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID to join"
                required
                disabled={loading}
              />
              {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
            
            <div className={styles.modalActions}>
              <Dialog.Close asChild>
                <button 
                  type="button" 
                  disabled={loading}
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button 
                type="submit" 
                disabled={loading || !roomId.trim()}
              >
                {loading ? 'Joining...' : 'Join Room'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
