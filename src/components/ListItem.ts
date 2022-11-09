import styled from 'styled-components';

export const ListItem = styled.li<{ isFocus: boolean }>`
  line-height: 2;
  padding-left: 0.8rem;
  border-radius: 8px;
  background-color: ${({ isFocus }) => (isFocus ? 'lightgray' : 'transparent')};
`;
