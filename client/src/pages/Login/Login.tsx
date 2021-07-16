import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import IconTextButton from '../../components/IconTextButton/IconTextButton';

const Login = () => {
  const history = useHistory();
  const auth = useCallback(
    (name: string) => () => {
      window.location.href = `http://localhost:3095/auth/${name}`;
    },
    []
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <button className="bg-cyan-500 text-gray-100 rounded-md py-2 px-4 font-medium w-32 h-8 inline-flex items-center justify-center">
        로그인
      </button>
      <IconTextButton icon="google" onClick={auth('google')} />
      <IconTextButton icon="github" onClick={auth('github')} className="bg-github" />
      <IconTextButton icon="kakao" onClick={auth('kakao')} className="bg-kakao" />
    </div>
  );
};

export default Login;
