import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

type FormInterface = UseFormReturn<{
    batting_team: string;
    bowling_team: string;
    city: string;
    current_score: number;
    balls_left: number;
    wickets_left: number;
}, any, undefined>

enum InputType {
  batting_team = "batting_team",
  bowling_team = "bowling_team",
  city = "city",
  current_score = "current_score",
  balls_left = "balls_left",
  wickets_left = "wickets_left"
}

interface FormInputProps {
  form: any | FormInterface;
  name: string;
  label: string;
  placeholder: string;
  description: string | undefined;
}

export default function FormInput({form, name, label, placeholder, description}: FormInputProps | any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            <FormLabel className="w-1/2">{label}</FormLabel>
            <FormControl className="w-1/2">
              <Input placeholder={placeholder} {...field} />
            </FormControl>
          </div>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
