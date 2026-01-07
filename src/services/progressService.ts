import { collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

import { calculateScore, canEarnPoints } from '../utils/gamificationRules';

export const getUserProgress = async (diseaseId: string) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const ref = doc(db, 'users', uid, 'progress', diseaseId);
  const snap = await getDoc(ref);
  return snap.exists()
    ? snap.data()
    : { completedModules: [], totalPoints: 0 };
};

export const markModuleComplete = async (diseaseId: string, moduleIndex: number) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const ref = doc(db, 'users', uid, 'progress', diseaseId);
  const snap = await getDoc(ref);
  
  const completed = snap.exists() ? snap.data().completedModules || [] : [];
  const currentPoints = snap.exists() ? snap.data().totalPoints || 0 : 0;

  if (!canEarnPoints(completed, moduleIndex)) {
    console.log(`Módulo ${moduleIndex} já completado. Nenhum ponto novo atribuído.`);
    return;
  }

  const newPoints = calculateScore(currentPoints, 10, 30);

  if (snap.exists()) {
    await updateDoc(ref, {
      completedModules: arrayUnion(moduleIndex),
      totalPoints: newPoints,
    });
  } else {
    await setDoc(ref, {
      completedModules: [moduleIndex],
      totalPoints: 10,
    });
  }
};

export const getTotalPoints = async (): Promise<number> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const q = await getDocs(collection(db, 'users', uid, 'progress'));
  let sum = 0;
  q.forEach(docSnap => {
    sum += (docSnap.data().totalPoints as number) || 0;
  });
  return sum;
};