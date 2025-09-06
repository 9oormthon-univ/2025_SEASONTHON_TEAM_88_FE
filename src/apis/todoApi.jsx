import api from '../hooks/api';

/**
 * 새로운 할 일(Todo)을 생성하는 API 함수
 * @param {{partyId: number, task: string}} data - 생성할 Todo 데이터
 * @returns {Promise<any>} API 응답 객체
 */
export const createTodo = async (data) => {
  try {
    const response = await api.post('/todos', data);
    // Axios의 경우 실제 서버 응답은 response.data 에 담겨 있습니다.
    return response.data;
  } catch (error) {
    console.error('Todo 생성 API 호출 중 에러 발생:', error);
    // 에러를 상위로 전파하여 컴포넌트에서 처리할 수 있도록 합니다.
    throw error;
  }
};

/**
 * ✨ Todo의 완료 상태를 변경하는 API 함수
 * @param {number} todoId - 상태를 변경할 Todo의 ID
 * @param {boolean} isCompleted - 새로운 완료 상태
 * @returns {Promise<any>} API 응답 객체
 */
export const updateTodoStatus = async (todoId, isCompleted) => {
  try {
    // PATCH 요청의 body는 { isCompleted: boolean } 형태입니다.
    const response = await api.patch(`/todos/${todoId}`, { isCompleted });
    return response.data;
  } catch (error) {
    console.error(`Todo(id: ${todoId}) 상태 업데이트 API 호출 중 에러 발생:`, error);
    throw error;
  }
};
