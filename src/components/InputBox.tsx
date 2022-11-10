import * as React from 'react';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  max-width: 490px;
  width: 100%;
`;

export const InputContainer = styled.div<{ isFocus: boolean }>`
  border-radius: 42px;
  border: 2px solid;
  border-color: ${({ isFocus }) => (isFocus ? '#007be9' : '#fff')};
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.6;
  display: flex;
  width: 100%;
  position: relative;
  padding-right: 8px;
`;

type Props = {
  isFocus: boolean;
  children: React.ReactNode;
};

const InputBox = ({ isFocus = false, children }: Props) => {
  return (
    <>
      <InputWrapper>
        <InputContainer isFocus={isFocus}>{children}</InputContainer>
      </InputWrapper>
    </>
  );
};

export default InputBox;
