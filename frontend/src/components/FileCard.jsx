import { useState } from 'react';
import dashboardStyles from '../css/Dashboard.module.css';
import DeleteFileModal from '../modals/DeleteFileModal';
import { useToast } from '../hooks/useToast';
import deleteIcon from '../assets/delete.svg';

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
                className={dashboardStyles.fileCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
            >
                <div className={dashboardStyles.fileHeader}>
                    <h3 className={dashboardStyles.fileName}>{file.name}</h3>
                    <div className={dashboardStyles.fileActions}>
                        <button
                            className={dashboardStyles.actionButton}
                            onClick={() => onEdit(file)}
                            title="Edit File"
                        >
                            Edit
                        </button>
                        <button
                            className={dashboardStyles.actionButton}
                            onClick={() => onToggleSharing(file)}
                            title={file.isShared ? 'Stop Sharing' : 'Share File'}
                        >
                            {file.isShared ? 'Unshare' : 'Share'}
                        </button>
                        <button
                            className={dashboardStyles.actionButton}
                            onClick={() => setShowDeleteModal(true)}
                            title="Delete File"
                        >
                            <img width={15} height={15} src={deleteIcon} alt="Delete" className={dashboardStyles.deleteIcon} />
                        </button>
                    </div>
                </div>

                <div className={dashboardStyles.fileInfo}>
                    <div className={dashboardStyles.contentPreview}>
                        <p className={dashboardStyles.previewLabel}>Preview:</p>
                        <p className={dashboardStyles.previewText}>
                            {getContentPreview(file.content)}
                        </p>
                    </div>
                    {file.isShared && (
                        <div
                            className={dashboardStyles.sharingInfo}
                        >
                            <p className={dashboardStyles.roomId}>
                                Room ID: {file.roomId}
                            </p>
                            <button
                                className={dashboardStyles.copyButton}
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
