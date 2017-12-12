/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react';
import { FormControl, FormControlProps, Button } from 'react-bootstrap';
import DatasourceBoxContainer from '../../containers/groups/DatasourceBoxContainer';
import { SelectionType } from '../../containers/groups/DatasourceBoxContainer';
import { NamedIDItem } from '../../types/items';
import { CreateNewBlankGroupAction, EditGroupNameAction, ChangeDisplayModeAction } from '../../types/redux/groups';


interface CreateGroupProps {
	meters: NamedIDItem[];
	groups: NamedIDItem[];
	createNewBlankGroup(): CreateNewBlankGroupAction;
	editGroupName(name: string): EditGroupNameAction;
	submitGroupInEditingIfNeeded(): Promise<any>;
	changeDisplayModeToView(): ChangeDisplayModeAction;
}

export default class CreateGroupComponent extends React.Component<CreateGroupProps, {}> {
	constructor(props: CreateGroupProps) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleCreateGroup = this.handleCreateGroup.bind(this);
		this.handleReturnToView = this.handleReturnToView.bind(this);
	}

	public componentWillMount() {
		this.props.createNewBlankGroup();
	}

	public render() {
		const divStyle: React.CSSProperties = {
			paddingTop: '35px'
		};
		const divBottomStyle: React.CSSProperties = {
			marginBottom: '20px'
		};
		const textStyle: React.CSSProperties = {
			fontWeight: 'bold',
			margin: 0
		};
		const centerTextStyle: React.CSSProperties = {
			textAlign: 'center'
		};
		return (
			<div style={divStyle} className='col-xs-6'>
				<h3 style={centerTextStyle}>Create a New Group</h3>
				<div style={divBottomStyle}>
					<p style={textStyle}>Name:</p>
					<FormControl type='text' placeholder='Name' onChange={this.handleNameChange} />
				</div>
				<div style={divBottomStyle}>
					<p style={textStyle}>Select Meters:</p>
					<DatasourceBoxContainer type='meter' selection={SelectionType.All} />
				</div>
				<div style={divBottomStyle}>
					<p style={textStyle}>Select Groups:</p>
					<DatasourceBoxContainer type='group' selection={SelectionType.All} />
				</div>
				<Button type='submit' onClick={this.handleReturnToView}>Cancel</Button>
				<Button type='submit' className='pull-right' onClick={this.handleCreateGroup}>Create group</Button>
			</div>
		);
	}

	private handleNameChange(e: React.ChangeEvent<FormControlProps>) {
		const value = e.target.value;
		if (value) {
			this.props.editGroupName(value as string);
		} else {
			this.props.editGroupName('');
		}
	}

	private handleCreateGroup() {
		this.props.submitGroupInEditingIfNeeded();
	}

	private handleReturnToView() {
		this.props.changeDisplayModeToView();
	}
}