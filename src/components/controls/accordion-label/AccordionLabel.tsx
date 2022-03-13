import React, { FunctionComponent } from "react";
import styling from "./AccordionLabel.module.scss";

interface AccordionLabelProps {
  label: string;
  total: number;
}

export const AccordionLabel: FunctionComponent<AccordionLabelProps> = ({
  label,
  total,
}) => {
  return (
    <div className={styling.AccordionLabel}>
      <label className={styling.name}>{label}</label>
      <label className={styling.total}>TOTAL: {total} USD</label>
    </div>
  );
};
