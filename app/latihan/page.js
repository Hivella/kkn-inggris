"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ==========================================
// BANK DATA KOSAKATA & GRAMMAR (MINIFIED)
// ==========================================
const kamusKosakata = [
  {en:"Cat",id:"Kucing",icon:"🐈"},{en:"Dog",id:"Anjing",icon:"🐕"},{en:"Bird",id:"Burung",icon:"🐦"},{en:"Fish",id:"Ikan",icon:"🐟"},{en:"Apple",id:"Apel",icon:"🍎"},{en:"Banana",id:"Pisang",icon:"🍌"},{en:"Carrot",id:"Wortel",icon:"🥕"},{en:"House",id:"Rumah",icon:"🏠"},{en:"Book",id:"Buku",icon:"📖"},{en:"Car",id:"Mobil",icon:"🚗"},{en:"Table",id:"Meja",icon:"🪑"},{en:"Shoes",id:"Sepatu",icon:"👟"},{en:"Man",id:"Pria",icon:"👨"},{en:"Woman",id:"Wanita",icon:"👩"},{en:"Boy",id:"Anak Laki-laki",icon:"👦"},{en:"Girl",id:"Anak Perempuan",icon:"👧"},{en:"Water",id:"Air",icon:"💧"},{en:"Fire",id:"Api",icon:"🔥"},{en:"Tree",id:"Pohon",icon:"🌳"},{en:"Flower",id:"Bunga",icon:"🌸"},{en:"Sun",id:"Matahari",icon:"☀️"},{en:"Moon",id:"Bulan",icon:"🌙"},{en:"Star",id:"Bintang",icon:"⭐"},{en:"Cloud",id:"Awan",icon:"☁️"},{en:"Pants",id:"Celana",icon:"👖"},{en:"Shirt",id:"Kemeja",icon:"👕"},{en:"Glasses",id:"Kacamata",icon:"👓"},{en:"Chicken",id:"Ayam",icon:"🐓"},{en:"Cow",id:"Sapi",icon:"🐄"},{en:"Horse",id:"Kuda",icon:"🐎"}
];

const kamusGrammar = [
  { q: "I have 1 ___.", opt: ["apple", "apples"], ans: "apple", note: "Benda tunggal (berjumlah 1) tidak perlu ditambah akhiran -s." },
  { q: "I have 2 ___.", opt: ["cat", "cats"], ans: "cats", note: "Benda yang lebih dari 1 (jamak) harus ditambah akhiran -s." },
  { q: "The ___ is walking.", opt: ["dog", "dogs"], ans: "dog", note: "Kata 'is' digunakan untuk subjek yang berjumlah tunggal (1)." },
  { q: "The ___ are swimming.", opt: ["duck", "ducks"], ans: "ducks", note: "Kata 'are' digunakan untuk subjek yang berjumlah jamak (lebih dari 1)." },
  { q: "I am eating ___ apple.", opt: ["a", "an"], ans: "an", note: "Gunakan 'an' karena kata 'apple' berawalan huruf vokal (a, i, u, e, o)." },
  { q: "I need 10 ___.", opt: ["book", "books"], ans: "books", note: "Ada 10 buku (lebih dari satu), jadi kata 'book' ditambah -s." },
  { q: "We are ___.", opt: ["boy", "boys"], ans: "boys", note: "'We' (kami) artinya lebih dari satu orang, jadi gunakan 'boys'." },
  { q: "She is ___ girl.", opt: ["a", "an"], ans: "a", note: "Gunakan 'a' karena kata 'girl' berawalan huruf konsonan." },
  { q: "I see 3 ___ sitting.", opt: ["man", "men"], ans: "men", note: "Bentuk jamak dari 'man' (pria) adalah 'men', bukan mans." },
  { q: "My father ___ a man.", opt: ["is", "are"], ans: "is", note: "'My father' adalah orang ketiga tunggal (dia), jadi gunakan 'is'." },
  { q: "The horses ___ running.", opt: ["is", "are"], ans: "are", note: "'Horses' memiliki akhiran -s yang berarti jamak, jadi gunakan 'are'." },
  { q: "I eat ___ orange.", opt: ["a", "an"], ans: "an", note: "Kata 'orange' berawalan bunyi vokal (o), jadi gunakan 'an'." },
  { q: "2 ___ running.", opt: ["woman", "women"], ans: "women", note: "Bentuk jamak dari 'woman' (wanita) adalah 'women'." },
  { q: "The dog ___ inside the house.", opt: ["is", "are"], ans: "is", note: "Hanya ada 1 anjing (the dog), jadi gunakan 'is'." },
  { q: "I want to buy a ___.", opt: ["toy", "toys"], ans: "toy", note: "Ada kata 'a' (sebuah), yang berarti bendanya hanya ada 1." }
];

const kamusPosisi = [
  { icon: "📦", q: "The ball is ___ the box.", opt: ["in", "on", "under"], ans: "in", note: "'in' digunakan untuk menyatakan posisi di dalam suatu ruang atau wadah." },
  { icon: "📕", q: "The book is ___ the table.", opt: ["on", "in", "above"], ans: "on", note: "'on' digunakan untuk menyatakan posisi di atas dan menempel pada permukaan." },
  { icon: "🏫", q: "I am ___ school.", opt: ["at", "on", "under"], ans: "at", note: "'at' digunakan untuk menunjukkan lokasi atau titik tempat yang spesifik." },
  { icon: "🦅", q: "The bird flies ___ the tree.", opt: ["above", "under", "in"], ans: "above", note: "'above' berarti di atas, namun posisinya melayang atau tidak menempel." },
  { icon: "🐈", q: "The cat sleeps ___ the chair.", opt: ["under", "in", "above"], ans: "under", note: "'under' berarti berada tepat di bawah suatu benda (tertutupi)." },
  { icon: "🖼️", q: "The picture is ___ the clock.", opt: ["below", "above", "on"], ans: "below", note: "'below' berarti posisinya lebih rendah dari benda lain." },
  { icon: "🏠", q: "The dog is ___ the house.", opt: ["inside", "outside", "above"], ans: "inside", note: "'inside' menekankan bahwa subjek benar-benar berada di bagian dalam ruangan." },
  { icon: "🪁", q: "We play ___.", opt: ["outside", "inside", "under"], ans: "outside", note: "'outside' berarti berada di area luar suatu bangunan." },
  { icon: "🍎", q: "The apple is ___ the table.", opt: ["on", "in", "under"], ans: "on", note: "'on' berarti di atas dan menempel pada permukaan meja." },
  { icon: "👟", q: "The shoes are ___ the bed.", opt: ["under", "above", "in"], ans: "under", note: "'under' berarti berada di bawah suatu benda." }
];

const kamusVerbTime = [
  { q: "Hari ini aku Eat. Kemarin aku ___.", opt: ["Eat", "Ate", "Eaten"], ans: "Ate", note: "Untuk kejadian yang sudah lewat (kemarin), kita menggunakan Verb 2 (V2), yaitu 'Ate'." },
  { q: "Aku selalu Drink susu. Tadi pagi aku ___ susu.", opt: ["Drink", "Drank", "Drunk"], ans: "Drank", note: "'Drank' adalah Verb 2 dari Drink, digunakan untuk masa lalu." },
  { q: "Aku Sleep nyenyak. Semalam aku ___ nyenyak.", opt: ["Sleep", "Slept", "Sleeping"], ans: "Slept", note: "Kejadian tadi malam (semalam) menggunakan Verb 2, yaitu 'Slept'." },
  { q: "Aku suka Run. Kemarin aku ___ sangat cepat.", opt: ["Run", "Ran", "Running"], ans: "Ran", note: "'Ran' adalah bentuk masa lalu (Verb 2) dari Run." },
  { q: "Aku sudah ___ apel itu.", opt: ["Eat", "Ate", "Eaten"], ans: "Eaten", note: "Setelah kata 'sudah' (have/has), kita menggunakan Kata Kerja bentuk ke-3 (V3), yaitu 'Eaten'." },
  { q: "Pakaian ini sudah ___ olehku.", opt: ["Wear", "Wore", "Worn"], ans: "Worn", note: "Kalimat pasif (dikenai tindakan / 'di...') selalu menggunakan Kata Kerja bentuk ke-3 (V3), yaitu 'Worn'." },
  { q: "Setiap pagi aku Walk. Kemarin aku ___ ke sekolah.", opt: ["Walk", "Walked", "Walking"], ans: "Walked", note: "'Walked' adalah bentuk lampau (Verb 2) dari Walk." },
  { q: "Lagu itu telah ___ dengan indah.", opt: ["Sing", "Sang", "Sung"], ans: "Sung", note: "Untuk kata 'telah' atau kalimat pasif, kita selalu memakai Verb 3 (V3), yaitu 'Sung'." },
  { q: "Gambar ini ___ oleh Stella.", opt: ["Draw", "Drew", "Drawn"], ans: "Drawn", note: "Kalimat pasif 'digambar' menggunakan Verb 3, yaitu 'Drawn'." },
  { q: "Aku bisa Throw bola. Kemarin aku ___ bola itu.", opt: ["Throw", "Threw", "Thrown"], ans: "Threw", note: "'Threw' adalah Verb 2, menceritakan kejadian melempar di masa lalu." },
  { q: "Aku sering Fly layang-layang. Kemarin aku ___ layang-layang.", opt: ["Fly", "Flew", "Flown"], ans: "Flew", note: "'Flew' adalah Verb 2 dari Fly." },
  { q: "Peti itu telah ___ ke sini.", opt: ["Bring", "Brought", "Bringing"], ans: "Brought", note: "Kalimat pasif menggunakan V3. Kebetulan V2 dan V3 dari Bring sama, yaitu 'Brought'." }
];

const kamusTrivia = [
  { q: "What does the crow drop into the pitcher?", opt: ["Apples", "Stones", "Leaves"], ans: "Stones", note: "Gagak menjatuhkan batu-batu (stones) ke dalam kendi agar airnya naik." },
  { q: "Who sleeps under a tree?", opt: ["The Turtle", "The Rabbit", "The Crow"], ans: "The Rabbit", note: "Kelinci (rabbit) tidur di bawah pohon karena merasa sudah menang jauh." },
  { q: "Who walks very slowly?", opt: ["The Turtle", "The Rabbit", "The Mouse Deer"], ans: "The Turtle", note: "Kura-kura (turtle) berjalan dengan sangat lambat (slowly)." },
  { q: "What grows into a golden cucumber?", opt: ["Magic salt", "Magic seed", "Magic mud"], ans: "Magic seed", note: "Biji ajaib (magic seed) tumbuh menjadi mentimun emas yang besar." },
  { q: "Who wants to eat Timun Mas?", opt: ["A scary giant", "A crocodile", "A tiger"], ans: "A scary giant", note: "Raksasa yang menakutkan (scary giant) ingin memakan Timun Mas." },
  { q: "Who is very hungry in the forest?", opt: ["The Rabbit", "The Mouse Deer", "The Crow"], ans: "The Mouse Deer", note: "Kancil (mouse deer) sangat lapar (hungry) saat berjalan di hutan." },
  { q: "What is the river full of?", opt: ["Crocodiles", "Fish", "Stones"], ans: "Crocodiles", note: "Sungai itu penuh dengan buaya-buaya (crocodiles) yang lapar." },
  { q: "What does Timun Mas throw to make a sea?", opt: ["Magic mud", "Magic seed", "Magic salt"], ans: "Magic salt", note: "Garam ajaib (magic salt) yang dilempar Timun Mas berubah menjadi lautan luas." },
  { q: "Who wins the race?", opt: ["The Rabbit", "The Turtle", "The Crow"], ans: "The Turtle", note: "Kura-kura (turtle) terus berjalan tanpa menyerah dan akhirnya menang!" },
  { q: "What does the mouse deer count?", opt: ["Apples", "Stones", "Crocodiles"], ans: "Crocodiles", note: "Kancil menipu buaya-buaya (crocodiles) dengan berpura-pura menghitung mereka." },
  { q: "What does Timun Mas throw to sink the giant?", opt: ["Magic mud", "Magic seed", "Magic salt"], ans: "Magic mud", note: "Lumpur ajaib (magic mud) membuat raksasa itu tenggelam ke dalam tanah." },
  { q: "Why does the mouse deer cross the river?", opt: ["To drink water", "To eat apples", "To sleep"], ans: "To eat apples", note: "Kancil menyeberang sungai untuk memakan apel-apel merah (apples) yang lezat." }
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function HalamanLatihan() {
  const [activeExercise, setActiveExercise] = useState("utama");
  const scrollContainerRef = useRef(null);

  // STATE: Tebak Gambar
  const [tgStatus, setTgStatus] = useState("idle");
  const [tgScore, setTgScore] = useState(0);
  const [tgQnIndex, setTgQnIndex] = useState(0);
  const [tgCurrentQ, setTgCurrentQ] = useState(null);
  const [tgOptions, setTgOptions] = useState([]);
  const [tgSelected, setTgSelected] = useState(null);

  // STATE: Dengarkan & Pilih
  const [listStatus, setListStatus] = useState("idle");
  const [listScore, setListScore] = useState(0);
  const [listQnIndex, setListQnIndex] = useState(0);
  const [listCurrentQ, setListCurrentQ] = useState(null);
  const [listOptions, setListOptions] = useState([]);
  const [listSelected, setListSelected] = useState(null);

  // STATE: Detektif Tata Bahasa (Grammar)
  const [gramStatus, setGramStatus] = useState("idle");
  const [gramScore, setGramScore] = useState(0);
  const [gramQnIndex, setGramQnIndex] = useState(0);
  const [gramQuestions, setGramQuestions] = useState([]);
  const [gramCurrentQ, setGramCurrentQ] = useState(null);
  const [gramSelected, setGramSelected] = useState(null);

  // STATE: Latihan Posisi & Letak
  const [posStatus, setPosStatus] = useState("idle");
  const [posScore, setPosScore] = useState(0);
  const [posQnIndex, setPosQnIndex] = useState(0);
  const [posQuestions, setPosQuestions] = useState([]);
  const [posCurrentQ, setPosCurrentQ] = useState(null);
  const [posSelected, setPosSelected] = useState(null);

  // STATE: Mesin Waktu (Verb V1 V2 V3)
  const [vtStatus, setVtStatus] = useState("idle");
  const [vtScore, setVtScore] = useState(0);
  const [vtQnIndex, setVtQnIndex] = useState(0);
  const [vtQuestions, setVtQuestions] = useState([]);
  const [vtCurrentQ, setVtCurrentQ] = useState(null);
  const [vtSelected, setVtSelected] = useState(null);

  // STATE: Kuis Dongeng (Story Trivia)
  const [trivStatus, setTrivStatus] = useState("idle");
  const [trivScore, setTrivScore] = useState(0);
  const [trivQnIndex, setTrivQnIndex] = useState(0);
  const [trivQuestions, setTrivQuestions] = useState([]);
  const [trivCurrentQ, setTrivCurrentQ] = useState(null);
  const [trivSelected, setTrivSelected] = useState(null);

  // Auto-scroll & State Reset
  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTo(0, 0);
    if (activeExercise !== "tebak_gambar") setTgStatus("idle");
    if (activeExercise !== "listening") setListStatus("idle");
    if (activeExercise !== "grammar") setGramStatus("idle");
    if (activeExercise !== "posisi") setPosStatus("idle");
    if (activeExercise !== "verb_time") setVtStatus("idle");
    if (activeExercise !== "cerita_trivia") setTrivStatus("idle");
  }, [activeExercise]);

  useEffect(() => {
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; utterance.rate = 0.8; 
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Google US English')));
      if (femaleVoice) utterance.voice = femaleVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleBack = () => {
    if (activeExercise !== "utama") setActiveExercise("utama");
  };

  const getHeaderTitle = () => {
    const titles = { utama:"Menu Latihan", tebak_gambar:"Tebak Gambar", listening:"Dengarkan & Pilih", grammar:"Detektif Tata Bahasa", posisi:"Latihan Letak & Posisi", verb_time:"Mesin Waktu Kata Kerja", cerita_trivia:"Kuis Dongeng" };
    return titles[activeExercise] || "Ayo Latihan!";
  };

  // === LOGIKA GAME 1: TEBAK GAMBAR ===
  const startTebakGambar = () => {
    setTgScore(0); setTgQnIndex(0); setTgStatus("playing"); generateTgQuestion();
  };
  const generateTgQuestion = () => {
    const shuffled = shuffleArray(kamusKosakata);
    setTgCurrentQ(shuffled[0]); setTgOptions(shuffleArray([shuffled[0], shuffled[1], shuffled[2]])); setTgSelected(null);
  };
  const handleTgGuess = (option) => {
    if (tgSelected) return; 
    setTgSelected(option);
    if (option.en === tgCurrentQ.en) setTgScore(p => p + 10);
    playAudio(tgCurrentQ.en); 
  };

  // === LOGIKA GAME 2: DENGARKAN & PILIH ===
  const startListeningGame = () => {
    setListScore(0); setListQnIndex(0); setListStatus("playing"); generateListQuestion();
  };
  const generateListQuestion = () => {
    const shuffled = shuffleArray(kamusKosakata);
    setListCurrentQ(shuffled[0]); setListOptions(shuffleArray([shuffled[0], shuffled[1], shuffled[2]])); setListSelected(null);
    setTimeout(() => playAudio(shuffled[0].en), 500);
  };
  const handleListGuess = (option) => {
    if (listSelected) return; 
    setListSelected(option);
    if (option.en === listCurrentQ.en) setListScore(p => p + 10);
    playAudio(listCurrentQ.en); 
  };

  // === LOGIKA GAME 3: DETEKTIF TATA BAHASA (GRAMMAR) ===
  const startGrammarGame = () => {
    setGramScore(0); setGramQnIndex(0); setGramStatus("playing");
    const selectedQuestions = shuffleArray(kamusGrammar).slice(0, 10); 
    setGramQuestions(selectedQuestions);
    setGramCurrentQ(selectedQuestions[0]);
    setGramSelected(null);
  };
  const handleGramGuess = (option) => {
    if (gramSelected) return; 
    setGramSelected(option);
    if (option === gramCurrentQ.ans) setGramScore(p => p + 10);
    const fullSentence = gramCurrentQ.q.replace("___", gramCurrentQ.ans);
    playAudio(fullSentence);
  };

  // === LOGIKA GAME 4: LATIHAN LETAK & POSISI ===
  const startPosisiGame = () => {
    setPosScore(0); setPosQnIndex(0); setPosStatus("playing");
    const selectedQuestions = shuffleArray(kamusPosisi).slice(0, 10); 
    setPosQuestions(selectedQuestions);
    setPosCurrentQ(selectedQuestions[0]);
    setPosSelected(null);
  };
  const handlePosGuess = (option) => {
    if (posSelected) return; 
    setPosSelected(option);
    if (option === posCurrentQ.ans) setPosScore(p => p + 10);
    const fullSentence = posCurrentQ.q.replace("___", posCurrentQ.ans);
    playAudio(fullSentence);
  };

  // === LOGIKA GAME 5: MESIN WAKTU KATA KERJA (VERBS) ===
  const startVerbTimeGame = () => {
    setVtScore(0); setVtQnIndex(0); setVtStatus("playing");
    const selectedQuestions = shuffleArray(kamusVerbTime).slice(0, 10); 
    setVtQuestions(selectedQuestions);
    setVtCurrentQ(selectedQuestions[0]);
    setVtSelected(null);
  };
  const handleVtGuess = (option) => {
    if (vtSelected) return; 
    setVtSelected(option);
    if (option === vtCurrentQ.ans) setVtScore(p => p + 10);
    const fullSentence = vtCurrentQ.q.replace("___", vtCurrentQ.ans);
    playAudio(fullSentence);
  };

  // === LOGIKA GAME 6: KUIS DONGENG (STORY TRIVIA) ===
  const startTriviaGame = () => {
    setTrivScore(0); setTrivQnIndex(0); setTrivStatus("playing");
    const selectedQuestions = shuffleArray(kamusTrivia).slice(0, 10); 
    setTrivQuestions(selectedQuestions);
    setTrivCurrentQ(selectedQuestions[0]);
    setTrivSelected(null);
  };
  const handleTrivGuess = (option) => {
    if (trivSelected) return; 
    setTrivSelected(option);
    if (option === trivCurrentQ.ans) setTrivScore(p => p + 10);
    playAudio(trivCurrentQ.ans);
  };

  const latihanMenus = [
    { id: "tebak_gambar", bg: "bg-[#3B82F6]", shadow: "shadow-[0_6px_0_#1D4ED8]", border: "border-blue-300", icon: "🃏", title: "Tebak Gambar", sub: "Kosakata Visual", tc: "text-blue-100" },
    { id: "listening", bg: "bg-[#A855F7]", shadow: "shadow-[0_6px_0_#7E22CE]", border: "border-purple-300", icon: "🎧", title: "Dengarkan & Pilih", sub: "Uji Pendengaran", tc: "text-purple-100" },
    { id: "grammar", bg: "bg-[#EC4899]", shadow: "shadow-[0_6px_0_#BE185D]", border: "border-pink-300", icon: "🍎", title: "Detektif Tata Bahasa", sub: "Satu atau Banyak?", tc: "text-pink-100" },
    { id: "posisi", bg: "bg-[#10B981]", shadow: "shadow-[0_6px_0_#047857]", border: "border-emerald-300", icon: "📍", title: "Latihan Letak", sub: "Prepositions", tc: "text-emerald-100" },
    { id: "verb_time", bg: "bg-[#F59E0B]", shadow: "shadow-[0_6px_0_#B45309]", border: "border-amber-300", icon: "⏳", title: "Mesin Waktu", sub: "V1, V2, V3", tc: "text-amber-100" },
    { id: "cerita_trivia", bg: "bg-[#0EA5E9]", shadow: "shadow-[0_6px_0_#0369A1]", border: "border-sky-300", icon: "🏆", title: "Kuis Dongeng", sub: "Story Trivia", tc: "text-sky-100" }
  ];

  return (
    <div className="relative mx-auto w-full max-w-md h-[100dvh] overflow-hidden font-sans bg-white">
      {activeExercise === "utama" && (
        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ backgroundImage: "url('/bg-forest.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}/>
      )}

      <div ref={scrollContainerRef} className="relative z-10 h-full w-full overflow-y-auto">
        <div className={`bg-white p-5 shadow-sm flex items-center justify-between sticky top-0 z-50 ${activeExercise !== 'utama' ? '' : 'rounded-b-3xl'}`}>
          <div className="flex items-center gap-4">
            {activeExercise === "utama" ? (
              <Link href="/" className="bg-orange-100 text-orange-600 p-2 rounded-xl font-bold active:scale-95 transition-transform">⬅️ Kembali</Link>
            ) : (
              <button onClick={handleBack} className="bg-orange-100 text-orange-600 p-2 rounded-xl font-bold active:scale-95 transition-transform">⬅️ Kembali</button>
            )}
            <h1 className="text-xl font-black text-gray-800 line-clamp-1">{getHeaderTitle()}</h1>
          </div>
        </div>

        <div className={activeExercise !== "utama" ? "pb-12" : "p-5 pb-12"}>
          
          {/* MENU UTAMA */}
          {activeExercise === "utama" && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl mb-2 border-2 border-white shadow-sm">
                <p className="text-center font-bold text-gray-600 text-[13px] leading-relaxed">Pilih mode permainan untuk menguji dan melatih ingatan bahasa Inggrismu! 🚀</p>
              </div>
              {latihanMenus.map((m) => (
                <button key={m.id} onClick={() => setActiveExercise(m.id)} className={`w-full ${m.bg} active:translate-y-1 text-white py-6 rounded-[1.5rem] ${m.shadow} transition-all flex items-center px-6 gap-5 border-2 ${m.border}`}>
                  <span className="text-5xl drop-shadow-md w-14 text-center">{m.icon}</span>
                  <div className="flex flex-col flex-1 text-left"><span className="font-black text-2xl leading-none">{m.title}</span><span className={`text-sm ${m.tc} font-bold mt-1 tracking-wide`}>{m.sub}</span></div>
                </button>
              ))}
            </div>
          )}

          {/* GAME 1: TEBAK GAMBAR */}
          {activeExercise === "tebak_gambar" && (
            <div className="flex flex-col w-full h-full pt-4">
              {tgStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <div className="text-[100px] mb-4 drop-shadow-lg animate-bounce">🃏</div>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Tebak Gambar</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Lihat gambarnya dan pilih kata bahasa Inggris yang paling tepat!</p>
                  <button onClick={startTebakGambar} className="bg-blue-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#1D4ED8] active:translate-y-2 transition-all hover:bg-blue-600">MULAI MAIN</button>
                </div>
              )}
              {tgStatus === "playing" && tgCurrentQ && (
                <div className="flex flex-col w-full px-4">
                  <div className="flex justify-between items-center mb-6 bg-gray-100 p-3 rounded-2xl">
                    <span className="font-black text-gray-500 text-lg">Soal {tgQnIndex + 1}/10</span><span className="font-black text-amber-500 text-xl bg-amber-100 px-4 py-1 rounded-xl">⭐ {tgScore}</span>
                  </div>
                  <div className="bg-blue-50 border-4 border-blue-200 rounded-[2rem] aspect-square flex items-center justify-center mb-8 shadow-sm">
                    <span className="text-[120px] drop-shadow-md">{tgCurrentQ.icon}</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {tgOptions.map((option, i) => {
                      let bs = "bg-white border-2 border-gray-200 text-gray-700 hover:bg-blue-50", ss = "shadow-[0_6px_0_#E5E7EB]", tc = "text-gray-800";
                      if (tgSelected) {
                        if (option.en === tgCurrentQ.en) { bs = "bg-green-500 border-2 border-green-600"; ss = "shadow-[0_6px_0_#15803D]"; tc = "text-white"; } 
                        else if (tgSelected === option && option.en !== tgCurrentQ.en) { bs = "bg-rose-500 border-2 border-rose-600"; ss = "shadow-[0_6px_0_#BE123C]"; tc = "text-white"; } 
                        else { bs = "bg-gray-100 border-2 border-gray-200 opacity-50"; ss = "shadow-[0_6px_0_#E5E7EB]"; tc = "text-gray-400"; }
                      }
                      return (
                        <button key={i} onClick={() => handleTgGuess(option)} disabled={tgSelected !== null} className={`w-full py-5 rounded-[1.5rem] ${bs} ${ss} font-black text-2xl transition-all ${!tgSelected ? 'active:translate-y-1' : ''}`}><span className={tc}>{option.en}</span></button>
                      );
                    })}
                  </div>
                  {/* Tombol Lanjut */}
                  {tgSelected && (
                    <button 
                      onClick={() => { (tgQnIndex + 1 >= 10) ? setTgStatus("finished") : (setTgQnIndex(p => p + 1), generateTgQuestion()); }} 
                      className="w-full mt-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-xl shadow-[0_6px_0_#1E3A8A] active:translate-y-1 transition-all"
                    >
                      {tgQnIndex + 1 >= 10 ? "Lihat Hasil 🏆" : "Lanjut ➡️"}
                    </button>
                  )}
                </div>
              )}
              {tgStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10 px-6">
                  <div className="text-[100px] mb-2 drop-shadow-lg">🏆</div><h2 className="text-4xl font-black text-amber-500 mb-2">SELESAI!</h2><p className="text-gray-500 font-bold mb-6">Skor akhir kamu adalah:</p>
                  <div className="bg-amber-100 border-4 border-amber-300 w-full py-8 rounded-[2rem] mb-10 flex flex-col items-center justify-center"><span className="text-7xl font-black text-amber-600 drop-shadow-sm">{tgScore}</span><span className="text-amber-500 font-bold mt-2">dari 100 poin</span></div>
                  <button onClick={startTebakGambar} className="bg-blue-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#1D4ED8] active:translate-y-1 transition-all mb-4 hover:bg-blue-600">🔄 MAIN LAGI</button>
                  <button onClick={handleBack} className="bg-gray-200 text-gray-600 font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#9CA3AF] active:translate-y-1 transition-all hover:bg-gray-300">KEMBALI KE MENU</button>
                </div>
              )}
            </div>
          )}

          {/* GAME 2: LISTENING */}
          {activeExercise === "listening" && (
            <div className="flex flex-col w-full h-full pt-4">
              {listStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <div className="text-[100px] mb-4 drop-shadow-lg animate-pulse">🎧</div>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Dengarkan Kata</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Dengarkan kata bahasa Inggrisnya, lalu pilih gambar yang paling tepat!</p>
                  <button onClick={startListeningGame} className="bg-purple-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#7E22CE] active:translate-y-2 transition-all hover:bg-purple-600">MULAI MAIN</button>
                </div>
              )}
              {listStatus === "playing" && listCurrentQ && (
                <div className="flex flex-col w-full px-4">
                  <div className="flex justify-between items-center mb-6 bg-gray-100 p-3 rounded-2xl">
                    <span className="font-black text-gray-500 text-lg">Soal {listQnIndex + 1}/10</span><span className="font-black text-amber-500 text-xl bg-amber-100 px-4 py-1 rounded-xl">⭐ {listScore}</span>
                  </div>
                  <div className="bg-purple-50 border-4 border-purple-200 rounded-[2rem] aspect-video flex flex-col items-center justify-center mb-8 shadow-sm px-6 text-center">
                    <button onClick={() => playAudio(listCurrentQ.en)} className="bg-purple-500 w-24 h-24 rounded-full flex items-center justify-center shadow-[0_6px_0_#7E22CE] active:translate-y-1 transition-all mb-4 hover:bg-purple-600"><span className="text-4xl text-white">🔊</span></button>
                    <span className="font-black text-xl text-purple-700">Dengarkan Ulang</span>
                    {listSelected && (<div className="mt-4 px-4 py-2 bg-white rounded-xl border-2 border-purple-100 animate-pulse"><span className="font-black text-2xl text-gray-800">"{listCurrentQ.en}"</span></div>)}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {listOptions.map((option, i) => {
                      let bs = "bg-white border-2 border-gray-200 hover:bg-purple-50", ss = "shadow-[0_4px_0_#E5E7EB]", scale = "";
                      if (listSelected) {
                        if (option.en === listCurrentQ.en) { bs = "bg-green-100 border-4 border-green-500"; ss = "shadow-[0_4px_0_#15803D]"; scale = "scale-105"; } 
                        else if (listSelected === option && option.en !== listCurrentQ.en) { bs = "bg-rose-100 border-4 border-rose-500"; ss = "shadow-[0_4px_0_#BE123C]"; } 
                        else { bs = "bg-gray-50 border-2 border-gray-200 opacity-50"; ss = "shadow-none translate-y-1"; }
                      }
                      return (
                        <button key={i} onClick={() => handleListGuess(option)} disabled={listSelected !== null} className={`w-full aspect-square rounded-[1.5rem] flex items-center justify-center ${bs} ${ss} ${scale} transition-all ${!listSelected ? 'active:translate-y-1' : ''}`}><span className="text-[50px] drop-shadow-sm">{option.icon}</span></button>
                      );
                    })}
                  </div>
                  {/* Tombol Lanjut */}
                  {listSelected && (
                    <button 
                      onClick={() => { (listQnIndex + 1 >= 10) ? setListStatus("finished") : (setListQnIndex(p => p + 1), generateListQuestion()); }} 
                      className="w-full mt-8 py-4 rounded-2xl bg-purple-600 text-white font-black text-xl shadow-[0_6px_0_#581C87] active:translate-y-1 transition-all"
                    >
                      {listQnIndex + 1 >= 10 ? "Lihat Hasil 🏆" : "Lanjut ➡️"}
                    </button>
                  )}
                </div>
              )}
              {listStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10 px-6">
                  <div className="text-[100px] mb-2 drop-shadow-lg">🏆</div><h2 className="text-4xl font-black text-amber-500 mb-2">HEBAT!</h2><p className="text-gray-500 font-bold mb-6">Skor pendengaranmu adalah:</p>
                  <div className="bg-amber-100 border-4 border-amber-300 w-full py-8 rounded-[2rem] mb-10 flex flex-col items-center justify-center"><span className="text-7xl font-black text-amber-600 drop-shadow-sm">{listScore}</span><span className="text-amber-500 font-bold mt-2">dari 100 poin</span></div>
                  <button onClick={startListeningGame} className="bg-purple-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#7E22CE] active:translate-y-1 transition-all mb-4 hover:bg-purple-600">🔄 MAIN LAGI</button>
                  <button onClick={handleBack} className="bg-gray-200 text-gray-600 font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#9CA3AF] active:translate-y-1 transition-all hover:bg-gray-300">KEMBALI KE MENU</button>
                </div>
              )}
            </div>
          )}

          {/* GAME 3: GRAMMAR DETECTIVE */}
          {activeExercise === "grammar" && (
            <div className="flex flex-col w-full h-full pt-4">
              {gramStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <div className="text-[100px] mb-4 drop-shadow-lg animate-bounce">🍎</div>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Detektif Tata Bahasa</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Pilih kata yang paling tepat untuk melengkapi bagian rumpang pada kalimat!</p>
                  <button onClick={startGrammarGame} className="bg-pink-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#BE185D] active:translate-y-2 transition-all hover:bg-pink-600">MULAI MAIN</button>
                </div>
              )}
              {gramStatus === "playing" && gramCurrentQ && (
                <div className="flex flex-col w-full px-4">
                  <div className="flex justify-between items-center mb-6 bg-gray-100 p-3 rounded-2xl">
                    <span className="font-black text-gray-500 text-lg">Soal {gramQnIndex + 1}/10</span><span className="font-black text-amber-500 text-xl bg-amber-100 px-4 py-1 rounded-xl">⭐ {gramScore}</span>
                  </div>
                  
                  {/* Kotak Kalimat Rumpang */}
                  <div className="bg-pink-50 border-4 border-pink-200 rounded-[2rem] p-6 flex flex-col items-center justify-center mb-6 shadow-sm min-h-[160px] text-center">
                    <p className="text-3xl font-black text-gray-800 leading-snug">
                      {gramCurrentQ.q.split("___")[0]}
                      <span className={`inline-block mx-2 border-b-4 ${gramSelected ? (gramSelected === gramCurrentQ.ans ? 'border-green-500 text-green-600' : 'border-rose-500 text-rose-600') : 'border-gray-400 text-transparent'} min-w-[70px]`}>
                        {gramSelected ? gramSelected : "???"}
                      </span>
                      {gramCurrentQ.q.split("___")[1]}
                    </p>
                  </div>

                  {/* Tombol Pilihan */}
                  <div className="grid grid-cols-2 gap-4">
                    {gramCurrentQ.opt.map((opt, i) => {
                      let bs = "bg-white border-2 border-gray-200 text-gray-700 hover:bg-pink-50", ss = "shadow-[0_6px_0_#E5E7EB]", tc = "text-gray-800";
                      if (gramSelected) {
                        if (opt === gramCurrentQ.ans) { bs = "bg-green-500 border-2 border-green-600"; ss = "shadow-[0_6px_0_#15803D]"; tc = "text-white"; } 
                        else if (gramSelected === opt && opt !== gramCurrentQ.ans) { bs = "bg-rose-500 border-2 border-rose-600"; ss = "shadow-[0_6px_0_#BE123C]"; tc = "text-white"; } 
                        else { bs = "bg-gray-100 border-2 border-gray-200 opacity-50"; ss = "shadow-[0_6px_0_#E5E7EB]"; tc = "text-gray-400"; }
                      }
                      return (
                        <button key={i} onClick={() => handleGramGuess(opt)} disabled={gramSelected !== null} className={`w-full py-5 rounded-[1.5rem] ${bs} ${ss} font-black text-2xl transition-all ${!gramSelected ? 'active:translate-y-1' : ''}`}><span className={tc}>{opt}</span></button>
                      );
                    })}
                  </div>

                  {/* Kotak Feedback (Note Grammar) */}
                  {gramSelected && (
                    <div className={`mt-6 p-4 rounded-xl border-2 ${gramSelected === gramCurrentQ.ans ? 'bg-green-100 border-green-300 text-green-800' : 'bg-rose-100 border-rose-300 text-rose-800'} transition-opacity`}>
                      <p className="text-sm font-black mb-1">{gramSelected === gramCurrentQ.ans ? '✅ TEPAT SEKALI!' : '❌ KURANG TEPAT!'}</p>
                      <p className="text-[13px] font-bold leading-relaxed">{gramCurrentQ.note}</p>
                    </div>
                  )}

                  {/* Tombol Lanjut */}
                  {gramSelected && (
                    <button 
                      onClick={() => { (gramQnIndex + 1 >= 10) ? setGramStatus("finished") : (setGramQnIndex(p => p + 1), setGramCurrentQ(gramQuestions[gramQnIndex + 1]), setGramSelected(null)); }} 
                      className="w-full mt-6 py-4 rounded-2xl bg-pink-600 text-white font-black text-xl shadow-[0_6px_0_#9D174D] active:translate-y-1 transition-all"
                    >
                      {gramQnIndex + 1 >= 10 ? "Lihat Hasil 🏆" : "Lanjut ➡️"}
                    </button>
                  )}
                </div>
              )}
              {gramStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10 px-6">
                  <div className="text-[100px] mb-2 drop-shadow-lg">🏆</div><h2 className="text-4xl font-black text-amber-500 mb-2">LUAR BIASA!</h2><p className="text-gray-500 font-bold mb-6">Skor Tata Bahasa kamu adalah:</p>
                  <div className="bg-amber-100 border-4 border-amber-300 w-full py-8 rounded-[2rem] mb-10 flex flex-col items-center justify-center"><span className="text-7xl font-black text-amber-600 drop-shadow-sm">{gramScore}</span><span className="text-amber-500 font-bold mt-2">dari 100 poin</span></div>
                  <button onClick={startGrammarGame} className="bg-pink-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#BE185D] active:translate-y-1 transition-all mb-4 hover:bg-pink-600">🔄 MAIN LAGI</button>
                  <button onClick={handleBack} className="bg-gray-200 text-gray-600 font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#9CA3AF] active:translate-y-1 transition-all hover:bg-gray-300">KEMBALI KE MENU</button>
                </div>
              )}
            </div>
          )}

          {/* GAME 4: POSISI & LETAK */}
          {activeExercise === "posisi" && (
            <div className="flex flex-col w-full h-full pt-4">
              {posStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <div className="text-[100px] mb-4 drop-shadow-lg animate-bounce">📍</div>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Latihan Letak & Posisi</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Perhatikan gambarnya dan pilih kata tunjuk letak (preposition) yang tepat!</p>
                  <button onClick={startPosisiGame} className="bg-emerald-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#047857] active:translate-y-2 transition-all hover:bg-emerald-600">MULAI MAIN</button>
                </div>
              )}
              {posStatus === "playing" && posCurrentQ && (
                <div className="flex flex-col w-full px-4">
                  <div className="flex justify-between items-center mb-6 bg-gray-100 p-3 rounded-2xl">
                    <span className="font-black text-gray-500 text-lg">Soal {posQnIndex + 1}/10</span><span className="font-black text-amber-500 text-xl bg-amber-100 px-4 py-1 rounded-xl">⭐ {posScore}</span>
                  </div>

                  {/* Icon Posisi */}
                  <div className="bg-emerald-50 border-4 border-emerald-200 rounded-3xl p-6 flex flex-col items-center justify-center mb-6 shadow-sm">
                    <span className="text-[80px] drop-shadow-md mb-4">{posCurrentQ.icon}</span>
                    <p className="text-2xl font-black text-gray-800 leading-snug text-center">
                      {posCurrentQ.q.split("___")[0]}
                      <span className={`inline-block mx-2 border-b-4 ${posSelected ? (posSelected === posCurrentQ.ans ? 'border-green-500 text-green-600' : 'border-rose-500 text-rose-600') : 'border-gray-400 text-transparent'} min-w-[70px]`}>
                        {posSelected ? posSelected : "???"}
                      </span>
                      {posCurrentQ.q.split("___")[1]}
                    </p>
                  </div>

                  {/* Tombol Pilihan */}
                  <div className="flex flex-col gap-3">
                    {posCurrentQ.opt.map((opt, i) => {
                      let bs = "bg-white border-2 border-gray-200 text-gray-700 hover:bg-emerald-50", ss = "shadow-[0_6px_0_#E5E7EB]", tc = "text-gray-800";
                      if (posSelected) {
                        if (opt === posCurrentQ.ans) { bs = "bg-green-500 border-2 border-green-600"; ss = "shadow-[0_6px_0_#15803D]"; tc = "text-white"; } 
                        else if (posSelected === opt && opt !== posCurrentQ.ans) { bs = "bg-rose-500 border-2 border-rose-600"; ss = "shadow-[0_6px_0_#BE123C]"; tc = "text-white"; } 
                        else { bs = "bg-gray-100 border-2 border-gray-200 opacity-50"; ss = "shadow-[0_6px_0_#E5E7EB]"; tc = "text-gray-400"; }
                      }
                      return (
                        <button key={i} onClick={() => handlePosGuess(opt)} disabled={posSelected !== null} className={`w-full py-4 rounded-2xl ${bs} ${ss} font-black text-xl transition-all ${!posSelected ? 'active:translate-y-1' : ''}`}><span className={tc}>{opt}</span></button>
                      );
                    })}
                  </div>

                  {/* Kotak Feedback (Note Posisi) */}
                  {posSelected && (
                    <div className={`mt-5 p-4 rounded-xl border-2 ${posSelected === posCurrentQ.ans ? 'bg-green-100 border-green-300 text-green-800' : 'bg-rose-100 border-rose-300 text-rose-800'} transition-opacity`}>
                      <p className="text-sm font-black mb-1">{posSelected === posCurrentQ.ans ? '✅ TEPAT SEKALI!' : '❌ KURANG TEPAT!'}</p>
                      <p className="text-[13px] font-bold leading-relaxed">{posCurrentQ.note}</p>
                    </div>
                  )}

                  {/* Tombol Lanjut */}
                  {posSelected && (
                    <button 
                      onClick={() => { (posQnIndex + 1 >= 10) ? setPosStatus("finished") : (setPosQnIndex(p => p + 1), setPosCurrentQ(posQuestions[posQnIndex + 1]), setPosSelected(null)); }} 
                      className="w-full mt-6 py-4 rounded-2xl bg-emerald-600 text-white font-black text-xl shadow-[0_6px_0_#065F46] active:translate-y-1 transition-all"
                    >
                      {posQnIndex + 1 >= 10 ? "Lihat Hasil 🏆" : "Lanjut ➡️"}
                    </button>
                  )}
                </div>
              )}
              {posStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10 px-6">
                  <div className="text-[100px] mb-2 drop-shadow-lg">🏆</div><h2 className="text-4xl font-black text-amber-500 mb-2">PINTAR!</h2><p className="text-gray-500 font-bold mb-6">Skor Posisi & Letak kamu adalah:</p>
                  <div className="bg-amber-100 border-4 border-amber-300 w-full py-8 rounded-[2rem] mb-10 flex flex-col items-center justify-center"><span className="text-7xl font-black text-amber-600 drop-shadow-sm">{posScore}</span><span className="text-amber-500 font-bold mt-2">dari 100 poin</span></div>
                  <button onClick={startPosisiGame} className="bg-emerald-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#047857] active:translate-y-1 transition-all mb-4 hover:bg-emerald-600">🔄 MAIN LAGI</button>
                  <button onClick={handleBack} className="bg-gray-200 text-gray-600 font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#9CA3AF] active:translate-y-1 transition-all hover:bg-gray-300">KEMBALI KE MENU</button>
                </div>
              )}
            </div>
          )}

          {/* GAME 5: MESIN WAKTU KATA KERJA (VERB TIME) */}
          {activeExercise === "verb_time" && (
            <div className="flex flex-col w-full h-full pt-4">
              {vtStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <div className="text-[100px] mb-4 drop-shadow-lg animate-bounce">⏳</div>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Mesin Waktu Kata Kerja</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Pilih bentuk masa lalu (Verb 2) atau kejadian yang telah berlalu (Verb 3) dengan tepat!</p>
                  <button onClick={startVerbTimeGame} className="bg-amber-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#B45309] active:translate-y-2 transition-all hover:bg-amber-600">MULAI MAIN</button>
                </div>
              )}
              {vtStatus === "playing" && vtCurrentQ && (
                <div className="flex flex-col w-full px-4">
                  <div className="flex justify-between items-center mb-6 bg-gray-100 p-3 rounded-2xl">
                    <span className="font-black text-gray-500 text-lg">Soal {vtQnIndex + 1}/10</span><span className="font-black text-amber-500 text-xl bg-amber-100 px-4 py-1 rounded-xl">⭐ {vtScore}</span>
                  </div>

                  {/* Kotak Kalimat Rumpang */}
                  <div className="bg-amber-50 border-4 border-amber-200 rounded-[2rem] p-6 flex flex-col items-center justify-center mb-6 shadow-sm min-h-[160px] text-center">
                    <p className="text-2xl font-black text-gray-800 leading-snug">
                      {vtCurrentQ.q.split("___")[0]}
                      <span className={`inline-block mx-2 border-b-4 ${vtSelected ? (vtSelected === vtCurrentQ.ans ? 'border-green-500 text-green-600' : 'border-rose-500 text-rose-600') : 'border-gray-400 text-transparent'} min-w-[70px]`}>
                        {vtSelected ? vtSelected : "???"}
                      </span>
                      {vtCurrentQ.q.split("___")[1]}
                    </p>
                  </div>

                  {/* Tombol Pilihan */}
                  <div className="flex flex-col gap-3">
                    {vtCurrentQ.opt.map((opt, i) => {
                      let bs = "bg-white border-2 border-gray-200 text-gray-700 hover:bg-amber-50", ss = "shadow-[0_6px_0_#E5E7EB]", tc = "text-gray-800";
                      if (vtSelected) {
                        if (opt === vtCurrentQ.ans) { bs = "bg-green-500 border-2 border-green-600"; ss = "shadow-[0_6px_0_#15803D]"; tc = "text-white"; } 
                        else if (vtSelected === opt && opt !== vtCurrentQ.ans) { bs = "bg-rose-500 border-2 border-rose-600"; ss = "shadow-[0_6px_0_#BE123C]"; tc = "text-white"; } 
                        else { bs = "bg-gray-100 border-2 border-gray-200 opacity-50"; ss = "shadow-[0_6px_0_#E5E7EB]"; tc = "text-gray-400"; }
                      }
                      return (
                        <button key={i} onClick={() => handleVtGuess(opt)} disabled={vtSelected !== null} className={`w-full py-4 rounded-2xl ${bs} ${ss} font-black text-xl transition-all ${!vtSelected ? 'active:translate-y-1' : ''}`}><span className={tc}>{opt}</span></button>
                      );
                    })}
                  </div>

                  {/* Kotak Feedback (Note Verb) */}
                  {vtSelected && (
                    <div className={`mt-5 p-4 rounded-xl border-2 ${vtSelected === vtCurrentQ.ans ? 'bg-green-100 border-green-300 text-green-800' : 'bg-rose-100 border-rose-300 text-rose-800'} transition-opacity`}>
                      <p className="text-sm font-black mb-1">{vtSelected === vtCurrentQ.ans ? '✅ TEPAT SEKALI!' : '❌ KURANG TEPAT!'}</p>
                      <p className="text-[13px] font-bold leading-relaxed">{vtCurrentQ.note}</p>
                    </div>
                  )}

                  {/* Tombol Lanjut */}
                  {vtSelected && (
                    <button 
                      onClick={() => { (vtQnIndex + 1 >= 10) ? setVtStatus("finished") : (setVtQnIndex(p => p + 1), setVtCurrentQ(vtQuestions[vtQnIndex + 1]), setVtSelected(null)); }} 
                      className="w-full mt-6 py-4 rounded-2xl bg-amber-600 text-white font-black text-xl shadow-[0_6px_0_#92400E] active:translate-y-1 transition-all"
                    >
                      {vtQnIndex + 1 >= 10 ? "Lihat Hasil 🏆" : "Lanjut ➡️"}
                    </button>
                  )}
                </div>
              )}
              {vtStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10 px-6">
                  <div className="text-[100px] mb-2 drop-shadow-lg">🏆</div><h2 className="text-4xl font-black text-amber-500 mb-2">HEBAT!</h2><p className="text-gray-500 font-bold mb-6">Skor Mesin Waktu kamu adalah:</p>
                  <div className="bg-amber-100 border-4 border-amber-300 w-full py-8 rounded-[2rem] mb-10 flex flex-col items-center justify-center"><span className="text-7xl font-black text-amber-600 drop-shadow-sm">{vtScore}</span><span className="text-amber-500 font-bold mt-2">dari 100 poin</span></div>
                  <button onClick={startVerbTimeGame} className="bg-amber-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#B45309] active:translate-y-1 transition-all mb-4 hover:bg-amber-600">🔄 MAIN LAGI</button>
                  <button onClick={handleBack} className="bg-gray-200 text-gray-600 font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#9CA3AF] active:translate-y-1 transition-all hover:bg-gray-300">KEMBALI KE MENU</button>
                </div>
              )}
            </div>
          )}

          {/* GAME 6: KUIS DONGENG (STORY TRIVIA) */}
          {activeExercise === "cerita_trivia" && (
            <div className="flex flex-col w-full h-full pt-4">
              {trivStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <div className="text-[100px] mb-4 drop-shadow-lg animate-pulse">📚</div>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Kuis Dongeng</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Uji ingatanmu tentang kisah Gagak, Kelinci, Timun Mas, dan Kancil!</p>
                  <button onClick={startTriviaGame} className="bg-sky-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#0369A1] active:translate-y-2 transition-all hover:bg-sky-600">MULAI KUIS</button>
                </div>
              )}
              {trivStatus === "playing" && trivCurrentQ && (
                <div className="flex flex-col w-full px-4">
                  <div className="flex justify-between items-center mb-6 bg-gray-100 p-3 rounded-2xl">
                    <span className="font-black text-gray-500 text-lg">Soal {trivQnIndex + 1}/10</span><span className="font-black text-amber-500 text-xl bg-amber-100 px-4 py-1 rounded-xl">⭐ {trivScore}</span>
                  </div>

                  {/* Kotak Pertanyaan */}
                  <div className="bg-sky-50 border-4 border-sky-200 rounded-[2rem] p-6 flex flex-col items-center justify-center mb-6 shadow-sm min-h-[160px] text-center">
                    <p className="text-2xl font-black text-gray-800 leading-snug">
                      {trivCurrentQ.q}
                    </p>
                  </div>

                  {/* Tombol Pilihan */}
                  <div className="flex flex-col gap-3">
                    {trivCurrentQ.opt.map((opt, i) => {
                      let bs = "bg-white border-2 border-gray-200 text-gray-700 hover:bg-sky-50", ss = "shadow-[0_6px_0_#E5E7EB]", tc = "text-gray-800";
                      if (trivSelected) {
                        if (opt === trivCurrentQ.ans) { bs = "bg-green-500 border-2 border-green-600"; ss = "shadow-[0_6px_0_#15803D]"; tc = "text-white"; } 
                        else if (trivSelected === opt && opt !== trivCurrentQ.ans) { bs = "bg-rose-500 border-2 border-rose-600"; ss = "shadow-[0_6px_0_#BE123C]"; tc = "text-white"; } 
                        else { bs = "bg-gray-100 border-2 border-gray-200 opacity-50"; ss = "shadow-[0_6px_0_#E5E7EB]"; tc = "text-gray-400"; }
                      }
                      return (
                        <button key={i} onClick={() => handleTrivGuess(opt)} disabled={trivSelected !== null} className={`w-full py-4 px-4 rounded-2xl ${bs} ${ss} font-black text-[18px] transition-all ${!trivSelected ? 'active:translate-y-1' : ''}`}><span className={tc}>{opt}</span></button>
                      );
                    })}
                  </div>

                  {/* Kotak Feedback (Story Note) */}
                  {trivSelected && (
                    <div className={`mt-5 p-4 rounded-xl border-2 ${trivSelected === trivCurrentQ.ans ? 'bg-green-100 border-green-300 text-green-800' : 'bg-rose-100 border-rose-300 text-rose-800'} transition-opacity`}>
                      <p className="text-sm font-black mb-1">{trivSelected === trivCurrentQ.ans ? '✅ BENAR SEKALI!' : '❌ YAH, SALAH!'}</p>
                      <p className="text-[13px] font-bold leading-relaxed">{trivCurrentQ.note}</p>
                    </div>
                  )}

                  {/* Tombol Lanjut */}
                  {trivSelected && (
                    <button 
                      onClick={() => { (trivQnIndex + 1 >= 10) ? setTrivStatus("finished") : (setTrivQnIndex(p => p + 1), setTrivCurrentQ(trivQuestions[trivQnIndex + 1]), setTrivSelected(null)); }} 
                      className="w-full mt-6 py-4 rounded-2xl bg-sky-600 text-white font-black text-xl shadow-[0_6px_0_#0369A1] active:translate-y-1 transition-all"
                    >
                      {trivQnIndex + 1 >= 10 ? "Lihat Hasil 🏆" : "Lanjut ➡️"}
                    </button>
                  )}
                </div>
              )}
              {trivStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10 px-6">
                  <div className="text-[100px] mb-2 drop-shadow-lg">🏆</div><h2 className="text-4xl font-black text-amber-500 mb-2">SEMPURNA!</h2><p className="text-gray-500 font-bold mb-6">Skor Kuis Dongeng kamu adalah:</p>
                  <div className="bg-amber-100 border-4 border-amber-300 w-full py-8 rounded-[2rem] mb-10 flex flex-col items-center justify-center"><span className="text-7xl font-black text-amber-600 drop-shadow-sm">{trivScore}</span><span className="text-amber-500 font-bold mt-2">dari 100 poin</span></div>
                  <button onClick={startTriviaGame} className="bg-sky-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#0369A1] active:translate-y-1 transition-all mb-4 hover:bg-sky-600">🔄 MAIN LAGI</button>
                  <button onClick={handleBack} className="bg-gray-200 text-gray-600 font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#9CA3AF] active:translate-y-1 transition-all hover:bg-gray-300">KEMBALI KE MENU</button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}