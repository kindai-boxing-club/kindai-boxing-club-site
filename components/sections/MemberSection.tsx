/**
 * 部員紹介セクション（クライアントコンポーネント）
 * APIから部員データを取得して表示します
 */
"use client";

import { useEffect, useState } from "react";
import { fetchMembers } from "@/lib/data/fetchMembers";
import {
  MemberCollection,
  MEMBER_GRADE_ORDER,
} from "@/lib/domain/MemberCollection";
import MemberSectionClient from "./MemberSectionClient";
import type { Person } from "@/types";

export default function MemberSection() {
  const [members, setMembers] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await fetchMembers();
        setMembers(data);
      } catch (error) {
        console.error("Failed to load members", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMembers();
  }, []);

  // ローディング中は何も表示しない
  if (isLoading) {
    return (
      <section id="members" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>読み込み中...</p>
        </div>
      </section>
    );
  }

  // 並び替え
  const collection = new MemberCollection(members).sortDefault();
  const membersByGrade = collection.groupByGrade();
  const memberGroupKeys = MemberCollection.getSortedGroupKeys(
    membersByGrade,
    MEMBER_GRADE_ORDER
  );

  return (
    <MemberSectionClient
      groups={membersByGrade}
      groupKeys={memberGroupKeys}
      bgColor={"bg-gray-50"}
    />
  );
}
