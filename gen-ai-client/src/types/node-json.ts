export type OptionType = {
  label: string;
  value: string;
};

export type InputElementType = {
  id: string;
  type: "text" | "radio" | "select";
  label: string;
  defaultValue: string;
  options?: OptionType[];
  description: string;
};
