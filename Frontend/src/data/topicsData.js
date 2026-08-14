import {
  FileText,
  FileVideo,
} from "lucide-react";

export const fileConfig = {
  pptx: {
    icon: FileText,
    label: "Slides",
    classes:
      "bg-orange-50 text-orange-700 ring-orange-200",
    thumbGradient:
      "from-orange-300 to-amber-200",
  },

  video: {
    icon: FileVideo,
    label: "Video",
    classes:
      "bg-indigo-50 text-indigo-700 ring-indigo-200",
    thumbGradient:
      "from-indigo-400 to-blue-300",
  },
};