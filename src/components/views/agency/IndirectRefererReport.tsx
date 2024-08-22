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
import { EDateRange } from "./DirectRefererReport";

type Props = {};

const IndirectRefererReport = (props: Props) => {
  const [chartState, setchartState] = useState({
    series: [
      {
        name: "Doanh thu",
        data: [],
      },
      {
        name: "Hoa hồng",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
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
            series: [
              {
                name: "Doanh thu",
                data: commissionReport.docs.map(
                  (item) => item.revenueCalcFromAgent
                ),
              },
              {
                name: "Hoa hồng",
                data: commissionReport.docs.map(
                  (item) => item.commissionFromAgent
                ),
              },
            ],
            options: {
              ...chartState.options,
              xaxis: {
                type: "string",
                categories: commissionReport.docs.map((item) => item.date),
              },
            },
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
                  commission?.accumulate.revenueCalcFromAgent || 0
                )}
          </Text>
        </FlexBox>
        <FlexBox className="p-4 items-center">
          <Text className="">Hoa hồng:</Text>
          <Text className="pl-2">
            {loading
              ? "--"
              : formatter.format(
                  commission?.accumulate.commissionFromAgent || 0
                )}
          </Text>
        </FlexBox>
      </div>
      <div className="max-h-[50vh] h-full pt-12">
        <Chart
          options={chartState.options as any}
          series={chartState.series}
          type="area"
          height={350}
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
            .filter((i) => !Number.isNaN(Number(i)) && Number(i) > 6)
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

export default IndirectRefererReport;
