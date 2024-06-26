import { Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";

interface KpiLineChartProps {
  lineChartData: any;
  sidenavWidth: string;
  sidenavTransition: string;
}

const KpiLineChart = ({ lineChartData, sidenavWidth, sidenavTransition }: KpiLineChartProps) => {
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    // Ceci force le re-rendu du graphique en changeant sa clé lorsque la sidenav change
    setChartKey(prevKey => prevKey + 1);
  }, [sidenavWidth, sidenavTransition]);

  return (
    <Box  display="flex" w="100%" h="300px">
      <Line
        key={chartKey}
        data={lineChartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 8, // Taille de la police de la légende
                },
              },
            },
          },
        }}
      />
    </Box>
    );
  };

export default KpiLineChart;
