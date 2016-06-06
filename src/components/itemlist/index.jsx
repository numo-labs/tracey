import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const Itemlist = ({items, title, onSelectItem}) => (
  <Panel header={title}>
    <ListGroup fill style={{height: '500px', overflowY: 'scroll', fontSize: '11px'}}>
      {items.map((item, index) => (
        <ListGroupItem key={index} onClick={() => onSelectItem(index)}>
          <Row>
            <Col xs={7}>
              {item.properties.name}
            </Col>
            <Col xs={5}>
              {item.properties.id}
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  </Panel>
);

export default Itemlist;
