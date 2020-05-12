import React, { useState, useEffect } from 'react';
import { Panel, Textarea, PanelHeader, FormLayout, Div, View, PanelHeaderButton, Button, ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import ReviewCell from './ReviewCell';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import bridge from '@vkontakte/vk-bridge';


class Review extends React.Component {


  constructor(props) {
    super(props);
    console.log('PROPS.COMMENTS: ', props.comments);
    this.state = {
      popout: null,
      Comments: [],
      // comments: props.comments ? props.comments : [],
      comments: props.comments ? props.comments : [],
      new_comment_id: 0
    };

    this.showPopout = this.showPopout.bind(this);
    this.prepareComment = this.prepareComment.bind(this);
    this.load_comments = this.load_comments.bind(this);
  }

  componentDidMount() {
    this.load_comments(this.props.comments);
  }

  load_comments(comments) {
    let arr = [];
    
    let last_id = 0;

    for (let comment_id in comments) {
      const comment = this.props.getComment(comment_id);
      if (comment) {
        const user_id = comment['user-id'];
        const user_image = comment['user-image'];
        const comment_text = comment['comment-text'];
        const user_firstName = comment['user-first-name'];
        const user_lastName = comment['user-last-name'];
        arr.push(
          <ReviewCell
            key={comment_id}
            fetchedUser={this.props.fetchedUser}
            commentText={comment_text}
            showPopout={this.showPopout}
            user_id={user_id}
            user_image={user_image}
            user_firstName={user_firstName}
            user_lastName={user_lastName}
          />);
        last_id = comment_id;
      }
    }
    arr.reverse();
    this.setState({
      Comments: arr,
      new_comment_id: (parseInt(last_id, 10) + 1).toString()
      });

  }

  showPopout (e) {
    this.setState({
      popout: 
      <ActionSheet onClose={() => this.setState({ popout: null })}>
        <ActionSheetItem mode='destructive' autoclose onClose={() => this.props.deleteComment()}>
          Удалить
        </ActionSheetItem>
        <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>
      </ActionSheet>
    })
  }

  prepareComment (e) {
    const comment_area = document.getElementById('review-area');
    const comment_text = comment_area.value;
    comment_area.value = '';
    const comment_id = this.state.new_comment_id;
    this.props.postComment(e, comment_id, comment_text);
    let updated_comments = [...this.state.comments];

    updated_comments[comment_id] = {
      'comment-text': comment_text,
      'user-first-name': this.props.fetchedUser.first_name,
      'user-last-name': this.props.fetchedUser.last_name,
      'user-image': this.props.fetchedUser.photo_200,
      'user-id': this.props.fetchedUser.id
    }
    this.setState({
      comments: updated_comments
    })
    console.log(Object.keys(updated_comments).length);
    console.log(updated_comments);
    this.load_comments(updated_comments);
  }

 //this.props.deleteComment
  render() {
    return (
      <View id={this.props.id} popout={this.state.popout}>
        <Panel>
          <PanelHeader
            left={<PanelHeaderButton onClick={() => this.props.goReview()}><Icon24Cancel /></PanelHeaderButton>}
          >
            Отзывы
          </PanelHeader>
          <FormLayout>
            <Textarea
              id='review-area'
              top="Ваш отзыв"
              placeholder="Напишите, что вам понравилось или
                не понравилось в организации приложения.
                Расскажите о своих впечатлениях"
              />
              <Button
                mode='primary'
                size='xl'
                onClick={() => this.prepareComment()}
              >
                Отправить
              </Button>
          </FormLayout>
          <Div>
            {this.state.Comments}
          </Div>
        </Panel>
      </View>
    );
  }
}


export default Review;