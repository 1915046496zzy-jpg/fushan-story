// ====== ui_fushan_map.js (三端自适应完美版) ======

(function(global) {
    global.fushanMapDatabase = {
        "伏山盆地": [
            { 
                name: "伏山神祠建筑群", emoji: "⛩️", coord: {top: "12%", left: "50%"}, desc: "伏山最高点，俯瞰全镇的核心信仰枢纽。", 
                scenes: [
                    {name: "神祠主殿", emoji: "🏛️", desc: "供奉伏山神明的核心大殿。"},
                    {name: "大祝宅邸", emoji: "🏮", desc: "主殿正北，历代大祝居所。"},
                    {name: "祭祀广场", emoji: "🪨", desc: "主殿正南，大型仪式举办地。"},
                    {name: "供品仓储区", emoji: "📦", desc: "位于东西两侧的物资库。"},
                    {name: "执事居所", emoji: "🛖", desc: "神祠日常维护人员的住所。"}
                ]
            },
            {
                name: "镇委行政区", emoji: "🏢", coord: {top: "25%", left: "48%"}, desc: "主峰南坡的世俗权力与管理中心。",
                scenes: [
                    {name: "镇委大院与广播站", emoji: "📢", desc: "镇政府办公地及播音枢纽。"},
                    {name: "镇派出所", emoji: "🚓", desc: "大院正西的治安机构。"},
                    {name: "伏山宗祠", emoji: "📜", desc: "大院偏东的家族议事厅。"}
                ]
            },
            {
                name: "主峰自然基建", emoji: "🌲", coord: {top: "15%", left: "32%"}, desc: "伏山背阴面与山腰的自然林地及基建设施。",
                scenes: [
                    {name: "后山药林", emoji: "🌿", desc: "主峰背面，草药丛生。"},
                    {name: "祖坟山/乱葬岗", emoji: "🪦", desc: "背阴坡，阴气极重。"},
                    {name: "红砖水塔", emoji: "🗼", desc: "西侧山腰的供水设施。"},
                    {name: "移动信号塔", emoji: "📡", desc: "东侧半山腰的通讯基站。"}
                ]
            },
            {
                name: "中心十字路口", emoji: "🚥", coord: {top: "45%", left: "50%"}, desc: "连接伏山东南西北的交通枢纽。",
                scenes: [
                    {name: "欣欣大超市", emoji: "🛒", desc: "东北角的现代物资采购点。"},
                    {name: "邮政储蓄所", emoji: "🏦", desc: "西北角的金融网点。"},
                    {name: "老槐树乘凉坪", emoji: "🌳", desc: "东南角，镇民聚集八卦之地。"},
                    {name: "镇中心公厕", emoji: "🚾", desc: "乘凉坪向南50米。"}
                ]
            },
            {
                name: "东部教育手工业区", emoji: "🏫", coord: {top: "45%", left: "75%"}, desc: "学校及传统作坊聚集地。",
                scenes: [
                    {name: "中心小学 & 初高中", emoji: "📚", desc: "沿镇东一街分布的教育片区。"},
                    {name: "陈家老豆腐坊", emoji: "🥣", desc: "镇东二街中段的传统作坊。"},
                    {name: "孙记榨油坊", emoji: "🛢️", desc: "豆腐坊斜对面。"},
                    {name: "伏山打米厂", emoji: "🌾", desc: "梯田土路旁。"},
                    {name: "镇东屠宰场", emoji: "🔪", desc: "最边缘近山林处。"}
                ]
            },
            {
                name: "东部边缘自然区", emoji: "⛰️", coord: {top: "30%", left: "85%"}, desc: "半山腰的农业与废弃地带。",
                scenes: [
                    {name: "伏山梯田", emoji: "🏞️", desc: "正东半山腰的层叠农田。"},
                    {name: "废旧变压器房", emoji: "⚡", desc: "东北方向的荒地，少有人至。"}
                ]
            },
            {
                name: "西部老街区", emoji: "🏘️", coord: {top: "48%", left: "22%"}, desc: "充满烟火气与传统店铺的旧街。",
                scenes: [
                    {name: "桥头菜市场", emoji: "🥬", desc: "青石桥旁的早市。"},
                    {name: "胖子早餐 & 星岛奶茶", emoji: "🥟", desc: "老街东段的饮食店。"},
                    {name: "王记老茶馆", emoji: "🍵", desc: "老街中段。"},
                    {name: "胖婶小卖部 & 德叔香烛", emoji: "🕯️", desc: "老街西段。"},
                    {name: "老赵打铁 & 老李木匠", emoji: "⚒️", desc: "北一巷的手工业者。"},
                    {name: "李瞎子理发店", emoji: "✂️", desc: "老街尽头。"}
                ]
            },
            {
                name: "西部边缘地带", emoji: "🏥", coord: {top: "35%", left: "10%"}, desc: "镇外偏僻的医疗与水源地。",
                scenes: [
                    {name: "安康诊所", emoji: "🩺", desc: "老街尽头向西200米岔路口。"},
                    {name: "镇外水库", emoji: "💧", desc: "西北方向2公里处山谷。"}
                ]
            },
            {
                name: "南部洼地及出镇口", emoji: "🚌", coord: {top: "75%", left: "50%"}, desc: "地势低洼，农资仓储与外界通道。",
                scenes: [
                    {name: "农资仓库区", emoji: "🚜", desc: "包含收购站、化肥库、五金店及兽医站。"},
                    {name: "伏山客运站", emoji: "🚏", desc: "主街尽头，出镇公路入口。"},
                    {name: "废品回收站", emoji: "♻️", desc: "客运站向南100米路边。"},
                    {name: "农机站加油点", emoji: "⛽", desc: "镇东南角。"},
                    {name: "刘婆婆家", emoji: "👵", desc: "镇南偏西居民巷，接生婆住处。"}
                ]
            },
            {
                name: "镇外南郊", emoji: "🛣️", coord: {top: "92%", left: "50%"}, desc: "唯一的出入通道及荒野。",
                scenes: [
                    {name: "盘山公路", emoji: "🛤️", desc: "正南方向，通往外界。"},
                    {name: "镇外野河塘", emoji: "🎣", desc: "正南方向1公里处。"},
                    {name: "镇南垃圾沟", emoji: "🗑️", desc: "正南方向2公里处。"}
                ]
            }
        ],
        "未定之域": [
            { name: "林岁岁家", emoji: "🏚️", desc: "伏山脚下破旧房屋 (实装坐标待定)" },
            { name: "戏台搭建点", emoji: "🎭", desc: "春祭期间在祭祀广场激活" }
        ]
    };

    global.currentFushanLoc = null;

    function injectFushanMapCSS() {
        const doc = global.document;
        if(doc.getElementById('fs-map-app-css')) return;
        const style = doc.createElement('style');
        style.id = 'fs-map-app-css';
        
        // 【核心】注入了移动端 @media 响应式查询
        style.innerHTML = `
            .fs-map-layout {
                width: 100%; height: 100%; display: flex; flex-direction: row;
                font-family: "STKaiti", "Kaiti", serif; overflow: hidden;
                background-color: #f3ead8; border-radius: 8px; position: relative;
            }
            .fs-map-main {
                flex: 1; position: relative; background: #e8dac4;
                border-right: 2px solid #c29e70; overflow: hidden;
            }
            .fs-map-bg {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background-image: 
                    radial-gradient(circle at 50% 12%, rgba(179, 66, 51, 0.05) 0%, transparent 40%),
                    radial-gradient(circle at 50% 50%, rgba(194, 158, 112, 0.05) 0%, transparent 60%);
            }
            .fs-map-pin {
                position: absolute; transform: translate(-50%, -50%);
                font-size: 24px; cursor: pointer; user-select: none;
                text-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.2s ease;
                display: flex; flex-direction: column; align-items: center; z-index: 10;
            }
            .fs-map-pin:hover { transform: translate(-50%, -50%) scale(1.3); z-index: 20; }
            .fs-map-pin-name {
                font-size: 11px; background: rgba(74, 61, 48, 0.85); color: #f3ead8;
                padding: 2px 6px; border-radius: 4px; margin-top: 4px; white-space: nowrap;
                letter-spacing: 1px;
            }
            
            .fs-map-side-panel {
                width: 0; background: #f9f8f4; transition: width 0.3s ease, right 0.3s ease;
                display: flex; flex-direction: column; position: relative;
                box-shadow: -5px 0 15px rgba(0,0,0,0.05); overflow-y: auto;
            }
            .fs-map-side-panel.open { width: 340px; border-left: 2px solid #c29e70; }
            
            .fs-map-close-btn {
                position: absolute; top: 15px; right: 15px; background: transparent;
                border: 1px solid #c29e70; border-radius: 50%; width: 28px; height: 28px;
                color: #4a3d30; cursor: pointer; transition: 0.2s; z-index: 50;
            }
            .fs-map-close-btn:hover { background: #b34233; color: #fff; border-color: #b34233; }
            
            .fs-map-detail-content { padding: 35px 25px; }
            .fs-loc-title { font-size: 22px; font-weight: bold; color: #4a3d30; margin-bottom: 10px; border-bottom: 2px dashed #e8dac4; padding-bottom: 10px;}
            .fs-loc-desc { font-size: 14px; color: #73675a; margin-bottom: 25px; line-height: 1.6; }
            
            .fs-scene-title { font-size: 15px; color: #b34233; font-weight: bold; margin-bottom: 15px; }
            .fs-scene-list { display: flex; flex-direction: column; gap: 10px; }
            .fs-scene-item {
                display: flex; align-items: center; gap: 15px; padding: 12px;
                background: #f3ead8; border: 1px solid #e8dac4; border-radius: 6px;
                cursor: pointer; transition: 0.2s;
            }
            .fs-scene-item:hover { background: #e8dac4; border-color: #c29e70; transform: translateX(-4px); }
            
            .fs-map-go-btn {
                width: 100%; padding: 14px; margin-top: 20px; background: #4a3d30; color: #f3ead8;
                border: none; border-radius: 6px; font-size: 15px; font-weight: bold;
                cursor: pointer; transition: 0.2s; letter-spacing: 2px;
            }
            .fs-map-go-btn:hover { background: #b34233; box-shadow: 0 4px 12px rgba(179,66,51,0.3); }
            .fs-map-back-btn {
                width: 100%; padding: 14px; margin-top: 10px; background: transparent; color: #4a3d30;
                border: 1px solid #c29e70; border-radius: 6px; font-size: 14px;
                cursor: pointer; transition: 0.2s;
            }
            .fs-map-back-btn:hover { background: #e8dac4; }

            .fs-map-floating-menu {
                position: absolute; bottom: 20px; left: 20px; background: rgba(243, 234, 216, 0.9);
                border: 1px solid #c29e70; padding: 15px; border-radius: 8px; z-index: 10;
                backdrop-filter: blur(5px);
            }
            .fs-map-floating-menu-title { font-size: 14px; font-weight: bold; color: #b34233; margin-bottom: 10px; }
            .fs-map-floating-item { font-size: 13px; color: #4a3d30; padding: 6px 0; cursor: pointer; border-bottom: 1px dashed #e8dac4; }
            .fs-map-floating-item:last-child { border: none; padding-bottom: 0; }
            .fs-map-floating-item:hover { color: #b34233; }

            /* ================================================== */
            /* 📱 移动端与平板专属响应式优化 (Responsive Design)  */
            /* ================================================== */
            @media (max-width: 768px) {
                .fs-map-main { border-right: none; }
                
                /* 手机端地标适当缩小，防止相互遮挡挤压 */
                .fs-map-pin { font-size: 20px; transform: translate(-50%, -50%) scale(0.9); }
                .fs-map-pin-name { font-size: 10px; padding: 2px 4px; }
                
                /* 手机端详情面板变为悬浮抽屉覆盖模式 */
                .fs-map-side-panel {
                    position: absolute; top: 0; right: -100%; height: 100%;
                    width: 85% !important; z-index: 999;
                    box-shadow: -10px 0 30px rgba(0,0,0,0.3);
                }
                .fs-map-side-panel.open { right: 0; }
                
                /* 手机端左下角菜单缩小 */
                .fs-map-floating-menu { bottom: 10px; left: 10px; padding: 10px; }
                .fs-map-floating-menu-title { font-size: 12px; margin-bottom: 6px;}
                .fs-map-floating-item { font-size: 11px; padding: 4px 0;}
            }
        `;
        doc.head.appendChild(style);
    }

    global.renderFushanMapApp = function(container) {
        if (!container) return;
        injectFushanMapCSS();

        let mapHtml = '<div class="fs-map-layout">';
        mapHtml += '<div class="fs-map-main"><div class="fs-map-bg"></div>';
        
        if(global.fushanMapDatabase["伏山盆地"]) {
            global.fushanMapDatabase["伏山盆地"].forEach(loc => {
                let locStr = encodeURIComponent(JSON.stringify(loc));
                mapHtml += `
                    <div class="fs-map-pin" style="top:${loc.coord.top}; left:${loc.coord.left};" onclick="window.fsOpenMapLocation('${locStr}')">
                        <div>${loc.emoji}</div>
                        <div class="fs-map-pin-name">${loc.name}</div>
                    </div>`;
            });
        }
        
        mapHtml += '<div class="fs-map-floating-menu">';
        mapHtml += '<div class="fs-map-floating-menu-title">卷宗 / 异闻录</div>';
        if(global.fushanMapDatabase["未定之域"]) {
            global.fushanMapDatabase["未定之域"].forEach(loc => {
                let locStr = encodeURIComponent(JSON.stringify(loc));
                mapHtml += `<div class="fs-map-floating-item" onclick="window.fsOpenMapLocation('${locStr}')">${loc.emoji} ${loc.name}</div>`;
            });
        }
        mapHtml += '</div></div>'; 

        mapHtml += `
            <div class="fs-map-side-panel" id="fs-map-side-panel">
                <button class="fs-map-close-btn" onclick="window.fsCloseMapSide()">✕</button>
                <div class="fs-map-detail-content" id="fs-map-side-content"></div>
            </div>`;
            
        mapHtml += '</div>';
        container.innerHTML = mapHtml;
    };

    global.fsOpenMapLocation = function(locStr) {
        let loc = JSON.parse(decodeURIComponent(locStr));
        global.currentFushanLoc = loc;

        let mHtml = `
            <div class="fs-loc-title">${loc.emoji} ${loc.name}</div>
            <div class="fs-loc-desc">${loc.desc}</div>
        `;

        if(loc.scenes && loc.scenes.length > 0) {
            mHtml += `<div class="fs-scene-title">📍 下属场景 / 设施</div><div class="fs-scene-list">`;
            loc.scenes.forEach(sc => {
                let scStr = encodeURIComponent(JSON.stringify(sc));
                mHtml += `
                <div class="fs-scene-item" onclick="window.fsOpenMapScene('${scStr}', '${loc.name}')">
                    <div style="font-size:26px;">${sc.emoji}</div>
                    <div style="font-size:15px; font-weight:bold; color:#4a3d30;">${sc.name}</div>
                </div>`;
            });
            mHtml += `</div>`;
        } else {
            mHtml += `<div style="text-align:center; color:#a89379; font-size:14px; margin-top:30px;">该区域暂无特定子场景。</div>`;
            mHtml += `<button class="fs-map-go-btn" onclick="window.fsSendAction('前往探索：${loc.name}')">前往该区域探索 ▶</button>`;
        }

        let sideContent = global.document.getElementById('fs-map-side-content');
        let sidePanel = global.document.getElementById('fs-map-side-panel');
        if(sideContent) sideContent.innerHTML = mHtml;
        if(sidePanel) sidePanel.classList.add('open');
    };

    global.fsOpenMapScene = function(scStr, parentName) {
        let sc = JSON.parse(decodeURIComponent(scStr));

        let mHtml = `
            <div class="fs-loc-title">${sc.emoji} ${sc.name}</div>
            <div style="font-size:13px; color:#b34233; font-weight:bold; margin-bottom:15px;">位于：${parentName}</div>
            <div class="fs-loc-desc">${sc.desc}</div>
            <button class="fs-map-go-btn" onclick="window.fsSendAction('前往场景：${sc.name}')">进入该场景 ▶</button>
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
        if (typeof triggerSlash === 'function') {
            triggerSlash('/setinput ' + text);
        } else {
            console.log("【指令触发】", text);
        }
        global.fsCloseMapSide();
    };

})(window.parent || window);
