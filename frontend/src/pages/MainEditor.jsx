import Header from '../shared/Header';
import ProtectedRoute from '../shared/ProtectedRoute';
import Editor from '../components/Editor';

function MainEditor() {
    return (
        <>
            <Header />
            <ProtectedRoute>
                <Editor />
            </ProtectedRoute>
        </>
    )
}

export default MainEditor