import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

// import Google Charts
// import {GoogleCharts} from 'google-charts';

import Main from './panels/Main';
import Entry from './panels/Entry';
import Account from './panels/Account';


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
	};

	return (
		<View activePanel={activePanel} id='main-view'>
			<Entry id='entry' go={go} centered={true} />
			<Main id='main' go={go} fetchedUser={fetchedUser} />
			<Account id='account' go={go} fetchedUser={fetchedUser} centered={true} />
		</View>
	);
}

export default App;

