import React, { useState, useEffect } from 'react';
import { Panel, Textarea, PanelHeader, FormLayout, Div, View, PanelHeaderButton, Button, ActionSheet, ActionSheetItem, v } from '@vkontakte/vkui';
import ReviewCell from './ReviewCell';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import bridge from '@vkontakte/vk-bridge';


class Review extends React.Component {


  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      popout: null,
      Comments: [],
      comments: [],
      new_comment_id: '0'
    };
    
    this.showPopout = this.showPopout.bind(this);
    // this.prepareComment = this.prepareComment.bind(this);
    // this.load_comments = this.load_comments.bind(this);
    // this.getComment = this.getComment.bind(this);
  }

  async componentDidMount() {
    console.log('componentDidMount');
    await this.props.commentsRef.once('value', snapshot => {
      console.log('snapshot.val() in componentDidMount', snapshot.val());
      this.setState({comments: snapshot.val()});
    });
    this.load_comments();
    
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate')

    if (JSON.stringify(this.state.comments) != JSON.stringify(prevState.comments)) {
      this.props.commentsRef.on('value', snapshot => {
        this.setState({comments: snapshot.val() ? snapshot.val() : []});
        console.log('SNAPSHOT.val() in componentDidUpdate: ', snapshot.val());
      });
      this.load_comments();
    }
  }

  async getComment (comment_id) {
    var comment;
		await this.props.commentsRef.child(comment_id).once('value', snapshot => {
			comment = snapshot.val();
      console.log('comment in getComment: ', comment);
		});
		return comment;
	}

  async deleteComment (id) {
    console.log('deleteComment, id:', id);
    await this.props.commentsRef.child(id).remove();
  } 



  load_comments() {

    console.log('load_comments');

    let arr = [];
    
    let last_id = -1;
    console.log('comments in load_comments: ', this.state.comments)

    for (let comment_id in this.state.comments) {
      // const comment = this.getComment(comment_id);
      
      console.log(comment_id)
      if (this.state.comments[comment_id]) {
        const user_id = this.state.comments[comment_id]['user-id'];
        const user_image = this.state.comments[comment_id]['user-image'];
        const comment_text = this.state.comments[comment_id]['comment-text'];
        const user_firstName = this.state.comments[comment_id]['user-first-name'];
        const user_lastName = this.state.comments[comment_id]['user-last-name'];
        arr.push(
          <ReviewCell
            key={comment_id}
            fetchedUser={this.props.fetchedUser}
            commentText={comment_text}
            comment_id={comment_id}
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
    console.log('LAST_id', last_id);
    console.log(arr);
    this.setState({
      Comments: arr,
      new_comment_id: (parseInt(last_id, 10) + 1).toString()
      });

  }

  showPopout (e) {
    const id = e.currentTarget.dataset.id;
    console.log('comment_id to delete: ', id);
    this.setState({
      popout: 
      <ActionSheet onClose={() => this.setState({ popout: null })}>
        <ActionSheetItem mode='destructive' autoclose onClick={() => this.deleteComment(id)}>
          Удалить
        </ActionSheetItem>
        <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>
      </ActionSheet>
    })
  }

  prepareComment (e) {
    const comment_area = document.getElementById('review-area');
    const comment_text = comment_area.value;
    if (comment_text.trim()) {
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
  }


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