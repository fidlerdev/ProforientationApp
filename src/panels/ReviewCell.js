import React, { useState, useEffect } from 'react';
import { Group, Card, Text, Cell, Avatar } from '@vkontakte/vkui';
import Icon24MoreVertical from '@vkontakte/icons/dist/24/more_vertical';

const ReviewCell = props => (
  <Group>
    <Card mode='shadow' style={{padding: 10}}>
      <Cell
        before={props.user_image ? <Avatar src={props.user_image} /> : null}
        asideContent={props.fetchedUser && (props.fetchedUser.id === props.user_id || props.fetchedUser.id === '339873790') ? <Icon24MoreVertical onClick={props.showPopout} data-userId={props.user_id}/> : null}
      >
        {`${props.user_firstName} ${props.user_lastName}`}
      </Cell>
      <Text>{props.commentText}</Text>
    </Card>
  </Group>
);

export default ReviewCell;