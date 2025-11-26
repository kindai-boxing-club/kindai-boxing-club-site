import type { Member } from "@/types";
import MemberCard from "./MemberCard";

type Props = {
  title: string;
  subtitle: string;
  groups: Record<string, Member[]>;
  groupKeys: string[];
  displayNames: Record<string, string>;
  fallbackIcon?: string;
  bgColor?: string;
  sectionId?: string;
};

export default function MemberSection({
  title,
  subtitle,
  groups,
  groupKeys,
  displayNames,
  fallbackIcon = "🥊",
  bgColor = "bg-gray-50",
  sectionId,
}: Props) {
  return (
    <section id={sectionId} className={`py-20 px-4 ${bgColor}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="text-gradient">{title}</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">{subtitle}</p>

        {groupKeys.map((classification) => (
          <div key={classification} className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-blue-900 border-l-4 border-red-600 pl-4">
              {displayNames[classification] ?? classification}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groups[classification].map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  fallbackIcon={fallbackIcon}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
