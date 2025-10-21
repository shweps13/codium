import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import Header from '../shared/Header';
import ProtectedRoute from '../shared/ProtectedRoute';
import JoinRoomModal from '../components/JoinRoomModal';
import FileCard from '../components/FileCard';
import CreateFileModal from '../modals/CreateFileModal';
import {
  createFile,
  getUserFiles,
  deleteFile,
  toggleFileSharing
} from '../services/fileService';
import styles from '../css/Dashboard.module.css';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const loadFiles = useCallback(async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const userFiles = await getUserFiles(currentUser.uid);
      setFiles(userFiles);
    } catch (error) {
      console.error('Error loading files:', error);
      showError('Failed to load files');
    } finally {
      setLoading(false);
    }
  }, [currentUser, showError]);

  useEffect(() => {
    if (currentUser) {
      loadFiles();
    }
  }, [currentUser, loadFiles]);

  const handleCreateFile = async (fileName, fileContent) => {
    try {
      await createFile(currentUser.uid, fileName, fileContent);
      loadFiles();
      success('File created successfully');
    } catch (error) {
      console.error('Error creating file:', error);
      showError('Failed to create file');
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await deleteFile(fileId);
      loadFiles();
      success('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      showError('Failed to delete file');
    }
  };

  const handleToggleSharing = async (file) => {
    try {
      await toggleFileSharing(file.id, !file.isShared);
      loadFiles();
      success(file.isShared ? 'File sharing disabled' : 'File sharing enabled');
    } catch (error) {
      console.error('Error toggling sharing:', error);
      showError('Failed to update sharing status');
    }
  };


  const handleEditFile = async (file) => {
    try {
      if (file.isShared && file.roomId) {
        navigate(`/editor/${file.roomId}`);
        return;
      }
      
      if (!file.isShared) {
        await toggleFileSharing(file.id, true);
        await loadFiles();
        
        const updatedFiles = await getUserFiles(currentUser.uid);
        const updatedFile = updatedFiles.find(f => f.id === file.id);
        if (updatedFile && updatedFile.roomId) {
          navigate(`/editor/${updatedFile.roomId}`);
        } else {
          showError('Failed to generate room ID. Please try again.');
        }
      } else {
        showError('File is shared but missing room ID. Please refresh and try again.');
      }
    } catch (error) {
      console.error('Error opening file for editing:', error);
      showError('Failed to open file for editing. Please try again.');
    }
  };

  const handleJoinRoom = (file) => {
    if (file && file.roomId) {
      navigate(`/editor/${file.roomId}`);
    } else {
      showError('Invalid room ID. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <ProtectedRoute>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Dashboard</h1>
            <div className={styles.headerActions}>
              <button
                className={styles.joinButton}
                onClick={() => setShowJoinModal(true)}
              >
                Join Room
              </button>
              <button
                className={styles.createButton}
                onClick={() => setShowCreateModal(true)}
              >
                Create File
              </button>
            </div>
          </div>

          <div className={styles.filesSection}>
            <div className={styles.filesSectionHeader}>
              {loading ? (
                <h2> Your Files </h2>
              ) : (
                <h2> Your Files ({files.length})</h2>
              )}
              <button
                className={styles.refreshButton}
                onClick={loadFiles}
                title="Refresh Files"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className={styles.loading}>Loading files...</div>
            ) :
              <>
                {files.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No files yet. Create your first file to get started!</p>
                  </div>
                ) : (
                  <div className={styles.filesGrid}>
                    {files.map((file) => (
                      <FileCard
                        key={file.id}
                        file={file}
                        onEdit={handleEditFile}
                        onToggleSharing={handleToggleSharing}
                        onDelete={handleDeleteFile}
                      />
                    ))}
                  </div>
                )}
              </>
            }
          </div>

          <CreateFileModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreateFile={handleCreateFile}
          />

          <JoinRoomModal
            isOpen={showJoinModal}
            onClose={() => setShowJoinModal(false)}
            onJoinRoom={handleJoinRoom}
          />

        </div>
      </ProtectedRoute >
    </div >
  );
}
