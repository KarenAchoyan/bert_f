import React, { useState } from 'react';
import styles from '../../styles/header.module.css';
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Space, Menu } from 'antd';


const Header = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setMenu] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const clickMenu = () => {
    setMenu(!menu);
  };
  const onClose = () => {
    setOpen(false);
    setShowMenu(false);

  };
  const onClickMenu = () => {
    setShowMenu(!showMenu);
  };

  const items = [
    {
      label: 'Կենսագրություն',
      key: '1',
      path:"/about/biography",

    },
    {
      label: 'Ղեկավարներ',
      key: '2',
      path:"/about/managers",

    }
  ];
  const item = [
    {
      label: 'Ելույթներ Հայաստանում',
      key: '1',

      path:"/events/9",
    },
    {
      label: 'Միջազգային ելույթներ',
      key: '2',
      path:"/events/10",

    },
    {
      label: 'Տեսանյութեր',
      key: '3',
      path:"/events/11",

    },
    {
      label: 'Արխիվ',
      key: '4',
      path:"/events/12",
    },
  ];

  return (
      <>
        <div className={`header ${styles.header}`}>
          <div className={styles.content}>
            <div className={styles.title}>
              <ul>
                <li>
                  <a>Մեր մասին</a>
                  <div className={styles.drb}>
                    <div className={styles.drbContent}>
                      <ul>
                        <li><Link href='/about/biography'>Կենսագրություն</Link></li>
                        <li><Link href='/about/managers'>Ղեկավարներ</Link></li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li><Link href={'/gallery'}>Պատկերասրահ</Link></li>
                <li>
                  <a href="#">Ելույթներ</a>
                  <div className={styles.drb}>
                    <div className={styles.drbContent}>
                      <ul>
                        <li><Link href='/events/9'>Ելույթներ Հայաստանում</Link></li>
                        <li><Link href='/events/10'>Միջազգային ելույթներ</Link></li>
                        <li><Link href='/events/11'>Տեսանյութեր</Link></li>
                        <li><Link href='/events/12'>Արխիվ</Link></li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.middleTitle}>
              <Link href='/'><img src="/logo.png" alt="Logo" /></Link>
            </div>
            <div className={styles.title}>
              <ul>
                <li><Link href='/costumes'>Մեր տարազները</Link></li>
                <li><Link href='/news'>Նորություններ</Link></li>
                <li><Link href='/studio'>Մեր ստուդիան</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.menuOutlined}>
            <MenuOutlined onClick={showDrawer} />
            <Space />
            <Drawer
                title="Menu"
                placement={placement}
                closable={true}
                onClose={onClose}
                open={open}
                key={placement}
            >
              <div className={styles.box}>
                <div className={styles.titles}>
                  <ul>
                    <li>
                      <div className={styles.menu}>
                        <a onClick={onClickMenu}>Մեր մասին</a>
                        {showMenu && (
                            <Menu
                                style={{ width: 256, fontSize: '17px' }}

                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                                items={items}
                            />
                        )}
                      </div>
                    </li>
                    <li><Link href={'/gallery'}>Պատկերասրահ</Link></li>
                    <li>
                      <div className={styles.menu}>
                        <a onClick={clickMenu}>Ելույթներ</a>
                        {menu && (
                            <Menu
                                style={{ width: 256, fontSize: '17px' }}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                                items={item}
                            />
                        )}
                      </div>

                    </li>
                  </ul>
                </div>
                <div className={styles.titles}>
                  <ul>
                    <li><Link href='/costumes'>Մեր տարազները</Link></li>
                    <li><Link href='/news'>Նորություններ</Link></li>
                    <li><Link href='/studio'>Մեր ստուդիան</Link></li>
                  </ul>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </>
  );
};

export default Header;
