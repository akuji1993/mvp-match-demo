import React, { FunctionComponent, useMemo } from "react";
import { Payment } from "../../../api";
import { ReportData } from "../../../App";
interface ReportProps {
  payments: Payment[];
  reportData: ReportData;
}

export const Report: FunctionComponent<ReportProps> = ({
  payments,
  reportData,
}) => {
  const groupByProject = useMemo(
    () => reportData.project.projectId === "ALL",
    [reportData]
  );
  const groupByGateway = useMemo(
    () =>
      reportData.project.projectId !== "ALL" &&
      reportData.gateway.gatewayId === "ALL",
    [reportData]
  );
  const dontGroup = useMemo(
    () =>
      reportData.project.projectId !== "ALL" &&
      reportData.gateway.gatewayId !== "ALL",
    [reportData]
  );

  return <div>Report</div>;
};
