import {
  Button,
  CustomSelect,
  DateInput,
  FormItem,
  FormLayout,
  IconButton,
  Input,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  PanelHeaderClose,
  Text,
  Title,
} from "@vkontakte/vkui";
import { Icon16Clear } from "@vkontakte/icons";
import "./registerScreen.css";
import React, { useEffect, useState } from "react";
import userService from "../../service/user.service";
import logo from "../../vendor/icons/uni_logo.png";
import bridge from "@vkontakte/vk-bridge";

const UniSelect = ({ go, fetchedUser, id }) => {
  if (!fetchedUser) {
    return "Loading...";
  }
  async function getVuz() {
    const vuz = await bridge.send("VKWebAppStorageGet", {
      keys: ["vuz", "specialization"],
    });
    return vuz;
  }
  const [vuz, setVuz] = useState(null);
  const [data, setData] = useState({
    vuz: "",
    spec: "",
  });
  const [spec, setSpec] = useState(null);
  useEffect(async () => {
    const info = await getVuz();
    const vuzObj = [];
    const specObj = [];
    Object.entries(JSON.parse(info.keys[0].value)).forEach((i) => {
      vuzObj.push({ label: i[1], value: i[0] });
    });
    Object.entries(JSON.parse(info.keys[1].value)).forEach((i) => {
      specObj.push({ label: i[1], value: i[0] });
    });
    setVuz(vuzObj);
    setSpec(specObj);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userService.updateUser({
      _id: fetchedUser.id,
      ...data,
      about: "",
    });
    go("mainapp");
  };
  return (
    <Panel id={id} style={{ background: "white" }}>
      <div className="panel_header">
        <button
          onClick={() => go("welcome")}
          className="panel_header_container"
        >
          <svg
            width="7"
            height="14"
            viewBox="0 0 7 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.37994 1.04904e-05C6.29881 -0.000432968 6.21838 0.0142784 6.14327 0.0433025C6.06816 0.0723276 5.99984 0.115094 5.94224 0.169148L0.905575 4.93417C0.618521 5.20505 0.390774 5.52685 0.235381 5.88114C0.0799875 6.23543 0 6.61524 0 6.99881C0 7.38239 0.0799875 7.7622 0.235381 8.11648C0.390774 8.47077 0.618521 8.79257 0.905575 9.06346L5.94224 13.8285C5.99972 13.8829 6.06796 13.926 6.14306 13.9554C6.21816 13.9849 6.29865 14 6.37994 14C6.46123 14 6.54172 13.9849 6.61683 13.9554C6.69193 13.926 6.76017 13.8829 6.81765 13.8285C6.87512 13.7741 6.92072 13.7095 6.95183 13.6385C6.98294 13.5674 6.99895 13.4913 6.99895 13.4144C6.99895 13.3375 6.98294 13.2613 6.95183 13.1903C6.92072 13.1192 6.87512 13.0547 6.81765 13.0003L1.78098 8.23527C1.43464 7.9072 1.2401 7.46248 1.2401 6.99881C1.2401 6.53514 1.43464 6.09043 1.78098 5.76236L6.81765 0.997339C6.87543 0.94312 6.92129 0.878614 6.95259 0.807542C6.98389 0.736469 7 0.660237 7 0.583244C7 0.50625 6.98389 0.430018 6.95259 0.358946C6.92129 0.287873 6.87543 0.223368 6.81765 0.169148C6.76004 0.115094 6.69173 0.0723276 6.61662 0.0433025C6.5415 0.0142784 6.46108 -0.000432968 6.37994 1.04904e-05Z"
              fill="#939393"
            />
          </svg>
          <Text>Назад</Text>
        </button>
      </div>
      <div className="welcome_container">
        <img src={logo} alt="logo" />
        <FormLayout onSubmit={handleSubmit} style={{ position: "relative" }}>
          {vuz && (
            <FormItem top="Место учёбы">
              <CustomSelect
                placeholder="Введите название ВУЗа"
                searchable
                value={data.vuz}
                onChange={({ target }) => {
                  setData((prevState) => ({
                    ...prevState,
                    vuz: target.value,
                  }));
                }}
                options={vuz}
              />
            </FormItem>
          )}
          {spec && (
            <FormItem top="Специальность">
              <CustomSelect
                placeholder="Введите название специальности"
                searchable
                value={data.spec}
                onChange={({ target }) => {
                  setData((prevState) => ({
                    ...prevState,
                    spec: target.value,
                  }));
                }}
                options={spec}
              />
            </FormItem>
          )}
          <div className="welcome_button_container">
            <Button type="submit" className="welcome_button">
              Продолжить
            </Button>
          </div>
        </FormLayout>
      </div>
    </Panel>
  );
};

export default UniSelect;
