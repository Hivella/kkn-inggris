"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HalamanBelajar() {
  const [activeMenu, setActiveMenu] = useState("utama");
  
  // REFERENSI: Untuk mengontrol posisi scroll
  const scrollContainerRef = useRef(null);

  // EFEK: Mengembalikan scroll ke paling atas setiap kali menu berubah
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [activeMenu]);

  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; 
      utterance.rate = 0.8; 
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.includes('Female') || voice.name.includes('Zira') || voice.name.includes('Samantha') || voice.name.includes('Victoria') || voice.name.includes('Google US English'))
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Maaf, browsermu tidak mendukung fitur suara.");
    }
  };

  const handleBack = () => {
    if (["alfabet", "angka", "orang", "hewan", "buah", "sayur", "benda", "aktivitas"].includes(activeMenu)) {
      setActiveMenu("kosakata");
    } else if (["conv_perkenalan", "conv_kabar", "conv_sehari", "conv_posisi"].includes(activeMenu)) {
      setActiveMenu("percakapan");
    } else if (["story_crow", "story_rabbit", "story_timun_mas", "story_kancil"].includes(activeMenu)) {
      setActiveMenu("cerita");
    } else if (activeMenu === "angka_contoh") {
      setActiveMenu("angka");
    } else if (activeMenu === "orang_contoh") {
      setActiveMenu("orang");
    } else if (activeMenu === "hewan_contoh") {
      setActiveMenu("hewan");
    } else if (activeMenu === "buah_contoh") {
      setActiveMenu("buah");
    } else if (activeMenu === "aktivitas_contoh") {
      setActiveMenu("aktivitas");
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
      case "orang_contoh": return "Contoh Penggunaan";
      case "hewan": return "Nama Hewan";
      case "hewan_contoh": return "Contoh Penggunaan";
      case "angka": return "Belajar Angka";
      case "angka_contoh": return "Contoh Penggunaan";
      case "buah": return "Nama Buah";
      case "buah_contoh": return "Contoh Penggunaan";
      case "sayur": return "Nama Sayuran";
      case "benda": return "Hal di Sekitar";
      case "aktivitas": return "Aktivitas Harian";
      case "aktivitas_contoh": return "Contoh Penggunaan";
      case "conv_perkenalan": return "Cara Berkenalan";
      case "conv_kabar": return "Tanya Kabar";
      case "conv_sehari": return "Sehari-Hari";
      case "conv_posisi": return "Posisi & Letak";
      case "story_crow": return "Gagak yang Haus";
      case "story_rabbit": return "Kelinci & Kura-kura";
      case "story_timun_mas": return "Timun Mas";
      case "story_kancil": return "Kancil & Buaya";
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
    { id: "Teman (Satu)", en: "Friend", read: "frend", icon: "🧒" }, { id: "Teman (Banyak)", en: "Friends", read: "frends", icon: "🧒🧒" }
  ];
  const orangKeluarga = [
    { id: "Ibu (Mom)", en: "Mother", read: "ma-dher", icon: "👩" }, { id: "Ayah (Dad)", en: "Father", read: "fa-dher", icon: "👨" },
    { id: "Orang Tua", en: "Parents", read: "pe-rents", icon: "👨‍👩‍👧‍👦" }, { id: "Kakek", en: "Grandfather", read: "grend-fa-dher", icon: "👴" },
    { id: "Nenek", en: "Grandmother", read: "grend-ma-dher", icon: "👵" }, 
    { id: "Saudara Kandung (Satu)", en: "Sibling", read: "sib-ling", icon: "🧒/👧" }, 
    { id: "Saudara Kandung (Banyak)", en: "Siblings", read: "sib-lings", icon: "🧒👧" },
    { id: "Saudara Laki-laki", en: "Brother", read: "bra-dher", icon: "👦" }, { id: "Saudara Perempuan", en: "Sister", read: "sis-ter", icon: "👧" },
    { id: "Kakak Laki-laki", en: "Older brother", read: "oul-der bra-dher", icon: "👦" }, { id: "Kakak Perempuan", en: "Older sister", read: "oul-der sis-ter", icon: "👧" },
    { id: "Adik Laki-laki", en: "Younger brother", read: "yang-ger bra-dher", icon: "👶" }, { id: "Adik Perempuan", en: "Younger sister", read: "yang-ger sis-ter", icon: "👶👧" },
    { id: "Paman", en: "Uncle", read: "ang-kel", icon: "🧔‍♂️" }, { id: "Bibi", en: "Aunt", read: "ant", icon: "👩‍🦱" },
    { id: "Anak Laki-laki (Kandung)", en: "Son", read: "san", icon: "👦" }, { id: "Anak Perempuan (Kandung)", en: "Daughter", read: "do-ter", icon: "👧" },
    { id: "Sepupu", en: "Cousin", read: "ka-zen", icon: "🧒" }, { id: "Keponakan Laki-laki", en: "Nephew", read: "ne-fyu", icon: "👦" },
    { id: "Keponakan Perempuan", en: "Niece", read: "nis", icon: "👧" }, { id: "Suami", en: "Husband", read: "has-bend", icon: "👨" },
    { id: "Istri", en: "Wife", read: "waif", icon: "👩" }
  ];
  const orangContoh = [
    { icon: "👨", en: "I am a man.", id: "Aku adalah seorang pria.", read: "ai em a men.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Am", meaning: "Adalah" }, { word: "A", meaning: "Seorang" }, { word: "Man", meaning: "Pria" }], note: "'am' berarti adalah, hanya digunakan untuk 'I' (Aku). 'a' berarti sebuah atau seorang." },
    { icon: "👨", en: "My father is a man.", id: "Ayahku adalah seorang pria.", read: "mai fa-dher is a men.", breakdown: [{ word: "My", meaning: "Milikku" }, { word: "Father", meaning: "Ayah" }, { word: "Is", meaning: "Adalah" }, { word: "A", meaning: "Seorang" }, { word: "Man", meaning: "Pria" }] },
    { icon: "👨🌳", en: "I see 1 man under a tree.", id: "Aku melihat 1 pria di bawah pohon.", read: "ai si wan men an-der a tri.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "See", meaning: "Melihat" }, { word: "1 (One)", meaning: "Satu" }, { word: "Man", meaning: "Pria" }, { word: "Under", meaning: "Di bawah" }, { word: "A tree", meaning: "Sebuah pohon" }] },
    { icon: "👨👨👨", en: "I see 3 men sitting.", id: "Aku melihat 3 pria duduk.", read: "ai si thri men si-ting.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "See", meaning: "Melihat" }, { word: "3 (Three)", meaning: "Tiga" }, { word: "Men", meaning: "Pria (Lebih dari 1)" }, { word: "Sitting", meaning: "Duduk" }] },
    { icon: "👩", en: "My mother is a woman.", id: "Ibuku adalah seorang wanita.", read: "mai ma-dher is a wu-men.", breakdown: [{ word: "My", meaning: "Milikku" }, { word: "Mother", meaning: "Ibu" }, { word: "Is", meaning: "Adalah" }, { word: "A", meaning: "Seorang" }, { word: "Woman", meaning: "Wanita" }] },
    { icon: "👩👩🏃‍♀️", en: "2 women running.", id: "2 wanita berlari.", read: "tu wi-min ra-ning.", breakdown: [{ word: "2 (Two)", meaning: "Dua" }, { word: "Women", meaning: "Wanita (Lebih dari 1)" }, { word: "Running", meaning: "Berlari" }] },
    { icon: "👦", en: "My brother is a boy.", id: "Saudara laki-lakiku adalah seorang anak laki-laki.", read: "mai bra-dher is a boi.", breakdown: [{ word: "My", meaning: "Milikku" }, { word: "Brother", meaning: "Saudara laki-laki" }, { word: "Is", meaning: "Adalah" }, { word: "A", meaning: "Seorang" }, { word: "Boy", meaning: "Anak laki-laki" }] },
    { icon: "👦", en: "I am a boy.", id: "Aku adalah seorang anak laki-laki.", read: "ai em a boi.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Am", meaning: "Adalah" }, { word: "A", meaning: "Seorang" }, { word: "Boy", meaning: "Anak laki-laki" }] },
    { icon: "👦👦", en: "We are boys.", id: "Kami adalah anak laki-laki.", read: "wi ar bois.", breakdown: [{ word: "We", meaning: "Kami" }, { word: "Are", meaning: "Adalah" }, { word: "Boys", meaning: "Anak laki-laki (Lebih dari 1)" }], note: "'are' berarti adalah, digunakan untuk subjek yang berjumlah lebih dari satu (seperti we, they)." },
    { icon: "👧", en: "You are a girl.", id: "Kamu adalah seorang anak perempuan.", read: "yu ar a gerl.", breakdown: [{ word: "You", meaning: "Kamu" }, { word: "Are", meaning: "Adalah" }, { word: "A", meaning: "Seorang" }, { word: "Girl", meaning: "Anak perempuan" }], note: "'are' berarti adalah, juga selalu digunakan untuk 'You' (Kamu)." },
    { icon: "👧👧", en: "We are girls.", id: "Kami adalah anak perempuan.", read: "wi ar gerls.", breakdown: [{ word: "We", meaning: "Kami" }, { word: "Are", meaning: "Adalah" }, { word: "Girls", meaning: "Anak perempuan (Lebih dari 1)" }] },
    { icon: "👩", en: "You are a mother.", id: "Kamu adalah seorang ibu.", read: "yu ar a ma-dher.", breakdown: [{ word: "You", meaning: "Kamu" }, { word: "Are", meaning: "Adalah" }, { word: "A", meaning: "Seorang" }, { word: "Mother", meaning: "Ibu" }] },
    { icon: "👨", en: "You are a father.", id: "Kamu adalah seorang ayah.", read: "yu ar a fa-dher.", breakdown: [{ word: "You", meaning: "Kamu" }, { word: "Are", meaning: "Adalah" }, { word: "A", meaning: "Seorang" }, { word: "Father", meaning: "Ayah" }] },
    { icon: "👨‍👩‍👧‍👦", en: "They are parents.", id: "Mereka adalah orang tua.", read: "dhei ar pe-rents.", breakdown: [{ word: "They", meaning: "Mereka" }, { word: "Are", meaning: "Adalah" }, { word: "Parents", meaning: "Orang tua" }] }
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
  const hewanContoh = [
    { icon: "🐈", en: "The cat is walking.", id: "Kucing itu sedang berjalan.", read: "dhe ket is wo-king.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Cat", meaning: "Kucing (Satu)" }, { word: "Is walking", meaning: "Sedang berjalan" }], note: "Kenapa pakai 'is'? Kata 'is' digunakan karena hewannya hanya SATU (tunggal). Selain itu, kata 'is' ditambah kata kerja berakhiran '-ing' menunjukkan aktivitas SEDANG dilakukan. Walk = Berjalan. Walking = Sedang berjalan." },
    { icon: "🐕", en: "The dog is running.", id: "Anjing itu sedang berlari.", read: "dhe dog is ra-ning.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Dog", meaning: "Anjing" }, { word: "Is running", meaning: "Sedang berlari" }], note: "Run = Berlari. Running = Sedang berlari." },
    { icon: "🐁", en: "The mouse is sleeping.", id: "Tikus itu sedang tidur.", read: "dhe maus is sli-ping.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Mouse", meaning: "Tikus" }, { word: "Is sleeping", meaning: "Sedang tidur" }], note: "Sleep = Tidur. Sleeping = Sedang tidur." },
    { icon: "🦎", en: "The lizard is climbing.", id: "Kadal itu sedang memanjat.", read: "dhe li-zerd is klai-ming.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Lizard", meaning: "Kadal" }, { word: "Is climbing", meaning: "Sedang memanjat" }] },
    { icon: "🪳", en: "The cockroach is flying.", id: "Kecoa itu sedang terbang.", read: "dhe kok-rouc is flai-ying.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Cockroach", meaning: "Kecoa" }, { word: "Is flying", meaning: "Sedang terbang" }] },
    { icon: "🪰", en: "The fly is eating.", id: "Lalat itu sedang makan.", read: "dhe flai is i-ting.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Fly", meaning: "Lalat" }, { word: "Is eating", meaning: "Sedang makan" }], note: "Eat = Makan. Eating = Sedang makan." },
    { icon: "🦟", en: "The mosquito is sucking.", id: "Nyamuk itu sedang mengisap.", read: "dhe mes-ki-tou is sa-king.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Mosquito", meaning: "Nyamuk" }, { word: "Is sucking", meaning: "Sedang mengisap" }] },
    { icon: "🐜", en: "The ant is building.", id: "Semut itu sedang membangun.", read: "dhe ent is bil-ding.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Ant", meaning: "Semut" }, { word: "Is building", meaning: "Sedang membangun" }] },
    { icon: "🕷️", en: "The spider is gliding.", id: "Laba-laba itu sedang meluncur.", read: "dhe spai-der is glai-ding.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Spider", meaning: "Laba-laba" }, { word: "Is gliding", meaning: "Sedang meluncur" }] },
    { icon: "🐓", en: "The chicken is jumping.", id: "Ayam itu sedang melompat.", read: "dhe ci-ken is jam-ping.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Chicken", meaning: "Ayam" }, { word: "Is jumping", meaning: "Sedang melompat" }], note: "Jump = Melompat. Jumping = Sedang melompat." },
    { icon: "🦆🦆", en: "The ducks are swimming.", id: "Bebek-bebek itu sedang berenang.", read: "dhe daks ar swi-ming.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Ducks", meaning: "Bebek-bebek" }, { word: "Are swimming", meaning: "Sedang berenang" }], note: "Kenapa pakai 'are'? Kata 'are' digunakan karena hewannya LEBIH DARI SATU (jamak). Perhatikan juga nama hewannya ditambah huruf 's' (duck menjadi ducks). Swim = Berenang. Swimming = Sedang berenang." },
    { icon: "🐄🐄", en: "The cows are drinking.", id: "Sapi-sapi itu sedang minum.", read: "dhe kaus ar dring-king.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Cows", meaning: "Sapi-sapi" }, { word: "Are drinking", meaning: "Sedang minum" }], note: "Sama seperti kalimat di atas, karena sapinya ada banyak, kita pakai 'are' dan kata cow ditambah huruf 's' menjadi cows." },
    { icon: "🐐🐐", en: "The goats are eating.", id: "Kambing-kambing itu sedang makan.", read: "dhe gouts ar i-ting.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Goats", meaning: "Kambing-kambing" }, { word: "Are eating", meaning: "Sedang makan" }] },
    { icon: "🐎🐎", en: "The horses are running.", id: "Kuda-kuda itu sedang berlari.", read: "dhe hor-ses ar ra-ning.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Horses", meaning: "Kuda-kuda" }, { word: "Are running", meaning: "Sedang berlari" }] },
    { icon: "🐦🐦", en: "The birds are flying.", id: "Burung-burung itu sedang terbang.", read: "dhe berds ar flai-ying.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Birds", meaning: "Burung-burung" }, { word: "Are flying", meaning: "Sedang terbang" }] }
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
  const numbersMixedThousands = [
    { num: "1.432", en: "One Thousand Four Hundred Thirty Two", read: "wan tau-zen for han-dred ther-ti tu", id: "Seribu Empat Ratus Tiga Puluh Dua" },
    { num: "7.021", en: "Seven Thousand Twenty One", read: "se-ven tau-zen twen-ti wan", id: "Tujuh Ribu Dua Puluh Satu" },
    { num: "5.005", en: "Five Thousand Five", read: "faiv tau-zen faiv", id: "Lima Ribu Lima" }
  ];

  const angkaContoh = [
    { icon: "🍦", en: "I have 1 ice cream.", id: "Aku punya 1 es krim.", read: "ai hev wan ais krim.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Have", meaning: "Punya" }, { word: "1 (One)", meaning: "Satu" }, { word: "Ice cream", meaning: "Es krim" }], note: "TIDAK ditambahkan huruf 's' pada 'ice cream' karena es krimnya hanya ada satu." },
    { icon: "🍦🍦", en: "I have 2 ice creams.", id: "Aku punya 2 es krim.", read: "ai hev tu ais krims.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Have", meaning: "Punya" }, { word: "2 (Two)", meaning: "Dua" }, { word: "Ice creams", meaning: "Es krim" }], note: "Ada huruf 's' di belakang kata 'ice cream' (menjadi 'ice creams') karena es krimnya ada lebih dari satu." },
    { icon: "🧒", en: "I have 1 friend.", id: "Aku punya 1 teman.", read: "ai hev wan frend.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Have", meaning: "Punya" }, { word: "1 (One)", meaning: "Satu" }, { word: "Friend", meaning: "Teman" }], note: "TIDAK ditambahkan huruf 's' pada 'friend' karena temannya hanya ada satu." },
    { icon: "🧒🧒", en: "I have 2 friends.", id: "Aku punya 2 teman.", read: "ai hev tu frends.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Have", meaning: "Punya" }, { word: "2 (Two)", meaning: "Dua" }, { word: "Friends", meaning: "Teman-teman" }], note: "Ada huruf 's' di belakang kata 'friend' (menjadi 'friends') karena temannya ada lebih dari satu." },
    { icon: "📖", en: "I need 1 book.", id: "Aku butuh 1 buku.", read: "ai nid wan buk.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Need", meaning: "Butuh" }, { word: "1 (One)", meaning: "Satu" }, { word: "Book", meaning: "Buku" }], note: "TIDAK ditambahkan huruf 's' pada 'book' karena bukunya hanya ada satu." },
    { icon: "📚", en: "I need 10 books.", id: "Aku butuh 10 buku.", read: "ai nid ten buks.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Need", meaning: "Butuh" }, { word: "10 (Ten)", meaning: "Sepuluh" }, { word: "Books", meaning: "Buku-buku" }], note: "Ada huruf 's' di belakang kata 'book' (menjadi 'books') karena bukunya ada lebih dari satu (sepuluh)." },
    { icon: "✏️✏️✏️", en: "I need 3 pencils.", id: "Aku butuh 3 pensil.", read: "ai nid thri pen-sils.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Need", meaning: "Butuh" }, { word: "3 (Three)", meaning: "Tiga" }, { word: "Pencils", meaning: "Pensil-pensil" }], note: "Ada huruf 's' di belakang kata 'pencil' (menjadi 'pencils') karena pensilnya ada lebih dari satu." },
    { icon: "👨", en: "I have 1 father.", id: "Aku punya 1 ayah.", read: "ai hev wan fa-dher.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Have", meaning: "Punya" }, { word: "1 (One)", meaning: "Satu" }, { word: "Father", meaning: "Ayah" }], note: "TIDAK ditambahkan huruf 's' pada 'father' karena ayahnya hanya ada satu." }
  ];

  // ==========================================
  // 5. DATA AKTIVITAS
  // ==========================================
  const activityMovements = [
    { id: "Berjalan", en: "Walk", read: "wok", icon: "🚶", v1: "Walk", v2: "Walked", v3: "Walked" }, 
    { id: "Berlari", en: "Run", read: "ran", icon: "🏃", v1: "Run", v2: "Ran", v3: "Run" }, 
    { id: "Lompat", en: "Jump", read: "jamp", icon: "🦘", v1: "Jump", v2: "Jumped", v3: "Jumped" }, 
    { id: "Memanjat", en: "Climb", read: "klaim", icon: "🧗", v1: "Climb", v2: "Climbed", v3: "Climbed" }, 
    { id: "Melempar", en: "Throw", read: "throu", icon: "⚾", v1: "Throw", v2: "Threw", v3: "Thrown" }, 
    { id: "Menendang", en: "Kick", read: "kik", icon: "⚽", v1: "Kick", v2: "Kicked", v3: "Kicked" }, 
    { id: "Memukul", en: "Hit", read: "hit", icon: "🥊", v1: "Hit", v2: "Hit", v3: "Hit" }, 
    { id: "Terbang", en: "Fly", read: "flai", icon: "🦅", v1: "Fly", v2: "Flew", v3: "Flown" }
  ];
  const activityHome = [
    { id: "Makan", en: "Eat", read: "it", icon: "🍽️", v1: "Eat", v2: "Ate", v3: "Eaten" }, 
    { id: "Minum", en: "Drink", read: "dringk", icon: "🥤", v1: "Drink", v2: "Drank", v3: "Drunk" }, 
    { id: "Memasak", en: "Cook", read: "kuk", icon: "🍳", v1: "Cook", v2: "Cooked", v3: "Cooked" }, 
    { id: "Tidur", en: "Sleep", read: "slip", icon: "😴", v1: "Sleep", v2: "Slept", v3: "Slept" }, 
    { id: "Duduk", en: "Sit", read: "sit", icon: "🪑", v1: "Sit", v2: "Sat", v3: "Sat" }, 
    { id: "Membuka", en: "Open", read: "o-pen", icon: "🚪", v1: "Open", v2: "Opened", v3: "Opened" }, 
    { id: "Menutup", en: "Close", read: "klouz", icon: "🚪", v1: "Close", v2: "Closed", v3: "Closed" }, 
    { id: "Menyalakan", en: "Turn On", read: "tern on", icon: "💡", v1: "Turn on", v2: "Turned on", v3: "Turned on" }, 
    { id: "Mematikan", en: "Turn Off", read: "tern of", icon: "🔌", v1: "Turn off", v2: "Turned off", v3: "Turned off" }, 
    { id: "Menggunakan Pakaian / Sepatu", en: "Wear", read: "wer", icon: "👕", v1: "Wear", v2: "Wore", v3: "Worn" }, 
    { id: "Buang Air Kecil (Pipis)", en: "Pee", read: "pi", icon: "🚽", v1: "Pee", v2: "Peed", v3: "Peed" }, 
    { id: "Buang Air Besar (Eek)", en: "Poop", read: "pup", icon: "💩", v1: "Poop", v2: "Pooped", v3: "Pooped" }, 
    { id: "Mandi", en: "Take a bath", read: "teik e bath", icon: "🛁", v1: "Take a bath", v2: "Took a bath", v3: "Taken a bath" }, 
    { id: "Menggosok Gigi", en: "Brush teeth", read: "bras tith", icon: "🪥", v1: "Brush teeth", v2: "Brushed teeth", v3: "Brushed teeth" }, 
    { id: "Keramas", en: "Wash hair", read: "wos her", icon: "🧴", v1: "Wash hair", v2: "Washed hair", v3: "Washed hair" }
  ];
  const activityRural = [
    { id: "Menanam", en: "Plant", read: "plent", icon: "🌱", v1: "Plant", v2: "Planted", v3: "Planted" }, 
    { id: "Menyiram", en: "Water", read: "wo-ter", icon: "🚿", v1: "Water", v2: "Watered", v3: "Watered" }, 
    { id: "Memanen", en: "Harvest", read: "har-vest", icon: "🌾", v1: "Harvest", v2: "Harvested", v3: "Harvested" }, 
    { id: "Memancing", en: "Fish", read: "fis", icon: "🎣", v1: "Fish", v2: "Fished", v3: "Fished" }, 
    { id: "Mengendarai", en: "Ride", read: "raid", icon: "🚲", v1: "Ride", v2: "Rode", v3: "Ridden" }
  ];
  const activitySensesStudy = [
    { id: "Melihat", en: "See", read: "si", icon: "👀", v1: "See", v2: "Saw", v3: "Seen" }, 
    { id: "Mendengar", en: "Hear", read: "hir", icon: "👂", v1: "Hear", v2: "Heard", v3: "Heard" }, 
    { id: "Mendengarkan", en: "Listen", read: "lis-sen", icon: "🎧", v1: "Listen", v2: "Listened", v3: "Listened" }, 
    { id: "Menonton", en: "Watch", read: "woc", icon: "📺", v1: "Watch", v2: "Watched", v3: "Watched" }, 
    { id: "Membaca", en: "Read", read: "rid", icon: "📖", v1: "Read", v2: "Read", v3: "Read" }, 
    { id: "Menggambar", en: "Draw", read: "dro", icon: "🎨", v1: "Draw", v2: "Drew", v3: "Drawn" }, 
    { id: "Belajar", en: "Study", read: "sta-di", icon: "📚", v1: "Study", v2: "Studied", v3: "Studied" }, 
    { id: "Bernyanyi", en: "Sing", read: "sing", icon: "🎤", v1: "Sing", v2: "Sang", v3: "Sung" }, 
    { id: "Bermain", en: "Play", read: "plei", icon: "🪁", v1: "Play", v2: "Played", v3: "Played" }
  ];
  const activityEffort = [
    { id: "Membawa", en: "Bring", read: "bring", icon: "📦", v1: "Bring", v2: "Brought", v3: "Brought" }, 
    { id: "Mendorong", en: "Push", read: "pus", icon: "🛒", v1: "Push", v2: "Pushed", v3: "Pushed" }, 
    { id: "Menarik", en: "Pull", read: "pul", icon: "🪢", v1: "Pull", v2: "Pulled", v3: "Pulled" }, 
    { id: "Menggendong", en: "Carry", read: "ke-ri", icon: "🎒", v1: "Carry", v2: "Carried", v3: "Carried" }
  ];

  const aktivitasContoh = [
    { icon: "🎨", en: "I draw a train.", id: "Aku menggambar sebuah kereta.", read: "ai dro e trein.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Draw", meaning: "Menggambar (V1)" }, { word: "A", meaning: "Sebuah" }, { word: "Train", meaning: "Kereta" }], note: "Kata 'draw' adalah Verb 1 (V1). Digunakan untuk kebiasaan, fakta, atau sesuatu yang dilakukan di masa sekarang." },
    { icon: "🚂", en: "This morning, I drew a train. Now, I sing.", id: "Pagi ini, aku menggambar sebuah kereta. Sekarang, aku bernyanyi.", read: "dhis mor-ning, ai dru e trein. nau, ai sing.", breakdown: [{ word: "This morning", meaning: "Pagi ini" }, { word: "I", meaning: "Aku" }, { word: "Drew", meaning: "Menggambar (V2)" }, { word: "A train", meaning: "Sebuah kereta" }, { word: "Now", meaning: "Sekarang" }, { word: "Sing", meaning: "Bernyanyi (V1)" }], note: "Kata 'drew' adalah Verb 2 (V2) dari draw. Digunakan karena kejadiannya sudah lewat (pagi ini). Sedangkan 'sing' kembali ke V1 karena dilakukan sekarang (now)." },
    { icon: "⏳", en: "I have drawn for 2 years.", id: "Aku telah menggambar selama 2 tahun.", read: "ai hev dron for tu yirs.", breakdown: [{ word: "I have", meaning: "Aku telah" }, { word: "Drawn", meaning: "Menggambar (V3)" }, { word: "For", meaning: "Selama" }, { word: "2 (Two)", meaning: "Dua" }, { word: "Years", meaning: "Tahun" }], note: "Kata 'drawn' adalah Verb 3 (V3). Digunakan setelah kata bantu seperti 'have'/'has' untuk menyatakan sesuatu yang SUDAH atau TELAH dilakukan." },
    { icon: "👧🎨", en: "This drawing is drawn by Stella.", id: "Gambar ini digambar oleh Stella.", read: "dhis dro-wing is dron bai ste-la.", breakdown: [{ word: "This drawing", meaning: "Gambar ini" }, { word: "Is drawn", meaning: "Digambar (Pasif)" }, { word: "By", meaning: "Oleh" }, { word: "Stella", meaning: "Stella" }], note: "Verb 3 ('drawn') juga digunakan untuk kalimat pasif (Passive Voice), yang artinya dikenai tindakan (DIgambar, DIbaca, DImakan)." }
  ];

  // ==========================================
  // 6. DATA BUAH & SAYUR
  // ==========================================
  const buahBuahan = [
    { id: "Apel", en: "Apple", read: "e-pel", icon: "🍎" }, { id: "Pisang", en: "Banana", read: "ba-na-na", icon: "🍌" }, { id: "Jeruk", en: "Orange", read: "o-rinj", icon: "🍊" }, 
    { id: "Semangka", en: "Watermelon", read: "wo-ter-me-len", icon: "🍉" }, { id: "Mangga", en: "Mango", read: "meng-gou", icon: "🥭" }, { id: "Stroberi", en: "Strawberry", read: "stro-be-ri", icon: "🍓" }, 
    { id: "Nanas", en: "Pineapple", read: "pain-e-pel", icon: "🍍" }, { id: "Pepaya", en: "Papaya", read: "pa-pai-ya", icon: "🍈" },
  ];
  const buahContoh = [
    { icon: "🍎🍎", en: "I eat apples.", id: "Aku makan apel.", read: "ai it e-pels.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Eat", meaning: "Makan" }, { word: "Apples", meaning: "Apel (banyak)" }], note: "Kata 'eat' (tanpa -ing) digunakan untuk menyatakan kebiasaan umum atau hal yang sering dilakukan." },
    { icon: "🍎", en: "I am eating an apple.", id: "Aku sedang memakan sebuah apel.", read: "ai em i-ting en e-pel.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Am eating", meaning: "Sedang makan" }, { word: "An", meaning: "Sebuah" }, { word: "Apple", meaning: "Apel" }], note: "'am' + 'eating' berarti SEDANG dilakukan sekarang. Kata 'an' digunakan untuk 'sebuah' benda tunggal yang huruf awalnya vokal (A, I, U, E, O)." },
    { icon: "🍊🍊", en: "You eat oranges.", id: "Kamu makan jeruk.", read: "yu it o-rin-jes.", breakdown: [{ word: "You", meaning: "Kamu" }, { word: "Eat", meaning: "Makan" }, { word: "Oranges", meaning: "Jeruk (banyak)" }] },
    { icon: "🍊", en: "You are eating an orange.", id: "Kamu sedang memakan sebuah jeruk.", read: "yu ar i-ting en o-rinj.", breakdown: [{ word: "You", meaning: "Kamu" }, { word: "Are eating", meaning: "Sedang makan" }, { word: "An", meaning: "Sebuah" }, { word: "Orange", meaning: "Jeruk" }], note: "'are' + 'eating' digunakan untuk You yang SEDANG melakukan sesuatu. Dan perhatikan juga penggunaan 'an' untuk orange." },
    { icon: "🍌", en: "We eat banana.", id: "Kami makan pisang.", read: "wi it ba-na-na.", breakdown: [{ word: "We", meaning: "Kami" }, { word: "Eat", meaning: "Makan" }, { word: "Banana", meaning: "Pisang" }] },
    { icon: "🍌🍌🍌", en: "We are eating 3 bananas.", id: "Kami sedang memakan 3 pisang.", read: "wi ar i-ting thri ba-na-nas.", breakdown: [{ word: "We", meaning: "Kami" }, { word: "Are eating", meaning: "Sedang makan" }, { word: "3 (Three)", meaning: "Tiga" }, { word: "Bananas", meaning: "Pisang (Lebih dari 1)" }], note: "Ada tambahan huruf 's' di belakang kata banana (menjadi bananas) karena jumlahnya ada lebih dari satu (tiga)." },
    { icon: "🥭", en: "They eat mango.", id: "Mereka makan mangga.", read: "dhei it meng-gou.", breakdown: [{ word: "They", meaning: "Mereka" }, { word: "Eat", meaning: "Makan" }, { word: "Mango", meaning: "Mangga" }] },
    { icon: "🥭🥭🥭", en: "They are eating 5 mangos.", id: "Mereka sedang memakan 5 mangga.", read: "dhei ar i-ting faiv meng-gous.", breakdown: [{ word: "They", meaning: "Mereka" }, { word: "Are eating", meaning: "Sedang makan" }, { word: "5 (Five)", meaning: "Lima" }, { word: "Mangos", meaning: "Mangga (Lebih dari 1)" }] }
  ];

  const sayurSayuran = [
    { id: "Wortel", en: "Carrot", read: "ke-ret", icon: "🥕" }, { id: "Kentang", en: "Potato", read: "po-tei-tou", icon: "🥔" }, { id: "Jagung", en: "Corn", read: "korn", icon: "🌽" }, 
    { id: "Singkong", en: "Cassava", read: "ka-sa-va", icon: "🍠" }, { id: "Bayam", en: "Spinach", read: "spi-nic", icon: "🥬" }, { id: "Tomat", en: "Tomato", read: "to-ma-tou", icon: "🍅" }, 
    { id: "Cabai", en: "Chili", read: "ci-li", icon: "🌶️" }, { id: "Brokoli", en: "Broccoli", read: "bro-ko-li", icon: "🥦" }, { id: "Bawang", en: "Onion", read: "o-ni-yen", icon: "🧅" },
  ];

  // ==========================================
  // 7. DATA BENDA (HAL DI SEKITAR)
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
    { id: "Penghapus", en: "Eraser", read: "i-rei-ser", icon: "🧽" }, { id: "Papan Tulis Spidol", en: "Whiteboard", read: "wait-bord", icon: "📝" }, { id: "Papan Tulis Kapur", en: "Blackboard", read: "blek-bord", icon: "🏫" },
    { id: "Tas Sekolah", en: "School Bag", read: "skul beg", icon: "🎒" }
  ];
  const bendaAlam = [
    { id: "Air", en: "Water", read: "wo-ter", icon: "💧" }, { id: "Api", en: "Fire", read: "fai-yer", icon: "🔥" }, { id: "Pohon", en: "Tree", read: "tri", icon: "🌳" }, 
    { id: "Tumbuhan", en: "Plant", read: "plent", icon: "🪴" }, { id: "Bunga", en: "Flower", read: "flau-wer", icon: "🌸" }, { id: "Daun", en: "Leaf", read: "lif", icon: "🍃" }, 
    { id: "Rumput", en: "Grass", read: "gres", icon: "🌿" }, { id: "Batu", en: "Stone", read: "stoun", icon: "🪨" }, { id: "Kerikil", en: "Pebble", read: "pe-bel", icon: "🪨" }, 
    { id: "Pasir", en: "Sand", read: "send", icon: "🏜️" }, { id: "Jalanan", en: "Street", read: "strit", icon: "🛣️" }, { id: "Kayu", en: "Wood", read: "wud", icon: "🪵" }
  ];
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
  const convPosisi = [
    { icon: "📦", en: "The ball is in the box.", id: "Bola itu ada di dalam kotak.", read: "dhe bol is in dhe boks.", breakdown: [{ word: "The ball", meaning: "Bola itu" }, { word: "Is", meaning: "Ada" }, { word: "In", meaning: "Di dalam" }, { word: "The box", meaning: "Kotak itu" }], note: "'in' digunakan untuk posisi yang berada di dalam suatu ruang atau wadah." },
    { icon: "📕", en: "The book is on the table.", id: "Buku itu ada di atas meja.", read: "dhe buk is on dhe tei-bel.", breakdown: [{ word: "The book", meaning: "Buku itu" }, { word: "Is", meaning: "Ada" }, { word: "On", meaning: "Di atas" }, { word: "The table", meaning: "Meja itu" }], note: "'on' digunakan untuk sesuatu yang berada di atas dan menempel langsung pada permukaannya." },
    { icon: "🏫", en: "I am at school.", id: "Aku ada di sekolah.", read: "ai em et skul.", breakdown: [{ word: "I", meaning: "Aku" }, { word: "Am", meaning: "Ada" }, { word: "At", meaning: "Di" }, { word: "School", meaning: "Sekolah" }], note: "'at' digunakan untuk menunjukkan lokasi atau titik yang spesifik (seperti di sekolah, di rumah, di kantor)." },
    { icon: "🦅", en: "The bird flies above the tree.", id: "Burung itu terbang di atas pohon.", read: "dhe berd flais e-bav dhe tri.", breakdown: [{ word: "The bird", meaning: "Burung itu" }, { word: "Flies", meaning: "Terbang" }, { word: "Above", meaning: "Di atas" }, { word: "The tree", meaning: "Pohon itu" }], note: "'above' juga berarti di atas, tapi posisinya lebih tinggi dan TIDAK menempel (melayang atau menggantung)." },
    { icon: "🐈", en: "The cat sleeps under the chair.", id: "Kucing itu tidur di bawah kursi.", read: "dhe ket slips an-der dhe cer.", breakdown: [{ word: "The cat", meaning: "Kucing itu" }, { word: "Sleeps", meaning: "Tidur" }, { word: "Under", meaning: "Di bawah" }, { word: "The chair", meaning: "Kursi itu" }], note: "'under' berarti tepat di bawah suatu benda dan biasanya tertutupi oleh benda tersebut." },
    { icon: "🖼️", en: "The picture is below the clock.", id: "Gambar itu ada di bawah jam.", read: "dhe pik-cer is bi-lou dhe klok.", breakdown: [{ word: "The picture", meaning: "Gambar itu" }, { word: "Is", meaning: "Ada" }, { word: "Below", meaning: "Di bawah" }, { word: "The clock", meaning: "Jam itu" }], note: "'below' berarti posisinya lebih rendah dari benda lain, tapi tidak selalu tepat tertutupi di bawahnya." },
    { icon: "🏠", en: "The dog is inside the house.", id: "Anjing itu ada di dalam rumah.", read: "dhe dog is in-said dhe haus.", breakdown: [{ word: "The dog", meaning: "Anjing itu" }, { word: "Is", meaning: "Ada" }, { word: "Inside", meaning: "Di bagian dalam" }, { word: "The house", meaning: "Rumah itu" }], note: "'inside' hampir sama dengan 'in', tapi lebih menekankan bahwa benda itu benar-benar berada di bagian dalam ruangan." },
    { icon: "🪁", en: "We play outside.", id: "Kami bermain di luar.", read: "wi plei aut-said.", breakdown: [{ word: "We", meaning: "Kami" }, { word: "Play", meaning: "Bermain" }, { word: "Outside", meaning: "Di luar" }], note: "'outside' berarti berada di area luar suatu ruangan, wadah, atau bangunan." }
  ];

  // ==========================================
  // 9. DATA CERITA ANAK (STORYTELLING)
  // ==========================================
  const storyCrow = [
    { scene: 1, image: "/Gagak_yang_Haus/Gagak_yang_Haus_1.png", emoji: "🐦", en: "One hot day, a crow is very thirsty.", id: "Suatu hari yang panas, seekor gagak sangat kehausan.", read: "wan hot dei, e krou is ve-ri thers-ti.", breakdown: [{ word: "One", meaning: "Satu" }, { word: "Hot", meaning: "Panas" }, { word: "Day", meaning: "Hari" }, { word: "A", meaning: "Seekor" }, { word: "Crow", meaning: "Gagak" }, { word: "Is", meaning: "Adalah/Keadaan", note: "Kata 'is' digunakan karena gagaknya hanya ada satu (tunggal)." }, { word: "Very", meaning: "Sangat" }, { word: "Thirsty", meaning: "Haus" }] },
    { scene: 2, image: "/Gagak_yang_Haus/Gagak_yang_Haus_2.png", emoji: "🏺", en: "He sees a pitcher with a little water.", id: "Dia melihat sebuah kendi dengan sedikit air.", read: "hi sis e pi-cer with e li-tel wo-ter.", breakdown: [{ word: "He", meaning: "Dia (Laki-laki)" }, { word: "Sees", meaning: "Melihat", note: "see = melihat, menjadi sees karena he. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "A", meaning: "Sebuah" }, { word: "Pitcher", meaning: "Kendi" }, { word: "With", meaning: "Dengan" }, { word: "A little", meaning: "Sedikit" }, { word: "Water", meaning: "Air" }] },
    { scene: 3, image: "/Gagak_yang_Haus/Gagak_yang_Haus_3.png", emoji: "😕", en: "But, he cannot reach the water.", id: "Tapi, dia tidak bisa menjangkau air itu.", read: "bat, hi ken-not ric dhe wo-ter.", breakdown: [{ word: "But", meaning: "Tapi" }, { word: "He", meaning: "Dia" }, { word: "Cannot", meaning: "Tidak bisa" }, { word: "Reach", meaning: "Menjangkau" }, { word: "The", meaning: "Itu" }, { word: "Water", meaning: "Air" }] },
    { scene: 4, image: "/Gagak_yang_Haus/Gagak_yang_Haus_4.png", emoji: "🪨", en: "He drops stones into the pitcher.", id: "Dia menjatuhkan batu-batu ke dalam kendi.", read: "hi drops stouns in-tu dhe pi-cer.", breakdown: [{ word: "He", meaning: "Dia" }, { word: "Drops", meaning: "Menjatuhkan", note: "drop = menjatuhkan, menjadi drops karena he. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Stones", meaning: "Batu-batu", note: "stone = batu, stones = batunya lebih dari satu (jamak)." }, { word: "Into", meaning: "Ke dalam" }, { word: "The", meaning: "Itu" }, { word: "Pitcher", meaning: "Kendi" }] },
    { scene: 5, image: "/Gagak_yang_Haus/Gagak_yang_Haus_5.png", emoji: "💧", en: "The water goes up, and the crow drinks.", id: "Air naik, dan gagak itu minum.", read: "dhe wo-ter gous ap, en dhe krou drinks.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Water", meaning: "Air" }, { word: "Goes up", meaning: "Naik", note: "go = pergi/naik, menjadi goes karena water dianggap tunggal. Verb (kata kerja) ditambah 'es' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 'es' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "And", meaning: "Dan" }, { word: "The", meaning: "Itu" }, { word: "Crow", meaning: "Gagak" }, { word: "Drinks", meaning: "Minum", note: "drink = minum, menjadi drinks karena gagak (crow) tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }] }
  ];

  const storyRabbit = [
    { scene: 1, image: "/Kelinci_dan_Kura_Kura/Kelinci_dan_Kura_Kura_1.png", emoji: "🐇", en: "The rabbit can run very fast.", id: "Kelinci bisa berlari sangat cepat.", read: "dhe re-bit ken ran ve-ri fest.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Rabbit", meaning: "Kelinci" }, { word: "Can", meaning: "Bisa" }, { word: "Run", meaning: "Berlari" }, { word: "Very", meaning: "Sangat" }, { word: "Fast", meaning: "Cepat" }] },
    { scene: 2, image: "/Kelinci_dan_Kura_Kura/Kelinci_dan_Kura_Kura_2.png", emoji: "🐢", en: "The turtle walks very slowly.", id: "Kura-kura berjalan sangat lambat.", read: "dhe ter-tel woks ve-ri slou-li.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Turtle", meaning: "Kura-kura" }, { word: "Walks", meaning: "Berjalan", note: "walk = berjalan, menjadi walks karena turtle tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Very", meaning: "Sangat" }, { word: "Slowly", meaning: "Dengan lambat", note: "slow = lambat, slowly = dengan lambat." }] },
    { scene: 3, image: "/Kelinci_dan_Kura_Kura/Kelinci_dan_Kura_Kura_3.png", emoji: "🏁", en: "They race. The rabbit runs far ahead.", id: "Mereka berlomba. Kelinci berlari jauh di depan.", read: "dhei reis. dhe re-bit rans far e-hed.", breakdown: [{ word: "They", meaning: "Mereka" }, { word: "Race", meaning: "Berlomba" }, { word: "The", meaning: "Itu" }, { word: "Rabbit", meaning: "Kelinci" }, { word: "Runs", meaning: "Berlari", note: "run = berlari, menjadi runs karena rabbit tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Far", meaning: "Jauh" }, { word: "Ahead", meaning: "Di depan" }] },
    { scene: 4, image: "/Kelinci_dan_Kura_Kura/Kelinci_dan_Kura_Kura_4.png", emoji: "😴", en: "The rabbit sleeps under a tree.", id: "Kelinci tidur di bawah sebuah pohon.", read: "dhe re-bit slips an-der e tri.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Rabbit", meaning: "Kelinci" }, { word: "Sleeps", meaning: "Tidur", note: "sleep = tidur, menjadi sleeps karena rabbit tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Under", meaning: "Di bawah" }, { word: "A", meaning: "Sebuah" }, { word: "Tree", meaning: "Pohon" }] },
    { scene: 5, image: "/Kelinci_dan_Kura_Kura/Kelinci_dan_Kura_Kura_5.png", emoji: "🏆", en: "The turtle keeps walking and wins!", id: "Kura-kura terus berjalan dan menang!", read: "dhe ter-tel kips wo-king en wins!", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Turtle", meaning: "Kura-kura" }, { word: "Keeps", meaning: "Terus", note: "keep = terus/menjaga, menjadi keeps karena turtle tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Walking", meaning: "Berjalan", note: "walk = berjalan, walking = sedang berjalan." }, { word: "And", meaning: "Dan" }, { word: "Wins", meaning: "Menang", note: "win = menang, menjadi wins karena turtle tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }] }
  ];

  const storyTimunMas = [
    { scene: 1, image: "", emoji: "👹", en: "An old widow gets a magic seed from a scary giant.", id: "Seorang janda tua mendapat biji ajaib dari raksasa menakutkan.", read: "en ould wi-dou gets e me-jik sid from e ske-ri jai-yent.", breakdown: [{ word: "An", meaning: "Seorang", note: "'an' digunakan karena kata berikutnya (old) berawalan bunyi vokal (A, I, U, E, O)." }, { word: "Old", meaning: "Tua" }, { word: "Widow", meaning: "Janda" }, { word: "Gets", meaning: "Mendapat", note: "get = mendapat, menjadi gets karena widow tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "A", meaning: "Sebuah" }, { word: "Magic", meaning: "Ajaib" }, { word: "Seed", meaning: "Biji" }, { word: "From", meaning: "Dari" }, { word: "A", meaning: "Seorang" }, { word: "Scary", meaning: "Menakutkan" }, { word: "Giant", meaning: "Raksasa" }] },
    { scene: 2, image: "", emoji: "🥒", en: "The seed grows into a big golden cucumber with a baby girl inside.", id: "Biji itu tumbuh menjadi mentimun emas besar berisi bayi perempuan.", read: "dhe sid grous in-tu e big gol-den kyu-kam-ber widh e bei-bi gerl in-said.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Seed", meaning: "Biji" }, { word: "Grows", meaning: "Tumbuh", note: "grow = tumbuh, menjadi grows karena seed tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Into", meaning: "Menjadi" }, { word: "A", meaning: "Sebuah" }, { word: "Big", meaning: "Besar" }, { word: "Golden", meaning: "Emas" }, { word: "Cucumber", meaning: "Mentimun" }, { word: "With", meaning: "Dengan" }, { word: "A", meaning: "Seorang" }, { word: "Baby", meaning: "Bayi" }, { word: "Girl", meaning: "Perempuan" }, { word: "Inside", meaning: "Di dalam" }] },
    { scene: 3, image: "", emoji: "👧", en: "She is named Timun Mas. She grows into a brave and beautiful girl.", id: "Dia diberi nama Timun Mas. Dia tumbuh menjadi gadis yang berani dan cantik.", read: "si is neimd ti-mun mas. si grous in-tu e breiv en byu-ti-ful gerl.", breakdown: [{ word: "She", meaning: "Dia" }, { word: "Is named", meaning: "Diberi nama", note: "name = nama. is named = diberi nama (pasif)." }, { word: "Timun Mas", meaning: "Timun Mas" }, { word: "She", meaning: "Dia" }, { word: "Grows", meaning: "Tumbuh", note: "grow = tumbuh, menjadi grows karena she. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Into", meaning: "Menjadi" }, { word: "A", meaning: "Seorang" }, { word: "Brave", meaning: "Berani" }, { word: "And", meaning: "Dan" }, { word: "Beautiful", meaning: "Cantik" }, { word: "Girl", meaning: "Gadis/Anak" }] },
    { scene: 4, image: "", emoji: "🏃‍♀️", en: "The giant comes back to eat her! Timun Mas runs away very fast.", id: "Raksasa itu kembali untuk memakannya! Timun Mas berlari sangat cepat.", read: "dhe jai-yent kams bek tu it her! ti-mun mas rans e-wei ve-ri fest.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Giant", meaning: "Raksasa" }, { word: "Comes back", meaning: "Kembali", note: "come = datang/kembali, menjadi comes karena giant tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "To", meaning: "Untuk" }, { word: "Eat", meaning: "Makan" }, { word: "Her", meaning: "Dia" }, { word: "Timun Mas", meaning: "Timun Mas" }, { word: "Runs away", meaning: "Berlari kabur", note: "run = lari, menjadi runs karena Timun Mas tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Very", meaning: "Sangat" }, { word: "Fast", meaning: "Cepat" }] },
    { scene: 5, image: "", emoji: "🌊", en: "She throws magic salt. It becomes a very deep and wide sea!", id: "Dia melempar garam ajaib. Itu menjadi lautan yang sangat dalam dan luas!", read: "si throus me-jik solt. it bi-kams e ve-ri dip en waid si!", breakdown: [{ word: "She", meaning: "Dia" }, { word: "Throws", meaning: "Melempar", note: "throw = melempar, menjadi throws karena she. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Magic", meaning: "Ajaib" }, { word: "Salt", meaning: "Garam" }, { word: "It", meaning: "Itu" }, { word: "Becomes", meaning: "Menjadi", note: "become = menjadi, menjadi becomes karena it. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "A", meaning: "Sebuah" }, { word: "Very", meaning: "Sangat" }, { word: "Deep", meaning: "Dalam" }, { word: "And", meaning: "Dan" }, { word: "Wide", meaning: "Luas" }, { word: "Sea", meaning: "Lautan" }] },
    { scene: 6, image: "", emoji: "🌋", en: "Finally, she throws magic mud. The giant sinks and Timun Mas is safe!", id: "Akhirnya, dia melempar lumpur ajaib. Raksasa itu tenggelam dan Timun Mas selamat!", read: "fai-ne-li, si throus me-jik mad. dhe jai-yent sinks en ti-mun mas is seif!", breakdown: [{ word: "Finally", meaning: "Akhirnya" }, { word: "She", meaning: "Dia" }, { word: "Throws", meaning: "Melempar", note: "throw = melempar, menjadi throws karena she. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Magic", meaning: "Ajaib" }, { word: "Mud", meaning: "Lumpur" }, { word: "The", meaning: "Itu" }, { word: "Giant", meaning: "Raksasa" }, { word: "Sinks", meaning: "Tenggelam", note: "sink = tenggelam, menjadi sinks karena giant tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "And", meaning: "Dan" }, { word: "Timun Mas", meaning: "Timun Mas" }, { word: "Is", meaning: "Keadaan" }, { word: "Safe", meaning: "Aman/Selamat" }] }
  ];

  const storyKancil = [
    { scene: 1, image: "", emoji: "🦌", en: "A smart mouse deer is walking in the forest. He is very hungry.", id: "Seekor kancil yang pintar sedang berjalan di hutan. Dia sangat lapar.", read: "e smart maus dir is wo-king in dhe fo-rest. hi is ve-ri hang-gri.", breakdown: [{ word: "A", meaning: "Seekor" }, { word: "Smart", meaning: "Pintar" }, { word: "Mouse deer", meaning: "Kancil" }, { word: "Is walking", meaning: "Sedang berjalan", note: "walk = berjalan, is walking = sedang berjalan." }, { word: "In", meaning: "Di dalam" }, { word: "The", meaning: "Itu" }, { word: "Forest", meaning: "Hutan" }, { word: "He", meaning: "Dia" }, { word: "Is", meaning: "Keadaan" }, { word: "Very", meaning: "Sangat" }, { word: "Hungry", meaning: "Lapar" }] },
    { scene: 2, image: "", emoji: "🍎", en: "He sees yummy red apples across a big and dangerous river.", id: "Dia melihat apel merah yang lezat di seberang sungai yang besar dan berbahaya.", read: "hi sis ya-mi red e-pels e-kros e big en dein-je-res ri-ver.", breakdown: [{ word: "He", meaning: "Dia" }, { word: "Sees", meaning: "Melihat", note: "see = melihat, menjadi sees karena he. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Yummy", meaning: "Lezat" }, { word: "Red", meaning: "Merah" }, { word: "Apples", meaning: "Apel-apel", note: "apple = apel, apples = apelnya lebih dari satu." }, { word: "Across", meaning: "Di seberang" }, { word: "A", meaning: "Sebuah" }, { word: "Big", meaning: "Besar" }, { word: "And", meaning: "Dan" }, { word: "Dangerous", meaning: "Berbahaya" }, { word: "River", meaning: "Sungai" }] },
    { scene: 3, image: "", emoji: "🐊", en: "But the river is full of big, green, and hungry crocodiles!", id: "Tapi sungai itu penuh dengan buaya yang besar, hijau, dan lapar!", read: "bat dhe ri-ver is ful of big, grin, en hang-gri kro-ko-dails!", breakdown: [{ word: "But", meaning: "Tapi" }, { word: "The", meaning: "Itu" }, { word: "River", meaning: "Sungai" }, { word: "Is", meaning: "Adalah" }, { word: "Full of", meaning: "Penuh dengan" }, { word: "Big", meaning: "Besar" }, { word: "Green", meaning: "Hijau" }, { word: "And", meaning: "Dan" }, { word: "Hungry", meaning: "Lapar" }, { word: "Crocodiles", meaning: "Buaya-buaya", note: "crocodile = buaya, crocodiles = buayanya lebih dari satu." }] },
    { scene: 4, image: "", emoji: "💡", en: "The mouse deer has a bright idea. He calls the crocodiles to line up.", id: "Kancil punya ide cemerlang. Dia memanggil buaya-buaya untuk berbaris.", read: "dhe maus dir hes e brait ai-di-ya. hi kols dhe kro-ko-dails tu lain ap.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "Mouse deer", meaning: "Kancil" }, { word: "Has", meaning: "Punya", note: "have = punya, berubah menjadi has karena membicarakan orang/benda lain yang tunggal. Jika subjeknya aku (I) atau kamu (You), tetap menggunakan 'have'." }, { word: "A", meaning: "Sebuah" }, { word: "Bright", meaning: "Cemerlang" }, { word: "Idea", meaning: "Ide" }, { word: "He", meaning: "Dia" }, { word: "Calls", meaning: "Memanggil", note: "call = memanggil, menjadi calls karena he. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "The", meaning: "Itu" }, { word: "Crocodiles", meaning: "Buaya-buaya" }, { word: "To", meaning: "Untuk" }, { word: "Line up", meaning: "Berbaris" }] },
    { scene: 5, image: "", emoji: "🌉", en: "The king wants to count you! he says. The crocodiles make a long bridge.", id: "Raja ingin menghitung kalian! katanya. Buaya-buaya membuat jembatan yang panjang.", read: "dhe king wonts tu kaunt yu! hi seis. dhe kro-ko-dails meik e long brij.", breakdown: [{ word: "The", meaning: "Itu" }, { word: "King", meaning: "Raja" }, { word: "Wants", meaning: "Ingin", note: "want = ingin, menjadi wants karena king tunggal. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "To", meaning: "Untuk" }, { word: "Count", meaning: "Menghitung" }, { word: "You", meaning: "Kalian" }, { word: "He", meaning: "Dia" }, { word: "Says", meaning: "Berkata", note: "say = berkata, menjadi says karena he. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "The", meaning: "Itu" }, { word: "Crocodiles", meaning: "Buaya-buaya" }, { word: "Make", meaning: "Membuat", note: "tetap make (tanpa s) karena crocodiles jamak/lebih dari satu." }, { word: "A", meaning: "Sebuah" }, { word: "Long", meaning: "Panjang" }, { word: "Bridge", meaning: "Jembatan" }] },
    { scene: 6, image: "", emoji: "😆", en: "He jumps on their heads and crosses safely. Now he can eat the apples!", id: "Dia melompat di atas kepala mereka dan menyeberang dengan aman. Sekarang dia bisa makan apel!", read: "hi jamps on dheir heds en kro-ses seif-li. nau hi ken it dhe e-pels!", breakdown: [{ word: "He", meaning: "Dia" }, { word: "Jumps", meaning: "Melompat", note: "jump = melompat, menjadi jumps karena he. Verb (kata kerja) ditambah 's' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 's' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "On", meaning: "Di atas" }, { word: "Their", meaning: "Mereka punya" }, { word: "Heads", meaning: "Kepala-kepala", note: "head = kepala, heads = kepalanya banyak." }, { word: "And", meaning: "Dan" }, { word: "Crosses", meaning: "Menyeberang", note: "cross = menyeberang, ditambah es karena he. Verb (kata kerja) ditambah 'es' digunakan ketika membicarakan orang/benda lain yang tunggal (berjumlah 1). Verb tidak ditambah 'es' apabila yang tunggal itu adalah aku (I) dan kamu (You)." }, { word: "Safely", meaning: "Dengan aman", note: "safe = aman, safely = dengan aman." }, { word: "Now", meaning: "Sekarang" }, { word: "He", meaning: "Dia" }, { word: "Can", meaning: "Bisa" }, { word: "Eat", meaning: "Makan" }, { word: "The", meaning: "Itu" }, { word: "Apples", meaning: "Apel-apel" }] }
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
                <span className="text-4xl mb-2 drop-shadow-sm tracking-widest text-black font-black">{item.icon || item.num}</span>
                <span className="text-sm font-bold text-gray-500">{item.id}</span>
                <span className="text-xl font-black text-gray-900 leading-tight">{item.en}</span>
                <span className="text-xs font-bold text-orange-500 mt-1 mb-1">Dibaca: "{item.read}"</span>
                {item.v1 && (
                  <div className="mt-2 text-[11px] font-bold text-gray-600 bg-white/60 px-3 py-2 rounded-lg border border-gray-200 w-fit">
                    <div className="flex gap-3">
                      <span><span className="text-blue-600 font-black">V1:</span> {item.v1}</span>
                      <span><span className="text-green-600 font-black">V2:</span> {item.v2}</span>
                      <span><span className="text-rose-600 font-black">V3:</span> {item.v3}</span>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => playAudio(item.audio || item.en)} className={`${tSplit[4]} ${tSplit[5]} active:translate-y-1 w-14 h-14 rounded-full flex flex-shrink-0 items-center justify-center ${tSplit[3]} transition-all ml-4`}>
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
              <p className="text-sm font-bold text-orange-500 bg-orange-100 px-4 py-1.5 rounded-full mb-6">Dibaca: "{animal.read}"</p>
              <button onClick={() => playAudio(animal.en)} className="bg-green-500 hover:bg-green-600 active:bg-green-700 active:translate-y-1 w-full py-4 rounded-2xl flex items-center justify-center gap-3 shadow-[0_6px_0_#15803D] transition-all">
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
            {item.icon && (<div className="text-[55px] text-center mb-4 drop-shadow-md tracking-widest leading-none">{item.icon}</div>)}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col w-full pr-4">
                <span className="text-sm font-bold text-gray-500 mb-1">{item.id}</span>
                <span className="text-xl font-black text-gray-900 leading-snug mb-1">{item.en}</span>
                <span className="text-xs font-bold text-orange-500">Dibaca: "{item.read}"</span>
              </div>
              <button onClick={() => playAudio(item.en)} className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 active:translate-y-1 w-14 h-14 rounded-full flex flex-shrink-0 items-center justify-center shadow-[0_4px_0_#4338CA] transition-all">
                <span className="text-2xl text-white">🔊</span>
              </button>
            </div>
            {item.breakdown && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-indigo-200">
                <p className="text-xs font-black text-indigo-400 mb-2 uppercase tracking-wider">Penjelasan Per Kata:</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2">
                  {item.breakdown.map((b, i) => (
                    <div key={i} className="flex items-center text-[13px] leading-tight bg-indigo-100/50 px-2 py-1 rounded-md">
                      <span className="font-black text-indigo-700 mr-1">{b.word}</span>
                      <span className="text-indigo-300 mr-1">=</span>
                      <span className="font-bold text-gray-700">{b.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {item.note && (
              <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-xl">
                <p className="text-[12px] font-bold text-yellow-800 leading-tight">💡 <span className="font-black">Catatan:</span> {item.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // KOMPONEN BARU: Kartu Breakdown Kosakata Cerita Anak dengan Dropdown Note
  const StoryBreakdownCard = ({ b }) => {
    const [showNote, setShowNote] = useState(false);
    return (
      <div className="flex flex-col bg-amber-50 p-3 rounded-xl border border-amber-100 shadow-sm text-center h-fit">
        <span className="font-black text-amber-600 text-[16px] mb-1">{b.word}</span>
        <span className="font-bold text-gray-500 text-[13px]">{b.meaning}</span>
        
        {b.note && (
          <div className="mt-2 flex flex-col w-full">
            <button 
              onClick={() => setShowNote(!showNote)}
              className="flex items-center justify-between bg-amber-200/50 hover:bg-amber-300/50 active:scale-95 text-amber-800 text-[11px] font-black px-2 py-1.5 rounded-md transition-all w-full"
            >
              <span>💡 Penjelasan</span>
              <span className="text-[9px]">{showNote ? '▲' : '▼'}</span>
            </button>
            {showNote && (
              <div className="mt-1 text-[11px] font-bold text-amber-900 bg-amber-100/50 px-2 py-2 rounded-md leading-tight text-left border border-amber-200/50">
                {b.note}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const StoryGroup = ({ data }) => {
    return (
      <div className="flex flex-col gap-10 w-full">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col bg-white rounded-[2rem] shadow-sm border-2 border-gray-100 overflow-hidden">
            <div className="relative w-full flex justify-center items-center bg-gray-50 pt-4">
              <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white font-black px-4 py-1.5 rounded-full text-xs shadow-md">Adegan {item.scene} dari {data.length}</div>
              {item.image ? (
                <Image src={item.image} alt={`Scene ${item.scene}`} width={800} height={800} className="w-full h-auto max-h-[50vh] object-contain" priority={idx === 0} />
              ) : (
                <span className="text-[150px] drop-shadow-md py-16">{item.emoji}</span>
              )}
            </div>
            <div className="px-6 py-8">
              <div className="flex flex-col text-center w-full mb-6">
                <span className="text-[26px] font-black text-gray-900 leading-snug mb-2">{item.en}</span>
                <span className="text-[16px] font-bold text-gray-600 mb-3">"{item.id}"</span>
                <span className="text-[14px] font-bold text-orange-500 bg-orange-100 px-4 py-1.5 rounded-full mx-auto w-fit">Cara baca: {item.read}</span>
              </div>
              <button onClick={() => playAudio(item.en)} className="mx-auto bg-amber-500 hover:bg-amber-600 active:bg-amber-700 active:translate-y-1 w-full py-4 rounded-2xl flex items-center justify-center gap-3 shadow-[0_6px_0_#B45309] transition-all mb-6">
                <span className="text-3xl text-white">🔊</span>
                <span className="text-white font-black text-xl">Dengarkan</span>
              </button>
              {item.breakdown && (
                <div className="pt-5 border-t-2 border-dashed border-amber-200">
                  <p className="text-[13px] font-black text-amber-700 mb-3 uppercase tracking-wider text-center">💡 Kosakata Kunci:</p>
                  <div className="grid grid-cols-2 gap-3 items-start">
                    {item.breakdown.map((b, i) => (
                      <StoryBreakdownCard key={i} b={b} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`relative mx-auto w-full max-w-md h-[100dvh] overflow-hidden font-sans ${activeMenu.startsWith('story_') ? 'bg-white' : ''}`}>
      {!activeMenu.startsWith("story_") && (
        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ backgroundImage: "url('/bg-forest.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      <div ref={scrollContainerRef} className="relative z-10 h-full w-full overflow-y-auto">
        <div className={`bg-white p-5 shadow-sm flex items-center justify-between sticky top-0 z-50 ${activeMenu.startsWith('story_') ? '' : 'rounded-b-3xl'}`}>
          <div className="flex items-center gap-4">
            {activeMenu === "utama" ? (
              <Link href="/" className="bg-orange-100 text-orange-600 p-2 rounded-xl font-bold active:scale-95 transition-transform">⬅️ Kembali</Link>
            ) : (
              <button onClick={handleBack} className="bg-orange-100 text-orange-600 p-2 rounded-xl font-bold active:scale-95 transition-transform">⬅️ Kembali</button>
            )}
            <h1 className="text-xl font-black text-gray-800 line-clamp-1">{getHeaderTitle()}</h1>
          </div>
          {(["angka", "orang", "hewan", "buah", "aktivitas"].includes(activeMenu)) && (
            <button onClick={() => setActiveMenu(activeMenu + "_contoh")} className="bg-purple-100 text-purple-700 px-3 py-2 rounded-xl font-bold text-sm active:scale-95 transition-transform whitespace-nowrap shadow-sm border-2 border-purple-200 shrink-0">💡 Contoh</button>
          )}
        </div>

        <div className={activeMenu.startsWith("story_") ? "pb-12" : "p-5 pb-12"}>
          
          {/* MENU UTAMA */}
          {activeMenu === "utama" && (
            <div className="flex flex-col gap-5 mt-4">
              <button onClick={() => setActiveMenu("kosakata")} className="w-full bg-[#3B82F6] active:translate-y-1 text-white py-8 rounded-[2rem] shadow-[0_8px_0_#1D4ED8] transition-all flex flex-col items-center justify-center gap-2">
                <span className="text-6xl drop-shadow-md mb-1">📖</span><span className="font-black text-3xl tracking-wide leading-none">Kosakata</span><span className="font-bold text-lg text-blue-200">Vocabulary</span>
              </button>
              <button onClick={() => setActiveMenu("percakapan")} className="w-full bg-[#8B5CF6] active:translate-y-1 text-white py-8 rounded-[2rem] shadow-[0_8px_0_#6D28D9] transition-all flex flex-col items-center justify-center gap-2">
                <span className="text-6xl drop-shadow-md mb-1">💬</span><span className="font-black text-3xl tracking-wide leading-none">Percakapan</span><span className="font-bold text-lg text-violet-200">Conversation</span>
              </button>
              <button onClick={() => setActiveMenu("cerita")} className="w-full bg-[#EAB308] active:translate-y-1 text-white py-8 rounded-[2rem] shadow-[0_8px_0_#A16207] transition-all flex flex-col items-center justify-center gap-2">
                <span className="text-6xl drop-shadow-md mb-1">📚</span><span className="font-black text-3xl tracking-wide leading-none">Cerita Anak</span><span className="font-bold text-lg text-amber-200">Children's Stories</span>
              </button>
            </div>
          )}

          {/* SUB MENU KOSAKATA */}
          {activeMenu === "kosakata" && (
            <div className="flex flex-col gap-4 mt-2">
              <button onClick={() => setActiveMenu("alfabet")} className="w-full bg-[#3B82F6] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#1D4ED8] transition-all flex items-center px-6 gap-5"><span className="text-4xl drop-shadow-md w-12 text-center">🔤</span><div className="flex flex-col flex-1 text-left"><span className="font-black text-xl leading-none">Alfabet</span><span className="text-sm text-blue-200 font-bold mt-1">Alphabet</span></div></button>
              <button onClick={() => setActiveMenu("angka")} className="w-full bg-[#A855F7] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#7E22CE] transition-all flex items-center px-6 gap-5"><span className="text-4xl drop-shadow-md w-12 text-center">🔢</span><div className="flex flex-col flex-1 text-left"><span className="font-black text-xl leading-none">Angka</span><span className="text-sm text-purple-200 font-bold mt-1">Numbers</span></div></button>
              <button onClick={() => setActiveMenu("orang")} className="w-full bg-[#EC4899] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#BE185D] transition-all flex items-center px-6 gap-5"><span className="text-4xl drop-shadow-md w-12 text-center">👨‍👩‍👧‍👦</span><div className="flex flex-col flex-1 text-left"><span className="font-black text-xl leading-none">Orang</span><span className="text-sm text-pink-200 font-bold mt-1">People</span></div></button>
              <button onClick={() => setActiveMenu("hewan")} className="w-full bg-[#22C55E] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#15803D] transition-all flex items-center px-6 gap-5"><span className="text-4xl drop-shadow-md w-12 text-center">🦁</span><div className="flex flex-col flex-1 text-left"><span className="font-black text-xl leading-none">Hewan</span><span className="text-sm text-green-200 font-bold mt-1">Animals</span></div></button>
              <button onClick={() => setActiveMenu("buah")} className="w-full bg-[#F43F5E] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#BE123C] transition-all flex items-center px-6 gap-5"><span className="text-4xl drop-shadow-md w-12 text-center">🍎</span><div className="flex flex-col flex-1 text-left"><span className="font-black text-xl leading-none">Buah</span><span className="text-sm text-rose-200 font-bold mt-1">Fruits</span></div></button>
              <button onClick={() => setActiveMenu("sayur")} className="w-full bg-[#10B981] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#047857] transition-all flex items-center px-6 gap-5"><span className="text-4xl drop-shadow-md w-12 text-center">🥕</span><div className="flex flex-col flex-1 text-left"><span className="font-black text-xl leading-none">Sayuran</span><span className="text-sm text-emerald-200 font-bold mt-1">Vegetables</span></div></button>
              <button onClick={() => setActiveMenu("benda")} className="w-full bg-[#F59E0B] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#B45309] transition-all flex items-center px-6 gap-5"><span className="text-4xl drop-shadow-md w-12 text-center">🏠</span><div className="flex flex-col flex-1 text-left"><span className="font-black text-xl leading-none">Di Sekitar</span><span className="text-sm text-amber-200 font-bold mt-1">Around Us</span></div></button>
              <button onClick={() => setActiveMenu("aktivitas")} className="w-full bg-[#14B8A6] active:translate-y-1 text-white py-4 rounded-[1.5rem] shadow-[0_6px_0_#0F766E] transition-all flex items-center px-6 gap-5"><span className="text-4xl drop-shadow-md w-12 text-center">🏃</span><div className="flex flex-col flex-1 text-left"><span className="font-black text-xl leading-none">Aktivitas</span><span className="text-sm text-teal-200 font-bold mt-1">Activities</span></div></button>
            </div>
          )}

          {/* SUB MENU PERCAKAPAN */}
          {activeMenu === "percakapan" && (
            <div className="flex flex-col gap-4 mt-2">
              <button onClick={() => setActiveMenu("conv_perkenalan")} className="w-full bg-[#8B5CF6] active:translate-y-1 text-white py-6 rounded-[1.5rem] shadow-[0_6px_0_#6D28D9] transition-all flex flex-col items-center justify-center gap-1"><span className="text-5xl drop-shadow-md mb-1">👋</span><span className="font-black text-2xl leading-none">Cara Berkenalan</span><span className="text-sm font-bold text-violet-200 mt-1">Introductions</span></button>
              <button onClick={() => setActiveMenu("conv_kabar")} className="w-full bg-[#6366F1] active:translate-y-1 text-white py-6 rounded-[1.5rem] shadow-[0_6px_0_#4F46E5] transition-all flex flex-col items-center justify-center gap-1"><span className="text-5xl drop-shadow-md mb-1">❓</span><span className="font-black text-2xl leading-none">Menanyakan Kabar</span><span className="text-sm font-bold text-indigo-200 mt-1">Greetings</span></button>
              <button onClick={() => setActiveMenu("conv_sehari")} className="w-full bg-[#0EA5E9] active:translate-y-1 text-white py-6 rounded-[1.5rem] shadow-[0_6px_0_#0369A1] transition-all flex flex-col items-center justify-center gap-1"><span className="text-5xl drop-shadow-md mb-1">🗣️</span><span className="font-black text-2xl leading-none">Sehari-Hari</span><span className="text-sm font-bold text-sky-200 mt-1">Daily Conversations</span></button>
              <button onClick={() => setActiveMenu("conv_posisi")} className="w-full bg-[#10B981] active:translate-y-1 text-white py-6 rounded-[1.5rem] shadow-[0_6px_0_#047857] transition-all flex flex-col items-center justify-center gap-1"><span className="text-5xl drop-shadow-md mb-1">📍</span><span className="font-black text-2xl leading-none">Posisi & Letak</span><span className="text-sm font-bold text-emerald-200 mt-1">Positions</span></button>
            </div>
          )}

          {/* SUB MENU CERITA */}
          {activeMenu === "cerita" && (
            <div className="flex flex-col gap-5 mt-2">
              <button onClick={() => setActiveMenu("story_crow")} className="w-full bg-[#F59E0B] active:translate-y-1 text-white py-8 rounded-[1.5rem] shadow-[0_6px_0_#B45309] transition-all flex flex-col items-center justify-center gap-2 border-4 border-amber-300"><span className="text-6xl drop-shadow-md">🐦</span><span className="font-black text-2xl mt-2 text-center leading-tight">Gagak yang Haus</span><span className="text-sm text-amber-100 font-bold tracking-wide">The Thirsty Crow</span></button>
              <button onClick={() => setActiveMenu("story_rabbit")} className="w-full bg-[#10B981] active:translate-y-1 text-white py-8 rounded-[1.5rem] shadow-[0_6px_0_#047857] transition-all flex flex-col items-center justify-center gap-2 border-4 border-emerald-300"><span className="text-6xl drop-shadow-md">🐢</span><span className="font-black text-2xl mt-2 text-center leading-tight">Kelinci & Kura-Kura</span><span className="text-sm text-emerald-100 font-bold tracking-wide">The Rabbit & The Turtle</span></button>
              <button onClick={() => setActiveMenu("story_timun_mas")} className="w-full bg-[#EC4899] active:translate-y-1 text-white py-8 rounded-[1.5rem] shadow-[0_6px_0_#BE185D] transition-all flex flex-col items-center justify-center gap-2 border-4 border-pink-300"><span className="text-6xl drop-shadow-md">👹</span><span className="font-black text-2xl mt-2 text-center leading-tight">Timun Mas & Raksasa</span><span className="text-sm text-pink-100 font-bold tracking-wide">The Golden Cucumber</span></button>
              <button onClick={() => setActiveMenu("story_kancil")} className="w-full bg-[#0EA5E9] active:translate-y-1 text-white py-8 rounded-[1.5rem] shadow-[0_6px_0_#0369A1] transition-all flex flex-col items-center justify-center gap-2 border-4 border-sky-300"><span className="text-6xl drop-shadow-md">🦌</span><span className="font-black text-2xl mt-2 text-center leading-tight">Kancil & Buaya</span><span className="text-sm text-sky-100 font-bold tracking-wide">The Smart Mouse Deer</span></button>
            </div>
          )}

          {/* KONTEN KOSAKATA */}
          {activeMenu === "alfabet" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50 space-y-6">
              <div className="grid grid-cols-4 gap-3">
                {alphabets.map((item) => (
                  <button key={item.letter} onClick={() => playAudio(item.letter)} className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 active:bg-blue-200 active:translate-y-1 p-3 rounded-2xl border-b-4 border-blue-200 transition-all"><span className="text-2xl font-black text-gray-800">{item.letter}</span><span className="text-[11px] font-bold text-orange-500 mt-1">"{item.read}"</span></button>
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
          {activeMenu === "orang_contoh" && (<div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50"><ConversationGroup title="Contoh Penggunaan" icon="💡" data={orangContoh} /></div>)}

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
          {activeMenu === "hewan_contoh" && (<div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50"><ConversationGroup title="Contoh Penggunaan" icon="💡" data={hewanContoh} /></div>)}

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
              <div className="border-t-2 border-dashed border-gray-200 my-6"></div>
              <VocabGroup title="Latihan Ribuan" icon="🎯" data={numbersMixedThousands} themeColor="purple" />
            </div>
          )}
          {activeMenu === "angka_contoh" && (<div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50"><ConversationGroup title="Contoh Penggunaan" icon="💡" data={angkaContoh} /></div>)}

          {activeMenu === "buah" && (
            <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50">
              <VocabGroup title="Buah-buahan" icon="🍎" data={buahBuahan} themeColor="rose" />
            </div>
          )}
          {activeMenu === "buah_contoh" && (<div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50"><ConversationGroup title="Contoh Penggunaan" icon="💡" data={buahContoh} /></div>)}

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
          {activeMenu === "aktivitas_contoh" && (<div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50"><ConversationGroup title="Contoh Penggunaan V1, V2, V3" icon="💡" data={aktivitasContoh} /></div>)}

          {/* KONTEN PERCAKAPAN */}
          {activeMenu === "conv_perkenalan" && (<div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50"><ConversationGroup title="Kalimat Perkenalan" icon="🤝" data={convPerkenalan} /></div>)}
          {activeMenu === "conv_kabar" && (<div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50"><ConversationGroup title="Tanya Jawab Kabar" icon="💬" data={convKabar} /></div>)}
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
          {activeMenu === "conv_posisi" && (<div className="bg-white p-5 rounded-[1.5rem] shadow-sm border-2 border-white/50 overflow-y-auto"><ConversationGroup title="Belajar Posisi (Letak)" icon="📍" data={convPosisi} /></div>)}

          {/* KONTEN CERITA */}
          {activeMenu === "story_crow" && (<StoryGroup data={storyCrow} />)}
          {activeMenu === "story_rabbit" && (<StoryGroup data={storyRabbit} />)}
          {activeMenu === "story_timun_mas" && (<StoryGroup data={storyTimunMas} />)}
          {activeMenu === "story_kancil" && (<StoryGroup data={storyKancil} />)}

        </div>
      </div>
    </div>
  );
}