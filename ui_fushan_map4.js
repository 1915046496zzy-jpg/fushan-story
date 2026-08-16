// ====== ui_fushan_map.js (纯SVG手绘地貌 & 顶级UX交互版) ======

(function(global) {
    const doc = global.document;

    // 1. 强制注入 Bootstrap Icons 字体库
    if (!doc.querySelector('link[href*="bootstrap-icons"]')) {
        let link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
        doc.head.appendChild(link);
    }

    // 2. 伏山地图数据库
    global.fushanMapDatabase = {
        "伏山盆地": [
            { name: "伏山神祠建筑群", icon: "bi-bank2", coord: {top: "15%", left: "50%"}, desc: "伏山最高点，俯瞰全镇的核心信仰枢纽。", scenes: [{name: "神祠主殿", icon: "bi-house-heart", desc: "供奉伏山神明的核心大殿。"}, {name: "大祝宅邸", icon: "bi-house", desc: "主殿正北，历代大祝居所。"}, {name: "祭祀广场", icon: "bi-brightness-high", desc: "主殿正南，大型仪式举办地。"}, {name: "供品仓储区", icon: "bi-box-seam", desc: "位于东西两侧的物资库。"}, {name: "执事居所", icon: "bi-person-badge", desc: "神祠日常维护人员的住所。"}] },
            { name: "镇委行政区", icon: "bi-building", coord: {top: "28%", left: "48%"}, desc: "主峰南坡的世俗权力与管理中心。", scenes: [{name: "镇委大院与广播站", icon: "bi-megaphone", desc: "镇政府办公地及播音枢纽。"}, {name: "镇派出所", icon: "bi-shield-shaded", desc: "大院正西的治安机构。"}, {name: "伏山宗祠", icon: "bi-journal-bookmark-fill", desc: "大院偏东的家族议事厅。"}] },
            { name: "主峰自然基建", icon: "bi-tree", coord: {top: "18%", left: "30%"}, desc: "伏山背阴面与山腰的自然林地及基建设施。", scenes: [{name: "后山药林", icon: "bi-flower1", desc: "主峰背面，草药丛生。"}, {name: "祖坟山/乱葬岗", icon: "bi-moon-stars", desc: "背阴坡，阴气极重。"}, {name: "红砖水塔", icon: "bi-droplet-half", desc: "西侧山腰的供水设施。"}, {name: "移动信号塔", icon: "bi-broadcast", desc: "东侧半山腰的通讯基站。"}] },
            { name: "中心十字路口", icon: "bi-stoplights", coord: {top: "50%", left: "50%"}, desc: "连接伏山东南西北的交通枢纽。", scenes: [{name: "欣欣大超市", icon: "bi-cart", desc: "东北角的现代物资采购点。"}, {name: "邮政储蓄所", icon: "bi-bank", desc: "西北角的金融网点。"}, {name: "老槐树乘凉坪", icon: "bi-cup-hot", desc: "东南角，镇民聚集八卦之地。"}, {name: "镇中心公厕", icon: "bi-gender-ambiguous", desc: "乘凉坪向南50米。"}] },
            { name: "东部教育手工业区", icon: "bi-mortarboard", coord: {top: "48%", left: "75%"}, desc: "学校及传统作坊聚集地。", scenes: [{name: "中心小学 & 初高中", icon: "bi-book", desc: "沿镇东一街分布的教育片区。"}, {name: "陈家老豆腐坊", icon: "bi-shop", desc: "镇东二街中段的传统作坊。"}, {name: "孙记榨油坊", icon: "bi-droplet", desc: "豆腐坊斜对面。"}, {name: "伏山打米厂", icon: "bi-gear", desc: "梯田土路旁。"}, {name: "镇东屠宰场", icon: "bi-scissors", desc: "最边缘近山林处。"}] },
            { name: "东部边缘自然区", icon: "bi-triangle-half", coord: {top: "32%", left: "85%"}, desc: "半山腰的农业与废弃地带。", scenes: [{name: "伏山梯田", icon: "bi-layers", desc: "正东半山腰的层叠农田。"}, {name: "废旧变压器房", icon: "bi-lightning", desc: "东北方向的荒地，少有人至。"}] },
            { name: "西部老街区", icon: "bi-shop-window", coord: {top: "52%", left: "22%"}, desc: "充满烟火气与传统店铺的旧街。", scenes: [{name: "桥头菜市场", icon: "bi-basket", desc: "青石桥旁的早市。"}, {name: "胖子早餐 & 星岛奶茶", icon: "bi-cup-straw", desc: "老街东段的饮食店。"}, {name: "王记老茶馆", icon: "bi-cup", desc: "老街中段。"}, {name: "胖婶小卖部 & 德叔香烛", icon: "bi-bag", desc: "老街西段。"}, {name: "老赵打铁 & 老李木匠", icon: "bi-hammer", desc: "北一巷的手工业者。"}, {name: "李瞎子理发店", icon: "bi-scissors", desc: "老街尽头。"}] },
            { name: "西部边缘地带", icon: "bi-hospital", coord: {top: "38%", left: "10%"}, desc: "镇外偏僻的医疗与水源地。", scenes: [{name: "安康诊所", icon: "bi-capsule", desc: "老街尽头向西200米岔路口。"}, {name: "镇外水库", icon: "bi-water", desc: "西北方向2公里处山谷。"}] },
            { name: "南部洼地及出镇口", icon: "bi-bus-front", coord: {top: "78%", left: "50%"}, desc: "地势低洼，农资仓储与外界通道。", scenes: [{name: "农资仓库区", icon: "bi-truck", desc: "包含收购站、化肥库、五金店及兽医站。"}, {name: "伏山客运站", icon: "bi-bus-front", desc: "主街尽头，出镇公路入口。"}, {name: "废品回收站", icon: "bi-recycle", desc: "客运站向南100米路边。"}, {name: "农机站加油点", icon: "bi-fuel-pump", desc: "镇东南角。"}, {name: "刘婆婆家", icon: "bi-person-heart", desc: "镇南偏西居民巷，接生婆住处。"}] },
            { name: "镇外南郊", icon: "bi-sign-turn-right", coord: {top: "92%", left: "50%"}, desc: "唯一的出入通道及荒野。", scenes: [{name: "盘山公路", icon: "bi-signpost", desc: "正南方向，通往外界。"}, {name: "镇外野河塘", icon: "bi-water", desc: "正南方向1公里处。"}, {name: "镇南垃圾沟", icon: "bi-trash", desc: "正南方向2公里处。"}] }
        ],
        "未定之域": [
            { name: "林岁岁家", icon: "bi-house-dash", desc: "伏山脚下破旧房屋 (实装坐标待定)" },
            { name: "戏台搭建点", icon: "bi-stars", desc: "春祭期间在祭祀广场激活" }
        ]
    };

    global.currentFushanLoc = null;
    global.fsMapFontSize = 14; 

    // 3. 【绝对震撼】：纯手写 SVG 地貌渲染引擎 (无任何图片)
    function generateBespokeMapSVG() {
        return `
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;">
            <!-- 盆地等高线 (Topographic Basin) -->
            <path d="M 100,500 C 100,150 350,50 500,50 C 650,50 900,150 900,500 C 900,850 700,950 500,950 C 300,950 100,850 100,500 Z" fill="#eaddc5" stroke="#d4c1a7" stroke-width="3" stroke-dasharray="15 10"/>
            <path d="M 200,500 C 200,250 400,150 500,150 C 600,150 800,250 800,500 C 800,750 650,850 500,850 C 350,850 200,750 200,500 Z" fill="#e4d4b8" stroke="#d4c1a7" stroke-width="2" stroke-dasharray="8 6"/>
            <path d="M 300,500 C 300,350 430,250 500,250 C 570,250 700,350 700,500 C 700,650 600,750 500,750 C 400,750 300,650 300,500 Z" fill="#e1cdab" stroke="#c8b08f" stroke-width="1" opacity="0.6"/>
            <!-- 北部高地与连绵山脉 (Mountain Range) -->
            <path d="M 250,200 Q 300,100 350,180 T 450,90 T 550,160 T 650,110 T 750,190" fill="none" stroke="#9a8c78" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 280,200 Q 320,130 360,190 T 440,120 T 520,180 T 620,140 T 700,200" fill="none" stroke="#7a6d5c" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
            <path d="M 350,90 L 350,120 M 450,90 L 450,130 M 550,110 L 550,140 M 650,110 L 650,150" stroke="#9a8c78" stroke-width="2" stroke-linecap="round"/>
            <!-- 西北蜿蜒水系 (River System) -->
            <path d="M 50,250 Q 150,300 120,400 T 150,550 T 80,700" fill="none" stroke="#8caab5" stroke-width="12" stroke-linecap="round" opacity="0.4"/>
            <path d="M 60,260 Q 140,300 120,400 T 150,550 T 90,690" fill="none" stroke="#7598a6" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
            <!-- 东部梯田纹理 (Terraced Fields) -->
            <path d="M 750,300 Q 800,320 850,300 M 760,320 Q 820,340 860,310 M 780,340 Q 830,360 880,330" fill="none" stroke="#a39679" stroke-width="2" opacity="0.6"/>
            <!-- 南部荒野与出镇口 (Southern Exit) -->
            <path d="M 450,950 L 450,1000 M 550,950 L 550,1000" stroke="#c8b08f" stroke-width="4" stroke-dasharray="8 4"/>
        </svg>
        `;
    }

    // 4. 全局 CSS 注入 (优化布局与弹窗UX)
    function injectFushanMapCSS() {
        if(doc.getElementById('fs-map-app-css')) return;
        const style = doc.createElement('style');
        style.id = 'fs-map-app-css';
        style.innerHTML = `
            #fs-map-inner-box { --fs-map-base-size: 14px; }
            
            .fs-map-layout { width: 100%; height: 100%; position: relative; font-family: "STKaiti", "Kaiti", serif; overflow: hidden; border-radius: 8px; background: #e5d8c1;}
            
            .fs-map-main { width: 100%; height: 100%; position: absolute; top:0; left:0; background: #eedfc7; overflow: hidden; }
            .fs-map-bg {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #eedfc7;
                background-image: 
                    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 2px, transparent 2px, transparent 5px);
                z-index: 0;
            }
            
            /* 👑 【神级交互 1】：左上角浮动按钮 */
            .fs-map-toggle-btn {
                position: absolute; top: 20px; left: 20px; z-index: 40;
                background: #fdfbf7; border: 2px solid #c29e70; border-radius: 8px;
                padding: 10px 16px; cursor: pointer; color: #4a3d30; font-weight: bold;
                display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);
                font-size: calc(var(--fs-map-base-size) * 1.1); transition: 0.2s;
            }
            .fs-map-toggle-btn:hover { background: #b34233; color: #fff; border-color: #b34233; transform: translateY(-2px); }

            /* 👑 【神级交互 2】：完全隐藏/滑出的侧边栏 (无关闭按钮) */
            .fs-map-left-sidebar {
                position: absolute; top: 0; left: -320px; width: 300px; height: 100%;
                background: rgba(253, 251, 247, 0.95); backdrop-filter: blur(10px);
                border-right: 2px solid #c29e70; z-index: 50; display: flex; flex-direction: column;
                box-shadow: 5px 0 30px rgba(0,0,0,0.2); transition: left 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .fs-map-left-sidebar.open { left: 0; }

            .fs-left-header {
                padding: 25px 20px; border-bottom: 1px dashed #c29e70; color: #b34233; font-weight: bold;
                font-size: calc(var(--fs-map-base-size) * 1.3); background: rgba(243, 234, 216, 0.5);
                text-align: center; letter-spacing: 2px;
            }

            .fs-map-font-ctrl { 
                display: flex; align-items: center; gap: 15px; margin: 20px; padding: 12px; 
                background: #e8dac4; border-radius: 8px; border: 1px solid #d4c1a7;
            }
            .fs-font-btn { cursor: pointer; color: #4a3d30; font-size: 20px; background: #fdfbf7; padding: 4px 12px; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: 0.2s;}
            .fs-font-btn:hover { background: #b34233; color: #fff; transform: scale(1.1);}
            .fs-font-label { flex: 1; text-align: center; font-size: 14px; font-weight: bold; color: #73675a; }

            .fs-left-content { flex: 1; overflow-y: auto; padding: 10px 20px; display: flex; flex-direction: column; gap: 12px; }
            .fs-left-item {
                display: flex; align-items: center; gap: 12px; padding: 14px; background: #fdfbf7;
                border: 1px solid #c29e70; border-radius: 6px; cursor: pointer; transition: 0.2s;
                font-size: var(--fs-map-base-size); color: #4a3d30; font-weight: bold;
            }
            .fs-left-item:hover { background: #c29e70; color: #fff; transform: translateX(5px); box-shadow: 0 4px 10px rgba(194, 158, 112, 0.3);}

            /* 精致的图钉圆章 */
            .fs-map-pin {
                position: absolute; transform: translate(-50%, -50%); cursor: pointer; user-select: none;
                transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; flex-direction: column; align-items: center; z-index: 10; color: #2c241b;
            }
            .fs-map-pin i.bi {
                font-size: calc(var(--fs-map-base-size) * 1.5); background: #fdfbf7; border: 2px solid currentColor;
                border-radius: 50%; padding: 8px; width: 1.6em; height: 1.6em; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 5px 15px rgba(0,0,0,0.25); transition: 0.2s;
            }
            .fs-map-pin:hover { transform: translate(-50%, -50%) scale(1.2); z-index: 20; color: #b34233;}
            .fs-map-pin-name {
                font-size: calc(var(--fs-map-base-size) * 0.9); background: rgba(44, 36, 27, 0.85); color: #fdfbf7;
                padding: 5px 10px; border-radius: 4px; margin-top: 8px; white-space: nowrap; letter-spacing: 1px; box-shadow: 0 2px 5px rgba(0,0,0,0.3); font-weight: bold;
            }
            
            /* 右侧详情抽屉 */
            .fs-map-side-panel {
                position: absolute; top: 0; right: -400px; width: 360px; height: 100%;
                background: #fdfbf7; transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                display: flex; flex-direction: column; box-shadow: -5px 0 30px rgba(0,0,0,0.2); z-index: 40; border-left: 2px solid #c29e70;
            }
            .fs-map-side-panel.open { right: 0; }
            .fs-map-close-btn {
                position: absolute; top: 15px; right: 15px; background: transparent; border: 1px solid #c29e70; border-radius: 50%;
                width: 32px; height: 32px; color: #4a3d30; cursor: pointer; transition: 0.2s; z-index: 50; display:flex; align-items:center; justify-content:center;
            }
            .fs-map-close-btn:hover { background: #b34233; color: #fff; border-color: #b34233; transform: rotate(90deg); }
            .fs-map-detail-content { padding: 35px 25px; overflow-y: auto;}
            
            .fs-loc-title { font-size: calc(var(--fs-map-base-size) * 1.6); font-weight: bold; color: #4a3d30; margin-bottom: 10px; border-bottom: 2px dashed #e8dac4; padding-bottom: 10px; display:flex; align-items:center; gap:8px;}
            .fs-loc-desc { font-size: var(--fs-map-base-size); color: #73675a; margin-bottom: 25px; line-height: 1.6; }
            
            .fs-scene-title { font-size: calc(var(--fs-map-base-size) * 1.1); color: #b34233; font-weight: bold; margin-bottom: 15px; }
            .fs-scene-list { display: flex; flex-direction: column; gap: 10px; }
            .fs-scene-item {
                display: flex; align-items: center; gap: 15px; padding: 12px; background: #f3ead8; border: 1px solid #e8dac4; border-radius: 6px;
                cursor: pointer; transition: 0.2s;
            }
            .fs-scene-item:hover { background: #e8dac4; border-color: #c29e70; transform: translateX(-4px); }
            .fs-scene-item i { font-size: calc(var(--fs-map-base-size) * 1.8); color: #b34233; }
            .fs-scene-name { font-size: var(--fs-map-base-size); font-weight: bold; color: #4a3d30; }
            
            .fs-map-go-btn {
                width: 100%; padding: 16px; margin-top: 20px; background: #2c241b; color: #fdfbf7;
                border: none; border-radius: 6px; font-size: calc(var(--fs-map-base-size) * 1.1); font-weight: bold;
                cursor: pointer; transition: 0.2s; letter-spacing: 2px;
            }
            .fs-map-go-btn:hover { background: #b34233; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(179,66,51,0.3);}
            .fs-map-back-btn { width: 100%; padding: 14px; margin-top: 10px; background: transparent; color: #4a3d30; border: 1px solid #c29e70; border-radius: 6px; font-size: var(--fs-map-base-size); cursor: pointer; transition: 0.2s;}
            .fs-map-back-btn:hover { background: #e8dac4; }

            @media (max-width: 768px) {
                .fs-map-side-panel { width: 85%; right: -100%; }
                .fs-map-left-sidebar { width: 80%; left: -100%; }
                .fs-map-pin { transform: translate(-50%, -50%) scale(0.85); }
                .fs-map-toggle-btn { top: 15px; left: 15px; padding: 8px 12px; font-size: 14px; }
            }
        `;
        doc.head.appendChild(style);
    }

    // 5. 【修复字号控制器】通过全局顶层设置生效
    global.fsChangeMapFontSize = function(delta) {
        global.fsMapFontSize += delta;
        if (global.fsMapFontSize < 10) global.fsMapFontSize = 10;
        if (global.fsMapFontSize > 24) global.fsMapFontSize = 24;
        
        // 精准绑定到地图内盒
        const innerBox = doc.getElementById('fs-map-inner-box');
        if (innerBox) {
            innerBox.style.setProperty('--fs-map-base-size', global.fsMapFontSize + 'px');
        }
    };

    // 6. 核心渲染与【事件代理】
    global.renderFushanMapApp = function(container) {
        if (!container) return;
        injectFushanMapCSS();

        let mapHtml = '<div class="fs-map-layout" id="fs-map-root">';
        
        // A. 主地图区 & 极简呼出按钮
        mapHtml += '<div class="fs-map-main" id="fs-map-main-area"><div class="fs-map-bg"></div>';
        mapHtml += generateBespokeMapSVG(); // 注入手绘山脉河流 SVG
        
        mapHtml += `<div class="fs-map-toggle-btn fs-action-toggle-left"><i class="bi bi-list"></i> 卷宗与设定</div>`;
        
        if(global.fushanMapDatabase["伏山盆地"]) {
            global.fushanMapDatabase["伏山盆地"].forEach((loc, idx) => {
                mapHtml += `
                    <div class="fs-map-pin fs-action-open-loc" data-type="main" data-idx="${idx}" style="top:${loc.coord.top}; left:${loc.coord.left};">
                        <i class="bi ${loc.icon}"></i><div class="fs-map-pin-name">${loc.name}</div>
                    </div>`;
            });
        }
        mapHtml += '</div>';

        // B. 左侧彻底折叠的侧边栏 (无关闭按钮)
        mapHtml += `
            <div class="fs-map-left-sidebar" id="fs-map-left-panel">
                <div class="fs-left-header">伏山异闻录</div>
                <div class="fs-map-font-ctrl">
                    <div class="fs-font-btn fs-action-font" data-delta="-1"><i class="bi bi-dash"></i></div>
                    <div class="fs-font-label">排版大小调节</div>
                    <div class="fs-font-btn fs-action-font" data-delta="1"><i class="bi bi-plus"></i></div>
                </div>
                <div class="fs-left-content">
        `;
        if(global.fushanMapDatabase["未定之域"]) {
            global.fushanMapDatabase["未定之域"].forEach((loc, idx) => {
                mapHtml += `
                    <div class="fs-left-item fs-action-open-loc" data-type="special" data-idx="${idx}">
                        <i class="bi ${loc.icon}"></i> <span>${loc.name}</span>
                    </div>`;
            });
        }
        mapHtml += `</div></div>`;

        // C. 右侧详情抽屉
        mapHtml += `
            <div class="fs-map-side-panel" id="fs-map-side-panel">
                <button class="fs-map-close-btn fs-action-close-right"><i class="bi bi-x-lg"></i></button>
                <div class="fs-map-detail-content" id="fs-map-side-content"></div>
            </div>`;
            
        mapHtml += '</div>';
        container.innerHTML = mapHtml;
        
        global.fsChangeMapFontSize(0);

        // 7. 【究极事件代理】完全规避 DOMPurify 净化，杜绝点击失效
        const rootLayout = doc.getElementById('fs-map-root');
        if (rootLayout) {
            rootLayout.addEventListener('click', function(e) {
                // 展开侧边栏
                if (e.target.closest('.fs-action-toggle-left')) {
                    doc.getElementById('fs-map-left-panel').classList.add('open');
                    e.stopPropagation();
                    return;
                }
                
                // 点击地图主区域时，自动收起左侧边栏 (完美 UX)
                if (e.target.closest('#fs-map-main-area') && !e.target.closest('.fs-action-toggle-left')) {
                    doc.getElementById('fs-map-left-panel').classList.remove('open');
                }

                // 关闭右侧栏
                if (e.target.closest('.fs-action-close-right')) {
                    doc.getElementById('fs-map-side-panel').classList.remove('open');
                }
                
                // 字号加减
                let fontBtn = e.target.closest('.fs-action-font');
                if (fontBtn) {
                    let delta = parseInt(fontBtn.dataset.delta);
                    global.fsChangeMapFontSize(delta);
                }
                
                // 打开区域节点
                let locBtn = e.target.closest('.fs-action-open-loc');
                if (locBtn) {
                    let type = locBtn.dataset.type;
                    let idx = parseInt(locBtn.dataset.idx);
                    let arr = type === 'main' ? global.fushanMapDatabase["伏山盆地"] : global.fushanMapDatabase["未定之域"];
                    openMapLocationUI(arr[idx]);
                    // 如果是在左侧栏点击的，自动收起左侧栏
                    if(type === 'special') doc.getElementById('fs-map-left-panel').classList.remove('open');
                }
                
                // 打开子场景
                let sceneBtn = e.target.closest('.fs-action-open-scene');
                if (sceneBtn) {
                    let scIdx = parseInt(sceneBtn.dataset.scIdx);
                    openMapSceneUI(global.currentFushanLoc.scenes[scIdx], global.currentFushanLoc.name);
                }
                
                // 触发前往指令
                let goBtn = e.target.closest('.fs-action-go');
                if (goBtn) {
                    triggerGoAction(goBtn.dataset.target);
                }
                
                // 返回概览
                if (e.target.closest('.fs-action-back')) {
                    openMapLocationUI(global.currentFushanLoc);
                }
            });
        }
    };

    // 内部 UI 渲染管线
    function openMapLocationUI(loc) {
        global.currentFushanLoc = loc;
        let mHtml = `<div class="fs-loc-title"><i class="bi ${loc.icon}" style="color:#b34233;"></i> ${loc.name}</div><div class="fs-loc-desc">${loc.desc}</div>`;
        if(loc.scenes && loc.scenes.length > 0) {
            mHtml += `<div class="fs-scene-title"><i class="bi bi-pin-map-fill"></i> 下属场景 / 设施</div><div class="fs-scene-list">`;
            loc.scenes.forEach((sc, idx) => {
                mHtml += `<div class="fs-scene-item fs-action-open-scene" data-sc-idx="${idx}"><i class="bi ${sc.icon}"></i><div class="fs-scene-name">${sc.name}</div></div>`;
            });
            mHtml += `</div>`;
        } else {
            mHtml += `<div style="text-align:center; color:#a89379; margin-top:30px; font-size:calc(var(--fs-map-base-size)*0.9);">该区域暂无特定子场景。</div>`;
            mHtml += `<button class="fs-map-go-btn fs-action-go" data-target="${loc.name}">前往该区域探索 ▶</button>`;
        }
        let sideContent = doc.getElementById('fs-map-side-content');
        let sidePanel = doc.getElementById('fs-map-side-panel');
        if(sideContent) sideContent.innerHTML = mHtml;
        if(sidePanel) sidePanel.classList.add('open');
    }

    function openMapSceneUI(sc, parentName) {
        let mHtml = `
            <div class="fs-loc-title"><i class="bi ${sc.icon}" style="color:#b34233;"></i> ${sc.name}</div>
            <div style="color:#b34233; font-weight:bold; margin-bottom:15px; font-size:calc(var(--fs-map-base-size)*0.9);"><i class="bi bi-geo-alt"></i> 位于：${parentName}</div>
            <div class="fs-loc-desc">${sc.desc}</div>
            <button class="fs-map-go-btn fs-action-go" data-target="${sc.name}">进入该场景 ▶</button>
            <button class="fs-map-back-btn fs-action-back">◀ 返回区域概览</button>
        `;
        let sideContent = doc.getElementById('fs-map-side-content');
        if(sideContent) sideContent.innerHTML = mHtml;
    }

    function triggerGoAction(name) {
        let text = '@@前往: ' + name;
        if (typeof global.sendAction === 'function') {
            global.sendAction(text);
        } else if (typeof triggerSlash === 'function') {
            triggerSlash('/setinput ' + text);
        } else {
            prompt("请手动复制指令：", text);
        }
        doc.getElementById('fs-map-side-panel').classList.remove('open');
    }

})(window.parent || window);
