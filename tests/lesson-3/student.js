/*Examp5: NÂNG CAO - Hệ thống quản lý lớp học
Yêu cầu: 
Tạo file class.js
Kết hợp tất cả các thông tin các bài trên (examp1,... examp4), hãy tạo hệ thống quản lý lớp học hoàn chỉnh
*/
class Student {
    constructor(name, age, studentId) {
        // Khởi tạo thông tin học sinh
        this.name = name;
        this.age = age;
        this.studentId = studentId;
        this.scores = []; // [{ subject, score }]
    }

    addScore(subject, score) {
        // Thêm hoặc cập nhật điểm cho môn học
        const existing = this.scores.find(item => item.subject === subject);
        if (existing) {
            existing.score = score; // cập nhật nếu môn đã có
        } else {
            this.scores.push({ subject, score });
        }
    }

    getAverageScore() {
        // Tính điểm trung bình tất cả môn
        if (this.scores.length === 0) return 0;
        const total = this.scores.reduce((sum, item) => sum + item.score, 0);
        return parseFloat((total / this.scores.length).toFixed(2));
    }

    getGrade() {
        // Xếp loại học lực
        const avg = this.getAverageScore();
        if (avg >= 8.5) return "Giỏi";
        if (avg >= 7) return "Khá";
        if (avg >= 5) return "Trung bình";
        return "Yếu";
    }

    getSubjectCount() {
        // Đếm số môn học đã có điểm
        return this.scores.length;
    }

     displayInfo() {
        // Hiển thị thông tin đầy đủ
        console.log("===== THÔNG TIN HỌC SINH =====");
        console.log(`Họ tên: ${this.name}`);
        console.log(`Tuổi: ${this.age}`);
        console.log(`Mã SV: ${this.studentId}`);
        console.log(`Số môn học: ${this.getSubjectCount()}`);
        console.log(`Điểm trung bình: ${this.getAverageScore()}`);
        console.log(`Xếp loại: ${this.getGrade()}`);
        console.log(`Học bổng: ${this.isEligibleForScholarship() ? "✅ Có" : "❌ Không"}`);
        console.log("Danh sách điểm:");
        this.scores.forEach(item => {
            console.log(`- ${item.subject}: ${item.score}`);
        });
    }   

    isEligibleForScholarship(minAverage = 8.0) {
        // Kiểm tra đủ điều kiện học bổng
        return this.getAverageScore() >= minAverage;
    }
}


// --- DEMO ---
const student1 = new Student("Nguyễn Văn An", 20, "SV001");
student1.addScore("Toán", 8.5);
student1.addScore("Lý", 7.5);
student1.addScore("Hóa", 9.0);

console.log(student1.getAverageScore());           // 8.33
console.log(student1.getGrade());                  // "Khá"
console.log(student1.isEligibleForScholarship());  // true
student1.displayInfo();
