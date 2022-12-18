import {
  Button,
  ChipsInput,
  CustomSelect,
  DateInput,
  DateRangeInput,
  FormItem,
  FormLayout,
  Group,
  Input,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderBack,
  Textarea,
} from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import "./EditProfile.css";
import userService from "../../../service/user.service";

const ModalComponent = ({ activeModal, setActiveModal, fetchedUser, go }) => {
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  async function getVuz() {
    const vuz = await bridge.send("VKWebAppStorageGet", {
      keys: ["vuz", "specialization"],
    });
    return vuz;
  }
  const [vuz, setVuz] = useState(null);
  const [spec, setSpec] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [data, setData] = useState({
    name: "",
    date: new Date(),
    about: "",
    vuz: "",
    spec: "",
    skills: "",
    tech: "",
  });
  useEffect(async () => {
    if (fetchedUser) {
      const fetched = await userService.getInfo(fetchedUser.id);
      setUserInfo(fetched);
      setData({ ...fetched, date: new Date(fetched.date) });
    }
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
      ...data,
      _id: fetchedUser.id,
    });
    setActiveModal(null);
    go("mainapp");
  };
  return (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => {
        setActiveModal(null);
      }}
    >
      <ModalPage
        id="editProfile"
        onClose={() => {
          setActiveModal(null);
        }}
        header={
          <ModalPageHeader
            before={
              <PanelHeaderBack
                label="Назад"
                onClick={() => {
                  setActiveModal(null);
                }}
              />
            }
          >
            Редактирование Профиля
          </ModalPageHeader>
        }
        settlingHeight={80}
      >
        <FormLayout onSubmit={handleSubmit}>
          <FormItem top="Имя">
            <Input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem top="Имя">
            <DateInput
              type="date"
              value={data.date}
              enableTime={false}
              disablePast={false}
              disableFuture={true}
              closeOnChange={true}
              disablePickers={false}
              showNeighboringMonth={false}
              disableCalendar={true}
              onChange={(value) => {
                setData((prevState) => ({
                  ...prevState,
                  date: value,
                }));
              }}
            />
          </FormItem>
          <FormItem top="О себе">
            <Textarea
              value={data.about}
              name="about"
              onChange={handleChange}
            ></Textarea>
          </FormItem>
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
          <FormItem top="Навыки">
            <ChipsInput
              value={
                Array.isArray(data.skills)
                  ? data.skills.map((i) => ({ label: i, value: i }))
                  : []
              }
              onChange={(value) => {
                setData((prevState) => ({
                  ...prevState,
                  skills: value.map((v) => v.value),
                }));
              }}
              placeholder="Введите название и нажмите Enter"
            />
          </FormItem>
          <FormItem top="Технологии">
            <ChipsInput
              value={
                Array.isArray(data.tech)
                  ? data.tech.map((i) => ({ label: i, value: i }))
                  : []
              }
              onChange={(value) => {
                setData((prevState) => ({
                  ...prevState,
                  tech: value.map((v) => v.value),
                }));
              }}
              placeholder="Введите название и нажмите Enter"
            />
          </FormItem>

          <div className="button_container">
            <Button type="submit" className="button">
              Сохранить
            </Button>
          </div>
        </FormLayout>
      </ModalPage>
    </ModalRoot>
  );
};

export default ModalComponent;
