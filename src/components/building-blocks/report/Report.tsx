import {
  Accordion,
  AccordionPanel,
  Box,
  DataTable,
  Meter,
  Text,
} from "grommet";
import React, { FunctionComponent, useCallback, useMemo } from "react";
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

export const Report: FunctionComponent<ReportProps> = ({
  payments,
  reportData,
}) => {
  const [projects] = useRecoilState(projectsState);
  const [gateways] = useRecoilState(gatewaysState);

  const groupBy = useMemo(() => getGroupBy(reportData), [reportData]);

  const groupedPayments: GroupedPayments = useMemo(
    () => getGroupedPayments(payments, groupBy),
    [payments, groupBy]
  );

  const getTotal = useCallback(
    (projectId: string): number => {
      return groupedPayments[projectId].reduce(
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

  console.log(groupedPayments, groupBy, projects);

  return (
    <div className={styling.Report}>
      <div className={styling.content}>
        <label>{title}</label>
        <Accordion className={styling.accordion}>
          {groupBy === GROUP_BY.PROJECT &&
            projects?.map((project) => (
              <AccordionPanel
                className={styling.accordionPanel}
                label={
                  <AccordionLabel
                    label={project.name!}
                    total={getTotal(project.projectId!)}
                  />
                }
              >
                <Box pad="medium">
                  <DataTable
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
                </Box>
              </AccordionPanel>
            ))}
          {/* {groupBy === GROUP_BY.GATEWAY && 
            
          }
          {groupBy === GROUP_BY.NONE && 
            
          } */}
        </Accordion>
      </div>
      <div className={styling.graph}>Graph</div>
      <div className={styling.footer}>Footer</div>
    </div>
  );
};
