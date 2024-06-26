import {
  Box,
  Flex,
  FlexProps,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { Dealership, Kpi, KpiData, Option } from "@/typescript/interfaces";
import type { KpiManagerResponse } from "@pages/api/kpi-manager";
import {
  getReactSelectOptionsFromDealerships,
  getReactSelectOptionsFromKpis,
} from "@utils/helper";
import {
  Chart,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  Filler,
} from "chart.js";
import { useTableConfig } from "@hooks/useKpiTableConfig";
import { useKpiByFormatBarChart } from "@/hooks/useKpiByFormatBarChart";
import { useKpiByFormatAndFirstWordLineChart } from "@/hooks/useKpiByFormatAndFirstWordLineChart";
import SideNav from "@/components/main/SideNav";
import MainContent from "@/components/main/MainContent";
import KpiSelector from "@/components/kpitable/KpiSelector";
import KpiTable from "@/components/kpitable/KpiTable";
import GroupByFormatSelector from "@/components/kpibarchart/GroupByFormatSelector";
import KpiBarChart from "@/components/kpibarchart/KpiBarChart";
import GroupByFormatAndFirstWordSelector from "@/components/kpilinechart/GroupByFormatAndFirstWordSelector";
import KpiLineChart from "@/components/kpilinechart/KpiLineChart";

Chart.register(
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
);

const Home = () => {
  const [dealerships, setDealerships] = useState<Dealership[]>([]);
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [kpiData, setKpiData] = useState<KpiData[]>([]);
  const [groupedByFormat, setGroupedbyFormatKpis] = useState<
    Record<string, Kpi[]>
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const [groupedByFormatAndFirstWord, setGroupedbyFormatAndFirstWordKpis] =
    useState<Record<string, Kpi[]>>({});
  const [selectedDealerships, setSelectedDealerships] = useState<Option[]>([]);
  const [selectedKpis, setSelectedKpis] = useState<Option[]>([]);
  const [selectedKpiFormatGroup, setSelectedKpiFormatGroup] =
    useState<Option>();
  const [
    selectedKpiFormatAndFirstWordGroup,
    setSelectedKpiFormatAndFirstWordGroup,
  ] = useState<Option>();

  const { isOpen, onToggle } = useDisclosure();

  const kpiManagerApi = "/api/kpi-manager";

  // FETCHES
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(kpiManagerApi);
      const data: KpiManagerResponse = await response.json();

      const {
        dealerships,
        groupedByFormatKpis: groupedKpis,
        kpiData,
        allKpis,
        groupedByFormatAndFirstWordKpis,
      } = data;

      setDealerships(dealerships);
      setKpis(allKpis);
      setKpiData(kpiData);
      setGroupedbyFormatKpis(groupedKpis);
      setGroupedbyFormatAndFirstWordKpis(groupedByFormatAndFirstWordKpis);
      setLoading(false);
    };

    fetchData();
  }, []);

  // CUSTOM HOOKS
  // custom hook getting the react-table config
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTableConfig({ selectedDealerships, selectedKpis, kpiData });

  // custom hook getting the data chartjs charts
  const barChartData = useKpiByFormatBarChart({
    groupedByFormat,
    kpiData,
    selectedKpiFormatGroup,
    selectedDealerships,
  });

  const lineChartData = useKpiByFormatAndFirstWordLineChart({
    groupedByFormatAndFirstWord,
    kpiData,
    selectedKpiFormatAndFirstWordGroup,
    selectedDealerships,
  });

  const sidenavWidth = isOpen ? "250px" : "0";
  const sidenavTransition = "width 0.4s";

  const flexChartContainerStyles: FlexProps = {
    direction: 'column',
    flex: '1',
    p: '10px',
    w: { base: '100%', md: '400px' },
    maxW: '100%',
    backgroundColor: 'white',
    border: '1px solid #E2E2E2',
    borderRadius: '10px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidenav */}
      <SideNav
        isOpen={isOpen}
        onToggle={onToggle}
        sidenavWidth={sidenavWidth}
        sidenavTransition={sidenavTransition}
      />

      {/* Main Content */}
      <Box flex="1" >
        <MainContent 
          isOpen={isOpen} 
          onToggle={onToggle}
          dealerships={getReactSelectOptionsFromDealerships(dealerships)}
          selectedDealerships={selectedDealerships}
          setSelectedDealerships={setSelectedDealerships}
          >

        {/* KPI */}
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" w="100%" h="100%" p="10px" backgroundColor="#F9F9F9" boxShadow="inset 0 0 10px #E2E2E2">

            {selectedDealerships.length > 0 && (
              <Box  display="flex" flexDirection="column" w="{`calc(100vw - ${sidenavWidth})`}" transition={sidenavTransition}>
                
                  <Flex w="{`calc(100vw - ${sidenavWidth})`}" transition={sidenavTransition} mb={4} gap="10px" flexWrap="wrap">
                  
                    {/* Bar Chart */}
                    <Flex {...flexChartContainerStyles} >
                      <GroupByFormatSelector
                        groupedByFormat={groupedByFormat}
                        selectedKpiFormatGroup={selectedKpiFormatGroup}
                        setSelectedKpiFormatGroup={setSelectedKpiFormatGroup}
                      />
                      
                      <KpiBarChart
                      barChartData={barChartData}
                      sidenavWidth={sidenavWidth}
                      sidenavTransition={sidenavTransition}
                      />
                    </Flex>

                    {/* Line Chart */}
                    <Flex {...flexChartContainerStyles}>
                      <GroupByFormatAndFirstWordSelector
                        groupedByFormatAndFirstWord={groupedByFormatAndFirstWord}
                        selectedKpiFormatAndFirstWordGroup={selectedKpiFormatAndFirstWordGroup}
                        setSelectedKpiFormatAndFirstWordGroup={setSelectedKpiFormatAndFirstWordGroup}
                      />

                      <KpiLineChart 
                      lineChartData={lineChartData}
                      sidenavWidth={sidenavWidth}
                      sidenavTransition={sidenavTransition}
                      />
                    </Flex>
                  </Flex>

                <Box display="flex" flexDirection="column"  w="auto" p="10px" backgroundColor="white" border="1px solid #E2E2E2" borderRadius="10" boxShadow="2px 2px 5px rgba(0, 0, 0, 0.1)">
                  {/* Kpi Table */}
                  <KpiSelector
                  kpis={getReactSelectOptionsFromKpis(kpis)}
                  selectedKpis={selectedKpis}
                  setSelectedKpis={setSelectedKpis}
                  />

                  <KpiTable
                  getTableProps={getTableProps}
                  getTableBodyProps={getTableBodyProps}
                  headerGroups={headerGroups}
                  rows={rows}
                  prepareRow={prepareRow}
                  />
                </Box>

              </Box>
            )}
          </Box>
        </MainContent>
      </Box>
    </Box>
  );
};

export default Home;


