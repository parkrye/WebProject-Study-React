/**
 * ========================================
 * Day 09: 숙제 - 최적화된 데이터 테이블
 * ========================================
 *
 * 🎯 과제:
 * useCallback과 useMemo를 활용하여 최적화된 데이터 테이블을 만드세요.
 *
 * 📋 요구사항:
 *
 * 1. 데이터 구조
 *    interface Employee {
 *      id: number;
 *      name: string;
 *      department: string;
 *      salary: number;
 *      joinDate: string;
 *      isActive: boolean;
 *    }
 *
 * 2. 테이블 기능
 *    - 열 클릭으로 정렬 (오름차순/내림차순 토글)
 *    - 검색 기능 (이름, 부서로 필터링)
 *    - 부서별 필터 (드롭다운)
 *    - 활성/비활성 사원 필터
 *
 * 3. 통계 패널
 *    - 총 직원 수
 *    - 평균 급여
 *    - 부서별 인원 수
 *    - 최고/최저 급여
 *    useMemo로 최적화!
 *
 * 4. 행 컴포넌트 최적화
 *    - 각 행을 별도 컴포넌트로 분리
 *    - memo로 감싸기
 *    - 삭제, 편집 버튼의 핸들러를 useCallback으로 최적화
 *
 * 5. 페이지네이션
 *    - 페이지당 5개 항목
 *    - 현재 페이지에 해당하는 항목만 표시
 *    - useMemo로 현재 페이지 데이터 계산
 *
 * 💡 힌트:
 * - 정렬, 필터링, 페이지네이션을 순서대로 적용
 * - 각 연산을 useMemo로 캐싱
 * - 자식 컴포넌트에 전달하는 함수는 useCallback으로 감싸기
 *
 * 예시 데이터:
 */

import { useState, useCallback, useMemo, memo } from "react";

const initialEmployees = [
  { id: 1, name: "김철수", department: "개발", salary: 5000000, joinDate: "2020-01-15", isActive: true },
  { id: 2, name: "이영희", department: "디자인", salary: 4500000, joinDate: "2021-03-20", isActive: true },
  { id: 3, name: "박민수", department: "개발", salary: 5500000, joinDate: "2019-07-01", isActive: false },
  { id: 4, name: "정수진", department: "마케팅", salary: 4000000, joinDate: "2022-01-10", isActive: true },
  { id: 5, name: "홍길동", department: "개발", salary: 6000000, joinDate: "2018-05-25", isActive: true },
  { id: 6, name: "김영수", department: "디자인", salary: 4800000, joinDate: "2020-09-30", isActive: true },
  { id: 7, name: "이민정", department: "마케팅", salary: 4200000, joinDate: "2021-11-15", isActive: false },
  { id: 8, name: "박서준", department: "개발", salary: 5200000, joinDate: "2019-12-01", isActive: true },
  { id: 9, name: "최수현", department: "인사", salary: 4300000, joinDate: "2020-06-15", isActive: true },
  { id: 10, name: "강민호", department: "인사", salary: 4100000, joinDate: "2022-03-01", isActive: true },
];

// 여기에 컴포넌트들을 구현하세요

function Homework() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 09: 숙제 - 최적화된 데이터 테이블</h1>

      {/* 여기에 데이터 테이블을 구현하세요 */}
    </div>
  );
}

export default Homework;
