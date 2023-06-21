import styled from "styled-components";

export const HomeContainer = styled.main`
flex:1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
}
`;

export const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
color: ${(props) => props.theme['gray-100']};
font-size: 1.125rem;
font-weight: bold;
flex-wrap: wrap;
`;

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: inherit;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;
  -webkit-calendar-picker-indicator {
  display: none !important;
  }
`;
export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;
export const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Roboto Mono', monospace;
  line-height: 8rem;
  gap: 1rem;
  line-height: 8rem;
  font-size: 10rem;
  span{
    padding: 2rem 1rem;
    border-radius: 8px;
    background: ${(props) => props.theme['gray-700']};
}
`;

export const Separator = styled.div`
padding: 2rem 0;
color: ${(props) => props.theme['green-500']};
width: 4rem;
display: flex;
justify-content: center;
overflow: hidden;
`;
const BaseCountDownButton = styled.button`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
border: 0;
border-radius: 8px;
gap: 0.5rem;
cursor: pointer;
font-weight: bold;
padding: 1.0625rem;
color: ${(props) => props.theme['gray-100']};

`
export const PlayButtonContainer = styled(BaseCountDownButton)`
background: ${(props) => props.theme['green-500']};

&:disabled{
  opacity: 0.7;
  cursor: not-allowed;
}
&:not(:disabled):hover {
  background: ${(props) => props.theme['green-700']};
}
`;
export const StopCountdownButtonContainer = styled(BaseCountDownButton)`
background: ${(props) => props.theme['red-500']};

&:not(:disabled):hover {
  background: ${(props) => props.theme['red-700']};
}
`;
