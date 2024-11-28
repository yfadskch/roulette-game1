document.addEventListener("DOMContentLoaded", () => {
    const spinButton = document.getElementById("spin-button");
    const resultDiv = document.getElementById("result");
    const rouletteBackground = document.getElementById("roulette-background");

    // 按照轮盘上的实际数字顺序排列
    const numbersOnWheel = [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
        5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
    ];

    spinButton.addEventListener("click", () => {
        const betNumber = parseInt(document.getElementById("bet-number").value, 10);
        if (isNaN(betNumber) || betNumber < 0 || betNumber > 36) {
            resultDiv.textContent = "请输入有效的数字 (0-36)。";
            return;
        }

        // 随机生成中奖号码
        const winningIndex = Math.floor(Math.random() * numbersOnWheel.length);
        const winningNumber = numbersOnWheel[winningIndex];

        // 每个号码对应的角度
        const anglePerNumber = 360 / numbersOnWheel.length;
        const degrees = winningIndex * anglePerNumber;

        // 计算旋转的角度，确保中奖数字在指针下
        const totalRotation = 3600 + (360 - degrees); // 多圈旋转，指针指向对应号码

        rouletteBackground.style.transition = "transform 4s ease-out";
        rouletteBackground.style.transform = `rotate(${totalRotation}deg)`;

        // 显示结果
        setTimeout(() => {
            if (betNumber === winningNumber) {
                resultDiv.textContent = `恭喜你！中奖号码是 ${winningNumber}，你赢了！`;
            } else {
                resultDiv.textContent = `很遗憾，中奖号码是 ${winningNumber}，你输了！`;
            }
        }, 4000);
    });
});
