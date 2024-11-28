// 初始化积分和游戏状态
let points = 100;
let isSpinning = false;

// 获取 DOM 元素
const spinButton = document.getElementById("spin-button");
const betInput = document.getElementById("bet");
const resultDisplay = document.getElementById("result");
const pointsDisplay = document.getElementById("points");
const rouletteContainer = document.getElementById("roulette-container");
const spinSound = document.getElementById("spin-sound");

// 更新积分显示
function updatePoints(won) {
  if (won) {
    points += 50;
  } else {
    points -= 10;
  }
  pointsDisplay.textContent = `积分：${points}`;
}

// 随机生成轮盘结果
function getRandomNumber() {
  return Math.floor(Math.random() * 37); // 生成 0 到 36 的数字
}

// 轮盘旋转动画
function spinRoulette(targetNumber) {
  isSpinning = true;
  const spins = Math.floor(Math.random() * 5) + 5; // 随机旋转圈数
  const anglePerNumber = 360 / 37;
  const targetAngle = targetNumber * anglePerNumber;

  rouletteContainer.style.animation = `spin ${spins + 2}s ease-out`;

  setTimeout(() => {
    rouletteContainer.style.transform = `rotate(${spins * 360 + targetAngle}deg)`;
    isSpinning = false;
  }, (spins + 2) * 1000);
}

// 游戏逻辑
spinButton.addEventListener("click", () => {
  if (isSpinning) return; // 如果轮盘正在旋转，则不允许再次点击
  const bet = parseInt(betInput.value);
  if (isNaN(bet) || bet < 0 || bet > 36) {
    resultDisplay.textContent = "请输入一个有效的数字（0-36）！";
    return;
  }

  // 播放旋转音效
  spinSound.play();

  const randomNumber = getRandomNumber();
  spinRoulette(randomNumber);

  setTimeout(() => {
    if (randomNumber === bet) {
      resultDisplay.textContent = `恭喜！中奖号码是 ${randomNumber}，你赢了！`;
      updatePoints(true);
    } else {
      resultDisplay.textContent = `很遗憾，中奖号码是 ${randomNumber}，你输了！`;
      updatePoints(false);
    }
  }, 7000); // 等待动画结束后显示结果
});
