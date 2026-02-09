# TODO: 将来のリファクタリング

## 命名体系の統一

現在 `member` と `person` が混在している。以下の命名に統一する：

| 英語     | 日本語     | 説明                           |
| -------- | ---------- | ------------------------------ |
| `person` | 人         | 基底型（全員に共通するデータ） |
| `member` | 選手       | 競技を行う部員                 |
| `staff`  | 指導者等   | 監督、コーチ、部長など         |
| `team`   | チーム全体 | person の集合                  |

## ファイル構成の整理

現状:

```
types/index.ts
lib/constants.ts
```

検討中:

```
lib/domain/
  person.types.ts      # Person, PersonInput, PersonFormInput
  person.constants.ts  # GRADES, POSITIONS, WEIGHT_CLASSES
  person.actions.ts    # addPersonAction, deletePersonAction
```

## 優先度

- [ ] add 機能の完成
- [ ] 命名体系の統一（大規模リファクタリング）
- [ ] ファイル構成の整理
