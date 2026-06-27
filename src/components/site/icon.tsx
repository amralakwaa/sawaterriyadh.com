import {
  Car,
  Trees,
  Waves,
  Shield,
  Hammer,
  DoorOpen,
  Factory,
  Grid3x3,
  ShieldCheck,
  Award,
  Users,
  Zap,
  BadgePercent,
  Headset,
  Calendar,
  Building2,
  Smile,
  MapPin,
  PhoneCall,
  Eye,
  FileText,
  Settings,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  car: Car,
  trees: Trees,
  waves: Waves,
  shield: Shield,
  hammer: Hammer,
  door: DoorOpen,
  factory: Factory,
  grid: Grid3x3,
  "shield-check": ShieldCheck,
  award: Award,
  users: Users,
  zap: Zap,
  "badge-percent": BadgePercent,
  headset: Headset,
  calendar: Calendar,
  building: Building2,
  smile: Smile,
  "map-pin": MapPin,
  "phone-call": PhoneCall,
  eye: Eye,
  "file-text": FileText,
  settings: Settings,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = ICON_MAP[name] ?? ShieldCheck;
  return <Cmp className={className} />;
}
