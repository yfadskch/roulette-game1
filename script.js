// 获取 HTML 元素
const rouletteWheel = document.getElementById('roulette-wheel');
const resultDisplay = document.getElementById('winning-number');
const userBetInput = document.getElementById('user-bet');

// 轮盘数字
const rouletteNumbers = Array.from({ length: 37 }, (_, i) => i);

// 随机选择中奖号码
function getRandomNumber() {
    return rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];
}

// 旋转轮盘
function spinRoulette() {
    const userBet = parseInt(userBetInput.value);
    if (isNaN(userBet) || userBet < 0 || userBet > 36) {
        alert('请输入有效的数字 (0-36)。');
        return;
    }

    const spinDuration = 3000; // 旋转时间 (毫秒)
    const winningNumber = getRandomNumber(); // 随机中奖号码
    const degrees = 360 * 5 + (winningNumber * (360 / 37)); // 确定旋转角度

    // 添加旋转动画
    rouletteWheel.style.transition = `transform ${spinDuration}ms ease-out`;
    rouletteWheel.style.transform = `rotate(${degrees}deg)`;

    // 延迟显示结果
    setTimeout(() => {
        resultDisplay.textContent = `中奖号码是 ${winningNumber}${winningNumber === userBet ? '，恭喜你赢了！' : '，你输了！'}`;
    }, spinDuration);
}
