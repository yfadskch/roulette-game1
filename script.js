// 初始化游戏状态
let points = 100;
let isSpinning = false;
const totalNumbers = 37; // 总号码数（0-36）
const anglePerNumber = 360 / totalNumbers; // 每个号码对应的角度

// 获取 DOM 元素
const spinButton = document.getElementById("spin-button");
const betInput = document.getElementById("bet");
const resultDisplay = document.getElementById("result");
const pointsDisplay = document.getElementById("points");
const rouletteContainer = document.getElementById("roulette-container");
const spinSound = document.getElementById("spin-sound");
const highlight = document.getElementById("highlight");
const winnerDisplay = document.getElementById("winner");
const winnerNumber = document.getElementById("winner-number");

// 更新积分
function updatePoints(won) {
  if (won) {
    points += 50;
  } else {
    points -= 10;
  }
  pointsDisplay.textContent = `积分：${points}`;
}

// 随机生成轮盘号码
function getRandomNumber() {
  return Math.floor(Math.random() * totalNumbers);
}

// 根据号码计算高亮位置
function setHighlightPosition(number) {
  const angle = number * anglePerNumber;
  const radius = 160; // 高亮半径（从中心到数字的距离）
  const radian = (angle - 90) * (Math.PI / 180); // 转换为弧度（角度 -90° 从顶部开始）
  const x = radius * Math.cos(radian);
  const y = radius * Math.sin(radian);
  highlight.style.transform = `translate(${x}px, ${y}px)`;
  highlight.style.display = "block";
}

// 轮盘旋转动画
function spinRoulette(targetNumber) {
  isSpinning = true;
  const spins = Math.floor(Math.random() * 5) + 5; // 随机圈数
  const targetAngle = targetNumber * anglePerNumber;

  const totalRotation = spins * 360 + targetAngle; // 计算总旋转角度
  rouletteContainer.style.transition = "transform 5s ease-out"; // 设置动画
  rouletteContainer.style.transform = `rotate(${totalRotation}deg)`; // 应用旋转

  setTimeout(() => {
    const finalAngle = totalRotation % 360;
    const finalNumber = Math.floor(totalNumbers - (finalAngle / anglePerNumber)) % totalNumbers;
    setHighlightPosition(finalNumber);
    winnerDisplay.textContent = finalNumber;
    winnerNumber.style.display = "block";
    resultDisplay.textContent = finalNumber === parseInt(betInput.value)
      ? "恭喜你赢了！"
      : "很遗憾，你输了！";
    updatePoints(finalNumber === parseInt(betInput.value));
    isSpinning = false;
  }, 5000);
}

// 游戏逻辑
spinButton.addEventListener("click", () => {
  if (isSpinning) return; // 禁止重复点击
  const bet = parseInt(betInput.value);
  if (isNaN(bet) || bet < 0 || bet > 36) {
    resultDisplay.textContent = "请输入有效的数字（0-36）！";
    return;
  }

  spinSound.play(); // 播放音效
  const randomNumber = getRandomNumber();
  spinRoulette(randomNumber);
});
