import React, {useState, useEffect, useContext} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UserAddOutlined,
    FormOutlined,
    LogoutOutlined,
    PictureOutlined,
    SkinOutlined,
    TicketOutlined,
    SoundOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import Link from "next/link";
import {useRouter} from "next/router";
import NavbarContext from "../../../providers/NavBarContext";
import {useSearchParams} from "next/navigation";
import {handleLogout} from "../../../configs/axiosIntance";

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;


const Navbar = (props) => {

    const {subMenu, setSubMenu} = useContext(NavbarContext)

    const [collapsed, setCollapsed] = useState(false);
    const {token: {colorBgContainer}} = theme.useToken();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleLogoutBtn = async () => {
        handleLogout()
        const nextUrl = searchParams.get("next");
        router.push(nextUrl ?? "/login");
    };

    function selectSub(s) {
        setSubMenu(s)
    }

    const getSelectedKey = (path) => {
        const currentPath = router.pathname;
        const key = currentPath.split('/').slice(-2).join('/')
        return key === path;
    };


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={subMenu} defaultOpenKeys={[subMenu]}>
                    <Menu.Item key="1" icon={<UserOutlined/>}>
                        <Link href="/admin">Admin</Link>
                    </Menu.Item>

                    {/* Slides Section */}
                    <SubMenu key="sub2" onClick={() => selectSub("sub2")} icon={<FormOutlined/>} title="Slides">
                        <Menu.Item key="3" className={getSelectedKey("slide/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/slide/all">All Slides</Link>
                        </Menu.Item>
                        <Menu.Item key="4" className={getSelectedKey("slide/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/slide/add">Create Slide</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Blog Section */}
                    <SubMenu key="sub3" onClick={() => selectSub("sub3")} icon={<FormOutlined/>} title="Blog">
                        <Menu.Item key="8" className={getSelectedKey("blog/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/blog/all">All Blogs</Link>
                        </Menu.Item>
                        <Menu.Item key="9" className={getSelectedKey("blog/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/blog/add">Create Blog</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Contact Section */}
                    <SubMenu key="sub5" onClick={() => selectSub("sub5")} icon={<UserOutlined/>} title="Contact">
                        <Menu.Item key="13"
                                   className={getSelectedKey("contact/update") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/contact/update">Update Info</Link>
                        </Menu.Item>
                        <Menu.Item key="14"
                                   className={getSelectedKey("contact/formResult") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/contact/formResult">Form Result</Link>
                        </Menu.Item>
                        <Menu.Item key="15"
                                   className={getSelectedKey("contact/about") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/contact/about">About Page</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* User Section */}
                    <SubMenu key="sub30" onClick={() => selectSub("sub30")} icon={<UserAddOutlined/>} title="User">
                        <Menu.Item key="31" className={getSelectedKey("user/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/user/all">All Users</Link>
                        </Menu.Item>
                        <Menu.Item key="32" className={getSelectedKey("user/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/user/add">Create User</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Gallery Section */}
                    <SubMenu key="sub6" onClick={() => selectSub("sub6")} icon={<PictureOutlined/>} title="Gallery">
                        <Menu.Item key="16" className={getSelectedKey("gallery/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/gallery/all">All Galleries</Link>
                        </Menu.Item>
                        <Menu.Item key="17" className={getSelectedKey("gallery/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/gallery/add">Create Gallery</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub61" onClick={() => selectSub("sub61")} icon={<PictureOutlined/>} title="Managers">
                        <Menu.Item key="161" className={getSelectedKey("managers/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/managers/all">All Managers</Link>
                        </Menu.Item>
                        <Menu.Item key="171" className={getSelectedKey("managers/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/managers/add">Add Manager</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Costumes Section */}
                    <SubMenu key="sub7" onClick={() => selectSub("sub7")} icon={<SkinOutlined/>} title="Costumes">
                        <Menu.Item key="18" className={getSelectedKey("costume/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/costumes/all">All Costumes</Link>
                        </Menu.Item>
                        <Menu.Item key="19" className={getSelectedKey("costume/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/costumes/add">Update costumes</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Costumes Section */}
                    <SubMenu key="sub71" onClick={() => selectSub("sub71")} icon={<SkinOutlined/>} title="Studio">
                        <Menu.Item key="181" className={getSelectedKey("studio/images") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/studio/images">Images</Link>
                        </Menu.Item>
                        <Menu.Item key="182" className={getSelectedKey("studio/update") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/studio/update">Studio</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Tickets Section */}
                    <SubMenu key="sub8" onClick={() => selectSub("sub8")} icon={<SkinOutlined/>} title="Tickets">
                        <Menu.Item key="20" className={getSelectedKey("ticket/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/tickets/all">All Tickets</Link>
                        </Menu.Item>
                        <Menu.Item key="21" className={getSelectedKey("ticket/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/tickets/add">Create Ticket</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Speakers Section */}
                    <SubMenu key="sub9" onClick={() => selectSub("sub9")} icon={<SoundOutlined/>} title="Speeches">
                        <Menu.Item key="221" className={getSelectedKey("speakers/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/speeches/all">Home Speeches</Link>
                        </Menu.Item>
                        <Menu.Item key="23" className={getSelectedKey("speakers/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/speeches/add">Create Speeches</Link>
                        </Menu.Item>
                        <Menu.Item key="222" className={getSelectedKey("speakers/category") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/speeches/category">Categories</Link>
                        </Menu.Item>
                        <Menu.Item key="223" className={getSelectedKey("speakers/speechWithCategory") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/speeches/speechWithCategory">All Speeches</Link>
                        </Menu.Item>

                    </SubMenu>

                    <Menu.Item key="24" onClick={handleLogoutBtn} icon={<LogoutOutlined/>}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{padding: 0, backgroundColor: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content style={{margin: '24px 16px', padding: 24, minHeight: 280}}>
                    <div style={{minHeight: '80vh'}}>
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};


export default Navbar;
