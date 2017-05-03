import React from 'react';

/**
 * component for the option popup when turning on an appliance
 */
export default class AppliancesOptionsComponent extends React.Component {

	constructor(props) {
		super(props);
    this.state={
      radioChecked:'daily',
			shared:"No"

    }

	};
	/**
	 * handles checking daily/weely radio
	 */
	radioHandler(){
		if(this.refs.daily.checked==true){
			this.setState({radioChecked: 'daily'});
		}else{
			this.setState({radioChecked: 'weekly'});
		}
	}
	/**
	 * handles checking shared checkbox
	 */
	sharedHandler(){
		if(this.state.shared=="No"){
			this.setState({shared: "Yes"});
		}
		else{
			this.setState({shared: "No"});
		}
	}
	/**
	 * saving options
	 */
	saveHandler(number,hoursPerTime,minutesPerTime,dw,timesPerDW,shared){
		if(number==""||timesPerDW==""||(hoursPerTime==""&&minutesPerTime=="")){
			alert('Please fill in all inputs');
		}
		else{
			let newHoursPerTime = hoursPerTime;
			if(minutesPerTime!==""){
				 newHoursPerTime = minutesPerTime/60;
				 newHoursPerTime=Math.round(newHoursPerTime * 100) / 100;
				if(hoursPerTime!=""){
					newHoursPerTime+=parseInt(hoursPerTime);
				}
			}
			this.refs.number.value="";
			this.refs.hoursPerTime.value="";
			this.refs.timesPerDW.value="";
			this.refs.minutesPerTime.value="";
			this.refs.daily.checked=true;
			this.setState({shared: "No"});
			this.setState({radioChecked: 'daily'});
			this.refs.shared.checked=false;
			this.props.saveHandler(number,newHoursPerTime,dw,timesPerDW,shared);
		}
	}
	closeHandler(){
		this.refs.number.value="";
		this.refs.hoursPerTime.value="";
		this.refs.timesPerDW.value="";
		this.refs.daily.checked=true;
		this.refs.shared.checked=false;
		this.setState({shared: "No"});
		this.setState({radioChecked: 'daily'});
		this.props.closeHandler();
	}


	render(){
		let o=0;
		let m=0;
		let optionsClass='pop option';
		if(this.props.display=='block'){
			optionsClass='pop option on';
		}else{
			optionsClass='pop option';
		}
		const buttonStyle = {
			float:'right',
			position:'relative',
			marginLeft:'10px'
		};
		const buttonListStyle = {
			float:'right'
			//need to be fixed for viewport ratio
		};
		const radioStyle = {
			fontWeight:'bold',
			marginRight:'20px'
		};
		const inlineRight = {
			left:'40%',
			position:"absolute"
		};
		const inlineLeft = {
		};

		return (
			<div>

	      <div className={optionsClass} ref="appliancesOptions">
					<div className = 'popInner'>
						<div>

							<label>How many of this appliance</label><br/>
							<input type="text" ref="number"/>
						</div><br />
		        <div>
		          <label style={inlineLeft}>Hours per time</label><label style={inlineRight}>Minutes per time</label><br/>
		          <input style={inlineLeft} type="text" ref="hoursPerTime"/><input style={inlineRight} type="text" ref="minutesPerTime"/>
		        </div>
						<br />
						<div>
							<div className="radio">
							 	<label style={radioStyle}><input type="radio" ref="daily" name='times' value="perDay" defaultChecked onChange={this.radioHandler.bind(this)}/>Times Per Day</label>
								<label  style={radioStyle}><input type="radio" ref="weekly" name='times' value="perWeek" onChange={this.radioHandler.bind(this)}/>Times Per Week</label>
						 	</div>
						 	<input type="text" ref="timesPerDW"/>
					  </div>
						<br />
						<div className="checkbox">
							<label><input type="checkbox" ref="shared" value="shared" onChange={this.sharedHandler.bind(this)}/>Shared Device</label>
						</div>
						<div style={buttonListStyle}>
							<button  style={buttonStyle} type="button" id="close" className="btn btn-primary" onClick={this.closeHandler.bind(this)}>Cancel</button>
							<button  style={buttonStyle} type="button" id="submit" className="btn btn-primary" onClick={()=>{this.saveHandler(this.refs.number.value,this.refs.hoursPerTime.value,this.refs.minutesPerTime.value,this.state.radioChecked,this.refs.timesPerDW.value,this.state.shared);}}>Save Options</button>
						</div>
					</div>
	      </div>
			</div>
		);
	}
}
