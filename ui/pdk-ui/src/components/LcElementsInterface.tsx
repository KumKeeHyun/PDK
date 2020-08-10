// LogicCore(lc) interface
export interface numRange {
	min: number;
	max: number;
}
export interface timeRange {
	start: string;
	end: string;
}

export interface logicElem {
	elem: string;
	arg: lcValueArg | lcTimeArg | lcGroupArg | lcActionArg;
}

interface lcValueArg{
	value: string;
    range: Array<numRange>;
}

export interface lcTimeArg {
	range: Array<timeRange>;
}

export interface lcGroupArg {
    group: Array<string>;
}

export interface lcActionArg {
    text: string;
}

export interface LogicCorePost {
	sensor_uuid: string; 
	logic_name: string,
	logic: Array<logicElem>;
}
