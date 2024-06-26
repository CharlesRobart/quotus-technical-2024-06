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
    <Box  display="flex" w="100%" h="300px">
      <Bar
        key={chartKey}
        data={barChartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
            x: { // Ajoutez cette section pour configurer l'axe des abscisses
              ticks: {
                font: {
                  size: 8, // Définissez la taille de la police souhaitée ici
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default KpiBarChart;
