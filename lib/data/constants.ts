import { Member } from "@/types";

export const EXECUTIVES_DATA: Omit<Member, "id" | "position">[] = [
  {
    name: "清滝 ふみ",
    classification: "部長",
    image: "/data/staff/清滝ふみ.png",
    bio: "",
  },
  {
    name: "赤井 英和",
    classification: "総監督",
    image: "/data/staff/赤井英和.png", // Temporary placeholder or correct if mixed up
    bio: "",
  },
  {
    name: "名城 信男",
    classification: "監督",
    image: "/data/staff/名城信男.png",
    bio: "選手一人ひとりの個性を伸ばし、技術だけでなく人間形成にも力を注ぐ。",
  },
];

export const COACHES_DATA: Omit<Member, "id" | "position">[] = [
  {
    name: "倉本 亮",
    classification: "コーチ",
    image: "/data/staff/倉本亮.png",
    bio: "",
  },
  {
    name: "國重 憲司",
    classification: "コーチ",
    image: "/data/staff/國重憲司.png",
    bio: "",
  },
];
