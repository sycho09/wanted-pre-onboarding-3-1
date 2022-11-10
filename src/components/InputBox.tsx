import * as React from 'react';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  max-width: 490px;
  width: 100%;
`;

export const InputContainer = styled.div`
  border-radius: 42px;
  border: 2px solid;
  border-color: #ffffff;
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
  children: React.ReactNode;
};

const InputBox = ({ children }: Props) => {
  return (
    <>
      <InputWrapper>
        <InputContainer>{children}</InputContainer>
      </InputWrapper>
    </>
  );
};

export default InputBox;
