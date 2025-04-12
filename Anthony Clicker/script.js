let startTime = Date.now();

let farts = 0;

let fpcBought = 0;
let burritosBought = 0;
let toiletsBought = 0;

let burrito = 0;
let costOfBurrito = 10;

let fpc = 1;
let costOfFpc = 10;

let toilets = 0;
let costOfToilets = 10000;

// updates ui of current values
function update() {
  document.getElementById('farts').innerHTML = "Farts: "+farts.toString();
  fps = burrito + toilets;
  document.getElementById('fpc').innerHTML = "Farts per Click: " + fpc;
  document.getElementById('fps').innerHTML = "Farts per Second: " + fps;
  document.getElementById('buyFpcBtn').innerText = `Buy Placeholder (${costOfFpc} farts)`;
  document.getElementById('buyBurritoBtn').innerText = `Buy Burrito (${costOfBurrito} farts)`;  
  document.getElementById('buyToiletBtn').innerText = `Buy Toilet (${costOfToilets} farts)`;
  let currentTime = Date.now();
  let elapsedTime = currentTime - startTime; // Elapsed time in milliseconds
  let seconds = Math.floor(elapsedTime / 1000); // Convert to seconds
  let minutes = Math.floor(seconds / 60); // Convert to minutes
  seconds = seconds % 60; // Remaining seconds
  // Display the elapsed time in minutes and seconds
  document.getElementById('timePlayed').innerHTML = `Time Wasted: ${minutes}m ${seconds}s`;
}

// how much each should make, increases exponentially by 5%
function getProductionAmount(which) {
  if (which === "burrito") {
    return Math.floor(1 * Math.pow(1.05, burritosBought)); // Scales by 5%, unlike the price which scales by 10%
  } else if (which === "fpc") {
    return Math.floor(1 * Math.pow(1.05, fpcBought));
  } else if (which === "toilet")
    return Math.floor(100 * Math.pow(1.05, toiletsBought))

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
    burrito += getProductionAmount("toilet");
    farts -= costOfToilets;
    costOfToilets = increasePrice("toilet");
  }
  update();
}
// making anthony jiggle
async function moreU() {
  document.getElementById('clickericon').width += 10;
  document.getElementById('clickericon').height += 10;
  await new Promise(resolve => setTimeout(resolve, 50));
  document.getElementById('clickericon').width -= 10;
  document.getElementById('clickericon').height -= 10;

  farts += fpc;
  update();
}
async function rec() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  farts += fps;
  update();
  requestAnimationFrame(rec);
}
rec();
function getBuildingCost(baseCost, amountOwned, multiplier = 1.1) { // Scales by 10%
  return Math.floor(baseCost * Math.pow(multiplier, amountOwned));
}

// increasing price gradually by 5%
function increasePrice(which) {
  if (which === "burrito") {
    burritosBought++;
    return getBuildingCost(10, burritosBought);
  } else if (which === "fpc") {
    fpcBought++;
    return getBuildingCost(10, fpcBought);
  } else if (which === "toilet") {
    toiletsBought++;
    return getBuildingCost(10000, toiletsBought, 1.05);
  }
}

// Call update regularly
setInterval(update, 1000); // Update every second
document.getElementById('clickericon').addEventListener('click', moreU)