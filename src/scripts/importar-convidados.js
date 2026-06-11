import XLSX from 'xlsx';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYrnvgTnmwLTJ-mHempw9ifZ8G-Z78yT0",
  authDomain: "convidados-casamento-tg.firebaseapp.com",
  projectId: "convidados-casamento-tg",
  storageBucket: "convidados-casamento-tg.firebasestorage.app",
  messagingSenderId: "74543456832",
  appId: "1:74543456832:web:cb6263bf65766870e8f5a5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function normalizeName(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

async function importar() {

  const workbook = XLSX.readFile('convidados.xlsx');

  const sheet = workbook.Sheets[
    workbook.SheetNames[0]
  ];

  const dados = XLSX.utils.sheet_to_json(sheet);

  for (const linha of dados) {

    const acompanhantes = String(
      linha.Acompanhantes || ''
    )
      .split(';')
      .filter(Boolean)
      .map(nome => ({
        nome: nome.trim(),
        confirmado: false
      }));

    await addDoc(
      collection(db, 'convidados'),
      {
        nome: linha.Nome,
        nomeBusca: normalizeName(linha.Nome),
        grupo: linha.Grupo || '',
        confirmado: false,
        acompanhantes
      }
    );

    console.log(
      `Importado: ${linha.Nome}`
    );
  }

  console.log('Importação concluída!');
}

importar();