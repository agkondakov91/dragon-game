// переменные
let xp = 0;
let health = 100;
let healthBuy = 0;
let healthspan = 0;
let gold = 50;
let goldGet = 0;
let goldSpent = 0;
let currentWeapon = 0;
let totalDamage = 0;
let totalMonstDamage = 0;
let fighting;
let monsterHealth;
let inventory = ["Палка"];

// константы
const musicOn = document.querySelector("#music-on");
const musicOff = document.querySelector("#music-off");
const audioPlayer = document.querySelector("audio");

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
    "button text": ["В магазин", "В подземелье", "Убить дракона"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Вы находитесь на городской площади. Вы видите вывеску с надписью <strong>«Магазин Гильдии»</strong>. За площадью находится вход в <strong>Подземелье</strong>. Городской мост охраняет <strong>Чёрный дракон</strong>.",
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
  {
    name: "дракон",
    "button text": ["Атаковать", "Уклониться", "Сбежать"],
    "button functions": [attack, dodge, goTown],
    text: "Вы решили раз и навсегда разобраться с <strong>Чёрным драконом</strong> и помочь жителям покинуть город! Да хранит вас <strong>Богиня Удачи</strong>!",
    image: "./img/06-dragon.jpg",
  },
  {
    name: "проигрыш",
    "button text": ["Начать сначала?", "Статистика", "Информация"], //можно добавить статистику
    "button functions": [restart, getStatistics, getAuthorInfo],
    text: "Вы погибли. ☠️ Теперь жители города обречены! Но <strong>Богиня Удачи</strong> может даровать вам ещё один шанс.",
    image: "./img/07-lose.jpg",
  },
  {
    name: "монстр убит",
    "button text": [
      "Бросить новый вызов",
      "Вернуться в город",
      "Вернуться в город",
    ],
    "button functions": [goCave, goTown, easterEgg],
    text: "Умирая, монстр рычит <strong>«Аррргг!»</strong>. Вы получаете <strong>очки опыта</strong> и находите <strong>золото</strong>.",
    image: "./img/08-win.jpg",
  },
  {
    name: "победа",
    "button text": ["Начать сначала?", "Статистика", "Информация"], //можно добавить статистику
    "button functions": [restart, getStatistics, getAuthorInfo],
    text: "Вы победили дракона! ВЫ ВЫИГРАЛИ ИГРУ! 🎉",
    image: "./img/08-win.jpg",
  },
  {
    name: "удача",
    "button text": ["Число 2", "Число 8", "Вернуться в город?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "<strong>Вы нашли секретную игру Богини Удачи</strong>! Выберите число, указанное ниже. Случайным образом будут выбраны десять чисел от <strong>0 до 10</strong>. Если выбранное вами число совпадет с одним из случайных чисел, вы выиграете!",
    image: "./img/09-paschal.jpg",
  },
];

//первая инициализация кнопок
musicOn.addEventListener("click", () => {
  audioPlayer.play();
});
musicOff.addEventListener("click", () => {
  audioPlayer.pause();
});
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//функции
function preloadImage(locations) { //предварительная загрузка изображений
  for (const location of locations) {
    const image = new Image();
    image.src = location.image;
  }
}

preloadImage(locations);

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

function goCave() {
  updateLocation(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    goldSpent -= 10;
    health += 10;
    healthBuy += 10;
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
      goldSpent -= 30;
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
    goldGet += 15;
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

function fightDragon() {
  updateLocation(locations[5]);
  fighting = 2;
  goFight();
}

function goFight() {
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "flex";
  monsterName.textContent = monsters[fighting].name;
  monsterHealthText.textContent = monsterHealth;
}

function attack() {
  let monsterDamage = getMonsterAttackValue(monsters[fighting].level);
  health -= monsterDamage;
  healthspan -= monsterDamage;
  if (isMonsterHit()) {
    let damage =
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= damage;
    totalDamage += damage;
    totalMonstDamage += getMonsterAttackValue(monsters[fighting].level);
    textStory.innerHTML = `Монстр <strong>«${monsters[fighting].name}»</strong> бросается на вас, нанося <strong>${monsterDamage}</strong> единиц урона. Вы атакуете его своим оружием: <strong>${weapons[currentWeapon].name}</strong>, нанося <strong>${damage}</strong> единиц урона.`;
  } else {
    textStory.innerHTML = "Вы промахнулись.";
  }
  healthText.textContent = health;
  monsterHealthText.textContent = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    textStory.innerHTML += ` Ваше оружие <strong>${inventory.pop()}</strong> ломается от мощного удара.`;
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  textStory.innerHTML = `Вы успешно уклоняетесь от атаки монстра: <strong>${monsters[fighting].name}</strong>.`;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  goldGet += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.textContent = gold;
  xpText.textContent = xp;
  updateLocation(locations[7]);
}

function lose() {
  updateLocation(locations[6]);
}

function winGame() {
  updateLocation(locations[8]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Палка"];
  goldText.textContent = gold;
  healthText.textContent = health;
  xpText.textContent = xp;
  goTown();
}

function getStatistics() {
  textStory.innerHTML = `
    Получено опыта: <strong>${xp}</strong><br>
    Потрачено здоровья: <strong>${Math.abs(healthspan)}</strong><br>
    Куплено здоровья: <strong>${healthBuy}</strong><br>
    Потрачено золота: <strong>${Math.abs(goldSpent)}</strong><br>
    Получено золота: <strong>${goldGet}</strong><br>
    Самое сильное оружие: <strong>${weapons[currentWeapon].name}</strong><br>
    Нанесено урона монстрам: <strong>${totalDamage}</strong><br>
    Получено урона от монстров: <strong>${totalMonstDamage}</strong><br>
  `;
}

function getAuthorInfo() {
  textStory.innerHTML = `
    Разработка игры вдохновлена бесплатным курсом площадки <strong><a href="https://www.freecodecamp.org/" target="_blank" class="footer__link">freeCodeCamp</a></strong> «Изучите основы JavaScript, создав ролевую игру».<br>
    Дизайн и кодинг приложения: <strong>Александр Кондаков</strong>.<br>
    Элементы UI: <strong><a href="https://ru.freepik.com/" target="_blank" class="footer__link">FREEPIK</a></strong><br>
    Изображения сгенерированы ИИ на площадке <strong><a href="https://playgroundai.com/" target="_blank" class="footer__link">Playground</a></strong><br>
    Музыка: I’m Not What I Thought by <b>Darren Curtis</b>. <strong><a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" class="footer__link">Creative Commons</a></strong> Attribution 3.0 Unported License.
    Music promoted by <strong><a href="https://www.chosic.com/free-music/all/" target="_blank" class="footer__link">chosic</a></strong>.
  `;
}

function easterEgg() {
  updateLocation(locations[9]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(value) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  textStory.innerHTML = `Вы выбрали число <strong>${value}</strong>. Вот список случайных чисел от Богини Удачи: `;
  for (let i = 1; i < 10; i++) {
    textStory.innerHTML += `<strong>${numbers[i]}</strong>` + "\n";
  }
  if (numbers.indexOf(value) !== -1) {
    textStory.innerHTML +=
      ". Вы угадали число! Вы получаете <strong>20 золотых монет</strong>.";
    gold += 20;
    goldGet += 20;
    goldText.textContent = gold;
  } else {
    textStory.innerHTML +=
      ". Вы не смогли угатать число! Вы теряете <strong>10 единиц здоровья</strong>.";
    health -= 10;
    healthspan -= 10;
    healthText.textContent = health;
    if (health <= 0) {
      lose();
    }
  }
}
