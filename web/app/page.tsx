"use client";

import { Boxes } from "@/components/ui/background-boxes";
import { Meteors } from "@/components/ui/meteors";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, } from "@/components/ui/form"
import FormInput from "@/components/form-input";
import FormInputComboBox from "@/components/form-input-combobox";
import ComboboxForm from "@/components/comboboxform";
 
const formSchema = z.object({
  batting_team: z.string(),
  bowling_team: z.string(),
  city: z.string(),
  current_score: z.number(),
  balls_left: z.number(),
  wickets_left: z.number()
})

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batting_team: "",
      bowling_team: "",
      city: "",
      current_score: 0,
      balls_left: 0,
      wickets_left: 0
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <Meteors number={20} />

      <div className="w-128 bg-secondary p-6 rounded-xl z-40">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormInputComboBox 
              form = {form}
              name = "batting_team"
              label = "Batting Team"
              placeholder = "Australia"
            />
            <FormInput 
              form = {form}
              name = "batting_team"
              label = "Batting Team"
              placeholder = "Australia"
            />
            <FormInput 
              form = {form}
              name = "bowling_team"
              label = "Bowling Team"
              placeholder = "India"
            />
            <FormInput 
              form = {form}
              name = "city"
              label = "City"
              placeholder = "Sydney"
            />
            <FormInput 
              form = {form}
              name = "current_score"
              label = "Current Score"
              placeholder = "100"
            />
            <FormInput 
              form = {form}
              name = "balls_left"
              label = "Balls Left"
              placeholder = ""
            />
            <FormInput 
              form = {form}
              name = "batting_team"
              label = "Batting Team"
              placeholder = "Australia"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
    </div>

    </div>
  );
}
