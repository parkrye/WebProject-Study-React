# Day 02: Props & 이벤트 핸들링

## 학습 목표
- Props의 개념과 단방향 데이터 흐름 이해
- TypeScript로 Props 타입 정의하기
- children prop 활용하기
- 이벤트 핸들링과 TypeScript 이벤트 타입

---

## 1. Props란?

### 정의
**Props (Properties)** 는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다. HTML 속성(attribute)과 유사하지만, 모든 JavaScript 값을 전달할 수 있습니다.

### Props의 핵심 특징

- **단방향 데이터 흐름:** 부모 → 자식 방향으로만 전달됩니다. 자식이 부모의 props를 직접 수정할 수 없습니다.
- **읽기 전용 (Immutable):** props는 받은 컴포넌트에서 수정할 수 없습니다. 수정이 필요하면 부모에게 요청해야 합니다.
- **모든 타입 전달 가능:** 문자열, 숫자, 배열, 객체, 함수, 심지어 다른 컴포넌트까지 전달할 수 있습니다.

### Props 전달 및 받기

**부모 컴포넌트 (Props 전달):**
```jsx
function App() {
  return (
    <UserCard
      name="김철수"      {/* 문자열 */}
      age={25}           {/* 숫자 */}
      email="kim@example.com"
      isOnline={true}    {/* 불리언 */}
    />
  );
}
```

**자식 컴포넌트 (Props 받기):**
```jsx
// 방법 1: props 객체로 받기
function UserCard(props) {
  return <p>{props.name}</p>;
}

// 방법 2: 구조 분해 할당 (권장)
function UserCard({ name, age, email }) {
  return (
    <div>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
    </div>
  );
}
```

### UserCard 컴포넌트 예시

```tsx
// Props 타입 정의
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  isOnline?: boolean;  // 선택적 prop
}

// 컴포넌트 정의
function UserCard({ name, age, email, isOnline = false }: UserCardProps) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      backgroundColor: isOnline ? "#e8f5e9" : "#fff",
    }}>
      <h4>
        {name} {isOnline && <span style={{ color: "green" }}>● 온라인</span>}
      </h4>
      <p>나이: {age}세</p>
      <p>이메일: {email}</p>
    </div>
  );
}

// 사용 예시
<UserCard name="김철수" age={25} email="kim@example.com" isOnline />
<UserCard name="이영희" age={28} email="lee@example.com" />
```

---

## 2. TypeScript로 Props 타입 정의하기

### 왜 타입을 정의해야 하는가?
- 잘못된 props 전달 시 컴파일 단계에서 에러 감지
- 자동완성 지원으로 개발 생산성 향상
- 코드만 보고도 컴포넌트 사용법을 파악 가능

### interface로 Props 타입 정의

```tsx
// Props 타입 정의
interface UserCardProps {
  name: string;           // 필수 prop
  age: number;            // 필수 prop
  email: string;          // 필수 prop
  isOnline?: boolean;     // 선택적 prop (? 사용)
}

// 컴포넌트에서 타입 적용
function UserCard({
  name,
  age,
  email,
  isOnline = false  // 기본값 설정
}: UserCardProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>나이: {age}세</p>
      <p>이메일: {email}</p>
      <p>상태: {isOnline ? '온라인' : '오프라인'}</p>
    </div>
  );
}
```

### 다양한 타입의 Props

```tsx
interface ProductProps {
  // 기본 타입
  name: string;
  price: number;
  inStock: boolean;

  // 배열 타입
  tags: string[];

  // 객체 타입
  details: {
    brand: string;
    category: string;
  };

  // 유니온 타입 (특정 값들 중 하나만 허용)
  size: 'small' | 'medium' | 'large';

  // 함수 타입 (콜백)
  onClick: () => void;
  onPriceChange: (newPrice: number) => void;
}
```

---

## 3. children prop

### 정의
**children**은 React의 특별한 prop으로, 컴포넌트의 여는 태그와 닫는 태그 사이에 있는 내용을 전달받습니다. 컴포넌트를 래퍼(Wrapper)처럼 사용할 때 유용합니다.

### children prop 예시

```tsx
// Card 컴포넌트 정의
interface CardProps {
  title: string;
  children: React.ReactNode;  // JSX를 받는 타입
}

function Card({ title, children }: CardProps) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
    }}>
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "12px 15px",
        fontWeight: "bold",
        borderBottom: "1px solid #ddd",
      }}>
        {title}
      </div>
      <div style={{ padding: "15px" }}>
        {children}  {/* 여기에 children이 렌더링됨 */}
      </div>
    </div>
  );
}

// 사용 예시
<Card title="공지사항">
  <p>이 부분이 children입니다!</p>
  <p style={{ color: "#666" }}>여러 요소를 넣을 수 있습니다.</p>
</Card>
```

### React.ReactNode vs React.ReactElement
- **React.ReactNode:** 모든 렌더링 가능한 것 (문자열, 숫자, JSX, null, undefined, 배열 등)
- **React.ReactElement:** JSX 요소만 (더 제한적)

→ 대부분의 경우 `React.ReactNode`를 사용하는 것이 좋습니다.

---

## 4. 이벤트 핸들링

### 정의
**이벤트 핸들링**은 사용자의 액션(클릭, 입력, 스크롤 등)에 반응하여 특정 동작을 실행하는 것입니다. React에서는 JSX 속성으로 이벤트 핸들러를 등록합니다.

### HTML vs React 이벤트 처리 비교

**HTML 방식:**
```html
<!-- 소문자, 문자열로 함수 호출 -->
<button onclick="handleClick()">
  클릭
</button>
```

**React 방식:**
```jsx
{/* camelCase, 함수 참조 전달 */}
<button onClick={handleClick}>
  클릭
</button>
```

### 핵심 차이점

| 항목 | HTML | React |
|------|------|-------|
| 이벤트명 | 소문자 (onclick) | camelCase (onClick) |
| 핸들러 전달 | 문자열 "fn()" | 함수 참조 {fn} |
| 기본 동작 방지 | return false | e.preventDefault() |

### 주요 이벤트 종류

```tsx
// 마우스 이벤트
onClick       // 클릭
onDoubleClick // 더블클릭
onMouseEnter  // 마우스 진입
onMouseLeave  // 마우스 이탈
onMouseMove   // 마우스 이동

// 키보드 이벤트
onKeyDown     // 키 누름
onKeyUp       // 키 뗌
onKeyPress    // 키 입력 (deprecated)

// 폼 이벤트
onChange      // 값 변경
onSubmit      // 폼 제출
onFocus       // 포커스 획득
onBlur        // 포커스 상실

// 기타
onScroll      // 스크롤
onLoad        // 로드 완료
onError       // 에러 발생
```

### 이벤트 핸들러 작성 패턴

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  // 패턴 1: 별도 함수로 정의 (권장)
  const handleClick = () => {
    setCount(count + 1);
  };

  // 패턴 2: 이벤트 객체 사용
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);  // 입력값
    console.log(e.target.name);   // input의 name 속성
  };

  // 패턴 3: 매개변수 전달이 필요한 경우
  const handleItemClick = (id: number) => {
    console.log('클릭된 아이템:', id);
  };

  return (
    <div>
      {/* 패턴 1 */}
      <button onClick={handleClick}>클릭</button>

      {/* 패턴 2 */}
      <input onChange={handleChange} />

      {/* 패턴 3: 화살표 함수로 감싸서 전달 */}
      <button onClick={() => handleItemClick(123)}>
        아이템 123
      </button>

      {/* 주의: 잘못된 예 */}
      {/* handleItemClick(123)이 즉시 실행됨! */}
      {/* <button onClick={handleItemClick(123)}>잘못됨</button> */}
    </div>
  );
}
```

---

## 5. e.preventDefault()와 e.stopPropagation()

### e.preventDefault()
**정의:** 브라우저의 기본 동작을 막습니다.

```tsx
// 폼 제출 시 페이지 새로고침 방지
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();  // 기본 동작(새로고침) 방지
  // 비동기로 폼 데이터 처리
};

// 링크 클릭 시 페이지 이동 방지
const handleLinkClick = (e: React.MouseEvent) => {
  e.preventDefault();  // 기본 동작(페이지 이동) 방지
  // SPA에서 직접 라우팅 처리
};
```

### e.stopPropagation()
**정의:** 이벤트가 부모 요소로 전파(버블링)되는 것을 막습니다.

```tsx
// 이벤트 버블링이란?
// 자식 요소에서 발생한 이벤트가 부모로 전파되는 현상

<div onClick={() => console.log('부모 클릭!')}>
  <button onClick={(e) => {
    e.stopPropagation();  // 부모로 전파 중지
    console.log('버튼 클릭!');
  }}>
    클릭
  </button>
</div>

// stopPropagation() 없이 버튼 클릭 시:
// "버튼 클릭!" 출력 후 "부모 클릭!"도 출력

// stopPropagation() 있으면:
// "버튼 클릭!"만 출력
```

---

## 6. TypeScript 이벤트 타입

TypeScript에서 이벤트 핸들러를 작성할 때는 적절한 이벤트 타입을 사용해야 합니다. React는 자체 이벤트 시스템(SyntheticEvent)을 사용합니다.

### 자주 사용하는 이벤트 타입

```tsx
// 마우스 이벤트
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {};

// 키보드 이벤트
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    // Enter 키 처리
  }
};

// 폼/입력 이벤트
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const name = e.target.name;
};

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};
const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

// 폼 제출 이벤트
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// 포커스 이벤트
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {};
const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {};
```

### 팁: 타입을 모를 때
이벤트 타입을 모르겠다면, 먼저 `(e) => {}`로 작성하고 에디터의 자동완성을 활용하거나, 마우스를 올려 추론된 타입을 확인하세요.

---

## 핵심 정리

| 개념 | 설명 |
|------|------|
| **Props** | 부모→자식으로 데이터 전달. 읽기 전용. interface로 타입 정의 |
| **children** | 태그 사이 내용을 받는 특별한 prop. 타입은 React.ReactNode |
| **이벤트 핸들링** | camelCase로 이벤트명 작성 (onClick, onChange). 함수 참조 전달 |
| **preventDefault()** | 브라우저 기본 동작 방지 (폼 제출 시 새로고침 등) |
| **stopPropagation()** | 이벤트 버블링(부모로 전파) 방지 |
| **이벤트 타입** | React.MouseEvent, React.ChangeEvent, React.FormEvent 등 사용 |

---

## 실습 (Practice)

### 실습 목표
Props를 사용해서 재사용 가능한 컴포넌트를 만들어보세요.

### TODO 리스트

#### 1. ProfileCard 컴포넌트
- Props: `name(string)`, `job(string)`, `imageUrl(string, 선택적)`
- 이미지가 없으면 기본 아바타를 표시

#### 2. PriceTag 컴포넌트
- Props: `price(number)`, `currency(string, 기본값 '원')`, `discountPercent(number, 선택적)`
- 할인이 있으면 원래 가격에 취소선, 할인된 가격을 빨간색으로 표시
- 힌트: 할인 가격 = `price * (1 - discountPercent / 100)`
- 힌트: 취소선 스타일 = `{ textDecoration: 'line-through', color: 'gray' }`

#### 3. Badge 컴포넌트
- Props: `text(string)`, `variant('success' | 'warning' | 'error' | 'info')`
- variant에 따라 다른 색상 적용
- 힌트: success: 초록, warning: 노랑, error: 빨강, info: 파랑

#### 4. Container 컴포넌트 (children 사용)
- Props: `title(string)`, `children(React.ReactNode)`, `bordered(boolean, 기본값 true)`
- children을 감싸는 컨테이너를 만드세요

#### 5. StarRating 컴포넌트
- Props: `rating(number, 1-5)`, `maxRating(number, 기본값 5)`
- 별점을 별 이모지로 표시
- 힌트: `'⭐'.repeat(rating)` 또는 배열 사용

---

## 숙제 (Homework)

### 과제: 상품 목록 페이지

#### 요구사항

**1. ProductCard 컴포넌트**
- Props:
  - `name: string` (상품명)
  - `price: number` (가격)
  - `description: string` (설명)
  - `imageUrl?: string` (이미지 URL, 선택적)
  - `discount?: number` (할인율, 선택적)
  - `inStock: boolean` (재고 여부)
- UI:
  - 상품 이미지 (없으면 placeholder)
  - 상품명
  - 가격 (할인 있으면 할인가 표시)
  - 재고 없으면 "품절" 표시

**2. ProductList 컴포넌트**
- Props:
  - `title: string` (섹션 제목)
  - `children: React.ReactNode`

**3. 최소 4개의 상품을 표시하세요**

#### 힌트
- 카드는 flexbox로 가로 배치
- 품절 상품은 흐리게(`opacity: 0.5`) 처리
- 할인가: `price * (1 - discount / 100)`

#### 상품 데이터 예시

```tsx
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
```
