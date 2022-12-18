import { useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import vuzService from "../../service/vuz.service";
import specializationService from "../../service/specialization.service";

const AppLoader = ({ children }) => {
  useEffect(async () => {
    const content = await vuzService.get();

    await bridge.send("VKWebAppStorageSet", {
      key: "vuz",
      value: JSON.stringify(content),
    });
    const specContent = await specializationService.get();

    await bridge.send("VKWebAppStorageSet", {
      key: "specialization",
      value: JSON.stringify(specContent),
    });
  }, []);
  return children;
};

export default AppLoader;
