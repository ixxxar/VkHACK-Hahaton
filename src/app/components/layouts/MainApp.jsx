import {
  Group,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderBack,
  View,
} from "@vkontakte/vkui";
import { useState } from "react";
import MainTabs from "../common/MainTabs/MainTabs";
import AccountPanel from "../panels/Account/AccountPanel";
import FormsPanel from "../panels/FormsPanel/Forms";
import SuggestsPanel from "../panels/Suggests/SuggestsPanel";

const MainApp = ({ fetchedUser, activeModal, setActiveModal }) => {
  const [selected, setSelected] = useState("suggests");
  return (
    <>
      {/* <MainTabs selected={selected} go={setSelected} /> */}
      <View activePanel={selected}>
        <AccountPanel
          selected={selected}
          setSelected={setSelected}
          go={setSelected}
          fetchedUser={fetchedUser}
          id="account"
          setActiveModal={setActiveModal}
        />
        <FormsPanel
          selected={selected}
          setSelected={setSelected}
          go={setSelected}
          fetchedUser={fetchedUser}
          id="forms"
        />
        <SuggestsPanel
          selected={selected}
          setSelected={setSelected}
          go={setSelected}
          fetchedUser={fetchedUser}
          id="suggests"
        />
      </View>
    </>
  );
};

export default MainApp;
