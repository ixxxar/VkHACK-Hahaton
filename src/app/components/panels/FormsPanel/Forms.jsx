import React from "react";
import photo_1 from "../../../vendor/images/photo_1.png";
import "./Forms.css";
import {
  Panel,
  PanelHeader,
  Text,
  Button,
  ButtonGroup,
  Title,
} from "@vkontakte/vkui";
import { Icon20Cancel } from "@vkontakte/icons";
import FilterButton from "../../common/Forms/FiterButton";

const FormsPanel = ({ id }) => (
  <Panel className="search_panel" id={id}>
    <div className="filter_list">
      <Text>Фильтры:</Text>
      <ButtonGroup mode="horizontal" gap="space" stretched>
        <FilterButton name="Python" />
      </ButtonGroup>
    </div>

    <div className="search_page">
      <div className="search_card">
        <img class="swipe_image" src={photo_1}></img>
      </div>

      <div className="search_info">
        <div className="search_name">
          <Title className="search_name_text">Илья, 18</Title>
          <Text className="search_status">онлайн</Text>
        </div>

        <div className="search_about">
          <Title className="about_title">О себе</Title>
          <Text className="about_text">Люблю лягушек и вок, ок?</Text>
        </div>

        <div className="search_education">
          <Title className="search_title">
            Учебное заведение, специальность
          </Title>
          <div className="education_elements">
            <Text className="education_place">МИДиС</Text>
            <Text className="education_speciality">Прикладная информатика</Text>
          </div>
        </div>

        <div className="search_skills">
          <Title className="search_title">Навыки</Title>
          <div className="skills_elements">
            <Text className="skills_element_active">Программирование</Text>
            <Text className="skills_element">Фотография</Text>
            <Text className="skills_element">Графический дизайн</Text>
          </div>
        </div>

        <div className="search_tech">
          <Title className="search_title">Технологии</Title>
          <div className="tech_elements">
            <Text size="100" className="tech_element_active">
              python
            </Text>
            <Text className="tech_element">JS</Text>
            <Text className="tech_element">node.JS</Text>
            <Text className="tech_element">html</Text>
            <Text className="tech_element">css</Text>
          </div>
        </div>

        <div className="search_projects">
          <Title className="search_title">Выполнено проектов:</Title>
          <Text>4</Text>
        </div>
      </div>
    </div>
  </Panel>
);

export default FormsPanel;
