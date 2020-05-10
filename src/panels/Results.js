import React, { useState, useEffect } from 'react';
import { Panel, PanelHeader, Title, Card, Div, Button, Link, Text, Counter, List, Cell } from '@vkontakte/vkui';


import './styles/Results.css';
import * as test_1_result_text from './Test data/test_1.json';
import * as test_2_result_text from './Test data/test_2.json';
import * as test_3_result_text from './Test data/test_3.json';
import MyPieChart from './MyPieChart';

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
            type_head='Тип мышления'
            types={['П-Д', 'А-С', 'С-Л', 'Н-О', 'К']}
            value_head='Количество баллов'
            values={props.result}
          />
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_1' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(П-Д) Предметно-действенное мышление</Title>
          </Link>
          <Text weight='regular' data-desc='description_1' onClick={toggleDesc}>{description_1}</Text>
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_2' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(А-С) Абстрактно-символическое мышление</Title>
          </Link>
            <Text weight='regular' data-desc='description_2' onClick={toggleDesc}>{description_2}</Text>
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_3' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(С-Л) Словесно-логическое мышление</Title>
          </Link>
          <Text weight='regular' data-desc='description_3' onClick={toggleDesc}>{description_3}</Text>
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_4' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(Н-О) Наглядно-образное мышление</Title>
          </Link>
          <Text weight='regular' data-desc='description_4' onClick={toggleDesc}>{description_4}</Text>
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_5' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(К) Креативность</Title>
          </Link>
          <Text weight='regular' data-desc='description_5' onClick={toggleDesc}>{description_5}</Text>
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

const Result_3 = props => {

  const test_id = 3;

  const descriptions = {
    'description_1': test_3_result_text.resulttext.description_1,
    'description_2': test_3_result_text.resulttext.description_2,
    'description_3': test_3_result_text.resulttext.description_3,
    'description_4': test_3_result_text.resulttext.description_4,
    'description_5': test_3_result_text.resulttext.description_5,
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
            type_head='Тип профессии'
            types={['ЧП', 'ЧТ', 'ЧЧ', 'ЧЗ', 'ЧХ']}
            value_head='Количество баллов'
            values={props.result}
          />
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_1' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(ЧП) Человек — Природа</Title>
          </Link>
          <Text weight='regular' data-desc='description_1' onClick={toggleDesc}>{description_1}</Text>
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_2' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(ЧТ) Человек — Техника</Title>
          </Link>
            <Text weight='regular' data-desc='description_2' onClick={toggleDesc}>{description_2}</Text>
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_3' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(ЧЧ) Человек — Человек</Title>
          </Link>
          <Text weight='regular' data-desc='description_3' onClick={toggleDesc}>{description_3}</Text>
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_4' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(ЧЗ) Человек — Знаковая система</Title>
          </Link>
          <Text weight='regular' data-desc='description_4' onClick={toggleDesc}>{description_4}</Text>
        </Card>
      </Div>
      <Div>
        <Card mode='shadow' className='Card'>
          <Link data-desc='description_5' onClick={toggleDesc}>
            <Title level='2' weight='heavy' style={{ marginBottom: 16 }}>(ЧХ) Человек — Художественный образ</Title>
          </Link>
          <Text weight='regular' data-desc='description_5' onClick={toggleDesc}>{description_5}</Text>
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

const Result_4 = props => {
  const test_id = 4;

  const [top, setTop] = useState(null);
  const directions = [
    'физика и математика',
    'химия и биология',
    'радиотехника и электроника',
    'механика и конструирование',
    'география и геология',
    'литература и искусство',
    'история и политика',
    'педагогика и медицина',
    'предпринимательство и домоводство',
    'спорт и военное дело',
  ]
  useEffect(() => {
    let text = '';
    let arr = props.result;
    let max = Math.max(...arr);
    console.log(`MAX: ${max}`);
    for (let i of arr) {
      console.log(i);
    }
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] === max) {
        text += directions[i] + ';\t';
      }
    }
    setTop(text);
  }); 

  return (
    <Panel id={props.id}>
      <PanelHeader>Тест {test_id}</PanelHeader>
        <Div>
          <Card mode='shadow' className='Card'>
            <Title level="1" weight="heavy" style={{ marginBottom: 16}} className='ResultText'>Ваш результат</Title>
            <MyPieChart 
              type_head='Направление деятельности'
              types={['Ф и М', 'Х и Б', 'Р и Э', 'М и К', 'Г и Г', 'Л и И', 'И и П', 'П и М', 'П и Д', 'С и В']}
              value_head='Количество баллов'
              values={props.result}
            />
          </Card>
        </Div>
        <Div>
          <Card mode='shadow' className='Card'>
            <Text weight='regular'>У вас преобладают направления:<br />{top}</Text>
          </Card>
        </Div>
        <Div>
          <Card mode='shadow' className='Card'>
            <List>
              <Cell indicator={<Counter mode='primary'>{props.result[0]}</Counter>}><Text weight='heavy'>(Ф и М) физика и математика</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[1]}</Counter>}><Text weight='heavy'>(Х и Б) химия и биология</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[2]}</Counter>}><Text weight='heavy'>(Р и Э) радиотехника и электроника</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[3]}</Counter>}><Text weight='heavy'>(М и К) механика и конструирование</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[4]}</Counter>}><Text weight='heavy'>(Г и Г) география и геология</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[5]}</Counter>}><Text weight='heavy'>(Л и И) литература и искусство</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[6]}</Counter>}><Text weight='heavy'>(И и П) история и политика</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[7]}</Counter>}><Text weight='heavy'>(П и М) педагогика и медицина</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[8]}</Counter>}><Text weight='heavy'>(П и Д) предпринимательство и домоводство</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[9]}</Counter>}><Text weight='heavy'>(С и В) спорт и военное дело</Text></Cell>
            </List>
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

const Result_5 = props => {

  const test_id = 5;

  const [top, setTop] = useState(null);
  const directions = [
  'сфера искусства',
  'сфера технических интересов',
  'сфера работы с людьми',
  'сфера умственного труда',
  'сфера физического труда',
  'сфера материальных интересов'
  ]
  useEffect(() => {
    let text = '';
    let arr = props.result;
    let max = Math.max(...arr);
    console.log(`MAX: ${max}`);
    for (let i of arr) {
      console.log(i);
    }
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] === max) {
        text += directions[i] + ';\t';
      }
    }
    setTop(text);
  }); 

  return(
    <Panel id={props.id}>
      <PanelHeader>Тест {test_id}</PanelHeader>
        <Div>
          <Card mode='shadow' className='Card'>
            <Title level="1" weight="heavy" style={{ marginBottom: 16}} className='ResultText'>Ваш результат</Title>
            <MyPieChart 
              type_head='Направление деятельности'
              types={['Иск.', 'Тех. инт.', 'Раб. с люд.', 'Ум. труд', 'Физ. труд', 'Мат. инт.']}
              value_head='Количество баллов'
              values={props.result}
            />
          </Card>
        </Div>
        <Div>
          <Card mode='shadow' className='Card'>
            <Text weight='regular'>У вас преобладают сферы:<br />{top}</Text>
          </Card>
        </Div>
        <Div>
          <Card mode='shadow' className='Card'>
            <List>
              <Cell indicator={<Counter mode='primary'>{props.result[0]}</Counter>}><Text weight='heavy'>(Иск.) сфера искусства</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[1]}</Counter>}><Text weight='heavy'>(Тех. инт.) сфера технических интересов</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[2]}</Counter>}><Text weight='heavy'>(Раб. с люд.) сфера работы с людьми</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[3]}</Counter>}><Text weight='heavy'>(Ум. труд) сфера умственного труда</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[4]}</Counter>}><Text weight='heavy'>(Физ. труд) сфера физического</Text></Cell>
              <Cell indicator={<Counter mode='primary'>{props.result[5]}</Counter>}><Text weight='heavy'>(Мат. инт.) сфера материальных интересов</Text></Cell>
            </List>
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

export { Result_1, Result_2, Result_3, Result_4, Result_5 };