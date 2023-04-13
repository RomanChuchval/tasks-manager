import React from 'react';
import s from './Main.module.css'
import {Task} from "./task/Task";
import {useSelector} from "react-redux";
import {AppRootType} from "../../redux/store";
import {TasksStateType} from "../../redux/reducers/tasks-reducer";
import {AppstoreAddOutlined, SortAscendingOutlined, FilterOutlined} from '@ant-design/icons';
import {SuperButton} from "../common/SuperButton";
import {MembersAvatars} from "./members-avatars/MembersAvatars";
import {Statistics} from "./statistics/Statistics";
import {useParams} from "react-router-dom";
import {Empty} from 'antd';


export const Main = () => {
    const {id} = useParams()
    const tasksListIdParams = id ? id : ''

    const getTasksListTitle = (state: AppRootType): string | undefined => {
        if (tasksListIdParams) {
            const tasksList = state.taskLists.filter(tl => tl.id === tasksListIdParams)
            return tasksList[0] ? tasksList[0].title : ''
        }
    }

    const taskListTitle = useSelector<AppRootType, string | undefined>(getTasksListTitle)
    const tasksArray = useSelector<AppRootType, Array<TasksStateType>>(state => state.tasks[tasksListIdParams])

    const tasks = tasksListIdParams && tasksArray.length
        ? tasksArray.map(task => {
        return (
            <Task key={task.id} taskData={task} tasksListId={tasksListIdParams}/>
        )})
        : null

    return (
        <div className={s.main_wrapper}>
            <div>
                <div className={s.main_header}>
                    Task Overview
                </div>
                <div className={s.main_title}>
                    <span className={s.bold_span}>{'No Tasks' && taskListTitle}</span>
                    <div className={s.main_members_block}>
                        <span>Members </span>
                        <MembersAvatars/>
                    </div>
                </div>
                <div className={s.main_settings}>
                    <SuperButton btnType={"primary"} callback={() => {
                    }}><AppstoreAddOutlined/>Add New Task</SuperButton>
                    <SuperButton btnType={"primary"} callback={() => {
                    }}><FilterOutlined/>Filter</SuperButton>
                    <SuperButton btnType={"primary"} callback={() => {
                    }}><SortAscendingOutlined/>Sort</SuperButton>
                </div>
            </div>
            <div className={s.main_tasks_wrapper}>
                <div className={`${tasks ? s.main_tasks : s.main_empty}`}>
                    <div className={s.tasks_list}>
                        {tasks ? tasks : <Empty description={'Tasks List is Empty!'}/>}
                    </div>
                </div>
                {tasks && <Statistics/> }
            </div>
        </div>
    );
};

// <Empty description={'Select tasks list for view tasks'}/>