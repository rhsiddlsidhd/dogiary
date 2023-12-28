import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  userIdRead,
  userInformationUpdate,
  userSecession,
} from '../../utils/userInformation';
import UpdateTitle from './UpdateTitle';
import UpdateContentMain from './UpdateContentMain';

const ContentUpdateContainer = () => {
  const [nickName, setNickName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('');
  const [withdrawalPassword, setWithdrawalPassword] = useState(false);
  const [userImageFile, setUserImageFile] = useState(null);
  const [isUpdateEnabled, setUpdateEnabled] = useState(false);
  const [readUserId, setReadUserId] = useState('');
  const [readNickName, setReadNickName] = useState('');
  const [readUserImage, setReadUserImage] = useState('');
  const navigate = useNavigate();

  // // userIdRead Api
  const fetchData = async () => {
    try {
      const { userId, nickName, imageUrl } = await userIdRead();
      setReadUserId(userId);
      setReadNickName(nickName);
      setReadUserImage(imageUrl);
    } catch (err) {
      console.error('데이터를 불러오는 중 오류 발생:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log('userIdReadApi imageUrl@', readUserImage);
  console.log({ readUserId });
  console.log({ readNickName });

  const handleUpdate = async () => {
    try {
      // 조건 boolean
      if (!isUpdateEnabled) {
        alert('다시 입력해주세요');
        return;
      }
      // 새 비밀번호 5글자 이상
      if (newPassword.length <= 4) {
        alert('새 비밀번호는 최소 5자 이상이어야 합니다.');
        return;
      }
      // 새비밀번호 == 새비밀번호 확인
      if (newPassword !== newPasswordConfirmed) {
        alert('새 비밀번호와 확인이 일치해야 합니다.');
        return;
      }
      //꼼수발동
      const updatedNickName =
        nickName.trim() || `${Math.floor(Math.random() * 100000000)}`;

      console.log('업데이트 전:', {
        nickName: updatedNickName,
        newPassword,
        imageUrl: userImageFile,
      });

      const result = await userInformationUpdate(
        updatedNickName,
        newPassword,
        userImageFile,
      );

      console.log('Update result:', result);

      if (result) {
        alert('회원 정보가 수정되었습니다.');
        navigate('/profile');
      } else {
        console.error('수정 실패. 결과:', result);
        alert('수정 실패');
      }
    } catch (error) {
      console.error('업데이트 중 오류 발생:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      //  const [userImageFile, setUserImageFile] = useState(null); 이미지 업로드 수정버튼
      setUserImageFile(url);
    }
  };

  //회원탈퇴
  //탈퇴하기 현재 탈퇴 실패라고 문구는 뜨면서 회원 탈퇴는 성공
  const handleUserSecession = async () => {
    try {
      if (!withdrawalPassword) {
        alert('다시 입력해주세요');
        return;
      }
      const result = await userSecession();
      if (result) {
        localStorage.removeItem('userToken');
        alert('회원탈퇴가 완료되었습니다.');
        navigate('/');
      } else {
        alert('탈퇴 실패. 에러 상세정보를 확인해주세요.');
      }
    } catch (error) {
      console.error('탈퇴 중 오류 발생:', error);
    }
  };

  return (
    <ContentWrapper>
      <UpdateTitle
        handleImageUpload={handleImageUpload}
        readUserImage={readUserImage}
      />
      <UpdateContentMain
        nickName={nickName}
        setNickName={setNickName}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        newPasswordConfirmed={newPasswordConfirmed}
        setNewPasswordConfirmed={setNewPasswordConfirmed}
        handleUpdate={handleUpdate}
        setUpdateEnabled={setUpdateEnabled}
        isUpdateEnabled={isUpdateEnabled}
        readUserId={readUserId}
        readNickName={readNickName}
        setWithdrawalPassword={setWithdrawalPassword}
      />
      <SecessionBtn onClick={handleUserSecession}>
        회원탈퇴
        <FontAwesomeIcon icon={faAngleRight} />
      </SecessionBtn>
    </ContentWrapper>
  );
};

export default ContentUpdateContainer;

const ContentWrapper = styled.div`
  width: 390px;
  height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecessionBtn = styled.button`
  border: none;
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 16px;
  font-weight: 700;
  color: #b6b6b6;
`;
