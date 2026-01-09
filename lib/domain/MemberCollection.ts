import { Person } from "@/types";

/**
 * MemberCollection
 *
 * 部員データのコレクションに対する操作をカプセル化するクラス。
 * データに近い場所でロジックを管理する「情報の専門家（Information Expert）」パターンを実装しています。
 */
export class MemberCollection {
  private members: Person[];

  constructor(members: Person[]) {
    this.members = members;
  }

  /**
   * 保持している生のデータを取得
   */
  get all(): Person[] {
    return this.members;
  }

  /**
   * 特定の学年で部員をフィルタリング
   */
  filterByGrade(grade: string): MemberCollection {
    return new MemberCollection(this.members.filter((m) => m.grade === grade));
  }

  /**
   * マネージャーのみを抽出
   */
  filterManagers(): MemberCollection {
    return new MemberCollection(
      this.members.filter((m) => m.is_manager === true)
    );
  }

  /**
   * マネージャーを除外
   */
  excludeManagers(): MemberCollection {
    return new MemberCollection(
      this.members.filter((m) => m.is_manager !== true)
    );
  }

  /**
   * カスタムルールに基づいてコレクションを並び替え
   * デフォルト：役職順 ＞ 学年順（降順） ＞ ID順（昇順）
   * （DBのソート順を模倣しており、クライアント側での再ソートが必要な場合に便利です）
   */
  sortDefault(): MemberCollection {
    const sorted = [...this.members].sort((a, b) => {
      // 1. 役職の優先順位
      const priority = (p: string | null) => {
        if (p === "主将") return 1;
        if (p === "副将") return 2;
        if (p === "主務") return 3;
        if (p === "会計") return 4;
        return 5;
      };

      const pA = priority(a.position);
      const pB = priority(b.position);
      if (pA !== pB) return pA - pB;

      // 2. 学年の降順
      if (a.grade !== b.grade) {
        return a.grade > b.grade ? -1 : 1;
      }

      // 3. IDの昇順
      return a.id - b.id;
    });
    return new MemberCollection(sorted);
  }

  /**
   * 部員をカスタムロジックでグループ化
   * 1. マネージャーは全て「マネージャー」グループへ
   * 2. それ以外は「学年」ごとのグループへ
   */
  groupByGrade(): Record<string, Person[]> {
    const groups = this.members.reduce<Record<string, Person[]>>(
      (acc, person) => {
        // ロジック: マネージャーなら "マネージャー" グループへ強制移動
        let key = "未分類";

        if (person.is_manager === true) {
          key = "マネージャー";
        } else {
          key = person.grade?.trim() || "未分類";
        }

        if (!acc[key]) acc[key] = [];
        acc[key].push(person);
        return acc;
      },
      {}
    );

    return groups;
  }

  /**
   * 指定された優先順位に基づいてグループキー（学年）を並び替え
   */
  static getSortedGroupKeys(
    groups: Record<string, Person[]>,
    preferredOrder: string[]
  ): string[] {
    return [
      ...preferredOrder.filter((grade) => groups[grade]?.length),
      ...Object.keys(groups)
        .filter(
          (grade) => !preferredOrder.includes(grade) && groups[grade]?.length
        )
        .sort((a, b) => a.localeCompare(b, "ja")),
    ];
  }
}

// 表示順の設定
export const MEMBER_GRADE_ORDER = [
  "マネージャー",
  "4年",
  "3年",
  "2年",
  "1年",
  "院生",
];

// スタッフの表示順（StaffSectionで使用）
export const STAFF_GRADE_ORDER = ["部長", "総監督", "監督", "コーチ"];
