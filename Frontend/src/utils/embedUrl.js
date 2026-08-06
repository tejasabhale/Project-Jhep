export const getEmbedUrl = (url) => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);

    const slidesMatch = url.match(/presentation\/d\/([^/]+)/);

    if (slidesMatch) {
      return `https://docs.google.com/presentation/d/${slidesMatch[1]}/embed`;
    }

    const driveMatch = url.match(/\/d\/([^/]+)/);

    if (driveMatch) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }

    const driveId =
      parsedUrl.searchParams.get("id") || parsedUrl.searchParams.get("fileId");

    if (driveId) {
      return `https://drive.google.com/file/d/${driveId}/preview`;
    }

    let videoId = "";

    if (url.includes("/embed/")) {
      return url;
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.pathname === "/watch") {
      videoId = parsedUrl.searchParams.get("v");
    } else if (parsedUrl.pathname.startsWith("/shorts/")) {
      videoId = parsedUrl.pathname.split("/shorts/")[1];
    } else if (parsedUrl.pathname.startsWith("/live/")) {
      videoId = parsedUrl.pathname.split("/live/")[1];
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  } catch {
    return url;
  }
};
