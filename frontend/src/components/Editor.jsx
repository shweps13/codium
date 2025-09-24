import React, { useEffect, useMemo, useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { materialDarkInit } from "@uiw/codemirror-theme-material";

import { HocuspocusProvider } from "@hocuspocus/provider";
import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";
import * as Y from "yjs";
import { keymap } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import styles from '../css/Editor.module.css';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:1234';

function Editor({ roomId = 'demo', getToken }) {
    const [status, setStatus] = useState("connecting");
    const [provider, setProvider] = useState(null);
    const [ytext, setYtext] = useState(null);
    const isConnectingRef = useRef(false);

    useEffect(() => {
        let isMounted = true;
        let providerInstance = null;

        const initializeProvider = async () => {
            if (!isMounted || isConnectingRef.current) return;
            isConnectingRef.current = true;

            const ydoc = new Y.Doc();
            const ytext = ydoc.getText('content');
            
            let wsUrl = WS_URL;
            if (getToken) {
                try {
                    const token = await getToken();
                    if (token) {
                        wsUrl = `${WS_URL}?token=${encodeURIComponent(token)}`;
                        console.log('Connecting with authentication token');
                    } else {
                        console.warn('No auth token available, connection will fail');
                    }
                } catch (error) {
                    console.warn('Failed to get auth token:', error);
                }
            } else {
                console.warn('No getToken function provided, connection will fail');
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
                console.log('status ->', event.status);
                if (event.status === 'disconnected') {
                    setStatus('disconnected');
                }
            });
            
            newProvider.on('connect', () => {
                console.log('connected ->', roomId);
                setStatus('connected');
            });
            
            newProvider.on('disconnect', () => {
                console.log('disconnected ->', roomId);
                setStatus('disconnected');
            });

            newProvider.on('authenticationFailed', (event) => {
                console.error('failed ->', event);
                setStatus('auth-failed');
            });

            newProvider.on('close', (event) => {
                console.log('closed ->', event);
                setStatus('closed');
            });

            newProvider.on('synced', () => {
                console.log('synced ->');
                
                setTimeout(() => {
                    if (ytext.length === 0) {
                        try {
                            ytext.insert(0, "// AZAZAZAZ [welcome baby]");
                        } catch (error) {
                            console.warn('Error', error);
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

    const clearEditor = () => {
        if (ytext && ytext.length > 0) ytext.delete(0, ytext.length);
    };

    if (!provider || !ytext) {
        return (
            <div className={styles.editorContainer}>
                <div style={{ color: "orange" }}>
                    ● init
                </div>
            </div>
        );
    }


    return (
        <div className={styles.editorContainer}>
            <div style={{ color: status === 'connected' ? 'green' : 'orange' }}>
                ● {status} (Room: {roomId})
            </div>
            <CodeMirror
                height="400px"
                extensions={extensions}
                basicSetup={{
                    foldGutter: false,
                    dropCursor: false,
                    allowMultipleSelections: true,
                    indentOnInput: true,
                }}
                theme={materialDarkInit({
                    settings: {
                        caret: "#c6c6c6",
                        fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    },
                })}
            />
            <div>
                <button onClick={clearEditor}>Clear</button>
            </div>
        </div>
    );
}

export default Editor;