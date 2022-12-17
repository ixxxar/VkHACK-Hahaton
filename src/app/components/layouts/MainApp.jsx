import { View } from "@vkontakte/vkui";
import { useState } from "react";
import MainTabs from "../common/MainTabs/MainTabs";
import AccountPanel from "../panels/Account/AccountPanel";
import FormsPanel from "../panels/FormsPanel/Forms";

const MainApp = ({ fetchedUser }) => {
  const [selected, setSelected] = useState("forms");
  return (
    <>
      {/* <MainTabs selected={selected} go={setSelected} /> */}
      <View activePanel={selected}>
        <AccountPanel go={setSelected} fetchedUser={fetchedUser} id="account" />
        <FormsPanel
          selected={selected}
          setSelected={setSelected}
          go={setSelected}
          fetchedUser={fetchedUser}
          id="forms"
        />
      </View>
    </>
  );
};

export default MainApp;
