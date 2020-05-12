import React, { useState } from 'react';
import { Card, Caption, Div } from '@vkontakte/vkui';
import Icon28ChevronRightOutline from '@vkontakte/icons/dist/28/chevron_right_outline';

const TestCard = props => (
  <Card size='m' className='TestCard' onClick={props.handler} mode='shadow' onClick={props.goTest} data-test={`test-${props.test_id}`} data-to='test-view'>
    <img src={props.src} style={{objectFit: '', borderRadius: '4px 4px 4px 4px'}}/>
    <Div style={{
                padding: '0 10px 0 10px',
                height: '50%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
                }}
      >
      <Caption level="1" weight="regular" style={{ textAlign: 'left' }}>{props.text}</Caption>
      <Icon28ChevronRightOutline style={{marginRight: '10px'}}/>
    </Div>
  </Card>
);


export default TestCard;