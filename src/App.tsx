import { Box, Grommet, ThemeType } from "grommet";
import React, { useEffect, useState } from "react";
import { deepFreeze } from "grommet/utils";
import {
  EmptyState,
  Footer,
  Header,
  MainContent,
  Report,
  SidebarContent,
  Toolbar,
} from "./components";
import styling from "./App.module.scss";
import { api, Gateway, Payment, Project } from "./api";

export const customTheme: ThemeType = deepFreeze({
  global: {
    colors: {
      brand: "#005B96;",
      focus: "#FF7217",
      selected: "#005B96;",
      "accent-1": "#1BC5BD",
      "accent-2": "#F6CA65",
      "dark-1": " #011F4B",
      "dark-2": " #7E8299",
      "dark-3": "#B3B3B3",
      "dark-4": "#F3F6F9",
    },
  },
  select: {
    background: "accent-1",
    icons: {
      color: "white",
    },
    clear: {
      container: {
        background: "accent-1",
      },
    },
    options: {
      container: {
        background: "accent-1",
      },
      text: {
        size: "14px",
        color: "light-1",
      },
    },
  },
  accordion: {
    border: {
      style: "hidden",
    },
    panel: {
      border: {
        style: "hidden",
      },
    },
  },
});
export interface ReportData {
  project: Project;
  gateway: Gateway;
  fromDate: Date;
  toDate: Date;
}

export const App = () => {
  const [reportData, setReportData] = useState<ReportData>();
  const [payments, setPayments] = useState<Payment[]>();

  useEffect(() => {
    if (reportData) {
      const { fromDate, toDate, project, gateway } = reportData;
      api.report
        .generateReport(
          fromDate,
          toDate,
          project.projectId === "ALL" ? undefined : project.projectId,
          gateway.gatewayId === "ALL" ? undefined : gateway.gatewayId
        )
        .then((res) => {
          setPayments(res.data);
        });
    }
  }, [reportData]);

  return (
    <Grommet className={styling.App} theme={customTheme} full>
      <Header />
      <Box className={styling.main} direction="row">
        <SidebarContent />
        <MainContent>
          <Toolbar
            onGenerateReport={(project, gateway, fromDate, toDate) =>
              setReportData({ project, gateway, fromDate, toDate })
            }
          />
          {!reportData && <EmptyState />}
          {reportData && payments && (
            <Report reportData={reportData} payments={payments} />
          )}
        </MainContent>
      </Box>
      <Footer />
    </Grommet>
  );
};
