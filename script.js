let u = 0;

let ups = 0;
let costOfUps = 10;

let upc = 1;
let costOfUpC = 10;
function moreUPS() {
  if (u > costOfUps) {
    ups += 10;
    u -= costOfUps;
    costOfUps = increasePrice("ups");
  }
  update();
}
function update() {
  document.getElementById('u').innerHTML = "Farts: "+u.toString();
  document.getElementById('ups').innerHTML = "Farts per Second: " + ups;
  document.getElementById('upc').innerHTML = "Farts per Click: " + upc;  
}
function moreUPC() {
  if (u > costOfUpC) {
    upc += 10;
    u -= costOfUpC;
    costOfUpC = increasePrice("upc");
  }
  update();
}
async function moreU() {
  //just a bit of responsiveness
  document.getElementById('clickericon').width += 10;
  document.getElementById('clickericon').height += 10;
  await new Promise(resolve => setTimeout(resolve, 50));
  document.getElementById('clickericon').width -= 10;
  document.getElementById('clickericon').height -= 10;

  let lol = ['Great!', 'Cool!', "Livin' rich, eh?"];
  u += upc;
  update();
}
async function rec() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  u += ups;
  update();
  requestAnimationFrame(rec);
}
rec();
function increasePrice(which) {
  let currentPrice;
  if (which == "ups") {currentPrice = costOfUps} else if (which == "upc") {currentPrice = costOfUpC;}
  
  let nexPrice;
  switch (currentPrice) {
    case 10: //Minimum Price
      nexPrice = 20;
      break;
    case 20:
      nexPrice = 40;
      break;
    case 40:
      nexPrice = 80;
      break;
    case 80:
      nexPrice = 200;
      break;
    case 200:
      nexPrice = 500;
      break;
    case 500:
      nexPrice = 1000;
      break;
    case 1000:
      nexPrice = 5000;
      break;
    case 5000:
      nexPrice = 10000;
      break;
    case 10000:
      nexPrice = 100000;
      break;
    case 100000:
      break;
    }
    return nexPrice;
}
document.getElementById('clickericon').addEventListener('click', moreU)