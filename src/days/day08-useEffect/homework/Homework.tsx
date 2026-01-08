/**
 * ========================================
 * Day 08: 숙제 - 실시간 채팅 UI
 * ========================================
 *
 * 🎯 과제:
 * useEffect를 활용한 실시간 채팅 UI를 만드세요.
 * (실제 서버 연결 없이 시뮬레이션)
 *
 * 📋 요구사항:
 *
 * 1. 채팅 메시지 목록
 *    - 메시지 배열을 화면에 표시
 *    - 새 메시지가 추가되면 자동으로 스크롤
 *    - 힌트: useEffect + scrollIntoView 또는 scrollTop
 *
 * 2. 메시지 입력 및 전송
 *    - 입력창과 전송 버튼
 *    - Enter 키로도 전송 가능
 *
 * 3. 자동 메시지 (시뮬레이션)
 *    - 5초마다 "상대방"의 메시지가 자동 추가
 *    - 예: "안녕하세요!", "반갑습니다", "오늘 날씨 좋네요" 등 랜덤
 *    - 컴포넌트 언마운트 시 타이머 정리
 *
 * 4. 타이핑 표시
 *    - 내가 입력 중일 때 "입력 중..." 표시
 *    - 입력을 멈추고 1초 후 사라짐 (디바운스)
 *
 * 5. 읽지 않은 메시지 카운터
 *    - 창이 비활성화 상태일 때 온 메시지 수 카운트
 *    - 문서 제목에 "(3) 새 메시지" 형태로 표시
 *    - 힌트: document.visibilityState, visibilitychange 이벤트
 *
 * 6. 연결 상태 표시
 *    - "연결됨" / "연결 끊김" 상태 표시
 *    - 온라인/오프라인 이벤트 감지
 *
 * 💡 힌트:
 * - 여러 개의 useEffect를 목적별로 분리하세요
 * - cleanup 함수로 타이머와 이벤트 리스너 정리
 * - useRef로 스크롤 대상 요소 참조 가능
 */

import { useState, useEffect } from "react";

// 타입 정의
interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}

function Homework() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 08: 숙제 - 실시간 채팅 UI</h1>

      {/* 여기에 채팅 UI를 구현하세요 */}
    </div>
  );
}

export default Homework;
