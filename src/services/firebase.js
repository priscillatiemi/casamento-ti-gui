import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

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
export const auth = getAuth(app);

export function loginAdmin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutAdmin() {
  return signOut(auth);
}

export function listenAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function normalizeName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function getSearchNames(name) {
  const normalized = normalizeName(name);

  if (!normalized) {
    return [];
  }

  const firstName = normalized.split(' ')[0];

  return [
    normalized,
    firstName
  ];
}

export async function searchGuestByName(name) {
  const normalized = normalizeName(name);

  const guestsRef = collection(db, 'convidados');

  const guestQuery = query(
    guestsRef,
    where('nomesBusca', 'array-contains', normalized)
  );

  const snapshot = await getDocs(guestQuery);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));
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
  const allNames = [
    payload.nome,
    ...payload.acompanhantes
  ];

  const nomesBusca = [
    ...new Set(
      allNames.flatMap((nome) => getSearchNames(nome))
    )
  ];

  return addDoc(collection(db, 'convidados'), {
    nome: payload.nome,

    nomeBusca: normalizeName(payload.nome),

    nomesBusca,

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