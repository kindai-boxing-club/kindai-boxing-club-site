/** 管理画面ダッシュボード */

import CategoryHeading from "@/components/public/ui/CategoryHeading";
import Link from "next/link";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";
import { FaUserPen, FaUserXmark } from "react-icons/fa6";
import { MdAddAPhoto } from "react-icons/md";

function Button({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center gap-2">
        <div className="p-4 bg-slate-100 rounded-xl transition-colors hover:bg-red-400 active:bg-red-400">
          {icon}
        </div>
        <div className="text-lg font-bold text-slate-900">{name}</div>
      </div>
    </Link>
  );
}

function AdminCard({
  mode,
  additionalButton,
}: {
  mode: "staff" | "member";
  additionalButton?: React.ReactNode;
}) {
  const modeText = mode == "staff" ? "staff" : "members";
  return (
    <div className="mb-12">
      <CategoryHeading title={modeText} />
      <div className="bg-white flex p-4 px-8 pt-8 rounded-2xl border border-slate-200 gap-8 flex-wrap">
        <Button
          name="一覧"
          href={`/admin/${modeText}/view`}
          icon={<FaUserFriends size={36} />}
        />
        <Button
          name="追加"
          href={`/admin/${modeText}/add`}
          icon={<FaUserPlus size={36} />}
        />
        <Button
          name="編集"
          href={`/admin/${modeText}/edit`}
          icon={<FaUserPen size={36} />}
        />
        <Button
          name="削除"
          href={`/admin/${modeText}/delete`}
          icon={<FaUserXmark size={36} />}
        />
        <Button
          name="写真変更"
          href={`/admin/${modeText}/photo`}
          icon={<MdAddAPhoto size={36} />}
        />
        {additionalButton}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <AdminCard
        mode="member"
        additionalButton={
          <>
            <Button
              name="状態変更"
              href={`/admin/members/year`}
              icon={<FaUserFriends size={36} />}
            />
            <Button
              name="一斉進級"
              href={`/admin/members/year`}
              icon={<FaUserFriends size={36} />}
            />
          </>
        }
      />
      <AdminCard mode="staff" />
    </div>
  );
}
