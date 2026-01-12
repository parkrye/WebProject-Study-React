/**
 * ========================================
 * Day 03: 숙제 - 상품 목록 페이지
 * ========================================
 *
 * 🎯 과제:
 * Props를 활용하여 쇼핑몰 상품 목록 페이지를 만드세요.
 *
 * 📋 요구사항:
 *
 * 1. ProductCard 컴포넌트
 *    Props:
 *    - name: string (상품명)
 *    - price: number (가격)
 *    - description: string (설명)
 *    - imageUrl?: string (이미지 URL, 선택적)
 *    - discount?: number (할인율, 선택적)
 *    - inStock: boolean (재고 여부)
 *
 *    UI:
 *    - 상품 이미지 (없으면 placeholder)
 *    - 상품명
 *    - 가격 (할인 있으면 할인가 표시)
 *    - 재고 없으면 "품절" 표시
 *
 * 2. ProductList 컴포넌트
 *    Props:
 *    - title: string (섹션 제목)
 *    - children: React.ReactNode
 *
 * 3. 최소 4개의 상품을 표시하세요
 *
 * 💡 힌트:
 * - 카드는 flexbox로 가로 배치
 * - 품절 상품은 흐리게(opacity: 0.5) 처리
 * - 할인가: price * (1 - discount / 100)
 */

// 여기에 컴포넌트들을 만드세요

function Homework() {
  // 상품 데이터 예시
  const products = [
    {
      name: "무선 마우스",
      price: 35000,
      description: "인체공학적 디자인의 무선 마우스",
      inStock: true,
      discount: 10,
    },
    {
      name: "기계식 키보드",
      price: 89000,
      description: "청축 기계식 키보드",
      inStock: true,
    },
    {
      name: "모니터 암",
      price: 45000,
      description: "듀얼 모니터 암",
      inStock: false,
    },
    {
      name: "웹캠",
      price: 55000,
      description: "1080p HD 웹캠",
      inStock: true,
      discount: 20,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 03: 숙제</h1>

      {/* 여기에 ProductList와 ProductCard를 사용하세요 */}
      {/* products 배열의 데이터를 활용하세요 */}
    </div>
  );
}

export default Homework;
