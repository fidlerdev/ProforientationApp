import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

// import Google Charts
// import {GoogleCharts} from 'google-charts';

import Main from './panels/Main';
import Entry from './panels/Entry';
import Account from './panels/Account';
import {Test_1, Test_2, Test_3,
				Test_4, Test_5, Test_6} from './panels/Tests';


// import Persik from './panels/Persik';


const App = () => {
	const [activePanel, setActivePanel] = useState('entry');
	const [fetchedUser, setUser] = useState(null);

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

	return (
		<View activePanel={activePanel} id='main-view'>
			<Entry id='entry' go={go} centered={true} />
			<Main id='main' go={go} fetchedUser={fetchedUser} />
			<Test_1 id='test-1'>'Первый тест'</Test_1>
			<Test_2 id='test-2'>'Второй'</Test_2>
			<Test_3 id='test-3'>'Третий'</Test_3>
			<Test_4 id='test-4'>'Четвертый'</Test_4>
			<Test_5 id='test-5'>'Пятый'</Test_5>
			<Test_6 id='test-6'>'Шестой'</Test_6>
			<Account id='account' go={go} fetchedUser={fetchedUser} centered={true} />
		</View>
	);
}

export default App;

