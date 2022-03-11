import { Box } from "grommet";
import React from "react";
import { ReactComponent as GraphIcon } from "../../../assets/images/graph.svg";
import { ReactComponent as SquaresIcon } from "../../../assets/images/squares.svg";
import { ReactComponent as ComputerIcon } from "../../../assets/images/computer.svg";
import { ReactComponent as PieChartIcon } from "../../../assets/images/pie-chart.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/images/logout.svg";

export const SidebarContent = () => {
  return (
    <Box pad={{ horizontal: "medium", vertical: "large" }} gap="medium">
      <GraphIcon />
      <SquaresIcon />
      <ComputerIcon />
      <PieChartIcon />
      <LogoutIcon />
    </Box>
  );
};
