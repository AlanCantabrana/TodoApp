import React, { useState } from 'react';
import {Menu} from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [keyItem, setKeyItem] = useState ({current:'home'});
    
    const handleClick = e => {
        setKeyItem({ current: e.key });
        console.log(keyItem);
    };
    
    return(
        <>
        <Menu onClick={handleClick} selectedKeys={keyItem.current} mode="horizontal">
            <Menu.Item key="home">
                <Link to="/">Inicio</Link>
            </Menu.Item>
            <Menu.Item key="tasks">
                <Link to="/mytasks">Tareas</Link>
            </Menu.Item>
            <Menu.Item key="myInfo">
                <Link to="/myinfo">Mi Información</Link>
            </Menu.Item>
        </Menu>
        </>
    )
}

export default Navbar;