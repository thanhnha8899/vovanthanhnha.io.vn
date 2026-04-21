/**
 * Fix generateYeuCau() in all exam pages
 * Replaces Physics topic IDs with correct subject-specific IDs
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Define correct yeuCau mapping for each subject
const yeuCauMaps = {
    'de-thi-tinhoc.html': `    function generateYeuCau(topic) {
        const yeuCauMap = {
            'may-tinh-xa-hoi': 'Kh\u00e1i ni\u1ec7m th\u00f4ng tin, d\u1eef li\u1ec7u, bi\u1ec3u di\u1ec5n th\u00f4ng tin, h\u1ec7 nh\u1ecb ph\u00e2n',
            'mang-may-tinh': 'M\u1ea1ng m\u00e1y t\u00ednh, Internet, an to\u00e0n tr\u00ean Internet',
            'dao-duc-phap-luat': 'B\u1ea3n quy\u1ec1n, s\u1edf h\u1eefu tr\u00ed tu\u1ec7, an to\u00e0n th\u00f4ng tin, t\u00e1c \u0111\u1ed9ng CNTT',
            'ung-dung-tin-hoc': 'So\u1ea1n th\u1ea3o v\u0103n b\u1ea3n, b\u1ea3ng t\u00ednh, tr\u00ecnh chi\u1ebfu, ph\u1ea7n m\u1ec1m h\u1ecdc t\u1eadp',
            'giai-quyet-van-de': 'Thu\u1eadt to\u00e1n, thu\u1eadt to\u00e1n s\u1eafp x\u1ebfp, t\u00ecm ki\u1ebfm, \u0111\u00e1nh gi\u00e1 thu\u1eadt to\u00e1n',
            'lap-trinh-python': 'Bi\u1ebfn, ki\u1ec3u d\u1eef li\u1ec7u, c\u00e2u l\u1ec7nh \u0111i\u1ec1u ki\u1ec7n, v\u00f2ng l\u1eb7p, h\u00e0m, danh s\u00e1ch',
            'co-so-du-lieu': 'Kh\u00e1i ni\u1ec7m CSDL, h\u1ec7 qu\u1ea3n tr\u1ecb CSDL, b\u1ea3ng v\u00e0 m\u1ed1i quan h\u1ec7',
            'huong-nghiep': 'Ng\u00e0nh ngh\u1ec1 CNTT, xu h\u01b0\u1edbng ph\u00e1t tri\u1ec3n, k\u1ef9 n\u0103ng c\u1ea7n thi\u1ebft'
        };
        return yeuCauMap[topic.id] || 'Kh\u00e1i ni\u1ec7m, \u0111\u1ecbnh ngh\u0129a, t\u00ednh ch\u1ea5t c\u01a1 b\u1ea3n';
    }`,

    'de-thi-diali.html': `    function generateYeuCau(topic) {
        const yeuCauMap = {
            'su-dung-ban-do': 'Kh\u00e1i ni\u1ec7m b\u1ea3n \u0111\u1ed3, t\u1ec9 l\u1ec7 b\u1ea3n \u0111\u1ed3, k\u00ed hi\u1ec7u, \u0111\u1ecdc b\u1ea3n \u0111\u1ed3',
            'trai-dat': 'H\u00ecnh d\u1ea1ng, k\u00edch th\u01b0\u1edbc, chuy\u1ec3n \u0111\u1ed9ng c\u1ee7a Tr\u00e1i \u0110\u1ea5t, h\u1ec7 qu\u1ea3',
            'thach-quyen': 'C\u1ea5u tr\u00fac Tr\u00e1i \u0110\u1ea5t, kho\u00e1ng v\u1eadt, \u0111\u00e1, n\u1ed9i l\u1ef1c v\u00e0 ngo\u1ea1i l\u1ef1c',
            'khi-quyen': 'C\u1ea5u tr\u00fac kh\u00ed quy\u1ec3n, nhi\u1ec7t \u0111\u1ed9, kh\u00ed \u00e1p, gi\u00f3, m\u01b0a',
            'thuy-quyen': 'V\u00f2ng tu\u1ea7n ho\u00e0n n\u01b0\u1edbc, s\u00f4ng ng\u00f2i, bi\u1ec3n v\u00e0 \u0111\u1ea1i d\u01b0\u01a1ng',
            'tho-nhuong': 'C\u00e1c nh\u00e2n t\u1ed1 h\u00ecnh th\u00e0nh, ph\u00e2n lo\u1ea1i \u0111\u1ea5t, sinh quy\u1ec3n',
            'dan-cu': '\u0110\u1eb7c \u0111i\u1ec3m d\u00e2n c\u01b0, ph\u00e2n b\u1ed1 d\u00e2n c\u01b0, \u0111\u00f4 th\u1ecb h\u00f3a',
            'kinh-te': 'C\u01a1 c\u1ea5u kinh t\u1ebf, n\u00f4ng nghi\u1ec7p, c\u00f4ng nghi\u1ec7p, d\u1ecbch v\u1ee5'
        };
        return yeuCauMap[topic.id] || 'Kh\u00e1i ni\u1ec7m, \u0111\u1eb7c \u0111i\u1ec3m, ph\u00e2n lo\u1ea1i';
    }`,

    'de-thi-hoahoc.html': `    function generateYeuCau(topic) {
        const yeuCauMap = {
            'bang-tuan-hoan': 'C\u1ea5u t\u1ea1o b\u1ea3ng tu\u1ea7n ho\u00e0n, \u0111\u1ecbnh lu\u1eadt tu\u1ea7n ho\u00e0n, bi\u1ebfn \u0111\u1ed5i tu\u1ea7n ho\u00e0n',
            'cau-tao-nguyen-tu': 'Th\u00e0nh ph\u1ea7n nguy\u00ean t\u1eed, l\u1edbp v\u1ecf electron, c\u1ea5u h\u00ecnh electron',
            'lien-ket-hoa-hoc': 'Li\u00ean k\u1ebft ion, li\u00ean k\u1ebft c\u1ed9ng h\u00f3a tr\u1ecb, \u0111i\u1ec7n h\u00f3a tr\u1ecb',
            'phan-ung-oxi-hoa-khu': 'S\u1ed1 oxi h\u00f3a, ch\u1ea5t kh\u1eed, ch\u1ea5t oxi h\u00f3a, c\u00e2n b\u1eb1ng ph\u1ea3n \u1ee9ng',
            'nang-luong-hoa-hoc': 'Ph\u1ea3n \u1ee9ng t\u1ecfa nhi\u1ec7t, thu nhi\u1ec7t, enthalpy, \u0111\u1ecbnh lu\u1eadt Hess',
            'toc-do-phan-ung': 'T\u1ed1c \u0111\u1ed9 ph\u1ea3n \u1ee9ng, y\u1ebfu t\u1ed1 \u1ea3nh h\u01b0\u1edfng, c\u00e2n b\u1eb1ng h\u00f3a h\u1ecdc',
            'nguyen-to-nhom-viia': 'T\u00ednh ch\u1ea5t Halogen, HX, mu\u1ed1i halogenua',
            'chuyen-de-10': 'Li\u00ean k\u1ebft, ph\u1ea3n \u1ee9ng, c\u01a1 s\u1edf h\u00f3a h\u1ecdc n\u00e2ng cao'
        };
        return yeuCauMap[topic.id] || 'Kh\u00e1i ni\u1ec7m, t\u00ednh ch\u1ea5t, ph\u1ea3n \u1ee9ng \u0111\u1eb7c tr\u01b0ng';
    }`,

    'de-thi-ktpl.html': `    function generateYeuCau(topic) {
        const yeuCauMap = {
            'nen-kinh-te': 'Kh\u00e1i ni\u1ec7m n\u1ec1n kinh t\u1ebf, c\u00e1c ch\u1ee7 th\u1ec3 kinh t\u1ebf, vai tr\u00f2',
            'thi-truong': 'Th\u1ecb tr\u01b0\u1eddng, cung c\u1ea7u, c\u01a1 ch\u1ebf th\u1ecb tr\u01b0\u1eddng, gi\u00e1 c\u1ea3',
            'ngan-sach-thue': 'Ng\u00e2n s\u00e1ch nh\u00e0 n\u01b0\u1edbc, thu\u1ebf, vai tr\u00f2 c\u1ee7a thu\u1ebf',
            'ngan-hang': 'Ng\u00e2n h\u00e0ng, l\u00e3i su\u1ea5t, t\u00edn d\u1ee5ng, ti\u1ebft ki\u1ec7m',
            'san-xuat-kinh-doanh': 'S\u1ea3n xu\u1ea5t, kinh doanh, vi\u1ec7c l\u00e0m, ngh\u1ec1 nghi\u1ec7p',
            'phap-luat': 'Kh\u00e1i ni\u1ec7m ph\u00e1p lu\u1eadt, h\u1ec7 th\u1ed1ng ph\u00e1p lu\u1eadt, vi ph\u1ea1m ph\u00e1p lu\u1eadt',
            'quyen-nghia-vu': 'Quy\u1ec1n v\u00e0 ngh\u0129a v\u1ee5 c\u00f4ng d\u00e2n, quy\u1ec1n con ng\u01b0\u1eddi',
            'hien-phap': 'Hi\u1ebfn ph\u00e1p, b\u1ed9 m\u00e1y nh\u00e0 n\u01b0\u1edbc, nguy\u00ean t\u1eafc ho\u1ea1t \u0111\u1ed9ng'
        };
        return yeuCauMap[topic.id] || 'Kh\u00e1i ni\u1ec7m, \u0111\u1eb7c \u0111i\u1ec3m, vai tr\u00f2';
    }`,

    'de-thi-lichsu.html': `    function generateYeuCau(topic) {
        const yeuCauMap = {
            'lich-su-va-su-hoc': 'Hi\u1ec3n th\u1ef1c l\u1ecbch s\u1eed, nh\u1eadn th\u1ee9c l\u1ecbch s\u1eed, ph\u01b0\u01a1ng ph\u00e1p nghi\u00ean c\u1ee9u',
            'vai-tro-su-hoc': 'Vai tr\u00f2, ch\u1ee9c n\u0103ng c\u1ee7a S\u1eed h\u1ecdc, b\u00e0i h\u1ecdc l\u1ecbch s\u1eed',
            'van-minh-co-dai': '\u0110\u1eb7c \u0111i\u1ec3m n\u1ec1n v\u0103n minh, th\u00e0nh t\u1ef1u, \u0111\u00f3ng g\u00f3p',
            'cach-mang-cong-nghiep': 'Nguy\u00ean nh\u00e2n, di\u1ec5n bi\u1ebfn, k\u1ebft qu\u1ea3, \u00fd ngh\u0129a',
            'van-minh-vn': 'V\u0103n Lang, \u00c2u L\u1ea1c, Ch\u0103mpa, Ph\u00f9 Nam, \u0111\u1eb7c tr\u01b0ng v\u0103n minh',
            'cong-dong-dan-toc': 'C\u1ed9ng \u0111\u1ed3ng d\u00e2n t\u1ed9c, \u0111o\u00e0n k\u1ebft d\u00e2n t\u1ed9c, b\u1ea3n s\u1eafc v\u0103n h\u00f3a',
            'van-minh-dai-viet': 'Nh\u00e0 n\u01b0\u1edbc, kinh t\u1ebf, v\u0103n h\u00f3a, gi\u00e1o d\u1ee5c \u0110\u1ea1i Vi\u1ec7t'
        };
        return yeuCauMap[topic.id] || 'Kh\u00e1i ni\u1ec7m, s\u1ef1 ki\u1ec7n, \u00fd ngh\u0129a l\u1ecbch s\u1eed';
    }`,

    'de-thi-nguvan.html': `    function generateYeuCau(topic) {
        const yeuCauMap = {
            'doc-hieu-tho': 'Nh\u1eadn bi\u1ebft th\u1ec3 th\u01a1, bi\u1ec7n ph\u00e1p tu t\u1eeb, n\u1ed9i dung v\u00e0 ngh\u1ec7 thu\u1eadt',
            'doc-hieu-nghi-luan': 'Lu\u1eadn \u0111i\u1ec3m, lu\u1eadn c\u1ee9, c\u00e1ch l\u1eadp lu\u1eadn, th\u00e1i \u0111\u1ed9 t\u00e1c gi\u1ea3',
            'doc-hieu-truyen': 'Nh\u00e2n v\u1eadt, c\u1ed1t truy\u1ec7n, \u0111i\u1ec3m nh\u00ecn, ng\u00f4n ng\u1eef ngh\u1ec7 thu\u1eadt',
            'kich-van-ban': 'K\u1ecbch b\u1ea3n, v\u0103n b\u1ea3n th\u00f4ng tin, \u0111\u1eb7c \u0111i\u1ec3m lo\u1ea1i v\u0103n b\u1ea3n',
            'nghi-luan-xa-hoi': 'Vi\u1ebft \u0111o\u1ea1n v\u0103n, b\u00e0i v\u0103n ngh\u1ecb lu\u1eadn v\u1ec1 v\u1ea5n \u0111\u1ec1 x\u00e3 h\u1ed9i',
            'nghi-luan-van-hoc': 'Ph\u00e2n t\u00edch, c\u1ea3m nh\u1eadn t\u00e1c ph\u1ea9m v\u0103n h\u1ecdc, so s\u00e1nh',
            'tieng-viet': 'T\u1eeb v\u1ef1ng, ng\u1eef ph\u00e1p, phong c\u00e1ch ng\u00f4n ng\u1eef, bi\u1ec7n ph\u00e1p tu t\u1eeb',
            'noi-nghe': 'K\u1ef9 n\u0103ng n\u00f3i, k\u1ef9 n\u0103ng nghe, thuy\u1ebft tr\u00ecnh, ph\u1ea3n bi\u1ec7n'
        };
        return yeuCauMap[topic.id] || 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng';
    }`,

    'de-thi-sinhhoc.html': `    function generateYeuCau(topic) {
        const yeuCauMap = {
            'gioi-thieu-sinh-hoc': '\u0110\u1eb7c \u0111i\u1ec3m c\u1ee7a th\u1ebf gi\u1edbi s\u1ed1ng, c\u00e1c c\u1ea5p t\u1ed5 ch\u1ee9c s\u1ed1ng',
            'thanh-phan-hoa-hoc': 'N\u01b0\u1edbc, c\u00e1c ph\u00e2n t\u1eed sinh h\u1ecdc: cacbohidrat, lipit, protein, axit nucleic',
            'cau-truc-te-bao': 'T\u1ebf b\u00e0o nh\u00e2n s\u01a1, t\u1ebf b\u00e0o nh\u00e2n th\u1ef1c, c\u00e1c b\u00e0o quan',
            'trao-doi-chat': 'V\u1eadn chuy\u1ec3n th\u1ee5 \u0111\u1ed9ng, ch\u1ee7 \u0111\u1ed9ng, xu\u1ea5t b\u00e0o, nh\u1eadp b\u00e0o',
            'chuyen-hoa-nang-luong': 'Enzyme, h\u00f4 h\u1ea5p t\u1ebf b\u00e0o, quang h\u1ee3p',
            'chu-ky-te-bao': 'Nguy\u00ean ph\u00e2n, gi\u1ea3m ph\u00e2n, c\u00e1c k\u00ec c\u1ee7a chu k\u1ef3 t\u1ebf b\u00e0o',
            'cong-nghe-te-bao': 'C\u00f4ng ngh\u1ec7 t\u1ebf b\u00e0o th\u1ef1c v\u1eadt, \u0111\u1ed9ng v\u1eadt, \u1ee9ng d\u1ee5ng',
            'vi-sinh-vat': 'Vi sinh v\u1eadt, qu\u00e1 tr\u00ecnh trao \u0111\u1ed5i ch\u1ea5t, sinh tr\u01b0\u1edfng'
        };
        return yeuCauMap[topic.id] || 'Kh\u00e1i ni\u1ec7m, c\u1ea5u tr\u00fac, ch\u1ee9c n\u0103ng';
    }`,

    'de-thi-toan.html': `    function generateYeuCau(topic) {
        const yeuCauMap = {
            'menh-de-tap-hop': 'Kh\u00e1i ni\u1ec7m m\u1ec7nh \u0111\u1ec1, ph\u1ee7 \u0111\u1ecbnh m\u1ec7nh \u0111\u1ec1, t\u1eadp h\u1ee3p v\u00e0 c\u00e1c ph\u00e9p to\u00e1n',
            'bat-phuong-trinh': 'B\u1ea5t ph\u01b0\u01a1ng tr\u00ecnh b\u1eadc nh\u1ea5t hai \u1ea9n, h\u1ec7 b\u1ea5t ph\u01b0\u01a1ng tr\u00ecnh, mi\u1ec1n nghi\u1ec7m',
            'ham-so-bac-hai': 'H\u00e0m s\u1ed1 b\u1eadc hai, \u0111\u1ed3 th\u1ecb parabol, d\u1ea5u c\u1ee7a tam th\u1ee9c b\u1eadc hai',
            'phuong-trinh-he-pt': 'Ph\u01b0\u01a1ng tr\u00ecnh quy v\u1ec1 b\u1eadc nh\u1ea5t, b\u1eadc hai; h\u1ec7 ph\u01b0\u01a1ng tr\u00ecnh ba \u1ea9n',
            'bat-dang-thuc': 'B\u1ea5t \u0111\u1eb3ng th\u1ee9c, b\u1ea5t \u0111\u1eb3ng th\u1ee9c Cauchy, b\u1ea5t ph\u01b0\u01a1ng tr\u00ecnh b\u1eadc hai',
            'thong-ke': 'S\u1ed1 li\u1ec7u gh\u00e9p nh\u00f3m, c\u00e1c s\u1ed1 \u0111\u1eb7c tr\u01b0ng, \u0111\u1ed9 ph\u00e2n t\u00e1n',
            'dai-so-to-hop': 'Quy t\u1eafc \u0111\u1ebfm, ho\u00e1n v\u1ecb, ch\u1ec9nh h\u1ee3p, t\u1ed5 h\u1ee3p, nh\u1ecb th\u1ee9c Newton',
            'xac-suat': 'Bi\u1ebfn c\u1ed1 v\u00e0 x\u00e1c su\u1ea5t, x\u00e1c su\u1ea5t c\u00f3 \u0111i\u1ec1u ki\u1ec7n, c\u00f4ng th\u1ee9c Bernoulli',
            'luong-giac': 'Gi\u00e1 tr\u1ecb l\u01b0\u1ee3ng gi\u00e1c, \u0111\u1ecbnh l\u00ed c\u00f4sin, \u0111\u1ecbnh l\u00ed sin, gi\u1ea3i tam gi\u00e1c',
            'vector': 'Kh\u00e1i ni\u1ec7m vect\u01a1, t\u1ed5ng v\u00e0 hi\u1ec7u vect\u01a1, t\u00edch v\u1edbi s\u1ed1, h\u1ec7 tr\u1ee5c to\u1ea1 \u0111\u1ed9'
        };
        return yeuCauMap[topic.id] || 'Kh\u00e1i ni\u1ec7m, \u0111\u1ecbnh ngh\u0129a, t\u00ednh ch\u1ea5t c\u01a1 b\u1ea3n';
    }`,

    'de-thi-vatli.html': `    function generateYeuCau(topic) {
        const yeuCauMap = {
            'ba-dinh-luat-newton': 'Kh\u00e1i ni\u1ec7m, ph\u00e1t bi\u1ec3u \u0111\u1ecbnh lu\u1eadt, gi\u1ea3i th\u00edch chuy\u1ec3n \u0111\u1ed9ng',
            'bien-dang-va-keo': 'Kh\u00e1i ni\u1ec7m, \u0111\u1eb7c \u0111i\u1ec3m bi\u1ebfn d\u1ea1ng \u0111\u00e0n h\u1ed3i, gi\u1edbi h\u1ea1n \u0111\u00e0n h\u1ed3i',
            'bao-toan-dong-luong': 'Kh\u00e1i ni\u1ec7m, \u0111\u1ecbnh lu\u1eadt b\u1ea3o to\u00e0n, va ch\u1ea1m',
            'chuyen-dong-bien-doi': 'Kh\u00e1i ni\u1ec7m, gia t\u1ed1c, ph\u01b0\u01a1ng tr\u00ecnh chuy\u1ec3n \u0111\u1ed9ng',
            'can-bang-luc': 'Kh\u00e1i ni\u1ec7m, \u0111i\u1ec1u ki\u1ec7n c\u00e2n b\u1eb1ng, moment l\u1ef1c',
            'cong-suat-hieu-suat': 'Kh\u00e1i ni\u1ec7m, c\u00f4ng th\u1ee9c, \u0111\u01a1n v\u1ecb \u0111o',
            'cong-nang-luong': 'Kh\u00e1i ni\u1ec7m, \u0111\u1ecbnh l\u00fd \u0111\u1ed9ng n\u0103ng, th\u1ebf n\u0103ng',
            'gia-toc-huong-tam': 'Kh\u00e1i ni\u1ec7m, c\u00f4ng th\u1ee9c, \u1ee9ng d\u1ee5ng',
            'khoi-luong-rieng': 'Kh\u00e1i ni\u1ec7m, \u00e1p su\u1ea5t ch\u1ea5t l\u1ecfng, l\u1ef1c \u0111\u1ea9y Archimedes',
            'mo-ta-chuyen-dong': 'Kh\u00e1i ni\u1ec7m, v\u1eadn t\u1ed1c trung b\u00ecnh, h\u1ec7 quy chi\u1ebfu',
            'mot-so-luc-thuc-tien': 'Kh\u00e1i ni\u1ec7m, l\u1ef1c ma s\u00e1t, l\u1ef1c c\u1ea3n',
            'dinh-luat-hooke': 'N\u1ed9i dung \u0111\u1ecbnh lu\u1eadt, h\u1ec7 s\u1ed1 \u0111\u00e0n h\u1ed3i',
            'dinh-nghia-dong-luong': '\u0110\u1ed9ng l\u01b0\u1ee3ng, \u0111\u01a1n v\u1ecb \u0111o, m\u1ed1i li\u00ean h\u1ec7 l\u1ef1c v\u00e0 \u0111\u1ed9ng l\u01b0\u1ee3ng',
            'dong-hoc-chuyen-dong-tron': 'Chu k\u1ef3, t\u1ea7n s\u1ed1, t\u1ed1c \u0111\u1ed9 d\u00e0i, t\u1ed1c \u0111\u1ed9 g\u00f3c',
            'dong-luong-va-cham': 'Va ch\u1ea1m \u0111\u00e0n h\u1ed3i, va ch\u1ea1m m\u1ec1m',
            'dong-nang-the-nang': '\u0110\u1ed9ng n\u0103ng, th\u1ebf n\u0103ng, c\u01a1 n\u0103ng, b\u1ea3o to\u00e0n c\u01a1 n\u0103ng'
        };
        return yeuCauMap[topic.id] || 'Kh\u00e1i ni\u1ec7m, \u0111\u1ecbnh ngh\u0129a, t\u00ednh ch\u1ea5t c\u01a1 b\u1ea3n';
    }`
};

// Also fix the notification message in exportDactaToDocx
const notifOld = "Vui long chon noi dung kiem tra truoc!";
const notifNew = "Vui l\u00f2ng ch\u1ecdn n\u1ed9i dung ki\u1ec3m tra tr\u01b0\u1edbc!";

let fixedCount = 0;

for (const [filename, newFunc] of Object.entries(yeuCauMaps)) {
    const filepath = path.join(dir, filename);
    if (!fs.existsSync(filepath)) {
        console.log(`SKIP: ${filename} not found`);
        continue;
    }

    let content = fs.readFileSync(filepath, 'utf8');
    
    // Find and replace the generateYeuCau function
    // Pattern: from "function generateYeuCau(topic) {" to the closing "    }"
    const funcStart = content.indexOf('function generateYeuCau(topic) {');
    if (funcStart === -1) {
        console.log(`SKIP: ${filename} - generateYeuCau not found`);
        continue;
    }

    // Find the indented "    }" that closes the function
    // We need to find the pattern: "    }" after the last entry in yeuCauMap
    const returnLine = content.indexOf('return yeuCauMap[topic.id]', funcStart);
    if (returnLine === -1) {
        console.log(`SKIP: ${filename} - return statement not found`);
        continue;
    }
    
    // Find the closing "    }" after the return
    let funcEnd = content.indexOf('\n    }', returnLine);
    if (funcEnd === -1) {
        console.log(`SKIP: ${filename} - closing brace not found`);
        continue;
    }
    funcEnd += '\n    }'.length;

    // Find the start of the function including leading whitespace
    let actualStart = funcStart;
    // Go back to find the "    " indentation before "function"
    while (actualStart > 0 && content[actualStart - 1] === ' ') {
        actualStart--;
    }

    const oldFunc = content.substring(actualStart, funcEnd);
    content = content.substring(0, actualStart) + newFunc + content.substring(funcEnd);

    // Fix the notification message in exportDactaToDocx if present
    if (content.includes(notifOld)) {
        content = content.replace(notifOld, notifNew);
        console.log(`  Also fixed notification text`);
    }

    fs.writeFileSync(filepath, content, 'utf8');
    fixedCount++;
    console.log(`FIXED: ${filename}`);
}

console.log(`\nDone! Fixed ${fixedCount} files.`);
