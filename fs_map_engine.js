/**
 * 伏山纪事 - 交互式堪舆图引擎 (突破沙盒版)
 */
(function(global) {
    if (global.FS_MapEngine) return;

    const doc = global.document; // 强制获取主窗口的 Document

    const MAP_DATA = {
        north: {
            name: "北部高地", color: "var(--fs-dialogue, #b34233)",
            nodes: [
                { name: "伏山神祠主殿", x: 50, y: 8, desc: "最高点，俯瞰全镇" },
                { name: "大祝宅邸", x: 50, y: 3, desc: "主殿正北" },
                { name: "祭祀广场", x: 50, y: 13, desc: "主殿正南" },
                { name: "供品仓储区", x: 44, y: 10, desc: "主殿西侧" },
                { name: "供品仓储区", x: 56, y: 10, desc: "主殿东侧" },
                { name: "执事居所", x: 38, y: 10, desc: "仓储区外侧" },
                { name: "镇委大院/广播站", x: 50, y: 25, desc: "主峰南坡" },
                { name: "镇派出所", x: 43, y: 25, desc: "大院正西" },
                { name: "伏山宗祠", x: 57, y: 25, desc: "大院偏东" },
                { name: "后山药林", x: 50, y: 0, desc: "主峰背面" },
                { name: "祖坟山(乱葬岗)", x: 38, y: 2, desc: "背阴坡" },
                { name: "红砖水塔", x: 35, y: 15, desc: "主峰西侧山腰" },
                { name: "移动信号塔", x: 65, y: 15, desc: "主峰东侧山腰" }
            ]
        },
        center: {
            name: "中心枢纽", color: "#b8860b", 
            nodes: [
                { name: "十字路口(中心)", x: 50, y: 50, desc: "交通枢纽" },
                { name: "欣欣大超市", x: 53, y: 47, desc: "东北角" },
                { name: "邮政储蓄所", x: 47, y: 47, desc: "西北角" },
                { name: "老槐树乘凉坪", x: 53, y: 53, desc: "东南角" },
                { name: "镇中心公厕", x: 53, y: 58, desc: "乘凉坪向南50米" }
            ]
        },
        east: {
            name: "东部区域", color: "var(--fs-border, #c29e70)", 
            nodes: [
                { name: "中心小学", x: 65, y: 40, desc: "镇东一街北段" },
                { name: "初级中学", x: 65, y: 45, desc: "小学正南" },
                { name: "高级中学", x: 65, y: 52, desc: "初中正南" },
                { name: "露天篮球场", x: 60, y: 45, desc: "初中西侧" },
                { name: "陈家老豆腐坊", x: 75, y: 48, desc: "镇东二街中段" },
                { name: "孙记榨油坊", x: 78, y: 51, desc: "豆腐坊斜对面" },
                { name: "伏山打米厂", x: 82, y: 45, desc: "连接梯田土路旁" },
                { name: "镇东屠宰场", x: 90, y: 40, desc: "最边缘近山林" },
                { name: "伏山梯田", x: 85, y: 30, desc: "半山腰" },
                { name: "废旧变压器房", x: 75, y: 25, desc: "东北荒地" }
            ]
        },
        west: {
            name: "西部区域", color: "#483d8b", 
            nodes: [
                { name: "桥头菜市场", x: 40, y: 50, desc: "青石桥旁" },
                { name: "胖子早餐店", x: 35, y: 48, desc: "东段" },
                { name: "星岛奶茶铺", x: 32, y: 48, desc: "早餐店隔壁" },
                { name: "王记老茶馆", x: 28, y: 50, desc: "中段" },
                { name: "胖婶小卖部", x: 20, y: 48, desc: "西段" },
                { name: "德叔香烛铺", x: 20, y: 52, desc: "西段" },
                { name: "李瞎子理发店", x: 15, y: 50, desc: "老街尽头" },
                { name: "老赵打铁铺", x: 25, y: 43, desc: "北一巷" },
                { name: "老李木匠铺", x: 22, y: 43, desc: "北一巷" },
                { name: "安康诊所", x: 5, y: 50, desc: "岔路口" },
                { name: "镇外水库", x: 8, y: 20, desc: "西北山谷" }
            ]
        },
        south: {
            name: "南部洼地", color: "#556b2f", 
            nodes: [
                { name: "农副收购站", x: 48, y: 65, desc: "主街北段" },
                { name: "化肥饲料仓库", x: 45, y: 68, desc: "西侧" },
                { name: "老赵五金农机", x: 52, y: 68, desc: "东侧" },
                { name: "镇办兽医站", x: 52, y: 72, desc: "五金店后方" },
                { name: "伏山客运站", x: 50, y: 80, desc: "出镇公路入口" },
                { name: "废品回收站", x: 50, y: 85, desc: "路边" },
                { name: "农机加油点", x: 70, y: 80, desc: "镇东南角" },
                { name: "刘婆婆家", x: 40, y: 75, desc: "居民巷" },
                { name: "盘山公路", x: 50, y: 92, desc: "进出通道" },
                { name: "镇外野河塘", x: 50, y: 88, desc: "正南1公里" },
                { name: "镇南垃圾沟", x: 50, y: 98, desc: "最南端" }
            ]
        }
    };

    const SPECIAL_NODES = [
        { name: "林岁岁家", desc: "伏山脚下破旧房屋 (未分配实装)" },
        { name: "戏台搭建点", desc: "春祭期间激活 (临时刷新点)" }
    ];

    function injectMapStyles() {
        if (doc.getElementById('fs-map-styles')) return;
        const style = doc.createElement('style');
        style.id = 'fs-map-styles';
        style.innerHTML = `
            #fs-map-overlay {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
                z-index: 2147483647; display: flex; opacity: 0; transition: opacity 0.4s ease;
                pointer-events: none;
            }
            #fs-map-overlay.fs-show { opacity: 1; pointer-events: auto; }
            
            #fs-map-modal {
                width: 90vw; height: 85vh; max-width: 1200px; margin: auto;
                background-color: var(--fs-bg, #f3ead8); color: var(--fs-text, #4a3d30);
                border: 4px double var(--fs-border, #c29e70); border-radius: 8px;
                display: flex; flex-direction: row; overflow: hidden; position: relative;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3); font-family: "STKaiti", "Kaiti", serif;
                transform: translateY(20px) scale(0.98); transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1);
            }
            #fs-map-overlay.fs-show #fs-map-modal { transform: translateY(0) scale(1); }

            #fs-map-sidebar {
                width: 280px; background: rgba(0,0,0,0.03); border-right: 1px solid var(--fs-btn-border, #e8dac4);
                display: flex; flex-direction: column; z-index: 10;
            }
            .fs-map-header {
                padding: 20px; text-align: center; border-bottom: 1px solid var(--fs-btn-border, #e8dac4);
                font-weight: bold; font-size: 18px; letter-spacing: 4px; color: var(--fs-text);
            }
            .fs-map-list { flex: 1; overflow-y: auto; padding: 10px; }
            .fs-map-cat-title {
                font-size: 13px; color: var(--fs-muted, #a89379); margin: 15px 0 5px 10px; letter-spacing: 1px;
            }
            .fs-map-list-item {
                padding: 10px; margin-bottom: 6px; background: var(--fs-btn-bg, #f8f2e6);
                border: 1px solid var(--fs-btn-border, #e8dac4); border-radius: 4px; cursor: pointer;
                transition: all 0.2s ease; font-size: 14px; display: flex; align-items: center;
            }
            .fs-map-list-item:hover { background: var(--fs-btn-hover, #c29e70); color: #fff; transform: translateX(3px); }
            
            #fs-map-viewport { flex: 1; position: relative; overflow: hidden; background-color: var(--fs-cg-bg, #fbf5eb); cursor: grab; }
            #fs-map-viewport:active { cursor: grabbing; }
            
            #fs-map-canvas {
                position: absolute; top: 0; left: 0; width: 1200px; height: 1200px;
                background-image: 
                    radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0.05) 100%),
                    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
                background-size: 100% 100%, 40px 40px, 40px 40px;
                transform-origin: 0 0;
            }
            
            .fs-map-node {
                position: absolute; width: 14px; height: 14px; border-radius: 50%;
                transform: translate(-50%, -50%); cursor: pointer;
                box-shadow: 0 0 0 2px var(--fs-bg, #f3ead8), 0 2px 5px rgba(0,0,0,0.3);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .fs-map-node:hover { transform: translate(-50%, -50%) scale(1.5); z-index: 100; box-shadow: 0 0 0 2px var(--fs-bg), 0 4px 10px rgba(0,0,0,0.4); }
            .fs-map-node::after {
                content: attr(data-name); position: absolute; top: 18px; left: 50%; transform: translateX(-50%);
                background: var(--fs-text, #4a3d30); color: var(--fs-bg, #f3ead8); padding: 2px 6px; border-radius: 3px;
                font-size: 12px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
            }
            .fs-map-node:hover::after { opacity: 1; }

            .fs-map-close {
                position: absolute; top: 15px; right: 15px; width: 36px; height: 36px;
                background: var(--fs-btn-bg, #f8f2e6); border: 1px solid var(--fs-btn-border, #e8dac4); border-radius: 50%;
                display: flex; align-items: center; justify-content: center; font-size: 18px;
                cursor: pointer; color: var(--fs-text, #4a3d30); z-index: 20; transition: all 0.2s ease;
            }
            .fs-map-close:hover { background: var(--fs-dialogue, #b34233); color: #fff; border-color: var(--fs-dialogue, #b34233); transform: rotate(90deg); }

            @media (max-width: 768px) {
                #fs-map-modal { flex-direction: column; width: 95vw; height: 90vh; }
                #fs-map-sidebar { width: 100%; height: 35%; border-right: none; border-top: 1px solid var(--fs-btn-border); }
                #fs-map-canvas { width: 800px; height: 800px; }
            }
        `;
        doc.head.appendChild(style);
    }

    function buildMapDOM() {
        if (doc.getElementById('fs-map-overlay')) return;
        
        const overlay = doc.createElement('div');
        overlay.id = 'fs-map-overlay';
        
        let listHTML = '';
        for (let key in MAP_DATA) {
            listHTML += `<div class="fs-map-cat-title">✦ ${MAP_DATA[key].name} ✦</div>`;
            MAP_DATA[key].nodes.forEach(node => {
                listHTML += `<div class="fs-map-list-item" data-x="${node.x}" data-y="${node.y}">${node.name}</div>`;
            });
        }
        listHTML += `<div class="fs-map-cat-title" style="color:var(--fs-dialogue, #b34233);">✦ 临时 / 未定之域 ✦</div>`;
        SPECIAL_NODES.forEach(n => {
            listHTML += `<div class="fs-map-list-item" style="opacity:0.6;">${n.name} (待探寻)</div>`;
        });

        let nodesHTML = '';
        for (let key in MAP_DATA) {
            let color = MAP_DATA[key].color;
            MAP_DATA[key].nodes.forEach(node => {
                nodesHTML += `<div class="fs-map-node" data-name="${node.name}" style="left:${node.x}%; top:${node.y}%; background:${color};"></div>`;
            });
        }

        overlay.innerHTML = `
            <div id="fs-map-modal">
                <div class="fs-map-close">✕</div>
                <div id="fs-map-sidebar">
                    <div class="fs-map-header">伏山堪舆图</div>
                    <div class="fs-map-list">${listHTML}</div>
                </div>
                <div id="fs-map-viewport">
                    <div id="fs-map-canvas">${nodesHTML}</div>
                </div>
            </div>
        `;
        doc.body.appendChild(overlay);

        bindMapInteractions(overlay);
    }

    function bindMapInteractions(overlay) {
        const viewport = doc.getElementById('fs-map-viewport');
        const canvas = doc.getElementById('fs-map-canvas');
        const closeBtn = overlay.querySelector('.fs-map-close');
        
        closeBtn.onclick = () => global.FS_MapEngine.close();
        overlay.onclick = (e) => { if(e.target === overlay) global.FS_MapEngine.close(); }

        let isDragging = false, startX, startY, initTx = 0, initTy = 0, currentTx = 0, currentTy = 0;

        global._fsMapCenterCanvas = function() {
            const vW = viewport.clientWidth, vH = viewport.clientHeight;
            const cW = canvas.offsetWidth, cH = canvas.offsetHeight;
            currentTx = (vW - cW) / 2; currentTy = (vH - cH) / 2;
            canvas.style.transform = `translate(${currentTx}px, ${currentTy}px)`;
        };

        const onPointerDown = (e) => {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            initTx = currentTx; initTy = currentTy;
        };
        const onPointerMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            currentTx = initTx + (clientX - startX);
            currentTy = initTy + (clientY - startY);
            canvas.style.transform = `translate(${currentTx}px, ${currentTy}px)`;
        };
        const onPointerUp = () => { isDragging = false; };

        viewport.addEventListener('mousedown', onPointerDown);
        global.addEventListener('mousemove', onPointerMove, { passive: false });
        global.addEventListener('mouseup', onPointerUp);

        viewport.addEventListener('touchstart', onPointerDown, {passive: false});
        global.addEventListener('touchmove', onPointerMove, {passive: false});
        global.addEventListener('touchend', onPointerUp);

        doc.querySelectorAll('.fs-map-list-item[data-x]').forEach(item => {
            item.onclick = function() {
                const x = parseFloat(this.getAttribute('data-x')) / 100;
                const y = parseFloat(this.getAttribute('data-y')) / 100;
                const vW = viewport.clientWidth, vH = viewport.clientHeight;
                const cW = canvas.offsetWidth, cH = canvas.offsetHeight;
                
                currentTx = (vW / 2) - (cW * x);
                currentTy = (vH / 2) - (cH * y);
                canvas.style.transition = 'transform 0.4s ease';
                canvas.style.transform = `translate(${currentTx}px, ${currentTy}px)`;
                setTimeout(() => { canvas.style.transition = 'none'; }, 400);
            };
        });
    }

    global.FS_MapEngine = {
        open: function() {
            injectMapStyles();
            buildMapDOM();
            const overlay = doc.getElementById('fs-map-overlay');
            overlay.classList.add('fs-show');
            setTimeout(() => { if(global._fsMapCenterCanvas) global._fsMapCenterCanvas(); }, 50);
        },
        close: function() {
            const overlay = doc.getElementById('fs-map-overlay');
            if (overlay) overlay.classList.remove('fs-show');
        }
    };
})(window.parent || window);
