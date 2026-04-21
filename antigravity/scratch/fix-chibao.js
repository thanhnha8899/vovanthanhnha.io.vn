/**
 * Fix đặc tả tables to include mã chỉ báo (indicator codes)
 * According to official CV 7991/BGDĐT-GDTrH guidelines:
 * - Each topic has numbered indicator codes (e.g. 1.1.1, 1.2.1)
 * - Competency codes (TD, GQ, MH, CC) appear in cognitive-level cells
 * - The "Yêu cầu cần đạt" column shows both text AND indicator codes
 */
const fs = require('fs');
const path = require('path');

const dir = path.join('C:', 'Users', 'thanh', '.gemini', 'antigravity', 'scratch');

// Define indicator codes for each subject
// Format: topic_id => { yeuCau: 'text with codes', chibaoCodes: ['code1', 'code2', ...] }
const chibaodData = {
    'de-thi-tinhoc.html': {
        topicChibao: {
            'may-tinh-xa-hoi': {
                yeuCau: 'Nh\u1eadn bi\u1ebft \u0111\u01b0\u1ee3c c\u00e1c kh\u00e1i ni\u1ec7m: th\u00f4ng tin, d\u1eef li\u1ec7u, bi\u1ec3u di\u1ec5n th\u00f4ng tin, h\u1ec7 nh\u1ecb ph\u00e2n, \u0111\u01a1n v\u1ecb \u0111o th\u00f4ng tin',
                codes: ['1.1.1', '1.1.2', '1.2.1', '1.2.2']
            },
            'mang-may-tinh': {
                yeuCau: 'Hi\u1ec3u \u0111\u01b0\u1ee3c kh\u00e1i ni\u1ec7m m\u1ea1ng m\u00e1y t\u00ednh, Internet, an to\u00e0n tr\u00ean Internet',
                codes: ['2.1.1', '2.1.2', '2.2.1']
            },
            'dao-duc-phap-luat': {
                yeuCau: 'Nh\u1eadn bi\u1ebft b\u1ea3n quy\u1ec1n, s\u1edf h\u1eefu tr\u00ed tu\u1ec7; an to\u00e0n th\u00f4ng tin; t\u00e1c \u0111\u1ed9ng CNTT',
                codes: ['3.1.1', '3.1.2', '3.2.1']
            },
            'ung-dung-tin-hoc': {
                yeuCau: 'V\u1eadn d\u1ee5ng \u0111\u01b0\u1ee3c so\u1ea1n th\u1ea3o v\u0103n b\u1ea3n, b\u1ea3ng t\u00ednh, tr\u00ecnh chi\u1ebfu',
                codes: ['4.1.1', '4.1.2', '4.2.1', '4.2.2']
            },
            'giai-quyet-van-de': {
                yeuCau: 'Hi\u1ec3u thu\u1eadt to\u00e1n; v\u1eadn d\u1ee5ng thu\u1eadt to\u00e1n s\u1eafp x\u1ebfp, t\u00ecm ki\u1ebfm (GQ3.1)',
                codes: ['5.1.1', '5.1.2', '5.2.1', '5.2.2']
            },
            'lap-trinh-python': {
                yeuCau: 'V\u1eadn d\u1ee5ng bi\u1ebfn, ki\u1ec3u d\u1eef li\u1ec7u, c\u00e2u l\u1ec7nh \u0111i\u1ec1u ki\u1ec7n, v\u00f2ng l\u1eb7p, h\u00e0m (TD3.1)',
                codes: ['6.1.1', '6.1.2', '6.2.1', '6.2.2', '6.3.1', '6.3.2', '6.4.1']
            },
            'co-so-du-lieu': {
                yeuCau: 'Nh\u1eadn bi\u1ebft kh\u00e1i ni\u1ec7m CSDL, h\u1ec7 QTCSDL; hi\u1ec3u b\u1ea3ng v\u00e0 m\u1ed1i quan h\u1ec7',
                codes: ['7.1.1', '7.1.2', '7.2.1']
            },
            'huong-nghiep': {
                yeuCau: 'Nh\u1eadn bi\u1ebft ng\u00e0nh ngh\u1ec1 CNTT, xu h\u01b0\u1edbng ph\u00e1t tri\u1ec3n',
                codes: ['8.1.1', '8.1.2']
            }
        },
        defaultYeuCau: 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng'
    },
    'de-thi-vatli.html': {
        topicChibao: {
            'mo-ta-chuyen-dong': {
                yeuCau: 'M\u00f4 t\u1ea3 \u0111\u01b0\u1ee3c chuy\u1ec3n \u0111\u1ed9ng; v\u1eadn t\u1ed1c trung b\u00ecnh; h\u1ec7 quy chi\u1ebfu (TD1.2)',
                codes: ['1.1.1', '1.1.2']
            },
            'chuyen-dong-bien-doi': {
                yeuCau: 'Ph\u00e2n bi\u1ec7t chuy\u1ec3n \u0111\u1ed9ng th\u1eb3ng \u0111\u1ec1u/bi\u1ebfn \u0111\u1ed5i \u0111\u1ec1u; gia t\u1ed1c (TD2.1)',
                codes: ['1.2.1', '1.2.2', '1.2.3']
            },
            'ba-dinh-luat-newton': {
                yeuCau: 'Ph\u00e1t bi\u1ec3u 3 \u0111\u1ecbnh lu\u1eadt Newton; gi\u1ea3i th\u00edch chuy\u1ec3n \u0111\u1ed9ng (GQ3.1)',
                codes: ['2.1.1', '2.1.2', '2.1.3']
            },
            'mot-so-luc-thuc-tien': {
                yeuCau: 'Nh\u1eadn bi\u1ebft l\u1ef1c ma s\u00e1t, l\u1ef1c c\u1ea3n; v\u1eadn d\u1ee5ng trong th\u1ef1c ti\u1ec5n (TD3.2)',
                codes: ['2.2.1', '2.2.2']
            },
            'can-bang-luc': {
                yeuCau: 'X\u00e1c \u0111\u1ecbnh \u0111i\u1ec1u ki\u1ec7n c\u00e2n b\u1eb1ng; moment l\u1ef1c (GQ3.2)',
                codes: ['2.3.1', '2.3.2']
            },
            'dinh-luat-hooke': {
                yeuCau: 'Hi\u1ec3u n\u1ed9i dung \u0111\u1ecbnh lu\u1eadt Hooke; h\u1ec7 s\u1ed1 \u0111\u00e0n h\u1ed3i (TD2.1)',
                codes: ['3.1.1']
            },
            'bien-dang-va-keo': {
                yeuCau: 'Nh\u1eadn bi\u1ebft bi\u1ebfn d\u1ea1ng \u0111\u00e0n h\u1ed3i; gi\u1edbi h\u1ea1n \u0111\u00e0n h\u1ed3i (TD1.2)',
                codes: ['3.2.1', '3.2.2']
            },
            'khoi-luong-rieng': {
                yeuCau: 'T\u00ednh kh\u1ed1i l\u01b0\u1ee3ng ri\u00eang; \u00e1p su\u1ea5t ch\u1ea5t l\u1ecfng; l\u1ef1c \u0111\u1ea9y Archimedes (GQ3.1)',
                codes: ['3.3.1', '3.3.2']
            },
            'dong-hoc-chuyen-dong-tron': {
                yeuCau: 'T\u00ednh chu k\u1ef3, t\u1ea7n s\u1ed1, t\u1ed1c \u0111\u1ed9 d\u00e0i, t\u1ed1c \u0111\u1ed9 g\u00f3c (TD3.1)',
                codes: ['4.1.1', '4.1.2']
            },
            'gia-toc-huong-tam': {
                yeuCau: 'T\u00ednh gia t\u1ed1c h\u01b0\u1edbng t\u00e2m; l\u1ef1c h\u01b0\u1edbng t\u00e2m (GQ3.2)',
                codes: ['4.2.1']
            },
            'cong-nang-luong': {
                yeuCau: '\u00c1p d\u1ee5ng \u0111\u1ecbnh l\u00fd \u0111\u1ed9ng n\u0103ng, th\u1ebf n\u0103ng; b\u1ea3o to\u00e0n c\u01a1 n\u0103ng (TD3.5)',
                codes: ['5.1.1', '5.1.2']
            },
            'cong-suat-hieu-suat': {
                yeuCau: 'T\u00ednh c\u00f4ng su\u1ea5t; hi\u1ec7u su\u1ea5t (GQ3.1)',
                codes: ['5.2.1']
            },
            'dong-nang-the-nang': {
                yeuCau: 'T\u00ednh \u0111\u1ed9ng n\u0103ng, th\u1ebf n\u0103ng, c\u01a1 n\u0103ng; b\u1ea3o to\u00e0n c\u01a1 n\u0103ng (GQ3.5)',
                codes: ['5.3.1', '5.3.2']
            },
            'dinh-nghia-dong-luong': {
                yeuCau: 'T\u00ednh \u0111\u1ed9ng l\u01b0\u1ee3ng; m\u1ed1i li\u00ean h\u1ec7 l\u1ef1c v\u00e0 \u0111\u1ed9ng l\u01b0\u1ee3ng (TD2.1)',
                codes: ['6.1.1']
            },
            'bao-toan-dong-luong': {
                yeuCau: '\u00c1p d\u1ee5ng \u0111\u1ecbnh lu\u1eadt b\u1ea3o to\u00e0n \u0111\u1ed9ng l\u01b0\u1ee3ng; va ch\u1ea1m (GQ3.2)',
                codes: ['6.2.1', '6.2.2']
            },
            'dong-luong-va-cham': {
                yeuCau: 'Ph\u00e2n bi\u1ec7t va ch\u1ea1m \u0111\u00e0n h\u1ed3i v\u00e0 m\u1ec1m; t\u00ednh v\u1eadn t\u1ed1c sau va ch\u1ea1m (GQ3.5)',
                codes: ['6.3.1']
            }
        },
        defaultYeuCau: 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng'
    },
    'de-thi-toan.html': {
        topicChibao: {
            'menh-de-tap-hop': {
                yeuCau: 'Nh\u1eadn bi\u1ebft m\u1ec7nh \u0111\u1ec1; ph\u1ee7 \u0111\u1ecbnh; t\u1eadp h\u1ee3p v\u00e0 ph\u00e9p to\u00e1n (TD1.2)',
                codes: ['1.1.1', '1.1.2', '1.2.1']
            },
            'bat-phuong-trinh': {
                yeuCau: 'Gi\u1ea3i BPT b\u1eadc nh\u1ea5t hai \u1ea9n; bi\u1ec3u di\u1ec5n mi\u1ec1n nghi\u1ec7m (MH1.2)',
                codes: ['2.1.1', '2.1.2', '2.2.1']
            },
            'ham-so-bac-hai': {
                yeuCau: 'V\u1ebd \u0111\u1ed3 th\u1ecb parabol; x\u00e9t d\u1ea5u tam th\u1ee9c b\u1eadc hai (TD3.1)',
                codes: ['3.1.1', '3.1.2', '3.2.1']
            },
            'phuong-trinh-he-pt': {
                yeuCau: 'Gi\u1ea3i PT quy v\u1ec1 b\u1eadc nh\u1ea5t, b\u1eadc hai; h\u1ec7 PT ba \u1ea9n (GQ3.1)',
                codes: ['4.1.1', '4.1.2', '4.2.1']
            },
            'bat-dang-thuc': {
                yeuCau: 'Ch\u1ee9ng minh B\u0110T; \u00e1p d\u1ee5ng B\u0110T Cauchy; gi\u1ea3i BPT b\u1eadc hai (TD3.2)',
                codes: ['5.1.1', '5.1.2', '5.2.1']
            },
            'thong-ke': {
                yeuCau: 'X\u1eed l\u00fd s\u1ed1 li\u1ec7u gh\u00e9p nh\u00f3m; t\u00ednh s\u1ed1 \u0111\u1eb7c tr\u01b0ng (GQ3.2)',
                codes: ['6.1.1', '6.1.2']
            },
            'dai-so-to-hop': {
                yeuCau: '\u00c1p d\u1ee5ng quy t\u1eafc \u0111\u1ebfm; ho\u00e1n v\u1ecb, ch\u1ec9nh h\u1ee3p, t\u1ed5 h\u1ee3p (TD3.5)',
                codes: ['7.1.1', '7.1.2', '7.2.1', '7.2.2']
            },
            'xac-suat': {
                yeuCau: 'T\u00ednh x\u00e1c su\u1ea5t; x\u00e1c su\u1ea5t c\u00f3 \u0111i\u1ec1u ki\u1ec7n; Bernoulli (GQ3.5)',
                codes: ['8.1.1', '8.1.2', '8.2.1']
            },
            'luong-giac': {
                yeuCau: 'T\u00ednh GTLG; \u00e1p d\u1ee5ng \u0111\u1ecbnh l\u00ed c\u00f4sin, sin; gi\u1ea3i tam gi\u00e1c (MH2)',
                codes: ['9.1.1', '9.1.2', '9.2.1']
            },
            'vector': {
                yeuCau: 'Th\u1ef1c hi\u1ec7n ph\u00e9p to\u00e1n vect\u01a1; to\u1ea1 \u0111\u1ed9 vect\u01a1 (TD2.1)',
                codes: ['10.1.1', '10.1.2', '10.2.1']
            }
        },
        defaultYeuCau: 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng'
    },
    'de-thi-hoahoc.html': {
        topicChibao: {
            'bang-tuan-hoan': {
                yeuCau: 'Hi\u1ec3u c\u1ea5u t\u1ea1o b\u1ea3ng tu\u1ea7n ho\u00e0n; bi\u1ebfn \u0111\u1ed5i tu\u1ea7n ho\u00e0n (TD2.1)',
                codes: ['1.1.1', '1.1.2', '1.2.1']
            },
            'cau-tao-nguyen-tu': {
                yeuCau: 'M\u00f4 t\u1ea3 c\u1ea5u t\u1ea1o nguy\u00ean t\u1eed; c\u1ea5u h\u00ecnh electron (TD1.2)',
                codes: ['2.1.1', '2.1.2']
            },
            'lien-ket-hoa-hoc': {
                yeuCau: 'Ph\u00e2n bi\u1ec7t LK ion, c\u1ed9ng h\u00f3a tr\u1ecb; \u0111i\u1ec7n h\u00f3a tr\u1ecb (TD3.1)',
                codes: ['3.1.1', '3.1.2', '3.2.1']
            },
            'phan-ung-oxi-hoa-khu': {
                yeuCau: 'X\u00e1c \u0111\u1ecbnh s\u1ed1 oxi h\u00f3a; c\u00e2n b\u1eb1ng ph\u1ea3n \u1ee9ng OHK (GQ3.1)',
                codes: ['4.1.1', '4.1.2', '4.2.1']
            },
            'nang-luong-hoa-hoc': {
                yeuCau: 'Ph\u00e2n bi\u1ec7t ph\u1ea3n \u1ee9ng t\u1ecfa/thu nhi\u1ec7t; t\u00ednh enthalpy (GQ3.2)',
                codes: ['5.1.1', '5.1.2']
            },
            'toc-do-phan-ung': {
                yeuCau: 'T\u00ednh t\u1ed1c \u0111\u1ed9 P\u01af; y\u1ebfu t\u1ed1 \u1ea3nh h\u01b0\u1edfng; CBHH (TD3.2)',
                codes: ['6.1.1', '6.1.2', '6.2.1']
            },
            'nguyen-to-nhom-viia': {
                yeuCau: 'Nh\u1eadn bi\u1ebft t\u00ednh ch\u1ea5t Halogen; HX; mu\u1ed1i halogenua (TD2.1)',
                codes: ['7.1.1', '7.1.2']
            },
            'chuyen-de-10': {
                yeuCau: 'V\u1eadn d\u1ee5ng li\u00ean k\u1ebft, ph\u1ea3n \u1ee9ng; c\u01a1 s\u1edf h\u00f3a h\u1ecdc n\u00e2ng cao (GQ3.5)',
                codes: ['8.1.1']
            }
        },
        defaultYeuCau: 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng'
    },
    'de-thi-sinhhoc.html': {
        topicChibao: {
            'gioi-thieu-sinh-hoc': {
                yeuCau: 'Nh\u1eadn bi\u1ebft \u0111\u1eb7c \u0111i\u1ec3m c\u1ee7a th\u1ebf gi\u1edbi s\u1ed1ng; c\u00e1c c\u1ea5p t\u1ed5 ch\u1ee9c (TD1.2)',
                codes: ['1.1.1', '1.1.2']
            },
            'thanh-phan-hoa-hoc': {
                yeuCau: 'M\u00f4 t\u1ea3 c\u1ea5u tr\u00fac, ch\u1ee9c n\u0103ng cacbohidrat, lipit, protein, axit nucleic (TD2.1)',
                codes: ['2.1.1', '2.1.2', '2.2.1', '2.2.2']
            },
            'cau-truc-te-bao': {
                yeuCau: 'So s\u00e1nh TB nh\u00e2n s\u01a1 v\u00e0 nh\u00e2n th\u1ef1c; ch\u1ee9c n\u0103ng b\u00e0o quan (TD3.1)',
                codes: ['3.1.1', '3.1.2', '3.2.1']
            },
            'trao-doi-chat': {
                yeuCau: 'Ph\u00e2n bi\u1ec7t v\u1eadn chuy\u1ec3n th\u1ee5 \u0111\u1ed9ng/ch\u1ee7 \u0111\u1ed9ng; xu\u1ea5t-nh\u1eadp b\u00e0o (GQ3.1)',
                codes: ['4.1.1', '4.1.2']
            },
            'chuyen-hoa-nang-luong': {
                yeuCau: 'Tr\u00ecnh b\u00e0y vai tr\u00f2 enzyme; h\u00f4 h\u1ea5p t\u1ebf b\u00e0o; quang h\u1ee3p (GQ3.2)',
                codes: ['5.1.1', '5.1.2', '5.2.1']
            },
            'chu-ky-te-bao': {
                yeuCau: 'M\u00f4 t\u1ea3 nguy\u00ean ph\u00e2n, gi\u1ea3m ph\u00e2n; c\u00e1c k\u00ec c\u1ee7a chu k\u1ef3 (TD3.2)',
                codes: ['6.1.1', '6.1.2']
            },
            'cong-nghe-te-bao': {
                yeuCau: 'Tr\u00ecnh b\u00e0y \u1ee9ng d\u1ee5ng CN t\u1ebf b\u00e0o th\u1ef1c v\u1eadt, \u0111\u1ed9ng v\u1eadt (GQ3.5)',
                codes: ['7.1.1', '7.1.2']
            },
            'vi-sinh-vat': {
                yeuCau: 'Nh\u1eadn bi\u1ebft vi sinh v\u1eadt; trao \u0111\u1ed5i ch\u1ea5t; sinh tr\u01b0\u1edfng VSV (TD2.1)',
                codes: ['8.1.1', '8.1.2']
            }
        },
        defaultYeuCau: 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng'
    },
    'de-thi-diali.html': {
        topicChibao: {
            'su-dung-ban-do': {
                yeuCau: '\u0110\u1ecdc v\u00e0 s\u1eed d\u1ee5ng b\u1ea3n \u0111\u1ed3; t\u1ec9 l\u1ec7 b\u1ea3n \u0111\u1ed3; k\u00ed hi\u1ec7u (TD1.2)',
                codes: ['1.1.1', '1.1.2']
            },
            'trai-dat': {
                yeuCau: 'M\u00f4 t\u1ea3 h\u00ecnh d\u1ea1ng, chuy\u1ec3n \u0111\u1ed9ng Tr\u00e1i \u0110\u1ea5t; h\u1ec7 qu\u1ea3 (TD2.1)',
                codes: ['2.1.1', '2.1.2']
            },
            'thach-quyen': {
                yeuCau: 'N\u00eau c\u1ea5u tr\u00fac; ph\u00e2n bi\u1ec7t n\u1ed9i l\u1ef1c v\u00e0 ngo\u1ea1i l\u1ef1c (TD3.1)',
                codes: ['3.1.1', '3.1.2']
            },
            'khi-quyen': {
                yeuCau: 'Gi\u1ea3i th\u00edch nhi\u1ec7t \u0111\u1ed9, kh\u00ed \u00e1p, gi\u00f3, m\u01b0a (GQ3.1)',
                codes: ['4.1.1', '4.1.2']
            },
            'thuy-quyen': {
                yeuCau: 'Tr\u00ecnh b\u00e0y v\u00f2ng tu\u1ea7n ho\u00e0n n\u01b0\u1edbc; s\u00f4ng ng\u00f2i; bi\u1ec3n (TD2.1)',
                codes: ['5.1.1', '5.1.2']
            },
            'tho-nhuong': {
                yeuCau: 'Nh\u1eadn bi\u1ebft nh\u00e2n t\u1ed1 h\u00ecnh th\u00e0nh \u0111\u1ea5t; ph\u00e2n lo\u1ea1i; sinh quy\u1ec3n (TD3.2)',
                codes: ['6.1.1', '6.1.2']
            },
            'dan-cu': {
                yeuCau: 'Ph\u00e2n t\u00edch \u0111\u1eb7c \u0111i\u1ec3m d\u00e2n c\u01b0; ph\u00e2n b\u1ed1; \u0111\u00f4 th\u1ecb h\u00f3a (GQ3.2)',
                codes: ['7.1.1', '7.1.2']
            },
            'kinh-te': {
                yeuCau: 'Tr\u00ecnh b\u00e0y c\u01a1 c\u1ea5u kinh t\u1ebf; n\u00f4ng-c\u00f4ng nghi\u1ec7p; d\u1ecbch v\u1ee5 (GQ3.5)',
                codes: ['8.1.1', '8.1.2']
            }
        },
        defaultYeuCau: 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng'
    },
    'de-thi-lichsu.html': {
        topicChibao: {
            'lich-su-va-su-hoc': {
                yeuCau: 'Ph\u00e2n bi\u1ec7t hi\u1ec7n th\u1ef1c LS v\u00e0 nh\u1eadn th\u1ee9c LS; ph\u01b0\u01a1ng ph\u00e1p NC (TD1.2)',
                codes: ['1.1.1', '1.1.2']
            },
            'vai-tro-su-hoc': {
                yeuCau: 'Gi\u1ea3i th\u00edch vai tr\u00f2, ch\u1ee9c n\u0103ng S\u1eed h\u1ecdc; b\u00e0i h\u1ecdc LS (TD2.1)',
                codes: ['2.1.1']
            },
            'van-minh-co-dai': {
                yeuCau: 'M\u00f4 t\u1ea3 \u0111\u1eb7c \u0111i\u1ec3m c\u00e1c n\u1ec1n v\u0103n minh c\u1ed5 \u0111\u1ea1i (TD3.1)',
                codes: ['3.1.1', '3.1.2']
            },
            'cach-mang-cong-nghiep': {
                yeuCau: 'Tr\u00ecnh b\u00e0y nguy\u00ean nh\u00e2n, di\u1ec5n bi\u1ebfn, \u00fd ngh\u0129a CMCN (GQ3.1)',
                codes: ['4.1.1', '4.1.2']
            },
            'van-minh-vn': {
                yeuCau: 'Nh\u1eadn bi\u1ebft VM V\u0103n Lang-\u00c2u L\u1ea1c, Ch\u0103mpa, Ph\u00f9 Nam (TD2.1)',
                codes: ['5.1.1', '5.1.2']
            },
            'cong-dong-dan-toc': {
                yeuCau: 'Ph\u00e2n t\u00edch \u0111o\u00e0n k\u1ebft d\u00e2n t\u1ed9c; b\u1ea3n s\u1eafc v\u0103n h\u00f3a (GQ3.2)',
                codes: ['6.1.1']
            },
            'van-minh-dai-viet': {
                yeuCau: 'M\u00f4 t\u1ea3 kinh t\u1ebf, v\u0103n h\u00f3a, gi\u00e1o d\u1ee5c \u0110\u1ea1i Vi\u1ec7t (TD3.5)',
                codes: ['7.1.1', '7.1.2']
            }
        },
        defaultYeuCau: 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng'
    },
    'de-thi-nguvan.html': {
        topicChibao: {
            'doc-hieu-tho': {
                yeuCau: 'Nh\u1eadn bi\u1ebft th\u1ec3 th\u01a1; bi\u1ec7n ph\u00e1p tu t\u1eeb; n\u1ed9i dung, ngh\u1ec7 thu\u1eadt (TD1.2)',
                codes: ['1.1.1', '1.1.2', '1.2.1']
            },
            'doc-hieu-nghi-luan': {
                yeuCau: 'X\u00e1c \u0111\u1ecbnh lu\u1eadn \u0111i\u1ec3m, lu\u1eadn c\u1ee9; c\u00e1ch l\u1eadp lu\u1eadn (TD2.1)',
                codes: ['2.1.1', '2.1.2']
            },
            'doc-hieu-truyen': {
                yeuCau: 'Ph\u00e2n t\u00edch nh\u00e2n v\u1eadt, c\u1ed1t truy\u1ec7n; \u0111i\u1ec3m nh\u00ecn (TD3.1)',
                codes: ['3.1.1', '3.1.2']
            },
            'kich-van-ban': {
                yeuCau: 'Nh\u1eadn bi\u1ebft \u0111\u1eb7c \u0111i\u1ec3m k\u1ecbch; VB th\u00f4ng tin (TD2.1)',
                codes: ['4.1.1']
            },
            'nghi-luan-xa-hoi': {
                yeuCau: 'Vi\u1ebft \u0111o\u1ea1n/b\u00e0i ngh\u1ecb lu\u1eadn v\u1ec1 v\u1ea5n \u0111\u1ec1 XH (GQ3.1)',
                codes: ['5.1.1', '5.1.2']
            },
            'nghi-luan-van-hoc': {
                yeuCau: 'Ph\u00e2n t\u00edch, c\u1ea3m nh\u1eadn t\u00e1c ph\u1ea9m v\u0103n h\u1ecdc (GQ3.2)',
                codes: ['6.1.1', '6.1.2']
            },
            'tieng-viet': {
                yeuCau: 'Nh\u1eadn bi\u1ebft t\u1eeb v\u1ef1ng, ng\u1eef ph\u00e1p; bi\u1ec7n ph\u00e1p tu t\u1eeb (TD1.2)',
                codes: ['7.1.1', '7.1.2']
            },
            'noi-nghe': {
                yeuCau: 'Th\u1ef1c h\u00e0nh k\u1ef9 n\u0103ng n\u00f3i, nghe; thuy\u1ebft tr\u00ecnh (GQ3.5)',
                codes: ['8.1.1']
            }
        },
        defaultYeuCau: 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng'
    },
    'de-thi-ktpl.html': {
        topicChibao: {
            'nen-kinh-te': {
                yeuCau: 'Nh\u1eadn bi\u1ebft n\u1ec1n kinh t\u1ebf; c\u00e1c ch\u1ee7 th\u1ec3; vai tr\u00f2 (TD1.2)',
                codes: ['1.1.1', '1.1.2']
            },
            'thi-truong': {
                yeuCau: 'Gi\u1ea3i th\u00edch cung c\u1ea7u; c\u01a1 ch\u1ebf th\u1ecb tr\u01b0\u1eddng; gi\u00e1 c\u1ea3 (TD2.1)',
                codes: ['2.1.1', '2.1.2']
            },
            'ngan-sach-thue': {
                yeuCau: 'Nh\u1eadn bi\u1ebft NSNN; vai tr\u00f2 c\u1ee7a thu\u1ebf (TD3.1)',
                codes: ['3.1.1', '3.1.2']
            },
            'ngan-hang': {
                yeuCau: 'Hi\u1ec3u ng\u00e2n h\u00e0ng, l\u00e3i su\u1ea5t; t\u00ednh l\u00e3i ti\u1ebft ki\u1ec7m (GQ3.1)',
                codes: ['4.1.1']
            },
            'san-xuat-kinh-doanh': {
                yeuCau: 'Tr\u00ecnh b\u00e0y s\u1ea3n xu\u1ea5t, kinh doanh; vi\u1ec7c l\u00e0m (GQ3.2)',
                codes: ['5.1.1', '5.1.2']
            },
            'phap-luat': {
                yeuCau: 'Nh\u1eadn bi\u1ebft kh\u00e1i ni\u1ec7m PL; h\u1ec7 th\u1ed1ng PL; vi ph\u1ea1m PL (TD2.1)',
                codes: ['6.1.1', '6.1.2']
            },
            'quyen-nghia-vu': {
                yeuCau: 'V\u1eadn d\u1ee5ng quy\u1ec1n v\u00e0 ngh\u0129a v\u1ee5 c\u00f4ng d\u00e2n (GQ3.5)',
                codes: ['7.1.1', '7.1.2']
            },
            'hien-phap': {
                yeuCau: 'Hi\u1ec3u Hi\u1ebfn ph\u00e1p; b\u1ed9 m\u00e1y nh\u00e0 n\u01b0\u1edbc; nguy\u00ean t\u1eafc (TD3.2)',
                codes: ['8.1.1']
            }
        },
        defaultYeuCau: 'Nh\u1eadn bi\u1ebft, th\u00f4ng hi\u1ec3u, v\u1eadn d\u1ee5ng'
    }
};

// For each file, update generateYeuCau to include indicator codes
let fixedCount = 0;
for (const [filename, data] of Object.entries(chibaodData)) {
    const filepath = path.join(dir, filename);
    if (!fs.existsSync(filepath)) {
        console.log('SKIP:', filename, 'not found');
        continue;
    }

    let content = fs.readFileSync(filepath, 'utf8');

    // Build new generateYeuCau function with codes
    const entries = Object.entries(data.topicChibao).map(([id, info]) => {
        return `            '${id}': { text: '${info.yeuCau}', codes: [${info.codes.map(c => `'${c}'`).join(', ')}] }`;
    });

    const newFunc = `    function generateYeuCau(topic) {
        const yeuCauMap = {
${entries.join(',\n')}
        };
        const entry = yeuCauMap[topic.id];
        if (entry) {
            const codesStr = entry.codes.join(', ');
            return entry.text + ' <span style="color:#6366f1;font-weight:600;font-size:11px;">[' + codesStr + ']</span>';
        }
        return '${data.defaultYeuCau}';
    }`;

    // Find and replace the old generateYeuCau function
    const funcStart = content.indexOf('function generateYeuCau(topic) {');
    if (funcStart === -1) {
        console.log('SKIP:', filename, '- generateYeuCau not found');
        continue;
    }

    const returnLine = content.indexOf('return yeuCauMap[topic.id]', funcStart);
    if (returnLine === -1) {
        // Try alternative pattern
        const altReturn = content.indexOf("return yeuCauMap[topic.id]", funcStart);
        if (altReturn === -1) {
            // Try finding the entry-based return
            const entryReturn = content.indexOf("const entry = yeuCauMap[topic.id]", funcStart);
            if (entryReturn === -1) {
                console.log('SKIP:', filename, '- return not found');
                continue;
            }
        }
    }

    // Find function boundaries more robustly
    let searchFrom = funcStart;
    let closingBrace = -1;
    let braceCount = 0;
    let inFunc = false;
    
    for (let i = searchFrom; i < content.length; i++) {
        if (content[i] === '{') {
            braceCount++;
            inFunc = true;
        } else if (content[i] === '}') {
            braceCount--;
            if (inFunc && braceCount === 0) {
                closingBrace = i + 1;
                break;
            }
        }
    }

    if (closingBrace === -1) {
        console.log('SKIP:', filename, '- closing brace not found');
        continue;
    }

    // Include leading whitespace
    let actualStart = funcStart;
    while (actualStart > 0 && content[actualStart - 1] === ' ') {
        actualStart--;
    }

    content = content.substring(0, actualStart) + newFunc + content.substring(closingBrace);

    fs.writeFileSync(filepath, content, 'utf8');
    fixedCount++;
    console.log('FIXED:', filename);
}

console.log('\nDone! Fixed', fixedCount, 'files with indicator codes.');
