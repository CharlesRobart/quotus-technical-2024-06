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
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This forces the graph to re-render by changing its key when the sidenav changes.
    setChartKey(prevKey => prevKey + 1);
  }, [sidenavWidth, sidenavTransition]);

  // This useEffect sets up a ResizeObserver on the chart container to trigger a re-render of the chart when its size changes.
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setChartKey(prevKey => prevKey + 1);
    });
  
    const currentChartContainerRef = chartContainerRef.current;
  
    if (currentChartContainerRef) {
      resizeObserver.observe(currentChartContainerRef);
    }
  
    return () => {
      if (currentChartContainerRef) {
        resizeObserver.unobserve(currentChartContainerRef);
      }
    };
  }, []);
  

  return (
    <Box  display="flex" w="100%" maxW="100%" h={{ base: "200px", md: "300px" }} overflow="hidden">
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
            x: { 
              ticks: {
                callback: function(value, index, values) {
                  const label = typeof value === "string" ? value : this.getLabelForValue(value);
                  return label.length > 10 ? label.substr(0, 10) + '...' : label;
                },
                font: {
                  size: 8,
                },
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.dataset.label; 
                }
              }
            }
          },
          elements: {
            bar: {
              borderRadius: 2.5,
            },
          },
        }}
      />
    </Box>
  );
};

export default KpiBarChart;
