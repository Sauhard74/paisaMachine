(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/internship/paisaMachine/frontend/app/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createChartStream",
    ()=>createChartStream,
    "createSSEConnection",
    ()=>createSSEConnection,
    "fetchChartData",
    ()=>fetchChartData,
    "fetchFastQuote",
    ()=>fetchFastQuote,
    "fetchFullQuote",
    ()=>fetchFullQuote,
    "fetchFundamentals",
    ()=>fetchFundamentals,
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
    "isSafeUrl",
    ()=>isSafeUrl,
    "isValidSymbol",
    ()=>isValidSymbol,
    "searchStocks",
    ()=>searchStocks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BACKEND_URL = __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
function isValidSymbol(s) {
    return /^[A-Z0-9&^.\-]{1,20}$/.test(s);
}
function isSafeUrl(url) {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch  {
        return false;
    }
}
async function safeFetch(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res;
}
async function fetchNews(limit = 1000, beforeId) {
    const params = new URLSearchParams({
        limit: String(limit)
    });
    if (beforeId) params.set("before", String(beforeId));
    const res = await safeFetch(`${BACKEND_URL}/api/news?${params}`);
    return res.json();
}
async function fetchStats() {
    const res = await safeFetch(`${BACKEND_URL}/api/stats`);
    return res.json();
}
async function fetchIndices() {
    const res = await safeFetch(`${BACKEND_URL}/api/market/indices`);
    return res.json();
}
async function fetchQuote(symbol) {
    const res = await safeFetch(`${BACKEND_URL}/api/market/quote/${encodeURIComponent(symbol)}`);
    return res.json();
}
async function fetchChartData(symbol, interval = "15m", range = "1d") {
    const res = await safeFetch(`${BACKEND_URL}/api/market/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`);
    return res.json();
}
async function fetchFullQuote(symbol) {
    const res = await safeFetch(`${BACKEND_URL}/api/market/quote-full/${encodeURIComponent(symbol)}`);
    return res.json();
}
async function fetchFastQuote(symbol) {
    const res = await safeFetch(`${BACKEND_URL}/api/market/quote-fast/${encodeURIComponent(symbol)}`);
    return res.json();
}
async function fetchFundamentals(symbol) {
    const res = await safeFetch(`${BACKEND_URL}/api/market/fundamentals/${encodeURIComponent(symbol)}`);
    return res.json();
}
function createChartStream(symbol, interval, onCandles, onConnect) {
    const es = new EventSource(`${BACKEND_URL}/api/market/chart-stream/${encodeURIComponent(symbol)}?interval=${interval}`);
    es.onopen = ()=>onConnect();
    es.onmessage = (event)=>{
        try {
            const data = JSON.parse(event.data);
            if (data.type === "connected") return;
            if (data.type === "candles") {
                onCandles(data.data, data.ltp);
            }
        } catch  {}
    };
    return es;
}
async function fetchNewsByTicker(ticker, limit = 200) {
    const params = new URLSearchParams({
        limit: String(limit),
        ticker
    });
    const res = await safeFetch(`${BACKEND_URL}/api/news?${params}`);
    return res.json();
}
async function fetchMarketStatus() {
    const res = await safeFetch(`${BACKEND_URL}/api/market/status`);
    return res.json();
}
async function searchStocks(query) {
    if (query.length < 2 || query.length > 50) return [];
    const res = await safeFetch(`${BACKEND_URL}/api/market/search?q=${encodeURIComponent(query)}`);
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
"[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StockDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// ─── Helpers ───
function formatINR(n) {
    if (n == null || isNaN(n)) return "--";
    return n.toLocaleString("en-IN", {
        maximumFractionDigits: 2
    });
}
function formatIST(dateStr) {
    const dt = new Date(dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z");
    const istOffset = 5.5 * 60 * 60 * 1000;
    const ist = new Date(dt.getTime() + istOffset);
    return {
        time: ist.toISOString().slice(11, 16),
        date: ist.toISOString().slice(5, 10).replace("-", "/")
    };
}
function formatVolume(n) {
    if (n == null || isNaN(n)) return "--";
    if (n >= 1e7) return (n / 1e7).toFixed(2) + " Cr";
    if (n >= 1e5) return (n / 1e5).toFixed(2) + " L";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + " K";
    return n.toString();
}
// ─── Interval/Range config ───
const INTERVAL_OPTIONS = [
    {
        label: "1m",
        interval: "1m",
        range: "1d"
    },
    {
        label: "5m",
        interval: "5m",
        range: "5d"
    },
    {
        label: "15m",
        interval: "15m",
        range: "5d"
    },
    {
        label: "1h",
        interval: "1h",
        range: "1mo"
    },
    {
        label: "1D",
        interval: "1d",
        range: "6mo"
    },
    {
        label: "1W",
        interval: "1wk",
        range: "1y"
    }
];
// ─── Candlestick Chart ───
function StockChart({ symbol }) {
    _s();
    const chartContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const seriesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const volumeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeInterval, setActiveInterval] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2); // default 15m
    const loadChart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StockChart.useCallback[loadChart]": async (idx)=>{
            const opt = INTERVAL_OPTIONS[idx];
            try {
                const candles = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchChartData"])(symbol, opt.interval, opt.range);
                if (!candles || !Array.isArray(candles) || candles.length === 0) return;
                // Lazy-load lightweight-charts
                const { createChart, CandlestickSeries, HistogramSeries } = await __turbopack_context__.A("[project]/internship/paisaMachine/frontend/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-client] (ecmascript, async loader)");
                if (!chartContainerRef.current) return;
                // Create chart only once
                if (!chartRef.current) {
                    const chart = createChart(chartContainerRef.current, {
                        layout: {
                            background: {
                                color: "#0d1117"
                            },
                            textColor: "#6b7280",
                            fontSize: 11
                        },
                        grid: {
                            vertLines: {
                                color: "#1b2b1b40"
                            },
                            horzLines: {
                                color: "#1b2b1b40"
                            }
                        },
                        crosshair: {
                            vertLine: {
                                color: "#10b981",
                                width: 1,
                                style: 2
                            },
                            horzLine: {
                                color: "#10b981",
                                width: 1,
                                style: 2
                            }
                        },
                        timeScale: {
                            timeVisible: true,
                            secondsVisible: false,
                            borderColor: "#1b2b1b"
                        },
                        rightPriceScale: {
                            borderColor: "#1b2b1b"
                        }
                    });
                    const candleSeries = chart.addSeries(CandlestickSeries, {
                        upColor: "#10b981",
                        downColor: "#ef4444",
                        borderUpColor: "#10b981",
                        borderDownColor: "#ef4444",
                        wickUpColor: "#10b981",
                        wickDownColor: "#ef4444"
                    });
                    const volumeSeries = chart.addSeries(HistogramSeries, {
                        priceFormat: {
                            type: "volume"
                        },
                        priceScaleId: "volume"
                    });
                    chart.priceScale("volume").applyOptions({
                        scaleMargins: {
                            top: 0.8,
                            bottom: 0
                        }
                    });
                    chartRef.current = chart;
                    seriesRef.current = candleSeries;
                    volumeRef.current = volumeSeries;
                    // Auto-resize
                    const ro = new ResizeObserver({
                        "StockChart.useCallback[loadChart]": ()=>{
                            if (chartContainerRef.current) {
                                chart.applyOptions({
                                    width: chartContainerRef.current.clientWidth,
                                    height: chartContainerRef.current.clientHeight
                                });
                            }
                        }
                    }["StockChart.useCallback[loadChart]"]);
                    ro.observe(chartContainerRef.current);
                }
                // Set data
                const formatted = candles.map({
                    "StockChart.useCallback[loadChart].formatted": (c)=>({
                            time: c.time,
                            open: c.open,
                            high: c.high,
                            low: c.low,
                            close: c.close
                        })
                }["StockChart.useCallback[loadChart].formatted"]);
                const volumeData = candles.map({
                    "StockChart.useCallback[loadChart].volumeData": (c_0)=>({
                            time: c_0.time,
                            value: c_0.volume,
                            color: c_0.close >= c_0.open ? "#10b98140" : "#ef444440"
                        })
                }["StockChart.useCallback[loadChart].volumeData"]);
                seriesRef.current.setData(formatted);
                volumeRef.current.setData(volumeData);
                chartRef.current.timeScale().fitContent();
            } catch (err) {
                console.error("Chart load error:", err);
            }
        }
    }["StockChart.useCallback[loadChart]"], [
        symbol
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StockChart.useEffect": ()=>{
            loadChart(activeInterval);
            // For intraday: use SSE stream for live candle updates
            const opt_0 = INTERVAL_OPTIONS[activeInterval];
            const isIntraday = [
                "1m",
                "5m",
                "15m"
            ].includes(opt_0.interval);
            if (isIntraday) {
                const es = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChartStream"])(symbol, opt_0.interval, {
                    "StockChart.useEffect.es": (newCandles)=>{
                        if (!seriesRef.current || !volumeRef.current) return;
                        for (const c_1 of newCandles){
                            seriesRef.current.update({
                                time: c_1.time,
                                open: c_1.open,
                                high: c_1.high,
                                low: c_1.low,
                                close: c_1.close
                            });
                            volumeRef.current.update({
                                time: c_1.time,
                                value: c_1.volume,
                                color: c_1.close >= c_1.open ? "#10b98140" : "#ef444440"
                            });
                        }
                    }
                }["StockChart.useEffect.es"], {
                    "StockChart.useEffect.es": ()=>{}
                }["StockChart.useEffect.es"]);
                return ({
                    "StockChart.useEffect": ()=>es.close()
                })["StockChart.useEffect"];
            }
        }
    }["StockChart.useEffect"], [
        activeInterval,
        loadChart,
        symbol
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StockChart.useEffect": ()=>{
            return ({
                "StockChart.useEffect": ()=>{
                    if (chartRef.current) {
                        chartRef.current.remove();
                        chartRef.current = null;
                        seriesRef.current = null;
                        volumeRef.current = null;
                    }
                }
            })["StockChart.useEffect"];
        }
    }["StockChart.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1 px-3 py-1.5 border-b border-[#1b2b1b]",
                children: INTERVAL_OPTIONS.map((opt_1, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setActiveInterval(i);
                            // Reset chart for new data
                            if (chartRef.current) {
                                chartRef.current.remove();
                                chartRef.current = null;
                                seriesRef.current = null;
                                volumeRef.current = null;
                            }
                            loadChart(i);
                        },
                        className: `text-[10px] font-bold px-2 py-1 rounded transition-colors ${activeInterval === i ? "bg-[#10b981]/20 text-[#10b981]" : "text-[#374151] hover:text-[#6b7280]"}`,
                        children: opt_1.label
                    }, opt_1.label, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 226,
                        columnNumber: 45
                    }, this))
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: chartContainerRef,
                className: "flex-1"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 224,
        columnNumber: 10
    }, this);
}
_s(StockChart, "Y/ZTmUUPt2QvHboG3Sjq/8H2D5k=");
_c = StockChart;
// ─── Order Book ───
function OrderBook(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(34);
    if ($[0] !== "d9ed711bdaebcd68bc54c0cb6f606773fd8a2ca72757f3972b1958fbe8e2bf55") {
        for(let $i = 0; $i < 34; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d9ed711bdaebcd68bc54c0cb6f606773fd8a2ca72757f3972b1958fbe8e2bf55";
    }
    const { bid, ask, totalBuy, totalSell } = t0;
    let t1;
    if ($[1] !== ask || $[2] !== bid) {
        t1 = Math.max(...bid.map(_OrderBookBidMap), ...ask.map(_OrderBookAskMap), 1);
        $[1] = ask;
        $[2] = bid;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const maxQty = t1;
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2",
            children: "Order Book (Top 5)"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 271,
            columnNumber: 10
        }, this);
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between text-[9px] text-[#374151] uppercase mb-1 px-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Qty"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 278,
                    columnNumber: 94
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Bid"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 278,
                    columnNumber: 110
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 278,
            columnNumber: 10
        }, this);
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== bid || $[7] !== maxQty) {
        let t5;
        if ($[9] !== maxQty) {
            t5 = ({
                "OrderBook[bid.map()]": (b_0, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex justify-between text-[11px] py-0.5 px-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-[#10b981]/10 rounded-sm",
                                style: {
                                    width: `${b_0.quantity / maxQty * 100}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 288,
                                columnNumber: 124
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative text-[#e5e7eb] tabular-nums",
                                children: formatVolume(b_0.quantity)
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 290,
                                columnNumber: 16
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative text-[#10b981] font-bold tabular-nums",
                                children: formatINR(b_0.price)
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 290,
                                columnNumber: 106
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 288,
                        columnNumber: 45
                    }, this)
            })["OrderBook[bid.map()]"];
            $[9] = maxQty;
            $[10] = t5;
        } else {
            t5 = $[10];
        }
        t4 = bid.map(t5);
        $[6] = bid;
        $[7] = maxQty;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[11] !== totalBuy) {
        t5 = formatVolume(totalBuy);
        $[11] = totalBuy;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    let t6;
    if ($[13] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[10px] text-[#10b981] font-bold mt-1 px-1",
            children: [
                "Total Buy: ",
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 314,
            columnNumber: 10
        }, this);
        $[13] = t5;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== t4 || $[16] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t3,
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 322,
            columnNumber: 10
        }, this);
        $[15] = t4;
        $[16] = t6;
        $[17] = t7;
    } else {
        t7 = $[17];
    }
    let t8;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between text-[9px] text-[#374151] uppercase mb-1 px-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Ask"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 331,
                    columnNumber: 94
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Qty"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 331,
                    columnNumber: 110
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 331,
            columnNumber: 10
        }, this);
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    let t9;
    if ($[19] !== ask || $[20] !== maxQty) {
        let t10;
        if ($[22] !== maxQty) {
            t10 = ({
                "OrderBook[ask.map()]": (a_0, i_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex justify-between text-[11px] py-0.5 px-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 right-0 bg-[#ef4444]/10 rounded-sm ml-auto",
                                style: {
                                    width: `${a_0.quantity / maxQty * 100}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 341,
                                columnNumber: 128
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative text-[#ef4444] font-bold tabular-nums",
                                children: formatINR(a_0.price)
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 343,
                                columnNumber: 16
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative text-[#e5e7eb] tabular-nums",
                                children: formatVolume(a_0.quantity)
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 343,
                                columnNumber: 110
                            }, this)
                        ]
                    }, i_0, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 341,
                        columnNumber: 47
                    }, this)
            })["OrderBook[ask.map()]"];
            $[22] = maxQty;
            $[23] = t10;
        } else {
            t10 = $[23];
        }
        t9 = ask.map(t10);
        $[19] = ask;
        $[20] = maxQty;
        $[21] = t9;
    } else {
        t9 = $[21];
    }
    let t10;
    if ($[24] !== totalSell) {
        t10 = formatVolume(totalSell);
        $[24] = totalSell;
        $[25] = t10;
    } else {
        t10 = $[25];
    }
    let t11;
    if ($[26] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[10px] text-[#ef4444] font-bold mt-1 px-1 text-right",
            children: [
                "Total Sell: ",
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 367,
            columnNumber: 11
        }, this);
        $[26] = t10;
        $[27] = t11;
    } else {
        t11 = $[27];
    }
    let t12;
    if ($[28] !== t11 || $[29] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t8,
                t9,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 375,
            columnNumber: 11
        }, this);
        $[28] = t11;
        $[29] = t9;
        $[30] = t12;
    } else {
        t12 = $[30];
    }
    let t13;
    if ($[31] !== t12 || $[32] !== t7) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-3",
                    children: [
                        t7,
                        t12
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 384,
                    columnNumber: 84
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 384,
            columnNumber: 11
        }, this);
        $[31] = t12;
        $[32] = t7;
        $[33] = t13;
    } else {
        t13 = $[33];
    }
    return t13;
}
_c1 = OrderBook;
// ─── Key Stats Grid ───
function _OrderBookAskMap(a) {
    return a.quantity;
}
function _OrderBookBidMap(b) {
    return b.quantity;
}
function KeyStats(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(86);
    if ($[0] !== "d9ed711bdaebcd68bc54c0cb6f606773fd8a2ca72757f3972b1958fbe8e2bf55") {
        for(let $i = 0; $i < 86; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d9ed711bdaebcd68bc54c0cb6f606773fd8a2ca72757f3972b1958fbe8e2bf55";
    }
    const { quote, fundamentals } = t0;
    const f = fundamentals;
    let t1;
    if ($[1] !== quote.open) {
        t1 = formatINR(quote.open);
        $[1] = quote.open;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== t1) {
        t2 = {
            label: "Open",
            value: t1
        };
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== quote.previousClose) {
        t3 = formatINR(quote.previousClose);
        $[5] = quote.previousClose;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t3) {
        t4 = {
            label: "Prev Close",
            value: t3
        };
        $[7] = t3;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== quote.high) {
        t5 = formatINR(quote.high);
        $[9] = quote.high;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== t5) {
        t6 = {
            label: "Day High",
            value: t5
        };
        $[11] = t5;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== quote.low) {
        t7 = formatINR(quote.low);
        $[13] = quote.low;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== t7) {
        t8 = {
            label: "Day Low",
            value: t7
        };
        $[15] = t7;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== quote.weekHigh52) {
        t9 = formatINR(quote.weekHigh52);
        $[17] = quote.weekHigh52;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== t9) {
        t10 = {
            label: "52W High",
            value: t9
        };
        $[19] = t9;
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    let t11;
    if ($[21] !== quote.weekLow52) {
        t11 = formatINR(quote.weekLow52);
        $[21] = quote.weekLow52;
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    let t12;
    if ($[23] !== t11) {
        t12 = {
            label: "52W Low",
            value: t11
        };
        $[23] = t11;
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    let t13;
    if ($[25] !== quote.volume) {
        t13 = formatVolume(quote.volume);
        $[25] = quote.volume;
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    let t14;
    if ($[27] !== t13) {
        t14 = {
            label: "Volume",
            value: t13
        };
        $[27] = t13;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    let t15;
    if ($[29] !== f) {
        t15 = f?.marketCap ? `₹${formatVolume(f.marketCap)}` : "...";
        $[29] = f;
        $[30] = t15;
    } else {
        t15 = $[30];
    }
    let t16;
    if ($[31] !== t15) {
        t16 = {
            label: "Market Cap",
            value: t15
        };
        $[31] = t15;
        $[32] = t16;
    } else {
        t16 = $[32];
    }
    let t17;
    if ($[33] !== f) {
        t17 = f?.pe ? f.pe.toFixed(2) : "...";
        $[33] = f;
        $[34] = t17;
    } else {
        t17 = $[34];
    }
    let t18;
    if ($[35] !== t17) {
        t18 = {
            label: "P/E (TTM)",
            value: t17
        };
        $[35] = t17;
        $[36] = t18;
    } else {
        t18 = $[36];
    }
    let t19;
    if ($[37] !== f) {
        t19 = f?.forwardPe ? f.forwardPe.toFixed(2) : "...";
        $[37] = f;
        $[38] = t19;
    } else {
        t19 = $[38];
    }
    let t20;
    if ($[39] !== t19) {
        t20 = {
            label: "P/E (Fwd)",
            value: t19
        };
        $[39] = t19;
        $[40] = t20;
    } else {
        t20 = $[40];
    }
    let t21;
    if ($[41] !== f) {
        t21 = f?.pb ? f.pb.toFixed(2) : "...";
        $[41] = f;
        $[42] = t21;
    } else {
        t21 = $[42];
    }
    let t22;
    if ($[43] !== t21) {
        t22 = {
            label: "P/B Ratio",
            value: t21
        };
        $[43] = t21;
        $[44] = t22;
    } else {
        t22 = $[44];
    }
    let t23;
    if ($[45] !== f) {
        t23 = f?.eps ? `₹${f.eps.toFixed(2)}` : "...";
        $[45] = f;
        $[46] = t23;
    } else {
        t23 = $[46];
    }
    let t24;
    if ($[47] !== t23) {
        t24 = {
            label: "EPS",
            value: t23
        };
        $[47] = t23;
        $[48] = t24;
    } else {
        t24 = $[48];
    }
    let t25;
    if ($[49] !== f) {
        t25 = f?.bookValue ? `₹${f.bookValue.toFixed(2)}` : "...";
        $[49] = f;
        $[50] = t25;
    } else {
        t25 = $[50];
    }
    let t26;
    if ($[51] !== t25) {
        t26 = {
            label: "Book Value",
            value: t25
        };
        $[51] = t25;
        $[52] = t26;
    } else {
        t26 = $[52];
    }
    const t27 = f?.dividendYield ? `${f.dividendYield}%` : "...";
    let t28;
    if ($[53] !== t27) {
        t28 = {
            label: "Div Yield",
            value: t27
        };
        $[53] = t27;
        $[54] = t28;
    } else {
        t28 = $[54];
    }
    let t29;
    if ($[55] !== f) {
        t29 = f?.beta ? f.beta.toFixed(2) : "...";
        $[55] = f;
        $[56] = t29;
    } else {
        t29 = $[56];
    }
    let t30;
    if ($[57] !== t29) {
        t30 = {
            label: "Beta",
            value: t29
        };
        $[57] = t29;
        $[58] = t30;
    } else {
        t30 = $[58];
    }
    const t31 = f?.roe ? `${f.roe}%` : "...";
    let t32;
    if ($[59] !== t31) {
        t32 = {
            label: "ROE",
            value: t31
        };
        $[59] = t31;
        $[60] = t32;
    } else {
        t32 = $[60];
    }
    let t33;
    if ($[61] !== f) {
        t33 = f?.debtToEquity ? f.debtToEquity.toFixed(2) : "...";
        $[61] = f;
        $[62] = t33;
    } else {
        t33 = $[62];
    }
    let t34;
    if ($[63] !== t33) {
        t34 = {
            label: "D/E Ratio",
            value: t33
        };
        $[63] = t33;
        $[64] = t34;
    } else {
        t34 = $[64];
    }
    let t35;
    if ($[65] !== t10 || $[66] !== t12 || $[67] !== t14 || $[68] !== t16 || $[69] !== t18 || $[70] !== t2 || $[71] !== t20 || $[72] !== t22 || $[73] !== t24 || $[74] !== t26 || $[75] !== t28 || $[76] !== t30 || $[77] !== t32 || $[78] !== t34 || $[79] !== t4 || $[80] !== t6 || $[81] !== t8) {
        t35 = [
            t2,
            t4,
            t6,
            t8,
            t10,
            t12,
            t14,
            t16,
            t18,
            t20,
            t22,
            t24,
            t26,
            t28,
            t30,
            t32,
            t34
        ];
        $[65] = t10;
        $[66] = t12;
        $[67] = t14;
        $[68] = t16;
        $[69] = t18;
        $[70] = t2;
        $[71] = t20;
        $[72] = t22;
        $[73] = t24;
        $[74] = t26;
        $[75] = t28;
        $[76] = t30;
        $[77] = t32;
        $[78] = t34;
        $[79] = t4;
        $[80] = t6;
        $[81] = t8;
        $[82] = t35;
    } else {
        t35 = $[82];
    }
    const stats = t35;
    let t36;
    if ($[83] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2",
            children: "Key Statistics"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 750,
            columnNumber: 11
        }, this);
        $[83] = t36;
    } else {
        t36 = $[83];
    }
    let t37;
    if ($[84] !== stats) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3",
            children: [
                t36,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-x-4 gap-y-1.5",
                    children: stats.map(_KeyStatsStatsMap)
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 757,
                    columnNumber: 85
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 757,
            columnNumber: 11
        }, this);
        $[84] = stats;
        $[85] = t37;
    } else {
        t37 = $[85];
    }
    return t37;
}
_c2 = KeyStats;
// ─── News Item Row ───
function _KeyStatsStatsMap(s) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-between text-[11px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[#374151]",
                children: s.label
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 768,
                columnNumber: 74
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[#e5e7eb] font-bold tabular-nums",
                children: s.value
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 768,
                columnNumber: 123
            }, this)
        ]
    }, s.label, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 768,
        columnNumber: 10
    }, this);
}
function StockNewsRow(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(37);
    if ($[0] !== "d9ed711bdaebcd68bc54c0cb6f606773fd8a2ca72757f3972b1958fbe8e2bf55") {
        for(let $i = 0; $i < 37; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d9ed711bdaebcd68bc54c0cb6f606773fd8a2ca72757f3972b1958fbe8e2bf55";
    }
    const { item } = t0;
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    if ($[1] !== item.published_at) {
        t1 = formatIST(item.published_at);
        $[1] = item.published_at;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const published = t1;
    const sentBg = item.sentiment === "positive" ? "bg-[#10b981]" : item.sentiment === "negative" ? "bg-[#ef4444]" : "bg-[#6b7280]";
    const sentColor = item.sentiment === "positive" ? "text-[#10b981]" : item.sentiment === "negative" ? "text-[#ef4444]" : "text-[#6b7280]";
    const t2 = `px-3 py-2.5 border-b border-[#1b2b1b]/50 cursor-pointer hover:bg-[#1b2b1b]/30 transition-colors ${item.impact === "high" ? "border-l-2 border-l-[#f59e0b]" : ""} ${expanded ? "bg-[#0a1a0a]" : ""}`;
    let t3;
    if ($[3] !== expanded) {
        t3 = ({
            "StockNewsRow[<div>.onClick]": ()=>setExpanded(!expanded)
        })["StockNewsRow[<div>.onClick]"];
        $[3] = expanded;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== published.time) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[11px] font-bold text-[#e5e7eb] tabular-nums",
            children: published.time
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 806,
            columnNumber: 10
        }, this);
        $[5] = published.time;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== published.date) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[9px] text-[#374151]",
            children: published.date
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 814,
            columnNumber: 10
        }, this);
        $[7] = published.date;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    const t6 = `w-1.5 h-1.5 rounded-full shrink-0 ${sentBg}`;
    let t7;
    if ($[9] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t6
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 823,
            columnNumber: 10
        }, this);
        $[9] = t6;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] !== item.impact) {
        t8 = item.impact === "high" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[8px] text-[#f59e0b] font-bold uppercase bg-[#f59e0b]/10 px-1.5 py-0.5 rounded shrink-0",
            children: "HIGH"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 831,
            columnNumber: 36
        }, this);
        $[11] = item.impact;
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    const t9 = `text-[9px] font-bold ml-auto ${sentColor}`;
    let t10;
    if ($[13] !== item.sentiment || $[14] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t9,
            children: item.sentiment
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 840,
            columnNumber: 11
        }, this);
        $[13] = item.sentiment;
        $[14] = t9;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== t10 || $[17] !== t4 || $[18] !== t5 || $[19] !== t7 || $[20] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 mb-1",
            children: [
                t4,
                t5,
                t7,
                t8,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 849,
            columnNumber: 11
        }, this);
        $[16] = t10;
        $[17] = t4;
        $[18] = t5;
        $[19] = t7;
        $[20] = t8;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    const t12 = item.summary || item.headline;
    let t13;
    if ($[22] !== item.key_figures || $[23] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[11px] text-[#e5e7eb] leading-snug",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Highlight"], {
                text: t12,
                keyFigures: item.key_figures
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 862,
                columnNumber: 68
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 862,
            columnNumber: 11
        }, this);
        $[22] = item.key_figures;
        $[23] = t12;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== expanded || $[26] !== item.headline || $[27] !== item.key_figures || $[28] !== item.raw_content || $[29] !== item.url) {
        t14 = expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[11px] text-[#e5e7eb]",
                    children: item.headline
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 871,
                    columnNumber: 107
                }, this),
                item.key_figures.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-1",
                    children: item.key_figures.map(_StockNewsRowItemKey_figuresMap)
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 871,
                    columnNumber: 204
                }, this),
                item.raw_content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[10px] text-[#6b7280] max-h-40 overflow-y-auto whitespace-pre-wrap",
                    children: item.raw_content
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 871,
                    columnNumber: 325
                }, this),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafeUrl"])(item.url) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: item.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-block text-[10px] text-[#10b981] hover:underline",
                    onClick: _StockNewsRowAOnClick,
                    children: "Open source →"
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 871,
                    columnNumber: 463
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 871,
            columnNumber: 23
        }, this);
        $[25] = expanded;
        $[26] = item.headline;
        $[27] = item.key_figures;
        $[28] = item.raw_content;
        $[29] = item.url;
        $[30] = t14;
    } else {
        t14 = $[30];
    }
    let t15;
    if ($[31] !== t11 || $[32] !== t13 || $[33] !== t14 || $[34] !== t2 || $[35] !== t3) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            onClick: t3,
            children: [
                t11,
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 883,
            columnNumber: 11
        }, this);
        $[31] = t11;
        $[32] = t13;
        $[33] = t14;
        $[34] = t2;
        $[35] = t3;
        $[36] = t15;
    } else {
        t15 = $[36];
    }
    return t15;
}
_s1(StockNewsRow, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c3 = StockNewsRow;
// ─── Search bar ───
function _StockNewsRowAOnClick(e) {
    return e.stopPropagation();
}
function _StockNewsRowItemKey_figuresMap(f, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-[10px] text-[#f59e0b] font-bold bg-[#f59e0b]/10 px-1.5 py-0.5 rounded",
        children: f
    }, i, false, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 901,
        columnNumber: 10
    }, this);
}
function StockSearch(t0) {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "d9ed711bdaebcd68bc54c0cb6f606773fd8a2ca72757f3972b1958fbe8e2bf55") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d9ed711bdaebcd68bc54c0cb6f606773fd8a2ca72757f3972b1958fbe8e2bf55";
    }
    const { onSelect } = t0;
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t2;
    let t3;
    if ($[2] !== query) {
        t2 = ({
            "StockSearch[useEffect()]": ()=>{
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
                if (query.length < 2) {
                    setResults([]);
                    setShow(false);
                    return;
                }
                timeout.current = setTimeout({
                    "StockSearch[useEffect() > setTimeout()]": async ()=>{
                        try {
                            const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchStocks"])(query);
                            setResults(r);
                            setShow(true);
                        } catch  {
                            setResults([]);
                        }
                    }
                }["StockSearch[useEffect() > setTimeout()]"], 300);
                return ()=>{
                    if (timeout.current) {
                        clearTimeout(timeout.current);
                    }
                };
            }
        })["StockSearch[useEffect()]"];
        t3 = [
            query
        ];
        $[2] = query;
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "StockSearch[useEffect()]": ()=>{
                const handleClick = function handleClick(e) {
                    if (ref.current && !ref.current.contains(e.target)) {
                        setShow(false);
                    }
                };
                document.addEventListener("mousedown", handleClick);
                return ()=>document.removeEventListener("mousedown", handleClick);
            }
        })["StockSearch[useEffect()]"];
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
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-4 h-4 text-[#374151] shrink-0",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 990,
                columnNumber: 113
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 990,
            columnNumber: 10
        }, this);
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "StockSearch[<input>.onChange]": (e_0)=>setQuery(e_0.target.value)
        })["StockSearch[<input>.onChange]"];
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] !== onSelect || $[10] !== query || $[11] !== results[0] || $[12] !== results.length) {
        t8 = ({
            "StockSearch[<input>.onKeyDown]": (e_1)=>{
                if (e_1.key === "Enter") {
                    if (results.length > 0) {
                        onSelect(results[0].symbol);
                    } else {
                        if (query.trim().length >= 1) {
                            onSelect(query.trim().toUpperCase());
                        }
                    }
                    setQuery("");
                    setShow(false);
                }
            }
        })["StockSearch[<input>.onKeyDown]"];
        $[9] = onSelect;
        $[10] = query;
        $[11] = results[0];
        $[12] = results.length;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== results.length) {
        t9 = ({
            "StockSearch[<input>.onFocus]": ()=>results.length > 0 && setShow(true)
        })["StockSearch[<input>.onFocus]"];
        $[14] = results.length;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== query || $[17] !== t8 || $[18] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: query,
            onChange: t7,
            onKeyDown: t8,
            onFocus: t9,
            placeholder: "Search any stock... (e.g. Reliance, TCS, Infosys)",
            className: "flex-1 bg-transparent text-sm text-[#e5e7eb] placeholder-[#374151] outline-none"
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 1041,
            columnNumber: 11
        }, this);
        $[16] = query;
        $[17] = t8;
        $[18] = t9;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    let t11;
    if ($[20] !== onSelect || $[21] !== query || $[22] !== results[0] || $[23] !== results.length) {
        t11 = ({
            "StockSearch[<button>.onClick]": ()=>{
                if (results.length > 0) {
                    onSelect(results[0].symbol);
                } else {
                    if (query.trim().length >= 1) {
                        onSelect(query.trim().toUpperCase());
                    }
                }
                setQuery("");
                setShow(false);
            }
        })["StockSearch[<button>.onClick]"];
        $[20] = onSelect;
        $[21] = query;
        $[22] = results[0];
        $[23] = results.length;
        $[24] = t11;
    } else {
        t11 = $[24];
    }
    let t12;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-4 h-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M14 5l7 7m0 0l-7 7m7-7H3"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 1074,
                columnNumber: 90
            }, this)
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 1074,
            columnNumber: 11
        }, this);
        $[25] = t12;
    } else {
        t12 = $[25];
    }
    let t13;
    if ($[26] !== t11) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t11,
            className: "text-[#374151] hover:text-[#10b981] transition-colors shrink-0",
            title: "Search",
            children: t12
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 1081,
            columnNumber: 11
        }, this);
        $[26] = t11;
        $[27] = t13;
    } else {
        t13 = $[27];
    }
    let t14;
    if ($[28] !== t10 || $[29] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 bg-[#0d1117] border border-[#1b2b1b] rounded-lg px-3 py-2",
            children: [
                t6,
                t10,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 1089,
            columnNumber: 11
        }, this);
        $[28] = t10;
        $[29] = t13;
        $[30] = t14;
    } else {
        t14 = $[30];
    }
    let t15;
    if ($[31] !== onSelect || $[32] !== results || $[33] !== show) {
        t15 = show && results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-full left-0 right-0 z-50 bg-[#0d1117] border border-[#1b2b1b] rounded-b-lg max-h-64 overflow-y-auto shadow-xl",
            children: results.map({
                "StockSearch[results.map()]": (r_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "StockSearch[results.map() > <button>.onClick]": ()=>{
                                onSelect(r_0.symbol);
                                setQuery("");
                                setShow(false);
                            }
                        }["StockSearch[results.map() > <button>.onClick]"],
                        className: "w-full text-left px-3 py-2 hover:bg-[#1b2b1b]/50 transition-colors flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-[#eab308] font-bold",
                                children: r_0.symbol
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 1105,
                                columnNumber: 174
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[#6b7280] truncate ml-2",
                                children: r_0.name
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 1105,
                                columnNumber: 244
                            }, this)
                        ]
                    }, r_0.symbol, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 1099,
                        columnNumber: 46
                    }, this)
            }["StockSearch[results.map()]"])
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 1098,
            columnNumber: 41
        }, this);
        $[31] = onSelect;
        $[32] = results;
        $[33] = show;
        $[34] = t15;
    } else {
        t15 = $[34];
    }
    let t16;
    if ($[35] !== t14 || $[36] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: "relative",
            children: [
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
            lineNumber: 1116,
            columnNumber: 11
        }, this);
        $[35] = t14;
        $[36] = t15;
        $[37] = t16;
    } else {
        t16 = $[37];
    }
    return t16;
}
_s2(StockSearch, "9f9qDDPmrta31nhJEEOdA4TK/Q4=");
_c4 = StockSearch;
function StockDetailPage() {
    _s3();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const rawSymbol = params.symbol.toUpperCase();
    const symbol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidSymbol"])(rawSymbol) ? rawSymbol : "";
    const [quote, setQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fundamentals, setFundamentals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [news, setNews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [sentimentFilter, setSentimentFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(symbol ? null : "Invalid stock symbol");
    // Load fast quote + news instantly, fundamentals lazy
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StockDetailPage.useEffect": ()=>{
            setLoading(true);
            setError(null);
            setQuote(null);
            setFundamentals(null);
            setNews([]);
            // Fast quote (~200ms)
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchFastQuote"])(symbol).then({
                "StockDetailPage.useEffect": (q)=>{
                    if (q?.symbol) setQuote(q);
                    else setError(`Could not load data for ${symbol}.`);
                }
            }["StockDetailPage.useEffect"]).catch({
                "StockDetailPage.useEffect": ()=>setError(`Could not load data for ${symbol}.`)
            }["StockDetailPage.useEffect"]).finally({
                "StockDetailPage.useEffect": ()=>setLoading(false)
            }["StockDetailPage.useEffect"]);
            // News (instant from DB)
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchNewsByTicker"])(symbol).then({
                "StockDetailPage.useEffect": (n)=>{
                    if (Array.isArray(n)) setNews(n);
                }
            }["StockDetailPage.useEffect"]).catch({
                "StockDetailPage.useEffect": ()=>{}
            }["StockDetailPage.useEffect"]);
            // Fundamentals (slower, loads in background)
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchFundamentals"])(symbol).then({
                "StockDetailPage.useEffect": (f)=>setFundamentals(f)
            }["StockDetailPage.useEffect"]).catch({
                "StockDetailPage.useEffect": ()=>{}
            }["StockDetailPage.useEffect"]);
        }
    }["StockDetailPage.useEffect"], [
        symbol
    ]);
    // Auto-refresh fast quote every 10s
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StockDetailPage.useEffect": ()=>{
            const interval = setInterval({
                "StockDetailPage.useEffect.interval": async ()=>{
                    try {
                        const q_0 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchFastQuote"])(symbol);
                        if (q_0?.symbol) setQuote(q_0);
                    } catch  {}
                }
            }["StockDetailPage.useEffect.interval"], 10_000);
            return ({
                "StockDetailPage.useEffect": ()=>clearInterval(interval)
            })["StockDetailPage.useEffect"];
        }
    }["StockDetailPage.useEffect"], [
        symbol
    ]);
    // Live news via SSE
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StockDetailPage.useEffect": ()=>{
            const es = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSSEConnection"])({
                "StockDetailPage.useEffect.es": (item)=>{
                    if (item.tickers.some({
                        "StockDetailPage.useEffect.es": (t)=>t.toUpperCase() === symbol
                    }["StockDetailPage.useEffect.es"])) {
                        setNews({
                            "StockDetailPage.useEffect.es": (prev)=>[
                                    item,
                                    ...prev
                                ]
                        }["StockDetailPage.useEffect.es"]);
                    }
                }
            }["StockDetailPage.useEffect.es"], {
                "StockDetailPage.useEffect.es": ()=>{}
            }["StockDetailPage.useEffect.es"], {
                "StockDetailPage.useEffect.es": ()=>{}
            }["StockDetailPage.useEffect.es"]);
            return ({
                "StockDetailPage.useEffect": ()=>es.close()
            })["StockDetailPage.useEffect"];
        }
    }["StockDetailPage.useEffect"], [
        symbol
    ]);
    const isPositive = (quote?.changePercent ?? 0) >= 0;
    const changeColor = isPositive ? "text-[#10b981]" : "text-[#ef4444]";
    const arrow = isPositive ? "\u25B2" : "\u25BC";
    const filteredNews = sentimentFilter === "all" ? news : news.filter((n_0)=>n_0.sentiment === sentimentFilter);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#080c08] flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-[#1b2b1b] px-4 py-2 flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/"),
                        className: "text-[#6b7280] hover:text-[#e5e7eb] transition-colors text-sm",
                        children: "← Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 1188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 max-w-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StockSearch, {
                            onSelect: (s)=>{
                                const u = s.toUpperCase();
                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidSymbol"])(u)) router.push(`/stock/${u}`);
                            }
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 1192,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 1191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 1187,
                columnNumber: 7
            }, this),
            loading && !quote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center justify-center text-[#374151]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: [
                                "Loading ",
                                symbol,
                                "..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 1201,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[10px] mt-1",
                            children: "Fetching data from NSE"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 1202,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 1200,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 1199,
                columnNumber: 28
            }, this) : error && !quote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-[#ef4444]",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 1206,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.location.reload(),
                            className: "mt-3 text-xs text-[#10b981] border border-[#1b2b1b] px-3 py-1.5 rounded hover:border-[#10b981] transition-colors",
                            children: "Retry"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 1207,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 1205,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 1204,
                columnNumber: 36
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-[#1b2b1b]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline gap-3 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-bold text-[#eab308]",
                                        children: symbol
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-[#6b7280]",
                                        children: quote?.companyName
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1216,
                                        columnNumber: 15
                                    }, this),
                                    fundamentals?.industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-[#374151] bg-[#1b2b1b] px-2 py-0.5 rounded",
                                        children: fundamentals.industry
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1219,
                                        columnNumber: 42
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 1214,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline gap-3 mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-[#e5e7eb] tabular-nums",
                                        children: [
                                            "₹",
                                            formatINR(quote?.ltp)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1224,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-lg font-bold ${changeColor} tabular-nums`,
                                        children: [
                                            arrow,
                                            " ",
                                            Math.abs(quote?.change ?? 0).toFixed(2),
                                            " (",
                                            Math.abs(quote?.changePercent ?? 0).toFixed(2),
                                            "%)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1227,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 1223,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 1213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 grid grid-cols-1 lg:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 flex flex-col gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] overflow-hidden",
                                        style: {
                                            height: "480px"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StockChart, {
                                            symbol: symbol
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                            lineNumber: 1241,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1238,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col",
                                        style: {
                                            maxHeight: "500px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold",
                                                                children: [
                                                                    "News for ",
                                                                    symbol
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1250,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-0.5",
                                                                children: [
                                                                    "all",
                                                                    "positive",
                                                                    "negative"
                                                                ].map((f_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setSentimentFilter(f_0),
                                                                        className: `text-[9px] font-bold px-1.5 py-0.5 rounded transition-colors ${sentimentFilter === f_0 ? f_0 === "positive" ? "bg-[#10b981]/20 text-[#10b981]" : f_0 === "negative" ? "bg-[#ef4444]/20 text-[#ef4444]" : "bg-[#1b2b1b] text-[#e5e7eb]" : "text-[#374151] hover:text-[#6b7280]"}`,
                                                                        children: f_0.charAt(0).toUpperCase() + f_0.slice(1)
                                                                    }, f_0, false, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 1254,
                                                                        columnNumber: 78
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1253,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1249,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-[#374151] font-bold",
                                                        children: filteredNews.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1259,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 1248,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 overflow-y-auto",
                                                children: filteredNews.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center h-20 text-[10px] text-[#374151]",
                                                    children: [
                                                        "No news for ",
                                                        symbol
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                    lineNumber: 1262,
                                                    columnNumber: 48
                                                }, this) : filteredNews.map((item_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StockNewsRow, {
                                                        item: item_0
                                                    }, item_0.id, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1264,
                                                        columnNumber: 57
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 1261,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1245,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 1236,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-4",
                                children: [
                                    quote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KeyStats, {
                                        quote: quote,
                                        fundamentals: fundamentals
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1272,
                                        columnNumber: 25
                                    }, this),
                                    fundamentals && (fundamentals.bid || fundamentals.ask) && (fundamentals.bid > 0 || fundamentals.ask > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2",
                                                children: "Bid / Ask"
                                            }, void 0, false, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 1276,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[11px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#10b981] font-bold",
                                                                children: [
                                                                    "Bid: ₹",
                                                                    formatINR(fundamentals.bid)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1281,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#ef4444] font-bold",
                                                                children: [
                                                                    "Ask: ₹",
                                                                    formatINR(fundamentals.ask)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1282,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1280,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-[#374151]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Size: ",
                                                                    formatVolume(fundamentals.bidSize)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1285,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Size: ",
                                                                    formatVolume(fundamentals.askSize)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1286,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1284,
                                                        columnNumber: 21
                                                    }, this),
                                                    fundamentals.bidSize && fundamentals.askSize && fundamentals.bidSize > 0 && fundamentals.askSize > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[9px] text-[#374151] uppercase mb-1",
                                                                children: "Buy vs Sell Pressure"
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1289,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-2 rounded-full overflow-hidden",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "bg-[#10b981]",
                                                                        style: {
                                                                            width: `${fundamentals.bidSize / (fundamentals.bidSize + fundamentals.askSize) * 100}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 1291,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "bg-[#ef4444] flex-1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 1294,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1290,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-[9px] mt-0.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[#10b981]",
                                                                        children: [
                                                                            (fundamentals.bidSize / (fundamentals.bidSize + fundamentals.askSize) * 100).toFixed(1),
                                                                            "% Buy"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 1297,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[#ef4444]",
                                                                        children: [
                                                                            (fundamentals.askSize / (fundamentals.bidSize + fundamentals.askSize) * 100).toFixed(1),
                                                                            "% Sell"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 1300,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1296,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1288,
                                                        columnNumber: 126
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 1279,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1275,
                                        columnNumber: 126
                                    }, this),
                                    quote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2",
                                                children: "Trade Summary"
                                            }, void 0, false, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 1310,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[11px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#374151]",
                                                                children: "Volume"
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1315,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#e5e7eb] font-bold tabular-nums",
                                                                children: formatVolume(quote.volume)
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1316,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1314,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[11px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#374151]",
                                                                children: "Day Range"
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1321,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#e5e7eb] font-bold tabular-nums",
                                                                children: [
                                                                    formatINR(quote.low),
                                                                    " - ",
                                                                    formatINR(quote.high)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1322,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1320,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[11px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#374151]",
                                                                children: "52W Range"
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1327,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#e5e7eb] font-bold tabular-nums",
                                                                children: [
                                                                    formatINR(quote.weekLow52),
                                                                    " - ",
                                                                    formatINR(quote.weekHigh52)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1328,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1326,
                                                        columnNumber: 21
                                                    }, this),
                                                    quote.weekHigh52 > 0 && quote.weekLow52 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative h-1.5 bg-[#1b2b1b] rounded-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute top-0 h-full w-1 bg-[#10b981] rounded-full",
                                                                style: {
                                                                    left: `${Math.min(100, Math.max(0, (quote.ltp - quote.weekLow52) / (quote.weekHigh52 - quote.weekLow52) * 100))}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 1335,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                            lineNumber: 1334,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 1333,
                                                        columnNumber: 69
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 1313,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 1309,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 1270,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 1234,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 1185,
        columnNumber: 10
    }, this);
}
_s3(StockDetailPage, "PATFeUQMsK9/8kH2U8NT8KKM3ls=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c5 = StockDetailPage;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "StockChart");
__turbopack_context__.k.register(_c1, "OrderBook");
__turbopack_context__.k.register(_c2, "KeyStats");
__turbopack_context__.k.register(_c3, "StockNewsRow");
__turbopack_context__.k.register(_c4, "StockSearch");
__turbopack_context__.k.register(_c5, "StockDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=internship_paisaMachine_frontend_app_67d8db37._.js.map