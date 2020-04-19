import React from 'react';
import { Row, Col } from 'antd';
import styles from './Home.css';
import PyScripts from './Script';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>My Culos</h2>
      <Row justify="center">
        <Col>
          <PyScripts path="scripts" scriptName="my_culo.py" />
        </Col>
      </Row>
    </div>
  );
}
