import { Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { useEffect, useRef } from "react";

interface KpiLineChartProps {
  lineChartData: any;
  sidenavWidth: string;
  sidenavTransition: string;
}

const KpiLineChart = ({ lineChartData, sidenavWidth, sidenavTransition }: KpiLineChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && (chartRef.current as any).chartInstance) {
      (chartRef.current as any).chartInstance.resize();
    }
  }, [sidenavWidth, sidenavTransition]);

  return (
    <Box h="300px" w={`calc(100vw - ${sidenavWidth})`} transition={sidenavTransition}>
      <Line
        data={lineChartData}
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

export default KpiLineChart;
