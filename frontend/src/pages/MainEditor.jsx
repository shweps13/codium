import Header from '../shared/Header';
import ProtectedRoute from '../shared/ProtectedRoute';
import Editor from '../components/Editor';

function MainEditor({ roomId, getToken }) {
    return (
        <>
            <Header />
            <ProtectedRoute>
                <Editor roomId={roomId} getToken={getToken} />
            </ProtectedRoute>
        </>
    )
}

export default MainEditor