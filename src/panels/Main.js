import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import { ModalRoot, ModalCard, Card, CardScroll, Header, Caption, Gallery, Title } from '@vkontakte/vkui';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';

import "./styles/Main.css";
import { PanelHeaderButton } from '@vkontakte/vkui';

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
import MyColumnChart from './MyColumnChart';

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
						<TestCard src={test_img_1} test_id={1} go={go} text={<span>Тест на профориентацию:<br />Кем работать?</span>}/>
						<TestCard src={test_img_2} test_id={2} go={go} text={<span>Определение типа мышления</span>}/>
						<TestCard src={test_img_3} test_id={3} go={go} text={<span>Дифференциально-диагностический<br />опросник</span>}/>
						<TestCard src={test_img_4} test_id={4} go={go} text={<span>Методика "Профиль"</span>}/>
						<TestCard src={test_img_5} test_id={5} go={go} text={<span>Опросник профессиональных<br />склонностей Йовайши</span>}/>
						<TestCard src={test_img_6} test_id={6} go={go} text={<span>Экспресс-диагностика<br/>характерологических особенностей</span>}/>
					</CardScroll>
				</Group>
			</Div>
			<Div>
				<Group 
					header={<Header>Графические данные</Header>}
					separator='show'
				>
					<Card mode='shadow'
						style={{
							padding: '0 10px 0 10px'
						}}
					>
						<Gallery
							slideWidth='100%'
							style={{ height: '250px', paddingBottom: '30px' }}
							bullets='dark'
						>
							<Group 
								separator='hide'
							>
								<Title level="2" weight="semibold" style={{ height: '42px' }}>Уровень безработицы</Title>
								<MyColumnChart 
									data={[['Год', 'Процент безработных'],
												['2007', 6.0], ['2008', 6.2],
												['2009', 8.3], ['2010', 7.3],
												['2011', 6.5], ['2012', 5.5],
												['2013', 5.5], ['2014', 5.2],
												['2015', 5.6], ['2016', 5.5],
												['2017', 5.2], ['2018', 4.8],
												['2019', 4.4],]}
									minXValue={2007}
									maxXValue={2019}
									minYValue={0}
									maxYValue={9}
									color='#5181B8'
								/>
							</Group>
							<Group 
								separator='hide'
							>	
							<Title level="3" weight="semibold">Динамика роста среднемесячной зарплаты</Title>
								<MyColumnChart 
									data={[['Год', 'Среднемесечная ЗП'],
												['2007', 13593],
												['2008', 17290],
												['2009', 18638],
												['2010', 20952],
												['2011', 23369],
												['2012', 26629],
												['2013', 29792],
												['2014', 32495],
												['2015', 34030],
												['2016', 36709]]}
									minXValue={2007}
									maxXValue={2019}
									minYValue={13593}
									maxYValue={36709}
									color='#4BB34B'
								/>
							</Group>
						</Gallery>
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



									