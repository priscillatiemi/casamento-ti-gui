import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYrnvgTnmwLTJ-mHempw9ifZ8G-Z78yT0",
  authDomain: "convidados-casamento-tg.firebaseapp.com",
  projectId: "convidados-casamento-tg",
  storageBucket: "convidados-casamento-tg.firebasestorage.app",
  messagingSenderId: "74543456832",
  appId: "1:74543456832:web:cb6263bf65766870e8f5a5",
  measurementId: "G-9QNLXPRHS9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export function normalizeName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

export async function searchGuestByName(name) {
  const normalized = normalizeName(name);

  const guestsRef = collection(db, 'convidados');

  const exactQuery = query(
    guestsRef,
    where('nomeBusca', '==', normalized)
  );

  const snapshot = await getDocs(exactQuery);

  if (!snapshot.empty) {
    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data()
    }));
  }

  const allSnapshot = await getDocs(guestsRef);

  const allGuests = allSnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));

  return allGuests.filter((guest) => {
    const guestName = normalizeName(guest.nome);
    return guestName.includes(normalized) || normalized.includes(guestName);
  });
}

export async function confirmGuest(guestId, payload) {
  const guestDoc = doc(db, 'convidados', guestId);

  await updateDoc(guestDoc, {
    confirmado: payload.confirmado,
    acompanhantes: payload.acompanhantes,
    observacao: payload.observacao || '',
    atualizadoEm: serverTimestamp()
  });
}

export async function addGuest(payload) {
  return addDoc(collection(db, 'convidados'), {
    nome: payload.nome,
    nomeBusca: normalizeName(payload.nome),
    grupo: payload.grupo || '',
    confirmado: false,
    observacao: '',
    acompanhantes: payload.acompanhantes.map((nome) => ({
      nome,
      confirmado: false
    })),
    criadoEm: serverTimestamp(),
    atualizadoEm: serverTimestamp()
  });
}

export async function getGuests() {
  const guestsRef = collection(db, 'convidados');

  const q = query(
    guestsRef,
    orderBy('nomeBusca')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));
}

export async function saveGiftIntent(payload) {
  return addDoc(collection(db, 'presentes'), {
    presente: payload.presente,
    valor: payload.valor,
    nome: payload.nome || '',
    mensagem: payload.mensagem || '',
    criadoEm: serverTimestamp()
  });
}

export async function getGiftIntents() {
  const q = query(
    collection(db, 'presentes'),
    orderBy('criadoEm', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));
}