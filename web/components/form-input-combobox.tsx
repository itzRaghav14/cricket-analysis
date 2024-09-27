"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

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

interface FormInputComboboxProps {
  form: any | FormInterface;
  name: string;
  label: string;
  placeholder: string;
  description: string | undefined;
}

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

export default function FormInputCombobox({ form, name, label, placeholder, description }: FormInputComboboxProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center">
          <FormLabel className="w-1/2">{label}</FormLabel>
          <Popover className="w-1/2">
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-auto justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? languages.find(
                        (language) => language.value === field.value,
                      )?.label
                    : "Select language"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup className="pointer-events-auto">
                  <CommandList className="pointer-events-auto">
                    {languages.map((language) => (
                      <CommandItem
                        value={language.label}
                        key={language.value}
                        className="pointer-events-auto"
                        onSelect={() => {
                          form.setValue(name, language.value);
                        }}
                      >
                        {language.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            language.value === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
