/**
 * ========================================
 * Day 03: 실습 - Props 활용하기
 * ========================================
 *
 * 🎯 실습 목표:
 * Props를 사용해서 재사용 가능한 컴포넌트를 만들어보세요.
 */

// TODO 1: ProfileCard 컴포넌트 만들기
// Props: name(string), job(string), imageUrl(string, 선택적)
// 이미지가 없으면 기본 아바타를 표시하세요
interface ProfileCardProps {
  // 여기에 타입을 정의하세요
}

function ProfileCard(/* props */) {
  // 여기에 코드를 작성하세요
  return null;
}

// TODO 2: PriceTag 컴포넌트 만들기
// Props: price(number), currency(string, 기본값 '원'), discountPercent(number, 선택적)
// 할인이 있으면 원래 가격에 취소선, 할인된 가격을 빨간색으로 표시
interface PriceTagProps {
  // 여기에 타입을 정의하세요
}

function PriceTag(/* props */) {
  // 힌트: 할인 가격 = price * (1 - discountPercent / 100)
  // 힌트: 취소선 스타일 = { textDecoration: 'line-through', color: 'gray' }
  return null;
}

// TODO 3: Badge 컴포넌트 만들기
// Props: text(string), variant('success' | 'warning' | 'error' | 'info')
// variant에 따라 다른 색상 적용
interface BadgeProps {
  // 여기에 타입을 정의하세요
}

function Badge(/* props */) {
  // 힌트: variant별 색상
  // success: 초록, warning: 노랑, error: 빨강, info: 파랑
  return null;
}

// TODO 4: Container 컴포넌트 만들기 (children 사용)
// Props: title(string), children(React.ReactNode), bordered(boolean, 기본값 true)
interface ContainerProps {
  // 여기에 타입을 정의하세요
}

function Container(/* props */) {
  // children을 감싸는 컨테이너를 만드세요
  return null;
}

// TODO 5: StarRating 컴포넌트 만들기
// Props: rating(number, 1-5), maxRating(number, 기본값 5)
// 별점을 별 이모지(⭐)로 표시
interface StarRatingProps {
  // 여기에 타입을 정의하세요
}

function StarRating(/* props */) {
  // 힌트: '⭐'.repeat(rating) 또는 배열 사용
  return null;
}

function Practice() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 03: 실습</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>1. ProfileCard</h2>
        {/* <ProfileCard name="홍길동" job="개발자" /> */}
        {/* <ProfileCard name="김영희" job="디자이너" imageUrl="..." /> */}
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>2. PriceTag</h2>
        {/* <PriceTag price={50000} /> */}
        {/* <PriceTag price={50000} discountPercent={20} /> */}
        {/* <PriceTag price={100} currency="$" /> */}
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>3. Badge</h2>
        {/* <Badge text="성공" variant="success" /> */}
        {/* <Badge text="경고" variant="warning" /> */}
        {/* <Badge text="에러" variant="error" /> */}
        {/* <Badge text="정보" variant="info" /> */}
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>4. Container</h2>
        {/*
        <Container title="제목입니다">
          <p>여기에 내용이 들어갑니다.</p>
        </Container>
        */}
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>5. StarRating</h2>
        {/* <StarRating rating={3} /> */}
        {/* <StarRating rating={5} /> */}
        {/* <StarRating rating={2} maxRating={10} /> */}
      </section>
    </div>
  );
}

export default Practice;
