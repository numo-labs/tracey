import React from 'react';
import {browserHistory} from 'react-router';
import Itemlist from '../itemlist';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const onItemListSelected = (index, type) => {
  browserHistory.push(`/detail/${type}/item/${index}`);
};

const DetailPage = ({results, params, children}) => (
  <Row>
    <Col xs={6}>
      <Itemlist items={results[params.items]} title={params.items} onSelectItem={(index) => onItemListSelected(index, params.items)} />
    </Col>
    <Col xs={6} className='detailPageChild'>
      {children}
    </Col>
  </Row>
);

export default DetailPage;
