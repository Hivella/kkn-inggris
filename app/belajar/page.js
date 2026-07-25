"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function HalamanBelajar() {
  const [activeMenu, setActiveMenu] = useState("utama");

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; 
      utterance.rate = 0.8; 
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Maaf, browsermu tidak mendukung fitur suara.");
    }
  };

  // Logika Tombol Kembali yang Pintar (Bersarang)
  const handleBack = () => {
    if (["alfabet", "angka", "orang", "hewan", "buah", "sayur", "benda", "aktivitas"].includes(activeMenu)) {
      setActiveMenu("kosakata");
    } else if (["conv_perkenalan", "conv_kabar", "conv_sehari"].includes(activeMenu)) {
      setActiveMenu("percakapan");
    } else if (activeMenu === "kosakata" || activeMenu === "percakapan") {
      setActiveMenu("utama");
    }
  };

  // Mengubah Judul Header Otomatis
  const getHeaderTitle = () => {
    switch(activeMenu) {
      case "utama": return "Kategori Belajar";
      case "kosakata": return "Menu Kosakata";
      case "percakapan": return "Menu Percakapan";
      case "alfabet": return "Belajar Alfabet";
      case "orang": return "Nama Orang";
      case "hewan": return "Nama Hewan";
      case "angka": return "Belajar Angka";
      case "buah": return "Nama Buah";
      case "sayur": return "Nama Sayuran";
      case "benda": return "Hal di Sekitar";
      case "aktivitas": return "Aktivitas Harian";
      case "conv_perkenalan": return "Cara Berkenalan";
      case "conv_kabar": return "Tanya Kabar";
      case "conv_sehari": return "Sehari-Hari";
      default: return "Ayo Belajar!";
    }
  };

  // ==========================================
  // 1. DATA ALFABET
  // ==========================================
  const alphabets = [
    { letter: "A", read: "ei" }, { letter: "B", read: "bi" }, { letter: "C", read: "si" },
    { letter: "D", read: "di" }, { letter: "E", read: "i" }, { letter: "F", read: "ef" },
    { letter: "G", read: "ji" }, { letter: "H", read: "eic" }, { letter: "I", read: "ai" },
    { letter: "J", read: "jei" }, { letter: "K", read: "kei" }, { letter: "L", read: "el" },
    { letter: "M", read: "em" }, { letter: "N", read: "en" }, { letter: "O", read: "ou" },
    { letter: "P", read: "pi" }, { letter: "Q", read: "kyu" }, { letter: "R", read: "ar" },
    { letter: "S", read: "es" }, { letter: "T", read: "ti" }, { letter: "U", read: "yu" },
    { letter: "V", read: "vi" }, { letter: "W", read: "dabelyu" }, { letter: "X", read: "eks" },
    { letter: "Y", read: "wai" }, { letter: "Z", read: "zi" }
  ];

  // ==========================================
  // 2. DATA ORANG & KELUARGA (METODE VISUAL)
  // ==========================================
  const orangUmum = [
    { id: "Pria (Satu)", en: "Man", read: "men", icon: "👨" },
    { id: "Pria (Lebih dari 1)", en: "Men", read: "men", icon: "👨👨" },
    { id: "Wanita (Satu)", en: "Woman", read: "wu-men", icon: "👩" },
    { id: "Wanita (Lebih dari 1)", en: "Women", read: "wi-min", icon: "👩👩👩" },
    { id: "Anak Laki-laki (Satu)", en: "Boy", read: "boi", icon: "👦" },
    { id: "Anak Laki-laki (Banyak)", en: "Boys", read: "bois", icon: "👦👦" },
    { id: "Anak Perempuan (Satu)", en: "Girl", read: "gerl", icon: "👧" },
    { id: "Anak Perempuan (Banyak)", en: "Girls", read: "gerls", icon: "👧👧👧" },
  ];

  const orangKeluarga = [
    { id: "Ibu (Mom)", en: "Mother", read: "ma-dher", icon: "👩" },
    { id: "Ayah (Dad)", en: "Father", read: "fa-dher", icon: "👨" },
    { id: "Orang Tua", en: "Parents", read: "pe-rents", icon: "👨‍👩‍👧‍👦" },
    { id: "Kakek", en: "Grandfather", read: "grend-fa-dher", icon: "👴" },
    { id: "Nenek", en: "Grandmother", read: "grend-ma-dher", icon: "👵" },
    { id: "Saudara Kandung", en: "Sibling", read: "sib-ling", icon: "🧒👧" },
    { id: "Saudara Laki-laki", en: "Brother", read: "bra-dher", icon: "👦" },
    { id: "Saudara Perempuan", en: "Sister", read: "sis-ter", icon: "👧" },
  ];

  // ==========================================
  // 3. DATA HEWAN (Berdasarkan Habitat)
  // ==========================================
  const animalHouse = [
    { id: "Kucing", en: "Cat", read: "ket", icon: "🐈" }, { id: "Anjing", en: "Dog", read: "dog", icon: "🐕" },
    { id: "Tikus", en: "Mouse", read: "maus", icon: "🐁" }, { id: "Cicak / Kadal", en: "Lizard", read: "li-zerd", icon: "🦎" },
    { id: "Kecoa", en: "Cockroach", read: "kok-rouc", icon: "🪳" }, { id: "Lalat", en: "Fly", read: "flai", icon: "🪰" },
    { id: "Nyamuk", en: "Mosquito", read: "mes-ki-tou", icon: "🦟" }, { id: "Semut", en: "Ant", read: "ent", icon: "🐜" },
    { id: "Laba-laba", en: "Spider", read: "spai-der", icon: "🕷️" },
  ];
  const animalFarm = [
    { id: "Ayam", en: "Chicken", read: "ci-ken", icon: "🐓" }, { id: "Bebek", en: "Duck", read: "dak", icon: "🦆" },
    { id: "Sapi", en: "Cow", read: "kau", icon: "🐄" }, { id: "Kambing", en: "Goat", read: "gout", icon: "🐐" },
    { id: "Kuda", en: "Horse", read: "hors", icon: "🐎" },
  ];
  const animalAir = [
    { id: "Burung", en: "Bird", read: "berd", icon: "🐦" }, { id: "Kupu-kupu", en: "Butterfly", read: "ba-ter-flai", icon: "🦋" },
    { id: "Lebah", en: "Bee", read: "bi", icon: "🐝" },
  ];
  const animalWater = [
    { id: "Ikan", en: "Fish", read: "fis", icon: "🐟" }, { id: "Katak", en: "Frog", read: "frog", icon: "🐸" },
    { id: "Kura-kura", en: "Turtle", read: "ter-tel", icon: "🐢" },
  ];
  const animalLand = [
    { id: "Belalang", en: "Grasshopper", read: "gres-ho-per", icon: "🦗" }, { id: "Cacing", en: "Worm", read: "werm", icon: "🪱" },
    { id: "Ular", en: "Snake", read: "snek", icon: "🐍" },
  ];

  // ==========================================
  // 4. DATA ANGKA
  // ==========================================
  const numbers1to10 = [
    { num: "1", en: "One", read: "wan", id: "Satu" }, { num: "2", en: "Two", read: "tu", id: "Dua" },
    { num: "3", en: "Three", read: "thri", id: "Tiga" }, { num: "4", en: "Four", read: "for", id: "Empat" },
    { num: "5", en: "Five", read: "faiv", id: "Lima" }, { num: "6", en: "Six", read: "siks", id: "Enam" },
    { num: "7", en: "Seven", read: "se-ven", id: "Tujuh" }, { num: "8", en: "Eight", read: "eit", id: "Delapan" },
    { num: "9", en: "Nine", read: "nain", id: "Sembilan" }, { num: "10", en: "Ten", read: "ten", id: "Sepuluh" }
  ];
  const numbersTens = [
    { num: "20", en: "Twenty", read: "twen-ti", id: "Dua Puluh" }, { num: "50", en: "Fifty", read: "fif-ti", id: "Lima Puluh" },
    { num: "100", en: "One Hundred", read: "wan han-dred", id: "Seratus" }, { num: "1.000", en: "One Thousand", read: "wan tau-zen", id: "Seribu" }
  ];

  // ==========================================
  // 5. DATA AKTIVITAS
  // ==========================================
  const activityMovements = [
    { id: "Berjalan", en: "Walk", read: "wok", icon: "🚶" }, { id: "Berlari", en: "Run", read: "ran", icon: "🏃" },
    { id: "Lompat", en: "Jump", read: "jamp", icon: "🦘" }, { id: "Memanjat", en: "Climb", read: "klaim", icon: "🧗" },
    { id: "Melempar", en: "Throw", read: "throu", icon: "⚾" }, { id: "Menendang", en: "Kick", read: "kik", icon: "⚽" },
    { id: "Memukul", en: "Hit", read: "hit", icon: "🥊" }, { id: "Terbang", en: "Fly", read: "flai", icon: "🦅" },
  ];
  const activityHome = [
    { id: "Makan", en: "Eat", read: "it", icon: "🍽️" }, { id: "Minum", en: "Drink", read: "dringk", icon: "🥤" },
    { id: "Memasak", en: "Cook", read: "kuk", icon: "🍳" }, { id: "Tidur", en: "Sleep", read: "slip", icon: "😴" },
    { id: "Duduk", en: "Sit", read: "sit", icon: "🪑" }, { id: "Memakai Pakaian", en: "Wear", read: "wer", icon: "👕" },
    { id: "Membuka", en: "Open", read: "o-pen", icon: "🚪" }, { id: "Menutup", en: "Close", read: "klouz", icon: "🚪" },
    { id: "Menyalakan", en: "Turn On", read: "tern on", icon: "💡" }, { id: "Mematikan", en: "Turn Off", read: "tern of", icon: "🔌" },
    { id: "Buang Air Kecil (Pipis)", en: "Pee", read: "pi", icon: "🚽" }, { id: "Buang Air Besar (Eek)", en: "Poop", read: "pup", icon: "💩" },
    { id: "Mandi", en: "Take a bath", read: "teik e bath", icon: "🛁" }, { id: "Menggosok Gigi", en: "Brush teeth", read: "bras tith", icon: "🪥" },
    { id: "Keramas", en: "Wash hair", read: "wos her", icon: "🧴" },
  ];
  const activityRural = [
    { id: "Menanam", en: "Plant", read: "plent", icon: "🌱" }, { id: "Menyiram", en: "Water", read: "wo-ter", icon: "🚿" },
    { id: "Memanen", en: "Harvest", read: "har-vest", icon: "🌾" }, { id: "Memancing", en: "Fish", read: "fis", icon: "🎣" },
    { id: "Mengendarai", en: "Ride", read: "raid", icon: "🚲" },
  ];
  const activitySensesStudy = [
    { id: "Melihat", en: "See", read: "si", icon: "👀" }, { id: "Mendengar", en: "Hear", read: "hir", icon: "👂" },
    { id: "Mendengarkan", en: "Listen", read: "lis-sen", icon: "🎧" }, { id: "Menonton", en: "Watch", read: "woc", icon: "📺" },
    { id: "Membaca", en: "Read", read: "rid", icon: "📖" }, { id: "Menggambar", en: "Draw", read: "dro", icon: "🎨" },
    { id: "Belajar", en: "Study", read: "sta-di", icon: "📚" }, { id: "Bernyanyi", en: "Sing", read: "sing", icon: "🎤" },
    { id: "Bermain", en: "Play", read: "plei", icon: "🪁" },
  ];
  const activityEffort = [
    { id: "Membawa", en: "Bring", read: "bring", icon: "📦" }, { id: "Menggendong", en: "Carry", read: "ke-ri", icon: "🎒" },
    { id: "Mendorong", en: "Push", read: "pus", icon: "🛒" }, { id: "Menarik", en: "Pull", read: "pul", icon: "🪢" },
  ];

  // ==========================================
  // 6. DATA BUAH & SAYUR
  // ==========================================
  const buahBuahan = [
    { id: "Apel", en: "Apple", read: "e-pel", icon: "🍎" }, { id: "Pisang", en: "Banana", read: "ba-na-na", icon: "🍌" },
    { id: "Jeruk", en: "Orange", read: "o-rinj", icon: "🍊" }, { id: "Semangka", en: "Watermelon", read: "wo-ter-me-len", icon: "🍉" },
    { id: "Mangga", en: "Mango", read: "meng-gou", icon: "🥭" }, { id: "Stroberi", en: "Strawberry", read: "stro-be-ri", icon: "🍓" },
    { id: "Nanas", en: "Pineapple", read: "pain-e-pel", icon: "🍍" }, { id: "Pepaya", en: "Papaya", read: "pa-pai-ya", icon: "🍈" },
  ];
  const sayurSayuran = [
    { id: "Wortel", en: "Carrot", read: "ke-ret", icon: "🥕" }, { id: "Kentang", en: "Potato", read: "po-tei-tou", icon: "🥔" },
    { id: "Jagung", en: "Corn", read: "korn", icon: "🌽" }, { id: "Bayam", en: "Spinach", read: "spi-nic", icon: "🥬" },
    { id: "Tomat", en: "Tomato", read: "to-ma-tou", icon: "🍅" }, { id: "Cabai", en: "Chili", read: "ci-li", icon: "🌶️" },
    { id: "Brokoli", en: "Broccoli", read: "bro-ko-li", icon: "🥦" }, { id: "Bawang", en: "Onion", read: "o-ni-yen", icon: "🧅" },
  ];

  // ==========================================
  // 7. DATA BENDA (Hal di Sekitar)
  // ==========================================
  const bendaRumahRuangan = [
    { id: "Rumah", en: "House", read: "haus", icon: "🏠" }, { id: "Kamar Tidur", en: "Bedroom", read: "bed-rum", icon: "🛏️" },
    { id: "Kamar Mandi", en: "Bathroom", read: "bath-rum", icon: "🛁" }, { id: "Ruang Keluarga", en: "Living Room", read: "li-ving rum", icon: "🛋️" },
    { id: "Dapur", en: "Kitchen", read: "ki-cen", icon: "🍳" }, { id: "Halaman Rumah", en: "Yard", read: "yard", icon: "🏡" },
    { id: "Pintu", en: "Door", read: "dor", icon: "🚪" }, { id: "Jendela", en: "Window", read: "win-dou", icon: "🪟" },
    { id: "Dinding", en: "Wall", read: "wol", icon: "🧱" }, { id: "Pagar", en: "Fence", read: "fens", icon: "⛩️" },
  ];
  const bendaPerabotan = [
    { id: "Meja", en: "Table", read: "tei-bel", icon: "🪑" }, { id: "Kursi", en: "Chair", read: "cer", icon: "🪑" },
    { id: "Kasur", en: "Bed", read: "bed", icon: "🛌" }, { id: "Bantal", en: "Pillow", read: "pi-lou", icon: "☁️" },
    { id: "Selimut", en: "Blanket", read: "bleng-ket", icon: "🛏️" }, { id: "Lampu", en: "Lamp", read: "lemp", icon: "💡" },
    { id: "Sapu", en: "Broom", read: "brum", icon: "🧹" }, { id: "Tempat Sampah", en: "Trash Can", read: "tres ken", icon: "🗑️" },
  ];
  const bendaAlatMakan = [
    { id: "Piring", en: "Plate", read: "pleit", icon: "🍽️" }, { id: "Sendok", en: "Spoon", read: "spun", icon: "🥄" },
    { id: "Garpu", en: "Fork", read: "fork", icon: "🍴" }, { id: "Gelas", en: "Glass", read: "gles", icon: "🥛" },
    { id: "Botol Air", en: "Water Bottle", read: "wo-ter bo-tel", icon: "🍼" }, { id: "Cangkir", en: "Cup", read: "kap", icon: "☕" },
  ];
  const bendaMakanan = [
    { id: "Makanan", en: "Food", read: "fud", icon: "🍱" }, { id: "Minuman", en: "Drink", read: "dringk", icon: "🍹" },
    { id: "Nasi", en: "Rice", read: "rais", icon: "🍚" }, { id: "Nasi Goreng", en: "Fried Rice", read: "fraid rais", icon: "🍛" },
    { id: "Es Krim", en: "Ice Cream", read: "ais krim", icon: "🍦" },
  ];
  const bendaPakaian = [
    { id: "Pakaian", en: "Clothes", read: "klouts", icon: "👕" }, { id: "Kemeja", en: "Shirt", read: "syert", icon: "👔" },
    { id: "Celana", en: "Pants", read: "pents", icon: "👖" }, { id: "Sepatu", en: "Shoes", read: "syus", icon: "👟" },
    { id: "Sandal", en: "Sandals", read: "sen-dels", icon: "🩴" }, { id: "Kaos Kaki", en: "Socks", read: "soks", icon: "🧦" },
    { id: "Kacamata", en: "Glasses", read: "gle-ses", icon: "👓" }, { id: "Jam Tangan", en: "Watch", read: "woc", icon: "⌚" },
  ];
  const bendaKendaraanElektronik = [
    { id: "Sepeda", en: "Bicycle", read: "bai-si-kel", icon: "🚲" }, { id: "Sepeda Motor", en: "Motorcycle", read: "mo-tor-sai-kel", icon: "🏍️" },
    { id: "Mobil", en: "Car", read: "kar", icon: "🚗" }, { id: "Telepon Genggam", en: "Mobile Phone", read: "mo-bail foun", icon: "📱" },
    { id: "Komputer", en: "Computer", read: "kom-pyu-ter", icon: "💻" },
  ];
  const bendaSekolah = [
    { id: "Buku", en: "Book", read: "buk", icon: "📖" }, { id: "Kertas", en: "Paper", read: "pei-per", icon: "📄" },
    { id: "Pensil", en: "Pencil", read: "pen-sil", icon: "✏️" }, { id: "Pulpen", en: "Pen", read: "pen", icon: "🖊️" },
    { id: "Penghapus", en: "Eraser", read: "i-rei-ser", icon: "🧽" }, { id: "Papan Tulis", en: "Whiteboard", read: "wait-bord", icon: "📝" },
  ];
  const bendaAlam = [
    { id: "Air", en: "Water", read: "wo-ter", icon: "💧" }, { id: "Api", en: "Fire", read: "fai-yer", icon: "🔥" },
    { id: "Pohon", en: "Tree", read: "tri", icon: "🌳" }, { id: "Bunga", en: "Flower", read: "flau-wer", icon: "🌸" },
    { id: "Daun", en: "Leaf", read: "lif", icon: "🍃" }, { id: "Rumput", en: "Grass", read: "gres", icon: "🌿" },
    { id: "Batu / Kerikil", en: "Stone", read: "stoun", icon: "🪨" }, { id: "Pasir", en: "Sand", read: "send", icon: "🏜️" },
    { id: "Tanaman Padi", en: "Paddy", read: "pe-di", icon: "🌾" }, { id: "Pohon Bambu", en: "Bamboo Tree", read: "bem-bu tri", icon: "🎋" },
  ];

  // ==========================================
  // 8. DATA PERCAKAPAN
  // ==========================================
  const convPerkenalan = [
    { 
      en: "Hello!", id: "Halo!", read: "he-lou!", 
      breakdown: [{ word: "Hello", meaning: "Halo" }] 
    },
    { 
      en: "Good morning!", id: "Selamat pagi!", read: "gud mor-ning!", 
      breakdown: [{ word: "Good", meaning: "Selamat / Bagus" }, { word: "Morning", meaning: "Pagi" }] 
    },
    { 
      en: "What is your name?", id: "Siapa namamu?", read: "wot is yor neim?", 
      breakdown: [{ word: "What", meaning: "Apa / Siapa" }, { word: "Is", meaning: "Adalah (Kata bantu)" }, { word: "Your", meaning: "Milikmu" }, { word: "Name", meaning: "Nama" }] 
    },
    { 
      en: "My name is Stella.", id: "Namaku Stella.", read: "mai neim is ste-la.", 
      breakdown: [{ word: "My", meaning: "Milikku" }, { word: "Name", meaning: "Nama" }, { word: "Is", meaning: "Adalah" }, { word: "Stella", meaning: "Stella" }] 
    },
    { 
      en: "Nice to meet you.", id: "Senang bertemu denganmu.", read: "nais tu mit yu.", 
      breakdown: [{ word: "Nice", meaning: "Senang / Bagus" }, { word: "To meet", meaning: "Bertemu" }, { word: "You", meaning: "Kamu" }] 
    }
  ];

  const convKabar = [
    { 
      en: "How are you?", id: "Apa kabar?", read: "hau ar yu?", 
      breakdown: [{ word: "How", meaning: "Bagaimana" }, { word: "Are", meaning: "Adalah (Kata bantu)" }, { word: "You", meaning: "Kamu" }] 
    },
    { 
      en: "I am fine, thank you.", id: "Aku baik-baik saja, terima kasih.", read: "ai em fain, theng kyu.", 
      breakdown: [{ word: "I", meaning: "Saya / Aku" }, { word: "Am", meaning: "Adalah (Kata bantu)" }, { word: "Fine", meaning: "Baik" }, { word: "Thank you", meaning: "Terima kasih" }] 
    },
    { 
      en: "And you?", id: "Dan kamu?", read: "en yu?", 
      breakdown: [{ word: "And", meaning: "Dan" }, { word: "You", meaning: "Kamu" }] 
    },
    { 
      en: "I am fine too.", id: "Aku juga baik-baik saja.", read: "ai em fain tu.", 
      breakdown: [{ word: "I", meaning: "Saya" }, { word: "Am", meaning: "Adalah (Kata bantu)" }, { word: "Fine", meaning: "Baik" }, { word: "Too", meaning: "Juga" }] 
    }
  ];

  const convNeeds = [
    { 
      en: "I want to eat.", id: "Saya ingin makan.", read: "ai wont tu it.", 
      breakdown: [{ word: "I", meaning: "Saya / Aku" }, { word: "Want", meaning: "Ingin / Mau" }, { word: "To eat", meaning: "Makan" }] 
    },
    { 
      en: "I want to drink.", id: "Saya ingin minum.", read: "ai wont tu dringk.", 
      breakdown: [{ word: "I", meaning: "Saya / Aku" }, { word: "Want", meaning: "Ingin / Mau" }, { word: "To drink", meaning: "Minum" }] 
    },
    { 
      en: "I want to sleep.", id: "Saya ingin tidur.", read: "ai wont tu slip.", 
      breakdown: [{ word: "I", meaning: "Saya / Aku" }, { word: "Want", meaning: "Ingin / Mau" }, { word: "To sleep", meaning: "Tidur" }] 
    },
    { 
      en: "I want to pee.", id: "Saya ingin pipis.", read: "ai wont tu pi.", 
      breakdown: [{ word: "I", meaning: "Saya / Aku" }, { word: "Want", meaning: "Ingin / Mau" }, { word: "To pee", meaning: "Pipis / Buang air kecil" }] 
    }
  ];

  const convPolite = [
    { 
      en: "Thank you.", id: "Terima kasih.", read: "theng kyu.", 
      breakdown: [{ word: "Thank", meaning: "Terima / Syukur" }, { word: "You", meaning: "Kamu" }] 
    },
    { 
      en: "I am sorry.", id: "Saya minta maaf.", read: "ai em so-ri.", 
      breakdown: [{ word: "I", meaning: "Saya" }, { word: "Am", meaning: "Adalah (Kata bantu)" }, { word: "Sorry", meaning: "Maaf" }] 
    },
    { 
      en: "Excuse me.", id: "Permisi.", read: "eks-kyus mi.", 
      breakdown: [{ word: "Excuse", meaning: "Permisi / Maafkan" }, { word: "Me", meaning: "Saya" }] 
    },
    { 
      en: "Please help me.", id: "Tolong bantu saya.", read: "plis help mi.", 
      breakdown: [{ word: "Please", meaning: "Tolong / Silakan" }, { word: "Help", meaning: "Bantu" }, { word: "Me", meaning: "Saya" }] 
    }
  ];

  const convFeelings = [
    { 
      en: "I am happy.", id: "Saya senang.", read: "ai em he-pi.", 
      breakdown: [{ word: "I", meaning: "Saya" }, { word: "Am", meaning: "Adalah (Kata bantu)" }, { word: "Happy", meaning: "Senang / Bahagia" }] 
    },
    { 
      en: "I am tired.", id: "Saya lelah.", read: "ai em tai-yerd.", 
      breakdown: [{ word: "I", meaning: "Saya" }, { word: "Am", meaning: "Adalah (Kata bantu)" }, { word: "Tired", meaning: "Lelah" }] 
    },
    { 
      en: "I am sick.", id: "Saya sakit.", read: "ai em sik.", 
      breakdown: [{ word: "I", meaning: "Saya" }, { word: "Am", meaning: "Adalah (Kata bantu)" }, { word: "Sick", meaning: "Sakit" }] 
    }
  ];

  const convPlay = [
    { 
      en: "Let's play.", id: "Ayo bermain.", read: "lets plei.", 
      breakdown: [{ word: "Let's", meaning: "Ayo / Mari" }, { word: "Play", meaning: "Bermain" }] 
    },
    { 
      en: "Let's read a book.", id: "Ayo membaca buku.", read: "lets rid e buk.", 
      breakdown: [{ word: "Let's", meaning: "Ayo / Mari" }, { word: "Read", meaning: "Membaca" }, { word: "A book", meaning: "Sebuah buku" }] 
    }
  ];

  // ==========================================
  // KOMPONEN PEMBANTU (Merapikan Kode)
  // ==========================================
  const VocabGroup = ({ title, data, icon, themeColor }) => {
    const themes = {
      purple: "text-purple-600 bg-purple-50 border-purple-200 shadow-[0_4px_0_#7E22CE] bg-purple-500 hover:bg-purple-600",
      teal: "text-teal-600 bg-teal-50 border-teal-200 shadow-[0_4px_0_#0F766E] bg-teal-500 hover:bg-teal-600",
      rose: "text-rose-600 bg-rose-50 border-rose-200 shadow-[0_4px_0_#BE123C] bg-rose-500 hover:bg-rose-600",
      emerald: "text-emerald-600 bg-emerald-50 border-emerald-200 shadow-[0_4px_0_#047857] bg-emerald-500 hover:bg-emerald-600",
      amber: "text-amber-600 bg-amber-50 border-amber-200 shadow-[0_4px_0_#B45309] bg-amber-500 hover:bg-amber-600",
      pink: "text-pink-600 bg-pink-50 border-pink-200 shadow-[0_4px_0_#BE185D] bg-pink-500 hover:bg-pink-600",
    };
    const t = themes[themeColor] || themes.teal;
    const tSplit = t.split(" ");

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 px-2">
          <span className="text-xl">{icon}</span>
          <h2 className={`text-lg font-black ${tSplit[0]}`}>{title}</h2>
        </div>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.en} className={`flex items-center justify-between ${tSplit[1]} p-5 rounded-[1.5rem] border-b-4 ${tSplit[2]}`}>
              <div className="flex flex-col">
                {/* Bagian ini mendukung tampilan emoji ganda (metode visual tunggal/jamak) */}
                <span className="text-4xl mb-2 drop-shadow-sm tracking-widest">{item.icon || item.num}</span>
                <span className="text-sm font-bold text-gray-500">{item.id}</span>
                <span className="text-xl font-black text-gray-900 leading-tight">{item.en}</span>
                <span className="text-xs font-bold text-orange-500 mt-1">Dibaca: "{item.read}"</span>
              </div>
              <button 
                // Menggunakan item.audio jika ada (agar TTS tidak membaca simbol aneh), jika tidak gunakan item.en
                onClick={() => playAudio(item.audio || item.en)}
                className={`${tSplit[4]} ${tSplit[5]} active:translate-y-1 w-14 h-14 rounded-full flex flex-shrink-0 items-center justify-center ${tSplit[3]} transition-all ml-4`}
              >
                <span className="text-2xl text-white">🔊</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AnimalGroup = ({ title, data, icon }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-green-600">{title}</h2>
      </div>
      <div className="space-y-6">
        {data.map((animal) => (
          <div key={animal.en} className="bg-green-50 p-6 rounded-[2rem] border-b-[6px] border-green-200 flex flex-col items-center text-center">
            <div className="text-[100px] leading-none mb-4 drop-shadow-md">{animal.icon}</div>
            <div className="flex flex-col items-center w-full">
              <p className="text-lg font-bold text-gray-500 uppercase tracking-widest">{animal.id}</p>
              <h3 className="text-4xl font-black text-gray-900 leading-tight mb-2">{animal.en}</h3>
              <p className="text-sm font-bold text-orange-500 bg-orange-100 px-4 py-1.5 rounded-full mb-6">
                Dibaca: "{animal.read}"
              </p>
              <button 
                onClick={() => playAudio(animal.en)}
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 active:translate-y-1 w-full py-4 rounded-2xl flex items-center justify-center gap-3 shadow-[0_6px_0_#15803D] transition-all"
              >
                <span className="text-2xl text-white">🔊</span>
                <span className="text-white font-bold text-lg">Dengarkan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ConversationGroup = ({ title, data, icon }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-indigo-600">{title}</h2>
      </div>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col bg-indigo-50 p-5 rounded-[1.5rem] border-b-4 border-indigo-200">
            {/* Bagian Utama Kalimat */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col w-full pr-4">
                <span className="text-sm font-bold text-gray-500 mb-1">{item.id}</span>
                <span className="text-xl font-black text-gray-900 leading-snug mb-1">{item.en}</span>
                <span className="text-xs font-bold text-orange-500">Dibaca: "{item.read}"</span>
              </div>
              <button 
                onClick={() => playAudio(item.en)}
                className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 active:translate-y-1 w-14 h-14 rounded-full flex flex-shrink-0 items-center justify-center shadow-[0_4px_0_#4338CA] transition-all"
              >
                <span className="text-2xl text-white">🔊</span>
              </button>
            </div>
            
            {/* Bagian Breakdown (Penjelasan Kata Per Kata) */}
            {item.breakdown && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-indigo-200">
                <p className="text-xs font-black text-indigo-400 mb-2 uppercase tracking-wider">Penjelasan Per Kata:</p>
                <div className="space-y-1.5 mt-2">
                  {item.breakdown.map((b, i) => (
                    <div key={i} className="flex items-start text-[13px] leading-tight">
                      <span className="font-black text-indigo-700 w-[70px] flex-shrink-0">{b.word}</span>
                      <span className="text-indigo-300 mr-2">=</span>
                      <span className="font-bold text-gray-700">{b.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative mx-auto w-full max-w-md h-[100dvh] overflow-hidden font-sans">
      
      {/* --- LAYER LATAR BELAKANG --- */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ backgroundImage: "url('/bg-forest.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* --- LAYER KONTEN UTAMA --- */}
      <div className="relative z-10 h-full w-full overflow-y-auto pb-12">
        
        {/* Header Dinamis Terintegrasi dengan Sistem Back Bersarang */}
        <div className="bg-white p-5 rounded-b-3xl shadow-sm flex items-center gap-4 sticky top-0 z-50">
          {activeMenu === "utama" ? (
            <Link href="/" className="bg-orange-100 text-orange-600 p-2 rounded-xl font-bold active:scale-95 transition-transform">
              ⬅️ Kembali
            </Link>
          ) : (
            <button onClick={handleBack} className="bg-orange-100 text-orange-600 p-2 rounded-xl font-bold active:scale-95 transition-transform">
              ⬅️ Kembali
            </button>
          )}
          <h1 className="text-xl font-black text-gray-800 line-clamp-1">
            {getHeaderTitle()}
          </h1>
        </div>

        <div className="p-5">
          
          {/* ========================================================
              TAMPILAN 1: MENU ROOT 
              ======================================================== */}
          {activeMenu === "utama" && (
            <div className="flex flex-col gap-6 mt-4">
              <button onClick={() => setActiveMenu("kosakata")} className="w-full bg-[#3B82F6] active:translate-y-1 text-white py-10 rounded-[2rem] shadow-[0_8px_0_#1D4ED8] transition-all flex flex-col items-center justify-center gap-3">
                <span className="text-6xl drop-shadow-md">📖</span>
                <span className="font-black text-3xl tracking-wide">Kosakata</span>
              </button>
              
              <button onClick={() => setActiveMenu("percakapan")} className="w-full bg-[#8B5CF6] active:translate-y-1 text-white py-10 rounded-[2rem] shadow-[0_8px_0_#6D28D9] transition-all flex flex-col items-center justify-center gap-3">
                <span className="text-6xl drop-shadow-md">💬</span>
                <span className="font-black text-3xl tracking-wide">Percakapan</span>
              </button>
            </div>
          )}

          {/* ========================================================
              TAMPILAN 1.A: SUB-MENU KOSAKATA
              ======================================================== */}
          {activeMenu === "kosakata" && (
            <div className="flex flex-col gap-4 mt-2">
              <button onClick={() => setActiveMenu("alfabet")} className="w-full bg-[#3B82F6] active:translate-y-1 text-white py-5 rounded-[1.5rem] shadow-[0_6px_0_#1D4ED8] transition-all flex items-center justify-center gap-4">
                <span className="text-4xl drop-shadow-md">🔤</span>
                <span className="font-black text-xl">Alfabet</span>
              </button>
              <button onClick={() => setActiveMenu("angka")} className="w-full bg-[#A855F7] active:translate-y-1 text-white py-5 rounded-[1.5rem] shadow-[0_6px_0_#7E22CE] transition-all flex items-center justify-center gap-4">
                <span className="text-4xl drop-shadow-md">🔢</span>
                <span className="font-black text-xl">Angka</span>
              </button>
              
              {/* Menu Baru: Orang & Keluarga */}
              <button onClick={() => setActiveMenu("orang")} className="w-full bg-[#EC4899] active:translate-y-1 text-white py-5 rounded-[1.5rem] shadow-[0_6px_0_#BE185D] transition-all flex items-center justify-center gap-4">
                <span className="text-4xl drop-shadow-md">👨‍👩‍👧‍👦</span>
                <span className="font-black text-xl">Orang</span>
              </button>

              <button onClick={() => setActiveMenu("hewan")} className="w-full bg-[#22C55E] active:translate-y-1 text-white py-5 rounded-[1.5rem] shadow-[0_6px_0_#15803D] transition-all flex items-center justify-center gap-4">
                <span className="text-4xl drop-shadow-md">🦁</span>
                <span className="font-black text-xl">Hewan</span>
              </button>
              <button onClick={() => setActiveMenu("buah")} className="w-full bg-[#F43F5E] active:translate-y-1 text-white py-5 rounded-[1.5rem] shadow-[0_6px_0_#BE123C] transition-all flex items-center justify-center gap-4">
                <span className="text-4xl drop-shadow-md">🍎</span>
                <span className="font-black text-xl">Buah</span>
              </button>
              <button onClick={() => setActiveMenu("sayur")} className="w-full bg-[#10B981] active:translate-y-1 text-white py-5 rounded-[1.5rem] shadow-[0_6px_0_#047857] transition-all flex items-center justify-center gap-4">
                <span className="text-4xl drop-shadow-md">🥕</span>
                <span className="font-black text-xl">Sayuran</span>
              </button>
              <button onClick={() => setActiveMenu("benda")} className="w-full bg-[#F59E0B] active:translate-y-1 text-white py-5 rounded-[1.5rem] shadow-[0_6px_0_#B45309] transition-all flex items-center justify-center gap-4">
                <span className="text-4xl drop-shadow-md">🏠</span>
                <span className="font-black text-xl">Di Sekitar</span>
              </button>
              <button onClick={() => setActiveMenu("aktivitas")} className="w-full bg-[#14B8A6] active:translate-y-1 text-white py-5 rounded-[1.5rem] shadow-[0_6px_0_#0F766E] transition-all flex items-center justify-center gap-4">
                <span className="text-4xl drop-shadow-md">🏃</span>
                <span className="font-black text-xl">Aktivitas</span>
              </button>
            </div>
          )}

          {/* ========================================================
              TAMPILAN 1.B: SUB-MENU PERCAKAPAN
              ======================================================== */}
          {activeMenu === "percakapan" && (
            <div className="flex flex-col gap-4 mt-2">
              <button onClick={() => setActiveMenu("conv_perkenalan")} className="w-full bg-[#8B5CF6] active:translate-y-1 text-white py-6 rounded-[1.5rem] shadow-[0_6px_0_#6D28D9] transition-all flex flex-col items-center justify-center gap-2">
                <span className="text-5xl drop-shadow-md">👋</span>
                <span className="font-black text-2xl">Cara Berkenalan</span>
              </button>
              <button onClick={() => setActiveMenu("conv_kabar")} className="w-full bg-[#6366F1] active:translate-y-1 text-white py-6 rounded-[1.5rem] shadow-[0_6px_0_#4F46E5] transition-all flex flex-col items-center justify-center gap-2">
                <span className="text-5xl drop-shadow-md">❓</span>
                <span className="font-black text-2xl">Menanyakan Kabar</span>
              </button>
              <button onClick={() => setActiveMenu("conv_sehari")} className="w-full bg-[#0EA5E9] active:translate-y-1 text-white py-6 rounded-[1.5rem] shadow-[0_6px_0_#0369A1] transition-all flex flex-col items-center justify-center gap-2">
                <span className="text-5xl drop-shadow-md">🗣️</span>
                <span className="font-black text-2xl">Sehari-Hari</span>
              </button>
            </div>
          )}

          {/* ========================================================
              TAMPILAN MATERI (KOSAKATA)
              ======================================================== */}
          {activeMenu === "alfabet" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50 space-y-6">
              <div className="grid grid-cols-4 gap-3">
                {alphabets.map((item) => (
                  <button key={item.letter} onClick={() => playAudio(item.letter)} className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 active:bg-blue-200 active:translate-y-1 p-3 rounded-2xl border-b-4 border-blue-200 transition-all">
                    <span className="text-2xl font-black text-gray-800">{item.letter}</span>
                    <span className="text-[11px] font-bold text-orange-500 mt-1">"{item.read}"</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeMenu === "orang" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <VocabGroup title="Satu & Banyak" icon="👥" data={orangUmum} themeColor="pink" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Keluarga" icon="🏡" data={orangKeluarga} themeColor="pink" />
            </div>
          )}

          {activeMenu === "hewan" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <AnimalGroup title="Di Sekitar Rumah" icon="🏠" data={animalHouse} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <AnimalGroup title="Peternakan & Pedesaan" icon="🐄" data={animalFarm} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <AnimalGroup title="Hewan Terbang" icon="🦅" data={animalAir} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <AnimalGroup title="Hewan Air" icon="🐟" data={animalWater} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <AnimalGroup title="Hewan Tanah & Hutan" icon="🌲" data={animalLand} />
            </div>
          )}

          {activeMenu === "angka" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <VocabGroup title="Dasar 1 - 10" icon="🌱" data={numbers1to10} themeColor="purple" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Puluhan & Ratusan" icon="🎈" data={numbersTens} themeColor="purple" />
            </div>
          )}

          {activeMenu === "buah" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <VocabGroup title="Buah-buahan" icon="🍎" data={buahBuahan} themeColor="rose" />
            </div>
          )}

          {activeMenu === "sayur" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <VocabGroup title="Sayur-sayuran" icon="🥕" data={sayurSayuran} themeColor="emerald" />
            </div>
          )}

          {activeMenu === "benda" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <VocabGroup title="Rumah & Ruangan" icon="🏡" data={bendaRumahRuangan} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Perabotan & Kamar" icon="🛏️" data={bendaPerabotan} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Pakaian & Aksesoris" icon="👕" data={bendaPakaian} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Makanan & Minuman" icon="🍛" data={bendaMakanan} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Dapur & Alat Makan" icon="🍽️" data={bendaAlatMakan} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Alat Tulis & Sekolah" icon="📚" data={bendaSekolah} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Kendaraan & Elektronik" icon="🚗" data={bendaKendaraanElektronik} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Alam & Lingkungan" icon="🌲" data={bendaAlam} themeColor="amber" />
            </div>
          )}

          {activeMenu === "aktivitas" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <VocabGroup title="Gerak & Olahraga" icon="🤸" data={activityMovements} themeColor="teal" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Keseharian di Rumah" icon="🏠" data={activityHome} themeColor="teal" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Pedesaan & Alam" icon="🌾" data={activityRural} themeColor="teal" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Belajar & Bermain" icon="🧠" data={activitySensesStudy} themeColor="teal" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Menggunakan Tenaga" icon="💪" data={activityEffort} themeColor="teal" />
            </div>
          )}

          {/* ========================================================
              TAMPILAN MATERI (PERCAKAPAN)
              ======================================================== */}
          {activeMenu === "conv_perkenalan" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <ConversationGroup title="Kalimat Perkenalan" icon="🤝" data={convPerkenalan} />
            </div>
          )}

          {activeMenu === "conv_kabar" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <ConversationGroup title="Tanya Jawab Kabar" icon="💬" data={convKabar} />
            </div>
          )}
          
          {activeMenu === "conv_sehari" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <ConversationGroup title="Kebutuhan & Keinginan" icon="🍽️" data={convNeeds} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Sopan Santun" icon="🙏" data={convPolite} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Perasaan Diri" icon="❤️" data={convFeelings} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Bermain & Mengajak" icon="🪁" data={convPlay} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}