import React, { useState, useEffect } from 'react';
import { Group, Card, Text, Cell, Avatar, Link } from '@vkontakte/vkui';
import Icon24MoreVertical from '@vkontakte/icons/dist/24/more_vertical';
import './styles/ReviewCell.css';

const ReviewCell = props => (
  <Group>
    <Card mode='shadow' style={{padding: '10px 20px 30px 20px'}}>
      <Cell
        style={{padding: 0}}
        before={props.user_image ? <Link href={`https://vk.com/id${props.user_id}`}><Avatar src={props.user_image} style={{marginRight: 10}} /> </Link> : null}
        asideContent={props.fetchedUser && (props.fetchedUser.id === props.user_id || props.fetchedUser.id === 339873790) ? <Icon24MoreVertical onClick={props.showPopout} data-id={props.comment_id}/> : null}
      >
        {`${props.user_firstName} ${props.user_lastName}`}
      </Cell>
      <Text>{props.commentText}</Text>
    </Card>
  </Group>
);

export default ReviewCell;