let startTime = Date.now();

let currentImageIndex = 0;
let effectsMuted = false;

let farts = 0;
let totalFarts = 0;

let fpcBought = 0;
let burritosBought = 0;
let toiletsBought = 0;
let bathroomsBought = 0;
let moreIngredients = false;
let improvedSeats = false;

let burrito = 0;
let costOfBurrito = 10;

let fpc = 1;
let costOfFpc = 10;

let toilets = 0;
let costOfToilets = 10000;

let bathrooms = 0;
let costOfBathroom = 25000;

let burritoMultiplier = 1;
let toiletMultiplier = 1;
let bathroomMultiplier = 1;


// updates ui of current values
function update() {
  document.getElementById('farts').innerHTML = "Farts: "+farts.toString();
  fps = (getProductionAmount("burrito")) + (getProductionAmount("toilet")) + (getProductionAmount("bathroom"));
  document.getElementById('fpc').innerHTML = "Farts per Click: " + fpc;
  document.getElementById('fps').innerHTML = "Farts per Second: " + fps;
  document.getElementById('buyFpcBtn').innerText = `Buy (Placeholder) (${costOfFpc} farts)`;
  document.getElementById('buyBurritoBtn').innerText = `Buy Burrito (${costOfBurrito} farts)`;  
  document.getElementById('buyToiletBtn').innerText = `Buy Toilet (${costOfToilets} farts)`;
  document.getElementById('buyBathroomBtn').innerText = `Buy Bathroom (${costOfBathroom} farts)`;
  let currentTime = Date.now();
  let elapsedTime = currentTime - startTime; // Elapsed time in milliseconds
  let seconds = Math.floor(elapsedTime / 1000); // Convert to seconds
  let minutes = Math.floor(seconds / 60); // Convert to minutes
  let hours = Math.floor(minutes / 60); // Converts to hours
  seconds = seconds % 60; // Remaining seconds
  minutes = minutes % 60; // Remaining minutes
  // Display the elapsed time in minutes and seconds
  document.getElementById('timePlayed').innerHTML = `Time Wasted: ${hours}h ${minutes}m ${seconds}s`;
  checkToiletUnlock();
  checkBathroomUnlock();
}

// how much each should make
function getProductionAmount(which) {
  if (which === "burrito") {
    return Math.floor(burritosBought * burritoMultiplier);
  } else if (which === "fpc") {
    return Math.floor(1);
  } else if (which === "toilet") {
    return Math.floor(100 * (toiletsBought * toiletMultiplier));
  } else if (which === "bathroom") {
    return Math.floor(250 * (bathroomsBought * bathroomMultiplier));
  }

  return 0; // fallback in case of a typo
}

// buy buildings
function buyFpc() {
  if (farts >= costOfFpc) {
    fpc += getProductionAmount("fpc");
    farts -= costOfFpc;
    costOfFpc = increasePrice("fpc");
  }
  update();
}

function buyBurrito() {
  if (farts >= costOfBurrito) {
    burrito += getProductionAmount("burrito");
    farts -= costOfBurrito;
    costOfBurrito = increasePrice("burrito");
  }
  update();
}

function buyToilet() {
  if (farts >= costOfToilets) {
    toilets += getProductionAmount("toilet");
    farts -= costOfToilets;
    costOfToilets = increasePrice("toilet");
  }
  update();
}

function buyBathroom() {
  if (farts >= costOfBathroom) {
    bathrooms += getProductionAmount("bathroom");
    farts -= costOfBathroom;
    costOfBathroom = increasePrice("bathroom");
  }
  update();
}

// buy upgrades
function buyBurritoUpgrade() {
  if (farts >= 2500 && !moreIngredients) {
    farts -= 2500;
    burritoMultiplier = 2;
    moreIngredients = true;
    document.getElementById("upgradeBurritoBtn").remove();
    update();
  }
}
function buyToiletUpgrade() {
  if (farts >= 250000 && !improvedSeats) {
    farts -= 250000;
    toiletMultiplier = 2;
    improvedSeats = true;
    document.getElementById("upgradeToiletBtn").remove();
    update();
  }
}

// making anthony jiggle
async function moreU() {
  const icon = document.getElementById('clickericon');
  if (!effectsMuted) {
    const sounds = [
      document.getElementById('fart1'),
      document.getElementById('fart2'),
      document.getElementById('fart3')
    ];
    const sound = sounds[Math.floor(Math.random() * sounds.length)];
    sound.currentTime = 0;
    sound.play();
  }
  if (totalFarts >= 2500 && !moreIngredients) {
    document.getElementById("upgradeBurritoBtn").classList.remove("hidden");
  }
  if (totalFarts >= 250000 && !improvedSeats) {
    document.getElementById("upgradeToiletBtn").classList.remove("hidden");
  }

  icon.style.transform = 'scale(0.95)';
  await new Promise(resolve => setTimeout(resolve, 100));
  icon.style.transform = 'scale(1)';
  farts += fpc;
  totalFarts += fpc;
  update();
}
// checks to see if sounds are muted
document.getElementById('muteButton').addEventListener('click', () => {
  effectsMuted = !effectsMuted;
  document.getElementById('muteButton').textContent = effectsMuted ? '🔇 Unmute Farts' : '🔊 Mute Farts';
});

// change anthony icon
const imageSources = [
  "pictures/anthony.jpg",
  "pictures/anthony2.jpg",
  "pictures/anthony3.jpg"
];
function cycleImage() {
  currentImageIndex = (currentImageIndex + 1) % imageSources.length;
  document.getElementById('clickericon').src = imageSources[currentImageIndex];
}
// adds farts every second
async function rec() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  farts += fps;
  totalFarts += fps;
  update();
  requestAnimationFrame(rec);
}
// checks to see if building should be unlocked and unlocks it
function checkToiletUnlock() {
  const toiletBtn = document.getElementById("buyToiletBtn");
  if (totalFarts >= 7500 && toiletBtn.classList.contains("hidden")) {
    toiletBtn.classList.remove("hidden");
    toiletBtn.classList.add("fade-in");
  }
}
function checkBathroomUnlock() {
  const bathroomBtn = document.getElementById("buyBathroomBtn");
  if (totalFarts >= 100000 && bathroomBtn.classList.contains("hidden")) {
    bathroomBtn.classList.remove("hidden");
    bathroomBtn.classList.add("fade-in");
  }
}

rec(); // dont think this does anything
function getBuildingCost(baseCost, amountOwned, multiplier = 1.1) { // Scales by 10%
  return Math.floor(baseCost * Math.pow(multiplier, amountOwned));
}

// increasing price gradually by 2%
function increasePrice(which) {
  if (which === "burrito") {
    burritosBought++;
    return getBuildingCost(10, burritosBought, 1.02);
  } else if (which === "fpc") {
    fpcBought++;
    return getBuildingCost(10, fpcBought, 1.02);
  } else if (which === "toilet") {
    toiletsBought++;
    return getBuildingCost(10000, toiletsBought, 1.02);
  } else if (which == "bathroom") {
    bathroomsBought++;
    return getBuildingCost(25000, bathroomsBought, 1.02)
  }
}



// Call update regularly
setInterval(update, 1000); // Update every second
document.getElementById('clickericon').addEventListener('click', moreU)