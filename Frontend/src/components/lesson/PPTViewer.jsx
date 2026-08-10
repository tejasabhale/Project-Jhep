import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";

const getEmbedUrl = (url) => {
  if (!url) return "";

  // Already an embed URL
  if (url.includes("/embed")) {
    return url;
  }

  // Published Google Slides
  if (url.includes("docs.google.com/presentation") && url.includes("/d/e/")) {
    return url.replace("/pub", "/embed");
  }

  // Normal Google Slides
  if (url.includes("docs.google.com/presentation")) {
    const match = url.match(/presentation\/d\/([^/]+)/);

    if (match) {
      return `https://docs.google.com/presentation/d/${match[1]}/embed`;
    }
  }

  // Google Drive file
  if (url.includes("drive.google.com/file/d/")) {
    const match = url.match(/\/d\/([^/]+)/);

    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  // Old Google Drive open link
  if (url.includes("drive.google.com/open?id=")) {
    const id = new URL(url).searchParams.get("id");

    if (id) {
      return `https://drive.google.com/file/d/${id}/preview`;
    }
  }

  return url;
};

export default function PPTViewer({ url, title = "Lesson Content" }) {
  const containerRef = useRef(null);

  const [fullscreen, setFullscreen] = useState(false);

  const embedUrl = useMemo(() => getEmbedUrl(url), [url]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (!embedUrl) {
    return (
      <Card>
        <div className="flex h-64 items-center justify-center">
          <p className="text-slate-500">No lesson content available.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          title={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </Button>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
      >
        {fullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute right-4 top-4 z-50 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-orange-600"
          >
            Exit Fullscreen
          </button>
        )}

        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="autoplay"
          allowFullScreen
        />
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        Click the fullscreen button for a better viewing experience.
      </p>
    </Card>
  );
}
