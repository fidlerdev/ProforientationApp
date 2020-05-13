import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
// import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import { Card, CardScroll, Header, Caption, Gallery, Title, Text, Link, Separator, Button, Tooltip } from '@vkontakte/vkui';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
// import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';

import "./styles/Main.css";
import { PanelHeaderButton } from '@vkontakte/vkui';

// Images
import test_img_1 from '../img/Test images/Test-img-1.png';
import test_img_2 from '../img/Test images/Test-img-2.png';
import test_img_3 from '../img/Test images/Test-img-3.png';
import test_img_4 from '../img/Test images/Test-img-4.png';
import test_img_5 from '../img/Test images/Test-img-5.png';

// Self-written modules
import TestCard from './TestCard';
// import Tests from './Tests';
import MyColumnChart from './MyColumnChart';

const Main = ({ id, go, goTest, goReview, snapshotExists}) => {

	const [tooltip1, setTooltip1] = useState(!snapshotExists);

	return (
	// Main page UI
		<Panel id={id}>
			<PanelHeader
			left={
				<Tooltip text='Здесь можно просмотреть результаты пройденных тестов' header='Ваш профиль' cornerOffset={-10} isShown={tooltip1} onClose={() => setTooltip1(false)}>
					<PanelHeaderButton>	
						<Icon28UserCircleOutline onClick={go} data-to='account'/>
					</PanelHeaderButton>
				</Tooltip> 
				}
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
						<TestCard src={test_img_1} id='test_1' test_id={1} goTest={goTest} text={<span>Тест на профориентацию:<br />Кем работать?</span>}/>
						<TestCard src={test_img_2} id='test_2' test_id={2} goTest={goTest} text={<span>Определение типа мышления</span>}/>
						<TestCard src={test_img_3} id='test_3' test_id={3} goTest={goTest} text={<span>Дифференциально-диагностический<br />опросник</span>}/>
						<TestCard src={test_img_4} id='test_4' test_id={4} goTest={goTest} text={<span>Методика "Профиль"</span>}/>
						<TestCard src={test_img_5} id='test_5' test_id={5} goTest={goTest} text={<span>Опросник профессиональных<br />склонностей Йовайши</span>}/>
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
								<Title level="2" weight="semibold" style={{ height: '42px' }}>В разработке</Title>
								<Text weight='regular'>Графические данные и диаграммы, основанные на результатах тестирования</Text>
							</Group>
							<Group 
								separator='hide'
							>	
							<Title level="3" weight="semibold">Динамика роста среднемесячной зарплаты (пример) </Title>
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
			<Div style={{ padding: '50px 10px 50px 10px'}}>
				<Button size='xl' mode='secondary' onClick={goReview}>Оставить отзыв</Button>
				<Div />
				<Separator />
				<Div />
				<Link href='https://vk.com/im?peers=477793791&sel=339873790' style={{marginBottom: '50px', marginTop: '50px', textAlign: 'center' }}> Нашли ошибку?<br />Есть предложения по улучшению?</Link>
			</Div>
		</Panel>
);
}


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



									