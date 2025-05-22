import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';


export const createAlert = async (alertData) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const ref = collection(db, 'users', uid, 'alerts');

  const docRef = await addDoc(ref, {
    ...alertData
  });

  return docRef.id;
};


export const getUserAlerts = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const ref = collection(db, 'users', uid, 'alerts');
  const querySnapshot = await getDocs(ref);

  const alerts = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return alerts;
};


export const deleteAlert = async (alertId) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const ref = doc(db, 'users', uid, 'alerts', alertId);
  await deleteDoc(ref);
};
