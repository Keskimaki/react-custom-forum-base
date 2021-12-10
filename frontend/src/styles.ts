import CSS from 'csstype'

const app: CSS.Properties = {
}

const header: CSS.Properties = {
  backgroundColor: '#24292e',
  paddingRight: '50%',
  height: '100px',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '25px',
}

const headerTab: CSS.Properties = {
  padding: '10px 0px 10px 10px',
  color: '#FFF',
  fontWeight: 'bold'
}

const infoBar: CSS.Properties = {
  height: '90vh',
  width: '25vw',
  //maxWidth: '600px',
  backgroundColor: '#E1E4E8',
  position: 'absolute',
  padding: '10px',
  right: 0,
}

const infoBarItem: CSS.Properties = {
  backgroundColor: '#FFF',
  padding: '10px',
  border: '2px solid #586069',
  marginBottom: '10px'
}

const board: CSS.Properties = {
  backgroundColor: '#FFF',
  padding: '5px',
  margin: '10px',
  fontSize: '20px',
}

const link: CSS.Properties = {
  textDecoration: 'inherit',
  color: 'inherit'
}

const login: CSS.Properties = {
  backgroundColor: '#FFF',
  padding: '150px 22.5vw',
  margin: '10px',
  
}

const textInput: CSS.Properties = {
  height: '3vw',
  width: '25vw',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '20px'
}

const threadInput: CSS.Properties = {
  height: '3vw',
  width: '50vw', //Only difference, maybe switch to textArea
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '20px'
}

const textArea: CSS.Properties = {
  width: '500px',
  height: '150px',
  borderRadius: '5px',
  margin: '10px',
  padding: '5px',
  fontSize: '20px'
}

const button: CSS.Properties = {
  backgroundColor: '#0366d6',
  color: '#FFF',
  height: '4vw',
  width: '25vw',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '20px'
}

const postButton: CSS.Properties = {
  backgroundColor: '#0366d6',
  color: '#FFF',
  height: '4vw',
  width: '25vw',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  marginLeft: '10px', //only difference for now
  fontSize: '20px'
}

const notification: CSS.Properties = {
  backgroundColor: '#d8eaed',
  color: '#0366d6',
  width: '600px',
  border: '2px solid #0366d6',
  borderRadius: '5px',
  padding: '15px',
  margin: '10px',
  fontSize: '1.5em'
}

const negativeNotification: CSS.Properties = {
  backgroundColor: '#f0cccc',
  color: '#a31c1c',
  width: '600px',
  border: '2px solid #a31c1c',
  borderRadius: '5px',
  padding: '15px',
  margin: '10px',
  fontSize: '1.5em'
}

const positiveNotification: CSS.Properties = {
  backgroundColor: '#98f5d0',
  color: '#09613e',
  width: '600px',
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
  position: 'absolute',
  bottom: 0
}

const styles = {
  app,
  header,
  headerTab,
  infoBar,
  infoBarItem,
  board,
  link,
  login,
  textInput,
  threadInput,
  textArea,
  button,
  postButton,
  notification,
  negativeNotification,
  positiveNotification,
  footer
}

export default styles