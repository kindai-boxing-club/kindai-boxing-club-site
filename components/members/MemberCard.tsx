import type { Member } from "@/types";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

type Props = {
  member: Member;
  fallbackIcon?: string;
};

export default function MemberCard({ member, fallbackIcon = "🥊" }: Props) {
  return (
    <div className="bg-white border border-blue-900/20 rounded-xl overflow-hidden hover:border-red-500 transition-all hover:transform hover:scale-105 shadow-lg">
      <div className="relative h-64">
        <ImageWithFallback
          src={member.image}
          alt={member.name}
          className="object-cover"
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <span className="text-6xl">{fallbackIcon}</span>
            </div>
          }
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-2xl font-bold text-blue-900">{member.name}</h4>
          {member.position && (
            <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
              {member.position}
            </span>
          )}
        </div>
        {member.weight && (
          <p className="text-red-600 font-semibold mb-3">{member.weight}</p>
        )}
        {member.bio && (
          <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
        )}
      </div>
    </div>
  );
}
