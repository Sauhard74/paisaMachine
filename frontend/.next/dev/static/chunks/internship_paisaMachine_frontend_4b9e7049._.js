(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsItem",
    ()=>NewsItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const SOURCE_LABELS = {
    nse_json_api: "NSE API",
    bse_json_api: "BSE API",
    zerodha_pulse: "Zerodha",
    economic_times: "EcoTimes",
    livemint: "Mint",
    ndtv_profit: "NDTV",
    bloomberg: "Bloombg",
    tradingview: "TradView",
    screener: "Screener",
    twitter_redbox: "Redbox",
    twitter_nse: "NSE Tw",
    twitter_bse: "BSE Tw",
    twitter_capmkt: "CapMkt"
};
const SENTIMENT_CONFIG = {
    positive: {
        arrow: "\u25B2",
        color: "text-green-400"
    },
    negative: {
        arrow: "\u25BC",
        color: "text-red-400"
    },
    neutral: {
        arrow: "\u25CF",
        color: "text-gray-400"
    }
};
function NewsItem(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(44);
    if ($[0] !== "8b32efedcf00323b0447e6b9a20170988390a88147215ee7a2219c52b9c78238") {
        for(let $i = 0; $i < 44; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8b32efedcf00323b0447e6b9a20170988390a88147215ee7a2219c52b9c78238";
    }
    const { item } = t0;
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sent = SENTIMENT_CONFIG[item.sentiment];
    let t1;
    let time;
    if ($[1] !== item.ingested_at) {
        const dt = new Date(item.ingested_at.endsWith("Z") || item.ingested_at.includes("+") ? item.ingested_at : item.ingested_at + "Z");
        const ist = new Date(dt.getTime() + 19800000);
        time = ist.toISOString().slice(11, 19);
        t1 = ist.toISOString().slice(5, 10);
        $[1] = item.ingested_at;
        $[2] = t1;
        $[3] = time;
    } else {
        t1 = $[2];
        time = $[3];
    }
    const date = t1;
    const sourceLabel = SOURCE_LABELS[item.source] || item.source;
    const isHighImpact = item.impact === "high";
    const t2 = `border-b border-gray-800 px-4 py-2 cursor-pointer hover:bg-gray-900 transition-colors ${isHighImpact ? "border-l-2 border-l-yellow-500" : ""}`;
    let t3;
    if ($[4] !== expanded) {
        t3 = ({
            "NewsItem[<div>.onClick]": ()=>setExpanded(!expanded)
        })["NewsItem[<div>.onClick]"];
        $[4] = expanded;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== date || $[7] !== time) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-gray-500 font-mono w-28",
            children: [
                date,
                " ",
                time
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 93,
            columnNumber: 10
        }, this);
        $[6] = date;
        $[7] = time;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== sourceLabel) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-blue-400 font-mono w-16",
            children: sourceLabel
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[9] = sourceLabel;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== item.tickers) {
        t6 = item.tickers.join(", ") || "\u2014";
        $[11] = item.tickers;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-yellow-300 font-mono font-bold",
            children: t6
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 118,
            columnNumber: 10
        }, this);
        $[13] = t6;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    const t8 = `${sent.color} font-mono`;
    let t9;
    if ($[15] !== item.sentiment || $[16] !== sent.arrow || $[17] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t8,
            children: [
                sent.arrow,
                " ",
                item.sentiment
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 127,
            columnNumber: 10
        }, this);
        $[15] = item.sentiment;
        $[16] = sent.arrow;
        $[17] = t8;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== item.category) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-gray-500 font-mono",
            children: item.category
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[19] = item.category;
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    let t11;
    if ($[21] !== isHighImpact) {
        t11 = isHighImpact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-yellow-500 font-bold text-[10px] uppercase",
            children: "HIGH"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 145,
            columnNumber: 27
        }, this);
        $[21] = isHighImpact;
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    let t12;
    if ($[23] !== t10 || $[24] !== t11 || $[25] !== t4 || $[26] !== t5 || $[27] !== t7 || $[28] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 text-xs",
            children: [
                t4,
                t5,
                t7,
                t9,
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 153,
            columnNumber: 11
        }, this);
        $[23] = t10;
        $[24] = t11;
        $[25] = t4;
        $[26] = t5;
        $[27] = t7;
        $[28] = t9;
        $[29] = t12;
    } else {
        t12 = $[29];
    }
    const t13 = item.summary || item.headline;
    let t14;
    if ($[30] !== item.key_figures || $[31] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-sm text-gray-200",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Highlight"], {
                text: t13,
                keyFigures: item.key_figures
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
                lineNumber: 167,
                columnNumber: 55
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 167,
            columnNumber: 11
        }, this);
        $[30] = item.key_figures;
        $[31] = t13;
        $[32] = t14;
    } else {
        t14 = $[32];
    }
    let t15;
    if ($[33] !== expanded || $[34] !== item.headline || $[35] !== item.raw_content || $[36] !== item.url) {
        t15 = expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 pl-4 border-l border-gray-700 text-xs space-y-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-400",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-500",
                            children: "Full: "
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
                            lineNumber: 176,
                            columnNumber: 124
                        }, this),
                        item.headline
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
                    lineNumber: 176,
                    columnNumber: 93
                }, this),
                item.raw_content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-500 max-h-32 overflow-y-auto",
                    children: item.raw_content
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
                    lineNumber: 176,
                    columnNumber: 211
                }, this),
                item.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: item.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-blue-400 hover:underline",
                    onClick: _NewsItemAOnClick,
                    children: "Open source →"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
                    lineNumber: 176,
                    columnNumber: 305
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 176,
            columnNumber: 23
        }, this);
        $[33] = expanded;
        $[34] = item.headline;
        $[35] = item.raw_content;
        $[36] = item.url;
        $[37] = t15;
    } else {
        t15 = $[37];
    }
    let t16;
    if ($[38] !== t12 || $[39] !== t14 || $[40] !== t15 || $[41] !== t2 || $[42] !== t3) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            onClick: t3,
            children: [
                t12,
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx",
            lineNumber: 187,
            columnNumber: 11
        }, this);
        $[38] = t12;
        $[39] = t14;
        $[40] = t15;
        $[41] = t2;
        $[42] = t3;
        $[43] = t16;
    } else {
        t16 = $[43];
    }
    return t16;
}
_s(NewsItem, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c = NewsItem;
function _NewsItemAOnClick(e) {
    return e.stopPropagation();
}
var _c;
__turbopack_context__.k.register(_c, "NewsItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/components/Filters.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Filters",
    ()=>Filters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
"use client";
;
;
const SOURCES = [
    {
        value: "",
        label: "All Sources"
    },
    {
        value: "nse_json_api",
        label: "NSE API"
    },
    {
        value: "bse_json_api",
        label: "BSE API"
    },
    {
        value: "zerodha_pulse",
        label: "Zerodha"
    },
    {
        value: "economic_times",
        label: "Eco Times"
    },
    {
        value: "livemint",
        label: "LiveMint"
    },
    {
        value: "ndtv_profit",
        label: "NDTV"
    },
    {
        value: "bloomberg",
        label: "Bloomberg"
    },
    {
        value: "tradingview",
        label: "TradingView"
    },
    {
        value: "screener",
        label: "Screener"
    },
    {
        value: "twitter_redbox",
        label: "Redbox"
    },
    {
        value: "twitter_nse",
        label: "NSE Twitter"
    },
    {
        value: "twitter_bse",
        label: "BSE Twitter"
    },
    {
        value: "twitter_capmkt",
        label: "Capital Mkt"
    }
];
const CATEGORIES = [
    {
        value: "",
        label: "All Categories"
    },
    {
        value: "corporate_filing",
        label: "Filing"
    },
    {
        value: "earnings",
        label: "Earnings"
    },
    {
        value: "order_win",
        label: "Order Win"
    },
    {
        value: "regulatory",
        label: "Regulatory"
    },
    {
        value: "broker_report",
        label: "Broker Report"
    },
    {
        value: "offer_announcement",
        label: "Offer"
    },
    {
        value: "management_change",
        label: "Mgmt Change"
    },
    {
        value: "sector_news",
        label: "Sector"
    },
    {
        value: "other",
        label: "Other"
    }
];
const SENTIMENTS = [
    {
        value: "",
        label: "All Sentiment"
    },
    {
        value: "positive",
        label: "Positive"
    },
    {
        value: "negative",
        label: "Negative"
    },
    {
        value: "neutral",
        label: "Neutral"
    }
];
const IMPACTS = [
    {
        value: "",
        label: "All Impact"
    },
    {
        value: "high",
        label: "High"
    },
    {
        value: "medium",
        label: "Medium"
    },
    {
        value: "low",
        label: "Low"
    }
];
function Select(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "62fd10044911a4baf124c70ddf3c6afc46ffbd03882e09bea6e842e90f50b04b") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "62fd10044911a4baf124c70ddf3c6afc46ffbd03882e09bea6e842e90f50b04b";
    }
    const { options, value, onChange } = t0;
    let t1;
    if ($[1] !== onChange) {
        t1 = ({
            "Select[<select>.onChange]": (e)=>onChange(e.target.value)
        })["Select[<select>.onChange]"];
        $[1] = onChange;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== options) {
        t2 = options.map(_SelectOptionsMap);
        $[3] = options;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t1 || $[6] !== t2 || $[7] !== value) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            value: value,
            onChange: t1,
            className: "bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-blue-500",
            children: t2
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Filters.tsx",
            lineNumber: 149,
            columnNumber: 10
        }, this);
        $[5] = t1;
        $[6] = t2;
        $[7] = value;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return t3;
}
_c = Select;
function _SelectOptionsMap(o) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: o.value,
        children: o.label
    }, o.value, false, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/Filters.tsx",
        lineNumber: 160,
        columnNumber: 10
    }, this);
}
function Filters(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(41);
    if ($[0] !== "62fd10044911a4baf124c70ddf3c6afc46ffbd03882e09bea6e842e90f50b04b") {
        for(let $i = 0; $i < 41; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "62fd10044911a4baf124c70ddf3c6afc46ffbd03882e09bea6e842e90f50b04b";
    }
    const { filters, onChange } = t0;
    let t1;
    if ($[1] !== filters || $[2] !== onChange) {
        t1 = ({
            "Filters[update]": (key, value)=>{
                onChange({
                    ...filters,
                    [key]: value
                });
            }
        })["Filters[update]"];
        $[1] = filters;
        $[2] = onChange;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const update = t1;
    let t2;
    if ($[4] !== update) {
        t2 = ({
            "Filters[<Select>.onChange]": (v)=>update("source", v)
        })["Filters[<Select>.onChange]"];
        $[4] = update;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] !== filters.source || $[7] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
            options: SOURCES,
            value: filters.source,
            onChange: t2
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Filters.tsx",
            lineNumber: 203,
            columnNumber: 10
        }, this);
        $[6] = filters.source;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] !== update) {
        t4 = ({
            "Filters[<Select>.onChange]": (v_0)=>update("category", v_0)
        })["Filters[<Select>.onChange]"];
        $[9] = update;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] !== filters.category || $[12] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
            options: CATEGORIES,
            value: filters.category,
            onChange: t4
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Filters.tsx",
            lineNumber: 222,
            columnNumber: 10
        }, this);
        $[11] = filters.category;
        $[12] = t4;
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    let t6;
    if ($[14] !== update) {
        t6 = ({
            "Filters[<Select>.onChange]": (v_1)=>update("sentiment", v_1)
        })["Filters[<Select>.onChange]"];
        $[14] = update;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    let t7;
    if ($[16] !== filters.sentiment || $[17] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
            options: SENTIMENTS,
            value: filters.sentiment,
            onChange: t6
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Filters.tsx",
            lineNumber: 241,
            columnNumber: 10
        }, this);
        $[16] = filters.sentiment;
        $[17] = t6;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    let t8;
    if ($[19] !== update) {
        t8 = ({
            "Filters[<Select>.onChange]": (v_2)=>update("impact", v_2)
        })["Filters[<Select>.onChange]"];
        $[19] = update;
        $[20] = t8;
    } else {
        t8 = $[20];
    }
    let t9;
    if ($[21] !== filters.impact || $[22] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
            options: IMPACTS,
            value: filters.impact,
            onChange: t8
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Filters.tsx",
            lineNumber: 260,
            columnNumber: 10
        }, this);
        $[21] = filters.impact;
        $[22] = t8;
        $[23] = t9;
    } else {
        t9 = $[23];
    }
    let t10;
    if ($[24] !== update) {
        t10 = ({
            "Filters[<input>.onChange]": (e)=>update("ticker", e.target.value.toUpperCase())
        })["Filters[<input>.onChange]"];
        $[24] = update;
        $[25] = t10;
    } else {
        t10 = $[25];
    }
    let t11;
    if ($[26] !== filters.ticker || $[27] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "Ticker...",
            value: filters.ticker,
            onChange: t10,
            className: "bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs font-mono w-24 focus:outline-none focus:border-blue-500"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Filters.tsx",
            lineNumber: 279,
            columnNumber: 11
        }, this);
        $[26] = filters.ticker;
        $[27] = t10;
        $[28] = t11;
    } else {
        t11 = $[28];
    }
    let t12;
    if ($[29] !== update) {
        t12 = ({
            "Filters[<input>.onChange]": (e_0)=>update("search", e_0.target.value)
        })["Filters[<input>.onChange]"];
        $[29] = update;
        $[30] = t12;
    } else {
        t12 = $[30];
    }
    let t13;
    if ($[31] !== filters.search || $[32] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "Search...",
            value: filters.search,
            onChange: t12,
            className: "bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs font-mono w-40 focus:outline-none focus:border-blue-500"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Filters.tsx",
            lineNumber: 298,
            columnNumber: 11
        }, this);
        $[31] = filters.search;
        $[32] = t12;
        $[33] = t13;
    } else {
        t13 = $[33];
    }
    let t14;
    if ($[34] !== t11 || $[35] !== t13 || $[36] !== t3 || $[37] !== t5 || $[38] !== t7 || $[39] !== t9) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center gap-2 px-4 py-2 bg-gray-950 border-b border-gray-800",
            children: [
                t3,
                t5,
                t7,
                t9,
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Filters.tsx",
            lineNumber: 307,
            columnNumber: 11
        }, this);
        $[34] = t11;
        $[35] = t13;
        $[36] = t3;
        $[37] = t5;
        $[38] = t7;
        $[39] = t9;
        $[40] = t14;
    } else {
        t14 = $[40];
    }
    return t14;
}
_c1 = Filters;
var _c, _c1;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "Filters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsFeed",
    ()=>NewsFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$NewsItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/NewsItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Filters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/Filters.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const BACKEND_URL = "http://localhost:3001";
function NewsFeed() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(52);
    if ($[0] !== "cbd2871a72985160fe73c69c89137565cf00dfd77a759d5a0764bd18510f013e") {
        for(let $i = 0; $i < 52; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "cbd2871a72985160fe73c69c89137565cf00dfd77a759d5a0764bd18510f013e";
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
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            source: "",
            ticker: "",
            category: "",
            sentiment: "",
            impact: "",
            search: ""
        };
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const eventSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "NewsFeed[useEffect()]": ()=>{
                setLoading(true);
                fetch(`${BACKEND_URL}/api/news?limit=1000`).then(_NewsFeedUseEffectAnonymous).then({
                    "NewsFeed[useEffect() > (anonymous)()]": (data)=>{
                        setItems(data);
                        setHasMore(data.length === 1000);
                        setLoading(false);
                    }
                }["NewsFeed[useEffect() > (anonymous)()]"]).catch({
                    "NewsFeed[useEffect() > (anonymous)()]": (err)=>{
                        console.error(err);
                        setLoading(false);
                    }
                }["NewsFeed[useEffect() > (anonymous)()]"]);
            }
        })["NewsFeed[useEffect()]"];
        t3 = [];
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[5] !== hasMore || $[6] !== items || $[7] !== loading) {
        t4 = ({
            "NewsFeed[loadMore]": ()=>{
                if (loading || !hasMore || items.length === 0) {
                    return;
                }
                setLoading(true);
                const lastItem = items[items.length - 1];
                fetch(`${BACKEND_URL}/api/news?limit=500&before=${lastItem.id}`).then(_NewsFeedLoadMoreAnonymous).then({
                    "NewsFeed[loadMore > (anonymous)()]": (data_0)=>{
                        if (data_0.length === 0) {
                            setHasMore(false);
                        } else {
                            setItems({
                                "NewsFeed[loadMore > (anonymous)() > setItems()]": (prev)=>[
                                        ...prev,
                                        ...data_0
                                    ]
                            }["NewsFeed[loadMore > (anonymous)() > setItems()]"]);
                        }
                        setLoading(false);
                    }
                }["NewsFeed[loadMore > (anonymous)()]"]).catch({
                    "NewsFeed[loadMore > (anonymous)()]": (err_0)=>{
                        console.error(err_0);
                        setLoading(false);
                    }
                }["NewsFeed[loadMore > (anonymous)()]"]);
            }
        })["NewsFeed[loadMore]"];
        $[5] = hasMore;
        $[6] = items;
        $[7] = loading;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    const loadMore = t4;
    let t5;
    if ($[9] !== loadMore) {
        t5 = ({
            "NewsFeed[handleScroll]": ()=>{
                const el = scrollRef.current;
                if (!el) {
                    return;
                }
                if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) {
                    loadMore();
                }
            }
        })["NewsFeed[handleScroll]"];
        $[9] = loadMore;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    const handleScroll = t5;
    let t6;
    let t7;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "NewsFeed[useEffect()]": ()=>{
                const es = new EventSource(`${BACKEND_URL}/api/stream`);
                eventSourceRef.current = es;
                es.onopen = ()=>setConnected(true);
                es.onmessage = (event)=>{
                    try {
                        const data_1 = JSON.parse(event.data);
                        if (data_1.type === "connected") {
                            return;
                        }
                        setItems({
                            "NewsFeed[useEffect() > <anonymous> > setItems()]": (prev_0)=>[
                                    data_1,
                                    ...prev_0
                                ]
                        }["NewsFeed[useEffect() > <anonymous> > setItems()]"]);
                    } catch  {}
                };
                es.onerror = ()=>{
                    setConnected(false);
                };
                return ()=>{
                    es.close();
                };
            }
        })["NewsFeed[useEffect()]"];
        t7 = [];
        $[11] = t6;
        $[12] = t7;
    } else {
        t6 = $[11];
        t7 = $[12];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t6, t7);
    let t10;
    let t11;
    let t12;
    let t13;
    let t14;
    let t8;
    let t9;
    if ($[13] !== connected || $[14] !== filters || $[15] !== handleScroll || $[16] !== hasMore || $[17] !== items || $[18] !== loading) {
        let t15;
        if ($[26] !== filters) {
            t15 = ({
                "NewsFeed[items.filter()]": (item)=>{
                    if (filters.source && item.source !== filters.source) {
                        return false;
                    }
                    if (filters.sentiment && item.sentiment !== filters.sentiment) {
                        return false;
                    }
                    if (filters.category && item.category !== filters.category) {
                        return false;
                    }
                    if (filters.impact && item.impact !== filters.impact) {
                        return false;
                    }
                    if (filters.ticker && !item.tickers.some({
                        "NewsFeed[items.filter() > item.tickers.some()]": (t)=>t.includes(filters.ticker)
                    }["NewsFeed[items.filter() > item.tickers.some()]"])) {
                        return false;
                    }
                    if (filters.search && !item.headline.toLowerCase().includes(filters.search.toLowerCase())) {
                        return false;
                    }
                    return true;
                }
            })["NewsFeed[items.filter()]"];
            $[26] = filters;
            $[27] = t15;
        } else {
            t15 = $[27];
        }
        const filteredItems = items.filter(t15);
        t12 = "flex flex-col h-screen bg-black text-gray-200 font-mono";
        let t16;
        if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
            t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-sm font-bold text-gray-100",
                children: "PaisaMachine — Stock News Terminal"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
                lineNumber: 206,
                columnNumber: 13
            }, this);
            $[28] = t16;
        } else {
            t16 = $[28];
        }
        const t17 = `w-2 h-2 rounded-full ${connected ? "bg-green-400" : "bg-red-400"}`;
        let t18;
        if ($[29] !== t17) {
            t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: t17
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
                lineNumber: 214,
                columnNumber: 13
            }, this);
            $[29] = t17;
            $[30] = t18;
        } else {
            t18 = $[30];
        }
        const t19 = connected ? "text-green-400" : "text-red-400";
        const t20 = connected ? "Connected" : "Disconnected";
        let t21;
        if ($[31] !== t19 || $[32] !== t20) {
            t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: t19,
                children: t20
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
                lineNumber: 224,
                columnNumber: 13
            }, this);
            $[31] = t19;
            $[32] = t20;
            $[33] = t21;
        } else {
            t21 = $[33];
        }
        const t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 text-xs",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-500",
                    children: [
                        filteredItems.length,
                        "/",
                        items.length,
                        " items"
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
                    lineNumber: 231,
                    columnNumber: 66
                }, this),
                t18,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
            lineNumber: 231,
            columnNumber: 17
        }, this);
        if ($[34] !== t22) {
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-2 bg-gray-950 border-b border-gray-800",
                children: [
                    t16,
                    t22
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
                lineNumber: 233,
                columnNumber: 13
            }, this);
            $[34] = t22;
            $[35] = t13;
        } else {
            t13 = $[35];
        }
        if ($[36] !== filters) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Filters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Filters"], {
                filters: filters,
                onChange: setFilters
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
                lineNumber: 240,
                columnNumber: 13
            }, this);
            $[36] = filters;
            $[37] = t14;
        } else {
            t14 = $[37];
        }
        t8 = scrollRef;
        t9 = "flex-1 overflow-y-auto";
        t10 = handleScroll;
        t11 = filteredItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-full text-gray-600 text-sm",
            children: items.length === 0 ? loading ? "Loading news..." : "Waiting for news..." : "No items match filters"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
            lineNumber: 249,
            columnNumber: 40
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                filteredItems.map(_NewsFeedFilteredItemsMap),
                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-600 text-xs py-2",
                    children: "Loading more..."
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
                    lineNumber: 249,
                    columnNumber: 289
                }, this),
                !hasMore && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-700 text-xs py-2",
                    children: "End of history"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
                    lineNumber: 249,
                    columnNumber: 400
                }, this)
            ]
        }, void 0, true);
        $[13] = connected;
        $[14] = filters;
        $[15] = handleScroll;
        $[16] = hasMore;
        $[17] = items;
        $[18] = loading;
        $[19] = t10;
        $[20] = t11;
        $[21] = t12;
        $[22] = t13;
        $[23] = t14;
        $[24] = t8;
        $[25] = t9;
    } else {
        t10 = $[19];
        t11 = $[20];
        t12 = $[21];
        t13 = $[22];
        t14 = $[23];
        t8 = $[24];
        t9 = $[25];
    }
    let t15;
    if ($[38] !== t10 || $[39] !== t11 || $[40] !== t8 || $[41] !== t9) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: t8,
            className: t9,
            onScroll: t10,
            children: t11
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
            lineNumber: 274,
            columnNumber: 11
        }, this);
        $[38] = t10;
        $[39] = t11;
        $[40] = t8;
        $[41] = t9;
        $[42] = t15;
    } else {
        t15 = $[42];
    }
    let t16;
    if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "NSE/BSE API | Zerodha | ET | Mint | NDTV | Bloomberg | TradingView | Screener"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
            lineNumber: 285,
            columnNumber: 11
        }, this);
        $[43] = t16;
    } else {
        t16 = $[43];
    }
    const t17 = connected ? "\u2591\u2591\u2591\u2591\u2591\u2591\u2591 live \u2591\u2591\u2591\u2591\u2591\u2591\u2591" : "reconnecting...";
    let t18;
    if ($[44] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-1 bg-gray-950 border-t border-gray-800 text-[10px] text-gray-600 flex justify-between",
            children: [
                t16,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: t17
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
                    lineNumber: 293,
                    columnNumber: 127
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
            lineNumber: 293,
            columnNumber: 11
        }, this);
        $[44] = t17;
        $[45] = t18;
    } else {
        t18 = $[45];
    }
    let t19;
    if ($[46] !== t12 || $[47] !== t13 || $[48] !== t14 || $[49] !== t15 || $[50] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t12,
            children: [
                t13,
                t14,
                t15,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
            lineNumber: 301,
            columnNumber: 11
        }, this);
        $[46] = t12;
        $[47] = t13;
        $[48] = t14;
        $[49] = t15;
        $[50] = t18;
        $[51] = t19;
    } else {
        t19 = $[51];
    }
    return t19;
}
_s(NewsFeed, "OL0W7eYPexx5ZxgWfROWvF77WeE=");
_c = NewsFeed;
function _NewsFeedFilteredItemsMap(item_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$NewsItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewsItem"], {
        item: item_0
    }, item_0.id, false, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/NewsFeed.tsx",
        lineNumber: 314,
        columnNumber: 10
    }, this);
}
function _NewsFeedLoadMoreAnonymous(res_0) {
    return res_0.json();
}
function _NewsFeedUseEffectAnonymous(res) {
    return res.json();
}
var _c;
__turbopack_context__.k.register(_c, "NewsFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-compiler-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    var ReactSharedInternals = __turbopack_context__.r("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    exports.c = function(size) {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher.useMemoCache(size);
    };
}();
}),
"[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=internship_paisaMachine_frontend_4b9e7049._.js.map