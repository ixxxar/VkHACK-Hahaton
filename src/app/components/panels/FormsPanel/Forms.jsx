import React from "react";

import photo_1 from "../../../vendor/images/photo_1.png";
import cancel_icon from "../../../vendor/images/cancel_icon.png";
import ok_icon from "../../../vendor/images/ok_icon.png";
import logo from "../../../vendor/icons/logo.svg";
import "./Forms.css";
import {
  Panel,
  PanelHeader,
  Text,
  Button,
  ButtonGroup,
  Title,
  Tappable,
  Headline,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { Icon36CancelOutline, Icon36DoneOutline } from "@vkontakte/icons";
import FilterButton from "../../common/Forms/FiterButton";
import MainTabs from "../../common/MainTabs/MainTabs";

const FormsPanel = ({ id, selected, setSelected }) => (
  <Panel className="search_panel" id={id}>
    <PanelHeader
      before={<PanelHeaderBack />}
      className="panel_header"
      separator={false}
    >
      <img src={logo} alt="logo" /> Студ Биржа
    </PanelHeader>
    <MainTabs selected={selected} go={setSelected} />
    <div className="filter_list">
      <Text>Фильтры:</Text>
      <ButtonGroup mode="horizontal" gap="space" stretched>
        <FilterButton name="Python" />
      </ButtonGroup>
    </div>

    <div className="search_page">
      <div className="search_swipe">
        <img class="swipe_image" src={photo_1}></img>

        <div className="swipe_buttons">
          <div className="swipe_button_container">
            <Button className="swipe_button_cancel" mode="secondary" size="l">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.48059 7.30001L1.0528 1.87281C0.715872 1.53588 0.715872 0.98962 1.0528 0.65272C1.38973 0.315793 1.93599 0.315793 2.27289 0.65272L7.70011 6.08048L13.1273 0.65272C13.4642 0.315793 14.0105 0.315793 14.3474 0.65272C14.6843 0.989647 14.6843 1.53591 14.3474 1.87281L8.91964 7.30001L14.3474 12.7272C14.6843 13.0642 14.6843 13.6104 14.3474 13.9473C14.0105 14.2842 13.4642 14.2842 13.1273 13.9473L7.70011 8.51953L2.27292 13.9473C1.93599 14.2842 1.38973 14.2842 1.05283 13.9473C0.715898 13.6104 0.715898 13.0641 1.05283 12.7272L6.48059 7.30001Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
          <div className="swipe_button_container">
            <Button className="swipe_button_ok" mode="secondary" size="l">
              <img className="swipe_button_icon" src={ok_icon} />
            </Button>
          </div>
        </div>
      </div>

      <div className="search_card">
        <div className="search_block">
          <Text className="search_name">Илья, 18</Text>
          <Tappable className="search_status">онлайн</Tappable>
        </div>

        <div className="search_block">
          <Headline level="1" className="search_headline">
            О себе
          </Headline>
          <Text className="about_text">Люблю лягушек и вок, ок?</Text>
        </div>

        <div className="search_block">
          <Headline level="1" className="search_headline">
            Учебное заведение, специальность
          </Headline>
          <div className="education_elements">
            <Tappable className="education_place">МИДиС</Tappable>
            <Tappable className="education_speciality">
              Прикладная информатика
            </Tappable>
          </div>
        </div>

        <div className="search_block">
          <Headline level="1" className="search_headline">
            Навыки
          </Headline>
          <div className="skills_elements">
            <Tappable className="search_element_active">
              Программирование
            </Tappable>
            <Tappable className="search_element">Фотография</Tappable>
            <Tappable className="search_element">Графический дизайн</Tappable>
          </div>
        </div>

        <div className="search_block">
          <Headline level="1" className="search_headline">
            Технологии
          </Headline>
          <div className="tech_elements">
            <Tappable className="search_element_active">python</Tappable>
            <Tappable className="search_element">JS</Tappable>
            <Tappable className="search_element">node.JS</Tappable>
            <Tappable className="search_element">html</Tappable>
            <Tappable className="search_element">css</Tappable>
          </div>
        </div>

        <div className="search_block">
          <Headline level="1" className="search_headline">
            Выполнено проектов:
          </Headline>
          <Button className="project_count" mode="outline" size="m">
            4
          </Button>
        </div>
      </div>
    </div>
  </Panel>
);

export default FormsPanel;
