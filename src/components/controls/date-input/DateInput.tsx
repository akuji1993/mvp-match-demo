import React, { FunctionComponent } from "react";
import styling from "./DateInput.module.scss";
import { format } from "date-fns";

interface DateInputProps {
  value?: Date;
  onChange: (date: Date) => void;
  placeholderLabel?: string;
}

export const DateInput: FunctionComponent<DateInputProps> = ({
  onChange,
  value,
  placeholderLabel,
}) => {
  return (
    <input
      className={styling.DateInput}
      type="date"
      placeholder={placeholderLabel}
      value={value ? format(value, "yyyy-MM-dd") : undefined}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        onChange(newDate);
      }}
    />
  );
};
