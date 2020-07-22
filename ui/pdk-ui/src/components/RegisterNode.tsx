import React, { Component } from 'react';
import Select from 'react-select';

// react-select : https://github.com/JedWatson/react-select

interface RegisterNodeState {
	node_name: string;
	location: string;
	sensors: any;
}
interface RegisterNodeProps {
	sensorList?: any;
}

class RegisterNode extends Component<RegisterNodeProps, RegisterNodeState> {
	constructor(props: any) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleSensorsChange = this.handleSensorsChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	state: RegisterNodeState = {
		node_name: '',
		location: '',
		sensors: [],
	};
	handleNameChange = (e: any) => {
		this.setState({
			node_name: e.target.value,
		});
	};
	handleLocationChange = (e: any) => {
		this.setState({
			location: e.target.value,
		});
	};
	handleSensorsChange = (sensors: any) => {
		this.setState({ sensors });
	};
	handleSubmit = (e: any) => {
		e.preventDefault();

		var url: string;
		url = 'http://220.70.2.160:8080/node';
		var data: any;
		data = this.state;
		var sensor_uuid = data.sensors.map((val: any) => {
			return { uuid: val.uuid };
		});

		console.log(
			JSON.stringify({
				name: data.node_name,
				location: data.location,
				sensors: sensor_uuid,
			})
		);

		fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
				name: data.node_name,
				location: data.location,
				sensors: sensor_uuid,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((response) => console.log('Success:', JSON.stringify(response)))
			.catch((error) => console.error('Error:', error));
	};

	render() {
		let sensorOptions = this.props.sensorList.map((val: any) => {
			return { label: val.name, value: val.name, uuid: val.uuid };
		});

		return (
			<>
				<button
					type="button"
					className="btn btn-primary"
					data-toggle="modal"
					data-target="#register-node"
				>
					register node
				</button>
				<div
					className="modal fade"
					id="register-node"
					//tabindex="-1"
					role="dialog"
					aria-labelledby="register-node"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title" id="register-node">
									Register node
								</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label>Node name</label>
										<input
											type="text"
											className="form-control"
											name="node_name"
											placeholder="name"
											value={this.state.node_name}
											onChange={this.handleNameChange}
										/>
									</div>
									<div className="form-group">
										<label>Location</label>
										<input
											type="text"
											className="form-control"
											name="location"
											placeholder="location"
											value={this.state.location}
											onChange={this.handleLocationChange}
										/>
									</div>
									<div className="form-group">
										<label>Select sensors</label>
										<Select
											isMulti
											className="form-control"
											name="sensors"
											options={sensorOptions}
											classNameName="basic-multi-select"
											classNameNamePrefix="select"
											value={this.state.sensors}
											onChange={this.handleSensorsChange}
										/>
									</div>
									<div className="modal-footer">
										<button
											type="submit"
											className="btn btn-primary"
											data-dismiss="modal"
											onClick={this.handleSubmit}
										>
											Submit
										</button>
										<button
											type="reset"
											className="btn btn-default"
											data-dismiss="modal"
										>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default RegisterNode;
