import React, { useState } from 'react';
import { PanelHeader, Group, Cell, Text, View, ModalRoot, Panel, Div, Card, PanelHeaderButton, Alert } from '@vkontakte/vkui';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import { ModalResult_1, ModalResult_2, ModalResult_3, ModalResult_4, ModalResult_5 } from './ModalResults';

const Stats = props => {

  const [activeModal, setActiveModal] = useState(null);
  const [alert, setAlert] = useState(null);

  const modal = (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => setActiveModal(null)}
    >
      <ModalResult_1 id='result-1' setActiveModal={setActiveModal} result={props.results[0]} />
      <ModalResult_2 id='result-2' setActiveModal={setActiveModal} result={props.results[1]} />
      <ModalResult_3 id='result-3' setActiveModal={setActiveModal} result={props.results[2]} />
      <ModalResult_4 id='result-4' setActiveModal={setActiveModal} result={props.results[3]} />
      <ModalResult_5 id='result-5' setActiveModal={setActiveModal} result={props.results[4]} />
    </ModalRoot>
  )

  const openResults = e => {
    if (props.results[e.currentTarget.dataset.id] === -1) {
      setAlert(
        <Alert 
          actions={[{
            title: 'Закрыть',
            autoclose: true,
            mode: 'cancel'
          }]}
          onClose={ () => setAlert(null) }
        >
          <h2>Вы еще не прошли тест {e.currentTarget.dataset.id}</h2>
        </Alert>
      );
    } else {
      setActiveModal(e.currentTarget.dataset.resultpage);
    }
  };

  return (
    <View id={props.id} modal={modal} popout={alert}>
      <Panel>
        <PanelHeader
          left={<PanelHeaderButton><Icon24Cancel onClick={props.goStats} data-to='main-view' /></PanelHeaderButton>} // Возвращение на main-view
        >
          Статистика
        </PanelHeader>
        <Div>
          <Group header='Посмотреть результаты'>
            <Card mode='shadow'>
              <Cell asideContent={<Icon24BrowserForward />} onClick={openResults} data-resultpage='result-1' data-id={0}>
                <Text weight='regular'>Тест 1</Text>
              </Cell>
              <Cell asideContent={<Icon24BrowserForward />} onClick={openResults} data-resultpage='result-2' data-id={1}>
                <Text weight='regular'>Тест 2</Text>
              </Cell>
              <Cell asideContent={<Icon24BrowserForward />} onClick={openResults} data-resultpage='result-3' data-id={2}>
                <Text weight='regular'>Тест 3</Text>
              </Cell>
              <Cell asideContent={<Icon24BrowserForward />} onClick={openResults} data-resultpage='result-4' data-id={3}>
                <Text weight='regular'>Тест 4</Text>
              </Cell>
              <Cell asideContent={<Icon24BrowserForward />} onClick={openResults} data-resultpage='result-5' data-id={4}>
                <Text weight='regular'>Тест 5</Text>
              </Cell>
            </Card>
          </Group>
        </Div>
      </Panel>
    </View>
  );

};

export default Stats;