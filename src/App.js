import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Root, View, Alert } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { firebaseConfig } from './db_config';

import Main from './panels/Main';
import Entry from './panels/Entry';
import Account from './panels/Account';
import {Test_1, Test_2, Test_3,
				Test_4, Test_5} from './panels/Tests';
import {Result_1, Result_2, Result_3,
				Result_4, Result_5} from './panels/Results';

import firebase from 'firebase';
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

	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [classForm, setClassForm] = useState(null);

	const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

	// Get a reference to the storage service, which is used to create references in your storage bucket
	const database = app.database();

	const usersRef = database.ref().child('users');

	const commentsRef = database.ref().child('comments');

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

	const onUserData = e => {
		if (checkUser()) {
			console.log(`Пользователь ${fetchedUser.first_name} с id ${fetchedUser.id} найден в базе.`);
			usersRef.child(fetchedUser.id).once('value', snapshot => {
				setFirstName(snapshot.val().first_name);
				setLastName(snapshot.val().last_name);
				setClassForm(snapshot.val().class_form)
				setTest_1Result(snapshot.val().test_1);
				setTest_2Result(snapshot.val().test_2);
				setTest_3Result(snapshot.val().test_3);
				setTest_4Result(snapshot.val().test_4);
				setTest_5Result(snapshot.val().test_5);
			});
		} else {
			initializeUser();
		}
		go(e);
	}

	const checkUser = () => {
		var exists;
		console.log('CHECK_USER CALLED: ' + fetchedUser);
		if(fetchedUser) {
			usersRef.child(fetchedUser.id).once('value', snapshot => {
				exists = snapshot.exists();
			});
			return exists;
		} 
		return false;
	}

	const initializeUser = () => {
		console.log(fetchedUser);
		if (fetchedUser) {

			usersRef.child(fetchedUser.id).set({
				first_name: fetchedUser.first_name,
				last_name: fetchedUser.last_name,
				class_form: classForm,
				test_1: test_1Result,
				test_2: test_2Result,
				test_3: test_3Result,
				test_4: test_4Result,
				test_5: test_5Result,
			})
		} else {
			console.log()
			usersRef.child('test-admin').set({
				first_name: 'Admin',
				last_name: 'Root',
				class_form: 10,
				test_1: 1,
				test_2: 2,
				test_3: 3,
				test_4: [4, 1, 2, 3],
				test_5: 5
			})
		}
	};


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

	const savePersonalData = (e, first_name, last_name, class_form) => {
		usersRef.child(fetchedUser.id).update({
			first_name: first_name,
			last_name: last_name,
			class_form: class_form
		});
	};

	return (
		<Root activeView={activeView}>
			<View activePanel={activePanel} id='main-view'>
				<Entry id='entry' centered={true} go={go} onUserData={onUserData}/>
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
						test_5Result
					]}	
				/>
				<Account
					id='account'
					go={go}
					fetchedUser={fetchedUser}
					centered={true}
					firstName={firstName}
					lastName={lastName}
					classForm={classForm}
					savePersonalData={savePersonalData}
				/>
			</View>
			<View id='test-view' activePanel={activeTest} popout={closeTestAlert}>
				<Test_1 id='test-1' closeTest={closeTest} goTest={goTest} setResult={setTest_1Result}/>
				<Result_1 id='result-1' result={test_1Result} goMain={goMain}/>
				<Test_2 id='test-2' closeTest={closeTest} goTest={goTest} setResult={setTest_2Result}/>
				<Result_2 id='result-2' result={test_2Result} goMain={goMain} />
				<Test_3 id='test-3' closeTest={closeTest} goTest={goTest} setResult={setTest_3Result}/>
				<Result_3 id='result-3' result={test_3Result} goMain={goMain} />
				<Test_4 id='test-4' closeTest={closeTest} goTest={goTest} setResult={setTest_4Result}/>
				<Result_4 id='result-4' result={test_4Result} goMain={goMain} />
				<Test_5 id='test-5' closeTest={closeTest} goTest={goTest} setResult={setTest_5Result}/>
				<Result_5 id='result-5' result={test_5Result} goMain={goMain} />
			</View>
		</Root>
	);
}

export default App;

