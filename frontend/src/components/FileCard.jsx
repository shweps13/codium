import { useState } from 'react';
import dashboardStyles from '../css/Dashboard.module.css';
import DeleteFileModal from '../modals/DeleteFileModal';
import { useToast } from '../hooks/useToast';

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

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Unknown';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleString();
    };

    const handleDelete = (fileId) => {
        onDelete(fileId);
    };

    return (
        <>
            <div className={dashboardStyles.fileCard}>
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
                            Delete
                        </button>
                    </div>
                </div>

                <div className={dashboardStyles.fileInfo}>
                    <p className={dashboardStyles.fileMeta}>
                        Created: {formatDate(file.createdAt)}
                    </p>
                    <p className={dashboardStyles.fileMeta}>
                        Updated: {formatDate(file.updatedAt)}
                    </p>
                    {file.isShared && (
                        <div className={dashboardStyles.sharingInfo}>
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
            </div>

            <DeleteFileModal
                file={file}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}
