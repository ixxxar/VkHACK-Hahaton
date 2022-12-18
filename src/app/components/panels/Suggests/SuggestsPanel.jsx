import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import logo from "../../../vendor/icons/logo.svg";
import MainTabs from "../../common/MainTabs/MainTabs";
import "./Suggests.css";
const SuggestsPanel = ({ id, selected, setSelected }) => {
  return (
    <Panel className="search_panel" id={id}>
      <PanelHeader
        before={<PanelHeaderBack />}
        className="panel_header"
        separator={false}
      >
        <img src={logo} alt="logo" /> Студ Биржа
      </PanelHeader>
      <MainTabs selected={selected} go={setSelected} />
      {/* ТВой контент здесь */}
    </Panel>
  );
};

export default SuggestsPanel;
