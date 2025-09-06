import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const Redirection = () => {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/members/auth/kakao`, {
        params: { code },
      })
      .then((r) => {
        const data = r.data;
        setAuth(data.result.accessToken, data.result.memberId);

        console.log('zustand 저장 완료');
        navigate('/home');
      })
      .catch((err) => {
        console.error('로그인 실패:', err);
      });
  }, [code, navigate, setAuth]);

  return <div>로그인 중입니다...</div>;
};

export default Redirection;
