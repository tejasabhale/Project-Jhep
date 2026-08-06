import Card from "../common/Card";
import EmptyState from "../common/EmptyState";
import PPTViewer from "./PPTViewer";

import { FileText, VideoOff, Music2 } from "lucide-react";

import { getEmbedUrl } from "../../utils/embedUrl";

export default function ContentTab({ contents }) {
  if (!contents || contents.length === 0) {
    return (
      <EmptyState icon={FileText} message="No lesson content available." />
    );
  }

  return (
    <div className="space-y-8">
      {contents.map((item) => {
        switch (item.blockType) {
          case "ppt":
          case "pdf":
            return (
              <PPTViewer
                key={item._id}
                title={item.title}
                url={item.file?.url}
              />
            );

          case "video":
            return (
              <Card key={item._id}>
                {item.title && (
                  <h3 className="mb-5 text-xl font-bold text-slate-800">
                    {item.title}
                  </h3>
                )}

                {item.file?.url ? (
                  <iframe
                    src={getEmbedUrl(item.file.url)}
                    title={item.title}
                    className="aspect-video w-full rounded-xl border"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-60 items-center justify-center rounded-xl bg-slate-100">
                    <VideoOff className="h-10 w-10 text-slate-400" />
                  </div>
                )}
              </Card>
            );

          case "audio":
            return (
              <Card key={item._id}>
                {item.title && (
                  <h3 className="mb-5 text-xl font-bold text-slate-800">
                    {item.title}
                  </h3>
                )}

                {item.file?.url ? (
                  <audio controls className="w-full">
                    <source src={item.file.url} />
                    Your browser does not support audio.
                  </audio>
                ) : (
                  <div className="flex h-20 items-center justify-center rounded-xl bg-slate-100">
                    <Music2 className="h-8 w-8 text-slate-400" />
                  </div>
                )}

                {item.body && (
                  <p className="mt-4 leading-7 text-slate-600">{item.body}</p>
                )}
              </Card>
            );

          default:
            return (
              <Card key={item._id}>
                <p className="text-red-500">
                  Unsupported block type: {item.blockType}
                </p>
              </Card>
            );
        }
      })}
    </div>
  );
}
