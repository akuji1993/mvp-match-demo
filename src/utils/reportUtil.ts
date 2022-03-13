import { Payment } from "../api";
import { ReportData } from "../App";

export enum GROUP_BY {
  PROJECT = "PROJECT",
  GATEWAY = "GATEWAY",
  NONE = "NONE",
}

export const getGroupBy = (reportData: ReportData): GROUP_BY => {
  if (reportData.project.projectId === "ALL") {
    return GROUP_BY.PROJECT;
  } else if (
    reportData.project.projectId !== "ALL" &&
    reportData.gateway.gatewayId === "ALL"
  ) {
    return GROUP_BY.GATEWAY;
  } else if (
    reportData.project.projectId !== "ALL" &&
    reportData.gateway.gatewayId !== "ALL"
  ) {
    return GROUP_BY.NONE;
  }
  return GROUP_BY.NONE;
};

export interface GroupedPayments {
  [key: string]: Payment[];
}

export const getGroupedPayments = (
  payments: Payment[],
  groupBy: GROUP_BY
): GroupedPayments => {
  const key = groupBy === GROUP_BY.PROJECT ? "projectId" : "gatewayId";

  return payments.reduce((result: GroupedPayments, payment: Payment) => {
    if (!result[payment[key]]) result[payment[key]] = [];
    result[payment[key]].push(payment);
    return result;
  }, {});
};
