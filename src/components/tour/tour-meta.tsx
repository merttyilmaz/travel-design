import {
  Clock,
  Users,
  Compass,
  BookOpen,
  Globe,
  UserCheck,
} from "lucide-react";

interface TourMetaProps {
  duration: number;
  maxGroupSize: number;
  departureType: string;
  guidingMethod: string;
  language: string;
  ageRange: string;
}

const MetaItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3.5 py-4 px-5">
    <div className="w-10 h-10 rounded-2xl bg-violet-50 flex items-center justify-center shrink-0">
      <Icon className="w-4.5 h-4.5 text-violet-500" strokeWidth={2} />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
    </div>
  </div>
);

export function TourMeta({
  duration,
  maxGroupSize,
  departureType,
  guidingMethod,
  language,
  ageRange,
}: TourMetaProps) {
  const items = [
    { icon: Clock, label: "Duration", value: `${duration} Days` },
    { icon: Users, label: "Group Size", value: `Max ${maxGroupSize}` },
    { icon: Compass, label: "Tour Type", value: departureType },
    { icon: BookOpen, label: "Guiding", value: guidingMethod },
    { icon: Globe, label: "Language", value: language },
    { icon: UserCheck, label: "Ages", value: ageRange },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-gray-100">
        {items.map((item) => (
          <MetaItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
