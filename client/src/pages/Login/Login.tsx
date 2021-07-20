import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import IconButton from '../../components/IconTextButton/IconTextButton';
import client from '../../lib/api/client';

const Login = () => {
  const history = useHistory();

  const auth = useCallback(
    (name: string) => () => {
      window.location.href = `http://localhost:3095/auth/${name}`;
    },
    [],
  );

  const onLogOut = useCallback(async () => {
    await axios.post('http://localhost:3095/auth/logout', null, {
      withCredentials: true,
    });
  }, []);

  // useEffect(() => {
  //   client.post('/auth/logout').then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button text="로그아웃" onClick={onLogOut} />
      <IconButton icon="google" onClick={auth('google')} />
      <IconButton
        icon="github"
        onClick={auth('github')}
        className="bg-github"
      />
      <IconButton icon="kakao" onClick={auth('kakao')} className="bg-kakao" />
    </div>
  );
};

export default Login;
