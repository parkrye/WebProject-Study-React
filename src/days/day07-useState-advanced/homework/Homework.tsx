/**
 * ========================================
 * Day 07: 숙제 - 메모장 앱
 * ========================================
 *
 * 🎯 과제:
 * 완전한 기능을 갖춘 메모장 앱을 만드세요.
 *
 * 📋 요구사항:
 *
 * 1. Note 타입 정의
 *    interface Note {
 *      id: number;
 *      title: string;
 *      content: string;
 *      createdAt: Date;
 *      updatedAt: Date;
 *      color: string; // 배경색
 *      pinned: boolean; // 고정 여부
 *    }
 *
 * 2. 메모 목록 표시
 *    - 고정된 메모가 상단에 표시
 *    - 나머지는 수정일 기준 최신순
 *    - 카드 형태로 표시
 *
 * 3. 메모 추가
 *    - 제목과 내용 입력
 *    - 색상 선택 (최소 4가지)
 *    - 추가 버튼 클릭 시 목록에 추가
 *
 * 4. 메모 편집
 *    - 메모 클릭 시 편집 모드
 *    - 제목, 내용, 색상 수정 가능
 *    - 저장 버튼으로 변경 적용
 *
 * 5. 메모 삭제
 *    - 각 메모에 삭제 버튼
 *
 * 6. 메모 고정/해제
 *    - 핀 아이콘 클릭으로 고정 토글
 *
 * 7. 검색 기능
 *    - 제목과 내용에서 검색어 포함된 메모만 표시
 *
 * 💡 힌트:
 * - 여러 상태가 필요합니다: notes, searchTerm, editingNote 등
 * - Date.now()로 간단한 ID 생성
 * - new Date()로 현재 시간
 * - 불변성을 지켜서 상태 업데이트
 */

import { useState } from "react";

// 타입 정의

// 컴포넌트 구현

function Homework() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 07: 숙제 - 메모장 앱</h1>

      {/* 여기에 메모장 앱을 구현하세요 */}
    </div>
  );
}

export default Homework;
