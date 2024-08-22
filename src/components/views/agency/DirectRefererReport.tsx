import React, { useEffect, useState } from "react";
import { Sheet, Text } from "zmp-ui";
import FlexBox from "../../common/FlexBox";
import { ArrowDown2 } from "iconsax-react";

import moment from "moment";
import {
  ICommissionReportDataType,
  IListResponseDto,
  IReportDataType,
} from "../../../interfaces/response";
import {
  getMyCommissionLogReport,
  getReferrerAccessLogReport,
} from "../../../services/referrer";
import useFormatter from "../../../hooks/useFormatter";
import Chart from "react-apexcharts";

type Props = {};

export enum EDateRange {
  TODAY = 0,
  ONE_DAY = 1,
  ONE_WEEK = 7,
  ONE_MONTH = 30,
}

const DirectRefererReport = (props: Props) => {
  const [chartState, setchartState] = useState({
    options: {
      labels: ["Lượt tạo bảo hiểm", "Lượt thanh toán"],
      colors: ["#096DD9", "#69C0FF"],
      stroke: {
        curve: "smooth",
        lineCap: "round",
      },
      legend: { show: true, position: "bottom" },

      chart: {
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 2000,
          animateGradually: {
            enabled: true,
            delay: 500,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 250,
          },
        },
      },
      plotOptions: {
        radialBar: {
          track: {
            show: true,
            background: "rgba(0,0,0,0.02)",
            strokeWidth: "100%",
            opacity: 1,
            margin: 10,
          },
          dataLabels: {
            name: {
              show: true,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "16px",
              offsetY: 16,
            },
            total: {
              show: true,
              label: "Lượt click",
              color: "#373d3f",
              formatter: function ({ config }) {
                return config.colors[2];
              },
            },
          },
        },
      },
    },

    series: [0, 0],
    total: 0,
  });
  const { formatter } = useFormatter();
  const [range, setrange] = useState<EDateRange>(EDateRange.ONE_WEEK);
  const [actionSheetVisible, setactionSheetVisible] = useState(false);
  const [report, setReport] = useState<
    | (IListResponseDto<IReportDataType> & { accumulate: IReportDataType })
    | undefined
  >();

  const [loading, setloading] = useState(false);

  const [commission, setCommission] = useState<
    | (IListResponseDto<ICommissionReportDataType> & {
        accumulate: ICommissionReportDataType;
      })
    | undefined
  >();
  useEffect(() => {
    setloading(true);

    const dateRange = {
      to: moment().endOf("day").valueOf(),
      from: moment().startOf("day").subtract(range, "days").valueOf(),
    };

    Promise.all([
      getReferrerAccessLogReport(dateRange),
      getMyCommissionLogReport(dateRange),
    ])
      .then(([accessLogReport, commissionReport]) => {
        setReport(accessLogReport);
        setCommission(commissionReport);
        setchartState((chartState) => {
          return {
            ...chartState,
            options: {
              ...chartState.options,
              colors: [
                ...chartState.options.colors.slice(0, 2),
                accessLogReport.accumulate.accessCount,
              ],
            },
            series: [
              Math.floor(
                ((accessLogReport.accumulate.createCount || 0) * 100) /
                  (accessLogReport.accumulate.accessCount || 1)
              ),
              Math.floor(
                ((accessLogReport.accumulate.paidCount || 0) * 100) /
                  (accessLogReport.accumulate.accessCount || 1)
              ),
            ],
          } as any;
        });
      })
      .finally(() => setloading(false));
  }, [range]);

  return (
    <div className="w-full">
      <div
        className="relative min-h-[180px] w-full text-white"
        style={{
          backgroundImage: 'url("https://i.ibb.co/CBHDZRL/Oval.png")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: 12,
        }}
      >
        <div>
          <FlexBox
            className="items-center justify-end  p-2"
            onClick={() => setactionSheetVisible(true)}
          >
            <Text className="text-right pr-2 text-xs">{`${
              range ? `${range} ngày trước- Hiện tại` : "Hôm nay"
            }`}</Text>
            <ArrowDown2 size="16" color="#ffffff" />
          </FlexBox>
        </div>
        <FlexBox className="justify-center items-center flex-col p-4">
          <Text className="text-lg">Doanh thu</Text>
          <Text className="text-3xl">
            {loading
              ? "--"
              : formatter.format(
                  commission?.accumulate.revenueCalcCommission || 0
                )}
          </Text>
        </FlexBox>
        <FlexBox className="p-4 items-center">
          <Text className="">Hoa hồng:</Text>
          <Text className="pl-2">
            {loading
              ? "--"
              : formatter.format(commission?.accumulate.originalAmount || 0)}
          </Text>
        </FlexBox>
      </div>
      <Text className="text-lg p-4">QR Code đã chia sẻ</Text>
      <div className="max-h-[50vh] h-full">
        <Chart
          options={chartState.options as any}
          series={chartState.series}
          type="radialBar"
          width="100%"
          height={500}
        />
      </div>

      <Sheet.Actions
        mask
        visible={actionSheetVisible}
        title="Chọn khoảng thời gian"
        onClose={() => setactionSheetVisible(false)}
        swipeToClose
        actions={[
          Object.values(EDateRange)
            .filter((i) => !Number.isNaN(Number(i)))
            .map((value) => ({
              text: Number(value) ? `${value} ngày trước` : "Hôm nay",
              onClick: () => {
                setactionSheetVisible(false);
                setrange(Number(value));
              },
            })),
          [{ text: "", close: true }],
          [{ text: "", close: true }],
        ]}
      />
    </div>
  );
};

export default DirectRefererReport;
