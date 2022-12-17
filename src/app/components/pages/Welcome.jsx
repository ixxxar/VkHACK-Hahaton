import "./welcomeScreen.css";
import welcomeImage from "../../vendor/images/welcome.svg";
import { Button, Panel, Text, Title } from "@vkontakte/vkui";
const WelcomeScreen = ({ id, go, fetchedUser }) => {
  return (
    <Panel id={id}>
      <div className="welcome_container">
        <img src={welcomeImage} alt="image" />
        <Title level="1" className="welcome_text">
          Добро пожаловать
          <br /> в <span className="welcome_text_purple">Студ Биржу</span>
        </Title>
        <Text className="welcome_text_footer">
          Здесь вы можете встретить своих <br />
          новых коллег в мире студенчества и помочь друг другу
        </Text>
        <div className="welcome_button_container">
          <Button
            onClick={() => {
              go("register");
            }}
            className="welcome_button"
          >
            Продолжить
          </Button>
        </div>
      </div>
    </Panel>
  );
};

export default WelcomeScreen;
