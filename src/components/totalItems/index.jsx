import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';

const renderHeader = (count, label) => (
  <div style={{textAlign: 'center'}}>
    <h3>{count} {label}</h3>
  </div>
);

const TotalItems = ({count, label, style = 'primary'}) => (
  <Card>
    <CardHeader title={count + ' ' + label} />
  </Card>
);

export default TotalItems;
