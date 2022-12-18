import { Icon28Notifications, Icon28SettingsOutline } from "@vkontakte/icons";
import {
  Avatar,
  Button,
  Headline,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  Text,
  Title,
} from "@vkontakte/vkui";
import MainTabs from "../../common/MainTabs/MainTabs";
import "./AccountPanel.css";
import logo from "../../../vendor/icons/logo.svg";
import { useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import { useEffect } from "react";
import userService from "../../../service/user.service";

const AccountPanel = ({
  go,
  fetchedUser,
  id,
  selected,
  setSelected,
  setActiveModal,
}) => {
  if (!fetchedUser) {
    return "Loading...";
  }
  const [data, setData] = useState(null);
  useEffect(async () => {
    const content = await userService.getInfo(fetchedUser.id);
    setData(content);
  }, []);

  async function getVuz() {
    const vuz = await bridge.send("VKWebAppStorageGet", {
      keys: ["vuz", "specialization"],
    });
    return vuz;
  }
  const [vuz, setVuz] = useState(null);
  const [spec, setSpec] = useState(null);
  useEffect(async () => {
    const info = await getVuz();
    const userInfo = await userService.getInfo(fetchedUser.id);
    console.log(userInfo);
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
  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack />}
        className="panel_header"
        separator={false}
      >
        <img src={logo} alt="logo" /> Студ Биржа
      </PanelHeader>
      <MainTabs selected={selected} go={setSelected} />
      {data && vuz && spec && (
        <div className="account_panel">
          <div className="account_left">
            <Avatar src={fetchedUser.photo_200} size={150} />
            <Title
              level="1"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              {data.name}
            </Title>
            <div className="portfolio_block">
              <Text className="portfloio_text">Портфолио</Text>
            </div>
            <div className="projects_block">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="24" fill="#A393F5" />
                <path
                  d="M16.8333 15.8667H17.8967C18.121 14.7757 18.7147 13.7954 19.5775 13.0911C20.4403 12.3868 21.5195 12.0014 22.6333 12L24.5667 12C25.6805 12.0014 26.7597 12.3868 27.6226 13.0911C28.4854 13.7954 29.079 14.7757 29.3033 15.8667H30.3667C31.6481 15.8682 32.8766 16.3779 33.7827 17.284C34.6888 18.1901 35.1985 19.4186 35.2 20.7V30.3667C35.1985 31.6481 34.6888 32.8766 33.7827 33.7827C32.8766 34.6887 31.6481 35.1985 30.3667 35.2H16.8333C15.5519 35.1985 14.3235 34.6887 13.4174 33.7827C12.5113 32.8766 12.0015 31.6481 12 30.3667V20.7C12.0015 19.4186 12.5113 18.1901 13.4174 17.284C14.3235 16.3779 15.5519 15.8682 16.8333 15.8667ZM24.5667 13.9333H22.6333C22.0357 13.9358 21.4534 14.1229 20.9661 14.469C20.4789 14.815 20.1104 15.3032 19.9112 15.8667H27.2888C27.0896 15.3032 26.7212 14.815 26.2339 14.469C25.7466 14.1229 25.1643 13.9358 24.5667 13.9333ZM30.3667 17.8H16.8333C16.0642 17.8 15.3266 18.1055 14.7827 18.6494C14.2389 19.1932 13.9333 19.9309 13.9333 20.7V23.6H33.2667V20.7C33.2667 19.9309 32.9611 19.1932 32.4173 18.6494C31.8734 18.1055 31.1358 17.8 30.3667 17.8ZM16.8333 33.2667H30.3667C31.1358 33.2667 31.8734 32.9611 32.4173 32.4173C32.9611 31.8734 33.2667 31.1358 33.2667 30.3667V25.5333H24.5667V26.5C24.5667 26.7564 24.4648 27.0023 24.2835 27.1835C24.1023 27.3648 23.8564 27.4667 23.6 27.4667C23.3436 27.4667 23.0978 27.3648 22.9165 27.1835C22.7352 27.0023 22.6333 26.7564 22.6333 26.5V25.5333H13.9333V30.3667C13.9333 31.1358 14.2389 31.8734 14.7827 32.4173C15.3266 32.9611 16.0642 33.2667 16.8333 33.2667Z"
                  fill="white"
                />
              </svg>
              <Text className="projects_text">Проекты</Text>
            </div>
          </div>
          <div className="account_right">
            <div className="about_block">
              <Headline
                level="1"
                style={{ color: "#7F8285", marginBottom: 12 }}
              >
                О себе
              </Headline>
              <Title level="3" className="about_title">
                {data.about.length > 0 ? data.about : "Нет описания"}
              </Title>
            </div>
            <div className="specialization_block" style={{ marginBottom: 33 }}>
              <Headline
                level="1"
                style={{ color: "#7F8285", marginBottom: 12 }}
              >
                Учебное заведение, специальность
              </Headline>
              <div className="spec_plates">
                <div className="plate">
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.786 2.65777L9.1772 0.462149C8.16271 -0.143828 6.90001 -0.15458 5.87533 0.434024L1.21472 2.65777C1.19723 2.66653 1.17909 2.67591 1.16222 2.6859C0.0562035 3.3183 -0.327762 4.72757 0.304641 5.83358C0.519006 6.20853 0.834328 6.51573 1.21472 6.72028L2.50035 7.33279V10.3953C2.50112 11.7647 3.39218 12.9746 4.69973 13.3815C5.60966 13.6448 6.55317 13.7737 7.50036 13.764C8.44742 13.7746 9.39092 13.6469 10.301 13.3847C11.6085 12.9777 12.4996 11.7678 12.5004 10.3984V7.33153L13.7504 6.73402V11.889C13.7504 12.2342 14.0302 12.514 14.3754 12.514C14.7206 12.514 15.0004 12.2342 15.0004 11.889V4.38901C15.0045 3.6551 14.425 2.97711 13.786 2.65777ZM11.2503 10.3984C11.2507 11.2175 10.7192 11.9421 9.93784 12.1878C9.14547 12.4142 8.32437 12.5241 7.50033 12.514C6.6763 12.5241 5.8552 12.4142 5.06283 12.1878C4.28146 11.942 3.75001 11.2175 3.75033 10.3984V7.92843L5.82347 8.91594C6.33499 9.21969 6.9192 9.3793 7.5141 9.3778C8.08035 9.38182 8.63708 9.2319 9.12473 8.94406L11.2503 7.9284V10.3984ZM13.2503 5.59215L8.53659 7.84215C7.87935 8.22485 7.06469 8.21401 6.41784 7.81402L1.80596 5.62027C1.29189 5.34307 1.09988 4.70161 1.37708 4.18757C1.47083 4.01372 1.6114 3.86961 1.78284 3.77152L6.46721 1.53403C7.12466 1.15218 7.93888 1.16299 8.58596 1.56216L13.1947 3.75778C13.5336 3.94599 13.7457 4.30139 13.7503 4.68904C13.7509 5.05625 13.5619 5.39773 13.2503 5.59215Z"
                      fill="#792EC0"
                    />
                  </svg>
                  {vuz.find((i) => i.value === data.vuz).label}
                </div>
                <div className="spec">
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.8948 5.18508C14.767 4.7927 14.5115 4.45041 14.1662 4.20883C13.821 3.96724 13.4042 3.83919 12.9776 3.84361H10.2465L9.41696 1.35111C9.28651 0.958774 9.03018 0.616511 8.68493 0.373681C8.33968 0.13085 7.92336 0 7.49599 0C7.06862 0 6.65229 0.13085 6.30704 0.373681C5.96179 0.616511 5.70546 0.958774 5.57501 1.35111L4.74549 3.84361H2.01437C1.58913 3.8442 1.17496 3.97431 0.831015 4.21538C0.487071 4.45645 0.230945 4.79613 0.0992212 5.18591C-0.0325022 5.57569 -0.0330852 5.99564 0.0975555 6.38576C0.228196 6.77588 0.483378 7.11622 0.826652 7.35818L3.04955 8.92503L2.2044 11.4483C2.06782 11.8396 2.06609 12.263 2.19947 12.6554C2.33285 13.0478 2.59419 13.3881 2.94454 13.6256C3.28888 13.8707 3.70617 14.002 4.13422 14C4.56228 13.9979 4.97818 13.8626 5.31997 13.6141L7.49599 12.0702L9.67263 13.6123C10.0164 13.8561 10.4314 13.9884 10.8581 13.9904C11.2848 13.9924 11.7011 13.864 12.0473 13.6235C12.3935 13.383 12.6516 13.0429 12.7846 12.652C12.9176 12.2612 12.9187 11.8397 12.7876 11.4483L11.9424 8.92503L14.1678 7.35818C14.515 7.11926 14.7732 6.77892 14.9041 6.38754C15.0351 5.99616 15.0318 5.57453 14.8948 5.18508ZM13.4302 6.38492L10.8397 8.2103C10.7333 8.28513 10.6541 8.39044 10.6135 8.51122C10.5729 8.63199 10.5728 8.76205 10.6134 8.88284L11.598 11.8177C11.6478 11.9665 11.6474 12.1268 11.5968 12.2754C11.5462 12.424 11.448 12.5533 11.3163 12.6447C11.1847 12.7361 11.0263 12.785 10.8641 12.7842C10.7019 12.7834 10.5441 12.733 10.4134 12.6403L7.86605 10.8324C7.75876 10.7564 7.62911 10.7154 7.49599 10.7154C7.36286 10.7154 7.23321 10.7564 7.12592 10.8324L4.57858 12.6403C4.44798 12.7342 4.28974 12.7856 4.12679 12.7871C3.96384 12.7885 3.80465 12.7399 3.67231 12.6482C3.53997 12.5565 3.44134 12.4266 3.39074 12.2773C3.34013 12.128 3.34018 11.967 3.39087 11.8177L4.37855 8.88284C4.41913 8.76205 4.4191 8.63199 4.37846 8.51122C4.33782 8.39044 4.25866 8.28513 4.15225 8.2103L1.56179 6.38492C1.43133 6.29284 1.33439 6.16336 1.28482 6.01499C1.23526 5.86662 1.23559 5.70694 1.28579 5.55877C1.33598 5.41059 1.43346 5.2815 1.56431 5.18993C1.69516 5.09836 1.85268 5.04899 2.01437 5.04888H5.20245C5.33479 5.04888 5.46372 5.00838 5.57067 4.93322C5.67761 4.85806 5.75705 4.75212 5.79755 4.63065L6.76648 1.71932C6.81621 1.57034 6.9137 1.44042 7.04491 1.34825C7.17611 1.25608 7.33427 1.20643 7.49661 1.20643C7.65895 1.20643 7.81711 1.25608 7.94832 1.34825C8.07952 1.44042 8.17701 1.57034 8.22674 1.71932L9.19567 4.63065C9.23617 4.75212 9.31561 4.85806 9.42255 4.93322C9.5295 5.00838 9.65843 5.04888 9.79078 5.04888H12.9789C13.1405 5.04899 13.2981 5.09836 13.4289 5.18993C13.5598 5.2815 13.6572 5.41059 13.7074 5.55877C13.7576 5.70694 13.758 5.86662 13.7084 6.01499C13.6588 6.16336 13.5619 6.29284 13.4314 6.38492H13.4302Z"
                      fill="#2787F5"
                    />
                  </svg>
                  {spec.find((i) => i.value === data.spec).label}
                </div>
              </div>
            </div>
            <div className="specialization_block" style={{ marginBottom: 17 }}>
              <Headline
                level="1"
                style={{ color: "#7F8285", marginBottom: 12 }}
              >
                Навыки
              </Headline>
              <div className="spec_plates">
                {data?.skills ? (
                  data.skills.map((i) => (
                    <div key={i} className="default_plate">
                      {i}
                    </div>
                  ))
                ) : (
                  <div className="default_plate">Нет навыков</div>
                )}
              </div>
            </div>
            <div className="specialization_block" style={{ marginBottom: 20 }}>
              <Headline
                level="1"
                style={{ color: "#7F8285", marginBottom: 12 }}
              >
                Технологии
              </Headline>
              <div className="spec_plates">
                {data?.tech ? (
                  data.tech.map((i) => <div className="default_plate">{i}</div>)
                ) : (
                  <div className="default_plate">Нет технологий</div>
                )}
              </div>
            </div>
            <Headline
              level="1"
              style={{ color: "#7F8285", marginBottom: 12, marginLeft: "5%" }}
            >
              Выполнено проектов:
            </Headline>
            <Title style={{ marginBottom: 12, marginLeft: "5%" }}>0</Title>
            <div className="btn_container">
              <Button
                onClick={() => {
                  setActiveModal("editProfile");
                }}
                className="edit_button"
              >
                Редактировать анкету
              </Button>
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
};

export default AccountPanel;
