import styled from 'styled-components';

interface SignInProps {
  signinIn?: boolean;
}

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.8); /* Nền màu đen mờ */
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
              0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 780px;
  max-width: 100%;
  min-height: 500px;
`;

export const SignUpContainer = styled.div.attrs<SignInProps>(
  ({ signinIn, ...props }) => props
)<SignInProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${({ signinIn }) =>
    signinIn !== true &&
    `
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
    `}
`;

export const SignInContainer = styled.div<SignInProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${({ signinIn }) => signinIn !== true && `transform: translateX(100%);`}
`;

export const Form = styled.form`
  background-color: rgba(20, 20, 20, 0.9); /* Nền tối hơn và mờ hơn */
  backdrop-filter: blur(5px); /* Hiệu ứng làm mờ nền */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  color: #e0e0e0; /* Màu xám sáng */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Thêm bóng cho chữ */
`;

export const Input = styled.input`
  background-color: #333333;
  color: #e0e0e0;
  border: 1px solid #555555;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 25px; /* Bo tròn nhiều hơn */
  font-size: 16px;
  &:focus {
    border-color: #ff5252; /* Màu đỏ nhạt khi focus */
    outline: none;
  }
`;

export const Button = styled.button`
  border-radius: 25px;
  border: none;
  background-color: #ff5252; /* Màu đỏ nổi bật */
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 80ms ease-in;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f; /* Màu đỏ đậm hơn khi hover */
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #ff5252;
  color: #ffffff;
  &:hover {
    background-color: rgba(255, 82, 82, 0.1); /* Màu nền mờ khi hover */
  }
`;

export const Anchor = styled.a`
  color: #e0e0e0;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  transition: color 0.3s ease;
  &:hover {
    color: #ff5252;
  }
`;

export const OverlayContainer = styled.div<SignInProps>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${({ signinIn }) => signinIn !== true && `transform: translateX(-100%);`}
`;

export const Overlay = styled.div<SignInProps>`
  background: linear-gradient(to right, #b71c1c, #1a1a1a); /* Gradient từ đỏ đậm sang đen */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${({ signinIn }) => signinIn !== true && `transform: translateX(50%);`}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)<SignInProps>`
  transform: translateX(-20%);
  ${({ signinIn }) => signinIn !== true && `transform: translateX(0);`}
`;

export const RightOverlayPanel = styled(OverlayPanel)<SignInProps>`
  right: 0;
  transform: translateX(0);
  ${({ signinIn }) => signinIn !== true && `transform: translateX(20%);`}
`;

export const Paragraph = styled.p`
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: #e0e0e0; /* Màu xám sáng */
`;
