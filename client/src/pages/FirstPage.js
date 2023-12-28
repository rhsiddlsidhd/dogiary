import React from 'react';
import { LogoBar, NavBar } from '../components/common/Header.js';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FootIcon from '../components/icons/FootIcon.js';
import puppyImg from '../puppy.png';
function FirstPage() {
  const navigate = useNavigate();
  const login = () => {
    navigate('/LoginPage');
  };
  const signIn = () => {
    navigate('/JoinPage');
  };
  return (
    <Wraper>
      <LogoBar />
      <NavBar />
      <MainUi>
        <TextDiv>
          <div className="aroundDiv">
            <h1
              style={{
                marginTop: '10%',
                fontFamily: 'Righteous',
                color: '#5f5013',
              }}
            >
              Dogiary
            </h1>
            <div style={{ textAlign: 'center', color: '#5f5013' }}>
              <h4>DOGIARY에 오신 것을 환영합니다!</h4>
              <h4>강아지와의 소중한 순간을 기록해보세요</h4>
            </div>
            <BtnDiv>
              <div className="btn1" onClick={login}>
                로그인
              </div>
              <div className="btn2" onClick={signIn}>
                회원가입
              </div>
            </BtnDiv>
            <FootDiv>
              <FootIcon />
            </FootDiv>
          </div>
        </TextDiv>
        <ImageDiv>
          <img
            src={puppyImg}
            alt="puppyImage"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </ImageDiv>
      </MainUi>
    </Wraper>
  );
}
const Wraper = styled.div`
  width: 100vw;
  height: 88vh;
  background: black;
`;
const MainUi = styled.div`
  width: 100%;
  height: 100%;
  background: #FFF8E6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  }
`;
const TextDiv = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  .aroundDiv {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    background: #ffeb99;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
    font-size: 1.1rem;
  }
`;
const FootDiv = styled.div`
  width: 55px;
  height: 55px;
  position: absolute;
  top: 6%;
  right: 6%;
  background: #5f5013;
  border-radius: 50%;
`;
const BtnDiv = styled.div`
  width: 80%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 15%;
  .btn1 {
    width: 35%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2em;
    border-color: #5f5013;
    border: 1px solid;
    color: #5f5013;
  }
  .btn2 {
    width: 35%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2em;
    background: #5f5013;
    color: white;
  }
`;
const ImageDiv = styled.div`
  width: 100%;
  height: 40%;
`;
export default FirstPage;
