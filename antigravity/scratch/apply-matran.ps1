$files = @(
    'de-thi-vatli.html',
    'de-thi-toan.html',
    'de-thi-sinhhoc.html',
    'de-thi-nguvan.html',
    'de-thi-lichsu.html',
    'de-thi-diali.html',
    'de-thi-ktpl.html',
    'de-thi-tinhoc.html'
)

$basePath = 'C:\Users\thanh\.gemini\antigravity\scratch'

# ===== CSS to add =====
$matranCSS = @'

        /* ===== Ma Tran Tab Styles ===== */
        .matran-container { max-width: 1400px; margin: 0 auto; padding: 24px; animation: fadeInUp 0.5s ease; }
        .matran-card { background: var(--bg-white); border-radius: var(--radius-lg); border: 1px solid rgba(0,0,0,0.06); overflow: hidden; box-shadow: var(--shadow); }
        .matran-header { display: flex; align-items: flex-start; gap: 16px; padding: 24px 28px 20px; border-bottom: 1px solid rgba(0,0,0,0.06); background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); }
        .matran-header-icon { width: 44px; height: 44px; background: linear-gradient(135deg, #6366f1, #4f46e5); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; flex-shrink: 0; }
        .matran-header-info h2 { font-size: 18px; font-weight: 700; color: var(--navy); margin-bottom: 2px; }
        .matran-header-info p { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
        .matran-header-info p i { color: var(--primary); margin-right: 4px; }
        .matran-actions { display: flex; gap: 12px; padding: 20px 28px; border-bottom: 1px solid rgba(0,0,0,0.06); flex-wrap: wrap; }
        .matran-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border-radius: var(--radius); font-size: 14px; font-weight: 600; cursor: pointer; transition: all var(--transition); border: none; }
        .matran-btn.primary { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; box-shadow: 0 4px 14px rgba(99,102,241,0.3); }
        .matran-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(99,102,241,0.4); }
        .matran-btn.secondary { background: var(--bg-lighter); color: var(--text-primary); border: 1.5px solid #e2e8f0; }
        .matran-btn.secondary:hover { background: var(--bg-white); border-color: var(--primary); color: var(--primary); transform: translateY(-2px); box-shadow: var(--shadow-md); }
        .matran-table-wrapper { padding: 24px 28px; overflow-x: auto; }
        .matran-table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 1000px; }
        .matran-table th, .matran-table td { border: 1px solid #94a3b8; padding: 8px 6px; text-align: center; vertical-align: middle; }
        .matran-table thead th { background: #ffffff; font-weight: 700; color: var(--navy); font-size: 11px; }
        .matran-table tbody td { font-size: 12px; color: var(--text-primary); }
        .matran-table tbody td.td-left { text-align: left; padding-left: 10px; }
        .matran-table tbody td.td-center { text-align: center; font-weight: 600; }
        .matran-table tbody tr:hover { background: #f8fafc; }
        .matran-table tfoot td { font-weight: 700; color: var(--navy); font-size: 12px; background: #ffffff; }
        .matran-table .row-tong-cau td { border-top: 2px solid #1e293b; }
        .matran-table .col-tong { background: #f8fafc; font-weight: 700; }
        .matran-footnotes { margin-top: 20px; padding: 16px 20px; background: var(--bg-lighter); border-radius: var(--radius-sm); font-size: 11px; color: var(--text-secondary); line-height: 1.8; }
        .matran-footnotes p { margin-bottom: 2px; }
        .matran-footnotes sup { color: var(--primary); font-weight: 700; margin-right: 2px; }

'@

# ===== HTML to add =====
$matranHTML = @'

    <!-- ===== Tab Content: Ma Tran ===== -->
    <div class="tab-content" id="content-matran">
        <div class="matran-container">
            <div class="matran-card">
                <div class="matran-header">
                    <div class="matran-header-icon">
                        <i class="fas fa-table-cells"></i>
                    </div>
                    <div class="matran-header-info">
                        <h2>1. MA TR&#7852;N &#272;&#7872; KI&#7874;M TRA &#272;&#7882;NH K&#204;</h2>
                        <p><i class="fas fa-file-circle-check"></i> K&#232;m theo C&#244;ng v&#259;n s&#7889; 7991/BGD&#272;T-GDTrH ng&#224;y 17/12/2024 c&#7911;a B&#7897; GD&#272;T</p>
                    </div>
                </div>
                <div class="matran-actions">
                    <button class="matran-btn primary" id="btn-tao-dacta">
                        <i class="fas fa-arrow-right"></i>
                        <span>T&#7841;o b&#7843;n &#273;&#7863;c t&#7843; (tr&#7915; 2 &#273;i&#7875;m)</span>
                    </button>
                    <button class="matran-btn secondary" id="btn-download-matran-docx">
                        <i class="fas fa-download"></i>
                        <span>T&#7843;i v&#7873; .docx</span>
                    </button>
                </div>
                <div class="matran-table-wrapper">
                    <table class="matran-table" id="matran-table">
                        <thead id="matran-thead">
                        </thead>
                        <tbody id="matran-tbody">
                        </tbody>
                        <tfoot id="matran-tfoot">
                        </tfoot>
                    </table>
                    <div class="matran-footnotes" id="matran-footnotes">
                        <p><sup>1</sup> M&#7895;i c&#226;u h&#7887;i bao g&#7891;m 4 &#253; nh&#7887;, m&#7895;i &#253; h&#7885;c sinh ph&#7843;i ch&#7885;n &#273;&#250;ng ho&#7863;c sai. M&#7897;t s&#7889; t&#224;i li&#7879;u x&#7871;p lo&#7841;i c&#226;u h&#7887;i n&#224;y v&#224;o lo&#7841;i Nhi&#7873;u l&#7921;a ch&#7885;n ph&#7913;c h&#7907;p ho&#7863;c Nhi&#7873;u l&#7921;a ch&#7885;n c&#243; nhi&#7873;u ph&#432;&#417;ng &#225;n &#273;&#250;ng.</p>
                        <p><sup>2</sup> &#272;&#7889;i v&#7899;i m&#244;n h&#7885;c kh&#244;ng s&#7917; d&#7909;ng d&#7841;ng n&#224;y th&#236; chuy&#7875;n to&#224;n b&#7897; s&#7889; &#273;i&#7875;m cho d&#7841;ng "&#272;&#250;ng &#8211; Sai".</p>
                        <p><sup>3</sup> C&#243; &#7903; trong m&#7897;t s&#7889; &#244; c&#7911;a ma tr&#7853;n, th&#7875; hi&#7879;n s&#7889; c&#226;u h&#7887;i ho&#7863;c c&#226;u h&#7887;i s&#7889; bao nhi&#234;u.</p>
                        <p><sup>4</sup> L&#7921;a ch&#7885;n sao cho &#273;&#432;&#7907;c kho&#7843;ng 3,0 &#273;i&#7875;m, t&#432;&#417;ng &#7913;ng v&#7899;i t&#7881; l&#7879; kho&#7843;ng 30%; t&#432;&#417;ng t&#7921; nh&#432; th&#7871; &#273;&#7889;i v&#7899;i c&#225;c d&#7841;ng kh&#225;c.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

'@

# ===== JS for switchTab update =====
$switchTabAdd = @'
        // When switching to matran, generate the matrix table
        if (tabName === 'matran') {
            generateMatranTable();
        }
'@

# ===== JS for button handlers =====
$buttonHandlersJS = @'

        // Ma Tran: Tao ban dac ta -> switch to Dac Ta tab
        const btnTaoDacta = document.getElementById('btn-tao-dacta');
        if (btnTaoDacta) {
            btnTaoDacta.addEventListener('click', () => {
                btnTaoDacta.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>&#272;ang t&#7841;o &#273;&#7863;c t&#7843;...</span>';
                btnTaoDacta.style.opacity = '0.7';
                btnTaoDacta.disabled = true;
                setTimeout(() => {
                    btnTaoDacta.innerHTML = '<i class="fas fa-check-circle"></i> <span>&#272;&#227; t&#7841;o th&#224;nh c&#244;ng!</span>';
                    btnTaoDacta.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                    showNotification('\u0110\u00e3 t\u1ea1o b\u1ea3n \u0111\u1eb7c t\u1ea3 th\u00e0nh c\u00f4ng! Chuy\u1ec3n sang tab \u0110\u1eb7c t\u1ea3...', 'success');
                    setTimeout(() => {
                        switchTab('dacta');
                        btnTaoDacta.innerHTML = '<i class="fas fa-arrow-right"></i> <span>T&#7841;o b&#7843;n &#273;&#7863;c t&#7843; (tr&#7915; 2 &#273;i&#7875;m)</span>';
                        btnTaoDacta.style.background = '';
                        btnTaoDacta.style.opacity = '1';
                        btnTaoDacta.disabled = false;
                    }, 1500);
                }, 2000);
            });
        }

        // Ma Tran: Download .docx
        const btnDownloadMatran = document.getElementById('btn-download-matran-docx');
        if (btnDownloadMatran) {
            btnDownloadMatran.addEventListener('click', () => {
                exportMatranToDocx();
            });
        }
'@

# ===== JS functions =====
$matranFunctions = @'

    // ===== Ma Tran Table Generation =====
    function generateMatranTable() {
        const thead = document.getElementById('matran-thead');
        const tbody = document.getElementById('matran-tbody');
        const tfoot = document.getElementById('matran-tfoot');
        thead.innerHTML = '';
        tbody.innerHTML = '';
        tfoot.innerHTML = '';

        const tnSoCau = parseInt(document.getElementById('tn-socau').value) || 0;
        const dsSoCau = parseInt(document.getElementById('ds-socau').value) || 0;
        const tlnSoCau = parseInt(document.getElementById('tln-socau').value) || 0;
        const tlSoCau = parseInt(document.getElementById('tl-socau').value) || 0;
        const tnDiem = parseVietnameseDecimal(document.getElementById('tn-diem').value);
        const dsDiem = parseVietnameseDecimal(document.getElementById('ds-diem').value);
        const tlnDiem = parseVietnameseDecimal(document.getElementById('tln-diem').value);

        const bietPct = parseInt(document.getElementById('biet').value) || 40;
        const hieuPct = parseInt(document.getElementById('hieu').value) || 30;
        const vandungPct = parseInt(document.getElementById('vandung').value) || 30;
        const totalPct = bietPct + hieuPct + vandungPct;
        const bietRatio = bietPct / totalPct;
        const hieuRatio = hieuPct / totalPct;

        const hr1 = document.createElement('tr');
        hr1.innerHTML = '<th rowspan="4" style="width:35px;">TT</th><th rowspan="4" style="min-width:140px;">Ch&#7911; &#273;&#7873;/Ch&#432;&#417;ng</th><th rowspan="4" style="min-width:160px;">N&#7897;i dung/&#273;&#417;n v&#7883; ki&#7871;n th&#7913;c</th><th colspan="12">M&#7913;c &#273;&#7897; &#273;&#225;nh gi&#225;</th><th rowspan="3" colspan="2" style="min-width:70px;">T&#7893;ng<br>T&#7881; l&#7879;<br>%<br>&#273;i&#7875;m</th>';
        thead.appendChild(hr1);

        const hr2 = document.createElement('tr');
        hr2.innerHTML = '<th colspan="6">TNKQ</th><th colspan="6">T&#7921; lu&#7853;n</th>';
        thead.appendChild(hr2);

        const hr3 = document.createElement('tr');
        hr3.innerHTML = '<th colspan="3">Nhi&#7873;u l&#7921;a ch&#7885;n</th><th colspan="3">"&#272;&#250;ng &#8211; Sai"</th><th colspan="3">Tr&#7843; l&#7901;i ng&#7855;n</th><th colspan="3">T&#7921; lu&#7853;n</th>';
        thead.appendChild(hr3);

        const hr4 = document.createElement('tr');
        let r4 = '';
        for (let i = 0; i < 4; i++) r4 += '<th>Bi&#7871;t</th><th>Hi&#7875;u</th><th>V&#7853;n d&#7909;ng</th>';
        r4 += '<th></th><th></th>';
        hr4.innerHTML = r4;
        thead.appendChild(hr4);

        const selectedTopicList = [];
        selectedTopics.forEach(id => {
            const topic = physicsTopics.find(t => t.id === id);
            if (topic) {
                const subs = selectedSubTopics[id] || new Set(topic.subtopics);
                selectedTopicList.push({ ...topic, selectedSubs: Array.from(subs) });
            }
        });

        if (selectedTopicList.length === 0) {
            tbody.innerHTML = '<tr><td colspan="17" style="padding:40px; color:#94a3b8; font-style:italic;">Vui l\u00f2ng ch\u1ecdn n\u1ed9i dung ki\u1ec3m tra \u1edf tab C\u1ea5u h\u00ecnh tr\u01b0\u1edbc.</td></tr>';
            return;
        }

        const numTopics = selectedTopicList.length;
        function distribute(total, count) {
            if (count === 0) return [];
            const base = Math.floor(total / count);
            const remainder = total % count;
            const arr = Array(count).fill(base);
            for (let i = 0; i < remainder; i++) arr[i]++;
            return arr;
        }

        const tnPerTopic = distribute(tnSoCau, numTopics);
        const dsPerTopic = distribute(dsSoCau, numTopics);
        const tlnPerTopic = distribute(tlnSoCau, numTopics);
        const tlPerTopic = distribute(tlSoCau, numTopics);
        let totalCols = new Array(12).fill(0);
        let grandTotal = 0;

        function splitByCognition(total) {
            if (total === 0) return [0, 0, 0];
            const b = Math.round(total * bietRatio);
            const h = Math.round(total * hieuRatio);
            const v = total - b - h;
            return [Math.max(0, b), Math.max(0, h), Math.max(0, v)];
        }

        selectedTopicList.forEach((topic, idx) => {
            const tn = tnPerTopic[idx] || 0;
            const ds = dsPerTopic[idx] || 0;
            const tln = tlnPerTopic[idx] || 0;
            const tl = tlPerTopic[idx] || 0;
            const cells = [...splitByCognition(tn), ...splitByCognition(ds), ...splitByCognition(tln), ...splitByCognition(tl)];
            cells.forEach((v, i) => totalCols[i] += v);
            const rowTotal = tn + ds + tln + tl;
            grandTotal += rowTotal;
            const subNames = topic.selectedSubs.join(', ');
            const rowScore = (tn * tnDiem) + (ds * dsDiem) + (tln * tlnDiem);
            const totalTnkqScore = (tnSoCau * tnDiem) + (dsSoCau * dsDiem) + (tlnSoCau * tlnDiem);
            const totalTuluanScore = 10 - totalTnkqScore;
            const tlScoreForRow = tlSoCau > 0 ? (tl / tlSoCau) * totalTuluanScore : 0;
            const totalRowScore = rowScore + tlScoreForRow;

            const tr = document.createElement('tr');
            tr.innerHTML = `<td class="td-center">${idx + 1}</td><td class="td-left">${topic.fullName}</td><td class="td-left">${subNames}</td>${cells.map(c => `<td>${c || ''}</td>`).join('')}<td class="col-tong" style="font-weight:700;">${rowTotal}</td><td class="col-tong">${totalRowScore > 0 ? Math.round(totalRowScore * 10) / 10 : ''}</td>`;
            tbody.appendChild(tr);
        });

        const trTotalCau = document.createElement('tr');
        trTotalCau.className = 'row-tong-cau';
        trTotalCau.innerHTML = `<td colspan="3" style="text-align:left; font-weight:700;">T\u1ed5ng s\u1ed1 c\u00e2u</td>${totalCols.map(c => `<td>${c || ''}</td>`).join('')}<td class="col-tong" style="font-weight:700;">${grandTotal}</td><td class="col-tong"></td>`;
        tfoot.appendChild(trTotalCau);

        const tnTotalScore = (totalCols[0] + totalCols[1] + totalCols[2]) * tnDiem;
        const dsTotalScore = (totalCols[3] + totalCols[4] + totalCols[5]) * dsDiem;
        const tlnTotalScore = (totalCols[6] + totalCols[7] + totalCols[8]) * tlnDiem;
        const diemTuLuanTotal = 10 - tnTotalScore - dsTotalScore - tlnTotalScore;
        const tlCount = totalCols[9] + totalCols[10] + totalCols[11];
        const tlEach = tlCount > 0 ? diemTuLuanTotal / tlCount : 0;

        function fmtScore(v) {
            if (v === 0) return '';
            const r = Math.round(v * 100) / 100;
            return r % 1 === 0 ? r.toFixed(0) : r.toFixed(2);
        }

        const diemCols = [
            ...totalCols.slice(0, 3).map(c => fmtScore(c * tnDiem)),
            ...totalCols.slice(3, 6).map(c => fmtScore(c * dsDiem)),
            ...totalCols.slice(6, 9).map(c => fmtScore(c * tlnDiem)),
            ...totalCols.slice(9, 12).map(c => fmtScore(c * tlEach))
        ];

        const trDiem = document.createElement('tr');
        trDiem.innerHTML = `<td colspan="3" style="text-align:left; font-weight:700;">T\u1ed5ng s\u1ed1 \u0111i\u1ec3m</td>${diemCols.map(c => `<td>${c}</td>`).join('')}<td class="col-tong" colspan="2" style="font-weight:700;">10</td>`;
        tfoot.appendChild(trDiem);

        const pctCols = diemCols.map(c => {
            const v = parseFloat(c) || 0;
            return v > 0 ? Math.round(v / 10 * 100) : '';
        });

        const trPct = document.createElement('tr');
        trPct.innerHTML = `<td colspan="3" style="text-align:left; font-weight:700;">T\u1ec9 l\u1ec7 %</td>${pctCols.map(c => `<td>${c}</td>`).join('')}<td class="col-tong" colspan="2" style="font-weight:700;">100</td>`;
        tfoot.appendChild(trPct);
    }

    // ===== Export Ma Tran to .docx =====
    async function exportMatranToDocx() {
        const { Document, Packer, Table, TableRow, TableCell, Paragraph, TextRun, AlignmentType, BorderStyle, WidthType, VerticalAlign, PageOrientation } = docx;

        const tnSoCau = parseInt(document.getElementById('tn-socau').value) || 0;
        const dsSoCau = parseInt(document.getElementById('ds-socau').value) || 0;
        const tlnSoCau = parseInt(document.getElementById('tln-socau').value) || 0;
        const tlSoCau = parseInt(document.getElementById('tl-socau').value) || 0;
        const tnDiem = parseVietnameseDecimal(document.getElementById('tn-diem').value);
        const dsDiem = parseVietnameseDecimal(document.getElementById('ds-diem').value);
        const tlnDiem = parseVietnameseDecimal(document.getElementById('tln-diem').value);
        const bietPct = parseInt(document.getElementById('biet').value) || 40;
        const hieuPct = parseInt(document.getElementById('hieu').value) || 30;
        const vandungPct = parseInt(document.getElementById('vandung').value) || 30;
        const totalPct = bietPct + hieuPct + vandungPct;
        const bietRatio = bietPct / totalPct;
        const hieuRatio = hieuPct / totalPct;

        const selectedTopicList = [];
        selectedTopics.forEach(id => {
            const topic = physicsTopics.find(t => t.id === id);
            if (topic) {
                const subs = selectedSubTopics[id] || new Set(topic.subtopics);
                selectedTopicList.push({ ...topic, selectedSubs: Array.from(subs) });
            }
        });

        if (selectedTopicList.length === 0) {
            showNotification('Vui l\u00f2ng ch\u1ecdn n\u1ed9i dung ki\u1ec3m tra tr\u01b0\u1edbc!', 'warning');
            return;
        }

        const numTopics = selectedTopicList.length;
        function distribute(total, count) {
            if (count === 0) return [];
            const base = Math.floor(total / count);
            const remainder = total % count;
            const arr = Array(count).fill(base);
            for (let i = 0; i < remainder; i++) arr[i]++;
            return arr;
        }
        function splitByCognition(total) {
            if (total === 0) return [0, 0, 0];
            const b = Math.round(total * bietRatio);
            const h = Math.round(total * hieuRatio);
            const v = total - b - h;
            return [Math.max(0, b), Math.max(0, h), Math.max(0, v)];
        }

        const tnPerTopic = distribute(tnSoCau, numTopics);
        const dsPerTopic = distribute(dsSoCau, numTopics);
        const tlnPerTopic = distribute(tlnSoCau, numTopics);
        const tlPerTopic = distribute(tlSoCau, numTopics);

        const borders = {
            top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            right: { style: BorderStyle.SINGLE, size: 1, color: '000000' }
        };

        function makeCell(text, opts = {}) {
            return new TableCell({
                children: [new Paragraph({
                    alignment: opts.align || AlignmentType.CENTER,
                    spacing: { before: 40, after: 40 },
                    children: [new TextRun({ text: String(text), bold: opts.bold || false, size: opts.size || 20, font: 'Times New Roman' })]
                })],
                verticalAlign: VerticalAlign.CENTER,
                rowSpan: opts.rowSpan || 1,
                columnSpan: opts.colSpan || 1,
                borders: borders,
                width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
            });
        }

        const headerRow1 = new TableRow({ children: [
            makeCell('TT', { bold: true, rowSpan: 4, width: 500 }),
            makeCell('Ch\u1ee7 \u0111\u1ec1/Ch\u01b0\u01a1ng', { bold: true, rowSpan: 4, width: 2000 }),
            makeCell('N\u1ed9i dung/\u0111\u01a1n v\u1ecb ki\u1ebfn th\u1ee9c', { bold: true, rowSpan: 4, width: 2200 }),
            makeCell('M\u1ee9c \u0111\u1ed9 \u0111\u00e1nh gi\u00e1', { bold: true, colSpan: 12 }),
            makeCell('T\u1ed5ng\nT\u1ec9 l\u1ec7\n%\n\u0111i\u1ec3m', { bold: true, rowSpan: 3, colSpan: 2, width: 900 })
        ]});
        const headerRow2 = new TableRow({ children: [
            makeCell('TNKQ', { bold: true, colSpan: 6 }),
            makeCell('T\u1ef1 lu\u1eadn', { bold: true, colSpan: 6 })
        ]});
        const headerRow3 = new TableRow({ children: [
            makeCell('Nhi\u1ec1u l\u1ef1a ch\u1ecdn', { bold: true, colSpan: 3 }),
            makeCell('\u201c\u0110\u00fang \u2013 Sai\u201d', { bold: true, colSpan: 3 }),
            makeCell('Tr\u1ea3 l\u1eddi ng\u1eafn', { bold: true, colSpan: 3 }),
            makeCell('T\u1ef1 lu\u1eadn', { bold: true, colSpan: 3 })
        ]});
        const bvh = ['Bi\u1ebft', 'Hi\u1ec3u', 'V\u1eadn d\u1ee5ng'];
        const hr4Cells = [];
        for (let i = 0; i < 4; i++) bvh.forEach(l => hr4Cells.push(makeCell(l, { bold: true, size: 18 })));
        hr4Cells.push(makeCell('', { size: 18 })); hr4Cells.push(makeCell('', { size: 18 }));
        const headerRow4 = new TableRow({ children: hr4Cells });

        const dataRows = [];
        let totalCols = new Array(12).fill(0);
        let grandTotal = 0;
        const totalTnkqScore = (tnSoCau * tnDiem) + (dsSoCau * dsDiem) + (tlnSoCau * tlnDiem);
        const totalTuluanScore = 10 - totalTnkqScore;

        selectedTopicList.forEach((topic, idx) => {
            const tn = tnPerTopic[idx] || 0, ds = dsPerTopic[idx] || 0, tln = tlnPerTopic[idx] || 0, tl = tlPerTopic[idx] || 0;
            const cells = [...splitByCognition(tn), ...splitByCognition(ds), ...splitByCognition(tln), ...splitByCognition(tl)];
            cells.forEach((v, i) => totalCols[i] += v);
            const rowTotal = tn + ds + tln + tl;
            grandTotal += rowTotal;
            const rowScore = (tn * tnDiem) + (ds * dsDiem) + (tln * tlnDiem);
            const tlScoreForRow = tlSoCau > 0 ? (tl / tlSoCau) * totalTuluanScore : 0;
            const totalRowScore = Math.round((rowScore + tlScoreForRow) * 10) / 10;
            dataRows.push(new TableRow({ children: [
                makeCell(String(idx + 1), { bold: true }),
                makeCell(topic.fullName, { align: AlignmentType.LEFT }),
                makeCell(topic.selectedSubs.join(', '), { align: AlignmentType.LEFT }),
                ...cells.map(c => makeCell(c || '')),
                makeCell(String(rowTotal), { bold: true }),
                makeCell(totalRowScore > 0 ? String(totalRowScore) : '')
            ]}));
        });

        const tnTotal = (totalCols[0]+totalCols[1]+totalCols[2])*tnDiem;
        const dsTotal = (totalCols[3]+totalCols[4]+totalCols[5])*dsDiem;
        const tlnTotal = (totalCols[6]+totalCols[7]+totalCols[8])*tlnDiem;
        const diemTL = 10-tnTotal-dsTotal-tlnTotal;
        const tlC = totalCols[9]+totalCols[10]+totalCols[11];
        const tlE = tlC > 0 ? diemTL/tlC : 0;
        function fmtD(v) { if(v===0)return''; const r=Math.round(v*100)/100; return r%1===0?r.toFixed(0):r.toFixed(2); }
        const diemArr = [...totalCols.slice(0,3).map(c=>fmtD(c*tnDiem)),...totalCols.slice(3,6).map(c=>fmtD(c*dsDiem)),...totalCols.slice(6,9).map(c=>fmtD(c*tlnDiem)),...totalCols.slice(9,12).map(c=>fmtD(c*tlE))];
        const pctArr = diemArr.map(c=>{const v=parseFloat(c)||0; return v>0?String(Math.round(v/10*100)):'';});

        const footerRow1 = new TableRow({ children: [makeCell('T\u1ed5ng s\u1ed1 c\u00e2u',{bold:true,colSpan:3,align:AlignmentType.LEFT}),...totalCols.map(c=>makeCell(c||'',{bold:true})),makeCell(String(grandTotal),{bold:true}),makeCell('')]});
        const footerRow2 = new TableRow({ children: [makeCell('T\u1ed5ng s\u1ed1 \u0111i\u1ec3m',{bold:true,colSpan:3,align:AlignmentType.LEFT}),...diemArr.map(c=>makeCell(c)),makeCell('10',{bold:true,colSpan:2})]});
        const footerRow3 = new TableRow({ children: [makeCell('T\u1ec9 l\u1ec7 %',{bold:true,colSpan:3,align:AlignmentType.LEFT}),...pctArr.map(c=>makeCell(c)),makeCell('100',{bold:true,colSpan:2})]});

        const table = new Table({ rows: [headerRow1,headerRow2,headerRow3,headerRow4,...dataRows,footerRow1,footerRow2,footerRow3], width:{size:100,type:WidthType.PERCENTAGE}});

        const doc = new Document({ sections: [{ properties: { page: { margin:{top:1134,right:850,bottom:1134,left:1134}, size:{orientation:PageOrientation.LANDSCAPE,width:16838,height:11906}}},
            children: [
                new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:200},children:[new TextRun({text:'1. MA TR\u1eacN \u0110\u1ec0 KI\u1ec2M TRA \u0110\u1ecaNH K\u00cc',bold:true,size:28,font:'Times New Roman'})]}),
                new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:300},children:[new TextRun({text:'K\u00e8m theo C\u00f4ng v\u0103n s\u1ed1 7991/BGD\u0110T-GDTrH ng\u00e0y 17/12/2024 c\u1ee7a B\u1ed9 GD\u0110T',italics:true,size:22,font:'Times New Roman'})]}),
                table,
                new Paragraph({spacing:{before:200},children:[new TextRun({text:'\u00b9 M\u1ed7i c\u00e2u h\u1ecfi bao g\u1ed3m 4 \u00fd nh\u1ecf, m\u1ed7i \u00fd h\u1ecdc sinh ph\u1ea3i ch\u1ecdn \u0111\u00fang ho\u1eb7c sai.',italics:true,size:18,font:'Times New Roman'})]}),
                new Paragraph({children:[new TextRun({text:'\u00b2 \u0110\u1ed1i v\u1edbi m\u00f4n h\u1ecdc kh\u00f4ng s\u1eed d\u1ee5ng d\u1ea1ng n\u00e0y th\u00ec chuy\u1ec3n to\u00e0n b\u1ed9 s\u1ed1 \u0111i\u1ec3m cho d\u1ea1ng "\u0110\u00fang \u2013 Sai".',italics:true,size:18,font:'Times New Roman'})]}),
                new Paragraph({children:[new TextRun({text:'\u00b3 C\u00f3 \u1edf trong m\u1ed9t s\u1ed1 \u00f4 c\u1ee7a ma tr\u1eadn, th\u1ec3 hi\u1ec7n s\u1ed1 c\u00e2u h\u1ecfi ho\u1eb7c c\u00e2u h\u1ecfi s\u1ed1 bao nhi\u00eau.',italics:true,size:18,font:'Times New Roman'})]}),
                new Paragraph({children:[new TextRun({text:'\u2074 L\u1ef1a ch\u1ecdn sao cho \u0111\u01b0\u1ee3c kho\u1ea3ng 3,0 \u0111i\u1ec3m, t\u01b0\u01a1ng \u1ee9ng v\u1edbi t\u1ec9 l\u1ec7 kho\u1ea3ng 30%.',italics:true,size:18,font:'Times New Roman'})]})
            ]
        }]});

        try {
            const blob = await Packer.toBlob(doc);
            saveAs(blob, 'Ma_Tran_De_Kiem_Tra.docx');
            showNotification('\u0110\u00e3 t\u1ea3i v\u1ec1 file Ma_Tran_De_Kiem_Tra.docx th\u00e0nh c\u00f4ng!', 'success');
        } catch (err) {
            console.error('Export error:', err);
            showNotification('L\u1ed7i khi xu\u1ea5t file. Vui l\u00f2ng th\u1eed l\u1ea1i!', 'error');
        }
    }
'@

# ===== Responsive CSS addition =====
$responsiveCSS = @'
            .matran-container { padding: 16px; }
            .matran-header { padding: 16px 20px; flex-direction: column; gap: 12px; }
            .matran-actions { padding: 16px 20px; flex-direction: column; }
            .matran-btn { justify-content: center; }
            .matran-table-wrapper { padding: 16px 12px; }
'@

foreach ($file in $files) {
    $filePath = Join-Path $basePath $file
    Write-Host "Processing $file ..." -ForegroundColor Cyan
    
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # 1. Add CSS: Insert matran CSS before the @media block that contains tab-content-grid
    if ($content -notmatch 'Ma Tran Tab Styles') {
        # Insert before @media (max-width: 1024px)
        $content = $content -replace '(\s*@media \(max-width: 1024px\)\s*\{\s*\n\s*\.tab-content-grid)', "$matranCSS`$1"
        Write-Host "  + Added CSS" -ForegroundColor Green
    } else {
        Write-Host "  = CSS already exists" -ForegroundColor Yellow
    }
    
    # 2. Add responsive CSS inside @media 640px
    if ($content -notmatch 'matran-container.*padding.*16px') {
        $content = $content -replace '(\.spec-table-wrapper \{ padding: 16px 12px; \})', "`$1`n$responsiveCSS"
        Write-Host "  + Added responsive CSS" -ForegroundColor Green
    }
    
    # 3. Add HTML: Insert matran HTML before <!-- ===== Tab Content: Dac Ta ===== -->
    if ($content -notmatch 'content-matran') {
        $content = $content -replace '(\s*<!-- ===== Tab Content: Dac Ta ===== -->)', "$matranHTML`$1"
        Write-Host "  + Added HTML" -ForegroundColor Green
    } else {
        Write-Host "  = HTML already exists" -ForegroundColor Yellow
    }
    
    # 4. Update switchTab: Add matran call after dacta call
    if ($content -notmatch 'generateMatranTable') {
        $content = $content -replace "(if \(tabName === 'dacta'\) \{\s*\n\s*generateSpecTable\(\);\s*\n\s*\})", "`$1`n$switchTabAdd"
        Write-Host "  + Added switchTab logic" -ForegroundColor Green
    } else {
        Write-Host "  = switchTab already has matran" -ForegroundColor Yellow
    }
    
    # 5. Add button handlers
    if ($content -notmatch 'btn-tao-dacta') {
        # Insert before the closing of the DOMContentLoaded block that has btn-download-docx
        $content = $content -replace "(btn-download-docx.*?\n\s*\}\);?\s*\n\s*\})", "`$1`n$buttonHandlersJS"
        Write-Host "  + Added button handlers" -ForegroundColor Green
    }
    
    # 6. Add JS functions before </script>
    if ($content -notmatch 'function generateMatranTable') {
        $content = $content -replace '(\s*</script>\s*\n\s*</body>)', "$matranFunctions`$1"
        Write-Host "  + Added JS functions" -ForegroundColor Green
    } else {
        Write-Host "  = JS functions already exist" -ForegroundColor Yellow
    }
    
    # Save file
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "  Saved $file" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Done! All files updated." -ForegroundColor Cyan
