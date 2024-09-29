import React from 'react';
import styles from '../../styles/footer.module.css'
const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.content}>
          <div className={styles.info}>
            <ul>
              <li>Ինֆորմացիաներ</li>
              <li>Կենսագրություն</li>
              <li>Ղեկավարներ</li>
              <li>Պատկերասրահ</li>
            </ul>
          </div>
          <div className={styles.info}>
            <ul>
              <li>Ելույթներ</li>
              <li>Ելույթներ Հայաստանում</li>
              <li>Միջազգային ելույթներ</li>
              <li>Տեսանյութեր</li>
            </ul>
          </div>
          <div className={styles.info}>
            <ul>
              <li>Էջեր</li>
              <li>Նորություններ</li>
              <li>Մեր ստուդիան</li>
              <li>Մեր տարազները</li>
            </ul>
          </div>
          <div className={styles.info}>
            <ul>
              <li>Հետադարձ կապ</li>
              <li>+37477474747</li>
              <li>bert@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;