class ClassRoom {
    constructor(className, teacher) {
        this.className = className;
        this.teacher = teacher;
        this.students = [];
        this.subjects = ["Toán", "Lý", "Hóa", "Văn", "Anh"];
    }

    // 1. Quản lý học sinh
    addStudent(student) {
        // Thêm học sinh vào lớp
        // Kiểm tra trùng mã học sinh
    }

    removeStudent(studentId) {
        // Xóa học sinh khỏi lớp
    }

    findStudent(keyword) {
        // Tìm học sinh theo tên hoặc mã (không phân biệt hoa thường)
        // Sử dụng string utils: toLowerCase(), includes()
    }

    // 2. Thống kê và báo cáo
    getClassAverage() {
        // Tính điểm trung bình của cả lớp
    }

    getTopStudents(count = 3) {
        // Lấy top học sinh giỏi nhất
        // Sắp xếp theo điểm TB giảm dần
    }

    getSubjectStatistics(subject) {
        // Thống kê điểm môn học:
        // - Điểm cao nhất, thấp nhất, trung bình
        // - Số học sinh đạt từng loại (Giỏi, Khá, TB, Yếu)
    }

    generateReport() {
        // Tạo báo cáo tổng hợp lớp học
        // Bao gồm: thông tin lớp, danh sách học sinh, thống kê
    }

    // 3. Xử lý dữ liệu nâng cao
    exportStudentList(format = "simple") {
        // Export danh sách học sinh
        // format: "simple" | "detailed" | "grades"
    }

    importScoresFromString(dataString) {
        // Import điểm từ chuỗi CSV
        // Format: "StudentID,Subject,Score"
        // Ví dụ: "SV001,Toán,8.5\nSV002,Lý,7.0"
    }

    validateAllData() {
        // Kiểm tra tính hợp lệ của dữ liệu
        // - Điểm trong khoảng 0-10
        // - Thông tin học sinh đầy đủ
        // - Không có dữ liệu trùng lặp
    }
}

// Utility functions hỗ trợ
class DataProcessor {
    static formatStudentData(students) {
        // Format dữ liệu học sinh để hiển thị
    }

    static calculateGradeDistribution(students) {
        // Tính phân bố điểm: bao nhiêu % Giỏi, Khá, TB, Yếu
    }

    static generateStudentId(name, existingIds) {
        // Tự động tạo mã học sinh từ tên
        // Đảm bảo không trùng với mã đã có
    }

    static parseCSVData(csvString) {
        // Parse dữ liệu CSV thành array objects
    }
}
