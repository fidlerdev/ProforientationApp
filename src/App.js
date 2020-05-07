import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Root, View, Alert } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

// import Google Charts
// import {GoogleCharts} from 'google-charts';

import Main from './panels/Main';
import Entry from './panels/Entry';
import Account from './panels/Account';
import {Test_1, Test_2, Test_3,
				Test_4, Test_5, Test_6} from './panels/Tests';
import {Result_1, Result_2} from './panels/Results';


// import Persik from './panels/Persik';


const App = () => {
	const [activePanel, setActivePanel] = useState('entry');
	const [fetchedUser, setUser] = useState(null);
	const [activeTest, setActiveTest] = useState(null);
	const [activeView, setActiveView] = useState('main-view');
	const [closeTestAlert, setCloseTestAlert] = useState(null);

	const [test_1Result, setTest_1Result] = useState(-1);
	const [test_2Result, setTest_2Result] = useState(-1);
	const [test_3Result, setTest_3Result] = useState(-1);
	const [test_4Result, setTest_4Result] = useState(-1);
	const [test_5Result, setTest_5Result] = useState(-1);
	const [test_6Result, setTest_6Result] = useState(-1);


	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
		}
		fetchData();

	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
		console.log(e.currentTarget.dataset.to);
	};

	const goTest = e => {
		if (activeView === 'main-view') {
			setActiveView(e.currentTarget.dataset.to);
			setActiveTest(e.currentTarget.dataset.test);
		} else {
			setActiveTest(e.currentTarget.dataset.result);
		}
	}
	
	const goMain = e => {
		setActiveView('main-view');
	}

	const closeTest = e => {	
			setCloseTestAlert(
				<Alert
					actions={[
						{
							title: 'Отмена',
							autoclose: true,
							mode: 'cancel'
						},
						{
							title: 'Завершить',
							autoclose: true,
							mode: 'destructive',
							action: () => setActiveView('main-view')
						}
					]}
					onClose={() => setCloseTestAlert(null)}
				>
					<h2> Подтвердите действие </h2>
					<p>Вы уверены, что хотите завершить тестирование?<br/>Данные не будут сохранены</p>
				</Alert>
			);
	}

	return (
		<Root activeView={activeView}>
			<View activePanel={activePanel} id='main-view'>
				<Entry id='entry' go={go} centered={true} />
				<Main
					id='main'
					go={go}
					fetchedUser={fetchedUser}
					goTest={goTest}
					results={[
						test_1Result,
						test_2Result,
						test_3Result,
						test_4Result,
						test_5Result,
						test_6Result
					]}	
				/>
				<Account id='account' go={go} fetchedUser={fetchedUser} centered={true} />
			</View>
			<View id='test-view' activePanel={activeTest} popout={closeTestAlert}>
				<Test_1 id='test-1' closeTest={closeTest} goTest={goTest} setResult={setTest_1Result}/>
				<Result_1 id='result-1' result={test_1Result} goMain={goMain}/>
				<Test_2 id='test-2' closeTest={closeTest} goTest={goTest} setResult={setTest_2Result}/>
				<Result_2 id='result-2' result={test_2Result} goMain={goMain} />
				<Test_3 id='test-3' closeTest={closeTest} goTest={goTest}/>
				<Test_4 id='test-4' closeTest={closeTest} goTest={goTest}/>
				<Test_5 id='test-5' closeTest={closeTest} goTest={goTest}/>
				<Test_6 id='test-6' closeTest={closeTest} goTest={goTest}/>
			</View>
		</Root>
	);
}

export default App;

