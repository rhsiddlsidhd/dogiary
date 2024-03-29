import React, { useCallback, useState } from 'react';
import { LogoBar, NavBar } from '../components/common/Header';
import { LongColoredBtn, SmallBtn } from '../components/common/Buttons';
import { ContainerBox, InputBox } from '../components/common/Boxes'; // Removed StyledContainerBox
import styled from 'styled-components';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function JoinPage() {
  const [nickname, setNickname] = useState('');
  const [user_Id, setUser_Id] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [CheckPassword, setCheckPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [confirmPwdMsg, setConfirmPwdMsg] = useState('');
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState('');
  const [UserIdCheckMsg, setUserIdCheckMsg] = useState('');
  const [EmailCheckMsg, setEmailCheckMsg] = useState('');
  const [NumberCheckMsg, setNumberCheckMsg] = useState('');
  const [StayNumber, setStayNumber] = useState('');
  const navigate = useNavigate();

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleClickNickname = async () => {
    try {
      const response = await api.post('auth/check-nickname', {
        nickName: nickname,
      });

      if (response.data.check === false) {
        setNicknameCheckMsg('중복된 닉네임입니다.');
      } else {
        setNicknameCheckMsg('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.log(error.statusCode);
      console.error('API 호출 중 에러 발생:', error);
    }
  };

  const handleChangeUserId = (e) => {
    setUser_Id(e.target.value);
  };

  const handleClickUserId = async () => {
    try {
      const response = await api.post('auth/check-id', {
        userId: user_Id,
      });

      if (!response.data.check) {
        setUserIdCheckMsg('사용 가능한 아이디 입니다.');
      } else {
        setUserIdCheckMsg('중복된 아이디입니다.');
      }
    } catch (error) {
      console.error('API 호출 중 에러 발생:', error);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleClickEmail = async () => {
    try {
      const response = await api.post('auth/check-email', {
        email: email,
      });
      if (response.status === 200) {
        if (response.data === null) {
          setEmailCheckMsg('중복된 이메일입니다.');
        } else {
          setEmailCheckMsg('해당 이메일로 인증번호를 보냈습니다.');
          setStayNumber(response.data.data.authNumber);
        }
      }
    } catch (error) {
      console.error('API 호출 중 에러 발생:', error);
    }
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleClickNumber = () => {
    if (Number(number) === Number(StayNumber)) {
      setNumberCheckMsg('인증번호가 확인되었습니다.');
    } else {
      setNumberCheckMsg('인증번호가 틀렸습니다.');
    }
  };

  const PasswordValid = (Password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;
    const isValid = passwordRegex.test(Password);
    return isValid;
  };

  const handleChangePassword = useCallback((e) => {
    const currPassword = e.target.value;
    setPassword(currPassword);

    if (currPassword !== '') {
      if (!PasswordValid(currPassword)) {
        setPwdMsg('영문, 숫자가 포함된 6자리 이상');
      } else {
        setPwdMsg('안전한 비밀번호입니다.');
      }
    } else {
      setPwdMsg('');
    }
  }, []);

  const handleChangeCheckPassword = useCallback(
    (e) => {
      const CheckPassword = e.target.value;
      setCheckPassword(CheckPassword);

      if (CheckPassword !== '') {
        if (CheckPassword !== password) {
          setConfirmPwdMsg('비밀번호가 일치하지 않습니다.');
        } else {
          setConfirmPwdMsg('비밀번호가 일치합니다.');
        }
      } else {
        setConfirmPwdMsg(''); // 입력이 비어 있을 때 오류 메시지를 지웁니다.
      }
    },
    [password],
  );

  const handleJoin = async () => {
    // 필수 입력 값 확인
    if (
      !nickname ||
      !user_Id ||
      !email ||
      !Number ||
      !password ||
      !CheckPassword
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // 중복 체크 여부 확인
    if (nicknameCheckMsg !== '사용 가능한 닉네임입니다.') {
      alert('닉네임이 유효하지 않습니다.');
      return;
    }

    if (UserIdCheckMsg !== '사용 가능한 아이디 입니다.') {
      alert('아이디가 유효하지 않습니다.');
      return;
    }

    if (EmailCheckMsg !== '해당 이메일로 인증번호를 보냈습니다.') {
      alert('이메일 또는 이메일 인증이 유효하지 않습니다.');
      return;
    }

    if (NumberCheckMsg !== '인증번호가 확인되었습니다.') {
      alert('인증번호가 유효하지 않습니다.');
      return;
    }

    // 비밀번호 일치 여부 확인
    if (
      pwdMsg !== '안전한 비밀번호입니다.' ||
      confirmPwdMsg !== '비밀번호가 일치합니다.'
    ) {
      alert('비밀번호 또는 비밀번호 확인이 유효하지 않습니다.');
      return;
    }

    // 회원가입 요청
    try {
      await api.post('auth/sign-up', {
        email,
        userId: user_Id,
        nickName: nickname,
        password,
      });
      alert('회원가입 성공');
      navigate('/loginPage');
    } catch (error) {
      console.error('회원가입에 실패했습니다.', error);
    }
  };

  return (
    <div>
      <LogoBar />
      <NavBar />
      <Main>
        <JoinContents className="contents-box">
          <div className="text-box">
            <h3 className="title">회원가입</h3>
            <span>가입을 통해서 다양한 서비스를 이용해보세요!</span>
          </div>
          <div>
            <div className="small-box-content">
              <InputBox>
                <input
                  className="form-input-small"
                  value={nickname}
                  type="text"
                  name="nickname"
                  id="nickname"
                  placeholder="닉네임 입력"
                  onChange={handleChangeNickname}
                />
              </InputBox>
              <SmallBtn
                onClick={(e) => {
                  handleClickNickname();
                }}
              >
                중복확인
              </SmallBtn>
            </div>
            <div className="message">{nicknameCheckMsg}</div>
            <div className="small-box-content">
              <InputBox>
                <input
                  className="form-input-small"
                  value={user_Id}
                  type="text"
                  name="user_Id"
                  id="user_Id"
                  placeholder="아이디 입력"
                  onChange={handleChangeUserId}
                />
              </InputBox>

              <SmallBtn
                onClick={(e) => {
                  handleClickUserId();
                }}
              >
                중복확인
              </SmallBtn>
            </div>
            <div className="message">{UserIdCheckMsg}</div>
            <div className="small-box-content">
              <InputBox>
                <input
                  className="form-input-small"
                  value={email}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="이메일 입력"
                  onChange={handleChangeEmail}
                />
              </InputBox>
              <SmallBtn
                onClick={(e) => {
                  handleClickEmail(e);
                }}
              >
                인증번호
              </SmallBtn>
            </div>
            <div className="message">{EmailCheckMsg}</div>
            <div className="small-box-content">
              <InputBox>
                <input
                  className="form-input-small"
                  value={number}
                  type="text"
                  name="Number"
                  id="Number"
                  placeholder="인증번호 입력"
                  onChange={handleChangeNumber}
                />
              </InputBox>
              <SmallBtn
                onClick={(e) => {
                  handleClickNumber(e);
                }}
              >
                인증
              </SmallBtn>
            </div>
            <div className="message">{NumberCheckMsg}</div>
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
            <div className="message">{pwdMsg}</div>
            <InputBox>
              <input
                className="form-input"
                value={CheckPassword}
                type="password"
                name="CheckPassword"
                id="CheckPassword"
                placeholder="비밀번호 재입력"
                onChange={handleChangeCheckPassword}
              />
            </InputBox>
            <div className="message">{confirmPwdMsg}</div>
          </div>
          <LongColoredBtn
            onClick={(e) => {
              handleJoin();
            }}
            className="long-btn"
          >
            가입하기
          </LongColoredBtn>
        </JoinContents>
      </Main>
    </div>
  );
}

const JoinContents = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //margin:35px;

  .title {
    margin: 0;
  }
  .text-box {
    margin-left: 35px;
    margin-right: 35px;
    margin-bottom: 30px;
    text-align: center;
  }

  .form-input {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .form-input-small {
    width: 200px;
  }

  .small-box-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .btn-box {
    margin-top: 10px;
    cursor: pointer;
  }

  .message {
    font-size: 12px;
    color: blue;
  }
`;

const Main = styled.div`
  display: flex;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

export default JoinPage;
