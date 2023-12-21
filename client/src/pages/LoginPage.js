import React, { useState } from 'react';
import { LogoBar, NavBar } from '../components/common/Header';
import { LongColoredBtn, LongStrokedBtn } from '../components/common/Buttons';
import { ContainerBox, InputBox } from '../components/common/Boxes'; // Removed StyledContainerBox
import styled from 'styled-components';

function LoginPage() {
  const [user_Id, setUser_Id] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUserId = (e) => {
    setUser_Id(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="main">
      <LogoBar />
      <NavBar />
      <BigBox className="bigbox">
        <ContainerBox>
          <LoginContainer className="container-box">
            <div className="text-box">
              <h3>로그인</h3>
              <a>로그인을 해서 Dogiary의 서비스를 사용해보세요!</a>
            </div>
            <div className="loginBox">
              <InputBox>
                <input
                  className="form-input"
                  value={user_Id}
                  type="text"
                  name="user_Id"
                  id="user_Id"
                  placeholder="아이디 입력"
                  onChange={handleChangeUserId}
                />
              </InputBox>

              <InputBox>
                <input
                  className="form-input"
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="비밀번호 입력"
                  onChange={handleChangePassword}
                />
              </InputBox>
            </div>
            <div className="btn-box">
              <LongColoredBtn text={'로그인하기'} className="long-btn" />
              <LongStrokedBtn text={'회원가입'} className="long-btn" />
            </div>
          </LoginContainer>
        </ContainerBox>
      </BigBox>
    </div>
  );
}

const LoginContainer = styled.div`
  .text-box {
    margin-left: 35px;
    margin-right: 35px;
    margin-bottom: 40px;
    text-align: center;
  }

  .form-input {
    margin-top: 5px;
    margin-bottom: 20px;
  }

  .btn-box {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: 90px;
    justify-content: space-between;
  }

  display: flex;
  flex-direction: column;
  margin-top: 80px;
  align-items: center;
`;

const BigBox = styled.div`
  display: flex;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

export default LoginPage;
