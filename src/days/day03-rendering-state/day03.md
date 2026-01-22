# Day 03: 렌더링 & useState 기초

## 학습 목표
- 조건부 렌더링 방법 이해 (삼항 연산자, && 연산자, if문)
- 리스트 렌더링과 key prop의 중요성
- useState Hook의 기본 사용법
- 상태의 불변성과 함수형 업데이트

---

## 1. 조건부 렌더링

### 정의
**조건부 렌더링**이란 특정 조건에 따라 다른 UI를 보여주는 것입니다. JavaScript의 조건문과 같은 방식으로 동작하며, React에서는 여러 방법으로 구현할 수 있습니다.

### 방법 1: if문 사용 (컴포넌트 분리)

```tsx
function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  // if문으로 먼저 조건 체크
  if (isLoggedIn) {
    return <h1>환영합니다!</h1>;
  }
  return <h1>로그인해주세요.</h1>;
}

// 또는 early return 패턴
function Dashboard({ user }: { user: User | null }) {
  // 데이터가 없으면 로딩 표시
  if (!user) {
    return <p>로딩 중...</p>;
  }

  // 데이터가 있으면 정상 렌더링
  return <div>안녕하세요, {user.name}님!</div>;
}
```

### 방법 2: 삼항 연산자 (? :)

**언제 사용?** 조건에 따라 두 가지 UI 중 하나를 보여줄 때

```tsx
// 문법: 조건 ? 참일 때 : 거짓일 때

function UserStatus({ isOnline }: { isOnline: boolean }) {
  return (
    <span>
      {isOnline ? '온라인' : '오프라인'}
    </span>
  );
}

// JSX 안에서 바로 사용
<div>
  {isLoggedIn ? <LogoutButton /> : <LoginButton />}
</div>
```

### 방법 3: 논리 AND 연산자 (&&)

**언제 사용?** 조건이 참일 때만 무언가를 보여줄 때 (거짓일 때는 아무것도 안 보여줌)

```tsx
// 문법: 조건 && 보여줄 것

function Notifications({ count }: { count: number }) {
  return (
    <div>
      {/* count가 0보다 크면 배지 표시, 아니면 아무것도 안 보임 */}
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}

// 여러 조건 조합
<div>
  {isAdmin && <AdminPanel />}
  {hasNotifications && <NotificationBell />}
</div>
```

**주의!** count가 0일 때 `0 && ...`는 0을 렌더링합니다.
- 해결: `{count > 0 && ...}` 또는 `{!!count && ...}`

### 조건부 렌더링 예시

```tsx
function ConditionalDemo() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "숨기기" : "보이기"}
      </button>

      {/* 삼항 연산자 사용 */}
      <p>삼항 연산자: {isVisible ? "보입니다!" : "숨겨졌습니다"}</p>

      {/* && 연산자 사용 */}
      {isVisible && (
        <div style={{ padding: "15px", backgroundColor: "#c8e6c9" }}>
          && 연산자: 이 박스는 조건이 참일 때만 보입니다.
        </div>
      )}
    </div>
  );
}
```

---

## 2. 리스트 렌더링

### 정의
**리스트 렌더링**은 배열 데이터를 기반으로 여러 개의 컴포넌트나 요소를 반복해서 렌더링하는 것입니다. JavaScript의 `map()` 메서드를 사용합니다.

### map() 메서드란?

```javascript
// map()은 배열의 각 요소를 변환하여 새 배열을 반환합니다

const numbers = [1, 2, 3, 4, 5];

// 각 숫자를 2배로
const doubled = numbers.map(num => num * 2);
// 결과: [2, 4, 6, 8, 10]

// React에서 JSX로 변환
const listItems = numbers.map(num => <li>{num}</li>);
// 결과: [<li>1</li>, <li>2</li>, ...]
```

### key prop의 중요성

#### key란?
**key**는 React가 리스트의 각 항목을 고유하게 식별하는 데 사용하는 특별한 속성입니다.

#### 왜 필요한가?
- React가 어떤 항목이 변경, 추가, 삭제되었는지 효율적으로 파악
- Virtual DOM 비교(Diffing) 과정에서 성능 최적화에 필수
- 없으면 React가 경고를 표시하고 비효율적으로 동작

#### key 선택 가이드

```tsx
// 좋음: 고유한 ID 사용
users.map(user => <UserCard key={user.id} user={user} />)

// 주의: index는 최후의 수단
// - 리스트가 정적이고 변하지 않을 때만 사용
items.map((item, index) => <Item key={index} item={item} />)

// 잘못됨: 랜덤 값
items.map(item => <Item key={Math.random()} item={item} />)
```

### 리스트 렌더링 + CRUD 예시

```tsx
function ListDemo() {
  const [items, setItems] = useState(["사과", "바나나", "오렌지"]);
  const [newItem, setNewItem] = useState("");

  // 아이템 추가
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  // 아이템 삭제
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* 입력 필드 + 추가 버튼 */}
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="새 아이템 입력"
          onKeyPress={(e) => e.key === "Enter" && addItem()}
        />
        <button onClick={addItem}>추가</button>
      </div>

      {/* 리스트 렌더링 */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeItem(index)}>삭제</button>
          </li>
        ))}
      </ul>

      {/* 빈 리스트 처리 */}
      {items.length === 0 && <p>아이템이 없습니다.</p>}
    </div>
  );
}
```

---

## 3. useState란?

### 정의
**useState**는 React의 Hook으로, 함수 컴포넌트에서 상태(state)를 관리할 수 있게 해줍니다.

**상태(State)란?** 컴포넌트가 기억해야 하는 데이터로, 시간에 따라 변할 수 있으며, 변경되면 화면이 다시 렌더링됩니다.

### 일반 변수 vs useState

**일반 변수 (동작 안 함):**
```tsx
function Counter() {
  let count = 0;  // 일반 변수

  const increment = () => {
    count = count + 1;  // 값은 바뀌지만...
    // 화면은 업데이트 안 됨!
  };

  return (
    <button onClick={increment}>
      클릭: {count}  {/* 항상 0 */}
    </button>
  );
}
```

**useState (정상 동작):**
```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);  // 상태 업데이트
    // React가 리렌더링!
  };

  return (
    <button onClick={increment}>
      클릭: {count}  {/* 업데이트됨 */}
    </button>
  );
}
```

### useState 문법 분석

```tsx
import { useState } from 'react';

// 기본 문법
const [상태값, 상태변경함수] = useState(초기값);

// 실제 예시
const [count, setCount] = useState(0);
//     ↑        ↑               ↑
//  현재 값  값을 바꾸는 함수  초기값
```

### 카운터 예시

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "48px" }}>{count}</p>
      <div>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>리셋</button>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    </div>
  );
}
```

---

## 4. 다양한 타입의 상태 관리

### 문자열 상태

```tsx
function TextInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <p>입력된 이름: {name || "(비어있음)"}</p>
    </div>
  );
}

// value와 onChange를 함께 사용하는 것을
// "Controlled Component" 패턴이라고 합니다.
```

### 배열/객체 상태의 불변성

**핵심 원칙: 불변성(Immutability)**

React에서 상태를 업데이트할 때는 **항상 새로운 값**을 만들어야 합니다.

```tsx
// 배열: 새 배열 생성
setItems([...items, newItem]);        // 추가
setItems(items.filter(x => x !== id)); // 삭제

// 객체: 새 객체 생성
setUser({ ...user, name: newName });

// 직접 수정 (작동 안 함!)
items.push(newItem);  // 리렌더링 안 됨
user.name = newName;  // 리렌더링 안 됨
```

---

## 5. 함수형 업데이트

### 언제 사용하는가?
이전 상태값을 기반으로 새 상태를 계산할 때 안전하게 사용합니다.

**문제 가능성:**
```tsx
const handleClick = () => {
  setCount(count + 1);  // 0 + 1 = 1
  setCount(count + 1);  // 0 + 1 = 1
  setCount(count + 1);  // 0 + 1 = 1
  // 결과: 1 (3이 아님!)
};
```

**함수형 업데이트:**
```tsx
const handleClick = () => {
  setCount(prev => prev + 1);  // 0→1
  setCount(prev => prev + 1);  // 1→2
  setCount(prev => prev + 1);  // 2→3
  // 결과: 3 (정확!)
};
```

---

## 핵심 정리

| 개념 | 설명 |
|------|------|
| **조건부 렌더링** | 삼항 연산자(? :), && 연산자, if문으로 조건에 따라 다른 UI 표시 |
| **리스트 렌더링** | map()으로 배열을 JSX로 변환. 반드시 고유한 key prop 필요 |
| **useState** | [값, 변경함수] = useState(초기값). 상태가 바뀌면 리렌더링 |
| **불변성** | 상태는 직접 수정 금지. 스프레드(...), map, filter로 새 값 생성 |
| **함수형 업데이트** | setState(prev => newValue). 이전 상태 기반 업데이트에 안전 |

---

## 실습 (Practice)

### 실습 목표
조건부 렌더링과 리스트 렌더링을 연습합니다.

### 제공되는 데이터

```tsx
const isAdmin = true;
const hasNotifications = true;
const notificationCount = 3;

const todos = [
  { id: 1, text: "React 공부하기", completed: true },
  { id: 2, text: "운동하기", completed: false },
  { id: 3, text: "책 읽기", completed: false },
  { id: 4, text: "코딩 테스트", completed: true },
];

const users = [
  { id: 1, name: "김철수", role: "admin", isActive: true },
  { id: 2, name: "이영희", role: "user", isActive: true },
  { id: 3, name: "박민수", role: "user", isActive: false },
  { id: 4, name: "정수진", role: "moderator", isActive: true },
];
```

### TODO 리스트

1. **관리자 전용 메뉴** - isAdmin이 true일 때만 "관리자 메뉴" 버튼 표시 (힌트: && 연산자)
2. **알림 뱃지** - hasNotifications가 true이고 notificationCount > 0일 때 뱃지 표시
3. **Todo 리스트 렌더링** - todos 배열을 리스트로 렌더링, completed가 true인 항목은 취소선 적용
4. **사용자 목록** - users 배열을 카드 형태로 렌더링
   - isActive가 false인 사용자는 흐리게(`opacity: 0.5`)
   - role이 'admin'인 사용자 이름 옆에 [관리자] 표시
5. **빈 리스트 처리** - emptyList가 비어있으면 "항목이 없습니다" 메시지 표시
6. **도전: 필터링된 리스트** - users 중 isActive가 true인 사용자만 표시 (힌트: filter()와 map() 조합)

---

## 숙제 (Homework)

### 과제: 대시보드 만들기

#### 제공되는 데이터

```tsx
const stats = [
  { id: 1, title: "총 방문자", value: 12453, change: 12.5, isPositive: true },
  { id: 2, title: "신규 가입", value: 342, change: -3.2, isPositive: false },
  { id: 3, title: "매출", value: 8900000, change: 8.1, isPositive: true },
];

const tasks = [
  { id: 1, title: "보고서 작성", priority: "high", completed: false },
  { id: 2, title: "미팅 준비", priority: "medium", completed: true },
  { id: 3, title: "이메일 확인", priority: "low", completed: true },
  { id: 4, title: "코드 리뷰", priority: "high", completed: false },
  { id: 5, title: "문서 업데이트", priority: "medium", completed: false },
];

const members = [
  { id: 1, name: "김팀장", role: "lead", status: "online" },
  { id: 2, name: "이개발", role: "developer", status: "online" },
  { id: 3, name: "박디자인", role: "designer", status: "away" },
  { id: 4, name: "최기획", role: "planner", status: "offline" },
];

const activities = [
  { id: 1, user: "김팀장", action: "새 프로젝트 생성", time: "10분 전" },
  { id: 2, user: "이개발", action: "코드 커밋", time: "25분 전" },
  { id: 3, user: "박디자인", action: "디자인 업로드", time: "1시간 전" },
];
```

#### 요구사항

**1. StatCard 컴포넌트**
- title, value, change(증감률), isPositive 표시
- isPositive에 따라 초록/빨간색으로 표시

**2. TaskList 컴포넌트**
- tasks 배열을 렌더링
- priority에 따라 다른 색상 (high: 빨강, medium: 노랑, low: 초록)
- completed 항목은 취소선 + 흐리게

**3. TeamMembers 컴포넌트**
- members 배열을 렌더링
- status에 따라 뱃지 색상 다르게 (online: 초록, away: 노랑, offline: 회색)
- role이 'lead'인 멤버는 이름 옆에 별표 표시

**4. RecentActivities 컴포넌트**
- activities 배열을 렌더링
- 배열이 비어있으면 "최근 활동이 없습니다" 표시

#### 힌트
- 각 컴포넌트에 적절한 Props 타입을 정의하세요
- key prop을 잊지 마세요
- 조건부 스타일링을 활용하세요
