import { Mail } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function SocialLinks({ member }) {
  if (!member.linkedin && !member.github && !member.twitter && !member.email) {
    return null;
  }

  const links = [
    {
      href: member.linkedin,
      label: "LinkedIn",
      Icon: FaLinkedinIn,
    },
    {
      href: member.github,
      label: "GitHub",
      Icon: FaGithub,
    },
    {
      href: member.twitter,
      label: "X",
      Icon: FaXTwitter,
    },
    {
      href: member.email ? `mailto:${member.email}` : null,
      label: "Email",
      Icon: Mail,
    },
  ].filter((link) => link.href);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map(({ href, label, Icon }, i) => (
        <a
          key={label}
          href={href}
          target={label === "Email" ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={`${member.name} ${label}`}
          style={{
            transitionDelay: `${i * 30}ms`,
          }}
          className="social-link flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-light hover:bg-accent-light hover:text-primary-dark hover:shadow-[var(--shadow-sm)] active:translate-y-0"
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}
