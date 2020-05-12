import React, { useState, useEffect } from 'react';
import { Panel, PanelHeader, PanelHeaderButton, Button, Div, Gallery, Card, FormLayout, Radio, Text, Snackbar, Avatar, PanelHeaderContent, Progress, Caption } from '@vkontakte/vkui';
import Icon28CancelOutline from '@vkontakte/icons/dist/28/cancel_outline';
import Icon24Report from '@vkontakte/icons/dist/24/report';

//Import Test Images
import test_img_5 from '../img/Test images/Test-img-5.png';
import test_img_6 from '../img/Test images/Test-img-6.png';

import './styles/Tests.css';

// Import Tests data
import * as test_1_data from './Test data/test_1.json';
import * as test_2_data from './Test data/test_2.json';
import * as test_3_data from './Test data/test_3.json';
import * as test_4_data from './Test data/test_4.json';
import * as test_5_data from './Test data/test_5.json';

const Test_1 = props => {

  const test_id = 1;

  const fetchAnswers = test_1_data.fetchanswers;  
  const questions = test_1_data.questions;
  const buttons = test_1_data.buttons;

  // state hooks
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [currentButtons, setCureentButtons] = useState(buttons[0]);
  const [currentFetchAnswers, setCurrentFetchAnswers] = useState(fetchAnswers[0]);
  const [count, setCount] = useState(1);
  const [snackbar, setSnackbar] = useState(null);

  const [result, setResult] = useState(0);

  const [nextBtnText, setNextBtnText] = useState('Далее');

  useEffect(() => {
    console.log('Result: ' + result);
    console.log(count + "/" + questions.length);
  }); 

  const onNext = e => {
    const value = checkValue();
    if (value === null) {
      setSnackbar(<Snackbar
        layout="vertical"
        onClose={() =>  setSnackbar(null)}
        duration={1000}
        before={<Avatar size={24} style={{backgroundColor: 'orange'}}><Icon24Report fill="#fff" width={14} height={14} /></Avatar>}
      >
        Вы не выбрали вариант ответа
      </Snackbar>);
    }
    else {
      if (count === questions.length - 1) {
        setNextBtnText('Завершить');
      }
      if (count === questions.length) {
        console.log(result + " " + value)
        props.setResult(result + value);
        props.goTest(e);
        return;
        }
      setResult(result + value);
      setCount(count + 1);
      setCureentButtons(buttons[count]);
      setCurrentQuestion(questions[count]);
      setCurrentFetchAnswers(fetchAnswers[count]);
    }
  };

  const checkValue = () => {
    var value = 0;
    const radio_1 = document.getElementById('radio-1');
    const radio_2 = document.getElementById('radio-2');
    const radio_3 = document.getElementById('radio-3');
    if (radio_1.checked) {
      value = currentFetchAnswers[0];
    } else if (radio_2.checked) {
      value = currentFetchAnswers[1];
    } else if (radio_3.checked) {
      value = currentFetchAnswers[2];
    } else {
      value = null
    }

    radio_1.checked = false;
    radio_2.checked = false;
    radio_3.checked = false;

    return value;

  };


  // TODO:
  return (
    <Panel id={props.id}>
      <PanelHeader separator={false} left={<PanelHeaderButton onClick={props.closeTest}><Icon28CancelOutline style={{ color: 'var(--destructive)'}}/></PanelHeaderButton>}>
        Тест {test_id}
      </PanelHeader>
      <Progress value={count / 30 * 100}/>
      <Div className='TestText'>
        <Card className='QuestionCard'>
          <Text weight="regular">{currentQuestion}</Text>
        </Card>
      </Div>
        <FormLayout className='TestForm'>
          <Radio id='radio-1' name='radio'><Text weight="regular">{currentButtons[0]}</Text></Radio>
          <Radio id='radio-2' name='radio'><Text weight="regular">{currentButtons[1]}</Text></Radio>
          <Radio id='radio-3' name='radio'><Text weight="regular">{currentButtons[2]}</Text></Radio>
          <Button mode='primary' size='xl' onClick={onNext} data-result='result-1'>{nextBtnText}</Button>
        </FormLayout>
        {snackbar}
    </Panel>
  );

};

const Test_2 = props => {
  const test_id = 2;
  const questions = test_2_data.questions;

  // state hooks
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [count, setCount] = useState(0);
  const [snackbar, setSnackbar] = useState(null);

  const [result, setResult] = useState([0, 0, 0, 0, 0]);

  const [nextBtnText, setNextBtnText] = useState('Далее');

  useEffect(() => {
    console.log(`П-Д: ${result[0]}\nА-С: ${result[1]}\nС-Л: ${result[2]}\nН-О: ${result[3]}\nК: ${result[4]}`);
  });

  const onNext = e => {
    const value = checkValue();
    if (value === null) {
      setSnackbar(<Snackbar
        layout="vertical"
        onClose={() =>  setSnackbar(null)}
        duration={1000}
        before={<Avatar size={24} style={{backgroundColor: 'orange'}}><Icon24Report fill="#fff" width={14} height={14} /></Avatar>}
      >
        Вы не выбрали вариант ответа
      </Snackbar>);
    }
    else {
      if (count === questions.length - 1) {
        setNextBtnText('Завершить');
      }
      if (count === questions.length) {
        props.setResult(result);
        props.goTest(e);
        return;
        }
      const calc = result.slice();
      calc[count % 5] += value;
      setResult(calc);
      setCount(count + 1);
      setCurrentQuestion(questions[count]);
    }
  };

  const checkValue = () => {
    var value = 0;
    const radio_1 = document.getElementById('radio-1');
    const radio_2 = document.getElementById('radio-2');
    if (radio_1.checked) {
      value = 1;
    } else if (radio_2.checked) {
      value = 0;
    } else {
      value = null
    }

    radio_1.checked = false;
    radio_2.checked = false;

    return value;

  };


  // TODO:
  return (
    <Panel id={props.id}>
      <PanelHeader separator={false} left={<PanelHeaderButton onClick={props.closeTest}><Icon28CancelOutline style={{ color: 'var(--destructive)'}}/></PanelHeaderButton>}>
        Тест {test_id}
      </PanelHeader>
      <Progress value={count / 40 * 100}/>
      <Div className='TestText'>
        <Card className='QuestionCard'>
          <Text weight="regular">{currentQuestion}</Text>
        </Card>
      </Div>
        <FormLayout className='TestForm'>
          <Radio id='radio-1' name='radio'><Text weight="regular">Я согласен(-на)</Text></Radio>
          <Radio id='radio-2' name='radio'><Text weight="regular">Я НЕ согласен(-на)</Text></Radio>
          <Button mode='primary' size='xl' onClick={onNext} data-result='result-2'>{nextBtnText}</Button>
        </FormLayout>
        {snackbar}
    </Panel>
  );


};

const Test_3 = props => {
  // Порядок type'ов
  // type_1 --> Человек Природа
  // type_2 --> Человек Техника
  // type_3 --> Человек Человек
  // type_4 --> Человек Знаковая система
  // type_5 --> Человек Художественный образ
  
  const test_id = 3;
  const questions = test_3_data.questions;
  const fetchAnswers = test_3_data.fetchanswers;

  // state hooks
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [count, setCount] = useState(1);
  const [snackbar, setSnackbar] = useState(null);
  const [keys, setKeys] = useState([ '1a', '1b' ]);

  // Типы в порядке, как прописано выше и как указано в файле test_3.json
  const [result, setResult] = useState([0, 0, 0, 0, 0]);

  const [nextBtnText, setNextBtnText] = useState('Далее');

  useEffect(() => {
    console.log(`ЧП: ${result[0]}\nЧТ: ${result[1]}\nЧЧ: ${result[2]}\nЧЗ: ${result[3]}\nЧХ: ${result[4]}`);
  });

  const onNext = e => {
    const value = checkValue();
    if (value === null) {
      setSnackbar(<Snackbar
        layout="vertical"
        onClose={() =>  setSnackbar(null)}
        duration={1000}
        before={<Avatar size={24} style={{backgroundColor: 'orange'}}><Icon24Report fill="#fff" width={14} height={14} /></Avatar>}
      >
        Вы не выбрали вариант ответа
      </Snackbar>);
    }
    else {
      if (count === questions.length - 1) {
        setNextBtnText('Завершить');
      }
      if (count === questions.length) {
        props.setResult(result);
        props.goTest(e);
        return;
        }
      let calc = result.slice();
      for (let i = 0; i < fetchAnswers.length; ++i) {
        if (fetchAnswers[i].indexOf(value) !== -1) {
          calc[i] += 1;
        }
      }
      setResult(calc);
      setCount(count + 1);
      setCurrentQuestion(questions[count]);
      setKeys(Object.getOwnPropertyNames(questions[count]));
    }
  };

  const checkValue = () => {
    var value;
    // let keys = Object.getOwnPropertyNames(currentQuestion); //examp. ['1a', '1b']
    const radio_1 = document.getElementById('radio-1');
    const radio_2 = document.getElementById('radio-2');
    if (radio_1.checked) {
      value = keys[0]; // Выбран пункт А
    } else if (radio_2.checked) {
      value = keys[1]; // Выбран пункт Б
    } else {
      value = null
    }

    radio_1.checked = false;
    radio_2.checked = false;

    return value;

  };


  // TODO:
  return (
    <Panel id={props.id}>
      <PanelHeader separator={false} left={<PanelHeaderButton onClick={props.closeTest}><Icon28CancelOutline style={{ color: 'var(--destructive)'}}/></PanelHeaderButton>}>
        Тест {test_id}
      </PanelHeader>
      <Progress value={count / 20 * 100}/>
      <Div>
        <Card style={{ padding: '10px 5px 10px 5px', minHeight: 80 }}>
          <Caption level="1" weight="regular"><Text weight='regular' style={{ color: 'rgb(0, 183, 255)'}}>А.</Text>{currentQuestion[keys[0]]}</Caption>
        </Card>
      </Div>
      <Div>
        <Card style={{ padding: '10px 5px 10px 5px', minHeight: 80 }}>
          <Caption level="1" weight="regular"><Text weight='regular' style={{ color: 'rgb(0, 183, 255)'}}>Б.</Text>{currentQuestion[keys[1]]}</Caption>
        </Card>
      </Div>
        <FormLayout className='TestForm'>
          <Radio id='radio-1' name='radio'><Text weight="regular">Вариант А</Text></Radio>
          <Radio id='radio-2' name='radio'><Text weight="regular">Вариант Б</Text></Radio>
          <Button mode='primary' size='xl' onClick={onNext} data-result='result-3'>{nextBtnText}</Button>
        </FormLayout>
        {snackbar}
    </Panel>
  );

};
const Test_4 = props => {
  const test_id = 4;
  const questions = test_4_data.questions;

  // state hooks
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [count, setCount] = useState(0);
  const [snackbar, setSnackbar] = useState(null);

  const [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 10 values

  const [nextBtnText, setNextBtnText] = useState('Далее');

  useEffect(() => {
    console.log('Result: ' + result);
    console.log(count + "/" + questions.length);
  }); 

  const onNext = e => {
    const value = checkValue();
    if (value === null) {
      setSnackbar(<Snackbar
        layout="vertical"
        onClose={() =>  setSnackbar(null)}
        duration={1000}
        before={<Avatar size={24} style={{backgroundColor: 'orange'}}><Icon24Report fill="#fff" width={14} height={14} /></Avatar>}
      >
        Вы не выбрали вариант ответа
      </Snackbar>);
    }
    else {
      if (count === questions.length - 1) {
        setNextBtnText('Завершить');
      }
      if (count === questions.length) {
        props.setResult(result);  
        props.goTest(e);
        return;
        }
      const calc = result.slice();
      calc[count % 10] += value;
      setResult(calc);
      setCount(count + 1);
      setCurrentQuestion(questions[count]);
    }
  };

  const checkValue = () => {
    var value;
    const radio_1 = document.getElementById('radio-1');
    const radio_2 = document.getElementById('radio-2');
    if (radio_1.checked) {
      value = 1;
    } else if (radio_2.checked) {
      value = 0;
    } else {
      value = null
    }

    radio_1.checked = false;
    radio_2.checked = false;

    return value;

  };


  // TODO:
  return (
    <Panel id={props.id}>
      <PanelHeader separator={false} left={<PanelHeaderButton onClick={props.closeTest}><Icon28CancelOutline style={{ color: 'var(--destructive)'}}/></PanelHeaderButton>}>
        Тест {test_id}
      </PanelHeader>
      <Progress value={count / 50 * 100}/>
      <Div className='TestText'>
        <Card className='QuestionCard'>
          <Text weight="regular">{currentQuestion}</Text>
        </Card>
      </Div>
        <FormLayout className='TestForm'>
          <Radio id='radio-1' name='radio'><Text weight="regular">Интересно</Text></Radio>
          <Radio id='radio-2' name='radio'><Text weight="regular">НЕ Интересно</Text></Radio>
          <Button mode='primary' size='xl' onClick={onNext} data-result='result-4'>{nextBtnText}</Button>
        </FormLayout>
        {snackbar}
    </Panel>
  );

};
const Test_5 = props => {

  const test_id = 5;

  // Порядок type'ов
  // type_1 --> сфера искусства  
  // type_2 --> сфера технических интересов
  // type_3 --> сфера работы с людьми
  // type_4 --> сфера умственного труда
  // type_5 --> сфера физического труда
  // type_6 --> сфера материальных интересов
  
  const questions = test_5_data.questions;
  const fetchAnswers = test_5_data.fetchanswers;
  const buttons = test_5_data.buttons;

  // state hooks
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [currentButtons, setCurrentButtons] = useState(buttons[0])
  const [count, setCount] = useState(1);
  const [snackbar, setSnackbar] = useState(null);
  const [keys, setKeys] = useState([ '1a', '1b' ]);

  // Типы в порядке, как прописано выше и как указано в файле test_3.json
  const [result, setResult] = useState([0, 0, 0, 0, 0, 0]);

  const [nextBtnText, setNextBtnText] = useState('Далее');

  useEffect(() => {
    console.log(result);
  });

  const onNext = e => {
    const value = checkValue();
    if (value === null) {
      setSnackbar(<Snackbar
        layout="vertical"
        onClose={() =>  setSnackbar(null)}
        duration={1000}
        before={<Avatar size={24} style={{backgroundColor: 'orange'}}><Icon24Report fill="#fff" width={14} height={14} /></Avatar>}
      >
        Вы не выбрали вариант ответа
      </Snackbar>);
    }
    else {
      if (count === questions.length - 1) {
        setNextBtnText('Завершить');
      }
      if (count === questions.length) {
        props.setResult(result);
        props.goTest(e);
        return;
        }
      let calc = result.slice();
      for (let i = 0; i < fetchAnswers.length; ++i) {
        if (fetchAnswers[i].indexOf(value) !== -1) {
          calc[i] += 1;
        }
      }
      setResult(calc);
      setCount(count + 1);
      setCurrentQuestion(questions[count]);
      setKeys(Object.getOwnPropertyNames(buttons[count]));
      setCurrentButtons(buttons[count]);
    }
  };

  const checkValue = () => {
    var value;
    // let keys = Object.getOwnPropertyNames(currentQuestion); //examp. ['1a', '1b']
    const radio_1 = document.getElementById('radio-1');
    const radio_2 = document.getElementById('radio-2');
    if (radio_1.checked) {
      value = keys[0]; // Выбран пункт А
    } else if (radio_2.checked) {
      value = keys[1]; // Выбран пункт Б
    } else {
      value = null
    }

    radio_1.checked = false;
    radio_2.checked = false;

    return value;

  };


  // TODO:
  return (
    <Panel id={props.id}>
      <PanelHeader separator={false} left={<PanelHeaderButton onClick={props.closeTest}><Icon28CancelOutline style={{ color: 'var(--destructive)'}}/></PanelHeaderButton>}>
        Тест {test_id}
      </PanelHeader>
      <Progress value={count / 30 * 100}/>
      <Div className='TestText'>
        <Card className='QuestionCard'>
          <Caption level="1" weight="regular">{currentQuestion}</Caption>
        </Card>
      </Div>
        <FormLayout className='TestForm'>
          <Radio id='radio-1' name='radio'><Text weight="regular">{currentButtons[keys[0]]}</Text></Radio>
          <Radio id='radio-2' name='radio'><Text weight="regular">{currentButtons[keys[1]]}</Text></Radio>
          <Button mode='primary' size='xl' onClick={onNext} data-result='result-5'>{nextBtnText}</Button>
        </FormLayout>
        {snackbar}
    </Panel>
  );


};


export { Test_1, Test_2, Test_3, Test_4, Test_5 };
