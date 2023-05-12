import "./Home.css"
import ContentComponent from "../../components/Content/Content";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom"
const { Header, Sider, Content } = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer } } = theme.useToken();
    const [items, setItems] = useState([
        {
            key: '1',
            label: '菜单一',
            children: [
                {
                    key: '1-1',
                    label: '子菜单1-1',
                },
                {
                    key: '1-2',
                    label: '子菜单1-2',
                }
            ]
        },
        {
            key: '2',
            label: '菜单二',
            children: [
                {
                    key: '2-1',
                    label: '子菜单2-1',
                },
                {
                    key: '2-2',
                    label: '子菜单2-2',
                }
            ]
        },
    ])
    const [curKey, setKey] = useState('1-1')
    const [curLabel, setCurLabel] = useState()
    useEffect(() => {
        changeItemsArr(items)
    }, [curKey])

    const menuClick = function ({ key }) {
        setKey(key)
    }
    const changeItems = function (data) {
        setItems(changeItemsArr(items, data))
    }
    function changeItemsArr(item, data) {
        item.forEach(item1 => {
            if (!!item1.children && item1.children.length) {
                item1.children.forEach(item2 => {
                    if (data && item2.key === curKey) {
                        item2.label = data
                    }
                    if (item2.key === curKey) {
                        setCurLabel(item2.label)
                    }
                })
            }
        })
        return item.map(item => item)
    }

    return (
        <div className="home">
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        <h1>
                            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" />
                            <span>react</span>
                        </h1>
                    </div>
                    <div className="changeIcon">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined style={{ color: '#fff' }} /> : <MenuFoldOutlined style={{ color: '#fff' }} />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: '16px' }}
                        />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultOpenKeys={['1', '2']}
                        defaultSelectedKeys={['1-1']}
                        items={items}
                        onClick={menuClick}
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: '#001529', }}>
                        <div className="right">
                            <QuestionCircleOutlined style={{ marginRight: '10px' }} />
                            admin
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />

                        <ContentComponent curLabel={curLabel} changeItems={changeItems} />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
