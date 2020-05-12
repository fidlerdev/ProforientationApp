
import React, { useEffect, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Cell,
          Avatar, Card, FormLayoutGroup, FormLayout,
          Input, Select, Button, FixedLayout, Separator, Div } from "@vkontakte/vkui"

import Icon24Poll from '@vkontakte/icons/dist/24/poll';

import './styles/Account.css';


const Account = ({id, go, goStats, fetchedUser, firstName, lastName, savePersonalData}) => {

  var first_name_input;
  var last_name_input;

  const [name, setName] = useState(firstName);
  const [surname, setSurname] = useState(lastName);

  useEffect(() => {
    
    first_name_input = document.getElementById('first_name_input');
    last_name_input = document.getElementById('last_name_input');

    first_name_input.value = name;
    console.log(name);
    last_name_input.value = surname;
    console.log(surname);
  });

  return (
    <Panel id={id}>
      <PanelHeader
        left={<PanelHeaderBack onClick={go} data-to='main' />} // Возвращение на main-view
      >
        Профиль
      </PanelHeader>
        { fetchedUser &&
        <Div>
          <Card mode='outline' size='l' className='Card'>
            <Cell
              before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
            >
              {`${name} ${surname}`}
            </Cell>
          </Card>
        </Div>}
        <Div>
          <Card mode='outline' size='m' className="Card">
            <FormLayout>
              <FormLayoutGroup top='Имя'>
                <Input type='text' placeholder='Введите имя' id='first_name_input' />
              </FormLayoutGroup>
              <FormLayoutGroup top='Фамилия'>
                <Input type='text' placeholder='Введите фамилию' id='last_name_input' />
              </FormLayoutGroup>
              <FormLayoutGroup>
                <Button
                size='xl'
                mode='primary'
                onClick={e => {
                  setName(first_name_input.value);
                  setSurname(last_name_input.value);
                  savePersonalData(
                    e,
                    first_name_input.value,
                    last_name_input.value,
                  );
                  }}
                className='ButtonSave'
                >
                  Сохранить изменения 
                </Button>
              </FormLayoutGroup>
            </FormLayout>
          </Card>
        </Div>
      
      <FixedLayout vertical="bottom">
          <Separator wide />
            <Div>
              <Button
                before={<Icon24Poll />}
                after={<Icon24Poll />}
                size='xl'
                mode='secondary'
                onClick={goStats}
                data-to='stats'
              >
                Статистика
              </Button>
            </Div>
        </FixedLayout>
    </Panel>
  );
}

export default Account;
