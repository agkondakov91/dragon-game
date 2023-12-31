// переменные
let xp = 0;
let health = 100;
let gold = 250;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Палка"];

// константы
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const textStory = document.querySelector("#text");
const imageContent = document.querySelector(".image__content");
const place = document.querySelector("#place");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monster-stats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  { name: "Палка", power: 5 },
  { name: "Кинжал Ассасина", power: 30 },
  { name: "Молот Дворфа", power: 50 },
  { name: "Меч Героя", power: 100 },
];

const monsters = [
  {
    name: "Слизь",
    level: 2,
    health: 15,
  },
  {
    name: "Клыкастый зверь",
    level: 8,
    health: 60,
  },
  {
    name: "Чёрный дракон",
    level: 20,
    health: 300,
  },
];

const locations = [
  {
    name: "город",
    "button text": ["В магазин", "В пещеру", "Убить дракона"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Вы находитесь на городской площади. Вы видите вывеску с надписью <strong>«Магазин Гильдии»</strong>. За площадью находится вход в <strong>Подземелье</strong>. Городской мост охраняет <strong>Древний Дракон</strong>.",
    image: "./img/01-town.jpg",
  },
  {
    name: "магазин",
    "button text": [
      "Элексир здоровья (10 золота)",
      "Купить оружие (30 золота)",
      "Вернуться в город",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Вы вошли в <strong>магазин гильдии</strong>. Здесь можно купить <strong>элексир здоровья</strong> за 10 золотых монет. Вы также можете купить <strong>новое оружие</strong> за 30 золотых монет.",
    image: "./img/02-store.jpg",
  },
  {
    name: "подземелье",
    "button text": [
      "Сразиться со слизью",
      "Сразиться со зверем",
      "Вернуться в город",
    ],
    "button functions": [goSlime, goBeast, goTown],
    text: "Вы вошли в <strong>подземелье</strong>. Здесь можно сразиться с <strong>монстрами</strong>, <strong>заработать опыт</strong> и <strong>получить золото</strong>. Вы видите несколько монстров: с кем вы хотите сразиться?",
    image: "./img/03-cave.jpg",
  },
  {
    name: "слизь",
    "button text": ["Атаковать", "Уклониться", "Сбежать"],
    "button functions": [attack, dodge, goTown],
    text: "Вы смело вышли на бой с монстром подземелья! Да хранит вас <strong>Богиня Удачи</strong>!",
    image: "./img/04-slime.jpg",
  },
  {
    name: "зверь",
    "button text": ["Атаковать", "Уклониться", "Сбежать"],
    "button functions": [attack, dodge, goTown],
    text: "Вы смело вышли на бой с монстром подземелья! Да хранит вас <strong>Богиня Удачи</strong>!",
    image: "./img/05-beast.jpg",
  },
];

//слушатели
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//функции
function updateLocation(location) {
  monsterStats.style.display = "none";
  button1.textContent = location["button text"][0];
  button2.textContent = location["button text"][1];
  button3.textContent = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  imageContent.style.backgroundImage = `url(${location.image})`;
  place.textContent = location.name;
  textStory.innerHTML = location.text;
}
function goTown() {
  updateLocation(locations[0]);
}

function goStore() {
  updateLocation(locations[1]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.textContent = gold;
    healthText.textContent = health;
  } else {
    textStory.innerHTML =
      "У вас <strong>недостаточно золота</strong>, чтобы купить здоровье.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.textContent = gold;
      let newWeapon = weapons[currentWeapon].name;
      textStory.innerHTML = `Теперь у вас есть <strong>${newWeapon}</strong>.`;
      inventory.push(newWeapon);
      textStory.innerHTML += ` В вашем инвентаре есть следующее оружие: <strong>${inventory.join(
        ", "
      )}</strong>.`;
    } else {
      textStory.innerHTML =
        "У вас <strong>недостаточно золота</strong>, чтобы купить оружие.";
    }
  } else {
    textStory.innerHTML =
      "У вас уже есть <strong>самое мощное оружие</strong>! Вы можете <strong>продать более слабое оружие</strong> за 15 золотых монет.";
    button2.textContent = "Продать оружие (15 золота)";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.textContent = gold;
    let currentWeapon = inventory.shift();
    textStory.innerHTML = `Вы продали <strong>${currentWeapon}</strong>.`;
    textStory.innerHTML += ` В вашем инвентаре есть следующее оружие: <strong>${inventory.join(
      ", "
    )}</strong>.`;
  } else {
    textStory.innerHTML =
      "Не продавайте свое <strong>единственное оружие</strong>! Оно вам обязательно понадобится.";
  }
}

function goCave() {
  updateLocation(locations[2]);
}

function goSlime() {
  updateLocation(locations[3]);
  fighting = 0;
  goFight();
}

function goBeast() {
  updateLocation(locations[4]);
  fighting = 1;
  goFight();
}

function goFight() {
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'flex';
    monsterName.textContent = monsters[fighting].name;
    monsterHealthText.textContent = monsterHealth;
}

function attack() {
  console.log("AAA");
}

function dodge() {
  console.log("yyyy");
}

function fightDragon() {
  console.log("Иду к дракону");
}
