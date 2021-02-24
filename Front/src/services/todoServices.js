import axios from 'axios';

const endpoint = 'http://localhost:3001';

export function getAllTasks () {
    return axios({
        method: 'get',
        url: `${endpoint}/todos`,
        headers: {'Content-Type':'application/json'}
    }).then(response => response)
    .catch(error => console.log(error));
}
export function getTask (id) {
    return axios({
        method: 'get',
        url: `${endpoint}/myTask/view/${id}`,
        headers: {'Content-Type': 'application/json'}
    }).then(response => response)
    .catch(error => console.log(error));
}
export function addTask(body) {
    return axios({
        method: 'post',
        url: `${endpoint}/todos`,
        headers: {'Content-Type': 'application/json'},
        data: body
    }).then(res => res)
    .catch(error => console.log(error));
}
export function editTask(idTask,body) {
    return axios({
        method: 'put',
        url: `${endpoint}/todos/${idTask}`,
        headers: {'Content-Type': 'application/json'},
        data: body
    }).then(res => res)
    .catch(error => console.log(error));
}
export function completeTask(idTask,value) {
    return axios({
        method: 'patch',
        url: `${endpoint}/todos/${idTask}?completed=${value}`,
        headers: {'Content-Type': 'application/json'},
    }).then(res => res)
    .catch(error => console.log(error));
}
export function deleteTask(idTask) {
    return axios({
        method: 'delete',
        url: `${endpoint}/todos/${idTask}`,
        headers: {'Content-Type': 'application/json'}
    }).then(res => res)
    .catch(error => console.log(error))
}