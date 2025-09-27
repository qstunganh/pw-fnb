function formatName(fullName) {
    return fullName
        .trim()                   // "nguyễn văn   an" - loại bỏ space đầu/cuối
        .split(/\s+/)             // ["nguyễn", "văn", "an"] - Tách từ, loại bỏ space thừa giữa
        .map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )                         // ["Nguyễn", "Văn", "An"] - // Viết hoa chữ cái đầu mỗi từ
        .join(' ');               // Nối lại với 1 space

}
console.log(formatName("  nguyễn văn   an  ")); // "Nguyễn Văn An"


function validateEmail(email) {
    // Kiểm tra email có chứa @ và .com không
    return email.includes('@') && email.includes('.com');
    // Input: "test@gmail.com"
    // Output: true
}
console.log(validateEmail("test@gmail.com")); // true


function extractDomain(email) {
    // Lấy tên miền từ email
    return email.split('@')[1];
    // Input: "user@gmail.com"
    // Output: "gmail.com"
}
console.log(extractDomain("user@gmail.com")); // "gmail.com"


function createUsername(fullName) {
    // Tạo username từ họ tên (viết thường, thay khoảng trắng bằng _)
        return fullName
        .toLowerCase()           // Chuyển về chữ thường
        .trim()                  // Loại bỏ khoảng trắng đầu cuối
        .split(/\s+/)           // Tách thành các từ
        .join('_');             // Nối bằng dấu gạch dưới
    // Input: "Nguyễn Văn An"
    // Output: "nguyen_van_an"
}
console.log(createUsername("Nguyễn Văn An")); // "nguyen_van_an"
