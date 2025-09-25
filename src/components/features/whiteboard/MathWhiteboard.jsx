import { useRef, useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card.jsx";
import { Button } from "../../ui/wb-button.jsx";
import { Badge } from "../../ui/badge.jsx";
import {
    Pencil,
    Eraser,
    Circle as CircleIcon,
    Minus,
    Undo2,
    Redo2,
    RotateCcw,
    Save,
    Type,
} from "lucide-react";

export default function MathWhiteboard() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState("pen");
    const [currentColor, setCurrentColor] = useState("#6366f1");
    const [brushSize, setBrushSize] = useState(3);
    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [textInput, setTextInput] = useState(""); // for text tool

    const colors = ["#6366f1", "#000000", "#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6"];

    // redraw when paths change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        paths.forEach((path) => {
            if (path.points.length < 1) return;
            ctx.strokeStyle = path.color;
            ctx.lineWidth = path.width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            if (path.tool === "line" && path.points.length === 2) {
                ctx.beginPath();
                ctx.moveTo(path.points[0].x, path.points[0].y);
                ctx.lineTo(path.points[1].x, path.points[1].y);
                ctx.stroke();
            } else if (path.tool === "circle" && path.points.length === 2) {
                const [p1, p2] = path.points;
                const radius = Math.sqrt(
                    Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
                );
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(path.points[0].x, path.points[0].y);
                for (let i = 1; i < path.points.length; i++) {
                    ctx.lineTo(path.points[i].x, path.points[i].y);
                }
                ctx.stroke();
            }
        });
    }, [paths]);

    const getPointFromEvent = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }, []);

    const startDrawing = useCallback(
        (e) => {
            const point = getPointFromEvent(e);
            if (!point) return;
            setIsDrawing(true);
            setCurrentPath([point]);
        },
        [getPointFromEvent]
    );

    const draw = useCallback(
        (e) => {
            if (!isDrawing) return;
            const point = getPointFromEvent(e);
            if (!point) return;
            if (currentTool === "pen" || currentTool === "eraser") {
                setCurrentPath((prev) => [...prev, point]);
                const ctx = canvasRef.current && canvasRef.current.getContext("2d");
                if (!ctx || currentPath.length === 0) return;
                ctx.strokeStyle = currentTool === "eraser" ? "#ffffff" : currentColor;
                ctx.lineWidth = currentTool === "eraser" ? brushSize * 2 : brushSize;
                ctx.beginPath();
                ctx.moveTo(currentPath[currentPath.length - 1].x, currentPath[currentPath.length - 1].y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            } else if (currentTool === "line" || currentTool === "circle") {
                // preview shape while drawing
                if (currentPath.length === 1) {
                    const start = currentPath[0];
                    const ctx = canvasRef.current && canvasRef.current.getContext("2d");
                    if (!ctx) return;
                    const w = canvasRef.current ? canvasRef.current.width : 0;
                    const h = canvasRef.current ? canvasRef.current.height : 0;
                    ctx.clearRect(0, 0, w, h);
                }
            }
        },
        [isDrawing, getPointFromEvent, currentTool, currentColor, brushSize, currentPath, paths]
    );

    const stopDrawing = useCallback(() => {
        if (!isDrawing || currentPath.length === 0) return;
        const newPath = {
            points: currentPath,
            color: currentTool === "eraser" ? "#ffffff" : currentColor,
            width: currentTool === "eraser" ? brushSize * 2 : brushSize,
            tool: currentTool,
        };
        const newPaths = [...paths, newPath];
        setPaths(newPaths);
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newPaths);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setIsDrawing(false);
        setCurrentPath([]);
    }, [isDrawing, currentPath, paths, currentTool, currentColor, brushSize, history, historyIndex]);

    const undo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setPaths(history[newIndex] || []);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setPaths(history[newIndex] || []);
        }
    };

    const clearCanvas = () => {
        setPaths([]);
        const newHistory = [...history, []];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const saveCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = "whiteboard.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    const addText = (e) => {
        if (currentTool !== "text" || !textInput) return;
        const point = getPointFromEvent(e);
        if (!point) return;
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = currentColor;
        ctx.font = `${brushSize * 4}px Arial`;
        ctx.fillText(textInput, point.x, point.y);
        setTextInput("");
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Toolbar */}
            <Card className="m-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Mathematics Whiteboard <Badge variant="secondary">Interactive</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Button onClick={() => setCurrentTool("pen")} variant={currentTool === "pen" ? "default" : "outline"}>
                        <Pencil className="w-4 h-4" /> Pen
                    </Button>
                    <Button onClick={() => setCurrentTool("eraser")} variant={currentTool === "eraser" ? "default" : "outline"}>
                        <Eraser className="w-4 h-4" /> Eraser
                    </Button>
                    <Button onClick={() => setCurrentTool("line")} variant={currentTool === "line" ? "default" : "outline"}>
                        <Minus className="w-4 h-4" /> Line
                    </Button>
                    <Button onClick={() => setCurrentTool("circle")} variant={currentTool === "circle" ? "default" : "outline"}>
                        <CircleIcon className="w-4 h-4" /> Circle
                    </Button>
                    <Button onClick={() => setCurrentTool("text")} variant={currentTool === "text" ? "default" : "outline"}>
                        <Type className="w-4 h-4" /> Text
                    </Button>
                    <Button onClick={undo} disabled={historyIndex <= 0}><Undo2 className="w-4 h-4" /> Undo</Button>
                    <Button onClick={redo} disabled={historyIndex >= history.length - 1}><Redo2 className="w-4 h-4" /> Redo</Button>
                    <Button onClick={clearCanvas}><RotateCcw className="w-4 h-4" /> Clear</Button>
                    <Button onClick={saveCanvas}><Save className="w-4 h-4" /> Save</Button>
                </CardContent>
                {currentTool === "text" && (
                    <div className="px-4 pb-4">
                        <input
                            type="text"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder="Type and click on canvas..."
                            className="border px-2 py-1 rounded w-full"
                        />
                    </div>
                )}
            </Card>

            {/* Canvas */}
            <div className="flex-1 p-2">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full bg-white rounded-md border cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={(e) => {
                        if (currentTool === "text") {
                            addText(e);
                        } else {
                            stopDrawing();
                        }
                    }}
                    onMouseLeave={stopDrawing}
                    onTouchStart={(e) => {
                        e.preventDefault();
                        startDrawing(e);
                    }}
                    onTouchMove={(e) => {
                        e.preventDefault();
                        draw(e);
                    }}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        stopDrawing();
                    }}
                />
            </div>
        </div>
    );
}