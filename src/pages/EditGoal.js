﻿import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getGoal, saveGoal } from '../utils/DbHelper.js';
import { getDate, getExpDate, getExpTime } from '../utils/DateTime.js';
import { createGoalObj } from '../utils/utils.js';

class EditGoal extends Component {

    state = {
        goBack: false
    }

    componentWillMount = () => {
        const id = this.props.match.params.id;
        this.goal = getGoal(id);
        const date = new Date(this.goal.expDate);
        this.expDate = getExpDate(date);
        this.expTime = getExpTime(date);
    }

    save = (e) => {
        e.preventDefault;
        const goal = createGoalObj(this.goal.id);
        const tasks = this.goal.tasks;
        goal.tasks = tasks;
        saveGoal("goal" + this.goal.id.toString(), JSON.stringify(goal));
        this.setState({ goBack: true });
    }

    render = () => {
        return (
            <div>
                {this.state.goBack === true ?
                    <Redirect to={`/goal/${this.goal.id}/`} />
                    :
                    <form onSubmit={this.save} id="add-goal">
                        <input type="text" placeholder="What do I want to achieve?" required id="goal-desc" defaultValue={this.goal.description} />
                        <input type="date" required id="goal-date" min={this.expDate} defaultValue={this.expDate} />
                        <input type="time" required id="goal-time" defaultValue={this.expTime} />
                        <button type="submit">Save</button>
                    </form>
                }
            </div>
            )
    }
}

export default EditGoal;