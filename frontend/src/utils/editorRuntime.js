import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:1234';


export const ydoc = new Y.Doc();
export const ytext = ydoc.getText('codium');
export const provider = new HocuspocusProvider({
    url: WS_URL,
    name: 'codium:demo',
    document: ydoc,
});

provider.configuration.awareness.setLocalStateField('user', {
    name: `user-${Math.floor(Math.random() * 1000)}`,
    color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`,
});

if (ytext.length === 0) {
    ytext.insert(
        0,
        "// Start your code here..."
    );
}