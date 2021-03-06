import CSS from 'csstype'

const header: CSS.Properties = {
  backgroundColor: '#24292e',
  height: '100px',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '25px',
  marginBottom: '10px'
}

const headerTab: CSS.Properties = {
  padding: '10px 0px 10px 10px',
  color: '#FFF',
  fontWeight: 'bold'
}

let main: CSS.Properties
let body: CSS.Properties
let infoBar: CSS.Properties
//Separate styling for desktop and mobile
if (window.screen.width >= 768) {
  main = {
    display: 'flex',
    flexGrow: 1,
    minHeight: 'calc(100vh - 200px)',
    justifyContent: 'center'
  }

  body = {
    width: '70vw',
    maxWidth: '1200px',
    padding: '10px'
  }

  infoBar = {
    width: '30vw',
    maxWidth: '400px',
    backgroundColor: '#E1E4E8',
    padding: '10px',
    paddingTop: '10px'
  }

} else {
  main = {
    flexGrow: 1,
    minHeight: 'calc(100vh - 200px)',
    justifyContent: 'center'
  }

  body = {
    maxWidth: '1200px',
    padding: '10px'
  }

  infoBar = {
    backgroundColor: '#E1E4E8',
    padding: '10px',
    paddingTop: '10px'
  }
}

const infoBarItem: CSS.Properties = {
  backgroundColor: '#FFF',
  padding: '10px',
  border: '2px solid #586069',
  marginBottom: '10px'
}

const board: CSS.Properties = {
  backgroundColor: '#FFF',
  padding: '10px',
  marginBottom: '10px',
  fontSize: '20px',
}

const threadInfo: CSS.Properties = {
  borderLeft: '2px solid #586069',
  padding: '10px',
  color: '#586069',
  fontSize: '16px',
  float: 'right'
}

const mouseoverPost: CSS.Properties = {
  backgroundColor: '#FFF',
  padding: '10px',
  marginBottom: '10px',
  fontSize: '20px',
  position: 'fixed',
  border: '2px solid #586069'
}

const link: CSS.Properties = {
  textDecoration: 'inherit',
  color: 'inherit'
}

const largeHeader: CSS.Properties = {
  backgroundColor: '#fff',
  padding: '10px',
  margin: '0px',
  marginBottom: '-10px'
}

const subHeader: CSS.Properties = {
  margin: 0,
  display: 'inline',
}

const form: CSS.Properties = {
  backgroundColor: '#FFF',
  paddingTop: '10px',
  paddingBottom: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center'
}

const profilePictureLarge: CSS.Properties = {
  width: '150px',
  maxHeight: '150px',
  border: '2px solid #586069'
}

const profilePictureSmall: CSS.Properties = {
  width: '100px',
  maxHeight: '100px',
  border: '2px solid #586069'
}

const postImageSmall: CSS.Properties = {
  width: '300px',
  maxWidth: '50vw',
  maxHeight: '600px'
}

const postImageLarge: CSS.Properties = {
  maxWidth: '50vw',
  maxHeight: '70vh'
}

const edit: CSS.Properties = {
  backgroundColor: '#fff',
  paddingTop: '10px',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingBottom: '60px'
}

const secondaryText:CSS.Properties = {
  color: '#586069',
  fontSize: '16px'
}

const textInput: CSS.Properties = {
  minWidth: '10em',
  width: '25vw',
  maxWidth: '400px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '25px'
}

const textInputSmaller: CSS.Properties = {
  minWidth: '10em',
  width: '25vw',
  maxWidth: '400px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '20px'
}

const threadInput: CSS.Properties = {
  height: '30px',
  width: '605px',
  maxWidth: '65.8vw',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '20px'
}

const textArea: CSS.Properties = {
  width: '600px',
  maxWidth: '65vw',
  height: '150px',
  borderRadius: '5px',
  marginTop: '10px',
  padding: '5px',
  fontSize: '20px'
}

const submit:CSS.Properties = {
  backgroundColor: '#fff',
  padding: '10px',
}

const button: CSS.Properties = {
  backgroundColor: '#0366d6',
  color: '#FFF',
  width: '10.2em',
  margin: '0 auto',
  display: 'block',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '25px'
}

const submitButton: CSS.Properties = {
  backgroundColor: '#0366d6',
  color: '#FFF',
  width: '10.2em',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '20px'
}

const postButton: CSS.Properties = {
  backgroundColor: '#0366d6',
  color: '#FFF',
  borderRadius: '5px',
  marginRight: '5px'
}

const postButtonFocus: CSS.Properties = {
  backgroundColor: '#033c7c',
  color: '#FFF',
  borderRadius: '5px',
  marginRight: '5px',
}

const notification: CSS.Properties = {
  backgroundColor: '#d8eaed',
  color: '#0366d6',
  width: '50vw',
  maxWidth: '600px',
  border: '2px solid #0366d6',
  borderRadius: '5px',
  padding: '15px',
  margin: '10px',
  fontSize: '1.5em'
}

const negativeNotification: CSS.Properties = {
  backgroundColor: '#f0cccc',
  color: '#a31c1c',
  width: '50vw',
  maxWidth: '600px',
  border: '2px solid #a31c1c',
  borderRadius: '5px',
  padding: '15px',
  margin: '10px auto',
  fontSize: '1.5em',
  display: 'flex'
}

const positiveNotification: CSS.Properties = {
  backgroundColor: '#98f5d0',
  color: '#09613e',
  width: '50vw',
  maxWidth: '600px',
  border: '2px solid #09613e',
  borderRadius: '5px',
  padding: '15px',
  margin: '10px',
  fontSize: '1.5em'
}

const footer: CSS.Properties = {
  backgroundColor: '#24292e',
  color: '#FFF',
  height: '50px',
  width: '100%',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '40px'
}

const styles = {
  header,
  headerTab,
  main,
  body,
  infoBar,
  infoBarItem,
  board,
  threadInfo,
  mouseoverPost,
  link,
  largeHeader,
  subHeader,
  form,
  profilePictureLarge,
  profilePictureSmall,
  postImageSmall,
  postImageLarge,
  edit,
  secondaryText,
  textInput,
  textInputSmaller,
  threadInput,
  textArea,
  submit,
  button,
  submitButton,
  postButton,
  postButtonFocus,
  notification,
  negativeNotification,
  positiveNotification,
  footer
}

export default styles