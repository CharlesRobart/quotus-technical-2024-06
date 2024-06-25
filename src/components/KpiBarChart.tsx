import { Box } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";

interface KpiBarChartProps {
  barChartData: any;
  sidenavWidth: string;
  sidenavTransition: string;
}

const KpiBarChart = ({ barChartData, sidenavWidth, sidenavTransition }: KpiBarChartProps) => {
  
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    // Ceci force le re-rendu du graphique en changeant sa clé lorsque la sidenav change
    setChartKey(prevKey => prevKey + 1);
  }, [sidenavWidth, sidenavTransition]);

  return (
    <Box  display="flex" w="100%">
      <Bar
        key={chartKey}
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
