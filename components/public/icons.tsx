import {
  Compass,
  Mail,
  Megaphone,
  Monitor,
  Palette,
  PenLine,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  Target,
} from "lucide-react";

const icons = {
  monitor: Monitor,
  palette: Palette,
  megaphone: Megaphone,
  "share-2": Share2,
  search: Search,
  target: Target,
  smartphone: Smartphone,
  compass: Compass,
  sparkles: Sparkles,
  "pen-line": PenLine,
  mail: Mail,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] || Sparkles;
  return <Icon className={className} />;
}
