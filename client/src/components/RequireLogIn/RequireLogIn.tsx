import React, { VFC } from 'react';
import { undrawLogin } from '../../assets/images';

const RequireLogIn: VFC = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-40 md:mt-16">
      <img src={undrawLogin} alt="" className="w-[36rem] md:w-96" />
      <p className="text-gray-600 text-2xl md:text-xl">
        로그인 후 이용해주세요.
      </p>
      {/* <button className="btn-cyan">로그인</button> */}
    </div>
  );
};

export default RequireLogIn;
