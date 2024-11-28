// 获取轮盘和结果的DOM元素
const wheel = document.getElementById('roulette-container');
const result = document.getElementById('result');
const spinButton = document.getElementById('spin-button');

let isSpinning = false; // 防止重复点击旋转按钮

// 轮盘数据：包含数字和对应颜色
const rouletteData = [
  { number: 0, color: '绿色' },
  { number: 1, color: '红色' },
  { number: 2, color: '黑色' },
  { number: 3, color: '红色' },
  { number: 4, color: '黑色' },
  { number: 5, color: '红色' },
  { number: 6, color: '黑色' },
  { number: 7, color: '红色' },
  { number: 8, color: '黑色' },
  { number: 9, color: '红色' },
  { number: 10, color: '黑色' },
  { number: 11, color: '黑色' },
  { number: 12, color: '红色' },
  { number: 13, color: '黑色' },
  { number: 14, color: '红色' },
  { number: 15, color: '黑色' },
  { number: 16, color: '红色' },
  { number: 17, color: '黑色' },
  { number: 18, color: '红色' },
  { number: 19, color: '红色' },
  { number: 20, color: '黑色' },
  { number: 21, color: '红色' },
  { number: 22, color: '黑色' },
  { number: 23, color: '红色' },
  { number: 24, color: '黑色' },
  { number: 25, color: '红色' },
  { number: 26, color: '黑色' },
  { number: 27, color: '红色' },
  { number: 28, color: '黑色' },
  { number: 29, color: '黑色' },
  { number: 30, color: '红色' },
  { number: 31, color: '黑色' },
  { number: 32, color: '红色' },
  { number: 33, color: '黑色' },
  { number: 34, color: '红色' },
  { number: 35, color: '黑色' },
  { number: 36, color: '红色' }
];

// 点击旋转按钮的逻辑
spinButton.addEventListener('click', () => {
  if (isSpinning) return; // 防止重复旋转
  isSpinning = true;

  // 随机生成旋转角度
  const randomAngle = Math.floor(Math.random() * 360);

  // 设置旋转动画
  wheel.style.transition = 'transform 4s ease-out'; // 动画时间
  wheel.style.transform = `rotate(${3600 + randomAngle}deg)`; // 停止角度

  // 旋转结束后计算结果
  setTimeout(() => {
    isSpinning = false; // 重置状态
    wheel.style.transition = 'none'; // 移除动画
    wheel.style.transform = `rotate(${randomAngle}deg)`; // 固定角度

    // 根据角度计算结果
    const resultIndex = Math.floor((randomAngle / 360) * rouletteData.length) % rouletteData.length;
    const resultData = rouletteData[resultIndex];

    // 显示结果
    result.textContent = `结果是：数字 ${resultData.number} (${resultData.color})！`;
  }, 4000); // 动画时长一致
});
