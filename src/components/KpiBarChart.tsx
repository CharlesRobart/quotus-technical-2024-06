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
          aspectRatio: 2,
          scales: {
            y: {
              beginAtZero: true,
            },
            x: { // Ajoutez cette section pour configurer l'axe des abscisses
              ticks: {
                callback: function(value, index, values) {
                  const label = typeof value === 'string' ? value : this.getLabelForValue(value);
                  return label.length > 10 ? label.substr(0, 10) + '...' : label;
                },
                font: {
                  size: 8, // Définissez la taille de la police souhaitée ici
                },
              },
              grid: {
                display: false, // Supprime les lignes verticales du graphique
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.dataset.label; // Affiche le label complet dans le tooltip
                }
              }
            }
          },
          elements: {
            bar: {
              borderRadius: 2.5, // Valeur du border radius souhaitée
            },
          },
        }}
      />
    </Box>
  );
};

export default KpiBarChart;
