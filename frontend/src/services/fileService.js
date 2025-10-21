import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../utils/firebase';

export const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const createFile = async (userId, fileName, content = '') => {
  try {
    const roomId = generateRoomId();
    const fileData = {
      name: fileName,
      content: content,
      ownerId: userId,
      roomId: roomId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isShared: false
    };
    
    const docRef = await addDoc(collection(db, 'files'), fileData);
    return { id: docRef.id, ...fileData };
  } catch (error) {
    console.error('Error creating file:', error);
    throw error;
  }
};

export const getUserFiles = async (userId) => {
  try {
    const q = query(
      collection(db, 'files'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user files:', error);
    throw error;
  }
};

export const getFile = async (fileId) => {
  try {
    const docRef = doc(db, 'files', fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('File not found');
    }
  } catch (error) {
    console.error('Error getting file:', error);
    throw error;
  }
};

export const getFileByRoomId = async (roomId) => {
  try {
    const q = query(
      collection(db, 'files'),
      where('roomId', '==', roomId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      throw new Error('File not found');
    }
  } catch (error) {
    console.error('Error getting file by room ID:', error);
    throw error;
  }
};

export const updateFile = async (fileId, updates) => {
  try {
    const docRef = doc(db, 'files', fileId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating file:', error);
    throw error;
  }
};

export const deleteFile = async (fileId) => {
  try {
    const docRef = doc(db, 'files', fileId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const toggleFileSharing = async (fileId, isShared) => {
  try {
    const docRef = doc(db, 'files', fileId);
    const updateData = {
      isShared: isShared,
      updatedAt: serverTimestamp()
    };
    
    if (isShared) {
      updateData.roomId = generateRoomId();
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error toggling file sharing:', error);
    throw error;
  }
};

