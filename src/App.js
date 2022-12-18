import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  WebviewType,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import WelcomeScreen from "./app/components/pages/Welcome";
import RegisterPanel from "./app/components/pages/Registration";
import MainApp from "./app/components/layouts/MainApp";
import ModalComponent from "./app/components/common/Modal/Modal";
import AppLoader from "./app/components/layouts/appLoader";
import UniSelect from "./app/components/pages/UniSelect";

const App = () => {
  const [scheme, setScheme] = useState("bright_light");
  const [activePanel, setActivePanel] = useState("welcome");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        setScheme(data.scheme);
      }
    });

    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go = (e) => {
    if (typeof e === "string") {
      setActivePanel(e);
    } else {
      setActivePanel(e.currentTarget.dataset.to);
    }
  };

  return (
    <ConfigProvider isWebView scheme={scheme}>
      <AdaptivityProvider>
        <AppRoot>
          {fetchedUser && (
            <SplitLayout
              modal={
                <ModalComponent
                  fetchedUser={fetchedUser}
                  activeModal={activeModal}
                  go={go}
                  setActiveModal={setActiveModal}
                />
              }
              popout={popout}
            >
              <SplitCol>
                <AppLoader>
                  <View activePanel={activePanel}>
                    <WelcomeScreen
                      id="welcome"
                      fetchedUser={fetchedUser}
                      go={go}
                    />
                    <RegisterPanel
                      id="register"
                      fetchedUser={fetchedUser}
                      go={go}
                    />
                    <UniSelect
                      id="uniselect"
                      fetchedUser={fetchedUser}
                      go={go}
                    />
                    <MainApp
                      activeModal={activeModal}
                      setActiveModal={setActiveModal}
                      id="mainapp"
                      fetchedUser={fetchedUser}
                      go={go}
                    />
                  </View>
                </AppLoader>
              </SplitCol>
            </SplitLayout>
          )}
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
