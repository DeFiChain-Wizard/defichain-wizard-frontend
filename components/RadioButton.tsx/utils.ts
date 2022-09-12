export const isChecked = ({
  value,
  contextValue,
}: {
  value: string;
  contextValue?: string;
}) => {
  if (contextValue !== undefined && contextValue !== null) {
    return contextValue === value ? "checked" : "unchecked";
  }
};