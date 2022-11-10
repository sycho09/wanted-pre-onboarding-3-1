import * as React from 'react';
import styled from 'styled-components';

export const ButtonBox = styled.button`
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  display: flex;
  font-weight: 500;
  border: 0;
  cursor: pointer;
  background-color: #007be9;
  color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const SearchButton = () => {
  return (
    <ButtonBox>
      <div style={{ width: '21px', height: '21px' }}>
        <svg
          viewBox='0 0 16 16'
          fill='currentColor'
          preserveAspectRatio='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z'></path>
        </svg>
      </div>
    </ButtonBox>
  );
};

export default SearchButton;
