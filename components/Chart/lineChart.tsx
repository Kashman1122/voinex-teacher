// "use client"

// import { TrendingUp } from "lucide-react"
// import { LabelList, Pie, PieChart } from "recharts"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   type ChartConfig,
// } from "@/components/ui/chart"

// interface APIUsagePieChartProps {
//   dashboardData: {
//     summary: {
//       total_damini_usage?: number;
//       total_project_builder_usage?: number;
//     };
//     api_usage: {
//       damini_usage?: { percentage?: number };
//       project_builder_usage?: { percentage?: number };
//     };
//   };
// }

// const chartConfig = {
//   usage: {
//     label: "Usage",
//   },
//   damini: {
//     label: "Damini AI",
//     color: "var(--chart-1)",
//   },
//   projectBuilder: {
//     label: "Project Builder",
//     color: "var(--chart-2)",
//   },
// } satisfies ChartConfig

// export function APIUsagePieChart({ dashboardData }: any) {
//   const chartData = [
//     { 
//       service: "damini", 
//       usage: dashboardData.summary.total_damini_usage || 0,
//       fill: "var(--color-damini)"
//     },
//     { 
//       service: "projectBuilder", 
//       usage: dashboardData.summary.total_project_builder_usage || 0,
//       fill: "var(--color-projectBuilder)"
//     },
//   ]

//   const totalUsage = (dashboardData.summary.total_damini_usage || 0) + 
//                      (dashboardData.summary.total_project_builder_usage || 0)
  
//   const daminiPercentage = dashboardData.api_usage.damini_usage?.percentage || 0
//   const builderPercentage = dashboardData.api_usage.project_builder_usage?.percentage || 0

//   return (
//     <div className="space-y-4">
//       <Card className="flex flex-col">
//         <CardHeader className="items-center pb-0">
//           <CardTitle>API Usage Distribution</CardTitle>
//           <CardDescription>Total usage breakdown by service</CardDescription>
//         </CardHeader>
//         <CardContent className="flex-1 pb-0">
//           <ChartContainer
//             config={chartConfig}
//             className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
//           >
//             <PieChart>
//               <ChartTooltip
//                 content={<ChartTooltipContent nameKey="usage" hideLabel />}
//               />
//               <Pie data={chartData} dataKey="usage">
//                 <LabelList
//                   dataKey="service"
//                   className="fill-background"
//                   stroke="none"
//                   fontSize={12}
//                   formatter={(value: keyof typeof chartConfig) =>
//                     chartConfig[value]?.label
//                   }
//                 />
//               </Pie>
//             </PieChart>
//           </ChartContainer>
//         </CardContent>
//         <CardFooter className="flex-col gap-2 text-sm">
//           <div className="flex items-center gap-2 leading-none font-medium">
//             Total API Usage: {totalUsage} <TrendingUp className="h-4 w-4" />
//           </div>
//           <div className="text-muted-foreground leading-none">
//             Damini AI: {daminiPercentage}% | Project Builder: {builderPercentage}%
//           </div>
//         </CardFooter>
//       </Card>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
//           <p className="text-xs text-muted-foreground mb-1">Damini AI Usage</p>
//           <p className="text-2xl font-bold text-blue-600">
//             {dashboardData.summary.total_damini_usage || 0}
//           </p>
//           <p className="text-xs text-muted-foreground mt-1">
//             ({daminiPercentage}% of total)
//           </p>
//         </Card>

//         <Card className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl">
//           <p className="text-xs text-muted-foreground mb-1">Project Builder Usage</p>
//           <p className="text-2xl font-bold text-purple-600">
//             {dashboardData.summary.total_project_builder_usage || 0}
//           </p>
//           <p className="text-xs text-muted-foreground mt-1">
//             ({builderPercentage}% of total)
//           </p>
//         </Card>
//       </div>
//     </div>
//   )
// }

