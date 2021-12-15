import CSS from 'csstype'

const app: CSS.Properties = {
  //marginLeft: '300px',
  //marginRight: '300px'
}

const header: CSS.Properties = {
  backgroundColor: '#24292e',
  //paddingRight: '50%',
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

const main: CSS.Properties = {
  display: 'flex',
  flexGrow: 1,
  minHeight: 'calc(100vh - 200px)',
  justifyContent: 'center'
}

const body: CSS.Properties = {
  width: '70vw',
  maxWidth: '1200px',
  padding: '10px',
}

const infoBar: CSS.Properties = {
  width: '30vw',
  maxWidth: '400px',
  backgroundColor: '#E1E4E8',
  padding: '10px',
  paddingTop: '10px'
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
  //border: '2px solid #586069',
  //marginLeft: '2.5vw',
  marginBottom: '10px',
  fontSize: '20px',
}

const mouseoverPost: CSS.Properties = {
  backgroundColor: '#FFF',
  padding: '10px',
  marginBottom: '10px',
  fontSize: '20px',
  position: 'fixed',
  //top: '40vh',
  //left: '40vw',
  border: '2px solid #586069'
}

const link: CSS.Properties = {
  textDecoration: 'inherit',
  color: 'inherit'
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

const edit: CSS.Properties = {
  backgroundColor: '#fff',
  padding: '10px',
  paddingBottom: '60px'
}

const secondaryText:CSS.Properties = {
  color: '#586069',
  fontSize: '16px'
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
  padding: '10px'
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

const postButton : CSS.Properties = {
  backgroundColor: '#0366d6',
  color: '#FFF',
  borderRadius: '5px',
  marginRight: '5px',
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
  margin: '10px auto',
  fontSize: '1.5em',
  display: 'flex',
  //justifyContent: 'center'
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
  marginTop: '40px'
}

const styles = {
  app,
  header,
  headerTab,
  main,
  body,
  infoBar,
  infoBarItem,
  board,
  mouseoverPost,
  link,
  subHeader,
  form,
  edit,
  secondaryText,
  textInput,
  threadInput,
  textArea,
  submit,
  button,
  postButton,
  notification,
  negativeNotification,
  positiveNotification,
  footer
}

export default styles