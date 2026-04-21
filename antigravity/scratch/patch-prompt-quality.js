const fs = require('fs');

const files = ['de-thi-hoahoc.html', 'de-thi-toan.html', 'de-thi-vatli.html'];

const oldReturn = `secs + '\\n---\\n**--------- HẾT --------**\\n---\\n## ĐÁP ÁN\\n' +
            'Yêu cầu: SGK GDPT2018, đúng ' + khoiLop + ', Đ/S 4 phát biểu a-d, **Câu x.** in đậm. Trả về đề hoàn chỉnh.';`;

const newReturn = `secs + '\\n---\\n**--------- HẾT --------**\\n---\\n## ĐÁP ÁN\\n\\n' +
            'YÊU CẦU CHẤT LƯỢNG CÂU HỎI:\\n' +
            '- Bám sát SGK GDPT 2018, đúng ' + khoiLop + '\\n' +
            '- Mỗi câu hỏi phải là CÂU HOÀN CHỈNH có chủ ngữ, vị ngữ, rõ ràng, dễ hiểu\\n' +
            '- KHÔNG viết câu hỏi quá ngắn, cụt lủn, thiếu ngữ cảnh\\n' +
            '- Câu TN: đặt tình huống cụ thể, ví dụ "Khi em thực hiện thí nghiệm đo lực ma sát, em cần sử dụng dụng cụ nào?"\\n' +
            '- Câu Đ/S: mỗi câu phải có đoạn MÔ TẢ TÌNH HUỐNG dài 3-5 dòng, sau đó 4 phát biểu a),b),c),d) đầy đủ ý nghĩa\\n' +
            '- Câu TL: đề bài chi tiết, có ngữ cảnh thực tế, có thang điểm rõ từng ý\\n' +
            '- 4 đáp án A/B/C/D phải hợp lý, có tính đánh lừa, không quá dễ đoán\\n' +
            '- **Câu x.** in đậm số câu\\n' +
            '- Trả về đề hoàn chỉnh, không giải thích thêm.';`;

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    if (c.includes(oldReturn)) {
        c = c.replace(oldReturn, newReturn);
        fs.writeFileSync(f, c, 'utf8');
        console.log(f + ': PATCHED');
    } else {
        console.log(f + ': pattern not found, checking...');
        // Try simpler match
        const simpleOld = "Yêu cầu: SGK GDPT2018, đúng ' + khoiLop + ', Đ/S 4 phát biểu a-d, **Câu x.** in đậm. Trả về đề hoàn chỉnh.';";
        const simpleNew = `'YÊU CẦU CHẤT LƯỢNG CÂU HỎI:\\n' +
            '- Bám sát SGK GDPT 2018, đúng ' + khoiLop + '\\n' +
            '- Mỗi câu hỏi phải là CÂU HOÀN CHỈNH có chủ ngữ, vị ngữ, rõ ràng, dễ hiểu\\n' +
            '- KHÔNG viết câu hỏi quá ngắn, cụt lủn, thiếu ngữ cảnh\\n' +
            '- Câu TN: đặt tình huống cụ thể, câu hỏi đầy đủ ý nghĩa\\n' +
            '- Câu Đ/S: mỗi câu phải có đoạn MÔ TẢ TÌNH HUỐNG dài 3-5 dòng, sau đó 4 phát biểu a),b),c),d) đầy đủ ý nghĩa\\n' +
            '- Câu TL: đề bài chi tiết, có ngữ cảnh thực tế, có thang điểm rõ từng ý\\n' +
            '- 4 đáp án A/B/C/D phải hợp lý, có tính đánh lừa, không quá dễ đoán\\n' +
            '- **Câu x.** in đậm số câu\\n' +
            '- Trả về đề hoàn chỉnh, không giải thích thêm.';`;
        if (c.includes(simpleOld)) {
            c = c.replace(simpleOld, simpleNew);
            fs.writeFileSync(f, c, 'utf8');
            console.log(f + ': PATCHED (simple)');
        } else {
            console.log(f + ': SKIPPED - manual check needed');
        }
    }
});
