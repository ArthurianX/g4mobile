import React from 'react'
import { Appbar, Modal, Portal, Title, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import PostsActions from '../../Stores/Posts/Actions'
import { connect } from 'react-redux'
import Style from './PostModalStyles'
import { WebView } from 'react-native-webview'
import { Platform, View } from 'react-native'

const platformSpecificFontPath = Platform.OS === 'ios' ? 'file:///assets/fonts/' : 'file:///android_asset/fonts/'

const getContent = (props) => {
  let htmlStyle = `<head title="WebView">
                    <style type="text/css">                        
                        @font-face {
                          font-family: "Source Sans Pro Regular";
                          src: url('${platformSpecificFontPath}/SourceSansPro-Regular.ttf') format('truetype');
                          font-weight: 500;
                        }
                        @font-face {
                          font-family: "Source Sans Pro Regular Italic";
                          src: url('${platformSpecificFontPath}/SourceSansPro-Italic.ttf') format('truetype');
                          font-weight: 500;
                          font-style: italic;
                        }
                        @font-face {
                          font-family: "Source Sans Pro Bold";
                          src: url('${platformSpecificFontPath}/SourceSansPro-Bold.ttf') format('truetype');
                          font-weight: 700;
                        }
                        @font-face {
                          font-family: "Source Sans Pro Light";
                          src: url('${platformSpecificFontPath}/SourceSansPro-Light.ttf') format('truetype');
                          font-weight: 300;
                        }
                        * {
                          background-color: ${props.theme.colors.background};
                          color: ${props.theme.colors.text};
                          font-family: 'Source Sans Pro Regular', 'sans-serif';
                          font-weight: 500;                          
                        }                  
                        a {
                            color: ${props.theme.colors.accent} !important;
                        }      
                        .g4postimagemobile {
                          width: 100%;
                          height: auto;
                          margin-top: 2rem;
                          margin-bottom: 1rem;
                        }
                        body {
                          width:100%;
                        }
                        h2 {
                          font-size: 48px;
                        }
                        p {
                          font-size: 3rem;
                          margin-left: 4%; 
                          margin-right: 4%; 
                        }
                        h3 {
                          font-size: 32px
                        }
                        img {
                          width:98%;
                        }
                        td {
                          display: block !important;
                          width: 95% !important;
                        }
                        img {
                          width:98%;
                        }
                        hr {
                          width: 98%;
                        }
                        ol li ol li ol li {
                          position: relative; right: 85px;
                        }
                        ul {
                          width: 98%;
                          margin-left: -25px;
                        }
                        li {
                          width: 98%;
                        }
                        .tabs {
                          display: none;
                        }
                        .tabs > li {
                          display: none;
                        }
                        .tabs-content {
                          padding: 0;
                          list-style-type: none;
                        }
                        tr {
                          display: flex;
                          flex-direction: column;
                        }
               </style></head>`
  // console.log('getContent', props.post.get('content'))
  const postImage = `
    <body>
    <img src="${props.post.get('jetpack_featured_media_url')}" class="g4postimagemobile"> 
  `
  // console.log('Generated Content is ', props, htmlStyle + postImage + props.post.get('content'));
  return htmlStyle + postImage + props.post.get('content') + '</body>'
}

const getMessages = (message, param1) => {
  console.log('getMessages', message, param1)
}

class PostModal extends React.Component {
  // componentDidMount() {
  //   console.log('PostModal did mount', this);
  // }

  render() {
    const _hideModal = () => {
      this.props.open = false
      console.log('this.props.theme', this.props.theme)
    }
    return (
      <Portal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.post} onDismiss={_hideModal}>
          <View style={[Style.container, {backgroundColor: this.props.theme.colors.background}]}>
            <Appbar style={{marginTop: 40, height: 20, paddingTop: 30, alignSelf: 'flex-end', flex: 0.03, flexDirection: 'row'}}>
              <Appbar.Action style={{marginRight: 5, marginTop: -20}} icon="close" onPress={() => this.props.closePost()} />
            </Appbar>
            <Title style={Style.titleFont}>
              {this.props.post ? this.props.post.get('title') : ''}
            </Title>
            <WebView
              style={[Style.contentFont, { backgroundColor: this.props.theme.colors.background }]}
              originWhitelist={['*']}
              // onLoad={getMessages}
              // onLoadStart={getMessages}
              // onLoadEnd={getMessages}
              // onMessage={getMessages}
              // renderError={getMessages}
              // onError={(err)=> console.log('WebView err', err)}
              source={{ html: this.props.post ? getContent(this.props) : '', baseUrl: 'https://www.google/com' }}
            />
          </View>
        </Modal>
      </Portal>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.get('openPost')
})

const mapDispatchToProps = (dispatch) => ({
  closePost: () => dispatch(PostsActions.closePost()),
})

PostModal.propTypes = {
  post: PropTypes.object,
  open: PropTypes.bool,
}
// TODO: Perf IDEA, maybe get the state out, and render the component dynamically from RootScreen
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(PostModal))
