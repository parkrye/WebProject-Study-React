import { useState } from "react";
import "./App.css";

// Day 01
import Day01Study from "./days/day01-react-jsx/study/Study";
import Day01Practice from "./days/day01-react-jsx/practice/Practice";
import Day01Homework from "./days/day01-react-jsx/homework/Homework";

// Day 02
import Day02Study from "./days/day02-component/study/Study";
import Day02Practice from "./days/day02-component/practice/Practice";
import Day02Homework from "./days/day02-component/homework/Homework";

// Day 03
import Day03Study from "./days/day03-props/study/Study";
import Day03Practice from "./days/day03-props/practice/Practice";
import Day03Homework from "./days/day03-props/homework/Homework";

// Day 04
import Day04Study from "./days/day04-event/study/Study";
import Day04Practice from "./days/day04-event/practice/Practice";
import Day04Homework from "./days/day04-event/homework/Homework";

// Day 05
import Day05Study from "./days/day05-conditional-list/study/Study";
import Day05Practice from "./days/day05-conditional-list/practice/Practice";
import Day05Homework from "./days/day05-conditional-list/homework/Homework";

// Day 06
import Day06Study from "./days/day06-useState-basic/study/Study";
import Day06Practice from "./days/day06-useState-basic/practice/Practice";
import Day06Homework from "./days/day06-useState-basic/homework/Homework";

// Day 07
import Day07Study from "./days/day07-useState-advanced/study/Study";
import Day07Practice from "./days/day07-useState-advanced/practice/Practice";
import Day07Homework from "./days/day07-useState-advanced/homework/Homework";

// Day 08
import Day08Study from "./days/day08-useEffect/study/Study";
import Day08Practice from "./days/day08-useEffect/practice/Practice";
import Day08Homework from "./days/day08-useEffect/homework/Homework";

// Day 09
import Day09Study from "./days/day09-useCallback-useMemo/study/Study";
import Day09Practice from "./days/day09-useCallback-useMemo/practice/Practice";
import Day09Homework from "./days/day09-useCallback-useMemo/homework/Homework";

// Day 10
import Day10Study from "./days/day10-zustand/study/Study";
import Day10Practice from "./days/day10-zustand/practice/Practice";
import Day10Homework from "./days/day10-zustand/homework/Homework";

// 커리큘럼 데이터
const curriculum = [
  { day: 1, title: "React 소개 & JSX", study: Day01Study, practice: Day01Practice, homework: Day01Homework },
  { day: 2, title: "컴포넌트 기초", study: Day02Study, practice: Day02Practice, homework: Day02Homework },
  { day: 3, title: "Props", study: Day03Study, practice: Day03Practice, homework: Day03Homework },
  { day: 4, title: "이벤트 핸들링", study: Day04Study, practice: Day04Practice, homework: Day04Homework },
  { day: 5, title: "조건부 렌더링 & 리스트", study: Day05Study, practice: Day05Practice, homework: Day05Homework },
  { day: 6, title: "useState 기초", study: Day06Study, practice: Day06Practice, homework: Day06Homework },
  { day: 7, title: "useState 심화", study: Day07Study, practice: Day07Practice, homework: Day07Homework },
  { day: 8, title: "useEffect", study: Day08Study, practice: Day08Practice, homework: Day08Homework },
  { day: 9, title: "useCallback & useMemo", study: Day09Study, practice: Day09Practice, homework: Day09Homework },
  { day: 10, title: "Zustand", study: Day10Study, practice: Day10Practice, homework: Day10Homework },
];

type Category = "study" | "practice" | "homework";

function App() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("study");

  // 홈 화면
  if (selectedDay === null) {
    return (
      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          React 10일 학습 커리큘럼
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {curriculum.map((item) => (
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
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "5px",
                }}
              >
                Day {item.day}
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
          ))}
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
