(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/internship/paisaMachine/frontend/app/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function PriceChange(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "4e4664f9429c53647dfe88612af1169bccb79890ec3d32b68eb3119594b45b16") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4e4664f9429c53647dfe88612af1169bccb79890ec3d32b68eb3119594b45b16";
    }
    const { value, percent } = t0;
    const isPositive = value >= 0;
    const color = isPositive ? "text-[#10b981]" : "text-[#ef4444]";
    const arrow = isPositive ? "\u25B2" : "\u25BC";
    const t1 = `${color} text-xs`;
    let t2;
    if ($[1] !== value) {
        t2 = Math.abs(value).toFixed(2);
        $[1] = value;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== percent) {
        t3 = Math.abs(percent).toFixed(2);
        $[3] = percent;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== arrow || $[6] !== t1 || $[7] !== t2 || $[8] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t1,
            children: [
                arrow,
                " ",
                t2,
                " (",
                t3,
                "%)"
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 50,
            columnNumber: 10
        }, this);
        $[5] = arrow;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    return t4;
}
_c = PriceChange;
function Header(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "4e4664f9429c53647dfe88612af1169bccb79890ec3d32b68eb3119594b45b16") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4e4664f9429c53647dfe88612af1169bccb79890ec3d32b68eb3119594b45b16";
    }
    const { indices, marketStatus, connected, soundEnabled, onToggleSound, totalItems } = t0;
    const capitalMarket = marketStatus.find(_HeaderMarketStatusFind);
    const isMarketOpen = capitalMarket?.status?.toLowerCase().includes("open") ?? false;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-base font-bold text-[#10b981] tracking-wider",
            children: "PAISAMACHINE"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const t2 = `w-2 h-2 rounded-full ${isMarketOpen ? "bg-[#10b981] animate-pulse" : "bg-[#ef4444]"}`;
    let t3;
    if ($[2] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t2
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[2] = t2;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    const t4 = isMarketOpen ? "Market Open" : "Market Closed";
    let t5;
    if ($[4] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] text-[#6b7280] uppercase",
            children: t4
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 98,
            columnNumber: 10
        }, this);
        $[4] = t4;
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] !== t3 || $[7] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                        t3,
                        t5
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
                    lineNumber: 106,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 106,
            columnNumber: 10
        }, this);
        $[6] = t3;
        $[7] = t5;
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] !== indices) {
        t7 = indices.map(_HeaderIndicesMap);
        $[9] = indices;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-6",
            children: t7
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 123,
            columnNumber: 10
        }, this);
        $[11] = t7;
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSearch, {}, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 131,
            columnNumber: 10
        }, this);
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== totalItems) {
        t10 = totalItems.toLocaleString();
        $[14] = totalItems;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] text-[#6b7280]",
            children: [
                t10,
                " items"
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 146,
            columnNumber: 11
        }, this);
        $[16] = t10;
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    const t12 = soundEnabled ? "Mute alerts" : "Enable alerts";
    const t13 = soundEnabled ? "\uD83D\uDD0A" : "\uD83D\uDD07";
    let t14;
    if ($[18] !== onToggleSound || $[19] !== t12 || $[20] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onToggleSound,
            className: "text-xs px-2 py-1 rounded border border-[#1b2b1b] hover:border-[#10b981] transition-colors",
            title: t12,
            children: t13
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 156,
            columnNumber: 11
        }, this);
        $[18] = onToggleSound;
        $[19] = t12;
        $[20] = t13;
        $[21] = t14;
    } else {
        t14 = $[21];
    }
    const t15 = `w-2 h-2 rounded-full ${connected ? "bg-[#10b981]" : "bg-[#ef4444]"}`;
    let t16;
    if ($[22] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t15
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 167,
            columnNumber: 11
        }, this);
        $[22] = t15;
        $[23] = t16;
    } else {
        t16 = $[23];
    }
    const t17 = `text-[10px] ${connected ? "text-[#10b981]" : "text-[#ef4444]"}`;
    const t18 = connected ? "LIVE" : "OFFLINE";
    let t19;
    if ($[24] !== t17 || $[25] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t17,
            children: t18
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[24] = t17;
        $[25] = t18;
        $[26] = t19;
    } else {
        t19 = $[26];
    }
    let t20;
    if ($[27] !== t16 || $[28] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                t16,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 186,
            columnNumber: 11
        }, this);
        $[27] = t16;
        $[28] = t19;
        $[29] = t20;
    } else {
        t20 = $[29];
    }
    let t21;
    if ($[30] !== t11 || $[31] !== t14 || $[32] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                t9,
                t11,
                t14,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 195,
            columnNumber: 11
        }, this);
        $[30] = t11;
        $[31] = t14;
        $[32] = t20;
        $[33] = t21;
    } else {
        t21 = $[33];
    }
    let t22;
    if ($[34] !== t21 || $[35] !== t6 || $[36] !== t8) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-[#1b2b1b]",
            children: [
                t6,
                t8,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        $[34] = t21;
        $[35] = t6;
        $[36] = t8;
        $[37] = t22;
    } else {
        t22 = $[37];
    }
    return t22;
}
_c1 = Header;
function _HeaderIndicesMap(idx) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-[#6b7280]",
                children: idx.name
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
                lineNumber: 216,
                columnNumber: 66
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-semibold text-[#e5e7eb]",
                children: idx.last?.toLocaleString("en-IN", {
                    maximumFractionDigits: 2
                })
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
                lineNumber: 216,
                columnNumber: 128
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PriceChange, {
                value: idx.change,
                percent: idx.changePercent
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
                lineNumber: 218,
                columnNumber: 17
            }, this)
        ]
    }, idx.name, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/Header.tsx",
        lineNumber: 216,
        columnNumber: 10
    }, this);
}
function _HeaderMarketStatusFind(s) {
    return s.market === "Capital Market" || s.market === "CM";
}
var _c, _c1;
__turbopack_context__.k.register(_c, "PriceChange");
__turbopack_context__.k.register(_c1, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HighImpactStrip",
    ()=>HighImpactStrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function HighImpactStrip(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "5fbaec7ce9039dca410dd02072a78e6c0427525808fffb72c4e47dd1ccf2eba5") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5fbaec7ce9039dca410dd02072a78e6c0427525808fffb72c4e47dd1ccf2eba5";
    }
    const { items } = t0;
    if (items.length === 0) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 bg-[#0d1117] border-b border-[#1b2b1b] flex items-center px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] text-[#374151]",
                    children: "No high-impact alerts"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
                    lineNumber: 22,
                    columnNumber: 95
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
                lineNumber: 22,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    let t1;
    let t2;
    let t3;
    if ($[2] !== items) {
        const doubled = [
            ...items,
            ...items
        ];
        t3 = "h-8 bg-[#0d1117] border-b border-[#1b2b1b] overflow-hidden relative";
        t1 = "flex items-center h-full animate-scroll-left whitespace-nowrap";
        t2 = doubled.map(_HighImpactStripDoubledMap);
        $[2] = items;
        $[3] = t1;
        $[4] = t2;
        $[5] = t3;
    } else {
        t1 = $[3];
        t2 = $[4];
        t3 = $[5];
    }
    let t4;
    if ($[6] !== t1 || $[7] !== t2) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
            lineNumber: 48,
            columnNumber: 10
        }, this);
        $[6] = t1;
        $[7] = t2;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== t3 || $[10] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: t4
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t4;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    return t5;
}
_c = HighImpactStrip;
function _HighImpactStripDoubledMap(item, i) {
    const isNeg = item.sentiment === "negative";
    const bgColor = isNeg ? "bg-[#7f1d1d]/30" : "bg-[#065f46]/30";
    const textColor = isNeg ? "text-[#ef4444]" : "text-[#10b981]";
    const arrow = isNeg ? "\u25BC" : "\u25B2";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-2 px-4 h-full text-xs ${bgColor}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `font-bold ${textColor}`,
                children: arrow
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
                lineNumber: 71,
                columnNumber: 116
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[#eab308] font-bold",
                children: item.tickers.join(", ") || "MARKET"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
                lineNumber: 71,
                columnNumber: 173
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[#e5e7eb]",
                children: item.summary || item.headline.substring(0, 80)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
                lineNumber: 71,
                columnNumber: 260
            }, this),
            item.key_figures.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[#f59e0b] font-bold",
                children: item.key_figures[0]
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
                lineNumber: 71,
                columnNumber: 380
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[#374151] mx-2",
                children: "|"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
                lineNumber: 71,
                columnNumber: 452
            }, this)
        ]
    }, `${item.id}-${i}`, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx",
        lineNumber: 71,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "HighImpactStrip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SentimentDonut",
    ()=>SentimentDonut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
"use client";
;
;
;
const COLORS = {
    positive: "#10b981",
    negative: "#ef4444",
    neutral: "#6b7280"
};
function SentimentDonut(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(20);
    if ($[0] !== "632f8a3ded68b45a7db49100a7e878c09af955d76f85bb6677ece72ccf69fcb6") {
        for(let $i = 0; $i < 20; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "632f8a3ded68b45a7db49100a7e878c09af955d76f85bb6677ece72ccf69fcb6";
    }
    const { stats } = t0;
    if (!stats) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-4 flex items-center justify-center h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] text-[#374151]",
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                    lineNumber: 28,
                    columnNumber: 121
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                lineNumber: 28,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    let data;
    let t1;
    if ($[2] !== stats.sentiment_counts) {
        data = Object.entries(stats.sentiment_counts).map(_SentimentDonutAnonymous);
        t1 = data.reduce(_SentimentDonutDataReduce, 0);
        $[2] = stats.sentiment_counts;
        $[3] = data;
        $[4] = t1;
    } else {
        data = $[3];
        t1 = $[4];
    }
    const total = t1;
    let t2;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[10px] text-[#6b7280] uppercase tracking-wider mb-1",
            children: "Sentiment"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
            lineNumber: 50,
            columnNumber: 10
        }, this);
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] !== data) {
        t3 = data.map(_SentimentDonutDataMap);
        $[6] = data;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== data || $[9] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
            data: data,
            cx: "50%",
            cy: "50%",
            innerRadius: "55%",
            outerRadius: "85%",
            dataKey: "value",
            stroke: "none",
            children: t3
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[8] = data;
        $[9] = t3;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
            contentStyle: {
                background: "#0d1117",
                border: "1px solid #1b2b1b",
                borderRadius: "8px",
                fontSize: "11px"
            }
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t4) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-1/2 h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                    children: [
                        t4,
                        t5
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                    lineNumber: 86,
                    columnNumber: 88
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                lineNumber: 86,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        $[12] = t4;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    let t7;
    if ($[14] !== data || $[15] !== total) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-1/2 flex flex-col gap-1",
            children: data.map({
                "SentimentDonut[data.map()]": (d_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 rounded-full",
                                        style: {
                                            background: COLORS[d_0.name]
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                                        lineNumber: 95,
                                        columnNumber: 155
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-[#6b7280] capitalize",
                                        children: d_0.name
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                                        lineNumber: 97,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                                lineNumber: 95,
                                columnNumber: 112
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-[#e5e7eb]",
                                children: [
                                    total > 0 ? Math.round(d_0.value / total * 100) : 0,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                                lineNumber: 97,
                                columnNumber: 97
                            }, this)
                        ]
                    }, d_0.name, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                        lineNumber: 95,
                        columnNumber: 46
                    }, this)
            }["SentimentDonut[data.map()]"])
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        $[14] = data;
        $[15] = total;
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    let t8;
    if ($[17] !== t6 || $[18] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 h-full",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 h-[calc(100%-24px)]",
                    children: [
                        t6,
                        t7
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
                    lineNumber: 107,
                    columnNumber: 90
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
            lineNumber: 107,
            columnNumber: 10
        }, this);
        $[17] = t6;
        $[18] = t7;
        $[19] = t8;
    } else {
        t8 = $[19];
    }
    return t8;
}
_c = SentimentDonut;
function _SentimentDonutDataMap(entry) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
        fill: COLORS[entry.name] || "#6b7280"
    }, entry.name, false, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx",
        lineNumber: 117,
        columnNumber: 10
    }, this);
}
function _SentimentDonutDataReduce(sum, d) {
    return sum + d.value;
}
function _SentimentDonutAnonymous(t0) {
    const [name, value] = t0;
    return {
        name,
        value
    };
}
var _c;
__turbopack_context__.k.register(_c, "SentimentDonut");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsVelocity",
    ()=>NewsVelocity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
"use client";
;
;
;
function NewsVelocity(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "357f26c4569b2303e46c014dcbd7041ec312748cad7d4b8dc4f39c0d1c8a6d3f") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "357f26c4569b2303e46c014dcbd7041ec312748cad7d4b8dc4f39c0d1c8a6d3f";
    }
    const { stats } = t0;
    if (!stats || stats.velocity.length === 0) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-4 flex items-center justify-center h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] text-[#374151]",
                    children: "No data yet"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
                    lineNumber: 23,
                    columnNumber: 121
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
                lineNumber: 23,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    let t1;
    if ($[2] !== stats.velocity) {
        t1 = stats.velocity.map(_NewsVelocityStatsVelocityMap);
        $[2] = stats.velocity;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const data = t1;
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[10px] text-[#6b7280] uppercase tracking-wider",
            children: "News Velocity"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
            lineNumber: 41,
            columnNumber: 10
        }, this);
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== stats.total_items) {
        t3 = stats.total_items.toLocaleString();
        $[5] = stats.total_items;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between mb-1",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-semibold text-[#10b981]",
                    children: [
                        t3,
                        " total"
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
                    lineNumber: 56,
                    columnNumber: 70
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[7] = t3;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                id: "velocityGradient",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                        offset: "5%",
                        stopColor: "#10b981",
                        stopOpacity: 0.3
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
                        lineNumber: 64,
                        columnNumber: 82
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                        offset: "95%",
                        stopColor: "#10b981",
                        stopOpacity: 0
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
                        lineNumber: 64,
                        columnNumber: 140
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
                lineNumber: 64,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
            lineNumber: 64,
            columnNumber: 10
        }, this);
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
            dataKey: "time",
            tick: {
                fontSize: 9,
                fill: "#374151"
            },
            axisLine: false,
            tickLine: false,
            interval: "preserveStartEnd"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    let t8;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
            contentStyle: {
                background: "#0d1117",
                border: "1px solid #1b2b1b",
                borderRadius: "8px",
                fontSize: "11px"
            },
            labelStyle: {
                color: "#6b7280"
            }
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
            type: "monotone",
            dataKey: "count",
            stroke: "#10b981",
            strokeWidth: 2,
            fill: "url(#velocityGradient)"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
            lineNumber: 90,
            columnNumber: 10
        }, this);
        $[11] = t7;
        $[12] = t8;
    } else {
        t7 = $[11];
        t8 = $[12];
    }
    let t9;
    if ($[13] !== data) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-[calc(100%-24px)]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                    data: data,
                    children: [
                        t5,
                        t6,
                        t7,
                        t8
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
                    lineNumber: 99,
                    columnNumber: 95
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
                lineNumber: 99,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
            lineNumber: 99,
            columnNumber: 10
        }, this);
        $[13] = data;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== t4 || $[16] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 h-full",
            children: [
                t4,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx",
            lineNumber: 107,
            columnNumber: 11
        }, this);
        $[15] = t4;
        $[16] = t9;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    return t10;
}
_c = NewsVelocity;
function _NewsVelocityStatsVelocityMap(v) {
    return {
        time: v.minute.slice(11, 16),
        count: v.count
    };
}
var _c;
__turbopack_context__.k.register(_c, "NewsVelocity");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Highlight",
    ()=>Highlight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function Highlight(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "04cd0d31e46123f4bddf9333bb3ced6ebc6cc44c1965a038d1ae535899c87233") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "04cd0d31e46123f4bddf9333bb3ced6ebc6cc44c1965a038d1ae535899c87233";
    }
    const { text, keyFigures } = t0;
    if (!keyFigures || keyFigures.length === 0) {
        let t1;
        if ($[1] !== text) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: text
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx",
                lineNumber: 23,
                columnNumber: 12
            }, this);
            $[1] = text;
            $[2] = t1;
        } else {
            t1 = $[2];
        }
        return t1;
    }
    let t1;
    if ($[3] !== keyFigures || $[4] !== text) {
        const escaped = keyFigures.map(_HighlightKeyFiguresMap);
        const regex = new RegExp(`(${escaped.join("|")})`, "gi");
        const parts = text.split(regex);
        let t2;
        if ($[6] !== keyFigures) {
            t2 = ({
                "Highlight[parts.map()]": (part, i)=>{
                    const isHighlight = keyFigures.some({
                        "Highlight[parts.map() > keyFigures.some()]": (f_0)=>f_0.toLowerCase() === part.toLowerCase()
                    }["Highlight[parts.map() > keyFigures.some()]"]);
                    return isHighlight ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-orange-400 font-bold",
                        children: part
                    }, i, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx",
                        lineNumber: 43,
                        columnNumber: 32
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: part
                    }, i, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx",
                        lineNumber: 43,
                        columnNumber: 100
                    }, this);
                }
            })["Highlight[parts.map()]"];
            $[6] = keyFigures;
            $[7] = t2;
        } else {
            t2 = $[7];
        }
        t1 = parts.map(t2);
        $[3] = keyFigures;
        $[4] = text;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[8] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t1
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx",
            lineNumber: 60,
            columnNumber: 10
        }, this);
        $[8] = t1;
        $[9] = t2;
    } else {
        t2 = $[9];
    }
    return t2;
}
_c = Highlight;
function _HighlightKeyFiguresMap(f) {
    return f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var _c;
__turbopack_context__.k.register(_c, "Highlight");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsPanelCard",
    ()=>NewsPanelCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const SENTIMENT_CONFIG = {
    positive: {
        color: "text-[#10b981]",
        bg: "bg-[#10b981]",
        arrow: "\u25B2",
        label: "Positive"
    },
    negative: {
        color: "text-[#ef4444]",
        bg: "bg-[#ef4444]",
        arrow: "\u25BC",
        label: "Negative"
    },
    neutral: {
        color: "text-[#6b7280]",
        bg: "bg-[#6b7280]",
        arrow: "\u25CF",
        label: "Neutral"
    }
};
const SOURCE_LABELS = {
    nse_json_api: "NSE",
    bse_json_api: "BSE",
    zerodha_pulse: "Zerodha",
    economic_times: "ET",
    livemint: "Mint",
    ndtv_profit: "NDTV",
    bloomberg: "Bloomberg",
    tradingview: "TradingView",
    screener: "Screener"
};
function formatIST(dateStr) {
    const dt = new Date(dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z");
    const istOffset = 5.5 * 60 * 60 * 1000;
    const ist = new Date(dt.getTime() + istOffset);
    return {
        time: ist.toISOString().slice(11, 16),
        date: ist.toISOString().slice(5, 10).replace("-", "/")
    };
}
function NewsRow(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(53);
    if ($[0] !== "0e15c7b92b5778b42cadf655db42ad7ccbe9a5bc331b735588b90e9ea8caa902") {
        for(let $i = 0; $i < 53; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e15c7b92b5778b42cadf655db42ad7ccbe9a5bc331b735588b90e9ea8caa902";
    }
    const { item, showTickers: t1 } = t0;
    const showTickers = t1 === undefined ? true : t1;
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sent = SENTIMENT_CONFIG[item.sentiment];
    const isHigh = item.impact === "high";
    let t2;
    if ($[1] !== item.published_at) {
        t2 = formatIST(item.published_at);
        $[1] = item.published_at;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const published = t2;
    let t3;
    if ($[3] !== item.ingested_at) {
        t3 = formatIST(item.ingested_at);
        $[3] = item.ingested_at;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const ingested = t3;
    const sourceLabel = SOURCE_LABELS[item.source] || item.source;
    const t4 = `px-3 py-2.5 border-b border-[#1b2b1b]/50 cursor-pointer hover:bg-[#1b2b1b]/30 transition-colors ${isHigh ? "border-l-2 border-l-[#f59e0b]" : ""} ${expanded ? "bg-[#0a1a0a]" : ""}`;
    let t5;
    if ($[5] !== expanded) {
        t5 = ({
            "NewsRow[<div>.onClick]": ()=>setExpanded(!expanded)
        })["NewsRow[<div>.onClick]"];
        $[5] = expanded;
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] !== published.time) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[11px] font-bold text-[#e5e7eb] tabular-nums",
            children: published.time
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 107,
            columnNumber: 10
        }, this);
        $[7] = published.time;
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] !== published.date) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[9px] text-[#374151]",
            children: published.date
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 115,
            columnNumber: 10
        }, this);
        $[9] = published.date;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    const t8 = `w-1.5 h-1.5 rounded-full shrink-0 ${sent.bg}`;
    let t9;
    if ($[11] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t8
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 124,
            columnNumber: 10
        }, this);
        $[11] = t8;
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] !== item.tickers || $[14] !== showTickers) {
        t10 = showTickers && item.tickers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] shrink-0 flex gap-1",
            children: item.tickers.slice(0, 3).map(_NewsRowAnonymous)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 132,
            columnNumber: 53
        }, this);
        $[13] = item.tickers;
        $[14] = showTickers;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== sourceLabel) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[9px] text-[#374151] ml-auto",
            children: sourceLabel
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 141,
            columnNumber: 11
        }, this);
        $[16] = sourceLabel;
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    let t12;
    if ($[18] !== isHigh) {
        t12 = isHigh && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[8px] text-[#f59e0b] font-bold uppercase bg-[#f59e0b]/10 px-1.5 py-0.5 rounded shrink-0",
            children: "HIGH"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 149,
            columnNumber: 21
        }, this);
        $[18] = isHigh;
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] !== t10 || $[21] !== t11 || $[22] !== t12 || $[23] !== t6 || $[24] !== t7 || $[25] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 mb-1",
            children: [
                t6,
                t7,
                t9,
                t10,
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[20] = t10;
        $[21] = t11;
        $[22] = t12;
        $[23] = t6;
        $[24] = t7;
        $[25] = t9;
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    const t14 = item.summary || item.headline;
    let t15;
    if ($[27] !== item.key_figures || $[28] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[11px] text-[#e5e7eb] leading-snug",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Highlight"], {
                text: t14,
                keyFigures: item.key_figures
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                lineNumber: 171,
                columnNumber: 68
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 171,
            columnNumber: 11
        }, this);
        $[27] = item.key_figures;
        $[28] = t14;
        $[29] = t15;
    } else {
        t15 = $[29];
    }
    let t16;
    if ($[30] !== expanded || $[31] !== ingested || $[32] !== isHigh || $[33] !== item.category || $[34] !== item.headline || $[35] !== item.impact || $[36] !== item.key_figures || $[37] !== item.raw_content || $[38] !== item.tickers || $[39] !== item.url || $[40] !== published.date || $[41] !== published.time || $[42] !== sent.arrow || $[43] !== sent.color || $[44] !== sent.label || $[45] !== sourceLabel) {
        t16 = expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 space-y-2.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] text-[#374151] uppercase block mb-0.5",
                            children: "Full Headline"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 114
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] text-[#e5e7eb]",
                            children: item.headline
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 201
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                    lineNumber: 180,
                    columnNumber: 109
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#374151]",
                                    children: "Source: "
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 343
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#6b7280]",
                                    children: sourceLabel
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 391
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 338
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#374151]",
                                    children: "Category: "
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 455
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#6b7280]",
                                    children: item.category
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 505
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 450
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#374151]",
                                    children: "Sentiment: "
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 571
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: sent.color,
                                    children: [
                                        sent.arrow,
                                        " ",
                                        sent.label
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 622
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 566
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#374151]",
                                    children: "Impact: "
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 694
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: isHigh ? "text-[#f59e0b] font-bold" : "text-[#6b7280]",
                                    children: item.impact.toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 742
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 689
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#374151]",
                                    children: "Published: "
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 860
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#e5e7eb] font-bold",
                                    children: [
                                        published.date,
                                        " ",
                                        published.time,
                                        " IST"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 911
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 855
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#374151]",
                                    children: "Ingested: "
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 1009
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#6b7280]",
                                    children: [
                                        ingested.date,
                                        " ",
                                        ingested.time,
                                        " IST"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 1059
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 1004
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                    lineNumber: 180,
                    columnNumber: 274
                }, this),
                item.tickers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] text-[#374151] uppercase block mb-0.5",
                            children: "Tickers"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 1179
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1",
                            children: item.tickers.map(_NewsRowItemTickersMap)
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 1260
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                    lineNumber: 180,
                    columnNumber: 1174
                }, this),
                item.key_figures.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] text-[#374151] uppercase block mb-0.5",
                            children: "Key Figures"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 1390
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1",
                            children: item.key_figures.map(_NewsRowItemKey_figuresMap)
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 1475
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                    lineNumber: 180,
                    columnNumber: 1385
                }, this),
                item.raw_content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] text-[#374151] uppercase block mb-0.5",
                            children: "Full Content"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 1602
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[10px] text-[#6b7280] max-h-40 overflow-y-auto whitespace-pre-wrap leading-relaxed",
                            children: item.raw_content
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                            lineNumber: 180,
                            columnNumber: 1688
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                    lineNumber: 180,
                    columnNumber: 1597
                }, this),
                item.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: item.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-block text-[10px] text-[#10b981] hover:text-[#34d399] hover:underline",
                    onClick: _NewsRowAOnClick,
                    children: "Open original source →"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                    lineNumber: 180,
                    columnNumber: 1837
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 180,
            columnNumber: 23
        }, this);
        $[30] = expanded;
        $[31] = ingested;
        $[32] = isHigh;
        $[33] = item.category;
        $[34] = item.headline;
        $[35] = item.impact;
        $[36] = item.key_figures;
        $[37] = item.raw_content;
        $[38] = item.tickers;
        $[39] = item.url;
        $[40] = published.date;
        $[41] = published.time;
        $[42] = sent.arrow;
        $[43] = sent.color;
        $[44] = sent.label;
        $[45] = sourceLabel;
        $[46] = t16;
    } else {
        t16 = $[46];
    }
    let t17;
    if ($[47] !== t13 || $[48] !== t15 || $[49] !== t16 || $[50] !== t4 || $[51] !== t5) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            onClick: t5,
            children: [
                t13,
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 203,
            columnNumber: 11
        }, this);
        $[47] = t13;
        $[48] = t15;
        $[49] = t16;
        $[50] = t4;
        $[51] = t5;
        $[52] = t17;
    } else {
        t17 = $[52];
    }
    return t17;
}
_s(NewsRow, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c = NewsRow;
function _NewsRowAOnClick(e_1) {
    return e_1.stopPropagation();
}
function _NewsRowItemKey_figuresMap(f, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-[10px] text-[#f59e0b] font-bold bg-[#f59e0b]/10 px-1.5 py-0.5 rounded",
        children: f
    }, i, false, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
        lineNumber: 219,
        columnNumber: 10
    }, this);
}
function _NewsRowItemTickersMap(t_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/stock/${t_0}`,
        onClick: _NewsRowItemTickersMapLinkOnClick,
        className: "text-[10px] text-[#eab308] font-bold bg-[#eab308]/10 px-1.5 py-0.5 rounded hover:bg-[#eab308]/20",
        children: t_0
    }, t_0, false, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
        lineNumber: 222,
        columnNumber: 10
    }, this);
}
function _NewsRowItemTickersMapLinkOnClick(e_0) {
    return e_0.stopPropagation();
}
function _NewsRowAnonymous(t) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/stock/${t}`,
        onClick: _NewsRowAnonymousLinkOnClick,
        className: "text-[#eab308] font-bold hover:text-[#facc15] hover:underline",
        children: t
    }, t, false, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
        lineNumber: 228,
        columnNumber: 10
    }, this);
}
function _NewsRowAnonymousLinkOnClick(e) {
    return e.stopPropagation();
}
const FILTER_BUTTONS = [
    {
        value: "all",
        label: "All",
        activeClass: "bg-[#1b2b1b] text-[#e5e7eb]"
    },
    {
        value: "positive",
        label: "Positive",
        activeClass: "bg-[#10b981]/20 text-[#10b981]"
    },
    {
        value: "negative",
        label: "Negative",
        activeClass: "bg-[#ef4444]/20 text-[#ef4444]"
    }
];
function NewsPanelCard(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(30);
    if ($[0] !== "0e15c7b92b5778b42cadf655db42ad7ccbe9a5bc331b735588b90e9ea8caa902") {
        for(let $i = 0; $i < 30; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e15c7b92b5778b42cadf655db42ad7ccbe9a5bc331b735588b90e9ea8caa902";
    }
    const { title, items, maxHeight: t1, emptyMessage: t2, showTickers: t3, enableSentimentFilter: t4 } = t0;
    const maxHeight = t1 === undefined ? "100%" : t1;
    const emptyMessage = t2 === undefined ? "No items" : t2;
    const showTickers = t3 === undefined ? true : t3;
    const enableSentimentFilter = t4 === undefined ? false : t4;
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    let t5;
    if ($[1] !== enableSentimentFilter || $[2] !== filter || $[3] !== items) {
        t5 = enableSentimentFilter && filter !== "all" ? items.filter({
            "NewsPanelCard[items.filter()]": (item)=>item.sentiment === filter
        }["NewsPanelCard[items.filter()]"]) : items;
        $[1] = enableSentimentFilter;
        $[2] = filter;
        $[3] = items;
        $[4] = t5;
    } else {
        t5 = $[4];
    }
    const filtered = t5;
    let t6;
    if ($[5] !== maxHeight) {
        t6 = {
            maxHeight
        };
        $[5] = maxHeight;
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] !== title) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold",
            children: title
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 297,
            columnNumber: 10
        }, this);
        $[7] = title;
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] !== enableSentimentFilter || $[10] !== filter) {
        t8 = enableSentimentFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-0.5",
            children: FILTER_BUTTONS.map({
                "NewsPanelCard[FILTER_BUTTONS.map()]": (btn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "NewsPanelCard[FILTER_BUTTONS.map() > <button>.onClick]": ()=>setFilter(btn.value)
                        }["NewsPanelCard[FILTER_BUTTONS.map() > <button>.onClick]"],
                        className: `text-[9px] font-bold px-1.5 py-0.5 rounded transition-colors ${filter === btn.value ? btn.activeClass : "text-[#374151] hover:text-[#6b7280]"}`,
                        children: btn.label
                    }, btn.value, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                        lineNumber: 306,
                        columnNumber: 55
                    }, this)
            }["NewsPanelCard[FILTER_BUTTONS.map()]"])
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 305,
            columnNumber: 35
        }, this);
        $[9] = enableSentimentFilter;
        $[10] = filter;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== t7 || $[13] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 318,
            columnNumber: 10
        }, this);
        $[12] = t7;
        $[13] = t8;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== filtered.length) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] text-[#374151] font-bold",
            children: filtered.length
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 327,
            columnNumber: 11
        }, this);
        $[15] = filtered.length;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] !== t10 || $[18] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]",
            children: [
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 335,
            columnNumber: 11
        }, this);
        $[17] = t10;
        $[18] = t9;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== emptyMessage || $[21] !== filtered || $[22] !== showTickers) {
        t12 = filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-20 text-[10px] text-[#374151]",
            children: emptyMessage
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 344,
            columnNumber: 35
        }, this) : filtered.map({
            "NewsPanelCard[filtered.map()]": (item_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewsRow, {
                    item: item_0,
                    showTickers: showTickers
                }, item_0.id, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
                    lineNumber: 345,
                    columnNumber: 50
                }, this)
        }["NewsPanelCard[filtered.map()]"]);
        $[20] = emptyMessage;
        $[21] = filtered;
        $[22] = showTickers;
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    let t13;
    if ($[24] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-y-auto",
            children: t12
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 356,
            columnNumber: 11
        }, this);
        $[24] = t12;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== t11 || $[27] !== t13 || $[28] !== t6) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col h-full",
            style: t6,
            children: [
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx",
            lineNumber: 364,
            columnNumber: 11
        }, this);
        $[26] = t11;
        $[27] = t13;
        $[28] = t6;
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    return t14;
}
_s1(NewsPanelCard, "boPJerHaELAyf+PNkR+Y8+JetQg=");
_c1 = NewsPanelCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "NewsRow");
__turbopack_context__.k.register(_c1, "NewsPanelCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSSEConnection",
    ()=>createSSEConnection,
    "fetchFullQuote",
    ()=>fetchFullQuote,
    "fetchIndices",
    ()=>fetchIndices,
    "fetchMarketStatus",
    ()=>fetchMarketStatus,
    "fetchNews",
    ()=>fetchNews,
    "fetchNewsByTicker",
    ()=>fetchNewsByTicker,
    "fetchQuote",
    ()=>fetchQuote,
    "fetchStats",
    ()=>fetchStats,
    "searchStocks",
    ()=>searchStocks
]);
const BACKEND_URL = "http://localhost:3001";
async function fetchNews(limit = 1000, beforeId) {
    const params = new URLSearchParams({
        limit: String(limit)
    });
    if (beforeId) params.set("before", String(beforeId));
    const res = await fetch(`${BACKEND_URL}/api/news?${params}`);
    return res.json();
}
async function fetchStats() {
    const res = await fetch(`${BACKEND_URL}/api/stats`);
    return res.json();
}
async function fetchIndices() {
    const res = await fetch(`${BACKEND_URL}/api/market/indices`);
    return res.json();
}
async function fetchQuote(symbol) {
    const res = await fetch(`${BACKEND_URL}/api/market/quote/${encodeURIComponent(symbol)}`);
    return res.json();
}
async function fetchFullQuote(symbol) {
    const res = await fetch(`${BACKEND_URL}/api/market/quote-full/${encodeURIComponent(symbol)}`);
    return res.json();
}
async function fetchNewsByTicker(ticker, limit = 200) {
    const all = await fetchNews(limit);
    return all.filter((item)=>item.tickers.some((t)=>t.toUpperCase() === ticker.toUpperCase()));
}
async function fetchMarketStatus() {
    const res = await fetch(`${BACKEND_URL}/api/market/status`);
    return res.json();
}
async function searchStocks(query) {
    if (query.length < 2) return [];
    const res = await fetch(`${BACKEND_URL}/api/market/search?q=${encodeURIComponent(query)}`);
    return res.json();
}
function createSSEConnection(onMessage, onConnect, onError) {
    const es = new EventSource(`${BACKEND_URL}/api/stream`);
    es.onopen = ()=>onConnect();
    es.onmessage = (event)=>{
        try {
            const data = JSON.parse(event.data);
            if (data.type === "connected") return;
            onMessage(data);
        } catch  {
        // ignore
        }
    };
    es.onerror = ()=>onError();
    return es;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WatchlistPanel",
    ()=>WatchlistPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function formatIST(dateStr) {
    const dt = new Date(dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z");
    const istOffset = 5.5 * 60 * 60 * 1000;
    const ist = new Date(dt.getTime() + istOffset);
    return ist.toISOString().slice(11, 16);
}
function TickerCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(29);
    if ($[0] !== "69e441d101208998b54ce0fd44b57f5c1d94ca949bd192a68c607967b3485d01") {
        for(let $i = 0; $i < 29; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "69e441d101208998b54ce0fd44b57f5c1d94ca949bd192a68c607967b3485d01";
    }
    const { symbol, quote, onRemove } = t0;
    const change = quote?.changePercent ?? 0;
    const isPositive = change >= 0;
    const color = isPositive ? "text-[#10b981]" : "text-[#ef4444]";
    const arrow = isPositive ? "\u25B2" : "\u25BC";
    let t1;
    if ($[1] !== symbol) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-bold text-[#eab308]",
            children: symbol
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, this);
        $[1] = symbol;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== onRemove) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "TickerCard[<button>.onClick]": (e)=>{
                    e.stopPropagation();
                    onRemove();
                }
            }["TickerCard[<button>.onClick]"],
            className: "text-[10px] text-[#ef4444] opacity-0 group-hover:opacity-100 transition-opacity",
            children: "×"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 46,
            columnNumber: 10
        }, this);
        $[3] = onRemove;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t1 || $[6] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                t1,
                t2
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 59,
            columnNumber: 10
        }, this);
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== quote) {
        t4 = quote?.companyName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[9px] text-[#374151] block truncate",
            children: quote.companyName
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 68,
            columnNumber: 32
        }, this);
        $[8] = quote;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] !== t3 || $[11] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-w-0",
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 76,
            columnNumber: 10
        }, this);
        $[10] = t3;
        $[11] = t4;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    let t6;
    if ($[13] !== quote) {
        t6 = quote ? `\u20B9${quote.ltp.toLocaleString("en-IN")}` : "--";
        $[13] = quote;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs font-semibold text-[#e5e7eb]",
            children: t6
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 93,
            columnNumber: 10
        }, this);
        $[15] = t6;
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    const t8 = `text-[10px] font-bold ${color}`;
    let t9;
    if ($[17] !== change) {
        t9 = Math.abs(change).toFixed(2);
        $[17] = change;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== arrow || $[20] !== t8 || $[21] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t8,
            children: [
                arrow,
                " ",
                t9,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 110,
            columnNumber: 11
        }, this);
        $[19] = arrow;
        $[20] = t8;
        $[21] = t9;
        $[22] = t10;
    } else {
        t10 = $[22];
    }
    let t11;
    if ($[23] !== t10 || $[24] !== t7) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-right shrink-0",
            children: [
                t7,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 120,
            columnNumber: 11
        }, this);
        $[23] = t10;
        $[24] = t7;
        $[25] = t11;
    } else {
        t11 = $[25];
    }
    let t12;
    if ($[26] !== t11 || $[27] !== t5) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#080c08] rounded border border-[#1b2b1b] p-2.5 flex items-center justify-between group",
            children: [
                t5,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 129,
            columnNumber: 11
        }, this);
        $[26] = t11;
        $[27] = t5;
        $[28] = t12;
    } else {
        t12 = $[28];
    }
    return t12;
}
_c = TickerCard;
function SearchDropdown(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "69e441d101208998b54ce0fd44b57f5c1d94ca949bd192a68c607967b3485d01") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "69e441d101208998b54ce0fd44b57f5c1d94ca949bd192a68c607967b3485d01";
    }
    const { results, onSelect, visible } = t0;
    if (!visible || results.length === 0) {
        return null;
    }
    let t1;
    if ($[1] !== onSelect || $[2] !== results) {
        let t2;
        if ($[4] !== onSelect) {
            t2 = ({
                "SearchDropdown[results.map()]": (r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "SearchDropdown[results.map() > <button>.onClick]": ()=>onSelect(r.symbol)
                        }["SearchDropdown[results.map() > <button>.onClick]"],
                        className: "w-full text-left px-3 py-1.5 hover:bg-[#1b2b1b]/50 transition-colors flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-[#eab308] font-bold",
                                children: r.symbol
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                lineNumber: 161,
                                columnNumber: 179
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-[#6b7280] truncate ml-2",
                                children: r.name
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                lineNumber: 161,
                                columnNumber: 251
                            }, this)
                        ]
                    }, r.symbol, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                        lineNumber: 159,
                        columnNumber: 47
                    }, this)
            })["SearchDropdown[results.map()]"];
            $[4] = onSelect;
            $[5] = t2;
        } else {
            t2 = $[5];
        }
        t1 = results.map(t2);
        $[1] = onSelect;
        $[2] = results;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[6] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-full left-0 right-0 z-50 bg-[#0d1117] border border-[#1b2b1b] rounded-b-lg max-h-48 overflow-y-auto shadow-lg",
            children: t1
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 177,
            columnNumber: 10
        }, this);
        $[6] = t1;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    return t2;
}
_c1 = SearchDropdown;
function WatchlistPanel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(55);
    if ($[0] !== "69e441d101208998b54ce0fd44b57f5c1d94ca949bd192a68c607967b3485d01") {
        for(let $i = 0; $i < 55; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "69e441d101208998b54ce0fd44b57f5c1d94ca949bd192a68c607967b3485d01";
    }
    const { watchlist, onUpdateWatchlist, watchlistItems } = t0;
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {};
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [quotes, setQuotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = [];
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t2);
    const [showSearch, setShowSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expandedNewsId, setExpandedNewsId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const searchTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t3;
    if ($[3] !== watchlist) {
        t3 = ({
            "WatchlistPanel[refreshQuotes]": async ()=>{
                for (const symbol of watchlist){
                    try {
                        const q = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchQuote"])(symbol);
                        setQuotes({
                            "WatchlistPanel[refreshQuotes > setQuotes()]": (prev)=>({
                                    ...prev,
                                    [symbol]: q
                                })
                        }["WatchlistPanel[refreshQuotes > setQuotes()]"]);
                    } catch  {}
                }
            }
        })["WatchlistPanel[refreshQuotes]"];
        $[3] = watchlist;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const refreshQuotes = t3;
    let t4;
    if ($[5] !== refreshQuotes || $[6] !== watchlist.length) {
        t4 = ({
            "WatchlistPanel[useEffect()]": ()=>{
                if (watchlist.length === 0) {
                    return;
                }
                refreshQuotes();
                const interval = setInterval(refreshQuotes, 30000);
                return ()=>clearInterval(interval);
            }
        })["WatchlistPanel[useEffect()]"];
        $[5] = refreshQuotes;
        $[6] = watchlist.length;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== refreshQuotes || $[9] !== watchlist) {
        t5 = [
            watchlist,
            refreshQuotes
        ];
        $[8] = refreshQuotes;
        $[9] = watchlist;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    let t7;
    if ($[11] !== input) {
        t6 = ({
            "WatchlistPanel[useEffect()]": ()=>{
                if (searchTimeout.current) {
                    clearTimeout(searchTimeout.current);
                }
                if (input.length < 2) {
                    setSearchResults([]);
                    setShowSearch(false);
                    return;
                }
                searchTimeout.current = setTimeout({
                    "WatchlistPanel[useEffect() > setTimeout()]": async ()=>{
                        try {
                            const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchStocks"])(input);
                            setSearchResults(results);
                            setShowSearch(true);
                        } catch  {
                            setSearchResults([]);
                        }
                    }
                }["WatchlistPanel[useEffect() > setTimeout()]"], 300);
                return ()=>{
                    if (searchTimeout.current) {
                        clearTimeout(searchTimeout.current);
                    }
                };
            }
        })["WatchlistPanel[useEffect()]"];
        t7 = [
            input
        ];
        $[11] = input;
        $[12] = t6;
        $[13] = t7;
    } else {
        t6 = $[12];
        t7 = $[13];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t6, t7);
    let t8;
    let t9;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "WatchlistPanel[useEffect()]": ()=>{
                const handleClick = function handleClick(e) {
                    if (containerRef.current && !containerRef.current.contains(e.target)) {
                        setShowSearch(false);
                    }
                };
                document.addEventListener("mousedown", handleClick);
                return ()=>document.removeEventListener("mousedown", handleClick);
            }
        })["WatchlistPanel[useEffect()]"];
        t9 = [];
        $[14] = t8;
        $[15] = t9;
    } else {
        t8 = $[14];
        t9 = $[15];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t8, t9);
    let t10;
    if ($[16] !== onUpdateWatchlist || $[17] !== watchlist) {
        t10 = ({
            "WatchlistPanel[addTicker]": (symbol_0)=>{
                const ticker = symbol_0.trim().toUpperCase();
                if (ticker && !watchlist.includes(ticker)) {
                    onUpdateWatchlist([
                        ...watchlist,
                        ticker
                    ]);
                }
                setInput("");
                setShowSearch(false);
                setSearchResults([]);
            }
        })["WatchlistPanel[addTicker]"];
        $[16] = onUpdateWatchlist;
        $[17] = watchlist;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    const addTicker = t10;
    let t11;
    if ($[19] !== onUpdateWatchlist || $[20] !== watchlist) {
        t11 = ({
            "WatchlistPanel[removeTicker]": (ticker_0)=>{
                onUpdateWatchlist(watchlist.filter({
                    "WatchlistPanel[removeTicker > watchlist.filter()]": (t)=>t !== ticker_0
                }["WatchlistPanel[removeTicker > watchlist.filter()]"]));
            }
        })["WatchlistPanel[removeTicker]"];
        $[19] = onUpdateWatchlist;
        $[20] = watchlist;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    const removeTicker = t11;
    let t12;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold",
            children: "Watchlist"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 370,
            columnNumber: 11
        }, this);
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    let t13;
    if ($[23] !== watchlist.length) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]",
            children: [
                t12,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] text-[#374151] font-bold",
                    children: watchlist.length
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                    lineNumber: 377,
                    columnNumber: 103
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 377,
            columnNumber: 11
        }, this);
        $[23] = watchlist.length;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3 text-[#374151] shrink-0",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                lineNumber: 385,
                columnNumber: 114
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 385,
            columnNumber: 11
        }, this);
        $[25] = t14;
    } else {
        t14 = $[25];
    }
    let t15;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = ({
            "WatchlistPanel[<input>.onChange]": (e_0)=>setInput(e_0.target.value)
        })["WatchlistPanel[<input>.onChange]"];
        $[26] = t15;
    } else {
        t15 = $[26];
    }
    let t16;
    if ($[27] !== addTicker || $[28] !== input || $[29] !== searchResults[0] || $[30] !== searchResults.length) {
        t16 = ({
            "WatchlistPanel[<input>.onKeyDown]": (e_1)=>{
                if (e_1.key === "Enter" && searchResults.length > 0) {
                    addTicker(searchResults[0].symbol);
                } else {
                    if (e_1.key === "Enter" && input.length >= 2) {
                        addTicker(input);
                    }
                }
            }
        })["WatchlistPanel[<input>.onKeyDown]"];
        $[27] = addTicker;
        $[28] = input;
        $[29] = searchResults[0];
        $[30] = searchResults.length;
        $[31] = t16;
    } else {
        t16 = $[31];
    }
    let t17;
    if ($[32] !== searchResults.length) {
        t17 = ({
            "WatchlistPanel[<input>.onFocus]": ()=>searchResults.length > 0 && setShowSearch(true)
        })["WatchlistPanel[<input>.onFocus]"];
        $[32] = searchResults.length;
        $[33] = t17;
    } else {
        t17 = $[33];
    }
    let t18;
    if ($[34] !== input || $[35] !== t16 || $[36] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1 px-2 py-1.5",
            children: [
                t14,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    value: input,
                    onChange: t15,
                    onKeyDown: t16,
                    onFocus: t17,
                    placeholder: "Search stocks... (e.g. Reliance, TCS)",
                    className: "flex-1 bg-transparent text-[11px] text-[#e5e7eb] placeholder-[#374151] outline-none"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                    lineNumber: 432,
                    columnNumber: 69
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 432,
            columnNumber: 11
        }, this);
        $[34] = input;
        $[35] = t16;
        $[36] = t17;
        $[37] = t18;
    } else {
        t18 = $[37];
    }
    let t19;
    if ($[38] !== addTicker || $[39] !== searchResults || $[40] !== showSearch) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchDropdown, {
            results: searchResults,
            onSelect: addTicker,
            visible: showSearch
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 442,
            columnNumber: 11
        }, this);
        $[38] = addTicker;
        $[39] = searchResults;
        $[40] = showSearch;
        $[41] = t19;
    } else {
        t19 = $[41];
    }
    let t20;
    if ($[42] !== t18 || $[43] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: "relative border-b border-[#1b2b1b]",
            children: [
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 452,
            columnNumber: 11
        }, this);
        $[42] = t18;
        $[43] = t19;
        $[44] = t20;
    } else {
        t20 = $[44];
    }
    let t21;
    if ($[45] !== expandedNewsId || $[46] !== quotes || $[47] !== removeTicker || $[48] !== watchlist || $[49] !== watchlistItems) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-y-auto p-2 space-y-1.5",
            children: watchlist.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-16 text-[10px] text-[#374151]",
                children: "Search and add stocks to your watchlist"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                lineNumber: 461,
                columnNumber: 93
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    watchlist.map({
                        "WatchlistPanel[watchlist.map()]": (symbol_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TickerCard, {
                                symbol: symbol_1,
                                quote: quotes[symbol_1] ?? null,
                                onRemove: {
                                    "WatchlistPanel[watchlist.map() > <TickerCard>.onRemove]": ()=>removeTicker(symbol_1)
                                }["WatchlistPanel[watchlist.map() > <TickerCard>.onRemove]"]
                            }, symbol_1, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                lineNumber: 462,
                                columnNumber: 58
                            }, this)
                    }["WatchlistPanel[watchlist.map()]"]),
                    watchlistItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 pt-2 border-t border-[#1b2b1b]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[9px] text-[#374151] uppercase font-bold mb-1",
                                children: "Related News"
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                lineNumber: 465,
                                columnNumber: 130
                            }, this),
                            watchlistItems.slice(0, 15).map({
                                "WatchlistPanel[(anonymous)()]": (item)=>{
                                    const pub = formatIST(item.published_at);
                                    const isExpanded = expandedNewsId === item.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `py-1.5 text-[10px] border-b border-[#1b2b1b]/30 cursor-pointer hover:bg-[#1b2b1b]/20 transition-colors ${isExpanded ? "bg-[#0a1a0a]" : ""}`,
                                        onClick: {
                                            "WatchlistPanel[(anonymous)() > <div>.onClick]": ()=>setExpandedNewsId(isExpanded ? null : item.id)
                                        }["WatchlistPanel[(anonymous)() > <div>.onClick]"],
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[#6b7280]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold text-[#e5e7eb] mr-1.5",
                                                        children: pub
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 99
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#eab308] font-bold mr-1",
                                                        children: item.tickers[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 173
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Highlight"], {
                                                        text: item.summary || item.headline,
                                                        keyFigures: item.key_figures
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 245
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                lineNumber: 471,
                                                columnNumber: 67
                                            }, this),
                                            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 pl-1 space-y-1.5 text-[10px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[#e5e7eb]",
                                                        children: item.headline
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 397
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-1",
                                                        children: [
                                                            item.tickers.map(_WatchlistPanelAnonymousItemTickersMap),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-[9px] font-bold px-1 py-0.5 rounded ${item.sentiment === "positive" ? "text-[#10b981] bg-[#10b981]/10" : item.sentiment === "negative" ? "text-[#ef4444] bg-[#ef4444]/10" : "text-[#6b7280] bg-[#6b7280]/10"}`,
                                                                children: item.sentiment
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                                lineNumber: 471,
                                                                columnNumber: 546
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-[9px] font-bold px-1 py-0.5 rounded ${item.impact === "high" ? "text-[#f59e0b] bg-[#f59e0b]/10" : "text-[#374151] bg-[#374151]/10"}`,
                                                                children: item.impact
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                                lineNumber: 471,
                                                                columnNumber: 800
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 450
                                                    }, this),
                                                    item.raw_content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[#6b7280] max-h-24 overflow-y-auto whitespace-pre-wrap",
                                                        children: item.raw_content
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 1004
                                                    }, this),
                                                    item.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: item.url,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "text-[#10b981] hover:underline",
                                                        onClick: _WatchlistPanelAnonymousAOnClick,
                                                        children: "Open source →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 1119
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                                lineNumber: 471,
                                                columnNumber: 346
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                                        lineNumber: 469,
                                        columnNumber: 22
                                    }, this);
                                }
                            }["WatchlistPanel[(anonymous)()]"])
                        ]
                    }, void 0, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
                        lineNumber: 465,
                        columnNumber: 77
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 461,
            columnNumber: 11
        }, this);
        $[45] = expandedNewsId;
        $[46] = quotes;
        $[47] = removeTicker;
        $[48] = watchlist;
        $[49] = watchlistItems;
        $[50] = t21;
    } else {
        t21 = $[50];
    }
    let t22;
    if ($[51] !== t13 || $[52] !== t20 || $[53] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col h-full",
            children: [
                t13,
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
            lineNumber: 485,
            columnNumber: 11
        }, this);
        $[51] = t13;
        $[52] = t20;
        $[53] = t21;
        $[54] = t22;
    } else {
        t22 = $[54];
    }
    return t22;
}
_s(WatchlistPanel, "EUPmCbAtTIQDn4viUZWgZ4qkhuk=");
_c2 = WatchlistPanel;
function _WatchlistPanelAnonymousAOnClick(e_2) {
    return e_2.stopPropagation();
}
function _WatchlistPanelAnonymousItemTickersMap(t_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-[9px] text-[#eab308] font-bold bg-[#eab308]/10 px-1 py-0.5 rounded",
        children: t_0
    }, t_0, false, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx",
        lineNumber: 499,
        columnNumber: 10
    }, this);
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TickerCard");
__turbopack_context__.k.register(_c1, "SearchDropdown");
__turbopack_context__.k.register(_c2, "WatchlistPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecentFilings",
    ()=>RecentFilings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const SENTIMENT_DOT = {
    positive: "bg-[#10b981]",
    negative: "bg-[#ef4444]",
    neutral: "bg-[#6b7280]"
};
const IMPACT_STYLE = {
    high: "text-[#f59e0b] bg-[#f59e0b]/10",
    medium: "text-[#6b7280] bg-[#6b7280]/10",
    low: "text-[#374151] bg-[#374151]/10"
};
function formatIST(dateStr) {
    const dt = new Date(dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z");
    const istOffset = 5.5 * 60 * 60 * 1000;
    const ist = new Date(dt.getTime() + istOffset);
    return ist.toISOString().slice(11, 16);
}
function RecentFilings(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(32);
    if ($[0] !== "5afff2410b855d3b0b756d713122ccdbbe4d457e8048a0ac5b7f4ba61eddb733") {
        for(let $i = 0; $i < 32; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5afff2410b855d3b0b756d713122ccdbbe4d457e8048a0ac5b7f4ba61eddb733";
    }
    const { items } = t0;
    const [expandedId, setExpandedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let filings;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    if ($[1] !== expandedId || $[2] !== items) {
        filings = items.slice(0, 30);
        t5 = "bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col h-full";
        let t7;
        if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold",
                children: "Recent Filings"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                lineNumber: 49,
                columnNumber: 12
            }, this);
            $[10] = t7;
        } else {
            t7 = $[10];
        }
        if ($[11] !== items.length) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]",
                children: [
                    t7,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-[#374151] font-bold",
                        children: items.length
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                        lineNumber: 55,
                        columnNumber: 103
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                lineNumber: 55,
                columnNumber: 12
            }, this);
            $[11] = items.length;
            $[12] = t6;
        } else {
            t6 = $[12];
        }
        t4 = "flex-1 overflow-y-auto";
        t2 = "w-full text-[11px]";
        if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                    className: "text-[9px] text-[#374151] uppercase border-b border-[#1b2b1b] sticky top-0 bg-[#0d1117]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                            className: "text-left px-3 py-1.5 w-14",
                            children: "Time"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                            lineNumber: 64,
                            columnNumber: 123
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                            className: "text-left px-3 py-1.5 w-24",
                            children: "Symbol"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                            lineNumber: 64,
                            columnNumber: 175
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                            className: "text-left px-3 py-1.5",
                            children: "Headline"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                            lineNumber: 64,
                            columnNumber: 229
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                            className: "text-center px-3 py-1.5 w-16",
                            children: "Impact"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                            lineNumber: 64,
                            columnNumber: 280
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                            className: "text-center px-3 py-1.5 w-10",
                            children: "Sent."
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                            lineNumber: 64,
                            columnNumber: 336
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                    lineNumber: 64,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                lineNumber: 64,
                columnNumber: 12
            }, this);
            $[13] = t3;
        } else {
            t3 = $[13];
        }
        let t8;
        if ($[14] !== expandedId) {
            t8 = ({
                "RecentFilings[filings.map()]": (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-[#1b2b1b]/30 hover:bg-[#1b2b1b]/20 transition-colors cursor-pointer",
                                onClick: {
                                    "RecentFilings[filings.map() > <tr>.onClick]": ()=>setExpandedId(expandedId === item.id ? null : item.id)
                                }["RecentFilings[filings.map() > <tr>.onClick]"],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-1.5 font-bold text-[#e5e7eb] tabular-nums",
                                        children: formatIST(item.published_at)
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                        lineNumber: 74,
                                        columnNumber: 61
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-1.5 text-[#eab308] font-bold",
                                        children: item.tickers[0] || "--"
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                        lineNumber: 74,
                                        columnNumber: 162
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-1.5 text-[#e5e7eb] truncate max-w-0",
                                        children: item.summary || item.headline
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                        lineNumber: 74,
                                        columnNumber: 245
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-1.5 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[8px] uppercase font-bold px-1.5 py-0.5 rounded ${IMPACT_STYLE[item.impact] || IMPACT_STYLE.low}`,
                                            children: item.impact
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                            lineNumber: 74,
                                            columnNumber: 381
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                        lineNumber: 74,
                                        columnNumber: 341
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-1.5 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `w-2 h-2 rounded-full inline-block ${SENTIMENT_DOT[item.sentiment] || SENTIMENT_DOT.neutral}`
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                            lineNumber: 74,
                                            columnNumber: 568
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                        lineNumber: 74,
                                        columnNumber: 528
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                lineNumber: 72,
                                columnNumber: 51
                            }, this),
                            expandedId === item.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: 5,
                                    className: "px-3 py-2 bg-[#0a1a0a]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[#e5e7eb]",
                                                children: item.headline
                                            }, void 0, false, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                                lineNumber: 74,
                                                columnNumber: 841
                                            }, this),
                                            item.raw_content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[#6b7280] max-h-24 overflow-y-auto whitespace-pre-wrap",
                                                children: item.raw_content
                                            }, void 0, false, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                                lineNumber: 74,
                                                columnNumber: 915
                                            }, this),
                                            item.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: item.url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "text-[#10b981] hover:underline",
                                                onClick: _RecentFilingsFilingsMapAOnClick,
                                                children: "Open source →"
                                            }, void 0, false, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                                lineNumber: 74,
                                                columnNumber: 1030
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                        lineNumber: 74,
                                        columnNumber: 800
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                    lineNumber: 74,
                                    columnNumber: 749
                                }, this)
                            }, `${item.id}-detail`, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
                                lineNumber: 74,
                                columnNumber: 719
                            }, this)
                        ]
                    }, void 0, true)
            })["RecentFilings[filings.map()]"];
            $[14] = expandedId;
            $[15] = t8;
        } else {
            t8 = $[15];
        }
        t1 = filings.map(t8);
        $[1] = expandedId;
        $[2] = items;
        $[3] = filings;
        $[4] = t1;
        $[5] = t2;
        $[6] = t3;
        $[7] = t4;
        $[8] = t5;
        $[9] = t6;
    } else {
        filings = $[3];
        t1 = $[4];
        t2 = $[5];
        t3 = $[6];
        t4 = $[7];
        t5 = $[8];
        t6 = $[9];
    }
    let t7;
    if ($[16] !== t1) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            children: t1
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[16] = t1;
        $[17] = t7;
    } else {
        t7 = $[17];
    }
    let t8;
    if ($[18] !== t2 || $[19] !== t3 || $[20] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: t2,
            children: [
                t3,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
            lineNumber: 110,
            columnNumber: 10
        }, this);
        $[18] = t2;
        $[19] = t3;
        $[20] = t7;
        $[21] = t8;
    } else {
        t8 = $[21];
    }
    let t9;
    if ($[22] !== filings.length) {
        t9 = filings.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-16 text-[10px] text-[#374151]",
            children: "No filings yet"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
            lineNumber: 120,
            columnNumber: 34
        }, this);
        $[22] = filings.length;
        $[23] = t9;
    } else {
        t9 = $[23];
    }
    let t10;
    if ($[24] !== t4 || $[25] !== t8 || $[26] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: [
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
            lineNumber: 128,
            columnNumber: 11
        }, this);
        $[24] = t4;
        $[25] = t8;
        $[26] = t9;
        $[27] = t10;
    } else {
        t10 = $[27];
    }
    let t11;
    if ($[28] !== t10 || $[29] !== t5 || $[30] !== t6) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            children: [
                t6,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx",
            lineNumber: 138,
            columnNumber: 11
        }, this);
        $[28] = t10;
        $[29] = t5;
        $[30] = t6;
        $[31] = t11;
    } else {
        t11 = $[31];
    }
    return t11;
}
_s(RecentFilings, "qpIQi94hcn+lxkJWgZG2jWze6qI=");
_c = RecentFilings;
function _RecentFilingsFilingsMapAOnClick(e) {
    return e.stopPropagation();
}
var _c;
__turbopack_context__.k.register(_c, "RecentFilings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/lib/route-news.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFilingItem",
    ()=>isFilingItem,
    "isHighImpactAlert",
    ()=>isHighImpactAlert,
    "matchesWatchlist",
    ()=>matchesWatchlist,
    "routeAllNews",
    ()=>routeAllNews,
    "routeToPanel",
    ()=>routeToPanel
]);
const GEO_KEYWORDS = [
    "war",
    "iran",
    "china",
    "fed",
    "oil",
    "crude",
    "dollar",
    "euro",
    "tariff",
    "global",
    "us market",
    "wall street",
    "nasdaq",
    "dow jones",
    "s&p 500",
    "opec",
    "brent",
    "wti",
    "forex",
    "yen",
    "yuan",
    "trump",
    "russia",
    "ukraine",
    "gaza",
    "israel",
    "sanctions",
    "geopolitical"
];
const STOCK_CATEGORIES = [
    "earnings",
    "order_win",
    "corporate_filing",
    "management_change",
    "offer_announcement",
    "broker_report"
];
function isHighImpactAlert(item) {
    return item.impact === "high" && item.sentiment !== "neutral";
}
function routeToPanel(item) {
    if (item.category === "regulatory") {
        return "govt_regulatory";
    }
    if (item.tickers.length > 0 && STOCK_CATEGORIES.includes(item.category)) {
        return "ticker_alerts";
    }
    if (item.tickers.length === 0) {
        const text = `${item.headline} ${item.summary}`.toLowerCase();
        if (GEO_KEYWORDS.some((kw)=>text.includes(kw))) {
            return "global_geo";
        }
    }
    return "market_pulse";
}
function isFilingItem(item) {
    return item.category === "corporate_filing";
}
function matchesWatchlist(item, watchlist) {
    if (watchlist.length === 0) return false;
    return item.tickers.some((t)=>watchlist.some((w)=>t.toUpperCase() === w.toUpperCase()));
}
function routeAllNews(items, watchlist) {
    const result = {
        highImpact: [],
        tickerAlerts: [],
        watchlistItems: [],
        marketPulse: [],
        globalGeo: [],
        govtRegulatory: [],
        recentFilings: []
    };
    for (const item of items){
        if (isHighImpactAlert(item)) {
            result.highImpact.push(item);
        }
        if (isFilingItem(item)) {
            result.recentFilings.push(item);
        }
        if (matchesWatchlist(item, watchlist)) {
            result.watchlistItems.push(item);
        }
        const panel = routeToPanel(item);
        switch(panel){
            case "ticker_alerts":
                result.tickerAlerts.push(item);
                break;
            case "market_pulse":
                result.marketPulse.push(item);
                break;
            case "global_geo":
                result.globalGeo.push(item);
                break;
            case "govt_regulatory":
                result.govtRegulatory.push(item);
                break;
        }
    }
    return result;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/lib/sounds.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "playAlertSound",
    ()=>playAlertSound
]);
let audioContext = null;
function getAudioContext() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    return audioContext;
}
function playAlertSound(type) {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        if (type === "positive") {
            oscillator.frequency.setValueAtTime(523, ctx.currentTime);
            oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
        } else {
            oscillator.frequency.setValueAtTime(659, ctx.currentTime);
            oscillator.frequency.setValueAtTime(440, ctx.currentTime + 0.15);
        }
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
    } catch  {
    // Audio not available
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/react-resizable-panels/dist/react-resizable-panels.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$HighImpactStrip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/HighImpactStrip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$SentimentDonut$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/SentimentDonut.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$NewsVelocity$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/NewsVelocity.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$NewsPanelCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/NewsPanelCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/WatchlistPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$RecentFilings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/RecentFilings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$route$2d$news$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/lib/route-news.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/lib/sounds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function loadWatchlist() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return JSON.parse(localStorage.getItem("pm_watchlist") || "[]");
    } catch  {
        return [];
    }
}
function saveWatchlist(tickers) {
    localStorage.setItem("pm_watchlist", JSON.stringify(tickers));
}
/* thin green drag handle */ function ResizeH() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "8f77a416d6aa54778e1965cc5597a7180d752b43f98ae2ff7dd2943a2047a6ab") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8f77a416d6aa54778e1965cc5597a7180d752b43f98ae2ff7dd2943a2047a6ab";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
            className: "w-[5px] shrink-0 bg-[#1b2b1b]/40 hover:bg-[#10b981]/60 active:bg-[#10b981] transition-colors cursor-col-resize rounded mx-px"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 40,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c = ResizeH;
function ResizeV() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "8f77a416d6aa54778e1965cc5597a7180d752b43f98ae2ff7dd2943a2047a6ab") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8f77a416d6aa54778e1965cc5597a7180d752b43f98ae2ff7dd2943a2047a6ab";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
            className: "h-[5px] shrink-0 bg-[#1b2b1b]/40 hover:bg-[#10b981]/60 active:bg-[#10b981] transition-colors cursor-row-resize rounded my-px"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c1 = ResizeV;
function Dashboard() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(77);
    if ($[0] !== "8f77a416d6aa54778e1965cc5597a7180d752b43f98ae2ff7dd2943a2047a6ab") {
        for(let $i = 0; $i < 77; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8f77a416d6aa54778e1965cc5597a7180d752b43f98ae2ff7dd2943a2047a6ab";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [indices, setIndices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = [];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const [marketStatus, setMarketStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t2);
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = [];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const [watchlist, setWatchlist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t3);
    const [soundEnabled, setSoundEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const soundEnabledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    let t4;
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "Dashboard[useEffect()]": ()=>{
                setWatchlist(loadWatchlist());
                const stored = localStorage.getItem("pm_sound");
                if (stored === "false") {
                    setSoundEnabled(false);
                    soundEnabledRef.current = false;
                }
            }
        })["Dashboard[useEffect()]"];
        t5 = [];
        $[5] = t4;
        $[6] = t5;
    } else {
        t4 = $[5];
        t5 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "Dashboard[updateWatchlist]": (tickers)=>{
                setWatchlist(tickers);
                saveWatchlist(tickers);
            }
        })["Dashboard[updateWatchlist]"];
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    const updateWatchlist = t6;
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "Dashboard[toggleSound]": ()=>{
                setSoundEnabled({
                    "Dashboard[toggleSound > setSoundEnabled()]": (prev)=>{
                        const next = !prev;
                        soundEnabledRef.current = next;
                        localStorage.setItem("pm_sound", String(next));
                        return next;
                    }
                }["Dashboard[toggleSound > setSoundEnabled()]"]);
            }
        })["Dashboard[toggleSound]"];
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    const toggleSound = t7;
    let t8;
    let t9;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "Dashboard[useEffect()]": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchNews"])(1000).then(setItems).catch(console.error);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchStats"])().then(setStats).catch(console.error);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchIndices"])().then(setIndices).catch(console.error);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMarketStatus"])().then(setMarketStatus).catch(console.error);
            }
        })["Dashboard[useEffect()]"];
        t9 = [];
        $[9] = t8;
        $[10] = t9;
    } else {
        t8 = $[9];
        t9 = $[10];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t8, t9);
    let t10;
    let t11;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = ({
            "Dashboard[useEffect()]": ()=>{
                const si = setInterval({
                    "Dashboard[useEffect() > setInterval()]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchStats"])().then(setStats).catch(console.error)
                }["Dashboard[useEffect() > setInterval()]"], 30000);
                const ii = setInterval({
                    "Dashboard[useEffect() > setInterval()]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchIndices"])().then(setIndices).catch(console.error)
                }["Dashboard[useEffect() > setInterval()]"], 30000);
                const mi = setInterval({
                    "Dashboard[useEffect() > setInterval()]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMarketStatus"])().then(setMarketStatus).catch(console.error)
                }["Dashboard[useEffect() > setInterval()]"], 60000);
                return ()=>{
                    clearInterval(si);
                    clearInterval(ii);
                    clearInterval(mi);
                };
            }
        })["Dashboard[useEffect()]"];
        t11 = [];
        $[11] = t10;
        $[12] = t11;
    } else {
        t10 = $[11];
        t11 = $[12];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t10, t11);
    let t12;
    let t13;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "Dashboard[useEffect()]": ()=>{
                const es = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSSEConnection"])({
                    "Dashboard[useEffect() > createSSEConnection(arg0)]": (newItem)=>{
                        setItems({
                            "Dashboard[useEffect() > createSSEConnection(arg0) > setItems()]": (prev_0)=>[
                                    newItem,
                                    ...prev_0
                                ]
                        }["Dashboard[useEffect() > createSSEConnection(arg0) > setItems()]"]);
                        if (soundEnabledRef.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$route$2d$news$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHighImpactAlert"])(newItem)) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playAlertSound"])(newItem.sentiment === "positive" ? "positive" : "negative");
                        }
                    }
                }["Dashboard[useEffect() > createSSEConnection(arg0)]"], {
                    "Dashboard[useEffect() > createSSEConnection(arg1)]": ()=>setConnected(true)
                }["Dashboard[useEffect() > createSSEConnection(arg1)]"], {
                    "Dashboard[useEffect() > createSSEConnection(arg2)]": ()=>setConnected(false)
                }["Dashboard[useEffect() > createSSEConnection(arg2)]"]);
                return ()=>es.close();
            }
        })["Dashboard[useEffect()]"];
        t13 = [];
        $[13] = t12;
        $[14] = t13;
    } else {
        t12 = $[13];
        t13 = $[14];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t12, t13);
    let t14;
    if ($[15] !== items || $[16] !== watchlist) {
        t14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$route$2d$news$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routeAllNews"])(items, watchlist);
        $[15] = items;
        $[16] = watchlist;
        $[17] = t14;
    } else {
        t14 = $[17];
    }
    const routed = t14;
    let t15;
    if ($[18] !== connected || $[19] !== indices || $[20] !== items.length || $[21] !== marketStatus || $[22] !== soundEnabled) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
            indices: indices,
            marketStatus: marketStatus,
            connected: connected,
            soundEnabled: soundEnabled,
            onToggleSound: toggleSound,
            totalItems: items.length
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 251,
            columnNumber: 11
        }, this);
        $[18] = connected;
        $[19] = indices;
        $[20] = items.length;
        $[21] = marketStatus;
        $[22] = soundEnabled;
        $[23] = t15;
    } else {
        t15 = $[23];
    }
    let t16;
    if ($[24] !== routed.highImpact) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$HighImpactStrip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HighImpactStrip"], {
            items: routed.highImpact
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 263,
            columnNumber: 11
        }, this);
        $[24] = routed.highImpact;
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    let t17;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = {
            height: "100%"
        };
        $[26] = t17;
    } else {
        t17 = $[26];
    }
    let t18;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = {
            height: "100%"
        };
        $[27] = t18;
    } else {
        t18 = $[27];
    }
    let t19;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = {
            height: "100%"
        };
        $[28] = t19;
    } else {
        t19 = $[28];
    }
    let t20;
    if ($[29] !== stats) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-1/2 min-w-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$SentimentDonut$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SentimentDonut"], {
                stats: stats
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 298,
                columnNumber: 42
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 298,
            columnNumber: 11
        }, this);
        $[29] = stats;
        $[30] = t20;
    } else {
        t20 = $[30];
    }
    let t21;
    if ($[31] !== stats) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-1/2 min-w-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$NewsVelocity$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewsVelocity"], {
                stats: stats
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 306,
                columnNumber: 42
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 306,
            columnNumber: 11
        }, this);
        $[31] = stats;
        $[32] = t21;
    } else {
        t21 = $[32];
    }
    let t22;
    if ($[33] !== t20 || $[34] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 35,
            minSize: 20,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5 h-full",
                children: [
                    t20,
                    t21
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 314,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 314,
            columnNumber: 11
        }, this);
        $[33] = t20;
        $[34] = t21;
        $[35] = t22;
    } else {
        t22 = $[35];
    }
    let t23;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeV, {}, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 323,
            columnNumber: 11
        }, this);
        $[36] = t23;
    } else {
        t23 = $[36];
    }
    let t24;
    if ($[37] !== routed.watchlistItems || $[38] !== watchlist) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 65,
            minSize: 30,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WatchlistPanel"], {
                watchlist: watchlist,
                onUpdateWatchlist: updateWatchlist,
                watchlistItems: routed.watchlistItems
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 330,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 330,
            columnNumber: 11
        }, this);
        $[37] = routed.watchlistItems;
        $[38] = watchlist;
        $[39] = t24;
    } else {
        t24 = $[39];
    }
    let t25;
    if ($[40] !== t22 || $[41] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 25,
            minSize: 15,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                orientation: "vertical",
                style: t19,
                children: [
                    t22,
                    t23,
                    t24
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 339,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 339,
            columnNumber: 11
        }, this);
        $[40] = t22;
        $[41] = t24;
        $[42] = t25;
    } else {
        t25 = $[42];
    }
    let t26;
    if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeH, {}, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 348,
            columnNumber: 11
        }, this);
        $[43] = t26;
    } else {
        t26 = $[43];
    }
    let t27;
    if ($[44] !== routed.tickerAlerts) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 45,
            minSize: 25,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$NewsPanelCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewsPanelCard"], {
                title: "Ticker Alerts",
                items: routed.tickerAlerts,
                emptyMessage: "No stock-specific news yet",
                enableSentimentFilter: true
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 355,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 355,
            columnNumber: 11
        }, this);
        $[44] = routed.tickerAlerts;
        $[45] = t27;
    } else {
        t27 = $[45];
    }
    let t28;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeH, {}, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 363,
            columnNumber: 11
        }, this);
        $[46] = t28;
    } else {
        t28 = $[46];
    }
    let t29;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = {
            height: "100%"
        };
        $[47] = t29;
    } else {
        t29 = $[47];
    }
    let t30;
    if ($[48] !== routed.govtRegulatory) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 50,
            minSize: 25,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$NewsPanelCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewsPanelCard"], {
                title: "Govt & Regulatory",
                items: routed.govtRegulatory,
                emptyMessage: "No regulatory news",
                showTickers: false
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 379,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 379,
            columnNumber: 11
        }, this);
        $[48] = routed.govtRegulatory;
        $[49] = t30;
    } else {
        t30 = $[49];
    }
    let t31;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeV, {}, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 387,
            columnNumber: 11
        }, this);
        $[50] = t31;
    } else {
        t31 = $[50];
    }
    let t32;
    if ($[51] !== routed.globalGeo) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 50,
            minSize: 25,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$NewsPanelCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewsPanelCard"], {
                title: "Global & Geopolitical",
                items: routed.globalGeo,
                emptyMessage: "No global news",
                showTickers: false
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 394,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 394,
            columnNumber: 11
        }, this);
        $[51] = routed.globalGeo;
        $[52] = t32;
    } else {
        t32 = $[52];
    }
    let t33;
    if ($[53] !== t30 || $[54] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 30,
            minSize: 15,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                orientation: "vertical",
                style: t29,
                children: [
                    t30,
                    t31,
                    t32
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 402,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 402,
            columnNumber: 11
        }, this);
        $[53] = t30;
        $[54] = t32;
        $[55] = t33;
    } else {
        t33 = $[55];
    }
    let t34;
    if ($[56] !== t25 || $[57] !== t27 || $[58] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 70,
            minSize: 35,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                orientation: "horizontal",
                style: t18,
                children: [
                    t25,
                    t26,
                    t27,
                    t28,
                    t33
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 411,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 411,
            columnNumber: 11
        }, this);
        $[56] = t25;
        $[57] = t27;
        $[58] = t33;
        $[59] = t34;
    } else {
        t34 = $[59];
    }
    let t35;
    if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeV, {}, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 421,
            columnNumber: 11
        }, this);
        $[60] = t35;
    } else {
        t35 = $[60];
    }
    let t36;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = {
            height: "100%"
        };
        $[61] = t36;
    } else {
        t36 = $[61];
    }
    let t37;
    if ($[62] !== routed.marketPulse) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 55,
            minSize: 25,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$NewsPanelCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewsPanelCard"], {
                title: "Market Pulse",
                items: routed.marketPulse,
                emptyMessage: "No market news"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 437,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 437,
            columnNumber: 11
        }, this);
        $[62] = routed.marketPulse;
        $[63] = t37;
    } else {
        t37 = $[63];
    }
    let t38;
    if ($[64] === Symbol.for("react.memo_cache_sentinel")) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeH, {}, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 445,
            columnNumber: 11
        }, this);
        $[64] = t38;
    } else {
        t38 = $[64];
    }
    let t39;
    if ($[65] !== routed.recentFilings) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 45,
            minSize: 20,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$RecentFilings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecentFilings"], {
                items: routed.recentFilings
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 452,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 452,
            columnNumber: 11
        }, this);
        $[65] = routed.recentFilings;
        $[66] = t39;
    } else {
        t39 = $[66];
    }
    let t40;
    if ($[67] !== t37 || $[68] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            defaultSize: 30,
            minSize: 15,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                orientation: "horizontal",
                style: t36,
                children: [
                    t37,
                    t38,
                    t39
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 460,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 460,
            columnNumber: 11
        }, this);
        $[67] = t37;
        $[68] = t39;
        $[69] = t40;
    } else {
        t40 = $[69];
    }
    let t41;
    if ($[70] !== t34 || $[71] !== t40) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 min-h-0 p-1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                orientation: "vertical",
                style: t17,
                children: [
                    t34,
                    t35,
                    t40
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
                lineNumber: 469,
                columnNumber: 49
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 469,
            columnNumber: 11
        }, this);
        $[70] = t34;
        $[71] = t40;
        $[72] = t41;
    } else {
        t41 = $[72];
    }
    let t42;
    if ($[73] !== t15 || $[74] !== t16 || $[75] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen flex flex-col overflow-hidden bg-[#080c08]",
            children: [
                t15,
                t16,
                t41
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/page.tsx",
            lineNumber: 478,
            columnNumber: 11
        }, this);
        $[73] = t15;
        $[74] = t16;
        $[75] = t41;
        $[76] = t42;
    } else {
        t42 = $[76];
    }
    return t42;
}
_s(Dashboard, "BY8ZY+vc2GvQ5lEDvimQELOPWT4=");
_c2 = Dashboard;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ResizeH");
__turbopack_context__.k.register(_c1, "ResizeV");
__turbopack_context__.k.register(_c2, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=internship_paisaMachine_frontend_app_550c3c72._.js.map