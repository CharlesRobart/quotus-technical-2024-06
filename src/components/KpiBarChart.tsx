import { Box } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";

interface KpiBarChartProps {
  barChartData: any;
  sidenavWidth: string;
  sidenavTransition: string;
}

const KpiBarChart = ({ barChartData, sidenavWidth, sidenavTransition }: KpiBarChartProps) => {

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && (chartRef.current as any).chartInstance) {
      (chartRef.current as any).chartInstance.resize();
    }
  }, [sidenavWidth, sidenavTransition]);

  return (
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
};

export default KpiBarChart;
