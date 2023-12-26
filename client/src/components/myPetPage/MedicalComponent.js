import { useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { SmallBtn } from '../common/Buttons';
import axios from 'axios';

export default function MedicalComponent() {
  const [content, setContent] = useState('');
  const [hospital, setHospital] = useState('');
  const [cost, setCost] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [medicalList, setMedicalList] = useState([]);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeHospital = (e) => {
    setHospital(e.target.value);
  };

  const handleChangeCost = (e) => {
    setCost(e.target.value);
  };

  const MedicalPostClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/dogs/:id/medicals/:id',
        {
          content,
          date: startDate,
          cost,
          hospital,
        },
      );
      setMedicalList([...medicalList, response.data]);
      setContent('');
    } catch (error) {
      console.error('등록에 실패했습니다.', error);
    }
  };

  return (
    <div>
      <ContainerBox>
        <MedicalContents>
          <span className="span">사료/영양제/간식 정보를 등록하세요.</span>
          <SmallBtn
            onClick={(e) => {
              MedicalPostClick();
            }}
          >
            등록
          </SmallBtn>
          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy년 MM월 dd일"
          />
          <InputBox>
            <input
              className="form-input"
              value={content}
              type="text"
              name="content"
              id="content"
              placeholder="진료내용"
              onChange={handleChangeContent}
            ></input>
          </InputBox>
          <InputBox>
            <input
              className="form-input"
              value={hospital}
              type="text"
              name="hospital"
              id="hospital"
              placeholder="병원"
              onChange={handleChangeHospital}
            ></input>
          </InputBox>
          <InputBox>
            <input
              className="form-input"
              value={cost}
              type="text"
              name="cost"
              id="cost"
              placeholder="비용"
              onChange={handleChangeCost}
            ></input>
          </InputBox>
          <div>
            <span>건강기록 히스토리</span>
          </div>
          <MedicalList>
            <ul>
              <li></li>
            </ul>
          </MedicalList>
        </MedicalContents>
      </ContainerBox>
    </div>
  );
}

const MedicalContents = styled.div`
  // height: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  padding: 30px;

  .span {
    padding: 10px;
  }
`;

const MedicalList = styled.div`
  margin-top: 20px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }
`;
