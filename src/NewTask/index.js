﻿import React, { Component } from 'react';
import RemoveTask from '../NewGoal/removeTask.js';

class NewTask extends Component {

    getDate = () => {
        return new Date().toISOString().substring(0, 10);
    }

    render = () => {
        return (
            <div className="task" data-id={this.props.id}>
                <input type="text" placeholder="How to achieve my goal?" required id="task-desc" className="task-desc" />
                <input type="date" defaultValue={this.getDate()} id="task-date" className="task-date" required min={this.getDate()} />
                <input type="time" defaultValue="23:59" id="task-time" className="task-time" required />
                <RemoveTask btnClick={this.props.removeBtnClick} id={this.props.id}/>
            </div>
                )
    }
}

export default NewTask;