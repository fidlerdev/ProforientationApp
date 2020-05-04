import React from 'react';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { Div, FixedLayout, Title } from '@vkontakte/vkui';

import './styles/Entry.css'

import logo_256_256 from '../img/Logo 256x256.png';


const Entry = ({id, go}) => (
  <Panel id={id} centered>
    <Div className='Entry'>
      <PanelHeader separator={false} visor={true} />
      <img src={logo_256_256} alt='Logo 256x256'/>
      <Title level="1" weight="medium" style={{ marginBottom: 16 }}>Профориентация</Title>

      <Button
      size="l"
      onClick={go}
      data-to='main'
      stretched
      mode="primary"
      className="StartButton"
      >
        Начать
      </Button>
      
    </Div>
      <FixedLayout vertical="bottom">
        <p onClick={go} data-to='authorship' id='authorship-link'><u>Ссылки на источники</u></p>
      </FixedLayout>
  </Panel>
);

export default Entry;


