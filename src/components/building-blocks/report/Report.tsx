import classNames from "classnames";
import { Accordion, AccordionPanel, Box, DataTable } from "grommet";
import React, { FunctionComponent, useCallback, useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useRecoilState } from "recoil";
import { Payment } from "../../../api";
import { ReportData } from "../../../App";
import { gatewaysState, projectsState } from "../../../state-management/recoil";
import {
  getGroupBy,
  getGroupedPayments,
  GroupedPayments,
  GROUP_BY,
} from "../../../utils";
import { AccordionLabel } from "../../controls";
import styling from "./Report.module.scss";
interface ReportProps {
  payments: Payment[];
  reportData: ReportData;
}

const COLORS = ["#A259FF", "#FFC107", "#6497B1", "#F24E1E"];

export const Report: FunctionComponent<ReportProps> = ({
  payments,
  reportData,
}) => {
  const [projects] = useRecoilState(projectsState);
  const [gateways] = useRecoilState(gatewaysState);

  const groupBy = useMemo(() => getGroupBy(reportData), [reportData]);

  const showGraph = useMemo(
    () =>
      reportData.project.projectId !== "ALL" ||
      reportData.gateway.gatewayId !== "ALL",
    [reportData]
  );

  const groupedPayments: GroupedPayments = useMemo(
    () => getGroupedPayments(payments, groupBy),
    [payments, groupBy]
  );

  const getTotal = useCallback(
    (id: string): number => {
      return groupedPayments?.[id]?.reduce(
        (result: number, payment: Payment) => {
          result += payment.amount;
          return result;
        },
        0
      );
    },
    [groupedPayments, projects]
  );

  const title = useMemo(() => {
    const projectLabel = reportData.project
      ? `${reportData.project.name}`
      : "All Projects";
    const gatewayLabel = reportData.gateway
      ? `${reportData.gateway.name}`
      : "All Gateways";

    return `${projectLabel} | ${gatewayLabel}`;
  }, [reportData]);

  const globalTotal = useMemo(
    () =>
      payments.reduce((result: number, payment: Payment) => {
        result += payment.amount;
        return result;
      }, 0),
    [payments]
  );

  const chartData = useMemo(
    () =>
      Object.keys(groupedPayments).map((key) => {
        return {
          name:
            groupBy === GROUP_BY.PROJECT
              ? projects?.find((pr) => pr.projectId === key)?.name
              : gateways?.find((g) => g.gatewayId === key)?.name,
          value: getTotal(key),
        };
      }),
    [groupedPayments]
  );

  return (
    <div className={styling.Report}>
      <div
        className={classNames(styling.content, {
          [styling.content__half]: !!showGraph,
        })}
      >
        <label>{title}</label>
        <Accordion className={styling.accordion}>
          {groupBy === GROUP_BY.PROJECT &&
            projects
              ?.filter((p) => p.projectId !== "ALL")
              ?.map((project, idx) => (
                <AccordionPanel
                  key={`accordion-panel-${idx}`}
                  className={styling.accordionPanel}
                  label={
                    <AccordionLabel
                      label={project.name!}
                      total={getTotal(project.projectId!)}
                    />
                  }
                >
                  <Box pad="medium">
                    {groupedPayments[project.projectId!]?.length > 0 ? (
                      <DataTable
                        className={styling.table}
                        columns={[
                          {
                            property: "created",
                            header: "Date",
                          },
                          {
                            property: "gatewayId",
                            header: "Gateway",
                          },
                          {
                            property: "paymentId",
                            header: "Transaction ID",
                          },
                          {
                            property: "amount",
                            header: "Amount",
                          },
                        ]}
                        data={groupedPayments[project.projectId!]}
                      />
                    ) : (
                      <label>No data for this selection</label>
                    )}
                  </Box>
                </AccordionPanel>
              ))}
          {groupBy === GROUP_BY.GATEWAY &&
            gateways
              ?.filter((g) => g.gatewayId !== "ALL")
              ?.map((gateway, idx) => (
                <AccordionPanel
                  key={`accordion-panel-${idx}`}
                  className={styling.accordionPanel}
                  label={
                    <AccordionLabel
                      label={gateway.name!}
                      total={getTotal(gateway.gatewayId!)}
                    />
                  }
                >
                  <Box pad="medium">
                    {groupedPayments[gateway.gatewayId!]?.length > 0 ? (
                      <DataTable
                        className={styling.table}
                        columns={[
                          {
                            property: "created",
                            header: "Date",
                          },
                          {
                            property: "gatewayId",
                            header: "Gateway",
                          },
                          {
                            property: "paymentId",
                            header: "Transaction ID",
                          },
                          {
                            property: "amount",
                            header: "Amount",
                          },
                        ]}
                        data={groupedPayments[gateway.gatewayId!]}
                      />
                    ) : (
                      <label>No data for this selection</label>
                    )}
                  </Box>
                </AccordionPanel>
              ))}

          {groupBy === GROUP_BY.NONE && (
            <Box pad="medium">
              {payments && payments.length > 0 ? (
                <DataTable
                  className={styling.table}
                  columns={[
                    {
                      property: "created",
                      header: "Date",
                    },
                    {
                      property: "gatewayId",
                      header: "Gateway",
                    },
                    {
                      property: "paymentId",
                      header: "Transaction ID",
                    },
                    {
                      property: "amount",
                      header: "Amount",
                    },
                  ]}
                  data={payments}
                />
              ) : (
                <label>No data for this selection</label>
              )}
            </Box>
          )}
        </Accordion>
      </div>
      {showGraph && (
        <div className={styling.graph}>
          <div className={styling.legend}>
            {chartData.map((entry, idx) => (
              <div className={styling.entry}>
                <div
                  style={{ background: COLORS[idx % COLORS.length] }}
                  className={styling.colorDot}
                />
                <div className={styling.label}>{entry.name}</div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={80}
                fill="#8884d8"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className={styling.footer}>
        <label title="label-total-all">
          TOTAL: {globalTotal.toFixed(2)} USD
        </label>
      </div>
    </div>
  );
};
