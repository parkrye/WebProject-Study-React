import { useState } from "react";
import "./App.css";

// ========================================
// Phase 1: React 기초 (Day 1-2)
// ========================================
import Day01Study from "./days/day01-react-basics/study/Study";
import Day01Practice from "./days/day01-react-basics/practice/Practice";
import Day01Homework from "./days/day01-react-basics/homework/Homework";

import Day02Study from "./days/day02-props-events/study/Study";
import Day02Practice from "./days/day02-props-events/practice/Practice";
import Day02Homework from "./days/day02-props-events/homework/Homework";

// ========================================
// Phase 2: React Hooks (Day 3-5)
// ========================================
import Day03Study from "./days/day03-rendering-state/study/Study";
import Day03Practice from "./days/day03-rendering-state/practice/Practice";
import Day03Homework from "./days/day03-rendering-state/homework/Homework";

import Day04Study from "./days/day04-state-effects/study/Study";
import Day04Practice from "./days/day04-state-effects/practice/Practice";
import Day04Homework from "./days/day04-state-effects/homework/Homework";

import Day05Study from "./days/day05-performance-hooks/study/Study";
import Day05Practice from "./days/day05-performance-hooks/practice/Practice";
import Day05Homework from "./days/day05-performance-hooks/homework/Homework";

// ========================================
// Phase 3: TypeScript (Day 6-7)
// ========================================
import Day06Study from "./days/day06-typescript/study/Study";
import Day06Practice from "./days/day06-typescript/practice/Practice";
import Day06Homework from "./days/day06-typescript/homework/Homework";

import Day07Study from "./days/day07-react-ts-hooks/study/Study";
import Day07Practice from "./days/day07-react-ts-hooks/practice/Practice";
import Day07Homework from "./days/day07-react-ts-hooks/homework/Homework";

// ========================================
// Phase 4: 상태관리 (Day 8)
// ========================================
import Day08Study from "./days/day08-zustand/study/Study";
import Day08Practice from "./days/day08-zustand/practice/Practice";
import Day08Homework from "./days/day08-zustand/homework/Homework";

// ========================================
// Phase 5: 실전 & 프로젝트 (Day 9-10)
// ========================================
import Day09Study from "./days/day09-api-integration/study/Study";
import Day09Practice from "./days/day09-api-integration/practice/Practice";
import Day09Homework from "./days/day09-api-integration/homework/Homework";

import Day10Study from "./days/day10-patterns-project/study/Study";
import Day10Practice from "./days/day10-patterns-project/practice/Practice";
import Day10Homework from "./days/day10-patterns-project/homework/Homework";

// 커리큘럼 데이터
const curriculum = [
  // Phase 1: React 기초
  { day: 1, title: "React 기초 & JSX", phase: 1, study: Day01Study, practice: Day01Practice, homework: Day01Homework },
  { day: 2, title: "Props & 이벤트", phase: 1, study: Day02Study, practice: Day02Practice, homework: Day02Homework },

  // Phase 2: React Hooks
  { day: 3, title: "렌더링 & useState 기초", phase: 2, study: Day03Study, practice: Day03Practice, homework: Day03Homework },
  { day: 4, title: "useState 심화 & useEffect", phase: 2, study: Day04Study, practice: Day04Practice, homework: Day04Homework },
  { day: 5, title: "성능 최적화 Hooks", phase: 2, study: Day05Study, practice: Day05Practice, homework: Day05Homework },

  // Phase 3: TypeScript
  { day: 6, title: "TypeScript 기초", phase: 3, study: Day06Study, practice: Day06Practice, homework: Day06Homework },
  { day: 7, title: "React TS & 커스텀 훅", phase: 3, study: Day07Study, practice: Day07Practice, homework: Day07Homework },

  // Phase 4: 상태관리
  { day: 8, title: "Zustand 상태관리", phase: 4, study: Day08Study, practice: Day08Practice, homework: Day08Homework },

  // Phase 5: 실전 & 프로젝트
  { day: 9, title: "API 연동", phase: 5, study: Day09Study, practice: Day09Practice, homework: Day09Homework },
  { day: 10, title: "컴포넌트 패턴 & 프로젝트", phase: 5, study: Day10Study, practice: Day10Practice, homework: Day10Homework },
];

const phases = [
  { id: 1, title: "React 기초", color: "#e3f2fd" },
  { id: 2, title: "React Hooks", color: "#e8f5e9" },
  { id: 3, title: "TypeScript", color: "#fff3e0" },
  { id: 4, title: "상태관리", color: "#fce4ec" },
  { id: 5, title: "실전 & 프로젝트", color: "#e0f7fa" },
];

type Category = "study" | "practice" | "homework";

function App() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("study");
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  // 홈 화면
  if (selectedDay === null) {
    const filteredCurriculum = selectedPhase
      ? curriculum.filter((item) => item.phase === selectedPhase)
      : curriculum;

    return (
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          React + TypeScript 10일 학습 커리큘럼
        </h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
          moii-feed-web 프로젝트를 목표로 한 실무 중심 학습
        </p>

        {/* Phase 필터 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "30px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setSelectedPhase(null)}
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              borderRadius: "20px",
              backgroundColor: selectedPhase === null ? "#333" : "#fff",
              color: selectedPhase === null ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            전체
          </button>
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              style={{
                padding: "8px 16px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                backgroundColor: selectedPhase === phase.id ? phase.color : "#fff",
                cursor: "pointer",
              }}
            >
              {phase.title}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredCurriculum.map((item) => {
            const phase = phases.find((p) => p.id === item.phase);
            return (
              <div
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  backgroundColor: "#fff",
                  borderLeft: `4px solid ${phase?.color || "#ddd"}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#666" }}>
                    Day {item.day}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      backgroundColor: phase?.color,
                      borderRadius: "10px",
                    }}
                  >
                    {phase?.title}
                  </span>
                </div>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {item.title}
                </div>
                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#e3f2fd",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    공부
                  </span>
                  <span
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#e8f5e9",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    실습
                  </span>
                  <span
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#fff3e0",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    숙제
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 일차별 상세 화면
  const currentDay = curriculum.find((c) => c.day === selectedDay);
  if (!currentDay) return null;

  const CurrentComponent =
    selectedCategory === "study"
      ? currentDay.study
      : selectedCategory === "practice"
      ? currentDay.practice
      : currentDay.homework;

  const phase = phases.find((p) => p.id === currentDay.phase);

  return (
    <div>
      {/* 네비게이션 바 */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          zIndex: 100,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setSelectedDay(null)}
          style={{
            padding: "8px 16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          ← 목록으로
        </button>

        <div style={{ fontWeight: "bold" }}>
          <span
            style={{
              fontSize: "12px",
              padding: "2px 8px",
              backgroundColor: phase?.color,
              borderRadius: "10px",
              marginRight: "10px",
            }}
          >
            {phase?.title}
          </span>
          Day {currentDay.day}: {currentDay.title}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          <button
            onClick={() => setSelectedCategory("study")}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: selectedCategory === "study" ? "#2196f3" : "#e0e0e0",
              color: selectedCategory === "study" ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            공부
          </button>
          <button
            onClick={() => setSelectedCategory("practice")}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: selectedCategory === "practice" ? "#4caf50" : "#e0e0e0",
              color: selectedCategory === "practice" ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            실습
          </button>
          <button
            onClick={() => setSelectedCategory("homework")}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: selectedCategory === "homework" ? "#ff9800" : "#e0e0e0",
              color: selectedCategory === "homework" ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            숙제
          </button>
        </div>

        {/* 이전/다음 일차 버튼 */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
            disabled={selectedDay === 1}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#fff",
              cursor: selectedDay === 1 ? "not-allowed" : "pointer",
              opacity: selectedDay === 1 ? 0.5 : 1,
            }}
          >
            ← 이전
          </button>
          <button
            onClick={() => setSelectedDay(Math.min(10, selectedDay + 1))}
            disabled={selectedDay === 10}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#fff",
              cursor: selectedDay === 10 ? "not-allowed" : "pointer",
              opacity: selectedDay === 10 ? 0.5 : 1,
            }}
          >
            다음 →
          </button>
        </div>
      </nav>

      {/* 컨텐츠 */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <CurrentComponent />
      </div>
    </div>
  );
}

export default App;
