
const mongoose = require("mongoose");
const hocvienSchema = new mongoose.Schema({
    Email: String,
    Hoten: String,
    SoDT: String,
    Thanhtoan: Boolean,
    Vi: String,
    Ngay: Date
});
module.exports = mongoose.model("hocvien",hocvienSchema);

