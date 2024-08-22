import React, { useEffect, useRef, useState } from "react";
import { Text } from "zmp-ui";
import {
  getGameConfig,
  getGameTurn,
  getUserLog,
  submitGameLog,
} from "../../../services/game";
import {
  EGamePlatform,
  EGameType,
  EGamelogStatus,
} from "../../../interfaces/game";
import Loading from "../../common/Loading";
import { Modal, useNavigate } from "zmp-ui";
import LayoutHeader from "../../layouts/LayoutHeader";
import { data } from "zmp-framework/types/dom";
import Column from "antd/es/table/Column";
import moment from "moment";
import { Flex, message } from "antd";

const WheelGame = () => {
  const [loading, setloading] = useState(true);
  const [wheelSections, setWheelSections] = useState<any | undefined>();
  const [ctx, setCtx] = useState<any | undefined>();
  const [jackpot, setJackpot] = useState<any | undefined>([]);
  const [jps, setJps] = useState<any | undefined>();
  const [turn, setTurn] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [spinHistory, setSpinHistory] = useState<SpinHistoryItem[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wheelRadius = 300 / 2;
  const wheelCenterX = 300 / 2;
  const wheelCenterY = 300 / 2;

  useEffect(() => {
    getGameConfig({ type: EGameType.WHEEL })
      .then((res) => {
        setWheelSections(res?.config?.prizes);
        setJps(
          res?.config?.prizes.filter(
            (x) => x.arc == Math.min(...res?.config?.prizes.map((x) => x.arc))
          )
        );
      })
      .finally(() => setloading(false));
    getGameTurn({ type: EGameType.WHEEL }).then((res) => {
      setTurn(res);
    });
  }, []);
  useEffect(() => {
    // Fetch spin history from the server
    getUserLog({ type: EGameType.WHEEL })
      .then((res) => {
        setSpinHistory(res); // Update the spin history state
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching spin history:", error);
      });
  }, [spinning]);
  useEffect(() => {
    if (!loading) {
      const canvas = canvasRef.current;
      if (canvas) {
        setCtx(canvas.getContext("2d"));
        if (ctx) {
          drawWheel();
        }
      }
    }
  }, [loading, ctx, wheelSections, jps]);
  function drawWheel() {
    let startAngle = 0;
    setJackpot([]);
    wheelSections.forEach((section, index) => {
      const arc = (Math.PI * 2 * section.arc) / 100;
      ctx.fillStyle = section.color;
      ctx.beginPath();
      ctx.moveTo(wheelCenterX, wheelCenterY);
      ctx.arc(
        wheelCenterX,
        wheelCenterY,
        wheelRadius,
        startAngle,
        startAngle + arc
      );
      if (jps.indexOf(section) != -1) {
        setJackpot([
          ...[jackpot],
          {
            start: (startAngle / (2 * Math.PI)) * 360,
            end: ((startAngle + arc) / (2 * Math.PI)) * 360,
          },
        ]);
      }
      ctx.fill();
      ctx.save();
      ctx.fillStyle = "#3c3c3c";
      ctx.textAlign = "center";
      // ctx.font = "10px Arial";
      ctx.translate(wheelCenterX, wheelCenterY);
      ctx.rotate(startAngle + arc / 2);
      const text = section.label;
      ctx.fillText(text, (wheelRadius * 2) / 3, 4);
      startAngle = startAngle + arc;
      ctx.restore();
    });
  }

  function rotateWheel() {
    ctx.save();
    setSpinning(true);
    let spinAngle = 30;
    const spinRound = 18;
    let priceDeg = getRandomInt(359, 0);
    let getPrice = false;
    setJackpot(
      jackpot?.filter(
        (item, index, self) =>
          self.findIndex((other) => areObjectsEqual(item, other)) === index
      )
    );
    while (
      jackpot?.length > 0 &&
      jackpot?.find((x) => x.start <= priceDeg && x.end >= priceDeg) &&
      !getPrice
    ) {
      if (getRandomInt(10000, 0) > 100) {
        priceDeg = getRandomInt(359, 0);
      } else {
        getPrice = true;
      }
    }
    let totalAngle = 0;

    if (priceDeg <= 180) {
      totalAngle = priceDeg + spinRound * 360;
    } else {
      totalAngle = priceDeg + (spinRound - 1) * 360;
    }
    let rotatedRound = 0;
    let lastAngle = spinAngle;

    // spinButton.disabled = true;

    async function rotate() {
      let angle = lastAngle * rand(0.994, 0.997);
      if (angle + rotatedRound > totalAngle || angle < 0.001) {
        angle = totalAngle - rotatedRound;
      }
      ctx.clearRect(
        0,
        0,
        canvasRef?.current?.width,
        canvasRef?.current?.height
      );
      ctx.translate(wheelCenterX, wheelCenterY);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.translate(-wheelCenterX, -wheelCenterY);
      rotatedRound += angle;
      drawWheel();
      lastAngle = angle;
      if (rotatedRound < totalAngle) {
        requestAnimationFrame(rotate);
      } else {
        // Show the popup when spinning is complete
        const remainAngle = 360 - (rotatedRound % 360);
        const remainAnglePercentage = (remainAngle / 360) * 100;
        let startAngle = 0;
        for (let index = 0; index < wheelSections.length; index++) {
          const element = wheelSections[index];
          if (
            startAngle <= remainAnglePercentage &&
            remainAnglePercentage <= startAngle + element.arc
          ) {
            await submitGameLog({
              gameType: EGameType.WHEEL,
              platform: EGamePlatform.MINI_APP,
              reward: element?.label,
            }).then(
              () => {
                handleOpenPopup(element?.label);
              },
              () => {
                message.error("Đã có lỗi xảy ra");
              }
            );
            // console.log("Jackpot ", index + 1);
            ctx.restore();
          }
          startAngle = startAngle + element.arc;
        }
        setTurn(turn - 1);
        setSpinning(false);
        // popup.classList.remove("hidden");
        // spinButton.disabled = false;
      }
    }
    requestAnimationFrame(rotate);
  }
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function areObjectsEqual(objA, objB) {
    return objA?.start === objB?.start && objA?.end === objB?.end;
  }
  const [rotatedPrize, setRotatedPrize] = useState<string>("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleOpenPopup = (label: string) => {
    setRotatedPrize(label);
    setIsPopupVisible(true);
  };
  const handleClosePopup = () => {
    setRotatedPrize("");
    setIsPopupVisible(false);
  };
  const navigate = useNavigate();
  if (!wheelSections && loading) return <Loading />;
  if (wheelSections && !loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "white",
          flexDirection: "column",
        }}
      >
        <LayoutHeader
          showBackIcon={true}
          title={<Text className="text-white">Vòng quay may mắn</Text>}
          onBackClick={() => {
            navigate("/home");
          }}
        />
        <div
          style={{
            position: "relative",
            width: "fit-content",
            margin: "74px 0 20px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <canvas ref={canvasRef} width={300} height={300}></canvas>
            <svg
              fill="#f52f2f"
              height="30px"
              width="30px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 476.213 476.213"
              xml:space="preserve"
            >
              <polygon
                points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
	              57.427,253.107 476.213,253.107 "
              />
            </svg>
          </div>
          {turn > 0 ? (
            <>
              <button
                className="btn btn-success"
                onClick={rotateWheel}
                disabled={spinning}
                style={{
                  position: "absolute",
                  width: "45px",
                  height: "45px",
                  top: "calc(50% - 23px)",
                  left: "calc(50% - 42px)",
                  whiteSpace: "pre-wrap",
                  borderRadius: "99px",
                  padding : "unset"
                }}
              >
                Quay
              </button>
            </>
          ) : (
            <>
              <div
                style={{
                  textAlign: "center",
                  padding: "10px",
                  marginTop: "20px",
                }}
              >
                Bạn đã hết lượt quay
              </div>
            </>
          )}
        </div>
        {rotatedPrize && (
          <Modal
            visible={isPopupVisible}
            onClose={handleClosePopup}
            title="Trúng thưởng vòng quay may mắn"
          >
            <div style={{ textAlign: "center" }}>
              <span> Chúc mừng bạn đã trúng thưởng {rotatedPrize}</span>
            </div>
          </Modal>
        )}

        <Text className="tt-spin-game">Lịch sử quay</Text>
        <ul className="spin-game">
          {spinHistory.map((spin, index) => (
            <li key={index}>
              <p>
                <span>Giải Thưởng:</span> {spin.reward}
              </p>
              <p>
                <span>Ngày: </span>
                {moment(spin.date).format("DD/MM/YYYY")}
              </p>
              <p>
                <span>Trạng Thái: </span>
                {spin.status == EGamelogStatus.PENDING
                  ? "Đang xử lý"
                  : spin.status == EGamelogStatus.SUCCESS
                  ? "Đã trao thưởng"
                  : "Đã hủy"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  return <Loading />;
};

export default WheelGame;

interface SpinHistoryItem {
  _id: string;
  gameType: string;
  reward: string;
  date: Date;
  status: string;
  // Add more properties as needed
}
