import { useState } from "react"
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript';
import { materialDarkInit } from '@uiw/codemirror-theme-material';

function Editor() {
    const [value, setValue] = useState(`function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("world"));`)

    const clearEditor = () => {
        setValue("")
    }

    return (
        <div>
            <CodeMirror
                value={value}
                height="200px"
                extensions={[javascript()]}
                basicSetup={{
                    foldGutter: false,
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: false,
                }}
                onChange={(val) => setValue(val)}
                theme={materialDarkInit({
                    settings: {
                        caret: '#c6c6c6',
                        fontFamily: 'monospace',
                    }
                })}
            />
            <div>
                <button onClick={clearEditor}>
                    Clear
                </button>
            </div>
        </div>
    )
}

export default Editor