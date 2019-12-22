import React, { useCallback } from "react";
import styled from 'styled-components';
import { userService } from '../service';

const Img = styled.img`
height: 1.5em
width: 1.5em
cursor: pointer
`

export default () => {
  const authGoogle = useCallback(() => {
    userService.login('google');
  }, []);

  return (
    <div>
      <span>
        <Img
          src="/icons/google-icon.svg"
          alt="google-icon"
          onClick={authGoogle}
        />
      </span>
    </div>
  );
};
