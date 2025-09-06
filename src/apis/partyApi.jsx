import api from '../hooks/api';

/**
 * 사용자의 모든 파티 목록을 조회하는 API
 */
export const getMyParties = async () => {
  const response = await api.get('/parties/my');
  return response.data; // 실제 데이터는 res.data.result에 있을 가능성이 높습니다.
};

/**
 * 특정 파티의 상세 정보를 조회하는 API (참고용)
 * @param {number} partyId
 */
export const getPartyDetails = async (partyId) => {
  const response = await api.get(`/parties/${partyId}`);
  return response.data;
};
