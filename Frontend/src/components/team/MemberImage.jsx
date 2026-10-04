export default function MemberImage({ member, size = "large", orbit = false }) {
  const imageSize =
    size === "large"
      ? "h-32 w-32 md:h-36 md:w-36"
      : "h-28 w-28 md:h-32 md:w-32";

  return (
    <div className={`relative ${imageSize}`}>
      {orbit && (
        <>
          <span className="orbit-ring pointer-events-none absolute -inset-4 rounded-full border border-dashed border-primary-light md:-inset-5" />

          <span className="orbit-dot pointer-events-none absolute -inset-4 rounded-full md:-inset-5" />
        </>
      )}

      <div className="image-frame relative h-full w-full rounded-full bg-[var(--gradient-primary)] p-[3px] transition-transform duration-500 ease-out">
        <img
          src={
            member.photo?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              member.name,
            )}&background=f97316&color=ffffff&size=256`
          }
          alt={member.name}
          className="h-full w-full rounded-full border-4 border-surface object-cover"
        />
      </div>
    </div>
  );
}
