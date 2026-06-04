import * as Icons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = '', size = 24 }: LucideIconProps) {
  // Safe lookup with dynamic fallback
  const IconComponent = (Icons as any)[name];
  
  if (!IconComponent) {
    // Default fallback to a generic Help circle icon
    return <Icons.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
