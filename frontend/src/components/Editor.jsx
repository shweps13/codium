import { useRef, useEffect } from "react"
import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import styles from "./Editor.module.css"
import { oneDarkTheme } from "@codemirror/theme-one-dark"

function Editor() {
    const editorRef = useRef(null)
    const viewRef = useRef(null)
    const initContent = `
    function greet(name) {
        return "Hello, " + name + "!";
    }

    console.log(greet("world"));
    `

    useEffect(() => {
        if (editorRef.current && !viewRef.current) {
            const editorView = new EditorView({
                parent: editorRef.current,
                doc: initContent,
                extensions: [basicSetup, javascript(), oneDarkTheme]
            })
            viewRef.current = editorView
        }

        return () => {
            if (viewRef.current) {
                viewRef.current.destroy()
                viewRef.current = null
            }
        }
    }, [initContent])

    const clearEditor = () => {
        if (viewRef.current) {
            viewRef.current.dispatch({
                changes: {
                    from: 0,
                    to: viewRef.current.state.doc.length,
                    insert: ""
                }
            })
        }
    }

    return (
        <div className={styles.editorContainer}>
            <div ref={editorRef}></div>
            <div>
                <button onClick={clearEditor}>
                    Clear
                </button>
            </div>
        </div>
    )
}

export default Editor