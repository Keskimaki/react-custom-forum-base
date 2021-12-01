import CSS from 'csstype'

const app: CSS.Properties = {
}

const header: CSS.Properties = {
  backgroundColor: '#24292e',
  paddingRight: '50%',
  height: '8vh',
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

const rightBar: CSS.Properties = {
  height: '90vh',
  width: '25vw',
  //maxWidth: '600px',
  backgroundColor: '#E1E4E8',
  position: 'absolute',
  padding: '10px',
  right: 0,
}

const rightBarItem: CSS.Properties = {
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

const footer: CSS.Properties = {
  backgroundColor: '#24292e',
  color: '#FFF',
  height: '4vh',
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
  rightBar,
  rightBarItem,
  board,
  link,
  login,
  textInput,
  button,
  footer
}

export default styles