import { Input, type ChInputProps } from "./Input";

export type ChInputTextProps = Omit<ChInputProps, "type">;

export function InputText(props: ChInputTextProps) {
  return <Input type="text" {...props} />;
}
