/*Examp4: CLASS - Quản lý thông tin học sinh
Yêu cầu: 
Tạo file student.js
Tạo class Student để quản lý thông tin học sinh
*/
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
        const exists = this.students.find(s => s.id === student.id);
        if (exists) {
            throw new Error(`Mã học sinh ${student.id} đã tồn tại`);
        }
        this.students.push(student);
    }

    removeStudent(studentId) {
        // Xóa học sinh khỏi lớp
        const index = this.students.findIndex(s => s.id === studentId);
        if (index !== -1) {
            this.students.splice(index, 1);
        }
    }

    findStudent(keyword) {
        // Tìm học sinh theo tên hoặc mã (không phân biệt hoa thường)
        // Sử dụng string utils: toLowerCase(), includes()
        return this.students.filter(s => 
            s.name.toLowerCase().includes(keyword.toLowerCase()) || 
            s.id.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // 2. Thống kê và báo cáo
    getClassAverage() {
        // Tính điểm trung bình của cả lớp
        if (this.students.length === 0) return 0;
        
        let total = 0;
        for (let student of this.students) {
            const grades = Object.values(student.grades || {});
            if (grades.length > 0) {
                total += grades.reduce((sum, g) => sum + g, 0) / grades.length;
            }
        }
        return total / this.students.length;
    }

    getTopStudents(count = 3) {
        // Lấy top học sinh giỏi nhất
        // Sắp xếp theo điểm TB giảm dần
        return [...this.students]
            .map(s => {
                const grades = Object.values(s.grades || {});
                const avg = grades.length > 0 ? grades.reduce((sum, g) => sum + g, 0) / grades.length : 0;
                return { ...s, average: avg };
            })
            .sort((a, b) => b.average - a.average)
            .slice(0, count);
    }

    getSubjectStatistics(subject) {
        // Thống kê điểm môn học:
        // - Điểm cao nhất, thấp nhất, trung bình
        // - Số học sinh đạt từng loại (Giỏi, Khá, TB, Yếu)
        const scores = this.students
            .filter(s => s.grades && s.grades[subject] !== undefined)
            .map(s => s.grades[subject]);
        
        if (scores.length === 0) {
            return {
                max: 0,
                min: 0,
                average: 0,
                distribution: { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 }
            };
        }
        
        return {
            max: Math.max(...scores),
            min: Math.min(...scores),
            average: scores.reduce((sum, s) => sum + s, 0) / scores.length,
            distribution: {
                "Giỏi": scores.filter(s => s >= 8.0).length,
                "Khá": scores.filter(s => s >= 6.5 && s < 8.0).length,
                "Trung bình": scores.filter(s => s >= 5.0 && s < 6.5).length,
                "Yếu": scores.filter(s => s < 5.0).length
            }
        };
    }

    generateReport() {
        // Tạo báo cáo tổng hợp lớp học
        // Bao gồm: thông tin lớp, danh sách học sinh, thống kê
        return {
            classInfo: {
                className: this.className,
                teacher: this.teacher,
                totalStudents: this.students.length,
                classAverage: this.getClassAverage()
            },
            students: this.students.map(s => {
                const grades = Object.values(s.grades || {});
                const avg = grades.length > 0 ? grades.reduce((sum, g) => sum + g, 0) / grades.length : 0;
                return {
                    id: s.id,
                    name: s.name,
                    average: avg,
                    classification: avg >= 8 ? "Giỏi" : avg >= 6.5 ? "Khá" : avg >= 5 ? "Trung bình" : "Yếu"
                };
            }),
            subjectStats: this.subjects.map(subject => ({
                subject,
                ...this.getSubjectStatistics(subject)
            }))
        };
    }

    // 3. Xử lý dữ liệu nâng cao
    exportStudentList(format = "simple") {
        // Export danh sách học sinh
        // format: "simple" | "detailed" | "grades"
        if (format === "simple") {
            return this.students.map(s => `${s.id} - ${s.name}`).join('\n');
        } else if (format === "detailed") {
            return this.students.map(s => {
                const grades = Object.values(s.grades || {});
                const avg = grades.length > 0 ? grades.reduce((sum, g) => sum + g, 0) / grades.length : 0;
                return `ID: ${s.id}\nTên: ${s.name}\nTuổi: ${s.age || 'N/A'}\nEmail: ${s.email || 'N/A'}\nĐiểm TB: ${avg.toFixed(2)}\n---`;
            }).join('\n');
        } else if (format === "grades") {
            return this.students.map(s => {
                const gradeStr = s.grades ? Object.entries(s.grades).map(([sub, score]) => `${sub}: ${score}`).join(', ') : 'Chưa có điểm';
                return `${s.id} - ${s.name}: ${gradeStr}`;
            }).join('\n');
        }
    }

    importScoresFromString(dataString) {
        // Import điểm từ chuỗi CSV
        // Format: "StudentID,Subject,Score"
        // Ví dụ: "SV001,Toán,8.5\nSV002,Lý,7.0"
        const lines = dataString.trim().split('\n');
        const results = { success: 0, failed: 0, errors: [] };
        
        for (let line of lines) {
            const [studentId, subject, scoreStr] = line.split(',').map(s => s.trim());
            
            const student = this.students.find(s => s.id === studentId);
            if (!student) {
                results.failed++;
                results.errors.push(`Không tìm thấy học sinh ${studentId}`);
                continue;
            }
            
            if (!this.subjects.includes(subject)) {
                results.failed++;
                results.errors.push(`Môn học không hợp lệ: ${subject}`);
                continue;
            }
            
            const score = parseFloat(scoreStr);
            if (isNaN(score) || score < 0 || score > 10) {
                results.failed++;
                results.errors.push(`Điểm không hợp lệ: ${scoreStr}`);
                continue;
            }
            
            if (!student.grades) student.grades = {};
            student.grades[subject] = score;
            results.success++;
        }
        
        return results;
    }

    validateAllData() {
        // Kiểm tra tính hợp lệ của dữ liệu
        // - Điểm trong khoảng 0-10
        // - Thông tin học sinh đầy đủ
        // - Không có dữ liệu trùng lặp
        const issues = [];
        const ids = new Set();
        
        for (let student of this.students) {
            if (!student.id || !student.name) {
                issues.push(`Học sinh thiếu thông tin: ${student.id || 'N/A'}`);
            }
            
            if (ids.has(student.id)) {
                issues.push(`Mã học sinh trùng lặp: ${student.id}`);
            }
            ids.add(student.id);
            
            if (student.grades) {
                for (let [subject, score] of Object.entries(student.grades)) {
                    if (score < 0 || score > 10) {
                        issues.push(`Điểm không hợp lệ: ${student.name} - ${subject}: ${score}`);
                    }
                }
            }
        }
        
        return { isValid: issues.length === 0, issues };
    }
}

// Utility functions hỗ trợ
class DataProcessor {
    static formatStudentData(students) {
        // Format dữ liệu học sinh để hiển thị
        return students.map(s => {
            const grades = Object.values(s.grades || {});
            const avg = grades.length > 0 ? (grades.reduce((sum, g) => sum + g, 0) / grades.length).toFixed(2) : "0.00";
            return {
                id: s.id,
                name: s.name,
                average: avg,
                classification: avg >= 8 ? "Giỏi" : avg >= 6.5 ? "Khá" : avg >= 5 ? "Trung bình" : "Yếu"
            };
        });
    }

    static calculateGradeDistribution(students) {
        // Tính phân bố điểm: bao nhiêu % Giỏi, Khá, TB, Yếu
        let gioi = 0, kha = 0, tb = 0, yeu = 0;
        
        for (let s of students) {
            const grades = Object.values(s.grades || {});
            if (grades.length === 0) continue;
            
            const avg = grades.reduce((sum, g) => sum + g, 0) / grades.length;
            if (avg >= 8.0) gioi++;
            else if (avg >= 6.5) kha++;
            else if (avg >= 5.0) tb++;
            else yeu++;
        }
        
        const total = students.length;
        return {
            "Giỏi": ((gioi / total) * 100).toFixed(1) + '%',
            "Khá": ((kha / total) * 100).toFixed(1) + '%',
            "Trung bình": ((tb / total) * 100).toFixed(1) + '%',
            "Yếu": ((yeu / total) * 100).toFixed(1) + '%'
        };
    }

    static generateStudentId(name, existingIds) {
        // Tự động tạo mã học sinh từ tên
        // Đảm bảo không trùng với mã đã có
        const words = name.trim().split(/\s+/);
        const prefix = words.map(w => w[0].toUpperCase()).join('').substring(0, 3);
        
        let counter = 1;
        let id = `${prefix}${String(counter).padStart(3, '0')}`;
        
        while (existingIds.includes(id)) {
            counter++;
            id = `${prefix}${String(counter).padStart(3, '0')}`;
        }
        
        return id;
    }

    static parseCSVData(csvString) {
        // Parse dữ liệu CSV thành array objects
        const lines = csvString.trim().split('\n');
        if (lines.length === 0) return [];
        
        const headers = lines[0].split(',').map(h => h.trim());
        const result = [];
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            result.push(obj);
        }
        
        return result;
    }
}
// TEST CODE
const class10A = new ClassRoom("10A1", "Nguyễn Văn An");

// Thêm học sinh vào lớp
class10A.addStudent({ id: "SV001", name: "Trần Văn A", age: 16, email: "vana@email.com", grades: { Toán: 9.0, Lý: 8.5, Hóa: 8.0, Văn: 7.5, Anh: 9.5 } });
class10A.addStudent({ id: "SV002", name: "Lê Thị B", age: 15, email: "thib@email.com", grades: { Toán: 8.0, Lý: 9.0, Hóa: 8.5, Văn: 9.0, Anh: 8.5 } });
class10A.addStudent({ id: "SV003", name: "Phạm Văn C", age: 16, email: "vanc@email.com", grades: { Toán: 6.5, Lý: 7.0, Hóa: 6.0, Văn: 8.0, Anh: 7.5 } });
class10A.addStudent({ id: "SV004", name: "Hoàng Thị D", age: 15, email: "thid@email.com", grades: { Toán: 9.5, Lý: 9.0, Hóa: 9.5, Văn: 8.5, Anh: 9.0 } });

// 1. Tìm học sinh theo tên hoặc mã (không phân biệt hoa thường)
console.log("=== TÌM HỌC SINH ===");
console.log(class10A.findStudent("văn"));

// 2. Tính điểm trung bình của cả lớp
console.log("\n=== ĐIỂM TRUNG BÌNH CẢ LỚP ===");
console.log(class10A.getClassAverage());

// 3. Lấy top học sinh giỏi nhất
console.log("\n=== TOP 3 HỌC SINH GIỎI NHẤT ===");
console.log(class10A.getTopStudents(3));

// 4. Thống kê điểm môn học
console.log("\n=== THỐNG KÊ MÔN TOÁN ===");
console.log(class10A.getSubjectStatistics("Toán"));

// 5. Tạo báo cáo tổng hợp lớp học
console.log("\n=== BÁO CÁO TỔNG HỢP ===");
console.log(class10A.generateReport());

// 6. Export danh sách học sinh
console.log("\n=== EXPORT SIMPLE ===");
console.log(class10A.exportStudentList("simple"));

console.log("\n=== EXPORT DETAILED ===");
console.log(class10A.exportStudentList("detailed"));

console.log("\n=== EXPORT GRADES ===");
console.log(class10A.exportStudentList("grades"));

// 7. Import điểm từ chuỗi CSV
console.log("\n=== IMPORT ĐIỂM ===");
console.log(class10A.importScoresFromString("SV001,Toán,9.5\nSV002,Lý,9.5"));

// 8. Kiểm tra tính hợp lệ của dữ liệu
console.log("\n=== KIỂM TRA DỮ LIỆU ===");
console.log(class10A.validateAllData());

// 9. Format dữ liệu học sinh để hiển thị
console.log("\n=== FORMAT STUDENT DATA ===");
console.log(DataProcessor.formatStudentData(class10A.students));

// 10. Tính phân bố điểm
console.log("\n=== PHÂN BỐ ĐIỂM ===");
console.log(DataProcessor.calculateGradeDistribution(class10A.students));

// 11. Tự động tạo mã học sinh từ tên
console.log("\n=== TẠO MÃ HỌC SINH TỰ ĐỘNG ===");
console.log(DataProcessor.generateStudentId("Nguyễn Văn E", ["NVE001", "NVE002"]));

// 12. Parse dữ liệu CSV thành array objects
console.log("\n=== PARSE CSV ===");