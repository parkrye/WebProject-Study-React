/**
 * ========================================
 * Day 03: Props (속성)
 * ========================================
 *
 * 📚 학습 목표:
 * 1. Props가 무엇인지 이해한다
 * 2. 부모에서 자식으로 데이터를 전달할 수 있다
 * 3. TypeScript로 Props 타입을 정의할 수 있다
 * 4. children prop을 사용할 수 있다
 */

// ----------------------------------------
// 1. Props란?
// ----------------------------------------
/**
 * Props = Properties (속성)
 * 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다.
 *
 * HTML 속성과 비슷합니다:
 * <img src="photo.jpg" alt="사진" />
 *       ^^^           ^^^
 *       속성들!
 *
 * React에서:
 * <Greeting name="철수" age={25} />
 *           ^^^^       ^^^
 *           Props!
 */

// ----------------------------------------
// 2. Props 받기 (기본)
// ----------------------------------------

// 방법 1: props 객체로 받기
function Greeting1(props: { name: string }) {
  return <p>안녕하세요, {props.name}님!</p>;
}

// 방법 2: 구조 분해 할당 (더 많이 사용)
function Greeting2({ name }: { name: string }) {
  return <p>안녕하세요, {name}님!</p>;
}

// ----------------------------------------
// 3. TypeScript로 타입 정의하기
// ----------------------------------------

// interface로 Props 타입 정의 (권장)
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  isOnline?: boolean; // ? = 선택적 prop (없어도 됨)
}

function UserCard({ name, age, email, isOnline = false }: UserCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        maxWidth: "250px",
      }}
    >
      <h3>
        {name} {isOnline && "🟢"}
      </h3>
      <p>나이: {age}세</p>
      <p>이메일: {email}</p>
    </div>
  );
}

// ----------------------------------------
// 4. 다양한 타입의 Props
// ----------------------------------------

interface ProductProps {
  name: string;
  price: number;
  tags: string[]; // 배열
  details: {
    // 객체
    brand: string;
    category: string;
  };
}

function Product({ name, price, tags, details }: ProductProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{name}</h3>
      <p>가격: {price.toLocaleString()}원</p>
      <p>브랜드: {details.brand}</p>
      <p>카테고리: {details.category}</p>
      <p>태그: {tags.join(", ")}</p>
    </div>
  );
}

// ----------------------------------------
// 5. children prop
// ----------------------------------------
/**
 * children은 특별한 prop입니다.
 * 컴포넌트 태그 사이에 넣은 내용이 children이 됩니다.
 *
 * <Card>
 *   <p>이 내용이 children!</p>
 * </Card>
 */

interface CardProps {
  title: string;
  children: React.ReactNode; // JSX를 받을 때 사용하는 타입
}

function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        margin: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px 15px",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>
      <div style={{ padding: "15px" }}>{children}</div>
    </div>
  );
}

// ----------------------------------------
// 6. 기본값 설정하기
// ----------------------------------------

interface ButtonProps {
  text: string;
  color?: string;
  size?: "small" | "medium" | "large"; // 유니온 타입
}

function Button({ text, color = "blue", size = "medium" }: ButtonProps) {
  const sizeStyles = {
    small: { padding: "5px 10px", fontSize: "12px" },
    medium: { padding: "10px 20px", fontSize: "14px" },
    large: { padding: "15px 30px", fontSize: "18px" },
  };

  return (
    <button
      style={{
        backgroundColor: color,
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        ...sizeStyles[size],
        marginRight: "10px",
      }}
    >
      {text}
    </button>
  );
}

// ----------------------------------------
// 메인 컴포넌트
// ----------------------------------------

function Study() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 03: Props</h1>

      <section>
        <h2>1. 기본 Props</h2>
        <Greeting1 name="철수" />
        <Greeting2 name="영희" />
      </section>

      <section>
        <h2>2. 여러 Props 전달</h2>
        <UserCard name="김철수" age={25} email="kim@example.com" isOnline />
        <UserCard name="이영희" age={28} email="lee@example.com" />
      </section>

      <section>
        <h2>3. 복잡한 타입의 Props</h2>
        <Product
          name="무선 키보드"
          price={89000}
          tags={["전자기기", "주변기기", "블루투스"]}
          details={{ brand: "로지텍", category: "키보드" }}
        />
      </section>

      <section>
        <h2>4. children 사용</h2>
        <Card title="공지사항">
          <p>오늘은 React Props에 대해 배웁니다.</p>
          <p>children prop을 잘 활용해보세요!</p>
        </Card>
        <Card title="팁">
          <ul>
            <li>Props는 읽기 전용입니다</li>
            <li>부모 → 자식 방향으로만 전달됩니다</li>
          </ul>
        </Card>
      </section>

      <section>
        <h2>5. 기본값과 유니온 타입</h2>
        <div>
          <Button text="작은 버튼" size="small" />
          <Button text="기본 버튼" />
          <Button text="큰 버튼" size="large" color="green" />
        </div>
      </section>
    </div>
  );
}

export default Study;
