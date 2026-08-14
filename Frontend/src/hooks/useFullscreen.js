import { useCallback, useEffect, useState } from "react";

export function useFullscreen(ref) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === ref.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    handleFullscreenChange();

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [ref]);

  const toggle = useCallback(async () => {
    try {
      if (document.fullscreenElement === ref.current) {
        await document.exitFullscreen();
        return;
      }

      if (ref.current) {
        await ref.current.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }, [ref]);

  return [isFullscreen, toggle];
}
