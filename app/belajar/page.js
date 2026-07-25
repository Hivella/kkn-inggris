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

  // Logika Tombol Kembali yang Pintar
  const handleBack = () => {
    if (["alfabet", "angka", "orang", "hewan", "buah", "sayur", "benda", "aktivitas"].includes(activeMenu)) {
      setActiveMenu("kosakata");
    } else if (["conv_perkenalan", "conv_kabar", "conv_sehari"].includes(activeMenu)) {
      setActiveMenu("percakapan");
    } else if (["story_crow", "story_rabbit"].includes(activeMenu)) {
      setActiveMenu("cerita");
    } else if (activeMenu === "kosakata" || activeMenu === "percakapan" || activeMenu === "cerita") {
      setActiveMenu("utama");
    }
  };

  const getHeaderTitle = () => {
    switch(activeMenu) {
      case "utama": return "Kategori Belajar";
      case "kosakata": return "Menu Kosakata";
      case "percakapan": return "Menu Percakapan";
      case "cerita": return "Cerita Anak";
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
      case "story_crow": return "Gagak yang Haus";
      case "story_rabbit": return "Kelinci & Kura-kura";
      default: return "Ayo Belajar!";
    }
  };

  // ==========================================
  // 1. DATA ALFABET
  // ==========================================
  const alphabets = [
    { letter: "A", read: "ei" }, { letter: "B", read: "bi" }, { letter: "C", read: "si" }, { letter: "D", read: "di" }, { letter: "E", read: "i" }, { letter: "F", read: "ef" },
    { letter: "G", read: "ji" }, { letter: "H", read: "eic" }, { letter: "I", read: "ai" }, { letter: "J", read: "jei" }, { letter: "K", read: "kei" }, { letter: "L", read: "el" },
    { letter: "M", read: "em" }, { letter: "N", read: "en" }, { letter: "O", read: "ou" }, { letter: "P", read: "pi" }, { letter: "Q", read: "kyu" }, { letter: "R", read: "ar" },
    { letter: "S", read: "es" }, { letter: "T", read: "ti" }, { letter: "U", read: "yu" }, { letter: "V", read: "vi" }, { letter: "W", read: "dabelyu" }, { letter: "X", read: "eks" },
    { letter: "Y", read: "wai" }, { letter: "Z", read: "zi" }
  ];

  // ==========================================
  // 2. DATA ORANG & KELUARGA
  // ==========================================
  const orangUmum = [
    { id: "Pria (Satu)", en: "Man", read: "men", icon: "👨" }, { id: "Pria (Lebih dari 1)", en: "Men", read: "men", icon: "👨👨" },
    { id: "Wanita (Satu)", en: "Woman", read: "wu-men", icon: "👩" }, { id: "Wanita (Lebih dari 1)", en: "Women", read: "wi-min", icon: "👩👩👩" },
    { id: "Anak Laki-laki (Satu)", en: "Boy", read: "boi", icon: "👦" }, { id: "Anak Laki-laki (Banyak)", en: "Boys", read: "bois", icon: "👦👦" },
    { id: "Anak Perempuan (Satu)", en: "Girl", read: "gerl", icon: "👧" }, { id: "Anak Perempuan (Banyak)", en: "Girls", read: "gerls", icon: "👧👧👧" },
  ];
  const orangKeluarga = [
    { id: "Ibu (Mom)", en: "Mother", read: "ma-dher", icon: "👩" }, { id: "Ayah (Dad)", en: "Father", read: "fa-dher", icon: "👨" },
    { id: "Orang Tua", en: "Parents", read: "pe-rents", icon: "👨‍👩‍👧‍👦" }, { id: "Kakek", en: "Grandfather", read: "grend-fa-dher", icon: "👴" },
    { id: "Nenek", en: "Grandmother", read: "grend-ma-dher", icon: "👵" }, { id: "Saudara Kandung", en: "Sibling", read: "sib-ling", icon: "🧒👧" },
    { id: "Saudara Laki-laki", en: "Brother", read: "bra-dher", icon: "👦" }, { id: "Saudara Perempuan", en: "Sister", read: "sis-ter", icon: "👧" },
  ];

  // ==========================================
  // 3. DATA HEWAN
  // ==========================================
  const animalHouse = [
    { id: "Kucing", en: "Cat", read: "ket", icon: "🐈" }, { id: "Anjing", en: "Dog", read: "dog", icon: "🐕" }, { id: "Tikus", en: "Mouse", read: "maus", icon: "🐁" }, 
    { id: "Cicak / Kadal", en: "Lizard", read: "li-zerd", icon: "🦎" }, { id: "Kecoa", en: "Cockroach", read: "kok-rouc", icon: "🪳" }, { id: "Lalat", en: "Fly", read: "flai", icon: "🪰" },
    { id: "Nyamuk", en: "Mosquito", read: "mes-ki-tou", icon: "🦟" }, { id: "Semut", en: "Ant", read: "ent", icon: "🐜" }, { id: "Laba-laba", en: "Spider", read: "spai-der", icon: "🕷️" },
  ];
  const animalFarm = [
    { id: "Ayam", en: "Chicken", read: "ci-ken", icon: "🐓" }, { id: "Bebek", en: "Duck", read: "dak", icon: "🦆" }, { id: "Sapi", en: "Cow", read: "kau", icon: "🐄" }, 
    { id: "Kambing", en: "Goat", read: "gout", icon: "🐐" }, { id: "Kuda", en: "Horse", read: "hors", icon: "🐎" },
  ];
  const animalAir = [
    { id: "Burung", en: "Bird", read: "berd", icon: "🐦" }, { id: "Kupu-kupu", en: "Butterfly", read: "ba-ter-flai", icon: "🦋" }, { id: "Lebah", en: "Bee", read: "bi", icon: "🐝" },
  ];
  const animalWater = [
    { id: "Ikan", en: "Fish", read: "fis", icon: "🐟" }, { id: "Katak", en: "Frog", read: "frog", icon: "🐸" }, { id: "Kura-kura", en: "Turtle", read: "ter-tel", icon: "🐢" },
  ];
  const animalLand = [
    { id: "Belalang", en: "Grasshopper", read: "gres-ho-per", icon: "🦗" }, { id: "Cacing", en: "Worm", read: "werm", icon: "🪱" }, { id: "Ular", en: "Snake", read: "snek", icon: "🐍" },
  ];

  // ==========================================
  // 4. DATA ANGKA
  // ==========================================
  const numbers1to30 = [
    { num: "1", en: "One", read: "wan", id: "Satu" }, { num: "2", en: "Two", read: "tu", id: "Dua" }, { num: "3", en: "Three", read: "thri", id: "Tiga" }, { num: "4", en: "Four", read: "for", id: "Empat" },
    { num: "5", en: "Five", read: "faiv", id: "Lima" }, { num: "6", en: "Six", read: "siks", id: "Enam" }, { num: "7", en: "Seven", read: "se-ven", id: "Tujuh" }, { num: "8", en: "Eight", read: "eit", id: "Delapan" },
    { num: "9", en: "Nine", read: "nain", id: "Sembilan" }, { num: "10", en: "Ten", read: "ten", id: "Sepuluh" }, { num: "11", en: "Eleven", read: "i-le-ven", id: "Sebelas" }, { num: "12", en: "Twelve", read: "twelf", id: "Dua Belas" },
    { num: "13", en: "Thirteen", read: "ther-tin", id: "Tiga Belas" }, { num: "14", en: "Fourteen", read: "for-tin", id: "Empat Belas" }, { num: "15", en: "Fifteen", read: "fif-tin", id: "Lima Belas" }, { num: "16", en: "Sixteen", read: "siks-tin", id: "Enam Belas" },
    { num: "17", en: "Seventeen", read: "se-ven-tin", id: "Tujuh Belas" }, { num: "18", en: "Eighteen", read: "ei-tin", id: "Delapan Belas" }, { num: "19", en: "Nineteen", read: "nain-tin", id: "Sembilan Belas" }, { num: "20", en: "Twenty", read: "twen-ti", id: "Dua Puluh" },
    { num: "21", en: "Twenty One", read: "twen-ti wan", id: "Dua Puluh Satu" }, { num: "22", en: "Twenty Two", read: "twen-ti tu", id: "Dua Puluh Dua" }, { num: "23", en: "Twenty Three", read: "twen-ti thri", id: "Dua Puluh Tiga" }, { num: "24", en: "Twenty Four", read: "twen-ti for", id: "Dua Puluh Empat" },
    { num: "25", en: "Twenty Five", read: "twen-ti faiv", id: "Dua Puluh Lima" }, { num: "26", en: "Twenty Six", read: "twen-ti siks", id: "Dua Puluh Enam" }, { num: "27", en: "Twenty Seven", read: "twen-ti se-ven", id: "Dua Puluh Tujuh" }, { num: "28", en: "Twenty Eight", read: "twen-ti eit", id: "Dua Puluh Delapan" },
    { num: "29", en: "Twenty Nine", read: "twen-ti nain", id: "Dua Puluh Sembilan" }, { num: "30", en: "Thirty", read: "ther-ti", id: "Tiga Puluh" }
  ];
  const numbersTens = [
    { num: "10", en: "Ten", read: "ten", id: "Sepuluh" }, { num: "20", en: "Twenty", read: "twen-ti", id: "Dua Puluh" }, { num: "30", en: "Thirty", read: "ther-ti", id: "Tiga Puluh" },
    { num: "40", en: "Forty", read: "for-ti", id: "Empat Puluh" }, { num: "50", en: "Fifty", read: "fif-ti", id: "Lima Puluh" }, { num: "60", en: "Sixty", read: "siks-ti", id: "Enam Puluh" },
    { num: "70", en: "Seventy", read: "se-ven-ti", id: "Tujuh Puluh" }, { num: "80", en: "Eighty", read: "ei-ti", id: "Delapan Puluh" }, { num: "90", en: "Ninety", read: "nain-ti", id: "Sembilan Puluh" }
  ];
  const numbersMixedTens = [
    { num: "33", en: "Thirty Three", read: "ther-ti thri", id: "Tiga Puluh Tiga" }, { num: "47", en: "Forty Seven", read: "for-ti se-ven", id: "Empat Puluh Tujuh" },
    { num: "51", en: "Fifty One", read: "fif-ti wan", id: "Lima Puluh Satu" }, { num: "62", en: "Sixty Two", read: "siks-ti tu", id: "Enam Puluh Dua" },
    { num: "76", en: "Seventy Six", read: "se-ven-ti siks", id: "Tujuh Puluh Enam" }, { num: "88", en: "Eighty Eight", read: "ei-ti eit", id: "Delapan Puluh Delapan" }, { num: "94", en: "Ninety Four", read: "nain-ti for", id: "Sembilan Puluh Empat" }
  ];
  const numbersHundreds = [
    { num: "100", en: "One Hundred", read: "wan han-dred", id: "Seratus" }, { num: "200", en: "Two Hundred", read: "tu han-dred", id: "Dua Ratus" },
    { num: "300", en: "Three Hundred", read: "thri han-dred", id: "Tiga Ratus" }, { num: "400", en: "Four Hundred", read: "for han-dred", id: "Empat Ratus" },
    { num: "500", en: "Five Hundred", read: "faiv han-dred", id: "Lima Ratus" }, { num: "600", en: "Six Hundred", read: "siks han-dred", id: "Enam Ratus" },
    { num: "700", en: "Seven Hundred", read: "se-ven han-dred", id: "Tujuh Ratus" }, { num: "800", en: "Eight Hundred", read: "eit han-dred", id: "Delapan Ratus" }, { num: "900", en: "Nine Hundred", read: "nain han-dred", id: "Sembilan Ratus" }
  ];
  const numbersMixedHundreds = [
    { num: "102", en: "One Hundred Two", read: "wan han-dred tu", id: "Seratus Dua" }, { num: "205", en: "Two Hundred Five", read: "tu han-dred faiv", id: "Dua Ratus Lima" },
    { num: "347", en: "Three Hundred Forty Seven", read: "thri han-dred for-ti se-ven", id: "Tiga Ratus Empat Puluh Tujuh" }, { num: "481", en: "Four Hundred Eighty One", read: "for han-dred ei-ti wan", id: "Empat Ratus Delapan Puluh Satu" },
    { num: "981", en: "Nine Hundred Eighty One", read: "nain han-dred ei-ti wan", id: "Sembilan Ratus Delapan Puluh Satu" }
  ];
  const numbersThousandsMillions = [
    { num: "1.000", en: "One Thousand", read: "wan tau-zen", id: "Seribu" }, { num: "2.000", en: "Two Thousand", read: "tu tau-zen", id: "Dua Ribu" },
    { num: "5.000", en: "Five Thousand", read: "faiv tau-zen", id: "Lima Ribu" }, { num: "10.000", en: "Ten Thousand", read: "ten tau-zen", id: "Sepuluh Ribu" },
    { num: "700.000", en: "Seven Hundred Thousand", read: "se-ven han-dred tau-zen", id: "Tujuh Ratus Ribu" }, { num: "1.000.000", en: "One Million", read: "wan mil-yen", id: "Satu Juta" }
  ];

  // ==========================================
  // 5. DATA AKTIVITAS
  // ==========================================
  const activityMovements = [
    { id: "Berjalan", en: "Walk", read: "wok", icon: "🚶" }, { id: "Berlari", en: "Run", read: "ran", icon: "🏃" }, { id: "Lompat", en: "Jump", read: "jamp", icon: "🦘" }, 
    { id: "Memanjat", en: "Climb", read: "klaim", icon: "🧗" }, { id: "Melempar", en: "Throw", read: "throu", icon: "⚾" }, { id: "Menendang", en: "Kick", read: "kik", icon: "⚽" }, 
    { id: "Memukul", en: "Hit", read: "hit", icon: "🥊" }, { id: "Terbang", en: "Fly", read: "flai", icon: "🦅" },
  ];
  const activityHome = [
    { id: "Makan", en: "Eat", read: "it", icon: "🍽️" }, { id: "Minum", en: "Drink", read: "dringk", icon: "🥤" }, { id: "Memasak", en: "Cook", read: "kuk", icon: "🍳" }, 
    { id: "Tidur", en: "Sleep", read: "slip", icon: "😴" }, { id: "Duduk", en: "Sit", read: "sit", icon: "🪑" }, { id: "Membuka", en: "Open", read: "o-pen", icon: "🚪" }, 
    { id: "Menutup", en: "Close", read: "klouz", icon: "🚪" }, { id: "Menyalakan", en: "Turn On", read: "tern on", icon: "💡" }, { id: "Mematikan", en: "Turn Off", read: "tern of", icon: "🔌" }, 
    { id: "Menggunakan Pakaian / Sepatu", en: "Wear", read: "wer", icon: "👕" }, { id: "Buang Air Kecil (Pipis)", en: "Pee", read: "pi", icon: "🚽" }, { id: "Buang Air Besar (Eek)", en: "Poop", read: "pup", icon: "💩" }, 
    { id: "Mandi", en: "Take a bath", read: "teik e bath", icon: "🛁" }, { id: "Menggosok Gigi", en: "Brush teeth", read: "bras tith", icon: "🪥" }, { id: "Keramas", en: "Wash hair", read: "wos her", icon: "🧴" },
  ];
  const activityRural = [
    { id: "Menanam", en: "Plant", read: "plent", icon: "🌱" }, { id: "Menyiram", en: "Water", read: "wo-ter", icon: "🚿" }, { id: "Memanen", en: "Harvest", read: "har-vest", icon: "🌾" }, 
    { id: "Memancing", en: "Fish", read: "fis", icon: "🎣" }, { id: "Mengendarai", en: "Ride", read: "raid", icon: "🚲" },
  ];
  const activitySensesStudy = [
    { id: "Melihat", en: "See", read: "si", icon: "👀" }, { id: "Mendengar", en: "Hear", read: "hir", icon: "👂" }, { id: "Mendengarkan", en: "Listen", read: "lis-sen", icon: "🎧" }, 
    { id: "Menonton", en: "Watch", read: "woc", icon: "📺" }, { id: "Membaca", en: "Read", read: "rid", icon: "📖" }, { id: "Menggambar", en: "Draw", read: "dro", icon: "🎨" }, 
    { id: "Belajar", en: "Study", read: "sta-di", icon: "📚" }, { id: "Bernyanyi", en: "Sing", read: "sing", icon: "🎤" }, { id: "Bermain", en: "Play", read: "plei", icon: "🪁" },
  ];
  const activityEffort = [
    { id: "Membawa", en: "Bring", read: "bring", icon: "📦" }, { id: "Mendorong", en: "Push", read: "pus", icon: "🛒" }, { id: "Menarik", en: "Pull", read: "pul", icon: "🪢" }, { id: "Menggendong", en: "Carry", read: "ke-ri", icon: "🎒" }
  ];

  // ==========================================
  // 6. DATA BUAH & SAYUR
  // ==========================================
  const buahBuahan = [
    { id: "Apel", en: "Apple", read: "e-pel", icon: "🍎" }, { id: "Pisang", en: "Banana", read: "ba-na-na", icon: "🍌" }, { id: "Jeruk", en: "Orange", read: "o-rinj", icon: "🍊" }, 
    { id: "Semangka", en: "Watermelon", read: "wo-ter-me-len", icon: "🍉" }, { id: "Mangga", en: "Mango", read: "meng-gou", icon: "🥭" }, { id: "Stroberi", en: "Strawberry", read: "stro-be-ri", icon: "🍓" }, 
    { id: "Nanas", en: "Pineapple", read: "pain-e-pel", icon: "🍍" }, { id: "Pepaya", en: "Papaya", read: "pa-pai-ya", icon: "🍈" },
  ];
  const sayurSayuran = [
    { id: "Wortel", en: "Carrot", read: "ke-ret", icon: "🥕" }, { id: "Kentang", en: "Potato", read: "po-tei-tou", icon: "🥔" }, { id: "Jagung", en: "Corn", read: "korn", icon: "🌽" }, 
    { id: "Singkong", en: "Cassava", read: "ka-sa-va", icon: "🍠" }, { id: "Bayam", en: "Spinach", read: "spi-nic", icon: "🥬" }, { id: "Tomat", en: "Tomato", read: "to-ma-tou", icon: "🍅" }, 
    { id: "Cabai", en: "Chili", read: "ci-li", icon: "🌶️" }, { id: "Brokoli", en: "Broccoli", read: "bro-ko-li", icon: "🥦" }, { id: "Bawang", en: "Onion", read: "o-ni-yen", icon: "🧅" },
  ];

  // ==========================================
  // 7. DATA BENDA HAL SEKITAR LENGKAP UTUH + TAMBAHAN
  // ==========================================
  const bendaRumahRuangan = [
    { id: "Rumah", en: "House", read: "haus", icon: "🏠" }, { id: "Kamar Tidur", en: "Bedroom", read: "bed-rum", icon: "🛏️" }, { id: "Kamar Mandi", en: "Bathroom", read: "bath-rum", icon: "🛁" }, 
    { id: "Ruang Keluarga", en: "Living Room", read: "li-ving rum", icon: "🛋️" }, { id: "Dapur", en: "Kitchen", read: "ki-cen", icon: "🍳" }, { id: "Ruang Tamu", en: "Guest Room", read: "gest rum", icon: "🪑" }, 
    { id: "Selasar / Lorong", en: "Hallway", read: "hol-wei", icon: "🚶" }, { id: "Halaman Rumah", en: "Yard", read: "yard", icon: "🏡" }, { id: "Lantai", en: "Floor", read: "flor", icon: "🟫" }, 
    { id: "Dinding", en: "Wall", read: "wol", icon: "🧱" }, { id: "Cat Dinding", en: "Wall Paint", read: "wol peint", icon: "🎨" }, { id: "Pintu", en: "Door", read: "dor", icon: "🚪" }, 
    { id: "Jendela", en: "Window", read: "win-dou", icon: "🪟" }, { id: "Pagar", en: "Fence", read: "fens", icon: "⛩️" }, { id: "Bambu", en: "Bamboo", read: "bem-bu", icon: "🎋" }, 
    { id: "Pohon Bambu", en: "Bamboo Tree", read: "bem-bu tri", icon: "🎋" }
  ];
  const bendaPerabotan = [
    { id: "Meja", en: "Table", read: "tei-bel", icon: "🪑" }, { id: "Kursi", en: "Chair", read: "cer", icon: "🪑" }, { id: "Lampu", en: "Lamp", read: "lemp", icon: "💡" }, 
    { id: "Kompor", en: "Stove", read: "stouv", icon: "🍳" }, { id: "Sapu", en: "Broom", read: "brum", icon: "🧹" }, { id: "Pel", en: "Mop", read: "mop", icon: "🧹" }, 
    { id: "Tempat Sampah", en: "Trash Can", read: "tres ken", icon: "🗑️" }, { id: "Karpet", en: "Carpet", read: "kar-pet", icon: "🟥" }, { id: "Tirai", en: "Curtain", read: "ker-ten", icon: "🪟" }
  ];
  const bendaKamar = [
    { id: "Kasur", en: "Bed", read: "bed", icon: "🛌" }, { id: "Bantal", en: "Pillow", read: "pi-lou", icon: "☁️" }, { id: "Guling", en: "Bolster", read: "bol-ster", icon: "🥖" }, { id: "Selimut", en: "Blanket", read: "bleng-ket", icon: "🛏️" }
  ];
  const bendaAlatMakan = [
    { id: "Piring", en: "Plate", read: "pleit", icon: "🍽️" }, { id: "Sendok", en: "Spoon", read: "spun", icon: "🥄" }, { id: "Garpu", en: "Fork", read: "fork", icon: "🍴" }, 
    { id: "Gelas", en: "Glass", read: "gles", icon: "🥛" }, { id: "Botol", en: "Bottle", read: "bo-tel", icon: "🍾" }, { id: "Botol Air", en: "Water Bottle", read: "wo-ter bo-tel", icon: "🍼" }, { id: "Cangkir", en: "Cup", read: "kap", icon: "☕" }
  ];
  const bendaMakanan = [
    { id: "Makanan", en: "Food", read: "fud", icon: "🍱" }, { id: "Minuman", en: "Drink", read: "dringk", icon: "🍹" }, { id: "Makanan Ringan", en: "Snack", read: "snek", icon: "🍪" }, 
    { id: "Nasi", en: "Rice", read: "rais", icon: "🍚" }, { id: "Nasi Goreng", en: "Fried Rice", read: "fraid rais", icon: "🍛" }, { id: "Es Krim", en: "Ice Cream", read: "ais krim", icon: "🍦" }, { id: "Es Teh", en: "Iced Tea", read: "ais ti", icon: "🥤" }
  ];
  const bendaPakaian = [
    { id: "Pakaian", en: "Clothes", read: "klouts", icon: "👕" }, { id: "Kaos", en: "T-shirt", read: "ti-syert", icon: "👕" }, { id: "Kemeja", en: "Shirt", read: "syert", icon: "👔" }, 
    { id: "Celana", en: "Pants", read: "pents", icon: "👖" }, { id: "Kaos Kaki", en: "Socks", read: "soks", icon: "🧦" }, { id: "Sepatu", en: "Shoes", read: "syus", icon: "👟" }, 
    { id: "Sandal", en: "Sandals", read: "sen-dels", icon: "🩴" }, { id: "Sabuk", en: "Belt", read: "belt", icon: "🥋" }, { id: "Kacamata", en: "Glasses", read: "gle-ses", icon: "👓" }, 
    { id: "Gelang", en: "Bracelet", read: "breis-let", icon: "⭕" }, { id: "Jam Tangan", en: "Watch", read: "woc", icon: "⌚" }
  ];
  const bendaKendaraanElektronik = [
    { id: "Sepeda", en: "Bicycle", read: "bai-si-kel", icon: "🚲" }, { id: "Sepeda Motor", en: "Motorcycle", read: "mo-tor-sai-kel", icon: "🏍️" }, { id: "Mobil", en: "Car", read: "kar", icon: "🚗" }, 
    { id: "Telepon", en: "Telephone", read: "te-le-foun", icon: "☎️" }, { id: "Telepon Genggam", en: "Mobile Phone", read: "mo-bail foun", icon: "📱" }, { id: "Komputer", en: "Computer", read: "kom-pyu-ter", icon: "💻" }, { id: "Laptop", en: "Laptop", read: "lep-top", icon: "💻" }
  ];
  const bendaSekolah = [
    { id: "Buku", en: "Book", read: "buk", icon: "📖" }, { id: "Kertas", en: "Paper", read: "pei-per", icon: "📄" }, { id: "Pensil", en: "Pencil", read: "pen-sil", icon: "✏️" }, 
    { id: "Pulpen", en: "Pen", read: "pen", icon: "🖊️" }, { id: "Spidol", en: "Marker", read: "mar-ker", icon: "🖍️" }, { id: "Kapur", en: "Chalk", read: "cok", icon: "🖍️" }, 
    { id: "Penghapus", en: "Eraser", read: "i-rei-ser", icon: "🧽" }, { id: "Papan Tulis Spidol", en: "Whiteboard", read: "wait-bord", icon: "📝" }, { id: "Papan Tulis Kapur", en: "Blackboard", read: "blek-bord", icon: "🏫" }
  ];
  const bendaAlam = [
    { id: "Air", en: "Water", read: "wo-ter", icon: "💧" }, { id: "Api", en: "Fire", read: "fai-yer", icon: "🔥" }, { id: "Pohon", en: "Tree", read: "tri", icon: "🌳" }, 
    { id: "Tumbuhan", en: "Plant", read: "plent", icon: "🪴" }, { id: "Bunga", en: "Flower", read: "flau-wer", icon: "🌸" }, { id: "Daun", en: "Leaf", read: "lif", icon: "🍃" }, 
    { id: "Rumput", en: "Grass", read: "gres", icon: "🌿" }, { id: "Batu", en: "Stone", read: "stoun", icon: "🪨" }, { id: "Kerikil", en: "Pebble", read: "pe-bel", icon: "🪨" }, 
    { id: "Pasir", en: "Sand", read: "send", icon: "🏜️" }, { id: "Jalanan", en: "Street", read: "strit", icon: "🛣️" }, { id: "Kayu", en: "Wood", read: "wud", icon: "🪵" }
  ];
  // TAMBAHAN: Kuburan, Makam, Hantu
  const bendaPedesaan = [
    { id: "Toko", en: "Shop", read: "sop", icon: "🏪" }, { id: "Warung", en: "Stall", read: "stol", icon: "🛖" }, { id: "Restoran", en: "Restaurant", read: "res-to-ren", icon: "🍽️" }, 
    { id: "Rumah Makan", en: "Eatery", read: "i-te-ri", icon: "🍛" }, { id: "Bola", en: "Ball", read: "bol", icon: "⚽" }, { id: "Rokok", en: "Cigarette", read: "si-ga-ret", icon: "🚬" }, 
    { id: "Korek Api", en: "Match", read: "mec", icon: "🔥" }, { id: "Bendera", en: "Flag", read: "fleig", icon: "🚩" }, { id: "Tiang", en: "Pole", read: "poul", icon: "💈" }, 
    { id: "Tiang Bendera", en: "Flagpole", read: "fleig-poul", icon: "🎌" }, { id: "Plastik", en: "Plastic", read: "ples-tik", icon: "🛍️" }, { id: "Pasar Malam", en: "Night Market", read: "nait mar-ket", icon: "🎪" }, 
    { id: "Karung", en: "Sack", read: "sek", icon: "🥔" }, { id: "Padi / Tanaman Padi", en: "Paddy", read: "pe-di", icon: "🌾" },
    { id: "Kuburan", en: "Graveyard", read: "greiv-yard", icon: "🪦" }, { id: "Makam", en: "Grave", read: "greiv", icon: "⚰️" }, { id: "Hantu", en: "Ghost", read: "goust", icon: "👻" }
  ];

  // ==========================================
  // 8. DATA PERCAKAPAN
  // ==========================================
  const convPerkenalan = [
    { en: "Hello!", id: "Halo!", read: "he-lou!", breakdown: [{ word: "Hello", meaning: "Halo" }] },
    { en: "Good morning!", id: "Selamat pagi!", read: "gud mor-ning!", breakdown: [{ word: "Good", meaning: "Selamat / Bagus" }, { word: "Morning", meaning: "Pagi" }] },
    { en: "What is your name?", id: "Siapa namamu?", read: "wot is yor neim?", breakdown: [{ word: "What", meaning: "Apa / Siapa" }, { word: "Is", meaning: "Adalah" }, { word: "Your", meaning: "Milikmu" }, { word: "Name", meaning: "Nama" }] },
    { en: "My name is Stella.", id: "Namaku Stella.", read: "mai neim is ste-la.", breakdown: [{ word: "My", meaning: "Milikku" }, { word: "Name", meaning: "Nama" }, { word: "Is", meaning: "Adalah" }, { word: "Stella", meaning: "Stella" }] },
    { en: "Nice to meet you.", id: "Senang bertemu denganmu.", read: "nais tu mit yu.", breakdown: [{ word: "Nice", meaning: "Senang / Bagus" }, { word: "To meet", meaning: "Bertemu" }, { word: "You", meaning: "Kamu" }] }
  ];

  const convKabar = [
    { en: "How are you?", id: "Apa kabar?", read: "hau ar yu?", breakdown: [{ word: "How", meaning: "Bagaimana" }, { word: "Are", meaning: "Adalah" }, { word: "You", meaning: "Kamu" }] },
    { en: "I am fine, thank you.", id: "Aku baik-baik saja, terima kasih.", read: "ai em fain, theng kyu.", breakdown: [{ word: "I", meaning: "Saya / Aku" }, { word: "Am", meaning: "Adalah" }, { word: "Fine", meaning: "Baik" }, { word: "Thank you", meaning: "Terima kasih" }] },
    { en: "And you?", id: "Dan kamu?", read: "en yu?", breakdown: [{ word: "And", meaning: "Dan" }, { word: "You", meaning: "Kamu" }] },
    { en: "I am fine too.", id: "Aku juga baik-baik saja.", read: "ai em fain tu.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Am", meaning: "Adalah" }, { word: "Fine", meaning: "Baik" }, { word: "Too", meaning: "Juga" }] }
  ];

  const convWants = [
    { en: "I want to eat fried rice.", id: "Saya ingin makan nasi goreng.", read: "ai wont tu it fraid rais.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Want to", meaning: "Ingin" }, { word: "Eat", meaning: "Makan" }, { word: "Fried rice", meaning: "Nasi goreng" }] },
    { en: "I want to drink water.", id: "Saya ingin minum air.", read: "ai wont tu dringk wo-ter.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Want to", meaning: "Ingin" }, { word: "Drink", meaning: "Minum" }, { word: "Water", meaning: "Air" }] },
    { en: "I would like to take a bath.", id: "Saya ingin mandi.", read: "ai wuld laik tu teik e bath.", breakdown: [{ word: "I would like to", meaning: "Saya ingin (sopan)" }, { word: "Take a bath", meaning: "Mandi" }] },
    { en: "I want to buy a toy.", id: "Saya ingin membeli mainan.", read: "ai wont tu bai e toi.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Want to", meaning: "Ingin" }, { word: "Buy", meaning: "Membeli" }, { word: "A toy", meaning: "Sebuah mainan" }] }
  ];

  const convLikes = [
    { en: "I like cats and dogs.", id: "Saya suka kucing dan anjing.", read: "ai laik kets en dogs.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Like", meaning: "Suka" }, { word: "Cats", meaning: "Kucing-kucing" }, { word: "And", meaning: "Dan" }, { word: "Dogs", meaning: "Anjing-anjing" }] },
    { en: "She likes playing football.", id: "Dia (perempuan) suka bermain sepak bola.", read: "si laiks plei-ying fut-bol.", breakdown: [{ word: "She", meaning: "Dia (perempuan)" }, { word: "Likes", meaning: "Suka" }, { word: "Playing", meaning: "Bermain" }, { word: "Football", meaning: "Sepak bola" }] },
    { en: "We like to read books.", id: "Kami suka membaca buku.", read: "wi laik tu rid buks.", breakdown: [{ word: "We", meaning: "Kami" }, { word: "Like to", meaning: "Suka untuk" }, { word: "Read", meaning: "Membaca" }, { word: "Books", meaning: "Buku-buku" }] }
  ];

  const convFeelings = [
    { en: "I feel happy.", id: "Saya merasa senang.", read: "ai fil he-pi.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Feel", meaning: "Merasa" }, { word: "Happy", meaning: "Senang" }] },
    { en: "He is angry.", id: "Dia (laki-laki) marah.", read: "hi is eng-gri.", breakdown: [{ word: "He", meaning: "Dia (laki-laki)" }, { word: "Is", meaning: "Adalah" }, { word: "Angry", meaning: "Marah" }] },
    { en: "They are surprised.", id: "Mereka terkejut.", read: "dhei ar ser-praisd.", breakdown: [{ word: "They", meaning: "Mereka" }, { word: "Are", meaning: "Adalah" }, { word: "Surprised", meaning: "Terkejut" }] },
    { en: "I am sick and tired.", id: "Saya sakit dan lelah.", read: "ai em sik en tai-yerd.", breakdown: [{ word: "I am", meaning: "Saya" }, { word: "Sick", meaning: "Sakit" }, { word: "And", meaning: "Dan" }, { word: "Tired", meaning: "Lelah" }] }
  ];

  const convFuture = [
    { en: "I will go to school.", id: "Saya akan pergi ke sekolah.", read: "ai wil gou tu skul.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Will", meaning: "Akan" }, { word: "Go", meaning: "Pergi" }, { word: "To school", meaning: "Ke sekolah" }] },
    { en: "We are going to the market.", id: "Kami akan pergi ke pasar.", read: "wi ar go-ing tu dhe mar-ket.", breakdown: [{ word: "We", meaning: "Kami" }, { word: "Are going to", meaning: "Akan pergi ke" }, { word: "The market", meaning: "Pasar itu" }] },
    { en: "I will sleep in the bedroom.", id: "Saya akan tidur di kamar tidur.", read: "ai wil slip in dhe bed-rum.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Will", meaning: "Akan" }, { word: "Sleep", meaning: "Tidur" }, { word: "In the", meaning: "Di dalam" }, { word: "Bedroom", meaning: "Kamar tidur" }] }
  ];

  const convRoutine = [
    { en: "I wake up in the morning.", id: "Saya bangun di pagi hari.", read: "ai weik ap in dhe mor-ning.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Wake up", meaning: "Bangun" }, { word: "In the", meaning: "Di" }, { word: "Morning", meaning: "Pagi hari" }] },
    { en: "I wash my face and brush my teeth.", id: "Saya mencuci muka dan menggosok gigi.", read: "ai wos mai feis en bras mai tith.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Wash", meaning: "Mencuci" }, { word: "My face", meaning: "Wajahku" }, { word: "And", meaning: "Dan" }, { word: "Brush my teeth", meaning: "Menggosok gigiku" }] },
    { en: "I go to school by bicycle.", id: "Saya pergi ke sekolah naik sepeda.", read: "ai gou tu skul bai bai-si-kel.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Go to school", meaning: "Pergi ke sekolah" }, { word: "By", meaning: "Dengan / Naik" }, { word: "Bicycle", meaning: "Sepeda" }] }
  ];

  const convWeather = [
    { en: "It is raining today.", id: "Sedang turun hujan hari ini.", read: "it is rei-ning tu-dei.", breakdown: [{ word: "It is", meaning: "Sedang" }, { word: "Raining", meaning: "Turun hujan" }, { word: "Today", meaning: "Hari ini" }] },
    { en: "The sun is hot.", id: "Mataharinya panas.", read: "dhe san is hot.", breakdown: [{ word: "The sun", meaning: "Matahari itu" }, { word: "Is", meaning: "Adalah" }, { word: "Hot", meaning: "Panas" }] },
    { en: "The sky is blue.", id: "Langitnya biru.", read: "dhe skai is blu.", breakdown: [{ word: "The sky", meaning: "Langit itu" }, { word: "Is", meaning: "Adalah" }, { word: "Blue", meaning: "Biru" }] }
  ];

  const convAbility = [
    { en: "I can ride a bicycle.", id: "Saya bisa naik sepeda.", read: "ai ken raid e bai-si-kel.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Can", meaning: "Bisa / Dapat" }, { word: "Ride", meaning: "Mengendarai" }, { word: "A bicycle", meaning: "Sebuah sepeda" }] },
    { en: "Birds can fly in the sky.", id: "Burung-burung bisa terbang di langit.", read: "berds ken flai in dhe skai.", breakdown: [{ word: "Birds", meaning: "Burung-burung" }, { word: "Can", meaning: "Bisa" }, { word: "Fly", meaning: "Terbang" }, { word: "In the sky", meaning: "Di langit" }] },
    { en: "I cannot swim.", id: "Saya tidak bisa berenang.", read: "ai ken-not swim.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Cannot", meaning: "Tidak bisa" }, { word: "Swim", meaning: "Berenang" }] }
  ];

  const convDescribing = [
    { en: "The apple is red.", id: "Apel itu berwarna merah.", read: "dhe e-pel is red.", breakdown: [{ word: "The apple", meaning: "Apel itu" }, { word: "Is", meaning: "Adalah" }, { word: "Red", meaning: "Merah" }] },
    { en: "This is a big elephant.", id: "Ini adalah seekor gajah yang besar.", read: "dhis is e big e-le-fant.", breakdown: [{ word: "This is", meaning: "Ini adalah" }, { word: "A big", meaning: "Sebuah besar" }, { word: "Elephant", meaning: "Gajah" }] },
    { en: "The cat is sleeping.", id: "Kucing itu sedang tidur.", read: "dhe ket is sli-ping.", breakdown: [{ word: "The cat", meaning: "Kucing itu" }, { word: "Is", meaning: "Sedang" }, { word: "Sleeping", meaning: "Tidur" }] }
  ];

  const convPossession = [
    { en: "I have a school bag.", id: "Saya punya sebuah tas sekolah.", read: "ai hev e skul beg.", breakdown: [{ word: "I", meaning: "Saya" }, { word: "Have", meaning: "Punya" }, { word: "A school bag", meaning: "Sebuah tas sekolah" }] },
    { en: "This is my pencil.", id: "Ini adalah pensilku.", read: "dhis is mai pen-sil.", breakdown: [{ word: "This is", meaning: "Ini adalah" }, { word: "My", meaning: "Milikku" }, { word: "Pencil", meaning: "Pensil" }] },
    { en: "He has a black motorcycle.", id: "Dia (laki-laki) punya sebuah sepeda motor hitam.", read: "hi hes e blek mo-tor-sai-kel.", breakdown: [{ word: "He", meaning: "Dia (Laki-laki)" }, { word: "Has", meaning: "Punya" }, { word: "A black", meaning: "Sebuah hitam" }, { word: "Motorcycle", meaning: "Sepeda motor" }] }
  ];

  const convQuestions = [
    { en: "What is this?", id: "Apa ini?", read: "wot is dhis?", breakdown: [{ word: "What", meaning: "Apa" }, { word: "Is", meaning: "Adalah" }, { word: "This", meaning: "Ini" }] },
    { en: "This is an apple.", id: "Ini adalah sebuah apel.", read: "dhis is en e-pel.", breakdown: [{ word: "This is", meaning: "Ini adalah" }, { word: "An apple", meaning: "Sebuah apel" }] },
    { en: "Where is my book?", id: "Di mana bukuku?", read: "wer is mai buk?", breakdown: [{ word: "Where is", meaning: "Di mana" }, { word: "My book", meaning: "Bukuku" }] },
    { en: "The book is on the table.", id: "Buku itu ada di atas meja.", read: "dhe buk is on dhe tei-bel.", breakdown: [{ word: "The book", meaning: "Buku itu" }, { word: "On the table", meaning: "Di atas meja itu" }] }
  ];

  const convPermission = [
    { en: "May I go to the toilet?", id: "Bolehkah saya pergi ke toilet/kamar mandi?", read: "mei ai gou tu dhe toi-let?", breakdown: [{ word: "May I", meaning: "Bolehkah saya" }, { word: "Go", meaning: "Pergi" }, { word: "To the toilet", meaning: "Ke toilet" }] },
    { en: "May I borrow your pencil?", id: "Bolehkah saya meminjam pensilmu?", read: "mei ai bo-rou yor pen-sil?", breakdown: [{ word: "May I", meaning: "Bolehkah saya" }, { word: "Borrow", meaning: "Meminjam" }, { word: "Your pencil", meaning: "Pensilmu" }] },
    { en: "Can I play outside?", id: "Bolehkah saya bermain di luar?", read: "ken ai plei aut-said?", breakdown: [{ word: "Can I", meaning: "Bolehkah saya (Santai)" }, { word: "Play", meaning: "Bermain" }, { word: "Outside", meaning: "Di luar" }] }
  ];

  const convPolite = [
    { en: "Thank you.", id: "Terima kasih.", read: "theng kyu.", breakdown: [{ word: "Thank", meaning: "Terima" }, { word: "You", meaning: "Kamu" }] },
    { en: "I am sorry.", id: "Saya minta maaf.", read: "ai em so-ri.", breakdown: [{ word: "I am", meaning: "Saya" }, { word: "Sorry", meaning: "Maaf" }] },
    { en: "Excuse me.", id: "Permisi.", read: "eks-kyus mi.", breakdown: [{ word: "Excuse", meaning: "Permisi / Maafkan" }, { word: "Me", meaning: "Saya" }] },
    { en: "You're welcome.", id: "Sama-sama.", read: "yor wel-kam.", breakdown: [{ word: "You are", meaning: "Kamu" }, { word: "Welcome", meaning: "Terima (Kembali)" }] },
  ];

  // ==========================================
  // 9. DATA CERITA ANAK (STORYTELLING)
  // ==========================================
  // UPDATE: Menggunakan Gambar Khusus (image) sesuai request
  const storyCrow = [
    {
      scene: 1, image: "/Gagak_yang_Haus_1.png", en: "One hot day, a crow is very thirsty.", id: "Suatu hari yang panas, seekor gagak sangat kehausan.", read: "wan hot dei, e krou is ve-ri thers-ti.",
      breakdown: [{ word: "Crow", meaning: "Gagak" }, { word: "Thirsty", meaning: "Haus" }]
    },
    {
      scene: 2, image: "/Gagak_yang_Haus_2.png", en: "He sees a pitcher with a little water.", id: "Dia melihat sebuah kendi dengan sedikit air.", read: "hi sis e pi-cer with e li-tel wo-ter.",
      breakdown: [{ word: "Sees", meaning: "Melihat" }, { word: "Pitcher", meaning: "Kendi / Teko" }, { word: "Little water", meaning: "Sedikit air" }]
    },
    {
      scene: 3, image: "/Gagak_yang_Haus_3.png", en: "But, he cannot reach the water.", id: "Tapi, dia tidak bisa menjangkau air itu.", read: "bat, hi ken-not ric dhe wo-ter.",
      breakdown: [{ word: "Cannot", meaning: "Tidak bisa" }, { word: "Reach", meaning: "Menjangkau" }]
    },
    {
      scene: 4, image: "/Gagak_yang_Haus_4.png", en: "He drops stones into the pitcher.", id: "Dia menjatuhkan batu-batu ke dalam kendi.", read: "hi drops stouns in-tu dhe pi-cer.",
      breakdown: [{ word: "Drops", meaning: "Menjatuhkan" }, { word: "Stones", meaning: "Batu-batu" }]
    },
    {
      scene: 5, image: "/Gagak_yang_Haus_5.png", en: "The water goes up, and the crow drinks.", id: "Air naik, dan gagak itu minum.", read: "dhe wo-ter gous ap, en dhe krou drinks.",
      breakdown: [{ word: "Goes up", meaning: "Naik" }, { word: "Drinks", meaning: "Minum" }]
    }
  ];

  // Kura-kura masih menggunakan Emoji (belum ada gambarnya)
  const storyRabbit = [
    {
      scene: 1, emoji: "🐇⚡", en: "The rabbit can run very fast.", id: "Kelinci bisa berlari sangat cepat.", read: "dhe re-bit ken ran ve-ri fest.",
      breakdown: [{ word: "Rabbit", meaning: "Kelinci" }, { word: "Fast", meaning: "Cepat" }]
    },
    {
      scene: 2, emoji: "🐢🐌", en: "The turtle walks very slowly.", id: "Kura-kura berjalan sangat lambat.", read: "dhe ter-tel woks ve-ri slou-li.",
      breakdown: [{ word: "Turtle", meaning: "Kura-kura" }, { word: "Walks", meaning: "Berjalan" }, { word: "Slowly", meaning: "Dengan lambat" }]
    },
    {
      scene: 3, emoji: "🏁🐇", en: "They race. The rabbit runs far ahead.", id: "Mereka berlomba. Kelinci berlari jauh di depan.", read: "dhei reis. dhe re-bit rans far e-hed.",
      breakdown: [{ word: "Race", meaning: "Berlomba" }, { word: "Far ahead", meaning: "Jauh di depan" }]
    },
    {
      scene: 4, emoji: "🌳😴", en: "The rabbit sleeps under a tree.", id: "Kelinci tidur di bawah sebuah pohon.", read: "dhe re-bit slips an-der e tri.",
      breakdown: [{ word: "Sleeps", meaning: "Tidur" }, { word: "Under", meaning: "Di bawah" }, { word: "Tree", meaning: "Pohon" }]
    },
    {
      scene: 5, emoji: "🐢🏆", en: "The turtle keeps walking and wins!", id: "Kura-kura terus berjalan dan menang!", read: "dhe ter-tel kips wo-king en wins!",
      breakdown: [{ word: "Keeps walking", meaning: "Terus berjalan" }, { word: "Wins", meaning: "Menang" }]
    }
  ];

  // ==========================================
  // KOMPONEN PEMBANTU (UI Rendering)
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
                <span className="text-4xl mb-2 drop-shadow-sm tracking-widest">{item.icon || item.num}</span>
                <span className="text-sm font-bold text-gray-500">{item.id}</span>
                <span className="text-xl font-black text-gray-900 leading-tight">{item.en}</span>
                <span className="text-xs font-bold text-orange-500 mt-1">Dibaca: "{item.read}"</span>
              </div>
              <button 
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
            {item.breakdown && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-indigo-200">
                <p className="text-xs font-black text-indigo-400 mb-2 uppercase tracking-wider">Penjelasan Per Kata:</p>
                <div className="space-y-1.5 mt-2">
                  {item.breakdown.map((b, i) => (
                    <div key={i} className="flex items-start text-[13px] leading-tight">
                      <span className="font-black text-indigo-700 w-[90px] flex-shrink-0">{b.word}</span>
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

  // UPDATE: StoryGroup sekarang mendukung gambar khusus (image)
  const StoryGroup = ({ title, data, icon }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-amber-600">{title}</h2>
      </div>
      <div className="space-y-6">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col bg-amber-50 p-6 rounded-[2rem] border-b-[6px] border-amber-200 shadow-sm relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 bg-amber-200 text-amber-800 font-black px-4 py-1.5 rounded-full text-xs shadow-sm border-2 border-white">
              Adegan {item.scene}
            </div>
            
            {/* Visual/Gambar Cerita (Otomatis mendeteksi gambar atau emoji) */}
            <div className="flex justify-center mt-4 mb-5 w-full">
              {item.image ? (
                <img src={item.image} alt={`Scene ${item.scene}`} className="w-full h-auto rounded-xl drop-shadow-md border-4 border-white" />
              ) : (
                <span className="text-[80px] drop-shadow-md">{item.emoji}</span>
              )}
            </div>

            <div className="flex flex-col text-center w-full mb-5">
              <span className="text-[22px] font-black text-gray-900 leading-snug mb-2">{item.en}</span>
              <span className="text-[15px] font-bold text-gray-600 mb-2">"{item.id}"</span>
              <span className="text-[13px] font-bold text-orange-500 bg-orange-100 px-3 py-1 rounded-full mx-auto w-fit">
                Cara baca: {item.read}
              </span>
            </div>
            <button 
              onClick={() => playAudio(item.en)}
              className="mx-auto bg-amber-500 hover:bg-amber-600 active:bg-amber-700 active:translate-y-1 w-full py-3 rounded-2xl flex items-center justify-center gap-3 shadow-[0_4px_0_#B45309] transition-all mb-4"
            >
              <span className="text-2xl text-white">🔊</span>
              <span className="text-white font-black text-lg">Dengarkan Cerita</span>
            </button>
            {item.breakdown && (
              <div className="pt-4 border-t-2 border-dashed border-amber-300">
                <p className="text-[11px] font-black text-amber-700 mb-2 uppercase tracking-wider text-center">💡 Kosakata Kunci:</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {item.breakdown.map((b, i) => (
                    <div key={i} className="flex flex-col bg-white p-2.5 rounded-xl border border-amber-100 shadow-sm text-center">
                      <span className="font-black text-amber-600 text-sm mb-0.5">{b.word}</span>
                      <span className="font-bold text-gray-500 text-xs">{b.meaning}</span>
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
        
        {/* Header Dinamis */}
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
            <div className="flex flex-col gap-5 mt-4">
              <button onClick={() => setActiveMenu("kosakata")} className="w-full bg-[#3B82F6] active:translate-y-1 text-white py-8 rounded-[2rem] shadow-[0_8px_0_#1D4ED8] transition-all flex flex-col items-center justify-center gap-3">
                <span className="text-6xl drop-shadow-md">📖</span>
                <span className="font-black text-3xl tracking-wide">Kosakata</span>
              </button>
              
              <button onClick={() => setActiveMenu("percakapan")} className="w-full bg-[#8B5CF6] active:translate-y-1 text-white py-8 rounded-[2rem] shadow-[0_8px_0_#6D28D9] transition-all flex flex-col items-center justify-center gap-3">
                <span className="text-6xl drop-shadow-md">💬</span>
                <span className="font-black text-3xl tracking-wide">Percakapan</span>
              </button>

              <button onClick={() => setActiveMenu("cerita")} className="w-full bg-[#EAB308] active:translate-y-1 text-white py-8 rounded-[2rem] shadow-[0_8px_0_#A16207] transition-all flex flex-col items-center justify-center gap-3">
                <span className="text-6xl drop-shadow-md">📚</span>
                <span className="font-black text-3xl tracking-wide">Cerita Anak</span>
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
              TAMPILAN 1.C: SUB-MENU CERITA ANAK
              ======================================================== */}
          {activeMenu === "cerita" && (
            <div className="flex flex-col gap-5 mt-2">
              <button onClick={() => setActiveMenu("story_crow")} className="w-full bg-[#F59E0B] active:translate-y-1 text-white py-8 rounded-[1.5rem] shadow-[0_6px_0_#B45309] transition-all flex flex-col items-center justify-center gap-2 border-4 border-amber-300">
                <span className="text-6xl drop-shadow-md">🐦</span>
                <span className="font-black text-2xl mt-2 text-center leading-tight">Gagak yang Haus<br/><span className="text-sm text-amber-100 font-bold tracking-wide">The Thirsty Crow</span></span>
              </button>
              <button onClick={() => setActiveMenu("story_rabbit")} className="w-full bg-[#10B981] active:translate-y-1 text-white py-8 rounded-[1.5rem] shadow-[0_6px_0_#047857] transition-all flex flex-col items-center justify-center gap-2 border-4 border-emerald-300">
                <span className="text-6xl drop-shadow-md">🐢</span>
                <span className="font-black text-2xl mt-2 text-center leading-tight">Kelinci & Kura-Kura<br/><span className="text-sm text-emerald-100 font-bold tracking-wide">The Rabbit & The Turtle</span></span>
              </button>
            </div>
          )}

          {/* ========================================================
              TAMPILAN MATERI KOSAKATA (100% LENGKAP)
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
              <VocabGroup title="Dasar 1 - 30" icon="🌱" data={numbers1to30} themeColor="purple" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Puluhan" icon="🎈" data={numbersTens} themeColor="purple" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Latihan Puluhan" icon="🧩" data={numbersMixedTens} themeColor="purple" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Ratusan" icon="⭐" data={numbersHundreds} themeColor="purple" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Latihan Ratusan" icon="🏆" data={numbersMixedHundreds} themeColor="purple" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Ribuan & Jutaan" icon="🚀" data={numbersThousandsMillions} themeColor="purple" />
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
              <VocabGroup title="Perabotan" icon="🪑" data={bendaPerabotan} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Kamar Tidur" icon="🛏️" data={bendaKamar} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Alat Makan & Dapur" icon="🍽️" data={bendaAlatMakan} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Makanan & Minuman" icon="🍛" data={bendaMakanan} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Pakaian & Aksesoris" icon="👕" data={bendaPakaian} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Kendaraan & Elektronik" icon="🚗" data={bendaKendaraanElektronik} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Alat Sekolah & Tulis" icon="📚" data={bendaSekolah} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Alam & Lingkungan" icon="🌲" data={bendaAlam} themeColor="amber" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Umum & Pedesaan" icon="🛖" data={bendaPedesaan} themeColor="amber" />
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
              <VocabGroup title="Panca Indera & Belajar" icon="🧠" data={activitySensesStudy} themeColor="teal" />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Menggunakan Tenaga" icon="💪" data={activityEffort} themeColor="teal" />
            </div>
          )}

          {/* ========================================================
              TAMPILAN MATERI PERCAKAPAN (100% LENGKAP 12 VARIANT)
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
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50 overflow-y-auto">
              <ConversationGroup title="Meminta Izin & Bertanya" icon="🔑" data={convPermission} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Tanya Jawab Dasar" icon="❓" data={convQuestions} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Keinginan & Kebutuhan" icon="✨" data={convWants} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Kesukaan (Hobi)" icon="👍" data={convLikes} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Perasaan Diri" icon="❤️" data={convFeelings} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Rutinitas Harian" icon="⏰" data={convRoutine} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Bisa & Tidak Bisa" icon="💪" data={convAbility} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Rencana (Akan Datang)" icon="📅" data={convFuture} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Deskripsi & Keadaan" icon="🎨" data={convDescribing} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Kepemilikan Barang" icon="🎒" data={convPossession} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Cuaca & Alam" icon="🌤️" data={convWeather} />
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <ConversationGroup title="Sopan Santun" icon="🙏" data={convPolite} />
            </div>
          )}

          {/* ========================================================
              TAMPILAN MATERI CERITA ANAK
              ======================================================== */}
          {activeMenu === "story_crow" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <StoryGroup title="The Thirsty Crow" icon="🐦" data={storyCrow} />
            </div>
          )}

          {activeMenu === "story_rabbit" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <StoryGroup title="The Rabbit & The Turtle" icon="🐢" data={storyRabbit} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}