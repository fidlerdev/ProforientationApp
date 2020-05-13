import React from 'react';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { Div, FixedLayout, Title } from '@vkontakte/vkui';

import './styles/Entry.css'

import logo_278_278 from '../img/Logo278x278.png';


const Entry = ({id, go, onUserData}) => (
  <Panel id={id} centered>
    <Div className='Entry'>
      <PanelHeader separator={false} visor={true} />
      <img src={logo_278_278} alt='Logo 150x150'/>
      <Title level="1" weight="medium" style={{ marginBottom: 16 }}>Профориентация</Title>

      <Button
      size="l"
      onClick={onUserData}
      data-to='main'
      stretched
      mode="primary"
      className="StartButton"
      >
        Начать
      </Button>
      
    </Div>
      {/* <FixedLayout vertical="bottom">
        <p onClick={go} data-to='authorship' id='authorship-link'><u>Ссылки на источники</u></p>
      </FixedLayout> */}
  </Panel>
);

export default Entry;


