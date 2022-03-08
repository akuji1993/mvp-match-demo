import {
  Box,
  Button,
  DateInput,
  FormField,
  Heading,
  Select,
  Text,
} from "grommet";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { api, Gateway, Project } from "../../../api";
import styling from "./toolbar.module.scss";

export const Toolbar = () => {
  const projectResult = useQuery("projects", api.project.getProjects);
  const gatewayResult = useQuery("gateway", api.gateway.getGateways);
  const [projects, setProjects] = useState<Project[] | undefined>();
  const [gateways, setGateways] = useState<Gateway[] | undefined>();
  const [selectedGateway, setSelectedGateway] = useState();
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    if (projectResult.data) {
      setProjects(projectResult.data.data);
    }
  }, [projectResult]);

  useEffect(() => {
    if (gatewayResult.data) {
      setGateways(gatewayResult.data.data);
    }
  }, [gatewayResult]);

  return (
    <Box className={styling.Toolbar} direction="row">
      <Box>
        <Heading level={2}>Reports</Heading>
        <Text>Easily generate a report of your transactions</Text>
      </Box>
      <Box direction="row" align="center">
        {projects && (
          <Select
            className={styling.select}
            placeholder="Select Project"
            value={selectedProject}
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
            valueKey="gatewayId"
            labelKey="name"
          />
        )}
        <FormField label="von">
          <DateInput
            format="yyyy-mm-dd"
            value={new Date().toISOString()}
            onChange={({ value }) => {}}
          />
        </FormField>
        <FormField label="bis">
          <DateInput
            format="yyyy-mm-dd"
            value={new Date().toISOString()}
            onChange={({ value }) => {}}
          />
        </FormField>
        <Button label="Generate report" primary style={{ color: "white" }} />
      </Box>
    </Box>
  );
};
