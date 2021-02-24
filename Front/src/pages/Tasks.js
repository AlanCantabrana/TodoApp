import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {List,Checkbox, Row, Col, Form, Input, Button} from 'antd';
import {getAllTasks,addTask,completeTask,deleteTask} from '../services/todoServices';
import Navbar from '../components/Navbar'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const Tasks = () => {
    const [tasks, setTasks] = useState({todos:[], fetching: false})
    const [updateList, setUpdateList] = useState(false);
    const [form] = Form.useForm();

    useEffect (() => {
        taskList();
    }, [updateList]);

    const taskList = async () => {
        setTasks({fetching: true});
        const tasks = await getAllTasks();
        if(tasks.status === 200) {
            setTasks({todos:tasks.data.todos, fetching: false});
        }
        console.log(tasks);
    }

    const onCompleta =  async (value,idTask) => {
        const completarTarea = await completeTask(idTask,value.target.checked,);
        console.log(completarTarea);
    }

    const onFinish =  (formulario) => {
        console.log(formulario);
        const newTask = async () => {
            const response = await addTask(formulario);
            console.log(response);
            if(response.status === 201) {
                form.resetFields();
                setUpdateList(!updateList)
            }
        }
        newTask();
    }

    const onDelete = (idTask) => {
        console.log(idTask);
        const onDeleteTask = async () => {
            const response = await deleteTask(idTask);
            console.log(response);
            if(response.status ===200) {
                setUpdateList(!updateList);
            }
        }
        onDeleteTask()
    }
 
    const onFinishFailed = () => {
        console.log('Cancel');
    }

    return (
    <>
    <Navbar />
    <Row type='flex' justify='space-between'>
        <Col span={11}>
            <Row justify='center'>
                <h1>
                    Agrega una tarea
                </h1>
            </Row>
            <Form
                {...layout}
                form={form}
                name='formulario'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row type='flex' justify='space-between'>
                    <Col span={22}>
                        <Form.Item
                            name='name'
                            label='Nombre'
                            rules={[{ required: true, message: 'Favor de llenar el campo', }]}
                        >
                            <Input maxLength={128} placeholder="Ingrese el nombre de una tarea"
                                pattern="^^[a-zñA-ZÑ0-9 ÁÉÓÚÍáéóíú]+$"
                                title="Nombre solo puede tener letras y números."
                            />
                        </Form.Item>
                    </Col>
                    <Col span={22}>
                        <Form.Item
                            name='title'
                            label='Descripción'
                            rules={[{ required: true, message: 'Favor de llenar el campo', }]}
                        >
                            <Input maxLength={128} placeholder="Ingrese la descripción de una tarea"
                                pattern="^^[a-zñA-ZÑ0-9 ÁÉÓÚÍáéóíú]+$"
                                title="Descripción solo puede tener letras y números."
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row type='flex' justify='space-around'>
                    <Col span={11}>
                        <Button type='primary' htmlType='submit'>Agregar</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
        <Col span={11}>
            <Row justify='center'>
                <h1>
                    Lista de tareas
                </h1>
            </Row>
            <List
                className='todoList'
                loading={tasks.fetching}
                itemLayout='horizontal'
                dataSource={tasks.todos}
                renderItem={item => (
                    <List.Item
                        actions={[<Checkbox onChange={(value) => onCompleta(value, item.todo_id)} defaultChecked={item.completed}>Completa</Checkbox>,
                        <Link to={{pathname:`/mytask/view/${item.todo_id}`, state:{item}}}>Editar</Link>, <a key='lista-borrar' onClick={()=>onDelete(item.todo_id)}>Borrar</a>]}
                    >
                        <List.Item.Meta
                            title={item.name}
                            description={item.title}
                        />
                    </List.Item>
                )}
            />
        </Col>
    </Row>

    </>
    )
}

export default Tasks;