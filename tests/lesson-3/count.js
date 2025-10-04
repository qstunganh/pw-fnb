/*Examp3: FUNCTION - Calculator với nhiều chức năng*/
// Tạo calculator với các hàm sau:

function basicCalculator(operation, a, b) {
    const op = operation.toLowerCase();       // Thực hiện phép tính cơ bản
    switch(op) {
        case "add":
        case "cong":
            return a + b;
           
        case "multiply":
        case "nhan":
            return a * b;       
    }
}
console.log("add(5, 3):", basicCalculator("add", 5, 3));  // Input: "add", 5, 3 → Output: 8
console.log("multiply(6, 4):", basicCalculator("multiply", 6, 4));  // Input: "multiply", 4, 6 → Output: 24


function calculateTax(amount, taxRate = 0.1) {
    const tax = amount * taxRate;   // Tính thuế
    return Math.round(tax * 100) / 100;    // Làm tròn 2 chữ số thập phân

}
console.log("Thuế của 1000đ (15%):", calculateTax(1000, 0.15));            // Input: 1000, 0.15 → Output: 150



function calculateDiscount(originalPrice, discountPercent) { 
    const discountAmount = originalPrice * (discountPercent / 100);      // Tính giá sau giảm
    const finalPrice = originalPrice - discountAmount;
    return Math.round(finalPrice * 100) / 100;     // Làm tròn 2 chữ số thập phân
}
console.log("Giá 100, giảm 20%:",calculateDiscount(100, 20));    // Input: 100, 20 → Output: 80



function calculateCompoundInterest(principal, rate, time, compound = 1) {  
    const amount = principal * Math.pow((1 + rate / compound), compound * time);     // Tính lãi kép: A = P(1 + r/n)^(nt) 
    return Math.round(amount * 100) / 100;    // Làm tròn 2 chữ số thập phân
}
console.log("1000đ, 5%/năm, 2 năm, ghép tháng:", calculateCompoundInterest(1000, 0.05, 2, 12));     // Input: 1000, 0.05, 2, 12 → Output: ~1104.89



function formatCurrency(amount, currency = "VND") {
    const roundedAmount = Math.round(amount * 100) / 100;         // Làm tròn đến 2 chữ số thập phân
    const [integerPart, decimalPart] = roundedAmount.toString().split('.');     // Tách phần nguyên và phần thập phân
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');     // Thêm dấu phẩy phân cách hàng nghìn
    // Xử lý theo loại tiền tệ
    if (currency === "VND") {
        // VND không có phần thập phân
        return `${formattedInteger} ${currency}`;
    }
}
console.log("1234567 VND:", formatCurrency(1234567, "VND"));     // Input: 1234567, "VND" → Output: "1,234,567 VND"