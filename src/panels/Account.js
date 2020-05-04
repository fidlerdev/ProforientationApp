
import React, { useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Cell,
          Avatar, Card, FormLayoutGroup, FormLayout,
          Input, Select, Button, FixedLayout, Separator, Div } from "@vkontakte/vkui"

import Icon24Poll from '@vkontakte/icons/dist/24/poll';

import './styles/Account.css';


const Account = ({id, go, fetchedUser}) => {



  return (
    <Panel id={id}>
      <PanelHeader
        left={<PanelHeaderBack onClick={go} data-to='main' />} // Возвращение на main-view
      >
        Профиль
      </PanelHeader>
        {/* { fetchedUser &&
        <Card mode='outline' size='l' className='Card'>
          <Cell
            before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
            description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Card>} */}
        {/* НА ВРЕМЯ РАЗРАБОТКИ */}
        <Div>
          <Card mode='outline' size='l' className='Card Profile'>
            <Cell
              className="Profile"
              before={<Avatar src='http://placekitten.com/200/200' />}
              multiline={true}
              description="10 Класс"
            >
              <span id="profile-data">Вениамин Серапутский</span>
            </Cell>
          </Card>
        </Div>
        {/* НА ВРЕМЯ РАЗРАБОТКИ */}
        <Div>
          <Card mode='outline' size='m' className="Card">
            <FormLayout>
              <FormLayoutGroup top='Имя'>
                <Input type='text' placeholder='Введите имя' id='first_name_input' />
              </FormLayoutGroup>
              <FormLayoutGroup top='Фамилия'>
                <Input type='text' placeholder='Введите фамилию' id='last_name_input' />
              </FormLayoutGroup>
              <FormLayoutGroup top='Класс'>
                <Select placeholder='Выберите класс'>
                  <option value='FORM_5'>5 класс</option>
                  <option value='FORM_6'>6 класс</option>
                  <option value='FORM_7'>7 класс</option>
                  <option value='FORM_8'>8 класс</option>
                  <option value='FORM_9'>9 класс</option>
                  <option value='FORM_10'>10 класс</option>
                  <option value='FORM_11'>11 класс</option>
                </Select>
              </FormLayoutGroup>
              <FormLayoutGroup>
                <Button
                size='xl'
                mode='primary'
                // onClick={}
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
              >
                Статистика
              </Button>
            </Div>
        </FixedLayout>
    </Panel>
  );
}

// const BottomTab = ({activeTab, setActiveTab, go}) => {
//   const changePanel = e => {
//     setActiveTab(activeTab === INFO_TAB ? STAT_TAB : INFO_TAB);
//     go(e.currentTarget.dataset.to);
//   }
  
//   return(
//     <FixedLayout vertical="bottom">
//           <Separator wide />
//           <Tabs>
//             <TabsItem
//               selected={activeTab === INFO_TAB}
//               onClick={changePanel}
//               data-to='account'
//             >
//               Информация
//             </TabsItem>
//             <TabsItem
//               selected={activeTab === STAT_TAB}
//               onClick={changePanel}
//               data-to="stats"
//             >
//               Статистика
//             </TabsItem>
//           </Tabs>
//         </FixedLayout>
// )};


export default Account;
