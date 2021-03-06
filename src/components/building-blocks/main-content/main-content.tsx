import { Main } from "grommet";
import React, { FunctionComponent } from "react";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: FunctionComponent<MainContentProps> = (props) => {
  return <Main pad="medium">{props.children}</Main>;
};
