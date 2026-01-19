import { useFormContext, useWatch } from "react-hook-form";

import Input from "@/components/ui/shadcn/input";

export default function FormInput({
  formKey,
  ...inputAttributes
}: React.ComponentProps<typeof Input> & { formKey: string }) {
  const form = useFormContext();

  const value = useWatch({ name: formKey }) as string;

  return (
    <Input
      {...inputAttributes}
      value={value}
      onChange={(e) => form.setValue(formKey, e.target.value)}
    />
  );
}
