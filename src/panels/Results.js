import React, { useState, useEffect } from 'react';
import { Panel, PanelHeader, Title, Card, Div, Button, Link } from '@vkontakte/vkui';


import './styles/Results.css';
import * as test_1_result_text from './Test data/test_1.json';
import * as test_2_result_text from './Test data/test_2.json';
import MyPieChart from './MyPieChart';
import { Test_2 } from './Tests';

const Result_1 = props => {
  const test_id = 1;

  let result_text;

  if (props.result >= 49) {
    result_text = test_1_result_text.resulttext.res49_60;
  } else if (props.result >= 37) {
    result_text = test_1_result_text.resulttext.res37_48;
  } else if (props.result >= 25) {
    result_text = test_1_result_text.resulttext.res25_36;
  } else if (props.result >= 13) {
    result_text = test_1_result_text.resulttext.res13_24;
  } else {
    result_text = test_1_result_text.resulttext.res0_12;
  }

  return (
    <Panel id={props.id}>
      <PanelHeader>
        Тест {test_id}
      </PanelHeader>
      <Div>
        <Card mode='shadow' className='Card'>
          <Title level="1" weight="heavy" style={{ marginBottom: 16}} className='ResultText'>Ваш результат</Title>
          <Title level="1" weight="heavy" className='ResultText'>{props.result}</Title>
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          {result_text}
        </Card>
      </Div>
      <Div>
        <Button mode='primary' size='xl' onClick={props.goMain}>
          Продолжить
        </Button>
      </Div>
    </Panel>
  );
}

const Result_2 = props => {
  const test_id = 2;

  const descriptions = {
    'description_1': test_2_result_text.resulttext.description_1,
    'description_2': test_2_result_text.resulttext.description_2,
    'description_3': test_2_result_text.resulttext.description_3,
    'description_4': test_2_result_text.resulttext.description_4,
    'description_5': test_2_result_text.resulttext.description_5,
  }

  const [description_1, setdescription_1] = useState(null);
  const [description_2, setdescription_2] = useState(null);
  const [description_3, setdescription_3] = useState(null);
  const [description_4, setdescription_4] = useState(null);
  const [description_5, setdescription_5] = useState(null);

  console.log(`${props.result[0]} ${props.result[1]} ${props.result[2]} ${props.result[3]} ${props.result[4]}`);

  const toggleDesc = e => {
    if (eval(e.currentTarget.dataset.desc)) {
      eval(`set${e.currentTarget.dataset.desc}(null)`);
    } else {
      eval(`set${e.currentTarget.dataset.desc}(descriptions.${e.currentTarget.dataset.desc})`);
      console.log('clicked');
    }
  };

  return (
    <Panel id={props.id}>
      <PanelHeader>Тест {test_id}</PanelHeader>
      <Div>
        <Card mode='shadow' className='Card'> {/* Chart here */}
          <Title level="1" weight="heavy" style={{ marginBottom: 8}} className='ResultText'>Ваш результат</Title>
          <Title level="1" weight="heavy" style={{ marginBottom: 16}} className='ResultText'>Общий балл {props.result[0] && props.result.reduce((sum, cur) => sum + cur)}</Title>
          <MyPieChart 
            value_1={props.result[0]}
            value_2={props.result[1]}
            value_3={props.result[2]}
            value_4={props.result[3]}
            value_5={props.result[4]}
          />
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_1' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(П-Д) Предметно-действенное мышление</Title>
          </Link>
          {description_1}
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_2' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(А-С) Абстрактно-символическое мышление</Title>
          </Link>
            {description_2}
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_3' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(С-Л) Словесно-логическое мышление</Title>
          </Link>
          {description_3}
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_4' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(Н-О) Наглядно-образное мышление</Title>
          </Link>
          {description_4}
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_5' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(К) Креативность</Title>
          </Link>
          {description_5}
        </Card>
      </Div>
      <Div>
        <Button mode='primary' size='xl' onClick={props.goMain}>
            Продолжить
          </Button>
      </Div>
    </Panel>
  );
};


export { Result_1, Result_2 };