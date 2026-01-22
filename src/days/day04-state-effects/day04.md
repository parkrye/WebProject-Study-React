# Day 04: useState 심화 & useEffect

## 학습 목표
- 객체와 배열 상태의 불변성 유지 방법
- useEffect Hook의 개념과 사용법
- 의존성 배열 이해하기
- 클린업 함수의 중요성
- 자주 하는 실수와 해결 방법

---

## 1. useState 심화 - 객체 상태 업데이트

### 불변성(Immutability)이란?

React에서 상태를 업데이트할 때는 기존 값을 직접 수정하지 않고, **항상 새로운 값**을 만들어야 합니다.

**왜?** React는 이전 상태와 새 상태의 **참조(reference)**를 비교해서 변경을 감지합니다. 직접 수정하면 같은 참조이므로 변경을 감지하지 못합니다.

### 잘못된 방법 vs 올바른 방법

**잘못된 방법 (직접 수정):**
```tsx
const [user, setUser] = useState({ name: '철수' });

// 직접 수정 - 리렌더링 안 됨!
user.name = '영희';
setUser(user);  // 같은 참조 → 변경 감지 못함

// 왜 안 될까?
// Object.is(이전user, 새user) === true
// React: "변한 게 없네? 리렌더링 안 해도 되겠다"
```

**올바른 방법 (새 객체 생성):**
```tsx
const [user, setUser] = useState({ name: '철수' });

// 스프레드로 새 객체 생성 - 리렌더링 됨!
setUser({ ...user, name: '영희' });

// 왜 될까?
// { ...user }는 새로운 객체를 생성
// Object.is(이전user, 새user) === false
// React: "변경됐네! 리렌더링 해야지"
```

### 중첩 객체 업데이트

```tsx
const [user, setUser] = useState({
  name: '철수',
  address: {
    city: '서울',
    zipCode: '12345'
  }
});

// 중첩된 객체를 업데이트할 때는 모든 레벨에서 스프레드 필요
const updateCity = (newCity: string) => {
  setUser({
    ...user,           // 최상위 객체 복사
    address: {
      ...user.address, // 중첩 객체 복사
      city: newCity    // 변경할 값만 덮어쓰기
    }
  });
};
```

---

## 2. useState 심화 - 배열 상태 업데이트

### 배열 불변성 유지하기

배열도 객체이므로 직접 수정하면 안 됩니다. 항상 새 배열을 만드세요.

| 작업 | 직접 수정 | 불변성 유지 |
|------|----------|------------|
| 추가 | `arr.push(item)` | `[...arr, item]` |
| 삭제 | `arr.splice(i, 1)` | `arr.filter(x => x.id !== id)` |
| 수정 | `arr[i].done = true` | `arr.map(x => x.id === id ? {...x, done: true} : x)` |
| 정렬 | `arr.sort()` | `[...arr].sort()` |

### 배열 CRUD 패턴

```tsx
const [todos, setTodos] = useState<Todo[]>([]);

// Create (추가)
const addTodo = (text: string) => {
  const newTodo = { id: Date.now(), text, completed: false };
  setTodos([...todos, newTodo]);
  // 또는 setTodos(prev => [...prev, newTodo]);
};

// Delete (삭제)
const deleteTodo = (id: number) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

// Update (수정)
const toggleTodo = (id: number) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  ));
};
```

---

## 3. useEffect란?

### 정의

**useEffect**는 컴포넌트에서 **부수 효과(Side Effect)**를 수행하기 위한 Hook입니다.

### 부수 효과(Side Effect)란?
- 데이터 가져오기 (API 호출)
- 구독 설정 (WebSocket, 이벤트 리스너)
- DOM 직접 조작
- 타이머 설정 (setTimeout, setInterval)
- 로깅

### useEffect 문법

```tsx
useEffect(() => {
  // 1. 이펙트 코드 (컴포넌트 렌더링 후 실행)
  console.log('Effect 실행!');

  // 2. 클린업 함수 (옵션) - 다음 이펙트 전 또는 언마운트 시 실행
  return () => {
    console.log('클린업 실행!');
  };
}, [의존성배열]); // 3. 의존성 배열 - 언제 이펙트를 다시 실행할지
```

---

## 4. 의존성 배열 이해하기

의존성 배열은 useEffect가 **언제 다시 실행될지**를 결정합니다.

### 케이스 1: 빈 배열 []

```tsx
useEffect(() => {
  console.log('마운트 시 한 번만 실행');
  // 컴포넌트가 처음 화면에 나타날 때만 실행
  // 예: 초기 데이터 로드, 이벤트 리스너 등록

  return () => {
    console.log('언마운트 시 실행');
    // 컴포넌트가 화면에서 사라질 때만 실행
  };
}, []); // ← 빈 배열
```

### 케이스 2: 의존성 있음 [dep1, dep2]

```tsx
useEffect(() => {
  console.log('count 또는 name이 변경됨');
  // 마운트 시 + count나 name이 바뀔 때마다 실행

  return () => {
    console.log('이전 값으로 클린업');
    // 다음 이펙트 실행 전에 이전 값으로 클린업
  };
}, [count, name]); // ← count, name 의존
```

### 케이스 3: 배열 생략 (권장하지 않음)

```tsx
useEffect(() => {
  console.log('매 렌더링마다 실행');
  // 모든 state, props 변경에 반응
  // 주의: 무한 루프 위험!
});  // ← 배열 없음

// 예: setCount 호출 → 리렌더링 → useEffect 실행
//     → setCount 호출 → 무한 반복!
```

### 의존성 배열 규칙

- 이펙트 내에서 사용하는 모든 외부 값(state, props, 함수)을 넣어야 함
- ESLint의 exhaustive-deps 규칙을 따르세요
- 의존성을 빼면 버그의 원인이 됩니다 (stale closure)

---

## 5. 클린업 함수

### 클린업이 필요한 경우

- 이벤트 리스너 등록 → 해제 필요
- 타이머 설정 → 정리 필요
- 구독 설정 → 구독 해제 필요
- WebSocket 연결 → 연결 해제 필요

클린업을 안 하면 **메모리 누수**가 발생합니다!

### 타이머 클린업 예시

```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // isRunning이 false면 아무것도 안 함
    if (!isRunning) return;

    // 1초마다 seconds 증가
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 클린업: 타이머 정리
    return () => {
      clearInterval(intervalId);
      console.log('타이머 정리됨');
    };
  }, [isRunning]); // isRunning이 바뀔 때마다 실행

  return (
    <div>
      <p>시간: {seconds}초</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '정지' : '시작'}
      </button>
      <button onClick={() => setSeconds(0)}>리셋</button>
    </div>
  );
}
```

### 이벤트 리스너 클린업 예시

```tsx
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 클린업: 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 마운트/언마운트 시만

  return <p>창 너비: {width}px</p>;
}
```

---

## 6. useEffect 실행 순서

```tsx
function Example() {
  console.log('1. 렌더링');  // 먼저 실행

  useEffect(() => {
    console.log('3. useEffect 실행');  // 렌더링 후 실행

    return () => {
      console.log('2. 클린업 (리렌더링 전)');  // 다음 이펙트 전에 실행
    };
  });

  return <div>...</div>;
}

// 실행 순서:
// [마운트] 1. 렌더링 → 3. useEffect 실행
// [업데이트] 1. 렌더링 → 2. 클린업 → 3. useEffect 실행
// [언마운트] 2. 클린업
```

### 핵심 포인트
- useEffect는 렌더링 **후에** 실행됩니다 (동기 X, 비동기 O)
- 클린업은 다음 이펙트 실행 **전에** 실행됩니다
- 언마운트 시에도 클린업이 실행됩니다

---

## 7. 자주 하는 실수

### 실수 1: 무한 루프

```tsx
// ❌ 무한 루프!
useEffect(() => {
  setCount(count + 1);  // state 변경 → 리렌더링 → useEffect → 반복
});

// ✅ 해결: 의존성 배열 추가
useEffect(() => {
  // 특정 조건에서만 실행
}, [특정조건]);
```

### 실수 2: 클린업 누락

```tsx
// ❌ 메모리 누수!
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  // 클린업 없음 → 컴포넌트 언마운트 후에도 리스너 남아있음
}, []);

// ✅ 해결: 클린업 추가
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 실수 3: 의존성 누락 (Stale Closure)

```tsx
// ❌ 항상 초기 count 값만 사용됨
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);  // 항상 0 (클로저가 초기값 캡처)
  }, 1000);
  return () => clearInterval(id);
}, []);  // count가 의존성에 없음

// ✅ 해결: 함수형 업데이트 또는 의존성 추가
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1);  // prev는 항상 최신값
  }, 1000);
  return () => clearInterval(id);
}, []);
```

---

## 핵심 정리

| 개념 | 설명 |
|------|------|
| **불변성** | 상태는 직접 수정 금지. 스프레드(...), map, filter로 새 값 생성 |
| **useEffect** | 부수 효과(API 호출, 이벤트 리스너, 타이머 등)를 처리하는 Hook |
| **의존성 배열** | []: 마운트 시 1회 / [deps]: deps 변경 시 / 생략: 매 렌더링 |
| **클린업 함수** | return () => {}로 정리 작업 수행. 메모리 누수 방지에 필수 |
| **실행 순서** | 렌더링 → (클린업) → useEffect 실행 |

---

## 실습 (Practice)

### 실습 목표
객체와 배열 상태를 올바르게 업데이트하는 연습을 합니다.

### TODO 리스트

#### 1. 프로필 편집기
- `profile` 객체 상태: `{ name, bio, avatar }`
- 각 필드를 수정할 수 있는 폼 구현
- 입력한 내용이 실시간으로 프로필 카드에 반영

#### 2. 쇼핑 카트
- `cartItems` 배열 상태
- 항목 추가, 수량 변경, 삭제 기능 구현
- 총 금액 계산 표시
- 예시 상품 데이터:
```tsx
const products = [
  { id: 1, name: '사과', price: 1000 },
  { id: 2, name: '바나나', price: 1500 },
  { id: 3, name: '오렌지', price: 2000 },
];
```

#### 3. 연락처 목록
- `contacts` 배열 상태: `{ id, name, phone, favorite }`
- 새 연락처 추가
- 연락처 삭제
- 즐겨찾기 토글
- 즐겨찾기 연락처만 필터링해서 보기

---

## 숙제 (Homework)

### 과제: 메모장 앱

#### 요구사항

**1. Note 타입 정의**
```tsx
interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  color: string; // 배경색
  pinned: boolean; // 고정 여부
}
```

**2. 메모 목록 표시**
- 고정된 메모가 상단에 표시
- 나머지는 수정일 기준 최신순
- 카드 형태로 표시

**3. 메모 추가**
- 제목과 내용 입력
- 색상 선택 (최소 4가지)
- 추가 버튼 클릭 시 목록에 추가

**4. 메모 편집**
- 메모 클릭 시 편집 모드
- 제목, 내용, 색상 수정 가능
- 저장 버튼으로 변경 적용

**5. 메모 삭제**
- 각 메모에 삭제 버튼

**6. 메모 고정/해제**
- 핀 아이콘 클릭으로 고정 토글

**7. 검색 기능**
- 제목과 내용에서 검색어 포함된 메모만 표시

#### 힌트
- 여러 상태가 필요합니다: notes, searchTerm, editingNote 등
- `Date.now()`로 간단한 ID 생성
- `new Date()`로 현재 시간
- 불변성을 지켜서 상태 업데이트
