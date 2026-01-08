/**
 * ========================================
 * Day 07: useState 심화
 * ========================================
 *
 * 📚 학습 목표:
 * 1. 객체 상태를 올바르게 업데이트할 수 있다
 * 2. 배열 상태를 올바르게 업데이트할 수 있다
 * 3. 불변성(Immutability)의 중요성을 이해한다
 */

import { useState } from "react";

// ----------------------------------------
// 1. 불변성(Immutability)이란?
// ----------------------------------------
/**
 * React에서 상태를 업데이트할 때는 반드시 "새로운" 값을 만들어야 합니다.
 *
 * ❌ 잘못된 예 (직접 수정):
 * user.name = 'Kim';    // 기존 객체를 직접 수정
 * setUser(user);        // React가 변경을 감지 못함!
 *
 * ✅ 올바른 예 (새 객체 생성):
 * setUser({ ...user, name: 'Kim' });  // 새 객체 생성
 *
 * 왜 불변성이 중요한가?
 * - React는 이전 값과 새 값을 비교해서 변경 여부를 판단
 * - 직접 수정하면 참조가 같아서 변경을 감지 못함
 */

// ----------------------------------------
// 2. 객체 상태 업데이트
// ----------------------------------------

interface UserProfile {
  name: string;
  email: string;
  age: number;
  address: {
    city: string;
    zipCode: string;
  };
}

function ObjectStateExample() {
  const [user, setUser] = useState<UserProfile>({
    name: "홍길동",
    email: "hong@example.com",
    age: 25,
    address: {
      city: "서울",
      zipCode: "12345",
    },
  });

  // 단일 필드 업데이트
  const updateName = (newName: string) => {
    setUser({ ...user, name: newName });
    // 또는 함수형 업데이트
    // setUser(prev => ({ ...prev, name: newName }));
  };

  // 중첩 객체 업데이트
  const updateCity = (newCity: string) => {
    setUser({
      ...user,
      address: {
        ...user.address,
        city: newCity,
      },
    });
  };

  return (
    <div>
      <h3>객체 상태 업데이트</h3>
      <div style={{ marginBottom: "15px" }}>
        <p>이름: {user.name}</p>
        <p>이메일: {user.email}</p>
        <p>나이: {user.age}</p>
        <p>도시: {user.address.city}</p>
      </div>
      <div>
        <input
          type="text"
          value={user.name}
          onChange={(e) => updateName(e.target.value)}
          placeholder="이름"
        />
        <input
          type="text"
          value={user.address.city}
          onChange={(e) => updateCity(e.target.value)}
          placeholder="도시"
          style={{ marginLeft: "10px" }}
        />
      </div>
    </div>
  );
}

// ----------------------------------------
// 3. 배열 상태 - 추가
// ----------------------------------------

function ArrayAddExample() {
  const [items, setItems] = useState<string[]>(["사과", "바나나"]);
  const [newItem, setNewItem] = useState("");

  // 배열 끝에 추가
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]); // 스프레드 연산자로 새 배열 생성
      setNewItem("");
    }
  };

  // 배열 앞에 추가
  const addItemToFront = () => {
    if (newItem.trim()) {
      setItems([newItem, ...items]);
      setNewItem("");
    }
  };

  return (
    <div>
      <h3>배열 - 추가</h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="새 항목"
        />
        <button onClick={addItem}>뒤에 추가</button>
        <button onClick={addItemToFront}>앞에 추가</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------
// 4. 배열 상태 - 삭제
// ----------------------------------------

function ArrayDeleteExample() {
  const [fruits, setFruits] = useState([
    { id: 1, name: "사과" },
    { id: 2, name: "바나나" },
    { id: 3, name: "오렌지" },
    { id: 4, name: "포도" },
  ]);

  // filter로 삭제 (해당 id를 제외한 새 배열)
  const deleteItem = (id: number) => {
    setFruits(fruits.filter((fruit) => fruit.id !== id));
  };

  return (
    <div>
      <h3>배열 - 삭제 (filter)</h3>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            {fruit.name}
            <button
              onClick={() => deleteItem(fruit.id)}
              style={{ marginLeft: "10px" }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------
// 5. 배열 상태 - 수정
// ----------------------------------------

function ArrayUpdateExample() {
  const [todos, setTodos] = useState([
    { id: 1, text: "React 공부", completed: false },
    { id: 2, text: "운동하기", completed: false },
    { id: 3, text: "책 읽기", completed: true },
  ]);

  // map으로 수정 (해당 id의 항목만 변경)
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 텍스트 수정
  const updateText = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div>
      <h3>배열 - 수정 (map)</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <input
              type="text"
              value={todo.text}
              onChange={(e) => updateText(todo.id, e.target.value)}
              style={{
                marginLeft: "10px",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------
// 6. 종합 예제: Todo 앱
// ----------------------------------------

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // 추가
  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now(), // 간단한 고유 ID
        text: input,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  // 토글
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 삭제
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 통계
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div>
      <h3>Todo 앱 (종합)</h3>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="할 일 입력"
          style={{ padding: "8px", width: "200px" }}
        />
        <button onClick={addTodo} style={{ marginLeft: "10px" }}>
          추가
        </button>
      </div>
      <p>
        완료: {completedCount} / {todos.length}
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: "8px",
              marginBottom: "5px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                marginLeft: "10px",
                flex: 1,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#888" : "inherit",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p style={{ color: "#888" }}>할 일을 추가해보세요!</p>
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
      <h1>Day 07: useState 심화</h1>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <ObjectStateExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <ArrayAddExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <ArrayDeleteExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <ArrayUpdateExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <TodoApp />
      </section>
    </div>
  );
}

export default Study;
