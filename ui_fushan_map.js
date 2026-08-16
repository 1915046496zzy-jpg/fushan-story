// ====== ui_fushan_map.js (地貌程序化渲染版) ======

(function(global) {
    // ==========================================
    // 1. 伏山地图核心数据库 (保留你原有的结构)
    // ==========================================
    global.fushanMapDatabase = {
        "伏山盆地": [
            { name: "伏山神祠建筑群", icon: "bi-bank2", coord: {top: "10%", left: "50%"}, desc: "伏山最高点，俯瞰全镇的核心信仰枢纽。", scenes: [{name: "神祠主殿", icon: "bi-house-heart", desc: "供奉伏山神明的核心大殿。"}, {name: "大祝宅邸", icon: "bi-house", desc: "主殿正北，历代大祝居所。"}, {name: "祭祀广场", icon: "bi-brightness-high", desc: "主殿正南，大型仪式举办地。"}, {name: "供品仓储区", icon: "bi-box-seam", desc: "位于东西两侧的物资库。"}, {name: "执事居所", icon: "bi-person-badge", desc: "神祠日常维护人员的住所。"}] },
            { name: "镇委行政区", icon: "bi-building", coord: {top: "25%", left: "48%"}, desc: "主峰南坡的世俗权力与管理中心。", scenes: [{name: "镇委大院与广播站", icon: "bi-megaphone", desc: "镇政府办公地及播音枢纽。"}, {name: "镇派出所", icon: "bi-shield-shaded", desc: "大院正西的治安机构。"}, {name: "伏山宗祠", icon: "bi-journal-bookmark-fill", desc: "大院偏东的家族议事厅。"}] },
            { name: "主峰自然基建", icon: "bi-tree", coord: {top: "15%", left: "35%"}, desc: "伏山背阴面与山腰的自然林地及基建设施。", scenes: [{name: "后山药林", icon: "bi-flower1", desc: "主峰背面，草药丛生。"}, {name: "祖坟山/乱葬岗", icon: "bi-moon-stars", desc: "背阴坡，阴气极重。"}, {name: "红砖水塔", icon: "bi-droplet-half", desc: "西侧山腰的供水设施。"}, {name: "移动信号塔", icon: "bi-broadcast", desc: "东侧半山腰的通讯基站。"}] },
            { name: "中心十字路口", icon: "bi-stoplights", coord: {top: "45%", left: "50%"}, desc: "连接伏山东南西北的交通枢纽。", scenes: [{name: "欣欣大超市", icon: "bi-cart", desc: "东北角的现代物资采购点。"}, {name: "邮政储蓄所", icon: "bi-bank", desc: "西北角的金融网点。"}, {name: "老槐树乘凉坪", icon: "bi-cup-hot", desc: "东南角，镇民聚集八卦之地。"}, {name: "镇中心公厕", icon: "bi-gender-ambiguous", desc: "乘凉坪向南50米。"}] },
            { name: "东部教育手工业区", icon: "bi-mortarboard", coord: {top: "45%", left: "75%"}, desc: "学校及传统作坊聚集地。", scenes: [{name: "中心小学 & 初高中", icon: "bi-book", desc: "沿镇东一街分布的教育片区。"}, {name: "陈家老豆腐坊", icon: "bi-shop", desc: "镇东二街中段的传统作坊。"}, {name: "孙记榨油坊", icon: "bi-droplet", desc: "豆腐坊斜对面。"}, {name: "伏山打米厂", icon: "bi-gear", desc: "梯田土路旁。"}, {name: "镇东屠宰场", icon: "bi-scissors", desc: "最边缘近山林处。"}] },
            { name: "东部边缘自然区", icon: "bi-triangle-half", coord: {top: "30%", left: "85%"}, desc: "半山腰的农业与废弃地带。", scenes: [{name: "伏山梯田", icon: "bi-layers", desc: "正东半山腰的层叠农田。"}, {name: "废旧变压器房", icon: "bi-lightning", desc: "东北方向的荒地，少有人至。"}] },
            { name: "西部老街区", icon: "bi-shop-window", coord: {top: "48%", left: "22%"}, desc: "充满烟火气与传统店铺的旧街。", scenes: [{name: "桥头菜市场", icon: "bi-basket", desc: "青石桥旁的早市。"}, {name: "胖子早餐 & 星岛奶茶", icon: "bi-cup-straw", desc: "老街东段的饮食店。"}, {name: "王记老茶馆", icon: "bi-cup", desc: "老街中段。"}, {name: "胖婶小卖部 & 德叔香烛", icon: "bi-bag", desc: "老街西段。"}, {name: "老赵打铁 & 老李木匠", icon: "bi-hammer", desc: "北一巷的手工业者。"}, {name: "李瞎子理发店", icon: "bi-scissors", desc: "老街尽头。"}] },
            { name: "西部边缘地带", icon: "bi-hospital", coord: {top: "35%", left: "12%"}, desc: "镇外偏僻的医疗与水源地。", scenes: [{name: "安康诊所", icon: "bi-capsule", desc: "老街尽头向西200米岔路口。"}, {name: "镇外水库", icon: "bi-water", desc: "西北方向2公里处山谷。"}] },
            { name: "南部洼地及出镇口", icon: "bi-bus-front", coord: {top: "75%", left: "50%"}, desc: "地势低洼，农资仓储与外界通道。", scenes: [{name: "农资仓库区", icon: "bi-truck", desc: "包含收购站、化肥库、五金店及兽医站。"}, {name: "伏山客运站", icon: "bi-bus-front", desc: "主街尽头，出镇公路入口。"}, {name: "废品回收站", icon: "bi-recycle", desc: "客运站向南100米路边。"}, {name: "农机站加油点", icon: "bi-fuel-pump", desc: "镇东南角。"}, {name: "刘婆婆家", icon: "bi-person-heart", desc: "镇南偏西居民巷，接生婆住处。"}] },
            { name: "镇外南郊", icon: "bi-sign-turn-right", coord: {top: "92%", left: "50%"}, desc: "唯一的出入通道及荒野。", scenes: [{name: "盘山公路", icon: "bi-signpost", desc: "正南方向，通往外界。"}, {name: "镇外野河塘", icon: "bi-water", desc: "正南方向1公里处。"}, {name: "镇南垃圾沟", icon: "bi-trash", desc: "正南方向2公里处。"}] }
        ],
        "未定之域": [
            { name: "林岁岁家", icon: "bi-house-dash", desc: "伏山脚下破旧房屋 (实装坐标待定)" },
            { name: "戏台搭建点", icon: "bi-stars", desc: "春祭期间在祭祀广场激活" }
        ]
    };

    global.currentFushanLoc = null;
    global.fsMapFontSize = 14; 

    // ==========================================
    // 2. 地貌程序化生成引擎 (Procedural Terrain Engine)
    // ==========================================
    function generateTerrainHTML() {
        let html = '';
        
        // A. 道路交通网 (SVG 路径绘制)
        html += `<svg class="fs-terrain-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
            <!-- 盆地主干道 -->
            <path d="M 50 50 L 50 13" stroke="#bdae95" stroke-width="0.3" stroke-dasharray="1 0.5" fill="none"/>
            <path d="M 50 50 L 22 48" stroke="#bdae95" stroke-width="0.3" stroke-dasharray="1 0.5" fill="none"/>
            <path d="M 50 50 L 75 45" stroke="#bdae95" stroke-width="0.3" stroke-dasharray="1 0.5" fill="none"/>
            <path d="M 50 50 L 50 80" stroke="#a89379" stroke-width="0.5" fill="none"/>
            <!-- 盘山公路出镇 (蜿蜒) -->
            <path d="M 50 80 Q 42 85 55 88 T 45 95 T 50 100" stroke="#8b7355" stroke-width="0.8" fill="none"/>
            <!-- 梯田山路 -->
            <path d="M 75 45 L 85 30" stroke="#bdae95" stroke-width="0.2" stroke-dasharray="0.5 0.5" fill="none"/>
            <!-- 镇外水库土路 -->
            <path d="M 22 48 Q 15 40 10 25" stroke="#bdae95" stroke-width="0.2" stroke-dasharray="0.5 0.5" fill="none"/>
            <!-- 伏山梯田地貌 (等高线表示) -->
            <path d="M 80 28 Q 85 32 90 28" stroke="#6b8e23" stroke-width="0.2" fill="none"/>
            <path d="M 79 30 Q 85 34 91 30" stroke="#6b8e23" stroke-width="0.2" fill="none"/>
            <path d="M 78 32 Q 85 36 92 32" stroke="#6b8e23" stroke-width="0.2" fill="none"/>
            <path d="M 77 34 Q 85 38 93 34" stroke="#6b8e23" stroke-width="0.2" fill="none"/>
        </svg>`;

        // B. 水体生成 (不规则的湖泊与河塘)
        html += `
            <div class="fs-water-body" style="left: 6%; top: 15%; width: 10%; height: 8%; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;">
                <span>镇外水库</span>
            </div>
            <div class="fs-water-body" style="left: 48%; top: 85%; width: 5%; height: 3%; border-radius: 50% 50% 30% 70% / 60% 40% 60% 40%;">
                <span style="font-size:8px;">野河塘</span>
            </div>
        `;

        // C. 植被与森林算法生成 (Forest Generator)
        const forests = [
            { cx: 50, cy: 0, r: 12, density: 45, color: '#4a5d23' }, // 后山药林 (茂密，深绿)
            { cx: 35, cy: 10, r: 8, density: 15, color: '#556b2f' }, // 主峰西侧林
            { cx: 88, cy: 35, r: 10, density: 25, color: '#6b8e23' }, // 东部边缘山林 (稍黄)
            { cx: 12, cy: 22, r: 8, density: 15, color: '#556b2f' }, // 水库周边树木
            { cx: 50, cy: 98, r: 15, density: 20, color: '#8b7355' }  // 南部垃圾沟枯树 (棕褐色)
        ];

        // 随机种子算法，确保每次打开的树林布局固定
        function seededRandom(seed) {
            let x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        }

        let seed = 12345;
        forests.forEach(f => {
            for(let i=0; i<f.density; i++) {
                let angle = seededRandom(seed++) * Math.PI * 2;
                let rad = seededRandom(seed++) * f.r;
                let x = f.cx + rad * Math.cos(angle);
                // 压缩 Y 轴产生伪 3D 透视感
                let y = f.cy + rad * Math.sin(angle) * 1.5; 
                let size = 0.8 + seededRandom(seed++) * 0.7;
                let opacity = 0.6 + seededRandom(seed++) * 0.4;
                html += `<i class="bi bi-tree-fill fs-terrain-tree" style="left:${x}%; top:${y}%; font-size:${size}em; color:${f.color}; opacity:${opacity};"></i>`;
            }
        });

        // D. 盆地边缘群山 (Mountains Generator)
        for(let i=0; i<20; i++) {
            let x = i * 5; // 沿北边分布
            let y = -2 + seededRandom(seed++) * 4;
            let size = 1.5 + seededRandom(seed++) * 1.5;
            html += `<i class="bi bi-triangle-fill fs-terrain-mountain" style="left:${x}%; top:${y}%; font-size:${size}em; opacity:0.4;"></i>`;
        }
        for(let i=0; i<10; i++) { // 东边缘
            html += `<i class="bi bi-triangle-fill fs-terrain-mountain" style="left:${95 + seededRandom(seed++)*5}%; top:${20 + i*6}%; font-size:${1.5 + seededRandom(seed++)}em; opacity:0.3;"></i>`;
        }
        for(let i=0; i<10; i++) { // 西边缘
            html += `<i class="bi bi-triangle-fill fs-terrain-mountain" style="left:${-2 + seededRandom(seed++)*5}%; top:${25 + i*6}%; font-size:${1.5 + seededRandom(seed++)}em; opacity:0.3;"></i>`;
        }

        return html;
    }

    // ==========================================
    // 3. 样式注入与 UI 渲染
    // ==========================================
    function injectFushanMapCSS() {
        const doc = global.document;
        if(doc.getElementById('fs-map-app-css')) return;
        const style = doc.createElement('style');
        style.id = 'fs-map-app-css';
        
        style.innerHTML = `
            #fs-map-modal { --fs-map-base-size: 14px; }
            .fs-map-layout { width: 100%; height: 100%; display: flex; overflow: hidden; background-color: #f3ead8; border-radius: 8px; position: relative; font-family: "STKaiti", "Kaiti", serif; }
            .fs-map-main { flex: 1; position: relative; background: #e8dac4; border-right: 2px solid #c29e70; overflow: hidden; }
            
            /* 盆地地势晕染：四周暗，中间亮，南侧开口 */
            .fs-map-bg {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background-image: 
                    radial-gradient(ellipse at 50% 50%, rgba(243, 234, 216, 0.9) 30%, rgba(168, 147, 121, 0.4) 80%, rgba(85, 107, 47, 0.3) 100%),
                    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
                background-size: 100% 100%, 30px 30px, 30px 30px;
                z-index: 0;
            }

            /* --- 地貌元素专属样式 --- */
            .fs-terrain-layer { position: absolute; top:0; left:0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
            .fs-terrain-tree { position: absolute; transform: translate(-50%, -100%); z-index: 2; pointer-events: none; text-shadow: 0 5px 5px rgba(0,0,0,0.2); }
            .fs-terrain-mountain { position: absolute; transform: translate(-50%, -100%) scaleY(1.2); color: #6b5c49; z-index: 1; pointer-events: none; }
            .fs-water-body {
                position: absolute; background: rgba(70, 130, 180, 0.4);
                border: 2px solid rgba(70, 130, 180, 0.6); box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
                display: flex; align-items: center; justify-content: center; z-index: 1; pointer-events: none;
            }
            .fs-water-body span { font-size: 10px; color: #1e3a8a; font-weight: bold; opacity: 0.7; }
            
            /* --- 交互地标样式 --- */
            .fs-map-pin {
                position: absolute; transform: translate(-50%, -50%);
                cursor: pointer; user-select: none; transition: transform 0.2s ease;
                display: flex; flex-direction: column; align-items: center; z-index: 10; color: #4a3d30;
            }
            .fs-map-pin i.bi {
                font-size: calc(var(--fs-map-base-size) * 1.5);
                background: #fdfbf7; border: 2px solid currentColor;
                border-radius: 50%; padding: 8px; width: 1.5em; height: 1.5em;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 4px 10px rgba(0,0,0,0.15); transition: 0.2s;
            }
            .fs-map-pin:hover { transform: translate(-50%, -50%) scale(1.15); z-index: 20; color: #b34233;}
            .fs-map-pin-name {
                font-size: calc(var(--fs-map-base-size) * 0.85); background: rgba(74, 61, 48, 0.85); color: #f3ead8;
                padding: 4px 8px; border-radius: 4px; margin-top: 6px; white-space: nowrap;
                letter-spacing: 1px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            
            /* --- 侧边卷宗与面板样式 --- */
            .fs-map-left-panel {
                position: absolute; top: 20px; left: 20px; bottom: 20px; width: 240px;
                background: rgba(243, 234, 216, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
                border: 1px solid #c29e70; border-radius: 8px; z-index: 30;
                display: flex; flex-direction: column; box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            }
            .fs-map-left-header {
                padding: 15px; border-bottom: 1px dashed #c29e70; color: #b34233; font-weight: bold;
                display: flex; justify-content: space-between; align-items: center; font-size: calc(var(--fs-map-base-size) * 1.1);
            }
            .fs-map-font-ctrl { display: flex; gap: 8px; }
            .fs-map-font-ctrl i { cursor: pointer; color: #4a3d30; transition: 0.2s; padding: 2px;}
            .fs-map-font-ctrl i:hover { color: #b34233; transform: scale(1.2); }
            .fs-map-left-content { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
            .fs-map-left-content::-webkit-scrollbar { width: 4px; }
            .fs-map-left-content::-webkit-scrollbar-thumb { background: rgba(194, 158, 112, 0.5); border-radius: 2px; }
            
            .fs-map-left-item {
                display: flex; align-items: center; gap: 10px; padding: 12px;
                background: #f8f2e6; border: 1px solid #e8dac4; border-radius: 6px; cursor: pointer;
                transition: 0.2s; font-size: var(--fs-map-base-size); color: #4a3d30;
            }
            .fs-map-left-item:hover { background: #c29e70; color: #fff; transform: translateX(4px); box-shadow: 0 2px 8px rgba(0,0,0,0.1);}
            
            .fs-map-side-panel {
                width: 0; background: #f9f8f4; transition: width 0.3s ease, right 0.3s ease;
                display: flex; flex-direction: column; position: relative;
                box-shadow: -5px 0 15px rgba(0,0,0,0.05); overflow-y: auto;
            }
            .fs-map-side-panel.open { width: 340px; border-left: 2px solid #c29e70; }
            
            .fs-map-close-btn {
                position: absolute; top: 15px; right: 15px; background: transparent; border: 1px solid #c29e70; border-radius: 50%; width: 28px; height: 28px;
                color: #4a3d30; cursor: pointer; transition: 0.2s; z-index: 50; display:flex; align-items:center; justify-content:center;
            }
            .fs-map-close-btn:hover { background: #b34233; color: #fff; border-color: #b34233; }
            
            .fs-map-detail-content { padding: 35px 25px; }
            .fs-loc-title { font-size: calc(var(--fs-map-base-size) * 1.5); font-weight: bold; color: #4a3d30; margin-bottom: 10px; border-bottom: 2px dashed #e8dac4; padding-bottom: 10px; display:flex; align-items:center; gap:8px;}
            .fs-loc-desc { font-size: var(--fs-map-base-size); color: #73675a; margin-bottom: 25px; line-height: 1.6; }
            
            .fs-scene-title { font-size: calc(var(--fs-map-base-size) * 1.1); color: #b34233; font-weight: bold; margin-bottom: 15px; }
            .fs-scene-list { display: flex; flex-direction: column; gap: 10px; }
            .fs-scene-item { display: flex; align-items: center; gap: 15px; padding: 12px; background: #f3ead8; border: 1px solid #e8dac4; border-radius: 6px; cursor: pointer; transition: 0.2s; }
            .fs-scene-item:hover { background: #e8dac4; border-color: #c29e70; transform: translateX(-4px); }
            .fs-scene-item i { font-size: calc(var(--fs-map-base-size) * 1.6); color: #b34233; }
            .fs-scene-name { font-size: var(--fs-map-base-size); font-weight: bold; color: #4a3d30; }
            
            .fs-map-go-btn {
                width: 100%; padding: 14px; margin-top: 20px; background: #4a3d30; color: #f3ead8;
                border: none; border-radius: 6px; font-size: calc(var(--fs-map-base-size) * 1.1); font-weight: bold;
                cursor: pointer; transition: 0.2s; letter-spacing: 2px;
            }
            .fs-map-go-btn:hover { background: #b34233; box-shadow: 0 4px 12px rgba(179,66,51,0.3); transform: translateY(-2px);}
            .fs-map-back-btn {
                width: 100%; padding: 14px; margin-top: 10px; background: transparent; color: #4a3d30;
                border: 1px solid #c29e70; border-radius: 6px; font-size: var(--fs-map-base-size); cursor: pointer; transition: 0.2s;
            }
            .fs-map-back-btn:hover { background: #e8dac4; }

            @media (max-width: 768px) {
                .fs-map-main { border-right: none; }
                .fs-map-pin { transform: translate(-50%, -50%) scale(0.85); }
                .fs-map-side-panel { position: absolute; top: 0; right: -100%; height: 100%; width: 85% !important; z-index: 999; box-shadow: -10px 0 30px rgba(0,0,0,0.3); }
                .fs-map-side-panel.open { right: 0; }
                .fs-map-left-panel { top: 10px; left: 10px; bottom: 10px; width: 200px; max-width: 50vw; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
                .fs-map-left-header { padding: 10px; }
                .fs-map-left-content { padding: 10px; }
            }
        `;
        doc.head.appendChild(style);
    }

    // --- 字号控制 ---
    global.fsChangeMapFontSize = function(delta) {
        global.fsMapFontSize += delta;
        if (global.fsMapFontSize < 10) global.fsMapFontSize = 10;
        if (global.fsMapFontSize > 22) global.fsMapFontSize = 22;
        const modal = global.document.getElementById('fs-map-modal');
        if (modal) modal.style.setProperty('--fs-map-base-size', global.fsMapFontSize + 'px');
    };

    // --- 主渲染 ---
    global.renderFushanMapApp = function(container) {
        if (!container) return;
        injectFushanMapCSS();

        let mapHtml = '<div class="fs-map-layout">';
        
        mapHtml += `
            <div class="fs-map-left-panel">
                <div class="fs-map-left-header">
                    <span><i class="bi bi-journal-text"></i> 卷宗/异闻</span>
                    <div class="fs-map-font-ctrl">
                        <i class="bi bi-dash-circle" onclick="window.fsChangeMapFontSize(-1)" title="缩小字号"></i>
                        <i class="bi bi-plus-circle" onclick="window.fsChangeMapFontSize(1)" title="放大字号"></i>
                    </div>
                </div>
                <div class="fs-map-left-content">
        `;
        if(global.fushanMapDatabase["未定之域"]) {
            global.fushanMapDatabase["未定之域"].forEach(loc => {
                let locStr = encodeURIComponent(JSON.stringify(loc));
                mapHtml += `
                    <div class="fs-map-left-item" onclick="window.fsOpenMapLocation('${locStr}')">
                        <i class="bi ${loc.icon}"></i> <span>${loc.name}</span>
                    </div>`;
            });
        }
        mapHtml += `</div></div>`; 

        mapHtml += '<div class="fs-map-main"><div class="fs-map-bg"></div>';
        
        // 【地貌生成植入】
        mapHtml += generateTerrainHTML();

        if(global.fushanMapDatabase["伏山盆地"]) {
            global.fushanMapDatabase["伏山盆地"].forEach(loc => {
                let locStr = encodeURIComponent(JSON.stringify(loc));
                mapHtml += `
                    <div class="fs-map-pin" style="top:${loc.coord.top}; left:${loc.coord.left};" onclick="window.fsOpenMapLocation('${locStr}')">
                        <i class="bi ${loc.icon}"></i>
                        <div class="fs-map-pin-name">${loc.name}</div>
                    </div>`;
            });
        }
        mapHtml += '</div>'; 

        mapHtml += `
            <div class="fs-map-side-panel" id="fs-map-side-panel">
                <button class="fs-map-close-btn" onclick="window.fsCloseMapSide()"><i class="bi bi-x-lg"></i></button>
                <div class="fs-map-detail-content" id="fs-map-side-content"></div>
            </div>`;
            
        mapHtml += '</div>';
        container.innerHTML = mapHtml;
        global.fsChangeMapFontSize(0);
    };

    global.fsOpenMapLocation = function(locStr) {
        let loc = JSON.parse(decodeURIComponent(locStr));
        global.currentFushanLoc = loc;

        let mHtml = `
            <div class="fs-loc-title"><i class="bi ${loc.icon}" style="color:#b34233;"></i> ${loc.name}</div>
            <div class="fs-loc-desc">${loc.desc}</div>
        `;

        if(loc.scenes && loc.scenes.length > 0) {
            mHtml += `<div class="fs-scene-title"><i class="bi bi-pin-map-fill"></i> 下属场景 / 设施</div><div class="fs-scene-list">`;
            loc.scenes.forEach(sc => {
                let scStr = encodeURIComponent(JSON.stringify(sc));
                mHtml += `
                <div class="fs-scene-item" onclick="window.fsOpenMapScene('${scStr}', '${loc.name}')">
                    <i class="bi ${sc.icon}"></i>
                    <div class="fs-scene-name">${sc.name}</div>
                </div>`;
            });
            mHtml += `</div>`;
        } else {
            mHtml += `<div style="text-align:center; color:#a89379; font-size:calc(var(--fs-map-base-size) * 0.9); margin-top:30px;">该区域暂无特定子场景。</div>`;
            mHtml += `<button class="fs-map-go-btn" onclick="window.fsSendAction('@@前往: ${loc.name}')">前往该区域探索 ▶</button>`;
        }

        let sideContent = global.document.getElementById('fs-map-side-content');
        let sidePanel = global.document.getElementById('fs-map-side-panel');
        if(sideContent) sideContent.innerHTML = mHtml;
        if(sidePanel) sidePanel.classList.add('open');
    };

    global.fsOpenMapScene = function(scStr, parentName) {
        let sc = JSON.parse(decodeURIComponent(scStr));

        let mHtml = `
            <div class="fs-loc-title"><i class="bi ${sc.icon}" style="color:#b34233;"></i> ${sc.name}</div>
            <div style="font-size:calc(var(--fs-map-base-size) * 0.9); color:#b34233; font-weight:bold; margin-bottom:15px;"><i class="bi bi-geo-alt"></i> 位于：${parentName}</div>
            <div class="fs-loc-desc">${sc.desc}</div>
            <button class="fs-map-go-btn" onclick="window.fsSendAction('@@前往: ${sc.name}')">进入该场景 ▶</button>
            <button class="fs-map-back-btn" onclick="window.fsOpenMapLocation('${encodeURIComponent(JSON.stringify(global.currentFushanLoc))}')">◀ 返回区域概览</button>
        `;
        let sideContent = global.document.getElementById('fs-map-side-content');
        if(sideContent) sideContent.innerHTML = mHtml;
    };

    global.fsCloseMapSide = function() {
        let sidePanel = global.document.getElementById('fs-map-side-panel');
        if(sidePanel) sidePanel.classList.remove('open');
    };

    global.fsSendAction = function(text) {
        if (typeof global.sendAction === 'function') {
            global.sendAction(text);
        } else if (typeof triggerSlash === 'function') {
            triggerSlash('/setinput ' + text);
        } else {
            prompt("请手动复制指令：", text);
        }
        global.fsCloseMapSide();
    };

})(window.parent || window);
