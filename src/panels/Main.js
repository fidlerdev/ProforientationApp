import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import { ModalRoot, ModalCard, Card, CardScroll, Header, Caption, FormLayoutGroup } from '@vkontakte/vkui';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';

import "./styles/Main.css";
import { PanelHeaderButton } from '@vkontakte/vkui';

// Google charts
import Chart from 'react-google-charts';

// Images
import test_img_1 from '../img/Test images/Test-img-1.png';
import test_img_2 from '../img/Test images/Test-img-2.png';
import test_img_3 from '../img/Test images/Test-img-3.png';
import test_img_4 from '../img/Test images/Test-img-4.png';
import test_img_5 from '../img/Test images/Test-img-5.png';
import test_img_6 from '../img/Test images/Test-img-6.png';

// Self-written modules
import TestCard from './TestCard';
import Tests from './Tests';

const Main = ({ id, go, fetchedUser}) => {
	const [activeModal, setActiveModal] = useState(null)

	const auth = e => {
		// if (fetchedUser) {
		// На время разработки!!!
		if (true) {
			console.log(`FETCHED USER ${fetchedUser}`)
			go(e)
		} else {
			setActiveModal('auth-failed');
		}
	}

	//Load the charts library with a callback
	Chart.load(drawChart);

	function drawChart() {

    let data = Chart.api.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1], 
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ]);

      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
                    	'width':400,
                    	'height':300};

      // Instantiate and draw our chart, passing in some options.
      var chart = Chart.api.visualization.ColumnChart(document.getElementById('chart-1'));
      chart.draw(data, options);
    }
	drawChart();

	// Main page UI
	return (
		<Panel id={id}>
			<PanelHeader
			left={<PanelHeaderButton>	
							<Icon28UserCircleOutline onClick={auth} data-to='account'/>
						</PanelHeaderButton>}
			>
				Профориентация
			</PanelHeader>
			<Div>
				<Group
					header={<Header mode='primary'>Тесты</Header>} 
					separator='show'
					description={<Caption level='2' weight="regular">
						Результаты тестов будут отображены в личном кабинете.
					</Caption>}
				>
					<CardScroll>
						<TestCard src={test_img_1} test_id={1} text={<span>Тест на профориентацию:<br />Кем работать?</span>}/>
						<TestCard src={test_img_2} test_id={2} text={<span>Определение типа мышления</span>}/>
						<TestCard src={test_img_3} test_id={3} text={<span>Дифференциально-диагностический<br />опросник</span>}/>
						<TestCard src={test_img_4} test_id={4} text={<span>Методика "Профиль"</span>}/>
						<TestCard src={test_img_5} test_id={5} text={<span>Опросник профессиональных<br />склонностей Йовайши</span>}/>
						<TestCard src={test_img_6} test_id={6} text={<span>Экспресс-диагностика<br/>характерологических особенностей</span>}/>
					</CardScroll>
				</Group>
			</Div>
			<Div>
				<Group 
					header={<Header>Занятость населения</Header>}
					separator='show'
				>
					<Card>
						<Div id='chart-1'/>
					</Card>
				</Group>
			</Div>
			<ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
				<ModalCard
					id='auth-failed'
					onClose={() => setActiveModal(null)}
					icon={<Icon56DoNotDisturbOutline />}
					header='Вы не авторизованы'
					caption='Произошла ошибка, либо вы не авторизованы в сети ВКонтакте. Попробуйте очистить кэш в меню приложения'
					actions={[{
							title: 'Закрыть',
							mode: 'primary',
							action: () => setActiveModal(null)
						}]}
					/>
			</ModalRoot>
		</Panel>
)};


Main.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Main;
