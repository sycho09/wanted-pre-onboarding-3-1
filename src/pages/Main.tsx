import {
  Blank,
  Wrapper,
  Title,
  InputBox,
  Input,
  SearchButton
} from '../components';

export default function Main() {
  return (
    <Wrapper>
      <Title>국내 모든 임상시험 검색하고</Title>
      <Title>온라인으로 참여하기</Title>

      <InputBox>
        <Input />
        <SearchButton>검색</SearchButton>
      </InputBox>
      <Blank>검색어 없음</Blank>
    </Wrapper>
  );
}
