/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import HeaderContainer from '../containers/HeaderContainer';
import FooterComponent from '../components/FooterComponent';
import { showErrorNotification } from '../utils/notifications';


interface LoginState {
	email: string;
	password: string;
}

export default class LoginComponent extends React.Component<{}, LoginState> {
	private inputEmail: HTMLInputElement | null;

	constructor(props: {}) {
		super(props);
		this.state = { email: '', password: '' };
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	public render() {
		const formStyle = {
			maxWidth: '500px',
			margin: 'auto',
			width: '50%'
		};
		const buttonStyle = {
			marginTop: '10px'
		};
		return (
			<div>
				<HeaderContainer />
				<form style={formStyle} onSubmit={this.handleSubmit}>
					<div className='input-group'>
						<span className='input-group-addon'><i className='glyphicon glyphicon-user' /></span>
						<input
							type='text'
							className='form-control'
							placeholder='Email'
							ref={c => { this.inputEmail = c; }}
							value={this.state.email}
							onChange={this.handleEmailChange}
						/>
					</div>
					<div className='input-group'>
						<span className='input-group-addon'><i className='glyphicon glyphicon-lock' /></span>
						<input type='password' className='form-control' placeholder='Password' value={this.state.password} onChange={this.handlePasswordChange} />
					</div>
					<input style={buttonStyle} className='btn btn-default' type='submit' value='Login' />
				</form>
				<FooterComponent />
			</div>
		);
	}

	/**
	 * Sets the email state whenever the user changes the email input field
	 * @param e The event fired
	 */
	private handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ email: e.target.value });
	}

	/**
	 * Sets the password state whenever the user changes the password input field
	 * @param e The event fired
	 */
	private handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ password: e.target.value });
	}

	/**
	 * Makes a GET request to the login api whenever the user click the submit button, then clears the state
	 * If the request is successful, the JWT auth token is stored in local storage and the app routes to the admin page
	 * @param e The event fired
	 */
	private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		axios.post('/api/login/', {
			email: this.state.email,
			password: this.state.password
		})
		.then(response => {
			localStorage.setItem('token', response.data.token);
			browserHistory.push('/');
		})
		.catch(err => {
			if (err.response.status === 401) {
				showErrorNotification('Invalid email/password combination');
			} else {
				// If there was a problem other than a lack of authorization, the user can't fix it.
				// Log it to the console for developer use.
				console.error(err); // tslint:disable-line no-console
			}

			if (this.inputEmail !== null) {
				this.inputEmail.focus();
			}
		});
		this.setState({ email: '', password: '' });
	}
}