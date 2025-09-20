/*
Cân nặng lý tưởng = Số lẻ của chiều cao (tính bằng cm) x 9 rồi chia 10
Mức cân tối đa = Bằng số lẻ của chiều cao (tính bằng cm)
Mức cân tối thiểu = Số lẻ của chiều cao (tính bằng cm) x 8 rồi chia 10
Như vậy, nếu bạn cao 1,7m, tức 170cm thì :
Cân cân nặng lý tưởng của bạn là: 70 x 9: 10 = 63 kg
Cân nặng tối đa là: 70kg
Cân nặng tối thiểu là: 70 x 8 :10 = 56 kg
*/

// a. Khai báo chiều cao của bạn (cm)
let chieucao = 175;
let solechieucao = chieucao % 100; //chia chieucao cho 100 và lấy số dư

// b. In ra cân nặng lý tưởng, cân nặng tối đa, cân nặng tối thiểu trên cùng một dòng.
let cannanglytuong = (solechieucao * 9) / 10;
let cannangtoida = solechieucao;
let cannangtoithieu = (solechieucao * 8) / 10;
console.log(`Cân nặng lý tưởng: ${cannanglytuong}kg, Cân nặng tối đa: ${cannangtoida}kg, Cân nặng tối thiểu: ${cannangtoithieu}kg`);