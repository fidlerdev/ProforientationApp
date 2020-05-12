import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Root, View, Alert } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { firebaseConfig } from './db_config';

import Main from './panels/Main';
import Entry from './panels/Entry';
import Account from './panels/Account';
import Stats from './panels/Stats';
import Review from './panels/Review';
import {Test_1, Test_2, Test_3,
				Test_4, Test_5} from './panels/Tests';
import {Result_1, Result_2, Result_3,
				Result_4, Result_5} from './panels/Results';

import firebase from 'firebase';


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

	const [comments, setComments] = useState(null);

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
		// async function fetchData() {
		// 	const user = await bridge.send('VKWebAppGetUserInfo');
		// 	setUser(user);
		// }
		// fetchData();
		setUser({
				id: 339873790,
				first_name: 'Вениамин',
				last_name: 'Серапутский',
				photo_200: 'https://vk.com/images/camera_200.png?ava=1'
			});
	}, []);

	const onUserData = e => {
		if (fetchedUser) {
			usersRef.child(fetchedUser.id).once("value", snapshot => {
				if (snapshot.exists()) {
					console.log('Snapshot exists');
					setFirstName(snapshot.val().first_name);
					setLastName(snapshot.val().last_name);
					setTest_1Result(snapshot.val().test_1);
					setTest_2Result(snapshot.val().test_2);
					setTest_3Result(snapshot.val().test_3);
					setTest_4Result(snapshot.val().test_4);
					setTest_5Result(snapshot.val().test_5);
					document.getElementById('main').results = [
							snapshot.val().test_1,
							snapshot.val().test_2,
							snapshot.val().test_3,
							snapshot.val().test_4,
							snapshot.val().test_5
					];
				} else {
					console.log('Snapshot does not exist!');
					initializeUser()
				}
			});
		}


		commentsRef.on('value', snapshot => {
			setComments(snapshot.val());
			console.log('SNAPSHOT.val(): ', snapshot.val());
		});


		go(e);
	}

	const initializeUser = () => {
		console.log(fetchedUser);
		if (fetchedUser) {

			usersRef.child(fetchedUser.id).set({
				first_name: fetchedUser.first_name,
				last_name: fetchedUser.last_name,
				test_1: test_1Result,
				test_2: test_2Result,
				test_3: test_3Result,
				test_4: test_4Result,
				test_5: test_5Result,
			})
			setFirstName(fetchedUser.first_name);
			setLastName(fetchedUser.last_name);
		} else {
			console.log()
			usersRef.child('test-admin').set({
				first_name: 'Admin',
				last_name: 'Root',
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
		saveTestData();
	}

	const goReview = e => {
		if (activeView === 'main-view') {
			setActiveView('review')
		} else {
			setActiveView('main-view')
		}
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

	const savePersonalData = (e, first_name, last_name) => {
		if (fetchedUser) {
			usersRef.child(fetchedUser.id).update({
				first_name: first_name,
				last_name: last_name,
			});
			setFirstName(first_name);
			setLastName(last_name);
		} else {
			usersRef.child('test-admin').update({
				first_name: first_name,
				last_name: last_name,
			})
		}
	};

	const saveTestData = () => {
		usersRef.child(fetchedUser.id).update({
			test_1: test_1Result,
			test_2: test_2Result,
			test_3: test_3Result,
			test_4: test_4Result,
			test_5: test_5Result,
		})
	}

	const goStats = e => {
		const view = e.currentTarget.dataset.to;
		console.log(view + ', CLICK')
		if (view === 'stats') {
			setActiveView('stats')
		} else {
			setActiveView('main-view')
		}
	}

	const getComment = comment_id => {
		let comment;
		commentsRef.child(comment_id).once('value', snapshot => {
			comment = snapshot.val();
		});
		return comment;
	};

	const postComment = (e, comment_id, comment_text) => {
		commentsRef.child(comment_id).set({
			'comment-text': comment_text,
			'user-first-name': fetchedUser.first_name,
			'user-id': fetchedUser.id,
			'user-image': fetchedUser.photo_200,
			'user-last-name': fetchedUser.last_name,
		});
	};

	const deleteComment = e => {

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
					goReview={goReview}
				/>
				<Account
					id='account'
					go={go}
					goStats={goStats}
					fetchedUser={fetchedUser}
					centered={true}
					firstName={firstName}
					lastName={lastName}
					savePersonalData={savePersonalData}
				/>
			</View>
			<Stats id='stats' results={[test_1Result, test_2Result, test_3Result, test_4Result, test_5Result]} goStats={goStats} />
			<Review
				id='review'
				goReview={goReview}
				comments={comments}
				fetchedUser={fetchedUser}
				getComment={getComment}
				postComment={postComment}
				deleteComment={deleteComment}
				commentsRef={commentsRef}
			/>
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

