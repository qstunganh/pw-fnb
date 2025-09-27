class Student {
    constructor(name, age, studentId) {
        // Khởi tạo thông tin học sinh
        this.name = name;
        this.age = age;
        this.studentId = studentId;
        this.scores = [];
        this.subjects = [];
    }

    addScore(subject, score) {
        // Thêm điểm cho môn học
        // Lưu cả môn học và điểm
    }

    getAverageScore() {
        // Tính điểm trung bình tất cả môn
    }

    getGrade() {
        // Xếp loại: >= 8.5: "Giỏi", >= 7: "Khá", >= 5: "Trung bình", < 5: "Yếu"
    }

    getSubjectCount() {
        // Đếm số môn học đã có điểm
    }

    displayInfo() {
        // Hiển thị thông tin đầy đủ của học sinh
        // Bao gồm: tên, tuổi, mã SV, điểm TB, xếp loại
    }

    isEligibleForScholarship(minAverage = 8.0) {
        // Kiểm tra đủ điều kiện học bổng không
    }
}


 
const student1 = new Student("Nguyễn Văn An", 20, "SV001");
student1.addScore("Toán", 8.5);
student1.addScore("Lý", 7.5);
student1.addScore("Hóa", 9.0);

console.log(student1.getAverageScore()); // 8.33
console.log(student1.getGrade()); // "Khá"
console.log(student1.isEligibleForScholarship()); // true
student1.displayInfo();
