"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ==========================================
// SUPER MINIFIED DATABASE (100% LENGKAP DARI HALAMAN BELAJAR)
// ==========================================

// 1. KOSAKATA LENGKAP (277 Item: Orang, Hewan, Buah, Benda, Angka, Aktivitas, Alam)
const kamusKosakata = [
  {en:"Man",id:"Pria",icon:"👨"},{en:"Men",id:"Para Pria",icon:"👨👨"},{en:"Woman",id:"Wanita",icon:"👩"},{en:"Women",id:"Para Wanita",icon:"👩👩👩"},{en:"Boy",id:"Anak Laki-laki",icon:"👦"},{en:"Boys",id:"Banyak Anak Laki",icon:"👦👦"},{en:"Girl",id:"Anak Perempuan",icon:"👧"},{en:"Girls",id:"Banyak Anak Perempuan",icon:"👧👧👧"},{en:"Friend",id:"Teman",icon:"🧒"},{en:"Friends",id:"Teman-teman",icon:"🧒🧒"},{en:"Mother",id:"Ibu",icon:"👩"},{en:"Father",id:"Ayah",icon:"👨"},{en:"Parents",id:"Orang Tua",icon:"👨‍👩‍👧‍👦"},{en:"Grandfather",id:"Kakek",icon:"👴"},{en:"Grandmother",id:"Nenek",icon:"👵"},{en:"Sibling",id:"Saudara",icon:"🧒/👧"},{en:"Siblings",id:"Saudara-saudara",icon:"🧒👧"},{en:"Brother",id:"Saudara Laki-laki",icon:"👦"},{en:"Sister",id:"Saudara Perempuan",icon:"👧"},{en:"Older brother",id:"Kakak Laki-laki",icon:"👦"},{en:"Older sister",id:"Kakak Perempuan",icon:"👧"},{en:"Younger brother",id:"Adik Laki-laki",icon:"👶"},{en:"Younger sister",id:"Adik Perempuan",icon:"👶👧"},{en:"Uncle",id:"Paman",icon:"🧔‍♂️"},{en:"Aunt",id:"Bibi",icon:"👩‍🦱"},{en:"Son",id:"Anak Laki-laki Kandung",icon:"👦"},{en:"Daughter",id:"Anak Perempuan Kandung",icon:"👧"},{en:"Cousin",id:"Sepupu",icon:"🧒"},{en:"Nephew",id:"Keponakan Laki",icon:"👦"},{en:"Niece",id:"Keponakan Perempuan",icon:"👧"},{en:"Husband",id:"Suami",icon:"👨"},{en:"Wife",id:"Istri",icon:"👩"},
  {en:"Cat",id:"Kucing",icon:"🐈"},{en:"Dog",id:"Anjing",icon:"🐕"},{en:"Mouse",id:"Tikus",icon:"🐁"},{en:"Lizard",id:"Kadal",icon:"🦎"},{en:"Cockroach",id:"Kecoa",icon:"🪳"},{en:"Fly",id:"Lalat",icon:"🪰"},{en:"Mosquito",id:"Nyamuk",icon:"🦟"},{en:"Ant",id:"Semut",icon:"🐜"},{en:"Spider",id:"Laba-laba",icon:"🕷️"},{en:"Chicken",id:"Ayam",icon:"🐓"},{en:"Duck",id:"Bebek",icon:"🦆"},{en:"Cow",id:"Sapi",icon:"🐄"},{en:"Goat",id:"Kambing",icon:"🐐"},{en:"Horse",id:"Kuda",icon:"🐎"},{en:"Bird",id:"Burung",icon:"🐦"},{en:"Butterfly",id:"Kupu-kupu",icon:"🦋"},{en:"Bee",id:"Lebah",icon:"🐝"},{en:"Fish",id:"Ikan",icon:"🐟"},{en:"Frog",id:"Katak",icon:"🐸"},{en:"Turtle",id:"Kura-kura",icon:"🐢"},{en:"Grasshopper",id:"Belalang",icon:"🦗"},{en:"Worm",id:"Cacing",icon:"🪱"},{en:"Snake",id:"Ular",icon:"🐍"},
  {en:"Apple",id:"Apel",icon:"🍎"},{en:"Banana",id:"Pisang",icon:"🍌"},{en:"Orange",id:"Jeruk",icon:"🍊"},{en:"Watermelon",id:"Semangka",icon:"🍉"},{en:"Mango",id:"Mangga",icon:"🥭"},{en:"Strawberry",id:"Stroberi",icon:"🍓"},{en:"Pineapple",id:"Nanas",icon:"🍍"},{en:"Papaya",id:"Pepaya",icon:"🍈"},{en:"Carrot",id:"Wortel",icon:"🥕"},{en:"Potato",id:"Kentang",icon:"🥔"},{en:"Corn",id:"Jagung",icon:"🌽"},{en:"Cassava",id:"Singkong",icon:"🍠"},{en:"Spinach",id:"Bayam",icon:"🥬"},{en:"Tomato",id:"Tomat",icon:"🍅"},{en:"Chili",id:"Cabai",icon:"🌶️"},{en:"Broccoli",id:"Brokoli",icon:"🥦"},{en:"Onion",id:"Bawang",icon:"🧅"},
  {en:"House",id:"Rumah",icon:"🏠"},{en:"Bedroom",id:"Kamar Tidur",icon:"🛏️"},{en:"Bathroom",id:"Kamar Mandi",icon:"🛁"},{en:"Living Room",id:"Ruang Keluarga",icon:"🛋️"},{en:"Kitchen",id:"Dapur",icon:"🍳"},{en:"Guest Room",id:"Ruang Tamu",icon:"🪑"},{en:"Hallway",id:"Lorong",icon:"🚶"},{en:"Yard",id:"Halaman",icon:"🏡"},{en:"Floor",id:"Lantai",icon:"🟫"},{en:"Wall",id:"Dinding",icon:"🧱"},{en:"Wall Paint",id:"Cat Dinding",icon:"🎨"},{en:"Door",id:"Pintu",icon:"🚪"},{en:"Window",id:"Jendela",icon:"🪟"},{en:"Fence",id:"Pagar",icon:"⛩️"},{en:"Bamboo",id:"Bambu",icon:"🎋"},{en:"Bamboo Tree",id:"Pohon Bambu",icon:"🎋"},{en:"Table",id:"Meja",icon:"🪑"},{en:"Chair",id:"Kursi",icon:"🪑"},{en:"Lamp",id:"Lampu",icon:"💡"},{en:"Stove",id:"Kompor",icon:"🍳"},{en:"Broom",id:"Sapu",icon:"🧹"},{en:"Mop",id:"Pel",icon:"🧹"},{en:"Trash Can",id:"Tempat Sampah",icon:"🗑️"},{en:"Carpet",id:"Karpet",icon:"🟥"},{en:"Curtain",id:"Tirai",icon:"🪟"},{en:"Bed",id:"Kasur",icon:"🛌"},{en:"Pillow",id:"Bantal",icon:"☁️"},{en:"Bolster",id:"Guling",icon:"🥖"},{en:"Blanket",id:"Selimut",icon:"🛏️"},{en:"Plate",id:"Piring",icon:"🍽️"},{en:"Spoon",id:"Sendok",icon:"🥄"},{en:"Fork",id:"Garpu",icon:"🍴"},{en:"Glass",id:"Gelas",icon:"🥛"},{en:"Bottle",id:"Botol",icon:"🍾"},{en:"Water Bottle",id:"Botol Air",icon:"🍼"},{en:"Cup",id:"Cangkir",icon:"☕"},
  {en:"Food",id:"Makanan",icon:"🍱"},{en:"Drink",id:"Minuman",icon:"🍹"},{en:"Snack",id:"Camilan",icon:"🍪"},{en:"Rice",id:"Nasi",icon:"🍚"},{en:"Fried Rice",id:"Nasi Goreng",icon:"🍛"},{en:"Ice Cream",id:"Es Krim",icon:"🍦"},{en:"Iced Tea",id:"Es Teh",icon:"🥤"},{en:"Clothes",id:"Pakaian",icon:"👕"},{en:"T-shirt",id:"Kaos",icon:"👕"},{en:"Shirt",id:"Kemeja",icon:"👔"},{en:"Pants",id:"Celana",icon:"👖"},{en:"Socks",id:"Kaos Kaki",icon:"🧦"},{en:"Shoes",id:"Sepatu",icon:"👟"},{en:"Sandals",id:"Sandal",icon:"🩴"},{en:"Belt",id:"Sabuk",icon:"🥋"},{en:"Glasses",id:"Kacamata",icon:"👓"},{en:"Bracelet",id:"Gelang",icon:"⭕"},{en:"Watch",id:"Jam Tangan",icon:"⌚"},{en:"Bicycle",id:"Sepeda",icon:"🚲"},{en:"Motorcycle",id:"Sepeda Motor",icon:"🏍️"},{en:"Car",id:"Mobil",icon:"🚗"},{en:"Telephone",id:"Telepon",icon:"☎️"},{en:"Mobile Phone",id:"HP",icon:"📱"},{en:"Computer",id:"Komputer",icon:"💻"},{en:"Laptop",id:"Laptop",icon:"💻"},{en:"Book",id:"Buku",icon:"📖"},{en:"Paper",id:"Kertas",icon:"📄"},{en:"Pencil",id:"Pensil",icon:"✏️"},{en:"Pen",id:"Pulpen",icon:"🖊️"},{en:"Marker",id:"Spidol",icon:"🖍️"},{en:"Chalk",id:"Kapur",icon:"🖍️"},{en:"Eraser",id:"Penghapus",icon:"🧽"},{en:"Whiteboard",id:"Papan Tulis Spidol",icon:"📝"},{en:"Blackboard",id:"Papan Tulis Kapur",icon:"🏫"},{en:"School Bag",id:"Tas Sekolah",icon:"🎒"},
  {en:"Water",id:"Air",icon:"💧"},{en:"Fire",id:"Api",icon:"🔥"},{en:"Tree",id:"Pohon",icon:"🌳"},{en:"Plant",id:"Tumbuhan",icon:"🪴"},{en:"Flower",id:"Bunga",icon:"🌸"},{en:"Leaf",id:"Daun",icon:"🍃"},{en:"Grass",id:"Rumput",icon:"🌿"},{en:"Stone",id:"Batu",icon:"🪨"},{en:"Pebble",id:"Kerikil",icon:"🪨"},{en:"Sand",id:"Pasir",icon:"🏜️"},{en:"Street",id:"Jalanan",icon:"🛣️"},{en:"Wood",id:"Kayu",icon:"🪵"},{en:"Shop",id:"Toko",icon:"🏪"},{en:"Stall",id:"Warung",icon:"🛖"},{en:"Restaurant",id:"Restoran",icon:"🍽️"},{en:"Eatery",id:"Rumah Makan",icon:"🍛"},{en:"Ball",id:"Bola",icon:"⚽"},{en:"Cigarette",id:"Rokok",icon:"🚬"},{en:"Match",id:"Korek Api",icon:"🔥"},{en:"Flag",id:"Bendera",icon:"🚩"},{en:"Pole",id:"Tiang",icon:"💈"},{en:"Flagpole",id:"Tiang Bendera",icon:"🎌"},{en:"Plastic",id:"Plastik",icon:"🛍️"},{en:"Night Market",id:"Pasar Malam",icon:"🎪"},{en:"Sack",id:"Karung",icon:"🥔"},{en:"Paddy",id:"Padi",icon:"🌾"},{en:"Graveyard",id:"Kuburan",icon:"🪦"},{en:"Grave",id:"Makam",icon:"⚰️"},{en:"Ghost",id:"Hantu",icon:"👻"},
  {en:"Walk",id:"Berjalan",icon:"🚶"},{en:"Run",id:"Berlari",icon:"🏃"},{en:"Jump",id:"Melompat",icon:"🦘"},{en:"Climb",id:"Memanjat",icon:"🧗"},{en:"Throw",id:"Melempar",icon:"⚾"},{en:"Kick",id:"Menendang",icon:"⚽"},{en:"Hit",id:"Memukul",icon:"🥊"},{en:"Fly",id:"Terbang",icon:"🦅"},{en:"Eat",id:"Makan",icon:"🍽️"},{en:"Cook",id:"Memasak",icon:"🍳"},{en:"Sleep",id:"Tidur",icon:"😴"},{en:"Sit",id:"Duduk",icon:"🪑"},{en:"Open",id:"Membuka",icon:"🚪"},{en:"Close",id:"Menutup",icon:"🚪"},{en:"Turn On",id:"Menyalakan",icon:"💡"},{en:"Turn Off",id:"Mematikan",icon:"🔌"},{en:"Wear",id:"Memakai",icon:"👕"},{en:"Pee",id:"Pipis",icon:"🚽"},{en:"Poop",id:"Eek",icon:"💩"},{en:"Take a bath",id:"Mandi",icon:"🛁"},{en:"Brush teeth",id:"Gosok Gigi",icon:"🪥"},{en:"Wash hair",id:"Keramas",icon:"🧴"},{en:"Water the plant",id:"Menyiram",icon:"🚿"},{en:"Harvest",id:"Memanen",icon:"🌾"},{en:"Ride",id:"Mengendarai",icon:"🚲"},{en:"See",id:"Melihat",icon:"👀"},{en:"Hear",id:"Mendengar",icon:"👂"},{en:"Listen",id:"Mendengarkan",icon:"🎧"},{en:"Watch TV",id:"Menonton",icon:"📺"},{en:"Read",id:"Membaca",icon:"📖"},{en:"Draw",id:"Menggambar",icon:"🎨"},{en:"Study",id:"Belajar",icon:"📚"},{en:"Sing",id:"Bernyanyi",icon:"🎤"},{en:"Play",id:"Bermain",icon:"🪁"},{en:"Bring",id:"Membawa",icon:"📦"},{en:"Push",id:"Mendorong",icon:"🛒"},{en:"Pull",id:"Menarik",icon:"🪢"},{en:"Carry",id:"Menggendong",icon:"🎒"},
  {en:"One",id:"Satu",icon:"1️⃣"},{en:"Two",id:"Dua",icon:"2️⃣"},{en:"Three",id:"Tiga",icon:"3️⃣"},{en:"Four",id:"Empat",icon:"4️⃣"},{en:"Five",id:"Lima",icon:"5️⃣"},{en:"Six",id:"Enam",icon:"6️⃣"},{en:"Seven",id:"Tujuh",icon:"7️⃣"},{en:"Eight",id:"Delapan",icon:"8️⃣"},{en:"Nine",id:"Sembilan",icon:"9️⃣"},{en:"Ten",id:"Sepuluh",icon:"🔟"},{en:"Eleven",id:"Sebelas",icon:"11"},{en:"Twelve",id:"Dua Belas",icon:"12"},{en:"Thirteen",id:"Tiga Belas",icon:"13"},{en:"Fourteen",id:"Empat Belas",icon:"14"},{en:"Fifteen",id:"Lima Belas",icon:"15"},{en:"Sixteen",id:"Enam Belas",icon:"16"},{en:"Seventeen",id:"Tujuh Belas",icon:"17"},{en:"Eighteen",id:"Delapan Belas",icon:"18"},{en:"Nineteen",id:"Sembilan Belas",icon:"19"},{en:"Twenty",id:"Dua Puluh",icon:"20"},{en:"Twenty One",id:"Dua Puluh Satu",icon:"21"},{en:"Twenty Two",id:"Dua Puluh Dua",icon:"22"},{en:"Twenty Three",id:"Dua Puluh Tiga",icon:"23"},{en:"Twenty Four",id:"Dua Puluh Empat",icon:"24"},{en:"Twenty Five",id:"Dua Puluh Lima",icon:"25"},{en:"Twenty Six",id:"Dua Puluh Enam",icon:"26"},{en:"Twenty Seven",id:"Dua Puluh Tujuh",icon:"27"},{en:"Twenty Eight",id:"Dua Puluh Delapan",icon:"28"},{en:"Twenty Nine",id:"Dua Puluh Sembilan",icon:"29"},{en:"Thirty",id:"Tiga Puluh",icon:"30"},{en:"Forty",id:"Empat Puluh",icon:"40"},{en:"Fifty",id:"Lima Puluh",icon:"50"},{en:"Sixty",id:"Enam Puluh",icon:"60"},{en:"Seventy",id:"Tujuh Puluh",icon:"70"},{en:"Eighty",id:"Delapan Puluh",icon:"80"},{en:"Ninety",id:"Sembilan Puluh",icon:"90"},{en:"Thirty Three",id:"Tiga Puluh Tiga",icon:"33"},{en:"Forty Seven",id:"Empat Puluh Tujuh",icon:"47"},{en:"Fifty One",id:"Lima Puluh Satu",icon:"51"},{en:"Sixty Two",id:"Enam Puluh Dua",icon:"62"},{en:"Seventy Six",id:"Tujuh Puluh Enam",icon:"76"},{en:"Eighty Eight",id:"Delapan Puluh Delapan",icon:"88"},{en:"Ninety Four",id:"Sembilan Puluh Empat",icon:"94"},{en:"One Hundred",id:"Seratus",icon:"100"},{en:"Two Hundred",id:"Dua Ratus",icon:"200"},{en:"Three Hundred",id:"Tiga Ratus",icon:"300"},{en:"Four Hundred",id:"Empat Ratus",icon:"400"},{en:"Five Hundred",id:"Lima Ratus",icon:"500"},{en:"Six Hundred",id:"Enam Ratus",icon:"600"},{en:"Seven Hundred",id:"Tujuh Ratus",icon:"700"},{en:"Eight Hundred",id:"Delapan Ratus",icon:"800"},{en:"Nine Hundred",id:"Sembilan Ratus",icon:"900"},{en:"One Hundred Two",id:"Seratus Dua",icon:"102"},{en:"Two Hundred Five",id:"Dua Ratus Lima",icon:"205"},{en:"Three Hundred Forty Seven",id:"Tiga Ratus Empat Puluh Tujuh",icon:"347"},{en:"Four Hundred Eighty One",id:"Empat Ratus Delapan Puluh Satu",icon:"481"},{en:"Nine Hundred Eighty One",id:"Sembilan Ratus Delapan Puluh Satu",icon:"981"},{en:"One Thousand",id:"Seribu",icon:"1000"},{en:"Two Thousand",id:"Dua Ribu",icon:"2000"},{en:"Five Thousand",id:"Lima Ribu",icon:"5000"},{en:"Ten Thousand",id:"Sepuluh Ribu",icon:"10K"},{en:"Seven Hundred Thousand",id:"Tujuh Ratus Ribu",icon:"700K"},{en:"One Million",id:"Satu Juta",icon:"1M"},{en:"One Thousand Four Hundred Thirty Two",id:"Seribu Empat Ratus Tiga Puluh Dua",icon:"1432"},{en:"Seven Thousand Twenty One",id:"Tujuh Ribu Dua Puluh Satu",icon:"7021"},{en:"Five Thousand Five",id:"Lima Ribu Lima",icon:"5005"}
];

// 2. KERETA KATA (60+ Kalimat dari Materi Percakapan & Cerita)
const rawSentences = [
  "Hello", "Good morning", "What is your name", "My name is Stella", "Nice to meet you", "How are you", "I am fine thank you", "And you", "I am fine too",
  "I want to eat fried rice", "I want to drink water", "I want to buy a toy", "I like cats and dogs", "She likes playing football", "We like to read books",
  "I feel happy", "He is angry", "They are surprised", "I am sick and tired", "I will go to school", "We are going to the market", "I will sleep in the bedroom",
  "I wake up in the morning", "I wash my face", "I go to school by bicycle", "It is raining today", "The sun is hot", "The sky is blue", "I can ride a bicycle",
  "Birds can fly in the sky", "I cannot swim", "The apple is red", "This is a big elephant", "The cat is sleeping", "I have a school bag", "This is my pencil",
  "He has a black motorcycle", "What is this", "This is an apple", "Where is my book", "The book is on the table", "May I go to the toilet", "May I borrow your pencil",
  "Can I play outside", "Thank you", "I am sorry", "Excuse me", "You are welcome", "The ball is in the box", "The book is on the table", "I am at school",
  "The bird flies above the tree", "The cat sleeps under the chair", "The picture is below the clock", "The dog is inside the house", "We play outside",
  "A crow is very thirsty", "He drops stones into the pitcher", "The rabbit can run fast", "The turtle walks slowly", "The rabbit sleeps under a tree", 
  "The turtle keeps walking and wins", "An old widow gets a magic seed", "The giant comes back", "She throws magic salt", "A smart mouse deer is walking", 
  "He sees yummy red apples", "The river is full of crocodiles", "The mouse deer has an idea", "The crocodiles make a bridge"
];
const kTr = rawSentences.map((q, idx) => ({ id: idx, q: q, w: q.split(" ") }));

// 3. KASIR SUPERMARKET (Variasi Daftar Belanja & Ikon yang valid)
const kSh = [
  {t:"2 Apples, 1 Banana",tgt:{"🍎":2,"🍌":1},opts:["🍎","🍌","🥕","💧","🍓","🍍"]},
  {t:"3 Carrots, 2 Fish",tgt:{"🥕":3,"🐟":2},opts:["🥕","🐟","🍎","🐈","🐕","🍅"]},
  {t:"1 Book, 2 Shoes",tgt:{"📖":1,"👟":2},opts:["📖","👟","🌸","🍎","👕","👖"]},
  {t:"4 Strawberries, 1 Mango",tgt:{"🍓":4,"🥭":1},opts:["🍓","🥭","🍉","🍎","🍌","🍍"]},
  {t:"2 Cats, 1 Dog",tgt:{"🐈":2,"🐕":1},opts:["🐈","🐕","🐦","🦆","🐐","🐎"]},
  {t:"1 Computer, 2 Books",tgt:{"💻":1,"📖":2},opts:["💻","📖","🪑","🛌","🚪","🪟"]},
  {t:"3 Tomatoes, 3 Carrots",tgt:{"🍅":3,"🥕":3},opts:["🍅","🥕","🥦","🍎","🍌","🍓"]},
  {t:"2 Chickens, 1 Cow",tgt:{"🐓":2,"🐄":1},opts:["🐓","🐄","🐎","🐐","🦆","🐟"]},
  {t:"1 Pants, 2 Shirts",tgt:{"👖":1,"👕":2},opts:["👖","👕","👟","👓","🎒","👗"]},
  {t:"5 Apples",tgt:{"🍎":5},opts:["🍎","🍌","🍓","🥭","🍍","🍉"]},
  {t:"2 Glasses, 1 Water",tgt:{"🥛":2,"💧":1},opts:["🥛","💧","🥤","🍎","🍌","🍓"]},
  {t:"1 Sun, 2 Clouds",tgt:{"☀️":1,"☁️":2},opts:["☀️","☁️","⭐","🌙","🌸","🌳"]},
  {t:"3 Pencils, 1 Bag",tgt:{"✏️":3,"🎒":1},opts:["✏️","🎒","📖","💻","🪑","🚗"]},
  {t:"2 Ducks, 2 Frogs",tgt:{"🦆":2,"🐸":2},opts:["🦆","🐸","🐟","🐢","🐓","🐦"]}
];

// 4. PETAK UMPET (Hide & Seek)
const kHi = [
  {q:"Find the cat under the table!",ans:"Table",opts:[{id:"Table",icon:"🪑"},{id:"Bed",icon:"🛌"},{id:"Tree",icon:"🌳"}],icon:"🐈"},
  {q:"Find the bird in the sky!",ans:"Cloud",opts:[{id:"Cloud",icon:"☁️"},{id:"Tree",icon:"🌳"},{id:"Car",icon:"🚗"}],icon:"🐦"},
  {q:"Find the dog inside the house!",ans:"House",opts:[{id:"House",icon:"🏠"},{id:"Table",icon:"🪑"},{id:"Box",icon:"📦"}],icon:"🐕"},
  {q:"Find the apple in the box!",ans:"Box",opts:[{id:"Box",icon:"📦"},{id:"Bed",icon:"🛌"},{id:"Window",icon:"🪟"}],icon:"🍎"},
  {q:"Find the shoes under the bed!",ans:"Bed",opts:[{id:"Table",icon:"🪑"},{id:"Bed",icon:"🛌"},{id:"Door",icon:"🚪"}],icon:"👟"},
  {q:"Find the spider on the wall!",ans:"Wall",opts:[{id:"Wall",icon:"🧱"},{id:"Floor",icon:"🟫"},{id:"Tree",icon:"🌳"}],icon:"🕷️"},
  {q:"Find the frog in the water!",ans:"Water",opts:[{id:"Water",icon:"💧"},{id:"Fire",icon:"🔥"},{id:"Grass",icon:"🌿"}],icon:"🐸"},
  {q:"Find the book on the table!",ans:"Table",opts:[{id:"Bed",icon:"🛌"},{id:"Table",icon:"🪑"},{id:"Box",icon:"📦"}],icon:"📖"},
  {q:"Find the cow outside the house!",ans:"Outside",opts:[{id:"Inside",icon:"🏠"},{id:"Outside",icon:"🏡"},{id:"Bed",icon:"🛌"}],icon:"🐄"},
  {q:"Find the star in the night!",ans:"Moon",opts:[{id:"Sun",icon:"☀️"},{id:"Moon",icon:"🌙"},{id:"Cloud",icon:"☁️"}],icon:"⭐"},
  {q:"Find the fish in the river!",ans:"Water",opts:[{id:"Water",icon:"💧"},{id:"Tree",icon:"🌳"},{id:"Box",icon:"📦"}],icon:"🐟"},
  {q:"Find the bag on the chair!",ans:"Chair",opts:[{id:"Chair",icon:"🪑"},{id:"Bed",icon:"🛌"},{id:"Floor",icon:"🟫"}],icon:"🎒"}
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function HalamanBermain() {
  const [activeMenu, setActiveMenu] = useState("utama");
  const scrollContainerRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTo(0, 0);
  }, [activeMenu]);

  // Audio System
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
    if (activeMenu !== "utama") setActiveMenu("utama");
  };

  const getHeaderTitle = () => {
    const t = { utama:"Taman Bermain", memory:"Memori Kartu", train:"Kereta Kata", balloon:"Tangkap Balon", cart:"Kasir Supermarket", hide:"Petak Umpet" };
    return t[activeMenu] || "Ayo Bermain!";
  };

  // ==========================================
  // GAME 1: MEMORI KARTU (3 LEVEL & 277 Kata Acak)
  // ==========================================
  const [memStatus, setMemStatus] = useState("idle"); // idle, playing, finished
  const [memLevel, setMemLevel] = useState("easy");
  const [memCards, setMemCards] = useState([]);
  const [memFlipped, setMemFlipped] = useState([]);
  const [memSolved, setMemSolved] = useState([]);
  const [memMoves, setMemMoves] = useState(0);

  const startMemory = (level) => {
    setMemLevel(level); setMemStatus("playing"); setMemFlipped([]); setMemSolved([]); setMemMoves(0);
    let pairCount = 3; // Easy: 3 pasang (6 kartu)
    if (level === "medium") pairCount = 6; // Medium: 6 pasang (12 kartu)
    if (level === "hard") pairCount = 10; // Hard: 10 pasang (20 kartu)

    // Mengambil kata acak dari 277 Bank Kosakata
    const selected = shuffleArray(kamusKosakata).slice(0, pairCount);
    let deck = [];
    selected.forEach((item, index) => {
      deck.push({ id: index, type: "text", val: item.en, matchId: item.en });
      deck.push({ id: index + pairCount, type: "icon", val: item.icon, matchId: item.en });
    });
    setMemCards(shuffleArray(deck));
  };

  const handleMemClick = (index) => {
    if (memFlipped.length === 2 || memFlipped.includes(index) || memSolved.includes(index)) return;
    const newFlipped = [...memFlipped, index];
    setMemFlipped(newFlipped);
    
    // Suara membaca bahasa Inggris
    if (memCards[index].type === 'text') playAudio(memCards[index].val);
    else playAudio(memCards[index].matchId);

    if (newFlipped.length === 2) {
      setMemMoves(p => p + 1);
      const m1 = memCards[newFlipped[0]].matchId;
      const m2 = memCards[newFlipped[1]].matchId;
      if (m1 === m2) {
        setTimeout(() => {
          setMemSolved(p => [...p, newFlipped[0], newFlipped[1]]);
          setMemFlipped([]);
        }, 500);
      } else {
        setTimeout(() => setMemFlipped([]), 900);
      }
    }
  };

  useEffect(() => {
    if (memStatus === "playing" && memSolved.length > 0 && memSolved.length === memCards.length) {
      setTimeout(() => { playAudio("You win!"); setMemStatus("finished"); }, 500);
    }
  }, [memSolved]);

  // Styling Grid Dinamis agar selalu muat 1 layar HP tanpa perlu scroll
  const getMemGridClass = () => {
    if (memLevel === "easy") return "grid-cols-3 grid-rows-2 gap-3";
    if (memLevel === "medium") return "grid-cols-4 grid-rows-3 gap-2";
    if (memLevel === "hard") return "grid-cols-4 grid-rows-5 gap-1.5";
    return "";
  };
  const getMemTextClass = (type) => {
    if (memLevel === "easy") return type === 'icon' ? 'text-5xl' : 'text-xl sm:text-2xl';
    if (memLevel === "medium") return type === 'icon' ? 'text-4xl' : 'text-[15px] sm:text-[18px]';
    if (memLevel === "hard") return type === 'icon' ? 'text-3xl' : 'text-[13px] sm:text-[15px]';
  };

  // ==========================================
  // GAME 2: KERETA KATA (DARI RAW SENTENCES)
  // ==========================================
  const [trStatus, setTrStatus] = useState("idle");
  const [trSentence, setTrSentence] = useState(null);
  const [trOptions, setTrOptions] = useState([]);
  const [trAnswers, setTrAnswers] = useState([]);

  const startTrain = () => {
    setTrStatus("playing"); setTrAnswers([]);
    const sel = shuffleArray(kTr)[0];
    setTrSentence(sel);
    setTrOptions(shuffleArray(sel.w.map((word, idx) => ({ word, id: idx }))));
  };

  const handleTrOptClick = (item) => {
    setTrAnswers(p => [...p, item]);
    setTrOptions(p => p.filter(i => i.id !== item.id));
    playAudio(item.word);
  };

  const handleTrAnsClick = (item) => {
    setTrOptions(p => [...p, item]);
    setTrAnswers(p => p.filter(i => i.id !== item.id));
  };

  useEffect(() => {
    if (trStatus === 'playing' && trSentence && trAnswers.length === trSentence.w.length) {
      if (trAnswers.map(a => a.word).join(" ") === trSentence.q) {
        playAudio(trSentence.q);
        setTimeout(() => setTrStatus("finished"), 1500);
      }
    }
  }, [trAnswers]);

  // ==========================================
  // GAME 3: TANGKAP BALON (277 KATA ACAK)
  // ==========================================
  const [bpStatus, setBpStatus] = useState("idle");
  const [bpTarget, setBpTarget] = useState(null);
  const [bpGrid, setBpGrid] = useState(Array(9).fill(null));
  const [bpScore, setBpScore] = useState(0);
  const [bpTime, setBpTime] = useState(30);

  const startBalloon = () => {
    setBpStatus("playing"); setBpScore(0); setBpTime(30);
    const newTgt = shuffleArray(kamusKosakata)[0];
    setBpTarget(newTgt);
    playAudio("Find " + newTgt.en);
  };

  useEffect(() => {
    if (bpStatus !== 'playing') return;
    const timer = setInterval(() => {
      setBpTime(p => {
        if (p <= 1) { clearInterval(timer); setBpStatus("finished"); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [bpStatus]);

  useEffect(() => {
    if (bpStatus !== 'playing' || !bpTarget) return;
    const spawner = setInterval(() => {
      const wrongs = shuffleArray(kamusKosakata).filter(v => v.en !== bpTarget.en).slice(0, 2);
      const items = shuffleArray([bpTarget, ...wrongs]);
      let newGrid = Array(9).fill(null);
      let indices = shuffleArray([0,1,2,3,4,5,6,7,8]).slice(0,3);
      items.forEach((item, idx) => { newGrid[indices[idx]] = item; });
      setBpGrid(newGrid);
    }, 1200);
    return () => clearInterval(spawner);
  }, [bpStatus, bpTarget]);

  const handleBpClick = (item) => {
    if (item.en === bpTarget.en) {
      setBpScore(p => p + 1);
      const newTgt = shuffleArray(kamusKosakata)[0];
      setBpTarget(newTgt);
      setBpGrid(Array(9).fill(null));
      playAudio("Find " + newTgt.en);
    } else {
      playAudio(item.en);
    }
  };

  // ==========================================
  // GAME 4: KASIR SUPERMARKET
  // ==========================================
  const [scStatus, setScStatus] = useState("idle");
  const [scTask, setScTask] = useState(null);
  const [scCart, setScCart] = useState({});

  const startCart = () => {
    setScStatus("playing"); setScCart({});
    const sel = shuffleArray(kSh)[0];
    setScTask(sel);
    playAudio(sel.t);
  };

  const handleScClick = (item) => {
    setScCart(p => ({ ...p, [item]: (p[item] || 0) + 1 }));
    playAudio(kamusKosakata.find(k => k.icon === item)?.en || "Added");
  };

  const clearCart = () => { setScCart({}); playAudio("Clear"); };

  useEffect(() => {
    if (scStatus === 'playing' && scTask) {
      let win = true; let isEmpty = true;
      for (let key in scTask.tgt) {
        if (scCart[key] !== scTask.tgt[key]) win = false;
        if (scCart[key]) isEmpty = false;
      }
      for (let key in scCart) {
        if (!scTask.tgt[key] || scCart[key] > scTask.tgt[key]) win = false;
      }
      if (win && !isEmpty) {
        playAudio("Perfect!");
        setTimeout(() => setScStatus("finished"), 1500);
      }
    }
  }, [scCart]);

  // ==========================================
  // GAME 5: PETAK UMPET (HIDE & SEEK)
  // ==========================================
  const [hsStatus, setHsStatus] = useState("idle");
  const [hsTask, setHsTask] = useState(null);
  const [hsFound, setHsFound] = useState(false);

  const startHide = () => {
    setHsStatus("playing"); setHsFound(false);
    const sel = shuffleArray(kHi)[0];
    setHsTask(sel);
    playAudio(sel.q);
  };

  const handleHsClick = (opt) => {
    if (opt.id === hsTask.ans) {
      setHsFound(true);
      playAudio("Correct! " + hsTask.icon);
      setTimeout(() => setHsStatus("finished"), 2500);
    } else {
      playAudio("Wrong");
    }
  };

  // MENU DATA
  const gameMenus = [
    { id: "memory", bg: "bg-[#3B82F6]", shadow: "shadow-[0_6px_0_#1D4ED8]", icon: "🃏", title: "Memori Kartu", sub: "Memory Match", tc: "text-blue-100" },
    { id: "train", bg: "bg-[#EC4899]", shadow: "shadow-[0_6px_0_#BE185D]", icon: "🚂", title: "Kereta Kata", sub: "Word Train", tc: "text-pink-100" },
    { id: "balloon", bg: "bg-[#A855F7]", shadow: "shadow-[0_6px_0_#7E22CE]", icon: "🎈", title: "Tangkap Balon", sub: "Balloon Pop", tc: "text-purple-100" },
    { id: "cart", bg: "bg-[#10B981]", shadow: "shadow-[0_6px_0_#047857]", icon: "🛒", title: "Kasir Pasar", sub: "Shopping Cart", tc: "text-emerald-100" },
    { id: "hide", bg: "bg-[#F59E0B]", shadow: "shadow-[0_6px_0_#B45309]", icon: "🔍", title: "Petak Umpet", sub: "Hide & Seek", tc: "text-amber-100" }
  ];

  return (
    <div className="relative mx-auto w-full max-w-md h-[100dvh] overflow-hidden font-sans bg-white flex flex-col">
      {activeMenu === "utama" && (
        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ backgroundImage: "url('/bg-forest.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}/>
      )}

      {/* =======================================================
          HEADER 3 KOLOM ANTI-GEPENG (KONSISTEN)
          ======================================================= */}
      <div className={`flex-none bg-white px-4 py-3 shadow-sm flex items-center justify-between z-50 gap-2 ${activeMenu !== 'utama' ? 'border-b border-gray-100' : 'rounded-b-3xl'}`}>
        <div className="flex-1 flex justify-start">
          {activeMenu === "utama" ? (
            <Link href="/" className="bg-orange-100 text-orange-600 px-3 py-2 border-2 border-orange-200 rounded-xl font-bold text-[13px] active:scale-95 transition-transform whitespace-nowrap shrink-0 flex items-center justify-center h-[40px]">
              ⬅️ Kembali
            </Link>
          ) : (
            <button onClick={handleBack} className="bg-orange-100 text-orange-600 px-3 py-2 border-2 border-orange-200 rounded-xl font-bold text-[13px] active:scale-95 transition-transform whitespace-nowrap shrink-0 flex items-center justify-center h-[40px]">
              ⬅️ Kembali
            </button>
          )}
        </div>
        <h1 className="text-[16px] sm:text-[17px] font-black text-gray-800 truncate text-center shrink-0 px-1">
          {getHeaderTitle()}
        </h1>
        <div className="flex-1 flex justify-end"></div>
      </div>

      {/* =======================================================
          AREA KONTEN (AUTO-SCROLL JIKA DIBUTUHKAN, KECUALI MEMORY)
          ======================================================= */}
      <div ref={scrollContainerRef} className={`relative z-10 w-full flex-1 ${activeMenu === 'memory' && memStatus === 'playing' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <div className={activeMenu !== "utama" ? "p-4 w-full h-full flex flex-col" : "p-5 pb-12"}>
          
          {/* MENU UTAMA */}
          {activeMenu === "utama" && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl mb-2 border-2 border-white shadow-sm">
                <p className="text-center font-bold text-gray-600 text-[13px] leading-relaxed">Selamat datang di Taman Bermain! Pilih game interaktif untuk bersenang-senang. 🚀</p>
              </div>
              {gameMenus.map((m) => (
                <button key={m.id} onClick={() => setActiveMenu(m.id)} className={`w-full ${m.bg} active:translate-y-1 text-white py-6 rounded-[1.5rem] ${m.shadow} transition-all flex items-center px-6 gap-5 border-2 border-white/30`}>
                  <span className="text-5xl drop-shadow-md w-14 text-center">{m.icon}</span>
                  <div className="flex flex-col flex-1 text-left"><span className="font-black text-2xl leading-none">{m.title}</span><span className={`text-sm ${m.tc} font-bold mt-1 tracking-wide`}>{m.sub}</span></div>
                </button>
              ))}
            </div>
          )}

          {/* =======================================================
              GAME 1: MEMORI KARTU (MEMORY MATCH - FULL SCREEN GRID)
              ======================================================= */}
          {activeMenu === "memory" && (
            <div className="flex flex-col w-full h-full">
              {memStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-4 drop-shadow-lg animate-bounce">🃏</span>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Memori Kartu</h2>
                  <p className="text-gray-500 font-bold mb-8 px-6">Buka kartunya dan cari pasangan kata dan gambar yang tepat!</p>
                  
                  {/* Pemilihan Level */}
                  <div className="flex flex-col gap-4 w-[80%]">
                    <button onClick={() => startMemory("easy")} className="bg-emerald-500 text-white font-black text-xl py-4 rounded-3xl shadow-[0_6px_0_#047857] active:translate-y-1 transition-all">Level MUDAH (3 Pasang)</button>
                    <button onClick={() => startMemory("medium")} className="bg-amber-500 text-white font-black text-xl py-4 rounded-3xl shadow-[0_6px_0_#B45309] active:translate-y-1 transition-all">Level SEDANG (6 Pasang)</button>
                    <button onClick={() => startMemory("hard")} className="bg-rose-500 text-white font-black text-xl py-4 rounded-3xl shadow-[0_6px_0_#BE123C] active:translate-y-1 transition-all">Level SULIT (10 Pasang)</button>
                  </div>
                </div>
              )}
              {memStatus === "playing" && (
                <div className="flex flex-col w-full h-full flex-1">
                  <div className="flex justify-between items-center mb-4 bg-gray-100 p-3 rounded-2xl flex-none">
                    <span className="font-black text-gray-500 text-lg">Langkah: {memMoves}</span>
                    <button onClick={() => setMemStatus("idle")} className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-xl active:scale-95">Ganti Level</button>
                  </div>
                  
                  {/* Grid dinamis Flex-1 untuk mengisi layar tanpa scroll */}
                  <div className="flex-1 min-h-0 w-full flex items-center justify-center pb-2">
                    <div className={`grid w-full h-full ${getMemGridClass()}`}>
                      {memCards.map((card, idx) => {
                        const isFlipped = memFlipped.includes(idx) || memSolved.includes(idx);
                        return (
                          <button key={idx} onClick={() => handleMemClick(idx)} className={`w-full h-full rounded-[1rem] font-black flex items-center justify-center leading-none text-center p-1 border-2 transition-all duration-300 ${isFlipped ? (memSolved.includes(idx) ? 'bg-green-100 border-green-400 text-green-700 shadow-none' : 'bg-white border-blue-300 text-gray-800 shadow-none') : 'bg-blue-500 border-blue-600 shadow-[0_4px_0_#1D4ED8] active:translate-y-1'}`}>
                            {isFlipped ? (
                              <span className={`${getMemTextClass(card.type)} ${card.type === 'icon' ? 'drop-shadow-sm' : 'font-black break-words'}`}>
                                {card.val}
                              </span>
                            ) : (
                              <span className="text-blue-300 text-3xl">?</span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {memStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-2 drop-shadow-lg">🏆</span>
                  <h2 className="text-4xl font-black text-amber-500 mb-2">SELESAI!</h2>
                  <p className="text-gray-500 font-bold mb-6">Diselesaikan dalam {memMoves} langkah.</p>
                  <button onClick={() => setMemStatus("idle")} className="bg-blue-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#1D4ED8] active:translate-y-1 transition-all mb-4">🔄 MAIN LAGI</button>
                </div>
              )}
            </div>
          )}

          {/* =======================================================
              GAME 2: KERETA KATA (WORD TRAIN)
              ======================================================= */}
          {activeMenu === "train" && (
            <div className="flex flex-col w-full h-full pt-4">
              {trStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-4 drop-shadow-lg animate-pulse">🚂</span>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Kereta Kata</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Susun kata-kata acak ke atas gerbong menjadi kalimat yang benar!</p>
                  <button onClick={startTrain} className="bg-pink-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#BE185D] active:translate-y-2 transition-all hover:bg-pink-600">MULAI MAIN</button>
                </div>
              )}
              {trStatus === "playing" && trSentence && (
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center mb-6 bg-gray-100 p-3 rounded-2xl">
                    <span className="font-black text-gray-500 text-lg">Susun Kalimat</span>
                    <button onClick={startTrain} className="bg-pink-100 text-pink-600 font-bold px-3 py-1 rounded-xl active:scale-95">Lewati</button>
                  </div>
                  
                  {/* Area Gerbong */}
                  <div className="bg-pink-50 border-4 border-pink-200 rounded-3xl p-4 min-h-[150px] flex flex-wrap gap-2 items-center justify-center mb-8 relative overflow-hidden">
                    {trAnswers.length === 0 && <span className="text-gray-400 font-bold italic absolute">Gerbong masih kosong...</span>}
                    {trAnswers.map((ans, idx) => (
                      <button key={idx} onClick={() => handleTrAnsClick(ans, idx)} className="bg-white border-2 border-pink-300 text-gray-800 font-black px-4 py-3 rounded-xl shadow-sm hover:bg-pink-100 active:scale-95 transition-all text-xl">
                        {ans.word}
                      </button>
                    ))}
                  </div>

                  <p className="text-center font-bold text-gray-500 mb-4">Pilih kata di bawah ini:</p>
                  
                  {/* Area Pilihan Kata */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {trOptions.map((opt) => (
                      <button key={opt.id} onClick={() => handleTrOptClick(opt)} className="bg-pink-500 border-2 border-pink-600 text-white font-black px-5 py-3 rounded-xl shadow-[0_4px_0_#BE185D] active:translate-y-1 transition-all text-xl">
                        {opt.word}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {trStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-2 drop-shadow-lg animate-bounce">🚂</span>
                  <h2 className="text-4xl font-black text-pink-500 mb-2">TUT TUUUUT!</h2>
                  <p className="text-gray-500 font-bold mb-6 text-xl">"{trSentence.q}"</p>
                  <button onClick={startTrain} className="bg-pink-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#BE185D] active:translate-y-1 transition-all mb-4">🔄 MAIN LAGI</button>
                </div>
              )}
            </div>
          )}

          {/* =======================================================
              GAME 3: TANGKAP BALON (WHACK-A-MOLE STYLE)
              ======================================================= */}
          {activeMenu === "balloon" && (
            <div className="flex flex-col w-full h-full pt-4">
              {bpStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-4 drop-shadow-lg animate-bounce">🎈</span>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Tangkap Balon</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Dengarkan instruksinya dan tangkap gambar yang tepat secepat mungkin!</p>
                  <button onClick={startBalloon} className="bg-purple-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#7E22CE] active:translate-y-2 transition-all hover:bg-purple-600">MULAI MAIN</button>
                </div>
              )}
              {bpStatus === "playing" && bpTarget && (
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center mb-6 bg-gray-100 p-3 rounded-2xl">
                    <span className={`font-black text-xl px-3 py-1 rounded-xl ${bpTime <= 10 ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-purple-100 text-purple-600'}`}>⏱️ {bpTime}s</span>
                    <button onClick={() => playAudio("Find " + bpTarget.en)} className="bg-purple-500 text-white font-bold px-4 py-2 rounded-xl active:scale-95 shadow-sm text-lg border-2 border-purple-600">🔊 Dengarkan</button>
                    <span className="font-black text-amber-500 text-xl bg-amber-100 px-3 py-1 rounded-xl">⭐ {bpScore}</span>
                  </div>
                  
                  <div className="bg-white p-4 rounded-3xl border-4 border-purple-100 min-h-[350px] grid grid-cols-3 gap-3">
                    {bpGrid.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-center aspect-square">
                        {item && (
                          <button onClick={() => handleBpClick(item)} className="text-[60px] drop-shadow-md hover:scale-110 active:scale-90 transition-transform animate-bounce">
                            {item.icon}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {bpStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-2 drop-shadow-lg">🏆</span>
                  <h2 className="text-4xl font-black text-purple-500 mb-2">WAKTU HABIS!</h2>
                  <p className="text-gray-500 font-bold mb-6">Kamu berhasil menangkap:</p>
                  <div className="bg-amber-100 border-4 border-amber-300 w-full py-8 rounded-[2rem] mb-10 flex flex-col items-center justify-center"><span className="text-7xl font-black text-amber-600 drop-shadow-sm">{bpScore}</span><span className="text-amber-500 font-bold mt-2">Gambar</span></div>
                  <button onClick={startBalloon} className="bg-purple-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#7E22CE] active:translate-y-1 transition-all mb-4">🔄 MAIN LAGI</button>
                </div>
              )}
            </div>
          )}

          {/* =======================================================
              GAME 4: KASIR SUPERMARKET (SHOPPING CART)
              ======================================================= */}
          {activeMenu === "cart" && (
            <div className="flex flex-col w-full h-full pt-4">
              {scStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-4 drop-shadow-lg animate-pulse">🛒</span>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Kasir Supermarket</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Dengarkan permintaan pelanggan dan masukkan barang ke keranjang sesuai jumlahnya!</p>
                  <button onClick={startCart} className="bg-emerald-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#047857] active:translate-y-2 transition-all hover:bg-emerald-600">MULAI MAIN</button>
                </div>
              )}
              {scStatus === "playing" && scTask && (
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center mb-4 bg-emerald-50 border-4 border-emerald-200 p-4 rounded-2xl text-center flex-col">
                    <p className="text-emerald-800 font-black text-xl mb-2">📝 Daftar Belanja:</p>
                    <button onClick={() => playAudio(scTask.t)} className="bg-emerald-500 text-white font-bold px-6 py-2 rounded-xl active:scale-95 shadow-sm text-lg flex gap-2 items-center"><span className="text-2xl">🔊</span> {scTask.t}</button>
                  </div>
                  
                  {/* Rak Barang */}
                  <div className="grid grid-cols-3 gap-3 mb-6 bg-orange-50 p-4 rounded-2xl border-b-8 border-orange-200">
                    {scTask.opts.map((opt, i) => (
                      <button key={i} onClick={() => handleScClick(opt)} className="bg-white rounded-xl shadow-sm border-2 border-orange-100 p-2 text-[50px] drop-shadow-sm active:scale-95 hover:bg-orange-100 transition-all flex items-center justify-center aspect-square">
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Keranjang */}
                  <div className="bg-gray-100 p-4 rounded-3xl min-h-[120px] relative border-4 border-gray-200 flex flex-wrap gap-2 items-start justify-start">
                    <span className="absolute -top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full font-bold shadow-sm" onClick={clearCart}>Kosongkan 🗑️</span>
                    {Object.keys(scCart).length === 0 && <p className="text-gray-400 font-bold w-full text-center mt-6">Keranjang masih kosong...</p>}
                    {Object.keys(scCart).map(key => (
                      <div key={key} className="bg-white px-3 py-2 rounded-lg font-black text-2xl shadow-sm border border-gray-200 flex items-center gap-2">
                        {key} <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">x{scCart[key]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {scStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-2 drop-shadow-lg">🎉</span>
                  <h2 className="text-4xl font-black text-emerald-500 mb-2">SEMPURNA!</h2>
                  <p className="text-gray-500 font-bold mb-6 text-lg">Semua belanjaan sudah masuk!</p>
                  <button onClick={startCart} className="bg-emerald-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#047857] active:translate-y-1 transition-all mb-4">🔄 MAIN LAGI</button>
                </div>
              )}
            </div>
          )}

          {/* =======================================================
              GAME 5: PETAK UMPET (HIDE & SEEK)
              ======================================================= */}
          {activeMenu === "hide" && (
            <div className="flex flex-col w-full h-full pt-4">
              {hsStatus === "idle" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-4 drop-shadow-lg animate-bounce">🔍</span>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Petak Umpet</h2>
                  <p className="text-gray-500 font-bold mb-10 px-6">Dengarkan instruksinya dan temukan siapa yang bersembunyi di balik benda!</p>
                  <button onClick={startHide} className="bg-amber-500 text-white font-black text-2xl py-5 w-[80%] rounded-3xl shadow-[0_8px_0_#B45309] active:translate-y-2 transition-all hover:bg-amber-600">MULAI MAIN</button>
                </div>
              )}
              {hsStatus === "playing" && hsTask && (
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center mb-6 bg-amber-50 border-4 border-amber-200 p-3 rounded-2xl flex-col gap-3">
                    <span className="font-black text-amber-800 text-xl text-center">{hsTask.q}</span>
                    <button onClick={() => playAudio(hsTask.q)} className="bg-amber-500 text-white font-bold px-4 py-2 rounded-xl active:scale-95 shadow-[0_4px_0_#B45309] w-full text-lg">🔊 Dengarkan</button>
                  </div>
                  
                  <div className="flex flex-col gap-4 relative">
                    {hsTask.opts.map((opt, i) => (
                      <button key={i} onClick={() => handleHsClick(opt)} disabled={hsFound} className="bg-white border-4 border-gray-200 rounded-3xl py-6 flex items-center justify-center text-[70px] drop-shadow-md hover:bg-gray-50 active:scale-95 transition-all relative overflow-hidden">
                        {opt.icon}
                        {/* Jika ketemu, tampilkan hewannya muncul dengan animasi mantul */}
                        {hsFound && opt.id === hsTask.ans && (
                          <span className="absolute bottom-2 right-4 text-[60px] animate-bounce drop-shadow-lg">{hsTask.icon}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {hsStatus === "finished" && (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <span className="text-[100px] mb-2 drop-shadow-lg animate-bounce">{hsTask.icon}</span>
                  <h2 className="text-4xl font-black text-amber-500 mb-2">KETEMU!</h2>
                  <p className="text-gray-500 font-bold mb-6 text-xl">Kamu hebat sekali!</p>
                  <button onClick={startHide} className="bg-amber-500 text-white font-black text-xl py-4 w-full rounded-2xl shadow-[0_6px_0_#B45309] active:translate-y-1 transition-all mb-4">🔄 MAIN LAGI</button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}