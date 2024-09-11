"use client";

import { experimental_useObject as useObject } from "ai/react";

import {
	Audience,
	DurationUnit,
	classProgramFormSchema,
	classProgramResponseSchema,
} from "@/classProgramSchema";
import { RHFInput } from "@/components/inputs/RHFInput";
import { RHFTextarea } from "@/components/inputs/RHFTextArea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { enumToArray } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export default function Page() {
	const form = useForm<z.infer<typeof classProgramFormSchema>>({
		resolver: zodResolver(classProgramFormSchema),
		defaultValues: {},
	});

	const { object, submit, isLoading, error } = useObject({
		schema: classProgramResponseSchema,
		api: "/api",
	});

	function onSubmit(values: z.infer<typeof classProgramFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		submit({
			prompt: values,
		});
	}

	return (
		<div className="grid grid-cols-2 gap-4 mt-10">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-xl mx-auto w-full"
				>
					<RHFInput
						label="Subject"
						name="subject"
						placeholder="Enter the subject of the class program"
						control={form.control}
					/>

					<RHFTextarea
						label="Objetive"
						name="objective"
						placeholder="Enter the objective of the class program"
						control={form.control}
					/>

					<div className="grid grid-cols-3 gap-4">
						<RHFInput
							label="Duration"
							name="duration"
							placeholder="Enter the duration of the class program"
							control={form.control}
							type="number"
						/>

						<FormField
							control={form.control}
							name="durationUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Duration Unit</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a duration unit" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{enumToArray(DurationUnit).map((durationUnit) => (
												<SelectItem
													key={durationUnit.key}
													value={durationUnit.key}
												>
													{durationUnit.key}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="targetAudience"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Target Audience</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a target audience" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{enumToArray(Audience).map((audience) => (
												<SelectItem key={audience.key} value={audience.key}>
													{audience.key}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<RHFTextarea label="Notes" name="notes" control={form.control} />

					<Button type="submit" disabled={isLoading}>
						Submit
					</Button>
				</form>
			</Form>

			{isLoading && <p>Loading...</p>}

			{error && <p>Error: {error.message}</p>}

			{object && (
				<div className="p-4 max-w-2xl mx-auto w-full space-y-2">
					<Card>
						<CardContent className="mt-6">
							<p>Intro</p>
							<p>{object?.intro}</p>
							<br />
							<p>Goal</p>
							<p>{object?.goals}</p>
						</CardContent>
					</Card>

					{object?.structure?.map((struct) => (
						<Alert key={struct?.title}>
							<AlertTitle>{struct?.title}</AlertTitle>
							<AlertDescription>{struct?.description}</AlertDescription>

							{struct?.subSections?.map((subStruct) => (
								<Alert key={subStruct?.title} className="my-2 p-2">
									<AlertTitle>{subStruct?.title}</AlertTitle>
									<AlertDescription>{subStruct?.description}</AlertDescription>
								</Alert>
							))}
						</Alert>
					))}
				</div>
			)}
		</div>
	);
}
