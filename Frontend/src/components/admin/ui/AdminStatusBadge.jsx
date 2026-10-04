import React from "react";
import { CheckCircle2, Clock, Star, Video, FileText, Shield, User, Circle } from "lucide-react";

export default function AdminStatusBadge({ status, type = "status", size = "sm", className = "" }) {
  const norm = String(status || "").toLowerCase().trim();

  let label = status;
  let bgClass = "bg-surface-muted text-text-secondary border-border";
  let dotClass = "bg-text-muted";
  let Icon = null;

  if (type === "published" || norm === "published" || norm === "true") {
    label = "Published";
    bgClass = "bg-success-light text-success border-success/20";
    dotClass = "bg-success";
    Icon = CheckCircle2;
  } else if (norm === "unpublished" || norm === "false" || norm === "draft") {
    label = norm === "draft" ? "Draft" : "Unpublished";
    bgClass = "bg-surface-muted text-text-muted border-border";
    dotClass = "bg-text-muted";
    Icon = Clock;
  } else if (norm === "active") {
    label = "Active";
    bgClass = "bg-success-light text-success border-success/20";
    dotClass = "bg-success";
    Icon = Circle;
  } else if (norm === "inactive" || norm === "offline") {
    label = norm === "offline" ? "Offline" : "Inactive";
    bgClass = "bg-surface-muted text-text-muted border-border";
    dotClass = "bg-text-muted";
    Icon = Circle;
  } else if (norm === "featured") {
    label = "Featured";
    bgClass = "bg-amber-50 text-amber-600 border-amber-200";
    dotClass = "bg-amber-500";
    Icon = Star;
  } else if (norm === "admin") {
    label = "Admin";
    bgClass = "bg-primary-light text-primary-dark border-primary/20";
    dotClass = "bg-primary";
    Icon = Shield;
  } else if (norm === "owner") {
    label = "Owner";
    bgClass = "bg-purple-50 text-purple-700 border-purple-200";
    dotClass = "bg-purple-600";
    Icon = Shield;
  } else if (norm === "user") {
    label = "User";
    bgClass = "bg-secondary-light text-secondary border-secondary/20";
    dotClass = "bg-secondary";
    Icon = User;
  } else if (norm === "video") {
    label = "Video";
    bgClass = "bg-sky-50 text-sky-700 border-sky-200";
    dotClass = "bg-sky-500";
    Icon = Video;
  } else if (norm === "pptx" || norm === "ppt") {
    label = "Presentation";
    bgClass = "bg-orange-50 text-orange-700 border-orange-200";
    dotClass = "bg-orange-500";
    Icon = FileText;
  }

  const sizeClasses =
    size === "xs"
      ? "text-[11px] px-2 py-0.5 gap-1.5"
      : "text-xs px-2.5 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${bgClass} ${sizeClasses} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${dotClass}`} />
      <span className="capitalize">{label}</span>
    </span>
  );
}
