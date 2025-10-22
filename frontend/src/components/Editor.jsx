import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { materialDarkInit } from "@uiw/codemirror-theme-material";

import { HocuspocusProvider } from "@hocuspocus/provider";
import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";
import * as Y from "yjs";
import { keymap } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { getFileByRoomId, updateFile } from '../services/fileService';
import { useToast } from '../hooks/useToast';
import styles from '../css/Editor.module.css';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:1234';

function Editor({ roomId = 'demo', getToken }) {
    const [status, setStatus] = useState("connecting");
    const [provider, setProvider] = useState(null);
    const [ytext, setYtext] = useState(null);
    const [fileError, setFileError] = useState(null);
    const [fileId, setFileId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const isConnectingRef = useRef(false);
    const { success, error: showError } = useToast();

    const copyRoomId = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            success('Room ID copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy room ID:', error);
            showError('Failed to copy room ID');
        }
    }, [roomId, success, showError]);

    const saveFile = useCallback(async () => {
        if (!fileId || !ytext || isSaving) return;

        setIsSaving(true);
        try {
            const content = ytext.toString();
            await updateFile(fileId, { content });
            setLastSaved(new Date());
            success('File saved successfully');
        } catch (error) {
            console.error('Error saving file:', error);
            showError('Failed to save file. Please try again.');
        }
        setIsSaving(false);
    }, [fileId, ytext, isSaving, success, showError]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                saveFile();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [saveFile]);

    useEffect(() => {
        let isMounted = true;
        let providerInstance = null;

        const initializeProvider = async () => {
            if (!isMounted || isConnectingRef.current) return;
            isConnectingRef.current = true;

            let contentToLoad = '';
            try {
                const file = await getFileByRoomId(roomId);
                contentToLoad = file.content || '';
                setFileId(file.id);
                setFileError(null);
            } catch (error) {
                console.error('Error loading file content:', error);
                setFileError('File not found or could not be loaded');
                contentToLoad = '';
            }

            const ydoc = new Y.Doc();
            const ytext = ydoc.getText('content');

            let wsUrl = WS_URL;
            if (getToken) {
                try {
                    const token = await getToken();
                    if (token) {
                        wsUrl = `${WS_URL}?token=${encodeURIComponent(token)}`;
                    }
                } catch (error) {
                    console.warn('Failed to get auth token:', error);
                }
            }

            if (!isMounted) return;

            const providerConfig = {
                url: wsUrl,
                name: `codium:${roomId}`,
                document: ydoc,
            };

            const newProvider = new HocuspocusProvider(providerConfig);
            providerInstance = newProvider;

            newProvider.on('status', (event) => {
                if (event.status === 'disconnected') {
                    setStatus('disconnected');
                }
            });

            newProvider.on('connect', () => {
                setStatus('connected');
            });

            newProvider.on('disconnect', () => {
                setStatus('disconnected');
            });

            newProvider.on('authenticationFailed', () => {
                setStatus('auth-failed');
            });

            newProvider.on('close', () => {
                setStatus('closed');
            });

            newProvider.on('synced', () => {
                setTimeout(() => {
                    if (ytext.length === 0) {
                        try {
                            if (contentToLoad) {
                                ytext.insert(0, contentToLoad);
                            } else {
                                ytext.insert(0, "// Start your code here...");
                            }
                        } catch (error) {
                            console.warn('Error inserting content:', error);
                        }
                    }
                }, 100);
            });

            newProvider.configuration.awareness.setLocalStateField('user', {
                name: `user-${Math.floor(Math.random() * 1000)}`,
                color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`,
            });

            if (isMounted) {
                setProvider(newProvider);
                setYtext(ytext);
            }
        };

        initializeProvider();

        return () => {
            isMounted = false;
            isConnectingRef.current = false;
            if (providerInstance) {
                providerInstance.destroy();
            }
        };
    }, [roomId, getToken]);

    useEffect(() => {
        if (!provider) return;

        const handler = (event) => setStatus(event.status);
        provider.on("status", handler);
        return () => {
            provider.off("status", handler);
        };
    }, [provider]);

    const extensions = useMemo(() => {
        if (!ytext || !provider) return [];

        const undoManager = new Y.UndoManager(ytext);
        return [
            javascript(),
            history(),
            keymap.of([...defaultKeymap, ...historyKeymap, ...yUndoManagerKeymap]),
            yCollab(ytext, provider.configuration.awareness, { undoManager }),
        ];
    }, [ytext, provider]);

    if (!provider || !ytext) {
        return (
            <div className={styles.editorContainer}>
                <div className={styles.statusConnecting}>
                    ● init
                </div>
            </div>
        );
    }


    return (
        <div className={styles.editorContainer}>
            <div className={styles.editorHeader}>
                <div className={status === 'connected' ? styles.statusConnected : status === 'closed' ? styles.statusDisconnected : styles.statusConnecting}>
                    ● {status.charAt(0).toUpperCase() + status.slice(1)} - Room: <span className={styles.roomId} onClick={copyRoomId} title="Click to copy">{roomId}</span>
                </div>
                <div>
                    {lastSaved && (
                        <span className={styles.lastSaved}>
                            Last saved: {lastSaved.toLocaleTimeString()}
                        </span>
                    )}
                    <button
                        onClick={saveFile}
                        disabled={!fileId || isSaving}
                        className={isSaving ? styles.saveBtnDisabled : styles.saveBtn} >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
            {fileError && (
                <div className={styles.fileError}>
                    {fileError}
                </div>
            )}
            <CodeMirror
                height="calc(100vh - 55px - 6rem)"
                extensions={extensions}
                basicSetup={{
                    foldGutter: true,
                    dropCursor: false,
                    allowMultipleSelections: true,
                    indentOnInput: true,
                }}
                theme={materialDarkInit({
                    settings: {
                        caret: "#c6c6c6",
                        background: "#222222",
                        gutterBackground: "#202020",
                        gutterForeground: "#cccccc",
                        gutterActiveForeground: "#ffffff",
                        gutterBorder: "#404040",
                        fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    },
                })}
            />
        </div>
    );
}

export default Editor;