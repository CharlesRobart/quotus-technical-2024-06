import Select from "react-select";
import  NoSSR  from "react-no-ssr";
import { Option } from "@/typescript/interfaces";

interface KpiSelectorProps {
  kpis: Option[];
  selectedKpis: Option[];
  setSelectedKpis: (options: Option[]) => void;
}

const KpiSelector = ({ kpis, selectedKpis, setSelectedKpis }: KpiSelectorProps) => (
  <NoSSR>
    <Select
      isMulti
      isClearable
      options={kpis}
      onChange={(selectedOptions) => setSelectedKpis(selectedOptions as Option[])}
      value={selectedKpis}
      placeholder="Then you can select KPIs for the table"
    />
  </NoSSR>
);

export default KpiSelector;
