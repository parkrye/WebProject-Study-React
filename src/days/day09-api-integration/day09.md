# Day 09: API 연동

## 학습 목표
- fetch API의 개념과 사용법 이해하기
- HTTP 메서드와 CRUD 작업 이해하기
- 서비스 레이어 패턴으로 API 로직 분리하기
- 에러 핸들링 전략 익히기
- Optimistic Update 패턴 구현하기
- 무한 스크롤과 페이지네이션 구현하기
- useEffect에서의 데이터 페칭 패턴 익히기

---

## 1. fetch API란?

### 정의

**fetch API**는 브라우저에 내장된 HTTP 요청을 수행하기 위한 인터페이스입니다. Promise 기반으로 동작하며, 네트워크 요청을 비동기적으로 처리할 수 있습니다.

### 특징

- **Promise 기반:** async/await와 자연스럽게 연동
- **내장 API:** 별도 라이브러리 설치 불필요
- **스트림 지원:** 대용량 데이터 처리 가능
- **유연한 설정:** 헤더, 메서드, 바디 등 세밀한 제어

### 왜 API 연동이 필요한가?

| 시나리오 | 설명 | 예시 |
|---------|------|------|
| 데이터 조회 | 서버에서 데이터 가져오기 | 게시글 목록, 사용자 정보 |
| 데이터 생성 | 새로운 데이터 저장 | 회원가입, 글 작성 |
| 데이터 수정 | 기존 데이터 업데이트 | 프로필 수정, 글 편집 |
| 데이터 삭제 | 데이터 제거 | 계정 삭제, 글 삭제 |

---

## 2. fetch 기본 사용법

### 기본 GET 요청

```typescript
// 기본 형태
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// React 컴포넌트에서 사용
function DataComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.example.com/posts');

      // 응답 상태 확인 (중요!)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? '로딩 중...' : '데이터 불러오기'}
      </button>
      {error && <p className="error">{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

---

## 3. HTTP 메서드와 CRUD

### HTTP 메서드와 CRUD 매핑

| 작업 | HTTP 메서드 | 설명 |
|------|------------|------|
| Create (생성) | `POST` | 새로운 리소스 생성 |
| Read (조회) | `GET` | 리소스 조회 |
| Update (수정) | `PUT` / `PATCH` | 전체 수정 / 부분 수정 |
| Delete (삭제) | `DELETE` | 리소스 삭제 |

### 각 메서드 사용 예시

```typescript
// GET - 데이터 조회
const posts = await fetch('/api/posts');

// POST - 데이터 생성
const newPost = await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: '새 게시글',
    content: '내용입니다.',
  }),
});

// PUT - 전체 데이터 수정
const updatedPost = await fetch('/api/posts/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: '수정된 제목',
    content: '수정된 내용',
  }),
});

// PATCH - 부분 데이터 수정
const patchedPost = await fetch('/api/posts/1', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: '제목만 수정',  // content는 변경 안 함
  }),
});

// DELETE - 데이터 삭제
await fetch('/api/posts/1', {
  method: 'DELETE',
});
```

---

## 4. 서비스 레이어 패턴

### 서비스 레이어란?

**서비스 레이어**는 API 호출 로직을 컴포넌트에서 분리하여 별도의 모듈로 관리하는 패턴입니다.

### 장점

- **관심사 분리:** 컴포넌트는 UI만, 서비스는 데이터만
- **재사용성:** 여러 컴포넌트에서 같은 API 호출 재사용
- **테스트 용이:** API 로직만 별도로 테스트 가능
- **유지보수:** API 변경 시 한 곳만 수정

### 잘못된 예시 vs 올바른 예시

```typescript
// 잘못된 예시: 컴포넌트에 API 로직이 섞여 있음
function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch('https://api.example.com/posts');
    const data = await res.json();
    setPosts(data);
  };
  // URL, 헤더 등이 컴포넌트에 직접 작성됨
  // 다른 컴포넌트에서 같은 API 사용 시 중복 코드 발생!
}

// 올바른 예시: 서비스 레이어 분리
// services/postService.ts
const BASE_URL = 'https://api.example.com';

export const postService = {
  getAll: () => fetch(`${BASE_URL}/posts`),
  getById: (id) => fetch(`${BASE_URL}/posts/${id}`),
  create: (data) => fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// 컴포넌트에서 사용
function PostList() {
  const fetchPosts = async () => {
    const posts = await postService.getAll();
    setPosts(posts);
  };
}
```

### 완전한 서비스 레이어 구현

```typescript
// services/api.ts - 기본 fetch 래퍼
const API_BASE_URL = 'https://api.example.com';

interface ApiError {
  message: string;
  status?: number;
}

async function fetchWithError<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      message: error.message || `HTTP ${response.status}`,
      status: response.status,
    };
  }

  return response.json();
}

// services/postService.ts
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const postService = {
  getAll: () =>
    fetchWithError<Post[]>(`${API_BASE_URL}/posts`),

  getById: (id: number) =>
    fetchWithError<Post>(`${API_BASE_URL}/posts/${id}`),

  create: (data: Omit<Post, 'id'>) =>
    fetchWithError<Post>(`${API_BASE_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<Post>) =>
    fetchWithError<Post>(`${API_BASE_URL}/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchWithError<void>(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    }),
};
```

---

## 5. 에러 핸들링

### 주의: fetch는 네트워크 오류만 reject

`fetch`는 **네트워크 오류**가 발생했을 때만 Promise를 reject합니다. HTTP 에러 상태(404, 500 등)는 reject되지 않으므로 `response.ok`를 확인해야 합니다!

### 에러 타입별 처리

```typescript
interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    // HTTP 에러 처리
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw { message: '잘못된 요청입니다', status: 400 };
        case 401:
          throw { message: '인증이 필요합니다', status: 401 };
        case 403:
          throw { message: '접근 권한이 없습니다', status: 403 };
        case 404:
          throw { message: '리소스를 찾을 수 없습니다', status: 404 };
        case 500:
          throw { message: '서버 오류가 발생했습니다', status: 500 };
        default:
          throw { message: `HTTP Error: ${response.status}`, status: response.status };
      }
    }

    return response.json();
  } catch (error) {
    // 네트워크 오류 처리
    if (error instanceof TypeError) {
      throw { message: '네트워크 연결을 확인해주세요' };
    }
    throw error;
  }
}

// 컴포넌트에서 사용
function DataComponent() {
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = async () => {
    try {
      const data = await fetchWithErrorHandling('/api/data');
      // 성공 처리
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);

      // 에러 타입별 추가 처리
      if (apiError.status === 401) {
        // 로그인 페이지로 리다이렉트
      }
    }
  };
}
```

---

## 6. Optimistic Update (낙관적 업데이트)

### 정의

**Optimistic Update**는 서버 응답을 기다리지 않고 UI를 먼저 업데이트한 후, 서버 요청이 실패하면 롤백하는 패턴입니다.

### 특징

- **장점:** 빠른 사용자 경험, 반응성 향상
- **단점:** 롤백 로직 필요, 복잡도 증가
- **적합한 경우:** 성공 확률이 높은 간단한 작업

### Optimistic Update 구현 패턴

```typescript
function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = async (id: number) => {
    // 1. 현재 상태 백업 (롤백용)
    const previousTodos = [...todos];

    // 2. 낙관적 업데이트 (즉시 UI 반영)
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));

    try {
      // 3. 서버에 요청
      await todoService.toggle(id);
      // 성공 시 아무것도 안 함 (이미 UI 업데이트됨)
    } catch (error) {
      // 4. 실패 시 롤백
      setTodos(previousTodos);

      // 사용자에게 알림
      alert('업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };
}
```

### 일반적인 방식 vs Optimistic Update

```typescript
// 일반적인 방식: 서버 응답 후 UI 업데이트
const toggleTodo = async (id) => {
  setLoading(true);
  await todoService.toggle(id);  // 서버 응답까지 기다림 (느림)
  setTodos(todos.map(...));      // 응답 후에야 UI 업데이트
  setLoading(false);
};
// 사용자 경험: "클릭 -> 로딩 -> 변경"

// Optimistic Update: 먼저 UI 업데이트, 나중에 서버 요청
const toggleTodo = async (id) => {
  const backup = [...todos];
  setTodos(todos.map(...));  // 즉시 UI 업데이트 (빠름!)

  try {
    await todoService.toggle(id);
  } catch {
    setTodos(backup);  // 실패 시 롤백
  }
};
// 사용자 경험: "클릭 -> 즉시 변경"
```

---

## 7. 무한 스크롤 & 페이지네이션

### 무한 스크롤이란?

**무한 스크롤**은 사용자가 페이지 끝에 도달하면 자동으로 다음 데이터를 불러오는 패턴입니다. `Intersection Observer API`를 사용하여 구현합니다.

### Intersection Observer를 사용한 무한 스크롤

```typescript
function InfiniteScrollList() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  // 데이터 로드 함수
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newItems = await fetchItems(page);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 관찰 대상이 화면에 보이면 loadMore 실행
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1.0 }  // 100% 보일 때 트리거
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}

      {/* 이 요소가 화면에 보이면 다음 페이지 로드 */}
      <div ref={observerRef}>
        {isLoading && <Spinner />}
        {!hasMore && <p>모든 데이터를 불러왔습니다</p>}
      </div>
    </div>
  );
}
```

---

## 8. useEffect와 데이터 페칭

### 주의: useEffect에서의 비동기 처리

`useEffect`의 콜백 함수는 직접 async가 될 수 없습니다. 내부에 async 함수를 정의하고 호출하거나, IIFE를 사용하세요.

```typescript
// 잘못된 예시: useEffect는 cleanup 함수를 반환해야 함
// async 함수는 Promise를 반환하므로 오류!
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);

// 올바른 예시 1: 내부 함수 정의
useEffect(() => {
  const loadData = async () => {
    const data = await fetchData();
    setData(data);
  };
  loadData();
}, []);

// 올바른 예시 2: IIFE
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);
```

### Cleanup과 Race Condition 방지

```typescript
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // 요청 취소를 위한 플래그
    let isCancelled = false;

    const search = async () => {
      const data = await searchAPI(query);

      // 컴포넌트가 언마운트되었거나
      // 새 검색이 시작되었으면 결과 무시
      if (!isCancelled) {
        setResults(data);
      }
    };

    search();

    // Cleanup: 새 검색 시작 시 이전 요청 결과 무시
    return () => {
      isCancelled = true;
    };
  }, [query]);  // query가 바뀔 때마다 실행
}

// AbortController 사용 (fetch 취소)
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, [url]);
```

---

## 핵심 정리

| 개념 | 설명 | 핵심 포인트 |
|------|------|------------|
| `fetch` | HTTP 요청 API | response.ok 확인 필수 |
| CRUD | 생성/조회/수정/삭제 | POST/GET/PUT,PATCH/DELETE |
| 서비스 레이어 | API 로직 분리 | 재사용성, 유지보수 향상 |
| 에러 핸들링 | HTTP/네트워크 에러 처리 | 상태코드별 처리, 사용자 알림 |
| Optimistic Update | 즉시 UI 업데이트 | 백업 후 업데이트, 실패 시 롤백 |
| 무한 스크롤 | 자동 페이지 로드 | Intersection Observer 활용 |
| useEffect 패턴 | 데이터 페칭 | cleanup으로 race condition 방지 |

---

## 실습 (Practice)

### 실습 목표
API 연동 패턴을 실습합니다.

### TODO 리스트
1. fetch로 데이터 가져오기
2. 서비스 레이어 패턴 적용하기
3. 에러 핸들링 구현하기
4. CRUD 작업 구현하기

---

## 숙제 (Homework)

### 과제: API 연동 구현

#### 요구사항

**1. 게시글 목록 페이지**
- JSONPlaceholder API 사용: `https://jsonplaceholder.typicode.com/posts`
- 게시글 목록 조회 (GET)
- 무한 스크롤 또는 페이지네이션 구현
- 로딩 상태 및 에러 표시

**2. 게시글 상세 페이지**
- 특정 게시글 조회 (GET /posts/:id)
- 작성자 정보 함께 표시 (GET /users/:userId)
- 댓글 목록 표시 (GET /posts/:id/comments)

**3. CRUD 기능 구현**
```typescript
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
```
- 새 게시글 작성 (POST)
- 게시글 수정 (PATCH)
- 게시글 삭제 (DELETE)
- Optimistic Update 적용

**4. 서비스 레이어 구현**
```typescript
// services/postService.ts
export const postService = {
  getAll: (page: number, limit: number) => Promise<Post[]>,
  getById: (id: number) => Promise<Post>,
  create: (data: CreatePostDTO) => Promise<Post>,
  update: (id: number, data: UpdatePostDTO) => Promise<Post>,
  delete: (id: number) => Promise<void>,
};
```

#### 힌트
- fetch 래퍼 함수로 공통 로직 추출
- TypeScript 타입 정의 필수
- try-catch로 에러 처리
- 상태: data, isLoading, error 관리
- useEffect의 cleanup 함수 활용
