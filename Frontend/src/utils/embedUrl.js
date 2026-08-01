export const getEmbedUrl = (url) => {
  if (!url) return "";

  // Google Slides
  if (url.includes("docs.google.com/presentation")) {
    return url.replace("/edit", "/embed").replace("/present", "/embed");
  }

  // Google Docs PDF Viewer
  if (url.includes("drive.google.com/file/d/")) {
    const fileId = url.match(/\/d\/(.*?)\//)?.[1];

    if (!fileId) return url;

    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // Google Drive open link
  if (url.includes("drive.google.com/open?id=")) {
    const fileId = url.split("id=")[1];

    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // YouTube
  if (url.includes("youtube.com/watch") || url.includes("youtu.be/")) {
    let videoId = "";

    if (url.includes("watch?v=")) {
      videoId = new URL(url).searchParams.get("v");
    } else {
      videoId = url.split("/").pop();
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
};
