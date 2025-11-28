/**
 * 活動内容セクション (ACTIVITY)
 * 週間スケジュールと年間行事を表示する。
 * メンバーセクションと統一されたヘッダーデザインを持つ。
 */
"use client";

import { motion } from "framer-motion";

const schedule = [
  { 
    day: "月曜日 - 金曜日", 
    time: "10:00 - 12:30 / 17:00 - 19:30", 
    note: "※木曜午後は自主練習" 
  },
  { 
    day: "土曜日", 
    time: "10:00 - 13:30", 
    note: "" 
  },
  { 
    day: "日曜日", 
    time: "OFF / 試合", 
    note: "" 
  },
];

const events = [
  { season: "春季", items: ["関西学生ボクシングリーグ戦", "春合宿"] },
  { season: "夏季", items: ["関西学生ボクシングリーグ戦", "夏合宿"] },
  { season: "秋季", items: ["日本ボクシング選手権大会"] },
  { season: "冬季", items: ["関西学生トーナメント戦", "OB会"] },
];

export default function ActivitySection() {
  return (
    <section className="py-32 px-4 bg-white relative overflow-hidden">
      {/* Sharp Geometric Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 transform origin-top-right z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center relative">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-gray-900 opacity-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full select-none">
            ACTIVITY
          </h2>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 relative z-10">
            ACTIVITY
          </h2>
          <div className="mt-6 flex justify-center">
            <div className="bg-red-600 text-white font-bold py-1 px-6 text-sm tracking-[0.3em] uppercase skew-x-[-12deg]">
              活動内容
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Weekly Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-black text-black mb-10 flex items-center gap-4">
              <span className="text-red-600">01.</span> 週間スケジュール
            </h3>
            
            <div className="space-y-0 border-t-2 border-black">
              {schedule.map((item, index) => (
                <div key={index} className="group border-b border-gray-200 py-8 hover:bg-gray-50 transition-colors px-4">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-red-600 transform -skew-x-12" />
                      <span className="text-2xl font-black text-black tracking-tight">{item.day}</span>
                    </div>
                    <span className="text-xl font-bold text-gray-800 font-mono mt-2 md:mt-0">{item.time}</span>
                  </div>
                  {item.note && (
                    <p className="text-sm font-bold text-gray-400 mt-2 tracking-wider pl-4">
                      {item.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Annual Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-black text-black mb-10 flex items-center gap-4">
              <span className="text-red-600">02.</span> 年間スケジュール
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {events.map((event, index) => (
                <div 
                  key={index} 
                  className="bg-black p-8 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 transform rotate-45 translate-x-8 -translate-y-8" />
                  
                  <h4 className="text-2xl font-black mb-6 tracking-wider border-b border-gray-700 pb-2">
                    {event.season}
                  </h4>
                  <ul className="space-y-3">
                    {event.items.map((item, i) => (
                      <li key={i} className="text-sm font-bold text-gray-300 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-red-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
