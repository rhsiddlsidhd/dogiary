import styled from 'styled-components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RankingDisplay from './RankingDisplay';
import { LongColoredBtn } from '../components/common/Buttons';
import { LogoBar, NavBar } from '../components/common/Header';
import { ContainerBox } from '../components/common/Boxes';
import React, { useState, useEffect } from 'react';
import { api } from '.././utils/api';

api.get('/rank');
api.get('/dogs');

const StyledBox = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #fff8e6;
  height: 50px;
  width: 90%;
  flex-wrap: nowrap;
  margin: 30px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding-left: 10px;
`;

const RankingBox = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  border: 2px solid #bdaf74;
  height: 50px;
  width: 90%;
  flex-wrap: nowrap;
  margin: 30px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

function Ranking() {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  useEffect(() => {
    fetchRankingData();

    console.log(rankings);
  }, []);

  const fetchRankingData = async () => {
    try {
      const response = await api.get('/rank');
      const data = response.data.data.topUsers;
      console.log(data);
      setRankings(data);
    } catch (error) {
      console.error('랭킹 데이터를 가져오는데 실패했습니다:', error);
    }
  };
  return (
    <Container>
      <div className="App">
        <LogoBar></LogoBar>
        <NavBar></NavBar>
        <div class="title">랭킹 보기</div>
        <div class="myrank">나의 등수</div>
        <div>
          <StyledBox>{/* <RankingDisplay /> */}</StyledBox>
        </div>
        <div class="myrank">{currentMonth}월 TOP 5</div>

        {rankings.map((ranking, index) => (
          <div class="Toprank" key={`Toprank${index}`}>
            <RankingBox>
              <RankingDisplay
                userRanking={index}
                nickName={ranking.nickName}
                count={ranking.count}
              />
            </RankingBox>
          </div>
        ))}

        <div
          className="move-map"
          onClick={() => {
            navigate('/MapPage/MyMapPage');
          }}
        >
          <LongColoredBtn>맵으로 돌아가기</LongColoredBtn>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .title {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    color: #5f5013;
    margin: 0 auto;
    width: 100%;
    flex-wrap: nowrap;
    padding: 20px;
    font-weight: bold;
    text-align: center;
  }

  .move-map {
    display: flex;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 20px;
    margin: 0 auto;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }

  .myrank {
    font-family: 'Noto Sans KR', sans-serif;
    color: #5f5013;
    font-size: 20px;
    width: 70%;
    flex-wrap: nowrap;
    font-weight: bold;
    margin: 10 auto;
    margin-left: 40px;
    margin-top: 30px;
  }
`;
//스타일드 컴포넌트 한곳에 몰고(몰기 완 -> 적용시키기위해 노력중)
// api 독스 코드 연결하기 /
export default Ranking;
