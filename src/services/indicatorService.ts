// src/services/indicatorService.ts

import { collection, addDoc, getDocs, orderBy, query, doc, deleteDoc, limit } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';


export const addIndicator = async (data: { date: string; glucose: number; heartRate: number; weight: number; }) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  await addDoc(collection(db, 'users', uid, 'indicators'), data);
};

export const getAllIndicators = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const q = query(
    collection(db, 'users', uid, 'indicators'),
    orderBy('date', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getRecentIndicators = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const q = query(
    collection(db, 'users', uid, 'indicators'),
    orderBy('date', 'desc'),
    limit(3)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};



export const deleteIndicator = async (indicatorId: string) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const ref = doc(db, 'users', uid, 'indicators', indicatorId);
  await deleteDoc(ref);
};
