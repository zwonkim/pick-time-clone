import React, { useState } from "react";
import ModalPortal from "./ModalPortal";
import styled from "styled-components";
import Icon from "./Icon";

type Props = {
  children: React.ReactNode;
  editedGiftId: number | undefined;
  setEditedGiftId: (state: number | undefined) => void;
};

const ModalFrame: React.FC<Props> = ({
  children,
  editedGiftId,
  setEditedGiftId,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
    setEditedGiftId(undefined);
  };
  return (
    <>
      {editedGiftId !== undefined ? (
        <ModalPortal>
          <ModalDim onClick={handleClose} />
          <Wrapper>
            <CloseBtn onClick={handleClose}>
              <Icon name="close" width={18} height={18} />
            </CloseBtn>
            {children}
          </Wrapper>
        </ModalPortal>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalFrame;

const ModalDim = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  background-color: #00000066;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 100vh;
`;
const Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 12rem;
  left: calc(50% - 15.5rem);
  /* margin-top: 12rem; */
  background-color: #fff;
  width: 31rem;
  height: 48rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
`;
