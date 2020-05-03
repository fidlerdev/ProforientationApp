import React from 'react';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { Div, Group } from '@vkontakte/vkui';

import './styles/Entry.css'

import logo_256_256 from '../img/Logo 256x256.png';


const Entry = ({id, go}) => (
  <Panel id={id}>
    <PanelHeader separator={false}/>
    <Group>
      <img src={logo_256_256} alt='Logo 256x256' className="Content" />
      <p className="Content AppName">
        Профориентация
      </p>
        <Button size="l" onClick={go} data-to='main' mode="primary" className="Content" >
          Начать
        </Button>
    </Group>
      <Div>
      <a onClick={go} data-to='authorship' className="Content link"><u>Ссылки на источники</u></a>
    </Div>
  </Panel>
);

export default Entry;


