/**
 * ========================================
 * Day 05: 조건부 렌더링 & 리스트
 * ========================================
 *
 * 📚 학습 목표:
 * 1. 조건에 따라 다른 UI를 표시할 수 있다
 * 2. 배열 데이터를 리스트로 렌더링할 수 있다
 * 3. key prop의 중요성을 이해한다
 */

// ----------------------------------------
// 1. 조건부 렌더링이란?
// ----------------------------------------
/**
 * 조건에 따라 다른 내용을 화면에 표시하는 것
 *
 * 예:
 * - 로그인 상태 → 환영 메시지 / 로그인 버튼
 * - 데이터 로딩 중 → 로딩 표시 / 실제 데이터
 * - 에러 발생 → 에러 메시지
 */

// ----------------------------------------
// 2. if문 사용하기
// ----------------------------------------

interface GreetingProps {
  isLoggedIn: boolean;
  username?: string;
}

function Greeting({ isLoggedIn, username }: GreetingProps) {
  if (isLoggedIn) {
    return <p>환영합니다, {username}님!</p>;
  }
  return <p>로그인해주세요.</p>;
}

// ----------------------------------------
// 3. 삼항 연산자 (? :)
// ----------------------------------------
/**
 * 조건 ? 참일 때 : 거짓일 때
 * JSX 안에서 바로 사용 가능!
 */

function StatusBadge({ isOnline }: { isOnline: boolean }) {
  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "4px",
        backgroundColor: isOnline ? "#4CAF50" : "#9e9e9e",
        color: "white",
      }}
    >
      {isOnline ? "온라인" : "오프라인"}
    </span>
  );
}

// ----------------------------------------
// 4. && 연산자 (논리 AND)
// ----------------------------------------
/**
 * 조건 && 표시할 내용
 * 조건이 true일 때만 표시됨
 */

interface NotificationProps {
  count: number;
}

function Notification({ count }: NotificationProps) {
  return (
    <div>
      <span>알림</span>
      {count > 0 && (
        <span
          style={{
            marginLeft: "5px",
            backgroundColor: "red",
            color: "white",
            padding: "2px 6px",
            borderRadius: "10px",
            fontSize: "12px",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

// ----------------------------------------
// 5. 리스트 렌더링 - map()
// ----------------------------------------
/**
 * 배열.map()을 사용하여 배열의 각 항목을 JSX로 변환
 */

function FruitList() {
  const fruits = ["사과", "바나나", "오렌지", "포도"];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

// ----------------------------------------
// 6. key prop의 중요성
// ----------------------------------------
/**
 * key는 React가 각 항목을 구별하기 위해 사용
 *
 * ❌ 좋지 않은 예: index를 key로 사용
 * ✅ 좋은 예: 고유한 id를 key로 사용
 *
 * key가 없거나 중복되면 React가 효율적으로 업데이트하지 못함
 */

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const users: User[] = [
    { id: 1, name: "김철수", email: "kim@example.com" },
    { id: 2, name: "이영희", email: "lee@example.com" },
    { id: 3, name: "박민수", email: "park@example.com" },
  ];

  return (
    <div>
      {users.map((user) => (
        // key는 형제 요소들 사이에서 고유해야 함
        <div
          key={user.id}
          style={{
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <strong>{user.name}</strong>
          <br />
          <span style={{ color: "gray", fontSize: "14px" }}>{user.email}</span>
        </div>
      ))}
    </div>
  );
}

// ----------------------------------------
// 7. 조건부 렌더링 + 리스트 조합
// ----------------------------------------

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function ProductList() {
  const products: Product[] = [
    { id: 1, name: "노트북", price: 1500000, inStock: true },
    { id: 2, name: "마우스", price: 35000, inStock: true },
    { id: 3, name: "키보드", price: 89000, inStock: false },
    { id: 4, name: "모니터", price: 450000, inStock: true },
  ];

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ddd",
            borderRadius: "4px",
            opacity: product.inStock ? 1 : 0.5,
          }}
        >
          <strong>{product.name}</strong>
          <span style={{ marginLeft: "10px" }}>
            {product.price.toLocaleString()}원
          </span>
          {!product.inStock && (
            <span style={{ color: "red", marginLeft: "10px" }}>품절</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ----------------------------------------
// 8. 빈 배열 처리
// ----------------------------------------

function EmptyListExample() {
  const items: string[] = [];

  return (
    <div>
      {items.length > 0 ? (
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "gray" }}>표시할 항목이 없습니다.</p>
      )}
    </div>
  );
}

// ----------------------------------------
// 메인 컴포넌트
// ----------------------------------------

function Study() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 05: 조건부 렌더링 & 리스트</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>1. if문으로 조건부 렌더링</h2>
        <Greeting isLoggedIn={true} username="철수" />
        <Greeting isLoggedIn={false} />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>2. 삼항 연산자</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <StatusBadge isOnline={true} />
          <StatusBadge isOnline={false} />
        </div>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>3. && 연산자</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <Notification count={5} />
          <Notification count={0} />
        </div>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>4. 기본 리스트 렌더링</h2>
        <FruitList />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>5. 객체 배열 렌더링</h2>
        <UserList />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>6. 조건부 렌더링 + 리스트</h2>
        <ProductList />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>7. 빈 배열 처리</h2>
        <EmptyListExample />
      </section>
    </div>
  );
}

export default Study;
