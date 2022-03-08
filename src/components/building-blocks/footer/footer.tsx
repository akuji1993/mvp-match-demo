import React from "react";
import { Anchor, Box, Footer as GrommetFooter } from "grommet";

export const Footer = () => {
  return (
    <GrommetFooter pad="medium">
      <Box direction="row" align="center" gap="medium">
        <Anchor href="#" label="Terms &amp; Conditions" />
        <Anchor href="#" label="Privacy Policy" />
      </Box>
    </GrommetFooter>
  );
};
