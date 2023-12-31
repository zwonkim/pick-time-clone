import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetResult, usePostPickFinal } from "hooks/queries/useResult";

import Button from "components/common/Button";
import Header from "components/common/Header";
import Loading from "components/common/Loading";
import Title from "components/common/Title";

import ConsumerGiftList from "components/consumer/ConsumerGiftList";

import COLOR from "style/color";
import styled from "styled-components";

import { getResultIds, pickRandomId } from "utils/randomUtils";

function GiftForConsumer() {
  const { targetId } = useParams() as { targetId: string };
  const navigate = useNavigate();

  const [pickedFinalId, setPickedFinalId] = useState<number>(0);
  const [isPickedAndSend, setIsPickedAndSend] = useState<boolean>(false);
  const [isRandom, setIsRandom] = useState<boolean>(false);

  const { data, isLoading: isGetGiftListLoading } = useGetResult({
    id: parseInt(targetId, 10),
  });

  const { refetch, isLoading: isPickedLoading } = usePostPickFinal({
    targetId: parseInt(targetId, 10),
    giftId: pickedFinalId,
    isPickedAndSend,
  });

  const onClickRandomButton = () => {
    if (!data) return;
    setIsRandom(true);
    const resultIdArray = getResultIds(data.giftList, data.couponList);

    const randomId = pickRandomId(resultIdArray);

    setPickedFinalId(randomId);
    setIsRandom(false);

    navigate(`/random/${targetId}/gift`, { state: resultIdArray });
  };

  const onClickPickButton = () => {
    setIsPickedAndSend(true);
    refetch();
    setTimeout(() => {
      navigate(`/target/${targetId}/gift/final`);
    }, 100);
  };

  useEffect(() => {
    if (isRandom && pickedFinalId) {
      refetch();
    }
  }, [isPickedAndSend, pickedFinalId]);

  const loading = isGetGiftListLoading || isPickedLoading;

  return (
    <PageWrapper>
      {loading && <Loading />}
      <Header />
      {!isGetGiftListLoading && (
        <>
          <TitleWrapper>
            <Title level={1} align="left">
              {data?.providerName}
              님이
              <br />
              <TitleSpan>{data?.consumerName}</TitleSpan>
              님을 위해
              <br />
              생각한 선물들이에요!
            </Title>
          </TitleWrapper>
          <ConsumerGiftList
            onSelectGift={(id: number) => setPickedFinalId(id)}
            couponList={data?.couponList}
            giftList={data?.giftList}
          />
        </>
      )}
      <ButtonWrapper>
        <Button
          text="전부 마음에 드는데 어쩌죠?"
          color={COLOR.PINK}
          width="full"
          onClick={onClickRandomButton}
        />
        <Button
          isDisabled={pickedFinalId === 0}
          text="다 골랐어요!"
          color={COLOR.PURPLE}
          width="full"
          onClick={onClickPickButton}
        />
      </ButtonWrapper>
    </PageWrapper>
  );
}

export default GiftForConsumer;

const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const TitleWrapper = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 1.1rem;
`;

const TitleSpan = styled.span`
  color: #e363a3;
  font-weight: 900;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0rem;

  width: 35.8rem;
  height: 13.2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${COLOR.WHITE};
  gap: 1rem;
`;
