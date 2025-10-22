import { useState } from 'react';
import styles from '../css/Dashboard.module.css';
import DeleteFileModal from '../modals/DeleteFileModal';
import { useToast } from '../hooks/useToast';
import { RiDeleteBinLine } from "react-icons/ri";

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

export default function FileCard({
    file,
    onEdit,
    onToggleSharing,
    onDelete
}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { success } = useToast();

    const copyRoomId = (roomId) => {
        navigator.clipboard.writeText(roomId);
        success('Room ID copied to clipboard!');
    };

    const getContentPreview = (content) => {
        if (!content) return 'No content';
        const maxLength = 100;
        const preview = content.length > maxLength 
            ? content.substring(0, maxLength) + '...'
            : content;
        return preview;
    };

    const handleDelete = (fileId) => {
        onDelete(fileId);
    };

    return (
        <>
            <motion.div
                className={styles.fileCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
            >
                <div className={styles.fileHeader}>
                    <h3 className={styles.fileName}>{file.name}</h3>
                    <div className={styles.fileActions}>
                        <button
                            className={styles.actionButton}
                            onClick={() => onEdit(file)}
                            title="Edit File"
                        >
                            Edit
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={() => onToggleSharing(file)}
                            title={file.isShared ? 'Stop Sharing' : 'Share File'}
                        >
                            {file.isShared ? 'Unshare' : 'Share'}
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={() => setShowDeleteModal(true)}
                            title="Delete File"
                        >
                            <span className={styles.iconWrapperTop}>
                                <RiDeleteBinLine size={16} />
                            </span>
                        </button>
                    </div>
                </div>

                <div className={styles.fileInfo}>
                    <div className={styles.contentPreview}>
                        <p className={styles.previewLabel}>Preview:</p>
                        <p className={styles.previewText}>
                            {getContentPreview(file.content)}
                        </p>
                    </div>
                    {file.isShared && (
                        <div
                            className={styles.sharingInfo}
                        >
                            <p className={styles.roomId}>
                                Room ID: {file.roomId}
                            </p>
                            <button
                                className={styles.copyButton}
                                onClick={() => copyRoomId(file.roomId)}
                            >
                                Copy Room ID
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>

            <DeleteFileModal
                file={file}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}
