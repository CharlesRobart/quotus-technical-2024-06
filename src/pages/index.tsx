import {
  Box,
  Flex,
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
import SideNav from "@/components/SideNav";
import MainContent from "@/components/MainContent";
import DealershipSelector from "@/components/DealershipSelector";
import KpiSelector from "@/components/KpiSelector";
import KpiTable from "@/components/KpiTable";
import KpiGroupByFormatSelector from "@/components/KpiGroupByFormatSelector";
import KpiBarChart from "@/components/KpiBarChart";
import KpiGroupByFormatAndFirstWordSelector from "@/components/KpiGroupByFormatAndFirstWordSelector";
import KpiLineChart from "@/components/KpiLineChart";

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
  const sidenavTransition = "width 0.3s";

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
      <Box flex="1" p="4">
        <MainContent isOpen={isOpen} onToggle={onToggle}>

        {/* Dealership Selector */}

          <DealershipSelector
            dealerships={getReactSelectOptionsFromDealerships(dealerships)}
            selectedDealerships={selectedDealerships}
            setSelectedDealerships={setSelectedDealerships}
          />

          {/* KPI Selector */}
          {selectedDealerships.length > 0 && (
            <>
              
              
                <Flex w="auto" mb={4} gap="10px">
                
                  {/* Kpi Group by format Selector */}
                  <Flex direction="column" flex="1">
                    <KpiGroupByFormatSelector
                      groupedByFormat={groupedByFormat}
                      selectedKpiFormatGroup={selectedKpiFormatGroup}
                      setSelectedKpiFormatGroup={setSelectedKpiFormatGroup}
                    />

                    {/* Bar Chart */}
                    <KpiBarChart
                    barChartData={barChartData}
                    sidenavWidth={sidenavWidth}
                    sidenavTransition={sidenavTransition}
                    />
                  </Flex>

                  {/* Kpi by format and first word selector */}
                  <Flex direction="column" flex="1">
                    <KpiGroupByFormatAndFirstWordSelector
                      groupedByFormatAndFirstWord={groupedByFormatAndFirstWord}
                      selectedKpiFormatAndFirstWordGroup={selectedKpiFormatAndFirstWordGroup}
                      setSelectedKpiFormatAndFirstWordGroup={setSelectedKpiFormatAndFirstWordGroup}
                    />

                    {/* Line Chart */}
                    <KpiLineChart
                    lineChartData={lineChartData}
                    sidenavWidth={sidenavWidth}
                    sidenavTransition={sidenavTransition}
                    />
                  </Flex>
                </Flex>
            

              <KpiSelector
              kpis={getReactSelectOptionsFromKpis(kpis)}
              selectedKpis={selectedKpis}
              setSelectedKpis={setSelectedKpis}
              />
              {/* Kpi Table */}
              <KpiTable
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              />

            </>
          )}
        </MainContent>
      </Box>
    </Box>
  );
};

export default Home;


