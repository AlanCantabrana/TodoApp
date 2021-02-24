import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Row, Col, Form, Input, Button, Checkbox} from 'antd';
import {editTask,getTask} from '../services/todoServices';
import Navbar from '../components/Navbar';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const MyTask = (props) => {
    const [form] = Form.useForm();
    const [task, setTask] = useState({todo_id: null ,name:'', title: '', completed: false});
    const history = useHistory();
    
    useEffect (() => {
        if(props.location.state) {
            const {todo_id, name, title, completed} = props.location.state.item;
            setTask({
                todo_id: todo_id, name: name, title: title, completed: completed
            });
        }
        console.log(task)
    },[]);

    useEffect (async () => {
        if(!props.location.state) {
            const id = parseInt(props.match.params.id)
            const response = await getTask(id)
            const {todo_id, name, title, completed} = response.data.todo[0];
            setTask({
                todo_id: todo_id, name: name, title: title, completed: completed
            })
        }
    },[]);

    const handleCheckbox = value => {
        form.setFieldsValue({'completed':value.target.checked})
        setTask({...task, completed: value.target.checked })
    }

    const onFinish =async formulario => {
        console.log(formulario, task);
        const response = await editTask(task.todo_id, formulario);
        console.log(response);
        if(response.status === 200) {
            history.push("/mytasks");           
        }
    }

    const onFinishFailed = () => {
        console.log('Cancel');
    }

    return (
    <>
    <Navbar />
    <Row>
        {task.todo_id ? (
        <Col span={22}>
            <Row justify='center'>
                <h1>
                    Edita la tarea
                </h1>
            </Row>
            <Form
                {...layout}
                form={form}
                name='formulario'
                initialValues={task}
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
                    <Col span={22}>
                        <Form.Item
                            name='completed'
                            label='Estatus tarea'
                            rules={[{ required: true, message: 'Favor de llenar el campo', }]}
                        >
                            <Checkbox checked={task.completed} onChange={handleCheckbox}>Completa</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row type='flex' justify='end'>
                    <Col span={11}>
                        <Button type='primary' htmlType='submit'>Editar Tarea</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
        ) : false}
    </Row>
    </>
    
    )
}

export default MyTask;