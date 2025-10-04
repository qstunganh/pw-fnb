/* Examp2: ARRAY UTILS - Quản lý danh sách điểm số */

function calculateAverage(scores) {
    if (scores.length === 0) return 0;  // Xử lý mảng rỗng
    const sum = scores.reduce((total, score) => total + score, 0);  // Tính điểm trung bình
    return sum / scores.length;
    // Input: [8, 7, 9, 6, 10] → sum = 40
    // Output: 8
}
console.log(calculateAverage([8, 7, 9, 6, 10]));  //8


function findHighestScore(scores) {
    if (scores.length === 0) return 0;  // Xử lý mảng rỗng
    return Math.max(...scores); // Tìm điểm cao nhất
    
    // Input: [8, 7, 9, 6, 10]
    // Output: 10
}
console.log(findHighestScore([8, 7, 9, 6, 10])); // 10


function countPassingGrades(scores, passingScore = 5) {
    // Đếm số điểm >= điểm đậu
    return scores.filter(score => score >= passingScore).length;
    
    // Input: [8, 4, 9, 3, 10], 5
    // filter: [8, 9, 10] → length = 3
    // Output: 3
}
console.log(countPassingGrades([8, 4, 9, 3, 10], 5)); // 3 (>= 5)


function filterFailingStudents(students, scores) {
    // Lọc ra học sinh có điểm < 5
    return students.filter((student, index) => scores[index] < 5);
    // Input: ["An", "Bình", "Chi"], [8, 4, 6]
    // Output: ["Bình"]
}
console.log(filterFailingStudents(["An", "Bình", "Chi"], [8, 4, 6])); // ["Bình"]


function sortStudentsByScore(students, scores) {
    // Tạo mảng cặp [tên, điểm]
    const pairs = [];
    for (let i = 0; i < students.length; i++) {
        pairs.push([students[i], scores[i]]);
    }  
    // Sắp xếp theo điểm giảm dần
    return pairs.sort((a, b) => b[1] - a[1]);
    // Input: ["An", "Bình", "Chi"], [6, 9, 7]
    // Output: [["Bình", 9], ["Chi", 7], ["An", 6]]
}
console.log(sortStudentsByScore(["An", "Bình", "Chi"], [6, 9, 7]));