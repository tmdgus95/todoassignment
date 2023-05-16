import apiRequest from './index';

const RESOURCE = '/todos';

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`);

    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export type RecomendListResponse = {
  data: {
    limit: number;
    page: number;
    q: string;
    qty: number;
    result: string[];
    total: number;
  };
  message: string;
  opcode: number;
};

export const getRecomendList = async (
  q: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await apiRequest.get(
      `/search?q=${q}&page=${page}&limit=${limit}`
    );

    return response;
  } catch (error) {
    throw new Error('API getRecomendList error');
  }
};

export const createTodo = async (data: { title: string }) => {
  try {
    const response = await apiRequest.post(`${RESOURCE}`, data);

    return response;
  } catch (error) {
    throw new Error('API createTodo error');
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`);

    return response;
  } catch (error) {
    throw new Error('API deleteTodo error');
  }
};
