import { Box } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";

interface KpiBarChartProps {
  barChartData: any;
  sidenavWidth: string;
  sidenavTransition: string;
}

const KpiBarChart = ({ barChartData, sidenavWidth, sidenavTransition }: KpiBarChartProps) => (
  <Box h="300px" w={`calc(100vw - ${sidenavWidth})`} transition={sidenavTransition}>
    <Bar
      data={barChartData}
      options={{
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  </Box>
);

export default KpiBarChart;
