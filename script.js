const spinButton = document.getElementById('spin-button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const pointer = document.getElementById('pointer');

let currentScore = 0;

spinButton.addEventListener('click', () => {
    const userNumber = parseInt(document.getElementById('number').value);

    if (isNaN(userNumber) || userNumber < 0 || userNumber > 36) {
        resultElement.textContent = '请输入一个有效的数字 (0-36)';
        return;
    }

    const winningNumber = Math.floor(Math.random() * 37); // 0 to 36
    const rotationDegrees = 360 * 3 + (winningNumber * (360 / 37));

    pointer.style.transition = 'transform 3s ease-out';
    pointer.style.transform = `rotate(${rotationDegrees}deg)`;

    setTimeout(() => {
        if (userNumber === winningNumber) {
            resultElement.textContent = `恭喜你，中奖号码是 ${winningNumber}，你赢了！`;
            currentScore += 100;
        } else {
            resultElement.textContent = `很遗憾，中奖号码是 ${winningNumber}，你输了！`;
            currentScore -= 50;
        }
        scoreElement.textContent = `积分：${currentScore}`;
    }, 3000);
});
