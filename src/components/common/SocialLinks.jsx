import { Linkedin, Youtube, Facebook, Instagram, Twitter, Github, Music2 } from 'lucide-react';
import { SOCIAL_LINKS } from '../../utils/constants';

// lucide-react has no X or TikTok logo, so the closest icons are used
const ICONS = {
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Facebook: Facebook,
  Instagram: Instagram,
  X: Twitter,
  TikTok: Music2,
  GitHub: Github
};

/**
 * HNK IoT Solutions social links.
 * variant "icons" renders a row of round icon buttons,
 * variant "list" renders icon + network name + handle rows.
 */
const SocialLinks = ({ variant = 'icons', className = '', linkClassName = '' }) => {
  if (variant === 'list') {
    return (
      <div className={`space-y-2 ${className}`}>
        {SOCIAL_LINKS.map(({ name, handle, url }) => {
          const Icon = ICONS[name];
          return (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors ${linkClassName}`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>
                {name}: <span className="text-gray-500">{handle}</span>
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {SOCIAL_LINKS.map(({ name, url }) => {
        const Icon = ICONS[name];
        return (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`HNK IoT Solutions on ${name}`}
            title={name}
            className={linkClassName}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
