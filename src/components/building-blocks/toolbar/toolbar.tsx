import { format } from "date-fns";
import { Box, Button, Heading, Select, Text } from "grommet";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { api, Gateway, Project } from "../../../api";
import { gatewaysState, projectsState } from "../../../state-management/recoil";
import { DateInput } from "../../controls";
import styling from "./toolbar.module.scss";

interface ToolbarProps {
  onGenerateReport: (
    project: Project,
    gateway: Gateway,
    fromDate: Date,
    toDate: Date
  ) => void;
}

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  onGenerateReport,
}) => {
  const projectResult = useQuery("projects", api.project.getProjects);
  const gatewayResult = useQuery("gateway", api.gateway.getGateways);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [gateways, setGateways] = useRecoilState(gatewaysState);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedGateway, setSelectedGateway] = useState<Gateway>();
  const [selectedProject, setSelectedProject] = useState<Project>();

  useEffect(() => {
    if (projectResult.data) {
      setProjects([
        { projectId: "ALL", name: "All Projects" },
        ...projectResult.data.data,
      ]);
    }
  }, [projectResult.data]);

  useEffect(() => {
    if (gatewayResult.data) {
      setGateways([
        { gatewayId: "ALL", name: "All Gateways" },
        ...gatewayResult.data.data,
      ]);
    }
  }, [gatewayResult.data]);

  const handleGenerateReport = () => {
    if (selectedProject && selectedGateway && startDate && endDate) {
      onGenerateReport(selectedProject, selectedGateway, startDate, endDate);
    }
  };

  return (
    <Box className={styling.Toolbar} direction="row">
      <Box>
        <Heading size="24px" level={3} margin={{ bottom: "4px" }}>
          Reports
        </Heading>
        <Text size="16px" color="dark-2" weight={700}>
          Easily generate a report of your transactions
        </Text>
      </Box>
      <Box className={styling.controls} direction="row" align="center">
        {projects && (
          <Select
            className={styling.select}
            placeholder="Select Project"
            value={selectedProject}
            onChange={({ option }) => setSelectedProject(option)}
            options={projects}
            valueKey="projectId"
            labelKey="name"
          />
        )}
        {gateways && (
          <Select
            className={styling.select}
            placeholder="Select Gateway"
            value={selectedGateway}
            options={gateways}
            onChange={({ option }) => setSelectedGateway(option)}
            valueKey="gatewayId"
            labelKey="name"
          />
        )}
        <DateInput
          placeholderLabel="From Date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DateInput
          placeholderLabel="To Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <Button
          className={styling.button}
          label="Generate report"
          primary
          onClick={handleGenerateReport}
        />
      </Box>
    </Box>
  );
};
