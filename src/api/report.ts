import { format } from "date-fns";
import { baseUrl } from ".";
import { ReportResponse } from "./types";

const generateReport = (
  fromDate: Date,
  toDate: Date,
  projectId?: string,
  gatewayId?: string
): Promise<ReportResponse> => {
  return fetch(`${baseUrl}/report`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId ?? undefined,
      gatewayId: gatewayId ?? undefined,
      from: format(fromDate, "yyyy-MM-dd"),
      to: format(toDate, "yyyy-MM-dd"),
    }),
  }).then((res) => res.json());
};

export const reportApi = {
  generateReport,
};
