﻿import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setTaskId, getGoal } from '../../utils/DbHelper.js';
import { getDate, getExpDate } from '../../utils/DateTime.js';
import { createTaskObj, addTask } from '../../utils/utils.js';
import { Redirect } from 'react-router-dom';

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }

    state = {
        goBack: false
    }

    componentWillMount = () => {
        const goalId = this.props.match.params.id;
        this.id = setTaskId(goalId);
        this.goal = getGoal(goalId);
        this.goalDate = getExpDate(new Date(this.goal.expDate));
    }

    save = (e) => {
        e.preventDefault();
        let tasksArray = this.goal.tasks;
        const taskHTML = document.getElementById('task');
        const task = createTaskObj(taskHTML);
        addTask(this.goal.id, task);
        this.setState({ goBack: true });
    }

    render = () => {
        return (
        <div>
            {this.state.goBack === true ?
                    <Redirect to={`/goal/${this.goal.id}/`} />
                    :
                    <form onSubmit={this.save}>
                        <div className="task" data-id={this.id} id="task">
                            <input type="text" placeholder="How to achieve my goal?" required id="task-desc" className="task-desc" />
                            <input type="date" defaultValue={getDate()} id="task-date" className="task-date" required min={getDate()} max={this.goalDate} />
                            <input type="time" defaultValue="23:59" id="task-time" className="task-time" required />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                }
            </div>
        );
    }
}

export default NewTask;