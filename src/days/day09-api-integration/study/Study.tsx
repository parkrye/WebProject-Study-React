import { useState, useEffect, useCallback, useRef } from "react";

// ============================================
// 타입 정의
// ============================================
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiError {
  message: string;
  status?: number;
}

// ============================================
// 스타일 정의
// ============================================
const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    borderBottom: "3px solid #1976d2",
    paddingBottom: "10px",
    color: "#1976d2",
  },
  definitionBox: {
    backgroundColor: "#e3f2fd",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    borderLeft: "4px solid #1976d2",
  },
  warningBox: {
    backgroundColor: "#ffebee",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    borderLeft: "4px solid #f44336",
  },
  exampleBox: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #ddd",
  },
  codeBlock: {
    backgroundColor: "#263238",
    color: "#aed581",
    padding: "15px",
    borderRadius: "6px",
    overflow: "auto" as const,
    fontSize: "14px",
    fontFamily: "Consolas, Monaco, 'Courier New', monospace",
  },
  demoBox: {
    backgroundColor: "#fff3e0",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "2px solid #ff9800",
  },
  button: {
    padding: "8px 16px",
    margin: "4px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  primaryButton: {
    backgroundColor: "#1976d2",
    color: "white",
  },
  dangerButton: {
    backgroundColor: "#f44336",
    color: "white",
  },
  successButton: {
    backgroundColor: "#4caf50",
    color: "white",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "12px",
    textAlign: "left" as const,
    border: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
  },
  section: {
    marginBottom: "40px",
  },
  comparisonContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  wrongExample: {
    backgroundColor: "#ffebee",
    padding: "15px",
    borderRadius: "8px",
    border: "2px solid #f44336",
  },
  correctExample: {
    backgroundColor: "#e8f5e9",
    padding: "15px",
    borderRadius: "8px",
    border: "2px solid #4caf50",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    color: "#1976d2",
  },
  errorMessage: {
    color: "#f44336",
    padding: "10px",
    backgroundColor: "#ffebee",
    borderRadius: "4px",
    marginTop: "10px",
  },
};

// ============================================
// 서비스 레이어 예제
// ============================================
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// 기본 fetch 래퍼 함수
async function fetchWithError<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw {
      message: `HTTP error! status: ${response.status}`,
      status: response.status,
    } as ApiError;
  }

  return response.json();
}

// Posts 서비스
const postService = {
  getAll: () => fetchWithError<Post[]>(`${API_BASE_URL}/posts?_limit=5`),
  getById: (id: number) => fetchWithError<Post>(`${API_BASE_URL}/posts/${id}`),
  create: (data: Omit<Post, "id">) =>
    fetchWithError<Post>(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Post>) =>
    fetchWithError<Post>(`${API_BASE_URL}/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchWithError<{}>(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
    }),
};

// ============================================
// 데모 컴포넌트들
// ============================================

// 1. 기본 Fetch 데모
function BasicFetchDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=3"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h4>기본 Fetch 데모</h4>
      <button
        style={{ ...styles.button, ...styles.primaryButton }}
        onClick={fetchPosts}
        disabled={isLoading}
      >
        {isLoading ? "로딩 중..." : "게시글 불러오기"}
      </button>

      {error && <div style={styles.errorMessage}>{error}</div>}

      {posts.map((post) => (
        <div key={post.id} style={styles.card}>
          <h5 style={{ margin: "0 0 8px 0" }}>{post.title}</h5>
          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
            {post.body.substring(0, 100)}...
          </p>
        </div>
      ))}
    </div>
  );
}

// 2. 서비스 레이어 데모
function ServiceLayerDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await postService.getAll();
      setPosts(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <h4>서비스 레이어 사용 데모</h4>
      <p style={{ color: "#666", fontSize: "14px" }}>
        컴포넌트 마운트 시 자동으로 데이터를 불러옵니다.
      </p>

      <button
        style={{ ...styles.button, ...styles.primaryButton }}
        onClick={loadPosts}
        disabled={isLoading}
      >
        새로고침
      </button>

      {isLoading && <div style={styles.loader}>로딩 중...</div>}
      {error && <div style={styles.errorMessage}>{error}</div>}

      {!isLoading && posts.map((post) => (
        <div key={post.id} style={styles.card}>
          <h5 style={{ margin: "0 0 8px 0" }}>#{post.id} {post.title}</h5>
        </div>
      ))}
    </div>
  );
}

// 3. Optimistic Update 데모
function OptimisticUpdateDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: "React 공부하기", completed: false },
    { id: 2, text: "TypeScript 학습", completed: true },
    { id: 3, text: "API 연동 실습", completed: false },
  ]);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const toggleTodo = async (id: number) => {
    // 1. 이전 상태 백업
    const previousTodos = [...todos];

    // 2. 낙관적 업데이트 (즉시 UI 반영)
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    setIsUpdating(id);

    try {
      // 3. 서버 요청 시뮬레이션 (1초 딜레이)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 랜덤하게 실패 시뮬레이션 (20% 확률)
          if (Math.random() < 0.2) {
            reject(new Error("서버 오류 발생!"));
          }
          resolve(true);
        }, 1000);
      });
      // 성공 시 아무것도 하지 않음 (이미 UI가 업데이트됨)
    } catch {
      // 4. 실패 시 롤백
      setTodos(previousTodos);
      alert("업데이트 실패! 변경사항이 롤백되었습니다.");
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div>
      <h4>Optimistic Update 데모</h4>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
        클릭하면 즉시 UI가 변경되고, 서버 요청이 실패하면 롤백됩니다.
        (20% 확률로 실패)
      </p>

      {todos.map((todo) => (
        <div
          key={todo.id}
          onClick={() => !isUpdating && toggleTodo(todo.id)}
          style={{
            ...styles.card,
            cursor: isUpdating ? "wait" : "pointer",
            opacity: isUpdating === todo.id ? 0.7 : 1,
            backgroundColor: todo.completed ? "#e8f5e9" : "white",
            transition: "all 0.3s ease",
          }}
        >
          <span style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#888" : "#333",
          }}>
            {isUpdating === todo.id ? "처리 중... " : ""}
            {todo.completed ? "[완료]" : "[미완료]"} {todo.text}
          </span>
        </div>
      ))}
    </div>
  );
}

// 4. 에러 핸들링 데모
function ErrorHandlingDemo() {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchSuccess = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      if (!response.ok) throw { message: `HTTP ${response.status}`, status: response.status };
      const user = await response.json();
      setData(user);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotFound = async () => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/999999"
      );
      if (!response.ok) throw { message: "사용자를 찾을 수 없습니다", status: response.status };
      const user = await response.json();
      setData(user);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNetworkError = async () => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      await fetch("https://invalid-url-that-does-not-exist.com/api");
    } catch {
      setError({ message: "네트워크 오류: 서버에 연결할 수 없습니다" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h4>에러 핸들링 데모</h4>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "15px" }}>
        <button
          style={{ ...styles.button, ...styles.successButton }}
          onClick={fetchSuccess}
          disabled={isLoading}
        >
          성공 요청
        </button>
        <button
          style={{ ...styles.button, ...styles.primaryButton }}
          onClick={fetchNotFound}
          disabled={isLoading}
        >
          404 에러
        </button>
        <button
          style={{ ...styles.button, ...styles.dangerButton }}
          onClick={fetchNetworkError}
          disabled={isLoading}
        >
          네트워크 에러
        </button>
      </div>

      {isLoading && <div style={styles.loader}>로딩 중...</div>}

      {error && (
        <div style={styles.errorMessage}>
          <strong>에러 발생!</strong>
          <p style={{ margin: "8px 0 0 0" }}>{error.message}</p>
          {error.status && <p style={{ margin: "4px 0 0 0" }}>상태 코드: {error.status}</p>}
        </div>
      )}

      {data && (
        <div style={styles.card}>
          <h5 style={{ margin: "0 0 8px 0" }}>{data.name}</h5>
          <p style={{ margin: 0, color: "#666" }}>{data.email}</p>
        </div>
      )}
    </div>
  );
}

// 5. 무한 스크롤 데모
function InfiniteScrollDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
      );
      const newPosts = await response.json();

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
      }
    } catch {
      console.error("로딩 실패");
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  const reset = () => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div>
      <h4>무한 스크롤 데모</h4>
      <button
        style={{ ...styles.button, ...styles.dangerButton, marginBottom: "10px" }}
        onClick={reset}
      >
        리셋
      </button>

      <div style={{ maxHeight: "300px", overflow: "auto", border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
        {posts.map((post, index) => (
          <div key={`${post.id}-${index}`} style={{ ...styles.card, marginBottom: "8px" }}>
            <strong>#{post.id}</strong> {post.title.substring(0, 40)}...
          </div>
        ))}

        <div ref={observerRef} style={{ padding: "10px", textAlign: "center" }}>
          {isLoading && "로딩 중..."}
          {!hasMore && "모든 데이터를 불러왔습니다"}
          {hasMore && !isLoading && "스크롤하여 더 불러오기"}
        </div>
      </div>

      <p style={{ color: "#666", fontSize: "12px", marginTop: "10px" }}>
        현재 {posts.length}개 로드됨 | 페이지: {page - 1}
      </p>
    </div>
  );
}

// 6. CRUD 데모
function CrudDemo() {
  const [items, setItems] = useState([
    { id: 1, title: "첫 번째 항목" },
    { id: 2, title: "두 번째 항목" },
    { id: 3, title: "세 번째 항목" },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 시뮬레이션된 API 딜레이
  const simulateApiCall = () => new Promise((res) => setTimeout(res, 500));

  // Create
  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setIsLoading(true);
    await simulateApiCall();

    const newItem = {
      id: Date.now(),
      title: newTitle,
    };
    setItems([...items, newItem]);
    setNewTitle("");
    setIsLoading(false);
  };

  // Update
  const handleUpdate = async (id: number) => {
    if (!editTitle.trim()) return;
    setIsLoading(true);
    await simulateApiCall();

    setItems(items.map(item =>
      item.id === id ? { ...item, title: editTitle } : item
    ));
    setEditingId(null);
    setEditTitle("");
    setIsLoading(false);
  };

  // Delete
  const handleDelete = async (id: number) => {
    setIsLoading(true);
    await simulateApiCall();

    setItems(items.filter(item => item.id !== id));
    setIsLoading(false);
  };

  const startEdit = (id: number, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  return (
    <div>
      <h4>CRUD 작업 데모</h4>

      {/* Create */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="새 항목 추가..."
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
        />
        <button
          style={{ ...styles.button, ...styles.successButton }}
          onClick={handleCreate}
          disabled={isLoading}
        >
          추가
        </button>
      </div>

      {/* Read, Update, Delete */}
      {items.map((item) => (
        <div key={item.id} style={{ ...styles.card, display: "flex", alignItems: "center", gap: "8px" }}>
          {editingId === item.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ flex: 1, padding: "6px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <button
                style={{ ...styles.button, ...styles.primaryButton, padding: "4px 8px" }}
                onClick={() => handleUpdate(item.id)}
                disabled={isLoading}
              >
                저장
              </button>
              <button
                style={{ ...styles.button, padding: "4px 8px", backgroundColor: "#9e9e9e", color: "white" }}
                onClick={() => setEditingId(null)}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <span style={{ flex: 1 }}>{item.title}</span>
              <button
                style={{ ...styles.button, ...styles.primaryButton, padding: "4px 8px" }}
                onClick={() => startEdit(item.id, item.title)}
                disabled={isLoading}
              >
                수정
              </button>
              <button
                style={{ ...styles.button, ...styles.dangerButton, padding: "4px 8px" }}
                onClick={() => handleDelete(item.id)}
                disabled={isLoading}
              >
                삭제
              </button>
            </>
          )}
        </div>
      ))}

      {isLoading && <div style={styles.loader}>처리 중...</div>}
    </div>
  );
}

// ============================================
// 메인 컴포넌트
// ============================================
export default function Study() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Day 9: API 연동</h1>

      {/* 섹션 1: fetch API란? */}
      <section style={styles.section}>
        <h2>1. fetch API란?</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>fetch API</strong>는 브라우저에 내장된 HTTP 요청을 수행하기 위한 인터페이스입니다.
            Promise 기반으로 동작하며, 네트워크 요청을 비동기적으로 처리할 수 있습니다.
          </p>
          <ul>
            <li><strong>Promise 기반:</strong> async/await와 자연스럽게 연동</li>
            <li><strong>내장 API:</strong> 별도 라이브러리 설치 불필요</li>
            <li><strong>스트림 지원:</strong> 대용량 데이터 처리 가능</li>
            <li><strong>유연한 설정:</strong> 헤더, 메서드, 바디 등 세밀한 제어</li>
          </ul>
        </div>

        <div style={styles.exampleBox}>
          <h3>왜 API 연동이 필요한가?</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>시나리오</th>
                <th style={styles.th}>설명</th>
                <th style={styles.th}>예시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>데이터 조회</td>
                <td style={styles.td}>서버에서 데이터 가져오기</td>
                <td style={styles.td}>게시글 목록, 사용자 정보</td>
              </tr>
              <tr>
                <td style={styles.td}>데이터 생성</td>
                <td style={styles.td}>새로운 데이터 저장</td>
                <td style={styles.td}>회원가입, 글 작성</td>
              </tr>
              <tr>
                <td style={styles.td}>데이터 수정</td>
                <td style={styles.td}>기존 데이터 업데이트</td>
                <td style={styles.td}>프로필 수정, 글 편집</td>
              </tr>
              <tr>
                <td style={styles.td}>데이터 삭제</td>
                <td style={styles.td}>데이터 제거</td>
                <td style={styles.td}>계정 삭제, 글 삭제</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 2: fetch 기본 사용법 */}
      <section style={styles.section}>
        <h2>2. fetch 기본 사용법</h2>

        <div style={styles.exampleBox}>
          <h3>기본 GET 요청</h3>
          <pre style={styles.codeBlock}>
{`// 기본 형태
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
        throw new Error(\`HTTP error! status: \${response.status}\`);
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
}`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <BasicFetchDemo />
        </div>
      </section>

      {/* 섹션 3: HTTP 메서드 */}
      <section style={styles.section}>
        <h2>3. HTTP 메서드와 CRUD</h2>

        <div style={styles.definitionBox}>
          <h3>HTTP 메서드와 CRUD 매핑</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>작업</th>
                <th style={styles.th}>HTTP 메서드</th>
                <th style={styles.th}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Create (생성)</td>
                <td style={styles.td}><code>POST</code></td>
                <td style={styles.td}>새로운 리소스 생성</td>
              </tr>
              <tr>
                <td style={styles.td}>Read (조회)</td>
                <td style={styles.td}><code>GET</code></td>
                <td style={styles.td}>리소스 조회</td>
              </tr>
              <tr>
                <td style={styles.td}>Update (수정)</td>
                <td style={styles.td}><code>PUT</code> / <code>PATCH</code></td>
                <td style={styles.td}>전체 수정 / 부분 수정</td>
              </tr>
              <tr>
                <td style={styles.td}>Delete (삭제)</td>
                <td style={styles.td}><code>DELETE</code></td>
                <td style={styles.td}>리소스 삭제</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.exampleBox}>
          <h3>각 메서드 사용 예시</h3>
          <pre style={styles.codeBlock}>
{`// GET - 데이터 조회
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
});`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모: CRUD 작업</h3>
          <CrudDemo />
        </div>
      </section>

      {/* 섹션 4: 서비스 레이어 패턴 */}
      <section style={styles.section}>
        <h2>4. 서비스 레이어 패턴</h2>

        <div style={styles.definitionBox}>
          <h3>서비스 레이어란?</h3>
          <p>
            <strong>서비스 레이어</strong>는 API 호출 로직을 컴포넌트에서 분리하여
            별도의 모듈로 관리하는 패턴입니다.
          </p>
          <ul>
            <li><strong>관심사 분리:</strong> 컴포넌트는 UI만, 서비스는 데이터만</li>
            <li><strong>재사용성:</strong> 여러 컴포넌트에서 같은 API 호출 재사용</li>
            <li><strong>테스트 용이:</strong> API 로직만 별도로 테스트 가능</li>
            <li><strong>유지보수:</strong> API 변경 시 한 곳만 수정</li>
          </ul>
        </div>

        <div style={{ ...styles.comparisonContainer, marginTop: "20px" }}>
          <div style={styles.wrongExample}>
            <h4 style={{ color: "#f44336" }}>잘못된 예시</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#5d1a1a" }}>
{`// 컴포넌트에 API 로직이 섞여 있음
function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch(
      'https://api.example.com/posts'
    );
    const data = await res.json();
    setPosts(data);
  };

  // URL, 헤더 등이 컴포넌트에 직접 작성됨
  // 다른 컴포넌트에서 같은 API 사용 시
  // 중복 코드 발생!
}`}
            </pre>
          </div>
          <div style={styles.correctExample}>
            <h4 style={{ color: "#4caf50" }}>올바른 예시</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#1a3d1a" }}>
{`// services/postService.ts
const BASE_URL = 'https://api.example.com';

export const postService = {
  getAll: () => fetch(\`\${BASE_URL}/posts\`),
  getById: (id) => fetch(\`\${BASE_URL}/posts/\${id}\`),
  create: (data) => fetch(\`\${BASE_URL}/posts\`, {
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
}`}
            </pre>
          </div>
        </div>

        <div style={styles.exampleBox}>
          <h3>완전한 서비스 레이어 구현</h3>
          <pre style={styles.codeBlock}>
{`// services/api.ts - 기본 fetch 래퍼
const API_BASE_URL = 'https://api.example.com';

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
      message: error.message || \`HTTP \${response.status}\`,
      status: response.status,
    };
  }

  return response.json();
}

// services/postService.ts
export const postService = {
  getAll: () =>
    fetchWithError<Post[]>(\`\${API_BASE_URL}/posts\`),

  getById: (id: number) =>
    fetchWithError<Post>(\`\${API_BASE_URL}/posts/\${id}\`),

  create: (data: CreatePostDTO) =>
    fetchWithError<Post>(\`\${API_BASE_URL}/posts\`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: UpdatePostDTO) =>
    fetchWithError<Post>(\`\${API_BASE_URL}/posts/\${id}\`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchWithError<void>(\`\${API_BASE_URL}/posts/\${id}\`, {
      method: 'DELETE',
    }),
};`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모: 서비스 레이어 사용</h3>
          <ServiceLayerDemo />
        </div>
      </section>

      {/* 섹션 5: 에러 핸들링 */}
      <section style={styles.section}>
        <h2>5. 에러 핸들링</h2>

        <div style={styles.warningBox}>
          <h3>주의: fetch는 네트워크 오류만 reject</h3>
          <p>
            <code>fetch</code>는 <strong>네트워크 오류</strong>가 발생했을 때만 Promise를 reject합니다.
            HTTP 에러 상태(404, 500 등)는 reject되지 않으므로 <code>response.ok</code>를 확인해야 합니다!
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>에러 타입별 처리</h3>
          <pre style={styles.codeBlock}>
{`// 타입 정의
interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// 에러 처리 함수
async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    // HTTP 에러 처리
    if (!response.ok) {
      // 상태 코드별 처리
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
          throw { message: \`HTTP Error: \${response.status}\`, status: response.status };
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
}`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모: 에러 핸들링</h3>
          <ErrorHandlingDemo />
        </div>
      </section>

      {/* 섹션 6: Optimistic Update */}
      <section style={styles.section}>
        <h2>6. Optimistic Update (낙관적 업데이트)</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>Optimistic Update</strong>는 서버 응답을 기다리지 않고
            UI를 먼저 업데이트한 후, 서버 요청이 실패하면 롤백하는 패턴입니다.
          </p>
          <ul>
            <li><strong>장점:</strong> 빠른 사용자 경험, 반응성 향상</li>
            <li><strong>단점:</strong> 롤백 로직 필요, 복잡도 증가</li>
            <li><strong>적합한 경우:</strong> 성공 확률이 높은 간단한 작업</li>
          </ul>
        </div>

        <div style={styles.exampleBox}>
          <h3>Optimistic Update 구현 패턴</h3>
          <pre style={styles.codeBlock}>
{`function TodoList() {
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
      toast.error('업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };
}`}
          </pre>
        </div>

        <div style={{ ...styles.comparisonContainer, marginTop: "20px" }}>
          <div style={styles.wrongExample}>
            <h4 style={{ color: "#f44336" }}>일반적인 방식</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#5d1a1a" }}>
{`// 서버 응답 후 UI 업데이트
const toggleTodo = async (id) => {
  setLoading(true);

  // 서버 응답까지 기다림 (느림)
  await todoService.toggle(id);

  // 응답 후에야 UI 업데이트
  setTodos(todos.map(...));
  setLoading(false);
};

// 사용자 경험: "클릭 -> 로딩 -> 변경"`}
            </pre>
          </div>
          <div style={styles.correctExample}>
            <h4 style={{ color: "#4caf50" }}>Optimistic Update</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#1a3d1a" }}>
{`// 먼저 UI 업데이트, 나중에 서버 요청
const toggleTodo = async (id) => {
  const backup = [...todos];

  // 즉시 UI 업데이트 (빠름!)
  setTodos(todos.map(...));

  try {
    await todoService.toggle(id);
  } catch {
    setTodos(backup);  // 실패 시 롤백
  }
};

// 사용자 경험: "클릭 -> 즉시 변경"`}
            </pre>
          </div>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모: Optimistic Update</h3>
          <OptimisticUpdateDemo />
        </div>
      </section>

      {/* 섹션 7: 무한 스크롤 */}
      <section style={styles.section}>
        <h2>7. 무한 스크롤 & 페이지네이션</h2>

        <div style={styles.definitionBox}>
          <h3>무한 스크롤이란?</h3>
          <p>
            <strong>무한 스크롤</strong>은 사용자가 페이지 끝에 도달하면
            자동으로 다음 데이터를 불러오는 패턴입니다.
            <code>Intersection Observer API</code>를 사용하여 구현합니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>Intersection Observer를 사용한 무한 스크롤</h3>
          <pre style={styles.codeBlock}>
{`function InfiniteScrollList() {
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
}`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모: 무한 스크롤</h3>
          <InfiniteScrollDemo />
        </div>
      </section>

      {/* 섹션 8: useEffect와 데이터 페칭 */}
      <section style={styles.section}>
        <h2>8. useEffect와 데이터 페칭</h2>

        <div style={styles.warningBox}>
          <h3>주의: useEffect에서의 비동기 처리</h3>
          <p>
            <code>useEffect</code>의 콜백 함수는 직접 async가 될 수 없습니다.
            내부에 async 함수를 정의하고 호출하거나, IIFE를 사용하세요.
          </p>
        </div>

        <div style={{ ...styles.comparisonContainer, marginTop: "20px" }}>
          <div style={styles.wrongExample}>
            <h4 style={{ color: "#f44336" }}>잘못된 예시</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#5d1a1a" }}>
{`// useEffect는 cleanup 함수를 반환해야 함
// async 함수는 Promise를 반환하므로 오류!
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);`}
            </pre>
          </div>
          <div style={styles.correctExample}>
            <h4 style={{ color: "#4caf50" }}>올바른 예시</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#1a3d1a" }}>
{`// 방법 1: 내부 함수 정의
useEffect(() => {
  const loadData = async () => {
    const data = await fetchData();
    setData(data);
  };
  loadData();
}, []);

// 방법 2: IIFE
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);`}
            </pre>
          </div>
        </div>

        <div style={styles.exampleBox}>
          <h3>Cleanup과 Race Condition 방지</h3>
          <pre style={styles.codeBlock}>
{`function SearchResults({ query }) {
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
}, [url]);`}
          </pre>
        </div>
      </section>

      {/* 핵심 정리 */}
      <section style={styles.section}>
        <h2>핵심 정리</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>개념</th>
              <th style={styles.th}>설명</th>
              <th style={styles.th}>핵심 포인트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><code>fetch</code></td>
              <td style={styles.td}>HTTP 요청 API</td>
              <td style={styles.td}>response.ok 확인 필수</td>
            </tr>
            <tr>
              <td style={styles.td}>CRUD</td>
              <td style={styles.td}>생성/조회/수정/삭제</td>
              <td style={styles.td}>POST/GET/PUT,PATCH/DELETE</td>
            </tr>
            <tr>
              <td style={styles.td}>서비스 레이어</td>
              <td style={styles.td}>API 로직 분리</td>
              <td style={styles.td}>재사용성, 유지보수 향상</td>
            </tr>
            <tr>
              <td style={styles.td}>에러 핸들링</td>
              <td style={styles.td}>HTTP/네트워크 에러 처리</td>
              <td style={styles.td}>상태코드별 처리, 사용자 알림</td>
            </tr>
            <tr>
              <td style={styles.td}>Optimistic Update</td>
              <td style={styles.td}>즉시 UI 업데이트</td>
              <td style={styles.td}>백업 후 업데이트, 실패 시 롤백</td>
            </tr>
            <tr>
              <td style={styles.td}>무한 스크롤</td>
              <td style={styles.td}>자동 페이지 로드</td>
              <td style={styles.td}>Intersection Observer 활용</td>
            </tr>
            <tr>
              <td style={styles.td}>useEffect 패턴</td>
              <td style={styles.td}>데이터 페칭</td>
              <td style={styles.td}>cleanup으로 race condition 방지</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 다음 단계 */}
      <section style={styles.section}>
        <div style={{ ...styles.definitionBox, backgroundColor: "#e8f5e9" }}>
          <h3>다음 단계: Day 10 - 컴포넌트 패턴 & 최종 프로젝트</h3>
          <p>
            Day 8, 9에서 배운 상태관리와 API 연동을 활용하여,
            Day 10에서는 고급 컴포넌트 패턴과 최종 프로젝트를 진행합니다.
          </p>
          <ul>
            <li>컴포넌트 설계 패턴</li>
            <li>합성 패턴 (Composition)</li>
            <li>재사용 가능한 컴포넌트</li>
            <li>폼 핸들링 & 유효성 검사</li>
            <li>최종 프로젝트: 미니 피드 앱</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
