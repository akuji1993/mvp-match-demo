import React, { FunctionComponent } from "react";
import { Gateway, Project } from "../../../api";

export interface ReportData {
  project: Project;
  gateway: Gateway;
  fromDate: Date;
  toDate: Date;
}

interface ReportProps {
  reportData: ReportData;
}

export const Report: FunctionComponent<ReportProps> = ({ reportData }) => {
  return <div>Report</div>;
};
