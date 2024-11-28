document.addEventListener("DOMContentLoaded", () => {
    const spinButton = document.getElementById("spin-button");
    const resultDiv = document.getElementById("result");
    const rouletteBackground = document.getElementById("roulette-background");

    spinButton.addEventListener("click", () => {
        const betNumber = parseInt(document.getElementById("bet-number").value, 10);
        if (isNaN(betNumber) || betNumber < 0 || betNumber > 36) {
            resultDiv.textContent = "请输入有效的数字 (0-36)。";
            return;
        }

        // 旋转逻辑
        const winningNumber = Math.floor(Math.random() * 37); // 0 to 36
        const degrees = winningNumber * (360 / 37); // 每个数字的角度
        const totalRotation = 3600 + degrees; // 多圈旋转加上目标位置

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
