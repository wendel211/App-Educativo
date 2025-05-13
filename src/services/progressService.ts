import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export const getUserProgress = async (diseaseId: string) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const ref = doc(db, 'users', uid, 'progress', diseaseId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : { completedModules: [], totalPoints: 0 };
};

export const markModuleComplete = async (diseaseId: string, moduleIndex: number) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const ref = doc(db, 'users', uid, 'progress', diseaseId);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    await updateDoc(ref, {
      completedModules: arrayUnion(moduleIndex),
      totalPoints: (snap.data().totalPoints || 0) + 10,
    });
  } else {
    await setDoc(ref, {
      completedModules: [moduleIndex],
      totalPoints: 10,
    });
  }
};
