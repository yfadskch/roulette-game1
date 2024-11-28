// 初始化积分和游戏状态
let points = 100;
let isSpinning = false;
const totalNumbers = 37; // 轮盘号码总数
const anglePerNumber = 360 / totalNumbers; // 每个号码对应的角度

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
  return Math.floor(Math.random() * totalNumbers); // 生成 0 到 36 的数字
}

// 根据角度计算号码
function getNumberFromAngle(angle) {
  const normalizedAngle = angle % 360; // 取模 360，获取当前角度
  const numberIndex = Math.floor(normalizedAngle / anglePerNumber); // 计算号码索引
  return (totalNumbers - numberIndex) % totalNumbers; // 映射号码（逆时针排列）
}

// 轮盘旋转动画
function spinRoulette(targetNumber) {
  isSpinning = true;
  const spins = Math.floor(Math.random() * 5) + 5; // 随机旋转圈数
  const targetAngle = targetNumber * anglePerNumber; // 目标角度

  // 设置动画
  const totalRotation = spins * 360 + targetAngle;
  rouletteContainer.style.transition = "transform 5s ease-out"; // 动画过渡
  rouletteContainer.style.transform = `rotate(${totalRotation}deg)`; // 旋转

  // 等待动画结束后显示结果
  setTimeout(() => {
    const finalAngle = totalRotation % 360; // 最终角度
    const finalNumber = getNumberFromAngle(finalAngle); // 计算号码
    resultDisplay.textContent = `中奖号码是 ${finalNumber}`;
    isSpinning = false;
  }, 5000);
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

  const randomNumber = getRandomNumber(); // 随机生成目标号码
  spinRoulette(randomNumber);

  setTimeout(() => {
    if (randomNumber === bet) {
      resultDisplay.textContent += "，恭喜你赢了！";
      updatePoints(true);
    } else {
      resultDisplay.textContent += "，很遗憾，你输了！";
      updatePoints(false);
    }
  }, 6000); // 等待动画和结果显示完成
});
