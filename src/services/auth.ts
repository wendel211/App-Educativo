import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  type User
} from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const register = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  try {
    await updateProfile(user, { displayName: name });
  } catch (err) {
    console.warn('Falha ao definir displayName:', err);
  }
  try {
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Falha ao criar doc de usuário:', err);
  }
  return user;
};

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);


export const forgotPassword = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};
