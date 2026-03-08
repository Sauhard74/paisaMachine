module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/internship/paisaMachine/frontend/app/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
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
}),
"[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Highlight",
    ()=>Highlight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function Highlight({ text, keyFigures }) {
    if (!keyFigures || keyFigures.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: text
        }, void 0, false, {
            fileName: "[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx",
            lineNumber: 10,
            columnNumber: 12
        }, this);
    }
    const escaped = keyFigures.map((f)=>f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(regex);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        children: parts.map((part, i)=>{
            const isHighlight = keyFigures.some((f)=>f.toLowerCase() === part.toLowerCase());
            return isHighlight ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-orange-400 font-bold",
                children: part
            }, i, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx",
                lineNumber: 26,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: part
            }, i, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx",
                lineNumber: 30,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StockDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/internship/paisaMachine/frontend/app/components/Highlight.tsx [app-ssr] (ecmascript)");
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
    const chartContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const seriesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const volumeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeInterval, setActiveInterval] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(2); // default 15m
    const loadChart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (idx)=>{
        const opt = INTERVAL_OPTIONS[idx];
        try {
            const candles = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchChartData"])(symbol, opt.interval, opt.range);
            if (!candles || !Array.isArray(candles) || candles.length === 0) return;
            // Lazy-load lightweight-charts
            const { createChart, CandlestickSeries, HistogramSeries } = await __turbopack_context__.A("[project]/internship/paisaMachine/frontend/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-ssr] (ecmascript, async loader)");
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
                const ro = new ResizeObserver(()=>{
                    if (chartContainerRef.current) {
                        chart.applyOptions({
                            width: chartContainerRef.current.clientWidth,
                            height: chartContainerRef.current.clientHeight
                        });
                    }
                });
                ro.observe(chartContainerRef.current);
            }
            // Set data
            const formatted = candles.map((c)=>({
                    time: c.time,
                    open: c.open,
                    high: c.high,
                    low: c.low,
                    close: c.close
                }));
            const volumeData = candles.map((c)=>({
                    time: c.time,
                    value: c.volume,
                    color: c.close >= c.open ? "#10b98140" : "#ef444440"
                }));
            seriesRef.current.setData(formatted);
            volumeRef.current.setData(volumeData);
            chartRef.current.timeScale().fitContent();
        } catch (err) {
            console.error("Chart load error:", err);
        }
    }, [
        symbol
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadChart(activeInterval);
        // For intraday: use SSE stream for live candle updates
        const opt = INTERVAL_OPTIONS[activeInterval];
        const isIntraday = [
            "1m",
            "5m",
            "15m"
        ].includes(opt.interval);
        if (isIntraday) {
            const es = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChartStream"])(symbol, opt.interval, (newCandles)=>{
                if (!seriesRef.current || !volumeRef.current) return;
                for (const c of newCandles){
                    seriesRef.current.update({
                        time: c.time,
                        open: c.open,
                        high: c.high,
                        low: c.low,
                        close: c.close
                    });
                    volumeRef.current.update({
                        time: c.time,
                        value: c.volume,
                        color: c.close >= c.open ? "#10b98140" : "#ef444440"
                    });
                }
            }, ()=>{});
            return ()=>es.close();
        }
    }, [
        activeInterval,
        loadChart,
        symbol
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
                seriesRef.current = null;
                volumeRef.current = null;
            }
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1 px-3 py-1.5 border-b border-[#1b2b1b]",
                children: INTERVAL_OPTIONS.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        children: opt.label
                    }, opt.label, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: chartContainerRef,
                className: "flex-1"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
// ─── Order Book ───
function OrderBook({ bid, ask, totalBuy, totalSell }) {
    const maxQty = Math.max(...bid.map((b)=>b.quantity), ...ask.map((a)=>a.quantity), 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2",
                children: "Order Book (Top 5)"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-[9px] text-[#374151] uppercase mb-1 px-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Qty"
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Bid"
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            bid.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex justify-between text-[11px] py-0.5 px-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-[#10b981]/10 rounded-sm",
                                            style: {
                                                width: `${b.quantity / maxQty * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                            lineNumber: 265,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative text-[#e5e7eb] tabular-nums",
                                            children: formatVolume(b.quantity)
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                            lineNumber: 269,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative text-[#10b981] font-bold tabular-nums",
                                            children: formatINR(b.price)
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-[#10b981] font-bold mt-1 px-1",
                                children: [
                                    "Total Buy: ",
                                    formatVolume(totalBuy)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-[9px] text-[#374151] uppercase mb-1 px-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Ask"
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Qty"
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 285,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this),
                            ask.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex justify-between text-[11px] py-0.5 px-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 right-0 bg-[#ef4444]/10 rounded-sm ml-auto",
                                            style: {
                                                width: `${a.quantity / maxQty * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                            lineNumber: 289,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative text-[#ef4444] font-bold tabular-nums",
                                            children: formatINR(a.price)
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative text-[#e5e7eb] tabular-nums",
                                            children: formatVolume(a.quantity)
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                            lineNumber: 296,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-[#ef4444] font-bold mt-1 px-1 text-right",
                                children: [
                                    "Total Sell: ",
                                    formatVolume(totalSell)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 282,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
}
// ─── Key Stats Grid ───
function KeyStats({ quote, fundamentals }) {
    const f = fundamentals;
    const stats = [
        {
            label: "Open",
            value: formatINR(quote.open)
        },
        {
            label: "Prev Close",
            value: formatINR(quote.previousClose)
        },
        {
            label: "Day High",
            value: formatINR(quote.high)
        },
        {
            label: "Day Low",
            value: formatINR(quote.low)
        },
        {
            label: "52W High",
            value: formatINR(quote.weekHigh52)
        },
        {
            label: "52W Low",
            value: formatINR(quote.weekLow52)
        },
        {
            label: "Volume",
            value: formatVolume(quote.volume)
        },
        {
            label: "Market Cap",
            value: f?.marketCap ? `₹${formatVolume(f.marketCap)}` : "..."
        },
        {
            label: "P/E (TTM)",
            value: f?.pe ? f.pe.toFixed(2) : "..."
        },
        {
            label: "P/E (Fwd)",
            value: f?.forwardPe ? f.forwardPe.toFixed(2) : "..."
        },
        {
            label: "P/B Ratio",
            value: f?.pb ? f.pb.toFixed(2) : "..."
        },
        {
            label: "EPS",
            value: f?.eps ? `₹${f.eps.toFixed(2)}` : "..."
        },
        {
            label: "Book Value",
            value: f?.bookValue ? `₹${f.bookValue.toFixed(2)}` : "..."
        },
        {
            label: "Div Yield",
            value: f?.dividendYield ? `${f.dividendYield}%` : "..."
        },
        {
            label: "Beta",
            value: f?.beta ? f.beta.toFixed(2) : "..."
        },
        {
            label: "ROE",
            value: f?.roe ? `${f.roe}%` : "..."
        },
        {
            label: "D/E Ratio",
            value: f?.debtToEquity ? f.debtToEquity.toFixed(2) : "..."
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2",
                children: "Key Statistics"
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-x-4 gap-y-1.5",
                children: stats.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-[11px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#374151]",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 341,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#e5e7eb] font-bold tabular-nums",
                                children: s.value
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 342,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.label, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 334,
        columnNumber: 5
    }, this);
}
// ─── News Item Row ───
function StockNewsRow({ item }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const published = formatIST(item.published_at);
    const sentBg = item.sentiment === "positive" ? "bg-[#10b981]" : item.sentiment === "negative" ? "bg-[#ef4444]" : "bg-[#6b7280]";
    const sentColor = item.sentiment === "positive" ? "text-[#10b981]" : item.sentiment === "negative" ? "text-[#ef4444]" : "text-[#6b7280]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `px-3 py-2.5 border-b border-[#1b2b1b]/50 cursor-pointer hover:bg-[#1b2b1b]/30 transition-colors ${item.impact === "high" ? "border-l-2 border-l-[#f59e0b]" : ""} ${expanded ? "bg-[#0a1a0a]" : ""}`,
        onClick: ()=>setExpanded(!expanded),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] font-bold text-[#e5e7eb] tabular-nums",
                        children: published.time
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] text-[#374151]",
                        children: published.date
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `w-1.5 h-1.5 rounded-full shrink-0 ${sentBg}`
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    item.impact === "high" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[8px] text-[#f59e0b] font-bold uppercase bg-[#f59e0b]/10 px-1.5 py-0.5 rounded shrink-0",
                        children: "HIGH"
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-[9px] font-bold ml-auto ${sentColor}`,
                        children: item.sentiment
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[11px] text-[#e5e7eb] leading-snug",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$components$2f$Highlight$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Highlight"], {
                    text: item.summary || item.headline,
                    keyFigures: item.key_figures
                }, void 0, false, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 391,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 390,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[11px] text-[#e5e7eb]",
                        children: item.headline
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this),
                    item.key_figures.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1",
                        children: item.key_figures.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-[#f59e0b] font-bold bg-[#f59e0b]/10 px-1.5 py-0.5 rounded",
                                children: f
                            }, i, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 399,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 397,
                        columnNumber: 13
                    }, this),
                    item.raw_content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] text-[#6b7280] max-h-40 overflow-y-auto whitespace-pre-wrap",
                        children: item.raw_content
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 406,
                        columnNumber: 13
                    }, this),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafeUrl"])(item.url) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: item.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-block text-[10px] text-[#10b981] hover:underline",
                        onClick: (e)=>e.stopPropagation(),
                        children: "Open source →"
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 411,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 394,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 369,
        columnNumber: 5
    }, this);
}
// ─── Search bar ───
function StockSearch({ onSelect }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (timeout.current) clearTimeout(timeout.current);
        if (query.length < 2) {
            setResults([]);
            setShow(false);
            return;
        }
        timeout.current = setTimeout(async ()=>{
            try {
                const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchStocks"])(query);
                setResults(r);
                setShow(true);
            } catch  {
                setResults([]);
            }
        }, 300);
        return ()=>{
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, [
        query
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setShow(false);
        }
        document.addEventListener("mousedown", handleClick);
        return ()=>document.removeEventListener("mousedown", handleClick);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 bg-[#0d1117] border border-[#1b2b1b] rounded-lg px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 text-[#374151] shrink-0",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 468,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 467,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === "Enter") {
                                if (results.length > 0) {
                                    onSelect(results[0].symbol);
                                } else if (query.trim().length >= 1) {
                                    onSelect(query.trim().toUpperCase());
                                }
                                setQuery("");
                                setShow(false);
                            }
                        },
                        onFocus: ()=>results.length > 0 && setShow(true),
                        placeholder: "Search any stock... (e.g. Reliance, TCS, Infosys)",
                        className: "flex-1 bg-transparent text-sm text-[#e5e7eb] placeholder-[#374151] outline-none"
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 470,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (results.length > 0) {
                                onSelect(results[0].symbol);
                            } else if (query.trim().length >= 1) {
                                onSelect(query.trim().toUpperCase());
                            }
                            setQuery("");
                            setShow(false);
                        },
                        className: "text-[#374151] hover:text-[#10b981] transition-colors shrink-0",
                        title: "Search",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M14 5l7 7m0 0l-7 7m7-7H3"
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 503,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 502,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 489,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, this),
            show && results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 right-0 z-50 bg-[#0d1117] border border-[#1b2b1b] rounded-b-lg max-h-64 overflow-y-auto shadow-xl",
                children: results.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            onSelect(r.symbol);
                            setQuery("");
                            setShow(false);
                        },
                        className: "w-full text-left px-3 py-2 hover:bg-[#1b2b1b]/50 transition-colors flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-[#eab308] font-bold",
                                children: r.symbol
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 519,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[#6b7280] truncate ml-2",
                                children: r.name
                            }, void 0, false, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 520,
                                columnNumber: 15
                            }, this)
                        ]
                    }, r.symbol, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 510,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 508,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 465,
        columnNumber: 5
    }, this);
}
function StockDetailPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const rawSymbol = params.symbol.toUpperCase();
    const symbol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidSymbol"])(rawSymbol) ? rawSymbol : "";
    const [quote, setQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fundamentals, setFundamentals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [news, setNews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [sentimentFilter, setSentimentFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(symbol ? null : "Invalid stock symbol");
    // Load fast quote + news instantly, fundamentals lazy
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLoading(true);
        setError(null);
        setQuote(null);
        setFundamentals(null);
        setNews([]);
        // Fast quote (~200ms)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchFastQuote"])(symbol).then((q)=>{
            if (q?.symbol) setQuote(q);
            else setError(`Could not load data for ${symbol}.`);
        }).catch(()=>setError(`Could not load data for ${symbol}.`)).finally(()=>setLoading(false));
        // News (instant from DB)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchNewsByTicker"])(symbol).then((n)=>{
            if (Array.isArray(n)) setNews(n);
        }).catch(()=>{});
        // Fundamentals (slower, loads in background)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchFundamentals"])(symbol).then((f)=>setFundamentals(f)).catch(()=>{});
    }, [
        symbol
    ]);
    // Auto-refresh fast quote every 10s
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = setInterval(async ()=>{
            try {
                const q = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchFastQuote"])(symbol);
                if (q?.symbol) setQuote(q);
            } catch  {}
        }, 10_000);
        return ()=>clearInterval(interval);
    }, [
        symbol
    ]);
    // Live news via SSE
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const es = (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSSEConnection"])((item)=>{
            if (item.tickers.some((t)=>t.toUpperCase() === symbol)) {
                setNews((prev)=>[
                        item,
                        ...prev
                    ]);
            }
        }, ()=>{}, ()=>{});
        return ()=>es.close();
    }, [
        symbol
    ]);
    const isPositive = (quote?.changePercent ?? 0) >= 0;
    const changeColor = isPositive ? "text-[#10b981]" : "text-[#ef4444]";
    const arrow = isPositive ? "\u25B2" : "\u25BC";
    const filteredNews = sentimentFilter === "all" ? news : news.filter((n)=>n.sentiment === sentimentFilter);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#080c08] flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-[#1b2b1b] px-4 py-2 flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/"),
                        className: "text-[#6b7280] hover:text-[#e5e7eb] transition-colors text-sm",
                        children: "← Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 609,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 max-w-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StockSearch, {
                            onSelect: (s)=>{
                                const u = s.toUpperCase();
                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidSymbol"])(u)) router.push(`/stock/${u}`);
                            }
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 616,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 615,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 608,
                columnNumber: 7
            }, this),
            loading && !quote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center justify-center text-[#374151]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: [
                                "Loading ",
                                symbol,
                                "..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 623,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[10px] mt-1",
                            children: "Fetching data from NSE"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 624,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 622,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 621,
                columnNumber: 9
            }, this) : error && !quote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-[#ef4444]",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 630,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.location.reload(),
                            className: "mt-3 text-xs text-[#10b981] border border-[#1b2b1b] px-3 py-1.5 rounded hover:border-[#10b981] transition-colors",
                            children: "Retry"
                        }, void 0, false, {
                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                            lineNumber: 631,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                    lineNumber: 629,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                lineNumber: 628,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-[#1b2b1b]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline gap-3 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-bold text-[#eab308]",
                                        children: symbol
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 644,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-[#6b7280]",
                                        children: quote?.companyName
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 645,
                                        columnNumber: 15
                                    }, this),
                                    fundamentals?.industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-[#374151] bg-[#1b2b1b] px-2 py-0.5 rounded",
                                        children: fundamentals.industry
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 649,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 643,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline gap-3 mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-[#e5e7eb] tabular-nums",
                                        children: [
                                            "₹",
                                            formatINR(quote?.ltp)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 655,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        lineNumber: 658,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 654,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 642,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 grid grid-cols-1 lg:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 flex flex-col gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] overflow-hidden",
                                        style: {
                                            height: "480px"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StockChart, {
                                            symbol: symbol
                                        }, void 0, false, {
                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                            lineNumber: 670,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 669,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col",
                                        style: {
                                            maxHeight: "500px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold",
                                                                children: [
                                                                    "News for ",
                                                                    symbol
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 677,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-0.5",
                                                                children: [
                                                                    "all",
                                                                    "positive",
                                                                    "negative"
                                                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setSentimentFilter(f),
                                                                        className: `text-[9px] font-bold px-1.5 py-0.5 rounded transition-colors ${sentimentFilter === f ? f === "positive" ? "bg-[#10b981]/20 text-[#10b981]" : f === "negative" ? "bg-[#ef4444]/20 text-[#ef4444]" : "bg-[#1b2b1b] text-[#e5e7eb]" : "text-[#374151] hover:text-[#6b7280]"}`,
                                                                        children: f.charAt(0).toUpperCase() + f.slice(1)
                                                                    }, f, false, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 682,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 680,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 676,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-[#374151] font-bold",
                                                        children: filteredNews.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 700,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 675,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 overflow-y-auto",
                                                children: filteredNews.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center h-20 text-[10px] text-[#374151]",
                                                    children: [
                                                        "No news for ",
                                                        symbol
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                    lineNumber: 704,
                                                    columnNumber: 21
                                                }, this) : filteredNews.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StockNewsRow, {
                                                        item: item
                                                    }, item.id, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 709,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 702,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 674,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 667,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-4",
                                children: [
                                    quote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KeyStats, {
                                        quote: quote,
                                        fundamentals: fundamentals
                                    }, void 0, false, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 719,
                                        columnNumber: 25
                                    }, this),
                                    fundamentals && (fundamentals.bid || fundamentals.ask) && (fundamentals.bid > 0 || fundamentals.ask > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2",
                                                children: "Bid / Ask"
                                            }, void 0, false, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 724,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[11px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#10b981] font-bold",
                                                                children: [
                                                                    "Bid: ₹",
                                                                    formatINR(fundamentals.bid)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 729,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#ef4444] font-bold",
                                                                children: [
                                                                    "Ask: ₹",
                                                                    formatINR(fundamentals.ask)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 730,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 728,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-[#374151]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Size: ",
                                                                    formatVolume(fundamentals.bidSize)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 733,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Size: ",
                                                                    formatVolume(fundamentals.askSize)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 734,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 732,
                                                        columnNumber: 21
                                                    }, this),
                                                    fundamentals.bidSize && fundamentals.askSize && fundamentals.bidSize > 0 && fundamentals.askSize > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[9px] text-[#374151] uppercase mb-1",
                                                                children: "Buy vs Sell Pressure"
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 738,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-2 rounded-full overflow-hidden",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "bg-[#10b981]",
                                                                        style: {
                                                                            width: `${fundamentals.bidSize / (fundamentals.bidSize + fundamentals.askSize) * 100}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 740,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "bg-[#ef4444] flex-1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 744,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 739,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-[9px] mt-0.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[#10b981]",
                                                                        children: [
                                                                            (fundamentals.bidSize / (fundamentals.bidSize + fundamentals.askSize) * 100).toFixed(1),
                                                                            "% Buy"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 747,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[#ef4444]",
                                                                        children: [
                                                                            (fundamentals.askSize / (fundamentals.bidSize + fundamentals.askSize) * 100).toFixed(1),
                                                                            "% Sell"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                        lineNumber: 750,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 746,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 737,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 727,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 723,
                                        columnNumber: 17
                                    }, this),
                                    quote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2",
                                                children: "Trade Summary"
                                            }, void 0, false, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 763,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[11px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#374151]",
                                                                children: "Volume"
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 768,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#e5e7eb] font-bold tabular-nums",
                                                                children: formatVolume(quote.volume)
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 769,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 767,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[11px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#374151]",
                                                                children: "Day Range"
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 774,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#e5e7eb] font-bold tabular-nums",
                                                                children: [
                                                                    formatINR(quote.low),
                                                                    " - ",
                                                                    formatINR(quote.high)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 775,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 773,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[11px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#374151]",
                                                                children: "52W Range"
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 780,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#e5e7eb] font-bold tabular-nums",
                                                                children: [
                                                                    formatINR(quote.weekLow52),
                                                                    " - ",
                                                                    formatINR(quote.weekHigh52)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 781,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 779,
                                                        columnNumber: 21
                                                    }, this),
                                                    quote.weekHigh52 > 0 && quote.weekLow52 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative h-1.5 bg-[#1b2b1b] rounded-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$internship$2f$paisaMachine$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute top-0 h-full w-1 bg-[#10b981] rounded-full",
                                                                style: {
                                                                    left: `${Math.min(100, Math.max(0, (quote.ltp - quote.weekLow52) / (quote.weekHigh52 - quote.weekLow52) * 100))}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                                lineNumber: 789,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                            lineNumber: 788,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                        lineNumber: 787,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                                lineNumber: 766,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                        lineNumber: 762,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                                lineNumber: 717,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
                        lineNumber: 665,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/internship/paisaMachine/frontend/app/stock/[symbol]/page.tsx",
        lineNumber: 606,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fa084696._.js.map