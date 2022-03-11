import React from "react";
import { ReactComponent as EmptyImg } from "../../../assets/images/empty.svg";
import styling from "./empty-state.module.scss";

export const EmptyState = () => {
  return (
    <div className={styling.EmptyState}>
      <h2>No Reports</h2>
      <p>
        Currently you have no data for the reports to be generated. Once you
        start generating traffic through the Balance application the reports
        will be shown.
      </p>
      <EmptyImg />
    </div>
  );
};
